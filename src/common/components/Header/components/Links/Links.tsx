"use client";

import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const linksData = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Contact Us",
    url: "/pages/contacts",
  },
];

type LinksProps = {
  className?: string;
};

const Links: React.FC<LinksProps> = ({ className }) => {
  const pathname = usePathname();

  return (
    <div className={classNames("wco-flex wco-gap-8 wco-text-sm", className)}>
      {linksData.map((link, index) => (
        <Link href={link.url} key={index}>
          <div
            className={classNames(
              pathname === link.url ? "wco-font-medium" : ""
            )}
          >
            {link.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Links;
