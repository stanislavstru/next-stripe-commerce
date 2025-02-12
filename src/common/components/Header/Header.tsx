import mainIcon from "@/images/main-icon.svg";
import Image from "next/image";
import CartEmblem from "../CartEmblem";
import Link from "next/link";
import Container from "../Container";
import Links from "./components/Links";
import palmIcon from "@/images/palm-color-icon.svg";
import classNames from "classnames";

const VARIANT_CLASSES = {
  default: "wco-fixed wco-bg-white wco-border-b wco-border-third",
  transparent: "wco-absolute wco-bg-transparent wco-py-[2px]",
};

type HeaderProps = {
  variant?: "default" | "transparent";
  menuShow?: boolean;
  cartShow?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  variant,
  menuShow = false,
  cartShow = false,
}) => {
  return (
    <div
      className={classNames(
        VARIANT_CLASSES[variant || "default"],
        "wco-top-0 wco-left-0 wco-right-0 wco-z-20"
      )}
    >
      <Container className="wco-flex wco-justify-between wco-items-center wco-py-3">
        <Link className="wco-relative" href="/">
          <Image
            src={mainIcon}
            className="wco-z-10 wco-relative"
            width={150}
            alt={process.env.NEXT_PUBLIC_PROJECT_NAME || ""}
            priority
          />
          <div className="wco-absolute wco-z-0 wco-top-0 -wco-right-[29px] wco-rotate-[40deg]">
            <Image
              src={palmIcon}
              width={40}
              alt={process.env.NEXT_PUBLIC_PROJECT_NAME || ""}
              priority
            />
          </div>
        </Link>

        {menuShow && <Links className="wco-hidden md:wco-flex" />}

        {cartShow && <CartEmblem />}
      </Container>
    </div>
  );
};

export default Header;
