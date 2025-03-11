"use client";

import bannerImage from "@/images/banner-mk5-2.jpg";
import Modal from "../../_UI/Modal";
import { useState } from "react";
import Button from "../../_UI/Button";
import Link from "next/link";
import { useModals } from "@/common/hooks/useModals";

const BannerMK5 = () => {
  const [showModal, setShowModal] = useState(false);
  const { toggleCallbackModal } = useModals();

  return (
    <>
      <div className="wco-p-4 wco-bg-white wco-border wco-border-third wco-rounded-md sm:wco-h-full wco-flex wco-flex-col md:wco-flex-row">
        <div
          className="wco-block sm:wco-hidden xl:wco-block wco-h-[500px] md:wco-h-full wco-w-full md:wco-w-[300px] md:wco-min-w-[300px]"
          style={{
            backgroundImage: `url(${bannerImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="xl:wco-ml-5 wco-text-sm wco-relative wco-py-4">
          <div className="wco-absolute wco-left-0 wco-right-0 wco-bottom-0 wco-top-0 wco-bg-gradient-to-b wco-from-transparent wco-from-20% wco-to-white wco-to-75%" />
          <p className="wco-font-medium !wco-text-lg">VW MK4 Giveaway! 🚗</p>

          <p className="wco-mt-5 ">
            We’re giving away two custom covers for the VW MK4 - a washer fluid
            cover and a battery cover!🔥
          </p>
          <ul className="wco-list-disc wco-list-inside wco-mt-5">
            <li className="wco-font-medium">Made from ABS plastic</li>
            <li className="wco-font-medium ">
              Fit for all engines and accumulator bateries.
            </li>
            <li>
              Please note: The washer fluid cover is only compatible with
              vehicles that have a 3-liter reservoir.
            </li>
          </ul>
          <p className="wco-mt-2">How to Enter:</p>
          <ul className="wco-list-disc wco-list-inside">
            <li>
              Tag three friends who own an MK4 in the comments of this post in
              instagram.
            </li>
          </ul>
          <div className="wco-absolute wco-bottom-10 wco-w-full wco-flex wco-justify-center">
            <Button onClick={() => setShowModal(true)} uppercase>
              Find out more
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="VW MK4 Giveaway"
        className="wco-max-w-[700px]"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <div>
          <p className="wco-font-medium">
            We’re giving away two custom covers for the VW MK4 -{" "}
            <Link
              href="/product/engine-panel-vw-mk4-with-bracket-for-3l-washer-fluid-tank"
              target="_blank"
            >
              a washer fluid cover
            </Link>{" "}
            and{" "}
            <Link
              href="/product/battery-place-a-panel-for-vw-mk4-bora-jetta-golf-16-18t-vr6-tdi-r32"
              target="_blank"
            >
              a battery cover
            </Link>
            !
          </p>
          <ul className="wco-list-disc wco-list-inside wco-mt-4">
            <li>Made from ABS plastic</li>
            <li>Fit for all engines and accumulator bateries.</li>
            <li>
              Please note: The washer fluid cover is only compatible with
              vehicles that have a 3-liter reservoir.
            </li>
          </ul>
          <p className="wco-mt-5 wco-font-medium">How to Enter:</p>
          <ul className="wco-list-disc wco-list-inside wco-mt-3">
            <li>
              Tag three friends who own an MK4 in the comments in instagram.{" "}
              <Link
                href="https://www.instagram.com/p/DGozdyFu6WR"
                target="_blank"
              >
                Link to post.
              </Link>
            </li>
            <li>
              Subscribe to the WCO Market newsletter (link in bio) and required
              write your instagram.
            </li>
            <li>
              (Optional) Share this post in your stories and tag us for an extra
              entry!
            </li>
          </ul>

          <p className="wco-mt-5 wco-font-medium">
            📅<span className="wco-ml-2">Giveaway ends on March 29!</span>
          </p>
          <p className="wco-mt-5">
            The winner will be randomly selected from our newsletter subscribers
            and announced on March <span className="wco-font-sans">30</span> via
            Instagram Stories and email.
            <span className="wco-font-medium">
              {`🚀 We'll ship the covers for free!`}
            </span>
          </p>

          <p className="wco-mt-5 wco-font-medium">
            📦<span className="wco-ml-2">Shipping available to worldwide.</span>
          </p>

          <p className="wco-mt-5 wco-font-medium">Good luck! 🍀 </p>

          <div className="wco-flex wco-flex-col md:wco-flex-row wco-gap-5 wco-justify-center wco-mt-8">
            <Link
              href="https://www.instagram.com/p/DGozdyFu6WR"
              target="_blank"
            >
              <Button
                className="wco-w-full md:wco-w-auto"
                size="sm"
                variant="outline"
                uppercase
              >
                To Instagram post
              </Button>
            </Link>
            <Button
              className="wco-w-full md:wco-w-auto"
              size="sm"
              variant="outline"
              uppercase
              onClick={() => toggleCallbackModal(false)}
            >
              newsletter subscription
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BannerMK5;
