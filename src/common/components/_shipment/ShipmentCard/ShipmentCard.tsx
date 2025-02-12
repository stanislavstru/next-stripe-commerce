import { Shipment } from "shippo";
import { FC } from "react";
import Image from "next/image";
import classNames from "classnames";
import { ShipmentDataType } from "../ShipmentMethodsCalculateModal/ShipmentMethodsCalculateModal";

type ShipmentCardProps = {
  rate: Shipment["rates"][0];
  active?: boolean;
  onClick?: (shipmentData: ShipmentDataType) => void;
};

const ShipmentCard: FC<ShipmentCardProps> = ({ rate, active, onClick }) => {
  return (
    <div
      className={classNames(
        "wco-flex wco-gap-5 wco-border-2 wco-p-5 wco-transition-all",
        active ? "wco-border-black wco-bg-gray-200" : "wco-border-transparent",
        onClick && "wco-cursor-pointer"
      )}
      onClick={() => {
        onClick &&
          onClick({
            objectId: rate.objectId,
            shippingDetails: {
              price: {
                amount: rate.amount,
                currency: rate.currency,
              },
              delivery: {
                id: rate.objectId,
                estimatedDays: rate?.estimatedDays ?? null,
                durationTerms: rate?.durationTerms ?? "",
              },
              service: {
                id: rate.carrierAccount,
                provider: rate.provider,
                name: rate?.servicelevel?.name ?? "",
                imagesSmall: rate?.providerImage75 ?? null,
                imagesLarge: rate?.providerImage200 ?? null,
              },
            },
            shippingOptions: {
              fixed_amount: {
                amount: +rate.amount,
              },
              display_name: rate.provider,
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: rate.estimatedDays,
                },
                maximum: {
                  unit: "business_day",
                  value: rate.estimatedDays,
                },
              },
            },
          });
      }}
      key={rate.objectId}
    >
      {rate?.providerImage200 && (
        <div className="wco-relative wco-h-[30px] wco-w-[40px] wco-mt-1">
          <Image
            src={rate.providerImage200}
            layout="fill"
            objectFit="contain"
            alt={rate.provider}
          />
        </div>
      )}

      {/* <div className="">{rate.provider}</div> */}
      <div className="wco-flex wco-flex-col wco-gap-1 wco-w-full">
        <div className="wco-font-semibold">{rate.provider}</div>
        <div>{rate?.servicelevel?.name}</div>
        <div className="wco-text-sm">{rate.durationTerms}</div>
        <div className="wco-font-normal">
          <span>{rate.currency === "USD" ? "$" : rate.currency}</span>
          <span>{rate.amount}</span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
