import dayjs from "dayjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
//internal import
import OrderTable from "@component/order/OrderTable";
import { FiSend } from "react-icons/fi";

const Invoice = ({ data, printRef, globalSetting, currency }) => {
  const { t } = useTranslation();
  console.log(data);;
  return (
    <div ref={printRef}>
      {data?.paymentMethod == "Payment" && data?.statusPayment == "Unpaid" ? (

        <div className="pb-10 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
          <span className="mb-1 font-bold font-serif text-center text-[20px] uppercase text-gray-600 block">
            {t("common:QR")}
          </span>
          <span className="mb-1 font-bold text-center text-sm uppercase text-red-500  block">
            {t("common:QR-check")}
          </span>
          <span className="mb-1 font-bold text-center text-sm uppercase text-red-500  block">
            {t("common:QR-check2")}
          </span>
          <span className="mb-1 font-bold text-center text-[12px] uppercase text-green-500  block">
            {t("common:QR-check3")}{globalSetting.contact}
          </span>
          <img
            src={globalSetting.qrmomoimage}
            className="w-[200px] h-[250px] mx-auto"
          />
        </div>
      ) : data?.paymentMethod == "Payment" && data?.statusPayment == "Pay" ? (

        <div className="py-5 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">

          <span className="mb-1 font-bold text-center text-sm uppercase text-green-500  block">
            {t("common:QR-Success")}
          </span>

        </div>
      ) : (<></>)}

      <div className="bg-indigo-50 p-8 rounded-t-xl">
        <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
          <div>
            <h1 className="font-bold font-serif text-2xl uppercase">
              {t("common:invoice")}
            </h1>
            <h6 className="text-gray-700 mb-3">
              {t("common:status")} :{" "}
              {data.status === "Delivered" && (
                <span className="text-emerald-500">
                  {t(`common:${data.status}`)}
                </span>
              )}
              {data.status === "InTransit" && (
                <span className="text-emerald-500">
                  {t(`common:${data.status}`)}
                </span>
              )}
              {data.status === "Pending" && (
                <span className="text-orange-500">
                  {t(`common:${data.status}`)}
                </span>
              )}
              {data.status === "Cancel" && (
                <span className="text-red-500">
                  {t(`common:${data.status}`)}
                </span>
              )}
              {data.status === "Processing" && (
                <span className="text-indigo-500">
                  {t(`common:${data.status}`)}  
                </span>
              )}
              {data.status === "Deleted" && (
                <span className="text-red-700">
                  {t(`common:${data.status}`)}
                </span>
              )}
            </h6>
          </div>
            <div>
            <h2 className="font-bold font-serif text-gray-600 uppercase">
              {t("common:Delivery")}
            </h2>
            <h6 className="text-gray-700 mb-3">
              {data.shippingOption}
            </h6>
            </div>
          <div className="lg:text-right text-left">
            <h2 className="text-lg font-serif font-semibold mt-4 lg:mt-0 md:mt-0">
              <Link href="/">
                <div className="flex">
                  {/* <FiSend className="text-4xl" /> */}
                  <h6 className="ml-2 text-3xl">{globalSetting?.shop_name}</h6>
                </div>
              </Link>
            </h2>
            <p className="text-sm text-gray-500">
              {globalSetting?.address ||
                "Cecilia Chapman, 561-4535 Nulla LA, <br /> United States 96522"}
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:date")}
            </span>
            <span className="text-sm text-gray-500 block">
              {data.createdAt !== undefined && (
                <span>{dayjs(data?.createdAt).format("DD/MM/YYYY")}</span>
              )}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:invoiceNo")}
            </span>
            <span className="text-sm text-gray-500 block">
              #{data?.invoice}
            </span>
            <span className="font-bold font-serif mt-5 text-sm uppercase text-gray-600 block">
              {t("common:BillOfLadingCode")}
            </span>
            {data?.BillOfLadingCode ? (
              <span className="text-sm text-gray-500 block">
                #{data?.BillOfLadingCode}
              </span>
            ) : (
              <span className="text-sm text-gray-500 block">
                Chưa có mã vận đơn
              </span>
            )}
          </div>
          <div className="flex flex-col lg:text-right text-left">
            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:invoiceTo")}
            </span>
            <div className="text-sm text-gray-500 block">
              <div>{data?.user_info?.name}</div>
              <div>{data?.user_info?.email}</div>
              <div>{data?.user_info?.contact}</div>
              <div>{data?.user_info?.address}</div>
              {data?.user_info?.country}, {data?.user_info?.city},{" "}
              {data?.user_info?.zipCode}
            </div>
          </div>
        </div>
      </div>
      <div className="s">
        <div className="overflow-hidden lg:overflow-visible px-8 my-10">
          <div className="-my-2 overflow-x-auto">
            <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-xs bg-gray-100">
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                  >
                    {t("common:sr")}
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                  >
                    {t("common:productName")}
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    {t("common:quantity")}
                  </th>
                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    {t("common:itemPrice")}
                  </th>

                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right"
                  >
                    {t("common:amount")}
                  </th>
                </tr>
              </thead>
              <OrderTable data={data} currency={currency} />
            </table>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-100 p-10 bg-emerald-50">
        <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:paymentMethod")}
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {t(`common:${data?.paymentMethod}`)}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:shippingCost")}
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency,
              }).format(Number(data.shippingCost))}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:discount")}
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency,
              }).format(Number(data.discount))}
            </span>
          </div>
          <div className="flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:totalAmount")}
            </span>
            <span className="text-2xl font-serif font-bold text-red-500 block">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency,
              }).format(Number(data.total))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
