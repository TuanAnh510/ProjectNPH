import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoWalletSharp,
  IoBagHandle,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";

import InputArea from "@component/form/InputArea";

import useTranslation from "next-translate/useTranslation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { notifyError } from "@utils/toast";

import useCheckoutRentSubmit from "@hooks/useCheckoutRentSubmit";
import CartItemRent from "@component/cart/CartItemRent";
import OrderServices from "@services/OrderServices";
import ProductServices from "@services/ProductServices";
import { useEffect } from "react";
import InputPayment from "@component/form/InputPayment";
import axios from "axios";
import ProvincesServices from "@services/ProvincesServices";
import { Select } from "antd";

const CheckoutRent = ({ moneyUSD, region, city }) => {
  const [regionCost, setRegionCost] = useState(region[0]?.regioncost || "");
  const [selectedRegionId, setSelectedRegionId] = useState();

  const handleRegionChange = async (e) => {
    const selectedId = e.target.value;
    const selectedRegion = region.find((reg) => reg._id === selectedId);
    await setSelectedRegionId(selectedId);
    await setRegionCost(selectedRegion ? selectedRegion.regioncost : 0);
  };

  const {
    setTotal,
    discountPercentage,
    cartItems,
    totalPriceRent,
    handleSubmit,
    submitHandler,
    register,
    errors,
    discountAmount,
    total,
    isEmpty,
    currency,
    handleCheck,
    totalPriceRentMonth,
    setShowCard,
    showCard,
    isCheckoutSubmit,
    handleWardChange,
    handleCityChange,
    handleDistrictChange,
    selectedDistrict,
    selectedWard,
    cityData,
    wardData,
    districtData,
    totalPriceDateRent,
  } = useCheckoutRentSubmit({ city });

  useEffect(() => {
    let totalValue = "";
    let subTotal = parseFloat(totalPriceRent + Number(regionCost));
    totalValue = Number(subTotal);
    setTotal(totalValue);
  }, [totalPriceRent, discountPercentage, regionCost]);

  const { t } = useTranslation();
  function hasUndefinedOrNull(obj) {

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
          return "trues";
        }
      }
    }
    return "falses";
  }

  const handleTotalPriceUSD = () => {
    const usdTotal = parseFloat(total) * moneyUSD?.vnd?.usd;
    return usdTotal.toFixed(2);
  };

  const handlePayPalButtonClick = async (data, actions) => {

    const res = await handleCheck();
    const hasUndefinedNull = await hasUndefinedOrNull(res);
    const TotalPriceUSD = await handleTotalPriceUSD();

    if (hasUndefinedNull === "falses") {
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
    } else if (hasUndefinedNull == "trues") {
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
        title="Thanh toán thuê"
        description="Đây là trang thanh toán sản phẩm thuê"
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
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <Label label={"Vùng"} />
                        <select
                          defaultValue={selectedRegionId}
                          onChange={handleRegionChange}
                          className="block appearance-none w-[80%] lg:w-[80%] border border-gray-300 hover:border-green-600 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-green-600"
                        >
                          {region?.map((reg, i) => (
                            <option key={i + 1} value={reg._id}>
                              {reg.regionname}
                            </option>
                          ))}
                        </select>
                        <Error errorName={errors.regions} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      03. {t("common:paymentDetails")}
                    </h2>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={"Chuyển khoản ngân hàng"}
                          value="Payment"
                          Icon={IoWalletSharp}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>

                      <div className="col-span-6 sm:col-span-3 ">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={"Thanh toán PayPal"}
                          value="PayPal"
                          Icon={ImCreditCard}
                        />
                        <Error errorName={errors.PayPal} />
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
                      {showCard !== "PayPal" ? (
                        <button
                          type="submit"
                          disabled={cartItems.length == 0 || isCheckoutSubmit}
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
                              {"Đặt hàng và thanh toán"}{" "}
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
                      )}
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
                  {cartItems.map((item, i) => (
                    <CartItemRent key={i + 1} item={item} currency={currency} />
                  ))}

                  {cartItems.length == 0 && (
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

                <div className="flex items-center py-2 text-md w-full font-semibold text-red-500 last:border-b-0 last:text-base last:pb-0">
                  {"Phí thuê hàng tháng"}
                  <span className="ml-auto flex-shrink-0 text-red-500 font-bold">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(totalPriceRentMonth))}
                  </span>
                </div>
                <div className="flex items-center py-2 text-md w-full font-semibold text-orange-400 last:border-b-0 last:text-base last:pb-0">
                  {"Tổng tiền thuê"}
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    {" "}
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(totalPriceDateRent))}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {"Tiền cọc"}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(totalPriceRent))}
                  </span>
                </div>

                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {"Phí vùng"}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(regionCost))}
                  </span>
                </div>

                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    {"Tổng tiền cọc"}
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
  const moneyUSD = await OrderServices.getMoney();
  const region = await ProductServices.getRegion();
  const city = await ProvincesServices.getCity();

  return {
    props: {
      moneyUSD,
      region,
      city,
    },
  };
};

export default dynamic(() => Promise.resolve(CheckoutRent), { ssr: false });
