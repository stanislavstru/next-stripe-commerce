"use client";

import Link from "next/link";
import { useConfig } from "@/common/hooks/useConfig";

const Contacts = () => {
  const { config } = useConfig();

  return (
    <>
      <div className="wco-text-lg">{config?.business_company}</div>

      <div className="wco-mt-8">
        <Link
          className="wco-text-primary"
          href={`tel:${config?.business_phone}`}
        >
          {config?.business_phone}
        </Link>
      </div>
      <div>
        <Link
          className="wco-text-primary"
          href={`mailto:${config?.business_email}`}
        >
          {config?.business_email}
        </Link>
      </div>
    </>
  );
};

export default Contacts;
