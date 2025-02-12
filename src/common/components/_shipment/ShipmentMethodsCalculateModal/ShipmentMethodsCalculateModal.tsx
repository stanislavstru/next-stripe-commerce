"use client";

import ShipmentCard from "../ShipmentCard/ShipmentCard";
import Modal from "../../_UI/Modal";
import { FC, Fragment, useState } from "react";
import { Shipment } from "shippo";
import Button from "../../_UI/Button";
import {
  PaymentIntentShippingOptionsDto,
  PaymentIntentShippingDetailsDto,
} from "@/common/types/api/types-from-swagger";

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

  const providerUSPS = modalData.data?.rates.filter(
    (rate) => rate.provider === "USPS"
  );

  // const providerUPS = modalData.data?.rates.filter(
  //   (rate) => rate.provider === "UPS"
  // );

  return (
    <Modal
      isOpen={modalData.show}
      onClose={onClose}
      title="Select Shipment Method"
    >
      <div className="wco-flex wco-flex-col wco-gap-5 wco-pt-3 wco-h-[500px] wco-overflow-y-auto">
        {providerUSPS
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
