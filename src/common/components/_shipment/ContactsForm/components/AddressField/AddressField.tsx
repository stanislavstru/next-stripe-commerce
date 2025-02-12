"use client";

import { StandaloneSearchBox } from "@react-google-maps/api";
import React, { useRef, useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import Input from "@/common/components/_UI/Input";
import { FormikHelpers } from "formik";
import { CustomerContactValues } from "../../ContactsForm";
import { AVAILABLE_COUNTRY_CODES } from "@/common/config/main-client-config";
import type { CountryUnavailableModalType } from "../CountryUnavailableModal/CountryUnavailableModal";
import { usePathname } from "next/navigation";

type PlaceResult = {
  place_id: string;
  description: string;
};

type AddressFieldProps = {
  values: CustomerContactValues;
  setValues: FormikHelpers<CustomerContactValues>["setValues"];
  setUnavailableCountryModal: React.Dispatch<
    React.SetStateAction<CountryUnavailableModalType>
  >;
};

const AddressField: React.FC<AddressFieldProps> = ({
  values,
  setValues,
  setUnavailableCountryModal,
}) => {
  const dropdownWindowRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const searchBoxRef = useRef<any>(null);
  const pathname = usePathname();
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [focusOnInput, setFocusOnInput] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownWindowRef.current &&
        !dropdownWindowRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPlaces = async (inputValue: string, callback: () => void) => {
    try {
      // setLoading(true);
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: inputValue },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const formattedResults = predictions.map((place: any) => ({
              place_id: place.place_id,
              description: place.description,
            }));

            setOpen(true);
            setPlaces(formattedResults);
            callback();
          } else {
            setPlaces([]);
          }
        }
      );
    } finally {
      // setLoading(false);
    }
  };

  const debouncedFetchPlaces = useCallback(
    debounce((inputValue: string, focus: boolean, callback: () => void) => {
      if (focus) {
        getPlaces(inputValue, callback);
      }
    }, 1000),
    []
  );

  const fillOutAddress = (placeId: string) => {
    const geocoder = new google.maps.Geocoder();

    const request = {
      placeId: placeId,
    };

    geocoder.geocode(request, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK && Array.isArray(results)) {
        const addressComponents = results[0].address_components;
        let route, subpremise, streetNumber, country, zip, state, city;
        let countryLongName = null;

        addressComponents.forEach((component) => {
          if (component.types.includes("route")) {
            route = component.long_name;
          }

          if (component.types.includes("subpremise")) {
            subpremise = component.long_name;
          }

          if (component.types.includes("street_number")) {
            streetNumber = component.long_name;
          }

          if (component.types.includes("country")) {
            country = component.short_name;
            countryLongName = component.long_name;
          }

          if (component.types.includes("postal_code")) {
            zip = component.long_name;
          }

          if (component.types.includes("administrative_area_level_1")) {
            state = component.short_name;
          }

          if (component.types.includes("locality")) {
            city = component.long_name;
          }
        });

        if (
          country &&
          !AVAILABLE_COUNTRY_CODES.map((item) => item.value).includes(country)
        ) {
          setUnavailableCountryModal({
            show: true,
            data: {
              title: "Customer country is not supported",
              user_full_name: `${values.firstName}${
                values?.lastName ? " " + values.lastName : ""
              }`,
              user_email: values.email,
              user_country: countryLongName ?? "",
              user_address: `${streetNumber ? streetNumber + " " : ""}${
                route ? route + " " : ""
              }${subpremise ? subpremise + ", " : ""}${
                city ? city + ", " : ""
              }${state ? state + " " : ""}${zip ? zip + " " : ""}${
                countryLongName ?? ""
              }`,
              user_phone: values.phone ?? null,
              from_path: pathname,
            },
          });
        }

        setValues({
          ...values,
          address1: `${streetNumber ? streetNumber + " " : ""}${
            route ? route + " " : ""
          }`,
          address2: subpremise ?? "",
          country: country ?? "",
          zip: zip ?? "",
          state: state ?? "",
          city: city ?? "",
        });

        setPlaces([]);
      }
    });
  };

  return (
    <>
      <StandaloneSearchBox
        onLoad={(ref) => {
          searchBoxRef.current = ref;
        }}
        //   onPlacesChanged={() => {
        //     console.log("onPlacesChanged");
        //     // handlePlaceChanged(setValues);
        //   }}
      >
        <div className="wco-relative">
          <Input
            label="Address"
            value={values.address1}
            onChange={(e) => {
              setValues({ ...values, address1: e.target.value });

              debouncedFetchPlaces(e.target.value, focusOnInput, () => {});
            }}
            onFocus={() => {
              setFocusOnInput(true);
            }}
            placeholder="Start typing the address"
            required
          />
          {places.length > 0 && open && (
            <div
              className="wco-absolute wco-z-10 wco-flex wco-flex-col wco-gap-1 wco-px-2 wco-py-3 wco-bg-white wco-rounded-sm wco-shadow-md"
              ref={dropdownWindowRef}
            >
              {places.map((place) => (
                <div
                  className="wco-cursor-pointer hover:wco-bg-gray-200 wco-px-2 wco-py-2 wco-transition-all wco-text-sm"
                  key={place.place_id}
                  onClick={() => {
                    fillOutAddress(place.place_id);
                  }}
                >
                  {place.description}
                </div>
              ))}
            </div>
          )}
        </div>
      </StandaloneSearchBox>
    </>
  );
};

export default AddressField;
