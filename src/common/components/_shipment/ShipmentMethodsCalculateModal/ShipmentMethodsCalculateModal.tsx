"use client";

import ShipmentCard from "../ShipmentCard/ShipmentCard";
import Modal from "../../_UI/Modal";
import { FC, Fragment, useMemo, useState } from "react";
import { Shipment } from "shippo";
import Button from "../../_UI/Button";
import {
  PaymentIntentShippingOptionsDto,
  PaymentIntentShippingDetailsDto,
} from "@/common/types/api/types-from-swagger";
import classNames from "classnames";

export type ShipmentDataType = {
  objectId: string;
  shippingDetails: PaymentIntentShippingDetailsDto;
  shippingOptions: PaymentIntentShippingOptionsDto;
} | null;

export type ShipmentMethodsCalculateModalProps = {
  modalData: {
    show: boolean;
    data: Shipment | null;
  };
  onClose: () => void;
  shipmentData: ShipmentDataType;
  setShipmentData: (data: ShipmentDataType) => void;
  onCheckout: () => void;
};

const ShipmentMethodsCalculateModal: FC<ShipmentMethodsCalculateModalProps> = ({
  modalData,
  onClose,
  shipmentData,
  setShipmentData,
  onCheckout,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const groupByProvider = useMemo(() => {
    const groups = Object.groupBy(
      modalData.data?.rates ?? [],
      ({ provider }) => provider
    );
    const keys = Object.keys(groups).sort((_, b) => {
      if (b === "USPS") return 1;
      return -1;
    });

    if (keys.length > 0) setSelectedProvider(keys[0]);

    return {
      groups,
      keys,
    };
  }, [modalData.data?.rates]);

  return (
    <Modal
      isOpen={modalData.show}
      onClose={onClose}
      title="Select Shipment Method"
      className="wco-max-w-[600px]"
    >
      <div className="wco-flex wco-flex-col wco-gap-5 wco-pt-3 wco-h-[500px] wco-overflow-y-auto">
        <div className="wco-flex wco-gap-8">
          {groupByProvider.keys
            .map((key) => key)
            .map((key) => (
              <div
                className={classNames(
                  "wco-cursor-pointer wco-text-lg",
                  selectedProvider === key ? "wco-font-semibold" : ""
                )}
                key={key}
                onClick={() => {
                  console.log("key", key);
                  setSelectedProvider(key);
                }}
              >
                {key}
              </div>
            ))}
        </div>

        <div className="wco-flex wco-gap-2.5 wco-flex-col">
          {groupByProvider.groups[selectedProvider ?? ""]
            ?.sort((a, b) => {
              return +a.amount - +b.amount;
            })
            .map((rate) => (
              <Fragment key={rate.objectId}>
                <ShipmentCard
                  rate={rate}
                  active={shipmentData?.objectId === rate.objectId}
                  onClick={(shipmentData) => setShipmentData(shipmentData)}
                />
              </Fragment>
            ))}
        </div>

        {/* {providerUSPS
          ?.sort((a, b) => {
            return +a.amount - +b.amount;
          })
          .map((rate) => (
            <Fragment key={rate.objectId}>
              <ShipmentCard
                rate={rate}
                active={shipmentData?.objectId === rate.objectId}
                onClick={(shipmentData) => setShipmentData(shipmentData)}
              />
            </Fragment>
          ))} */}

        {/* {providerUPS && (
          <>
            {providerUPS?.map((rate) => (
              <Fragment key={rate.objectId}>
                <ShipmentCard
                  rate={rate}
                  active={shipmentData?.objectId === rate.objectId}
                  onClick={(shipmentData) => setShipmentData(shipmentData)}
                />
              </Fragment>
            ))}
          </>
        )} */}
      </div>
      <div className="wco-pt-8">
        <Button
          className="wco-w-full"
          onClick={async () => {
            try {
              setLoading(true);
              await onCheckout();
            } finally {
              setLoading(false);
            }
          }}
          disabled={!shipmentData}
          tooltip={
            !shipmentData ? "Please select a shipment method" : undefined
          }
          variant="black"
          loading={loading}
        >
          Proceed to checkout
        </Button>
      </div>
    </Modal>
  );
};

export default ShipmentMethodsCalculateModal;
