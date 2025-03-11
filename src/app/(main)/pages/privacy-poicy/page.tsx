import { MainLayout } from "@/common/layouts/MainLayout";
import { SinglePageLayout } from "@/common/layouts/SinglePageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WCO Market | Privacy Policy",
  description:
    "We are the WCO market. We understand the appeal of vintage Volkswagens and the desire to preserve their original beauty. This store is for you. We create retro parts for cars and buses.",
};

export default async function Page() {
  return (
    <MainLayout>
      <SinglePageLayout title="Privacy Policy.">
        <div className="md:wco-w-[600px] wco-mx-auto">
          This Privacy Policy describes how we collect, use, and protect your
          personal information when you visit or make a purchase from our
          website. By using our site, you agree to the terms outlined below.
          <ul className="wco-mt-5">
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">Information We Collect</h2>
              <div className="wco-mt-2">
                We may collect the following types of personal information:
                Name, email address, phone number, and shipping address. Payment
                information (e.g., credit card details), which is processed
                securely by third-party payment providers. Information about
                your use of our website, such as IP address, browser type, and
                cookies.
              </div>
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">How We Use Your Information</h2>
              We use the information collected for: Processing and fulfilling
              your orders. Communicating with you about your purchases or
              inquiries. Improving our website and services. Sending promotional
              offers, if you have opted to receive them.
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">Sharing Your Information</h2>
              We do not sell, rent, or trade your personal information. However,
              we may share it with: Third-party service providers, such as
              payment processors or shipping companies, to complete
              transactions. Authorities, if required by law or to protect our
              legal rights.
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">Cookies</h2>
              Our website uses cookies to enhance your browsing experience. You
              can choose to disable cookies in your browser settings, but some
              site features may not function properly as a result.
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">Data Security</h2>
              We implement industry-standard security measures to protect your
              personal information. However, no online data transmission is
              completely secure, and we cannot guarantee absolute security.
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">Your Rights</h2>
              You have the right to: Access, update, or delete your personal
              information. Opt-out of receiving promotional emails by using the
              unsubscribe link in our communications.
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">
                Changes to This Privacy Policy
              </h2>
              We may update this policy from time to time. Any changes will be
              posted on this page with the updated date.
            </li>
            <li className="wco-mb-5">
              <h2 className="wco-font-normal">Contact Us</h2>
              If you have any questions about this Privacy Policy, please
              contact us here
              <Link className="wco-ml-1 wco-text-primary" href="/pages/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </SinglePageLayout>
    </MainLayout>
  );
}
