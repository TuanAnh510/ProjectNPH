import Discount from "@component/common/Discount";
import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";
import { showingTranslateValue } from "@utils/translate";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { Rate } from "antd";
import { useRouter } from "next/router";
import { SidebarContext } from "@context/SidebarContext";
import { useContext } from "react";

const ProductCardRent = ({ product, attributes }) => {
  const { lang } = useTranslation("ns1"); // default namespace (optional)
  const { t } = useTranslation();
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const { setIsLoading, isLoading } = useContext(SidebarContext);

  const currency = globalSetting?.default_currency || "VND";
  const router = useRouter();

  const handleMoreInfo = (slug) => {
    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
  };

  return (
    <>
      <div className="group box-border overflow-hidden flex rounded-md shadow-lg pe-0 flex-col items-center bg-white relative">
        <div
          onClick={() => handleMoreInfo(product.slug)}
          className="relative flex justify-center w-full cursor-pointer pt-4"
        >
          <div className="left-2">
            <Stock product={product} stock={product.stock} card />
          </div>

          <Discount product={product} />

          {product?.image[0] ? (
            <Image
              src={product.image[0]}
              width={210}
              height={210}
              alt="product"
              className="object-contain  transition duration-150 ease-linear transform group-hover:scale-105"
            />
          ) : (
            <Image
              src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
              width={210}
              height={210}
              alt="product"
              className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
            />
          )}
        </div>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {product.unit}
            </span>
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2">
                {showingTranslateValue(product?.title, lang)}
              </span>
            </h2>
          </div>
          <div className="flex max-w-[100%] lg:max-w-[80%]">
            <Rate
              value={product?.averagerating == 0 ? 5 : product.averagerating}
              style={{
                fontSize: "15px",
                width: "80%",
                position: "static",
              }}
              disabled
            />
            {/* <div>({product?.totalrating})</div> */}
          </div>

          <div className="flex lg:flex-none flex-wrap justify-between items-center text-heading space-s-2">
            <Price
              card
              product={product}
              currency={currency}
              price={product.prices.price}
              originalPrice={product?.prices?.originalPrice}
            />

            {/* <button
              aria-label="cart"
              className="h-7 w-7 sm:h-9 sm:w-9 lg:h-9 lg:w-9 xl:h-9 xl:w-9 flex items-center justify-center border border-gray-200 rounded-full text-green-600 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
            >
              {" "}
              <span className="text-xl">
                <FiHeart />
              </span>{" "}
            </button> */}

            {/* <button
              aria-label="cart"
              className="h-7 w-7 sm:h-9 sm:w-9 lg:h-9 lg:w-9 xl:h-9 xl:w-9 hidden md:hidden lg:block border border-gray-200 rounded-full text-green-600 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
            >
              {" "}
              <span className="text-xl flex justify-center">
                <BiGitCompare />
              </span>{" "}
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCardRent), { ssr: false });
