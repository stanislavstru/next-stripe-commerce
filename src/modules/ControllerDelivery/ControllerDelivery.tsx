"use client";

import ContactsForm from "@/common/components/_shipment/ContactsForm";
import Title from "@/common/components/_UI/Title/Title";
import { useState } from "react";
import ShipmentMethodsCalculateModal from "@/common/components/_shipment/ShipmentMethodsCalculateModal/ShipmentMethodsCalculateModal";
import type { ShipmentMethodsCalculateModalProps } from "@/common/components/_shipment/ShipmentMethodsCalculateModal/ShipmentMethodsCalculateModal";
import { useCart } from "@/common/hooks/useCart";
import { getPaymentLink } from "@/common/actions/payments";
import { toast } from "react-toastify";
import {
  CustomerContactDto,
  PaymentIntentShippingOptionsDto,
} from "@/common/types/api/types-from-swagger";

export type CustomShipmentDataType = PaymentIntentShippingOptionsDto & {
  object_id: string;
};

const ControllerDelivery = () => {
  const { cart } = useCart();
  const [customerContact, setCustomerContact] = useState<
    CustomerContactDto | undefined
  >(undefined);
  const [shipmentCalculatorDataModal, setShipmentCalculatorDataModal] =
    useState<ShipmentMethodsCalculateModalProps["modalData"]>({
      show: false,
      data: null,
    });

  const [shipmentData, setShipmentData] =
    useState<ShipmentMethodsCalculateModalProps["shipmentData"]>(null);

  const getPaymentIntent = async () => {
    try {
      if (cart.length === 0) {
        toast.error("Please add products to the cart");
        return;
      }

      if (!shipmentData) {
        toast.error("Please select a shipping method");
        return;
      }

      if (!customerContact) {
        toast.error("Please fill in the contact form");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { objectId, ...preparedShipmentData } = shipmentData;

      const preparedBody = {
        customerContact,
        lineItems: cart.map((item) => ({
          price_data: {
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
          product_id: item.id,
        })),
        shippingDetails: preparedShipmentData.shippingDetails,
        shippingOptions: [
          {
            ...preparedShipmentData.shippingOptions,
            fixed_amount: {
              amount: Math.round(
                preparedShipmentData.shippingOptions.fixed_amount.amount * 100
              ),
            },
          },
        ],
      };

      const response = await getPaymentLink(preparedBody);

      if (!response) {
        throw new Error("Failed to get payment link");
      }

      window.location.href = response.payment_link;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get payment link");
    }
  };

  if (cart.length === 0) return null;

  return (
    <div>
      <Title>Contact & Delivery Information</Title>
      <ContactsForm
        setCustomerContact={setCustomerContact}
        setShipmentCalculatorDataModal={setShipmentCalculatorDataModal}
      />
      <ShipmentMethodsCalculateModal
        modalData={shipmentCalculatorDataModal}
        onClose={() =>
          setShipmentCalculatorDataModal({ show: false, data: null })
        }
        shipmentData={shipmentData}
        setShipmentData={setShipmentData}
        onCheckout={getPaymentIntent}
      />
    </div>
  );
};

export default ControllerDelivery;
