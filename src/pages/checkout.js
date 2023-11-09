import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { CardElement } from "@stripe/react-stripe-js";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import { MdPayment } from "react-icons/md";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import CartItem from "@component/cart/CartItem";
import InputArea from "@component/form/InputArea";
import InputShipping from "@component/form/InputShipping";
import InputPayment from "@component/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useTranslation from "next-translate/useTranslation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { notifyError } from "@utils/toast";

import ShippingServices from "@services/ShippingServices";
import OrderServices from "@services/OrderServices";
import ProvincesServices from "@services/ProvincesServices";
import { Select } from "antd";

const Checkout = ({ Shipping, moneyUSD, city }) => {
  const {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    isCheckoutSubmit,
    handleCheck,
    handleWardChange,
    handleCityChange,
    handleDistrictChange,
    selectedDistrict,
    selectedWard,
    cityData,
    wardData,
    districtData
  } = useCheckoutSubmit({ city });

  const { t } = useTranslation();
  function hasUndefinedOrNull(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === undefined || obj[key] === null) {
          return true;
        }
      }
    }
    return false;
  }

  const handleTotalPriceUSD = () => {
    const usdTotal = parseFloat(total) * moneyUSD?.vnd?.usd;
    return usdTotal.toFixed(2);
  };

  const handlePayPalButtonClick = async (data, actions) => {
    const res = await handleCheck();
    const hasUndefinedNull = await hasUndefinedOrNull(res);
    const TotalPriceUSD = await handleTotalPriceUSD();

    if (hasUndefinedNull == false) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: TotalPriceUSD,
            },
          },
        ],
      });
    } else {
      notifyError(t("common:infoFull"));
    }
  };

  const handlePayPalApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      if (details.status == "COMPLETED") {
        const res = handleCheck();
        submitHandler(res);
      }
    });
  };
  return (
    <>
      <Layout
        title="Thanh toán sản phẩm"
        description="Đây là trang thanh toán sản phẩm"
      >
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="form-group">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      01. {t("common:personalDetails")}
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:firstName")}
                          name="firstName"
                          type="text"
                          placeholder={t("common:firstName")}
                        />
                        <Error errorName={errors.firstName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:lastName")}
                          name="lastName"
                          type="text"
                          placeholder={t("common:lastName")}
                        />
                        <Error errorName={errors.lastName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:emailAddress")}
                          name="email"
                          type="email"
                          placeholder={t("common:emailAddress")}
                        />
                        <Error errorName={errors.email} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:phoneNumber")}
                          name="contact"
                          type="tel"
                          placeholder={t("common:phoneNumber")}
                        />

                        <Error errorName={errors.contact} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02. {t("common:shippingDetails")}
                    </h2>

                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-6">
                        <InputArea
                          register={register}
                          label={t("common:streetAddress")}
                          name="address"
                          type="text"
                          placeholder={t("common:streetAddress")}
                        />
                        <Error errorName={errors.address} />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <Label label={"Tỉnh / Thành phố"} />
                        <Select
                          showSearch
                          className="w-[300px] lg:w-[220px]"
                          placeholder="Chọn tỉnh thành"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.children ?? "")
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={cityData?.code}
                          onChange={handleCityChange}
                        >
                          {city?.map((ct, i) => (
                            <Option key={i + 1} value={ct.code}>
                              {ct.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <Label label={"Quận / huyện"} />
                        <Select
                          showSearch
                          className="w-[300px] lg:w-[220px]"
                          placeholder="Chọn Quận / huyện"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.children ?? "")
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={districtData?.code}
                          onChange={handleDistrictChange}
                        >
                          {selectedDistrict?.map((d, i) => (
                            <Option key={i + 1} value={d.code}>
                              {d.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <Label label={"Phường / xã"} />
                        <Select
                          showSearch
                          className="w-[220px] placeholder:pt-10 "
                          placeholder="Chọn phường xã"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.children ?? "")
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={wardData?.code}
                          onChange={handleWardChange}
                        >
                          {selectedWard?.map((w, i) => (
                            <Option key={i + 1} value={w.code}>
                              {w.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <Label label={t("common:shippingMethod")} />
                    <div className="grid grid-cols-6 gap-6">
                      {Shipping?.map((item, i) => (
                        <div className="col-span-6 sm:col-span-3" key={i + 1}>
                          <InputShipping
                            currency={currency}
                            handleShippingCost={handleShippingCost}
                            register={register}
                            logo={item?.logo}
                            value={item?.transportunitname}
                            description={item?.description}
                            cost={item?.costs}
                          />
                          <Error errorName={errors.shippingOption} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      03. {t("common:paymentDetails")}
                    </h2>
                    {/* {showCard && (
                      <div className="mb-3">
                        <CardElement />{" "}
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                      </div>
                    )} */}
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:cashOnDelivery")}
                          value="Cash"
                          Icon={IoWalletSharp}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:Payment")}
                          value="Payment"
                          Icon={MdPayment}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>
                      {/* <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:creditCard")}
                          value="Card"
                          Icon={ImCreditCard}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div> */}
                      <div className="col-span-6 sm:col-span-3 ">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={"Thanh toán PayPal"}
                          value="PayPal"
                          Icon={ImCreditCard}
                        />

                        {/* <Error errorName={errors.paymentMethod} /> */}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                    <div className="col-span-6 sm:col-span-3">
                      <Link href="/">
                        <a className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full">
                          <span className="text-xl mr-2">
                            <IoReturnUpBackOutline />
                          </span>
                          {t("common:continueShoppingBtn")}
                        </a>
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      {
                        showCard !== "PayPal" ? (
                          <button
                            type="submit"
                            disabled={isEmpty || isCheckoutSubmit}
                            className="bg-green-600 hover:bg-green-600 border border-green-600 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                          >
                            {isCheckoutSubmit ? (
                              <span className="flex justify-center text-center">
                                {" "}
                                <img
                                  src="/loader/spinner.gif"
                                  alt="Loading"
                                  width={20}
                                  height={10}
                                />{" "}
                                <span className="ml-2">
                                  {t("common:processing")}
                                </span>
                              </span>
                            ) : (
                              <span className="flex justify-center text-center">
                                {t("common:confirmOrderBtn")}{" "}
                                <span className="text-xl ml-2">
                                  {" "}
                                  <IoArrowForward />
                                </span>
                              </span>
                            )}
                          </button>
                        ) : (
                          <PayPalScriptProvider
                            options={{
                              "client-id": process.env.NEXT_PUBLIC_CLIENT_ID,
                            }}
                          >
                            <PayPalButtons
                              createOrder={handlePayPalButtonClick}
                              onApprove={handlePayPalApprove}
                            />
                          </PayPalScriptProvider>
                        )

                        // (
                        // <button
                        //   type="submit"
                        //   disabled={isEmpty || !stripe || isCheckoutSubmit}
                        //   className="bg-green-600 hover:bg-green-600 border border-green-600 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                        // >
                        //   {isCheckoutSubmit ? (
                        //     <span className="flex justify-center text-center">
                        //       {" "}
                        //       <img
                        //         src="/loader/spinner.gif"
                        //         alt="Loading"
                        //         width={20}
                        //         height={10}
                        //       />{" "}
                        //       <span className="ml-2">
                        //         {t("common:processing")}
                        //       </span>
                        //     </span>
                        //   ) : (
                        //     <span className="flex justify-center text-center">
                        //       {("Thanh toán")}{" "}
                        //       <span className="text-xl ml-2">
                        //         {" "}
                        //         <IoArrowForward />
                        //       </span>
                        //     </span>
                        //   )}
                        // </button>)
                      }
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  {t("common:orderSummary")}
                </h2>

                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} currency={currency} />
                  ))}

                  {isEmpty && (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        {t("common:cartEmptyText")}
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                  <form className="w-full">
                    {couponInfo.couponCode ? (
                      <span className="bg-green-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                        {" "}
                        <p className="text-green-600">
                          {t("common:couponapplied")}{" "}
                        </p>{" "}
                        <span className="text-red-500 text-right">
                          {couponInfo.couponCode} {t("common:sale")}{" "}
                          {couponInfo.discountType.value}
                          {couponInfo.discountType.type == "percentage"
                            ? "%"
                            : "vnđ"}
                        </span>
                      </span>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start justify-end">
                        <input
                          ref={couponRef}
                          type="text"
                          placeholder={t("common:couponCode")}
                          className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-green-600 placeholder-gray-500 placeholder-opacity-75"
                        />
                        <button
                          onClick={handleCouponCode}
                          className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-green-600 h-12 text-sm lg:text-base w-full sm:w-auto"
                        >
                          {t("common:applyBtn")}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:subtotal")}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(cartTotal))}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:shippingCost")}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(shippingCost))}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:discount")}
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    -{" "}
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(discountAmount))}
                  </span>
                </div>
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    {t("common:totalCost")}
                    <span className="font-serif font-extrabold text-lg">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: currency,
                      }).format(Number(total))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const Shipping = await ShippingServices.getAllShipping();
  const moneyUSD = await OrderServices.getMoney();
  const city = await ProvincesServices.getCity();
  return {
    props: {
      Shipping,
      moneyUSD,
      city,
    },
  };
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
