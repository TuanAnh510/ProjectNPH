import Image from "next/image";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import ImageCarousel from "@component/carousel/ImageCarousel";
import Discount from "@component/common/Discount";
import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import Tags from "@component/common/Tags";
import ProductCard from "@component/product/ProductCard";
import Card from "@component/slug-card/Card";
import VariantList from "@component/variants/VariantList";
import Layout from "@layout/Layout";
import AttributeServices from "@services/AttributeServices";
import ProductServices from "@services/ProductServices";
import { showingTranslateValue } from "@utils/translate";
import Feeback from "@component/feeback/feeback";
import StickyCart from "@component/cart/StickyCart";
import useProductDetail from "@hooks/useProductDetail";
import { DatePicker } from "antd";

const ProductScreen = ({ product, attributes, relatedProduct }) => {
  const {
    router,
    prevRef,
    nextRef,
    userInfo,
    currency,
    isLoading,
    setIsLoading,
    item,
    setItem,
    handleAddItemRent,
    itemRent,
    setItemRent,
    lang,
    setValue,
    price,
    img,
    originalPrice,
    stock,
    selectVariant,
    setSelectVariant,
    isReadMore,
    setIsReadMore,
    setSelectVa,
    variantTitle,
    styleCheck,
    handleChangeSelect,
    handleAddToCart,
    handleChangeImage,
    t,
    category_name,
    startDate,
    endDate,
    handleStartDateChange,
    monthRent,
    handleEndDateChange,
    handleCheckout,
    handleCheckoutRent,
  } = useProductDetail({ product, attributes, relatedProduct });

  return (
    <>
      <Layout
        title="Chi tiết sản phẩm"
        description="Đây là trang chi tiết sản phẩm"
      >
        <StickyCart />
        {/* {isLoading ? (
          <Loading loading={isLoading} />
        ) : ( */}
        <div className="px-0 py-10 lg:py-10">
          <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
            <div className="flex items-center pb-4">
              <ol className="flex items-center w-full overflow-hidden font-serif list-none">
                <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-green-600 font-semibold">
                  <Link href="/">
                    <a>{t("common:HOME")}</a>
                  </Link>
                </li>
                <li className="text-sm mt-[1px]">
                  {" "}
                  <FiChevronRight />{" "}
                </li>
                <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-green-600 font-semibold ">

                  <Link

                    href={`/search?category=${category_name.name.vi}&_id=${category_name._id}`}
                  >
                    <button
                      className="pr-2 font-normal"
                      type="button"
                      onClick={() => setIsLoading(!isLoading)}
                    >
                      {category_name.name.vi}
                    </button>

                  </Link>



                </li>
                <li className="text-sm mt-[1px]">
                  {" "}
                  <FiChevronRight />{" "}
                </li>
                <li className="text-sm px-1 transition duration-200 ease-in ">
                  {showingTranslateValue(product?.title, lang)}
                </li>
              </ol>
            </div>

            <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
              <div className="flex flex-col xl:flex-row">
                <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12">
                  <Discount slug={true} product={product} />

                  {product?.image[0] ? (
                    <Image
                      src={img || product?.image[0]}
                      alt="product"
                      width={650}
                      height={650}
                      priority
                    />
                  ) : (
                    <Image
                      src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                      width={650}
                      height={650}
                      alt="product Image"
                    />
                  )}

                  {product.image.length > 1 && (
                    <div className="flex flex-row flex-wrap mt-4 border-t">
                      <ImageCarousel
                        images={product?.image}
                        handleChangeImage={handleChangeImage}
                        prevRef={prevRef}
                        nextRef={nextRef}
                      />
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                    <div className=" w-full xl:pr-6 md:pr-6  md:w-2/3 mob-w-full">
                      <div className="mb-6">
                        <h1 className="leading-7 text-lg md:text-xl lg:text-2xl mb-1 font-semibold font-serif text-gray-800">
                          {showingTranslateValue(product?.title, lang)}

                        </h1>

                        <p className="uppercase font-serif font-medium text-gray-500 text-sm">
                          SKU :{" "}
                          <span className="font-bold text-gray-600">
                            {product?.sku}
                          </span>
                        </p>

                        <div className="relative">
                          <Stock stock={stock} />
                        </div>
                      </div>

                      {/* Checkpayment,Rent */}

                      {styleCheck === "payment" ? (
                        <>
                          <Price
                            price={price}
                            product={product}
                            currency={currency}
                            originalPrice={originalPrice}
                          />
                          <div className="mb-4">
                            {variantTitle?.map((a, i) => (
                              <span key={i + 1}>
                                <h4 className="text-sm py-1">
                                  {showingTranslateValue(a?.name, lang)}:
                                </h4>
                                <div className="flex flex-row mb-3">
                                  <VariantList
                                    att={a._id}
                                    lang={lang}
                                    option={a.option}
                                    setValue={setValue}
                                    varTitle={variantTitle}
                                    setSelectVa={setSelectVa}
                                    variants={product.variants}
                                    selectVariant={selectVariant}
                                    setSelectVariant={setSelectVariant}
                                  />
                                </div>
                              </span>
                            ))}
                          </div>

                          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-0"></div>
                          {product?.rent?.depositcost &&
                            product?.rent?.monthlyrent &&
                            product?.rent?.agree ? (
                            <div className="mt-5">
                              <label className="font-bold">
                                {t("common:method")}
                              </label>
                              <select
                                value={styleCheck}
                                onChange={handleChangeSelect}
                                className="block appearance-none  w-[80%] lg:w-[40%]  border-2 border-black hover:border-green-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 "
                              >
                                <option value="payment">
                                  {t("common:Option1")}
                                </option>
                                <option value="rent">
                                  {t("common:Option2")}
                                </option>
                              </select>
                            </div>
                          ) : (
                            <></>
                          )}

                          <div className="flex items-center mt-4">
                            <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                              <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                                <button
                                  onClick={() => setItem(item - 1)}
                                  disabled={item === 1}
                                  className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                                >
                                  <span className="text-dark text-base">
                                    <FiMinus />
                                  </span>
                                </button>
                                <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                                  {item}
                                </p>
                                <button
                                  onClick={() => setItem(item + 1)}
                                  disabled={selectVariant?.quantity <= item}
                                  className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                                >
                                  <span className="text-dark text-base">
                                    <FiPlus />
                                  </span>
                                </button>
                              </div>

                              <button
                                onClick={() => handleAddToCart(product)}
                                className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-green-600 hover:bg-green-600 w-full h-12"
                              >
                                {"Thêm vào giỏ hàng"}
                              </button>
                              <button
                                disabled={item?.length == 0}
                                onClick={() => handleCheckout()}
                                className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-5 lg:px-7 py-4 md:py-3.5 lg:py-4 hover:text-white bg-green-600 hover:bg-green-600 w-full h-12"
                              >
                                {"Thanh toán"}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex gap-3">
                            <label> {t("common:Monthly-rent")}: </label>
                            <span className="text-lg font-semibold text-gray-800">
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: currency,
                              }).format(Number(product?.rent?.monthlyrent))}
                            </span>
                          </div>

                          <div className="flex gap-3">
                            <p className="">{t("common:Deposit-fee")}:</p>
                            <span className="text-lg font-semibold text-gray-800">
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: currency,
                              }).format(Number(product?.rent?.depositcost))}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <label className="">Từ ngày:</label>
                            <DatePicker
                              className="w-[200px]"
                              selected={startDate}
                              onChange={handleStartDateChange}
                              dateFormat="dd/MM/yyyy"
                              minDate={new Date()}
                              placeholder="Chọn ngày bắt đầu "
                            />
                          </div>
                          <div className="flex flex-col mt-2">
                            {" "}
                            <label>Đến:</label>
                            <DatePicker
                              className="w-[200px]"
                              selected={endDate}
                              onChange={handleEndDateChange}
                              dateFormat="dd/MM/yyyy"
                              minDate={new Date()}
                              placeholder="Chọn ngày kết thúc"
                            />
                          </div>

                          <div className="mt-5">
                            <label className="">{t("common:method")}</label>
                            <select
                              value={styleCheck}
                              onChange={handleChangeSelect}
                              className="block appearance-none w-[80%] lg:w-[40%]  border border-gray-300 hover:border-green-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 "
                            >
                              <option value="payment">
                                {t("common:Option1")}
                              </option>
                              <option value="rent">
                                {t("common:Option2")}
                              </option>
                            </select>
                          </div>
                          <div className="flex items-center mt-4">
                            <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                              <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                                <button
                                  onClick={() => setItemRent(itemRent - 1)}
                                  disabled={itemRent === 1}
                                  className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                                >
                                  <span className="text-dark text-base">
                                    <FiMinus />
                                  </span>
                                </button>
                                <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                                  {itemRent}
                                </p>
                                <button
                                  onClick={() => setItemRent(itemRent + 1)}
                                  disabled={selectVariant?.quantity <= itemRent}
                                  className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                                >
                                  <span className="text-dark text-base">
                                    <FiPlus />
                                  </span>
                                </button>
                              </div>

                              <button
                                onClick={() =>
                                  handleAddItemRent(
                                    product,
                                    startDate,
                                    endDate,
                                    monthRent
                                  )
                                }
                                className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-5 hover:text-white bg-green-600 hover:bg-green-600 w-full h-12"
                              >
                                {"Thêm vào giỏ hàng thuê"}
                              </button>
                              <button
                                disabled={itemRent?.length == 0}
                                onClick={() => handleCheckoutRent()}
                                className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-5 lg:px-7 py-4 md:py-3.5 lg:py-4 hover:text-white bg-green-600 hover:bg-green-600 w-full h-12"
                              >
                                {"Thanh toán"}
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {/* End */}
                      <div>
                        <div className="flex flex-col mt-4">
                          <span className="font-serif font-semibold py-1 text-sm d-block">
                            <span className="text-gray-800">
                              {t("common:category")}:
                            </span>{" "}
                            {product?.categories?.map((item, i) => (
                              <span
                                key={i + 1}
                                className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2"
                              >
                                <Link

                                  href={`/search?category=${item?.name?.vi}&_id=${item._id}`}
                                >
                                  <button
                                    className="pr-2 font-normal"
                                    type="button"
                                    onClick={() => setIsLoading(!isLoading)}
                                  >
                                    {(item?.name?.vi)}
                                  </button>

                                </Link>
                              </span>

                            ))}

                          </span>

                          <Tags product={product} />
                        </div>

                        {/* social share */}
                        <div className="mt-8">
                          <h3 className="text-base font-semibold mb-1 font-serif">
                            {t("common:shareYourSocial")}
                          </h3>
                          <p className="font-sans text-sm text-gray-500">
                            {t("common:shareYourSocialText")}
                          </p>
                          <ul className="flex mt-4">
                            <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-green-600  mr-2 transition ease-in-out duration-500">
                              <FacebookShareButton
                                url={`${process.env.NEXT_PUBLIC_STORE_DOMAIN}product/${router.query.slug}`}
                                quote=""
                              >
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                            </li>
                            <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-green-600  mr-2 transition ease-in-out duration-500">
                              <TwitterShareButton
                                url={`${process.env.NEXT_PUBLIC_STORE_DOMAIN}product/${router.query.slug}`}
                                quote=""
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                            </li>
                            <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-green-600  mr-2 transition ease-in-out duration-500">
                              <RedditShareButton
                                url={`${process.env.NEXT_PUBLIC_STORE_DOMAIN}product/${router.query.slug}`}
                                quote=""
                              >
                                <RedditIcon size={32} round />
                              </RedditShareButton>
                            </li>
                            <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-green-600  mr-2 transition ease-in-out duration-500">
                              <WhatsappShareButton
                                url={`${process.env.NEXT_PUBLIC_STORE_DOMAIN}product/${router.query.slug}`}
                                quote=""
                              >
                                <WhatsappIcon size={32} round />
                              </WhatsappShareButton>
                            </li>
                            <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-green-600  mr-2 transition ease-in-out duration-500">
                              <LinkedinShareButton
                                url={`${process.env.NEXT_PUBLIC_STORE_DOMAIN}product/${router.query.slug}`}
                                quote=""
                              >
                                <LinkedinIcon size={32} round />
                              </LinkedinShareButton>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* shipping description card */}

                    <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                      <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                        <Card />
                      </div>

                      {styleCheck === "payment" && (
                        <>
                          <Disclosure defaultOpen={false}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="mt-5 flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-green-600 bg-gray-50 hover:bg-green-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                  <span>{t("common:Faq-question2")}</span>
                                  <ChevronUpIcon
                                    className={`${open
                                      ? "transform rotate-180 text-green-600"
                                      : ""
                                      } w-5 h-5 text-gray-500`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 bg-[#f9fafb] pt-3 pb-8 text-sm leading-7 text-gray-500">
                                  <div className="text-[15px] mt-5 leading-6 h-[300px] overflow-y-auto text-black md:leading-7">
                                    <ul className="list-decimal mx-5 ">
                                      <div>
                                        <div
                                          className="whitespace-pre-wrap list-decimal"
                                          dangerouslySetInnerHTML={{
                                            __html: product?.rent?.agree,
                                          }}
                                        />
                                      </div>
                                    </ul>
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                          <Disclosure defaultOpen={true}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="mt-5 flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-green-600 bg-gray-50 hover:bg-green-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                  <span>{t("common:Faq-question1")}</span>
                                  <ChevronUpIcon
                                    className={`${open
                                      ? "transform rotate-180 text-green-600"
                                      : ""
                                      } w-5 h-5 text-gray-500`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 bg-[#f9fafb] pt-3 pb-8 text-sm leading-7 text-gray-500">
                                  <div className={`text-[15px] mt-3 leading-6 text-black md:leading-7 h-[400px] overflow-y-auto`}>
                                    {/* isReadMore */}

                                    <div
                                      className="whitespace-pre-wrap list-decimal"
                                      dangerouslySetInnerHTML={{
                                        __html: showingTranslateValue(
                                          product?.description,
                                          lang
                                        ),
                                      }}
                                    />
                                  </div>

                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </>
                      )}
                      {styleCheck === "rent" && (
                        <>
                          <Disclosure defaultOpen={true}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="mt-5 flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-green-600 bg-gray-50 hover:bg-green-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                  <span>{t("common:Faq-question2")}</span>
                                  <ChevronUpIcon
                                    className={`${open
                                      ? "transform rotate-180 text-green-600"
                                      : ""
                                      } w-5 h-5 text-gray-500`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 bg-[#f9fafb] pt-3 pb-8 text-sm leading-7 text-gray-500">
                                  <div className={`text-[15px] mt-3 leading-6 text-black md:leading-7 h-[400px] overflow-y-auto`}>
                                    <ul className="list-decimal mx-5 ">
                                      <div>
                                        <div
                                          className="whitespace-pre-wrap list-decimal"
                                          dangerouslySetInnerHTML={{
                                            __html: product?.rent?.agree,
                                          }}
                                        />
                                      </div>
                                    </ul>
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                          <Disclosure defaultOpen={false}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="mt-5 flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-green-600 bg-gray-50 hover:bg-green-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                  <span>{t("common:Faq-question1")}</span>
                                  <ChevronUpIcon
                                    className={`${open
                                      ? "transform rotate-180 text-green-600"
                                      : ""
                                      } w-5 h-5 text-gray-500`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 bg-[#f9fafb] pt-3 pb-8 text-sm leading-7 text-gray-500">
                                  <div className={`text-[15px] mt-3 leading-6 text-black md:leading-7 h-[400px] overflow-y-auto`}>
                                    {/* isReadMore */}

                                    <div
                                      className="whitespace-pre-wrap list-decimal"
                                      dangerouslySetInnerHTML={{
                                        __html: showingTranslateValue(
                                          product?.description,
                                          lang
                                        ),
                                      }}
                                    />
                                  </div>

                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* related products */}
            {relatedProduct?.length >= 2 && (
              <div className="pt-10 lg:pt-20 lg:pb-10">
                <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-serif hover:text-gray-600">
                  {t("common:relatedProducts")}
                </h3>
                <div className="flex">
                  <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {relatedProduct?.slice(1, 13).map((product, i) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <Feeback product={product} userInfo={userInfo} />
            </div>
          </div>
        </div>
        {/* )} */}
      </Layout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.params;

  const [data, attributes, product] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: "",
      title: slug,
    }),
    AttributeServices.getShowingAttributes({}),
    ProductServices.getProductBySlug(slug),
  ]);

  return {
    props: {
      product,
      relatedProduct: data?.relatedProduct,
      attributes,
      // rating,
    },
  };
};

export default ProductScreen;
