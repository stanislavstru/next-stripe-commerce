"use client";

import Container from "../Container";
import { useConfig } from "@/common/hooks/useConfig";
import mainIcon from "@/images/main-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useModals } from "@/common/hooks/useModals";
import Button from "../_UI/Button";
import ModalSubscribe from "../_modals/ModalSubscribe";

const FOOTER_TITLE_CLASS =
  "wco-uppercase wco-mb-3 wco-text-lg wco-font-semibold";

const Footer = () => {
  const { config } = useConfig();
  const { toggleCallbackModal } = useModals();

  return (
    <>
      <footer className="wco-min-h-[200px] wco-mt-5 md:wco-mt-[50px] wco-text-sm wco-border-t wco-py-[50px]">
        <Container>
          <div className="wco-grid wco-grid-cols-12 wco-gap-y-12 md:wco-gap-12">
            <div className="wco-col-span-12 md:wco-col-span-4">
              <div className={FOOTER_TITLE_CLASS}>Site sections</div>
              <div className="wco-flex wco-flex-col wco-divide-y wco-mt-5">
                <Link className="hover:wco-bg-gray-200" href="/">
                  <div className="wco-py-3 wco-pl-2">Home</div>
                </Link>
                <Link className="hover:wco-bg-gray-200" href="/pages/contacts">
                  <div className="wco-py-3 wco-pl-2">Contact Us</div>
                </Link>
                <Link className="hover:wco-bg-gray-200" href="/subscription">
                  <div className="wco-py-3 wco-pl-2">Subscription</div>
                </Link>
              </div>
            </div>
            <div className="wco-col-span-12 md:wco-col-span-4">
              <div className={FOOTER_TITLE_CLASS}>Company & Support</div>
              <div className="wco-flex wco-flex-col wco-divide-y wco-mt-5">
                <Link
                  className="hover:wco-bg-gray-200"
                  href="/pages/return-policy"
                >
                  <div className="wco-py-3 wco-pl-2">Return policy</div>
                </Link>
                <Link
                  className="hover:wco-bg-gray-200"
                  href="/pages/shipping-policy"
                >
                  <div className="wco-py-3 wco-pl-2">Shipping policy</div>{" "}
                </Link>
                <Link
                  className="hover:wco-bg-gray-200"
                  href="/pages/privacy-poicy"
                >
                  <div className="wco-py-3 wco-pl-2">Privacy Policy</div>{" "}
                </Link>
                <Link
                  className="hover:wco-bg-gray-200"
                  href="/pages/terms-of-service"
                >
                  <div className="wco-py-3 wco-pl-2">Terms of service</div>
                </Link>
              </div>
            </div>
            <div className="wco-col-span-12 md:wco-col-span-4">
              <div className={FOOTER_TITLE_CLASS}>Contacts</div>
              <div className="wco-mt-8 wo">
                We are from the state of Florida.
              </div>
              <Link href={`tel:${config?.business_email}`}>
                <div className="wco-mt-5 wco-font-sans">
                  {config?.business_phone}
                </div>{" "}
              </Link>
              <div className="wco-mt-2">
                <Link href={`mailto:${config?.business_email}`}>
                  {config?.business_email}
                </Link>
              </div>
              <div className="wco-mt-8">
                <Button
                  size="sm"
                  uppercase
                  variant="outline"
                  onClick={toggleCallbackModal}
                >
                  Join Our Newsletter
                </Button>
              </div>
            </div>
          </div>
          <div className="wco-mt-[100px] wco-flex wco-flex-col wco-items-center">
            <Link href="/">
              <Image
                src={mainIcon}
                width={150}
                alt={process.env.NEXT_PUBLIC_PROJECT_NAME || ""}
                priority
              />
            </Link>
            <div className="wco-mt-10">
              <span>©</span>
              <span className="wco-ml-1">{new Date().getFullYear()}</span>
              <span className="wco-ml-1">{config?.business_company}</span>
            </div>
          </div>
        </Container>
      </footer>
      <ModalSubscribe />
    </>
  );
};

export default Footer;
