import { MainLayout } from "@/common/layouts/MainLayout";
import { SinglePageLayout } from "@/common/layouts/SinglePageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WCO Market | Terms of service",
  description:
    "We are the WCO market. We understand the appeal of vintage Volkswagens and the desire to preserve their original beauty. This store is for you. We create retro parts for cars and buses.",
};

export default async function Page() {
  return (
    <MainLayout>
      <SinglePageLayout title="Terms of service.">
        <div className="md:wco-w-[600px] wco-mx-auto">
          <ul>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">1. General Terms</h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>
                  1.1. This website is operated by Wrongcars LLC. Throughout the
                  site, the terms “we”, “us” and “our” refer to Wrongcars LLC.
                </li>
                <li>
                  1.2. By using this website, you confirm that you are at least
                  18 years old or have the consent of a legal guardian.{" "}
                </li>
                <li>
                  1.3. We reserve the right to update or modify these terms at
                  any time without prior notice. Your continued use of the site
                  signifies your acceptance of any changes.
                </li>
              </ul>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">2. Products and Services</h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>
                  2.1. We specialize in selling decorative automotive parts
                  designed to enhance the appearance of your vehicle.
                </li>
                <li>
                  2.2. All product descriptions, images, and pricing are
                  provided to the best of our ability but may contain occasional
                  errors. We reserve the right to correct any inaccuracies
                  without prior notice.
                </li>
                <li>
                  2.3. Installation of our products is the responsibility of the
                  customer.
                </li>
              </ul>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">3. Orders and Payments</h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>
                  3.1. By placing an order, you agree to provide accurate and
                  complete information.
                </li>
                <li>
                  3.2. Payments must be made in full at the time of purchase.
                </li>
                <li>
                  3.3. Orders may be canceled or modified only if they have not
                  yet been shipped. Please contact us immediately for
                  assistance.
                </li>
              </ul>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">4. Shipping and Delivery</h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>4.1. We ship within the USA and Canada using USPS.</li>
                <li>
                  4.2. In-stock products are shipped within three business days.
                  Delivery times may vary depending on the destination.
                </li>
                <li>
                  4.3. Customers are responsible for providing accurate shipping
                  information. We are not liable for lost shipments due to
                  incorrect addresses.
                </li>
              </ul>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">5. Returns and Refunds</h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>
                  5.1. Returns are accepted within 15 days of purchase for a
                  refund. Returned items must be in clean, unused condition,
                  with all original packaging intact.
                </li>
                <li>
                  5.2. Customers are responsible for return shipping costs.
                </li>
                <li>
                  5.3. Damage claims for shipping issues must be reported to the
                  courier at the time of delivery. Claims submitted after three
                  days of delivery will not be considered.
                </li>
              </ul>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">
                6. Product Fitment and Compatibility
              </h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>
                  6.1. Customers are responsible for ensuring the compatibility
                  of purchased parts with their vehicles.
                </li>
                <li>
                  6.2. If you have questions about fitment, please contact us
                  before placing an order.
                </li>
              </ul>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">7. Intellectual Property</h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>
                  7.1. All content on this website, including text, images,
                  logos, and product designs, is the property of Wrongcars LLC.
                </li>
                <li>
                  7.2. You may not reproduce, distribute, or use any content
                  without our prior written consent.
                </li>
              </ul>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">8. Limitation of Liability</h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>
                  {`8.1. Our products are designed to enhance only the aesthetic
                  appearance of your vehicle. It is the responsibility of the
                  customer to ensure that the installation and usage of these
                  products comply with all applicable laws and regulations in
                  the customer's country. We do not accept any liability for
                  issues arising from non-compliance with legal requirements.`}
                </li>
                <li>
                  8.2 We are not responsible for any damages, accidents, or
                  legal issues that may arise from the use of our products. The
                  customer assumes all risks associated with the installation
                  and use of our products.
                </li>
              </ul>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">9. Contact Information</h2>
              <ul className="wco-pl-3 wco-mt-2">
                <li>
                  If you have any questions about these Terms of Service, please
                  contact us here
                  <Link
                    className="wco-ml-1 wco-text-primary"
                    href="/pages/contact"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SinglePageLayout>
    </MainLayout>
  );
}
