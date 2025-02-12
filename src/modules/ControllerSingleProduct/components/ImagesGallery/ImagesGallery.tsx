"use client";

import { useState } from "react";
import { ProductsEntity } from "@/common/types/api/types-from-swagger";
import Image from "next/image";
import classNames from "classnames";

type ImagesGalleryProps = {
  title: ProductsEntity["title"];
  images: ProductsEntity["images"];
};

const ImagesGallery: React.FC<ImagesGalleryProps> = ({ title, images }) => {
  const mainImage = images.length ? images[0] : null;
  const galleryImages = images.length ? images : [];

  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showZoom, setShowZoom] = useState(false);

  const [activeImage, setActiveImage] = useState<string | null>(mainImage);

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  console.log("showZoom", showZoom);

  return (
    <>
      {activeImage && (
        <div
          className={classNames(
            "wco-rounded-md wco-border wco-border-gray-400 wco-relative wco-overflow-hidden",
            showZoom && "wco-cursor-all-scroll"
          )}
        >
          <div
            className="wco-mx-auto wco-min-h-[300px] md:wco-min-h-[450px] wco-h-full mwco-min-w-[400px] wco-relative"
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            onMouseMove={handleMouseMove}
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundSize: "85%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {showZoom && (
            <div
              className="wco-hidden md:wco-block wco-absolute wco-pointer-events-none wco-top-0 wco-bottom-0 wco-right-0 wco-left-0"
              style={{
                backgroundImage: `url(${activeImage})`,
                backgroundSize: "200%",
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          )}
        </div>
      )}
      <div className="wco-w-full wco-grid wco-grid-cols-6 wco-gap-2.5 wco-mt-2.5">
        {galleryImages.length > 0 &&
          galleryImages.map((image, index) => (
            <div className="wco-col-span-2 md:wco-col-span-1" key={index}>
              <div
                className={classNames(
                  "wco-cursor-pointer wco-flex wco-items-center wco-justify-center wco-rounded-md wco-border wco-border-gray-400 hover:wco-border-dark wco-p-2 wco-transition-all"
                )}
                onClick={() => setActiveImage(image)}
              >
                <div className="wco-relative wco-w-full wco-min-h-[60px]">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className={classNames(
                      "wco-object-contain wco-object-center wco-transition-all",
                      activeImage === image
                        ? "wco-grayscale-0 wco-opacity-100"
                        : "wco-opacity-45 wco-grayscale hover:wco-grayscale-0 hover:wco-opacity-100"
                    )}
                    sizes="200px"
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ImagesGallery;
