import { ProductsEntity } from "@/common/types/api/types-from-swagger";
import ImagesGallery from "./components/ImagesGallery";
import Title from "@/common/components/_UI/Title/Title";
import Price from "@/common/components/Price";
import { AddCartButton } from "./components/AddCartButton";
import { FeedbackButton } from "./components/FeedbackButton";
import { DescriptionModal } from "./components/DescriptionModal";
import { PreorderButton } from "./components/PreorderButton";

type ControllerSingleProductProps = {
  product: ProductsEntity;
};

const ControllerSingleProduct: React.FC<ControllerSingleProductProps> = ({
  product,
}) => {
  return (
    <>
      <div className="wco-w-full wco-grid wco-grid-cols-12 wco-gap-8">
        <div className="wco-col-span-12 md:wco-col-span-6">
          <ImagesGallery title={product.title} images={product.images} />
        </div>
        <div className="wco-col-span-12 md:wco-col-span-6 wco-pt-5 md:wco-pt-8">
          <div className="">
            <Title>{product.title}</Title>
            <Price className="wco-my-5" price={product.price} exlTax />

            <div className="wco-my-5">
              {product.is_coming_soon ? (
                <div className="wco-text-info">Coming soon</div>
              ) : (
                <>
                  {product.quantity > 1 && (
                    <div>
                      Remaining quantity:{" "}
                      <span className="wco-ml-1">{product.quantity}</span>
                      <span className="wco-ml-1 wco-text-xs">pcs.</span>
                    </div>
                  )}

                  {product.quantity === 1 && <div>Last item in stock</div>}

                  {product.quantity === 0 && (
                    <div className="wco-text-danger">Out of stock</div>
                  )}
                </>
              )}
            </div>

            {product?.short_description && (
              <div>{product.short_description}</div>
            )}

            <hr className="wco-my-5" />
            <div className="wco-flex wco-flex-col wco-gap-2.5">
              {product.description && (
                <DescriptionModal>
                  <div
                    className="wco-whitespace-break-spaces"
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </DescriptionModal>
              )}

              {product.quantity > 0 && <AddCartButton productId={product.id} />}

              {product.quantity === 0 && (
                <>
                  <PreorderButton product={product} />

                  <FeedbackButton
                    initialData={{
                      title: `Request from product - !${product.title}`,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControllerSingleProduct;
