import dayjs from "dayjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
//internal import
import OrderTable from "@component/order/OrderTable";
import { FiSend } from "react-icons/fi";
import OrderRentTable from "@component/order/OrderRentTable";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";
import { useContext } from "react";

const InvoiceRent = ({ data, printRef, globalSetting, currency }) => {
  const { t } = useTranslation();

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
            {t("common:QR-check3")}
            {globalSetting.contact}
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
      ) : (
        <></>
      )}
      <div className="bg-indigo-50 p-8 rounded-t-xl">
        <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
          <div>
            <h1 className="font-bold font-serif text-2xl uppercase">
              {t("common:invoice")}
            </h1>
            <h6 className="text-gray-700">
              {t("common:status")} :{" "}
              {data.statusRent === "Pending" && (
                <span className="text-orange-500">
                  {t(`common:${data.statusRent}`)}
                </span>
              )}
              {data.statusRent === "Deposit" && (
                <span className="text-orange-500">
                  {t(`common:${data.statusRent}`)}
                </span>
              )}
              {data.statusRent === "Cancel" && (
                <span className="text-red-500">
                  {t(`common:${data.statusRent}`)}
                </span>
              )}
              {data.statusRent === "Processing" && (
                <span className="text-indigo-500">
                  {t(`common:${data.statusRent}`)}
                </span>
              )}
              {data.statusRent === "RentedOut" && (
                <span className="text-indigo-500">
                  {t(`common:${data.statusRent}`)}
                </span>
              )}
              {data.statusRent === "Expired" && (
                <span className="text-red-700">
                  {t(`common:${data.statusRent}`)}
                </span>
              )}
              {data.statusRent === "Deleted" && (
                <span className="text-red-700">
                  {t(`common:${data.statusRent}`)}
                </span>
              )}
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

            <div>
              <span className="font-bold mt-5 font-serif text-sm uppercase text-gray-600 block">
                {t("common:mymethod")}
              </span>
              <span className="text-sm text-gray-500 block">
                {t(`common:${data?.paymentMethod}`)}
              </span>
            </div>
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
                #{data.BillOfLadingCode}
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
            <span className="text-sm text-gray-500 block">
              <div>{data?.user_info?.name}</div>
              <div>{data?.user_info?.email}</div>
              <div>{data?.user_info?.contact}</div>
              <div>{data?.user_info?.address}</div>
              {data?.user_info?.country}, {data?.user_info?.city},{" "}
              {data?.user_info?.zipCode}
            </span>
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
                    className="font-serif font-semibold px-6 py-2 whitespace-normal w-10 text-gray-700 uppercase tracking-wider text-left"
                  >
                    {t("common:productName")}
                  </th>

                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    {t("common:startDate")}
                  </th>

                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    {t("common:endDate")}
                  </th>

                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    {t("common:Monthly-rent")}
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
                    {t("common:month")}
                  </th>

                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right"
                  >
                    {t("common:amount")}
                  </th>

                  <th
                    scope="col"
                    className="font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    {t("common:Deposit-fee")}
                  </th>
                </tr>
              </thead>
              <OrderRentTable data={data} currency={currency} />
            </table>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-100 p-10 bg-emerald-50">
        <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          {/* <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:paymentMethod")}
            </span>
            <span className="text-sm text-gray-500 font-semibold font-serif block">
              {data?.paymentMethod}
            </span>
          </div> */}

          {/* <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                        <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                            {t("common:shippingCost")}
                        </span>
                        <span className="text-sm text-gray-500 font-semibold font-serif block">

                            {Intl.NumberFormat("vi-VN", { style: "currency", currency: currency }).format(Number(data.shippingCost))}

                        </span>
                    </div> */}
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:feeMonth")}
            </span>
            <span className="text-xl text-gray-500 font-semibold font-serif block">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency,
              }).format(Number(data.total))}
            </span>
          </div>

          <div className="flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:Deposit-fee")}
            </span>
            <span className="text-xl text-gray-500 font-semibold font-serif block">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency,
              }).format(Number(data.subTotal))}
            </span>
            <p className="whitespace-normal font-sm text-gray-500">
              {t("common:feeAddText")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-wrap ">
            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
              {t("common:totalRent")}
            </span>
            <span className="text-2xl font-serif font-bold text-red-500 block">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: currency,
              }).format(Number(data.totalRent))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceRent;
