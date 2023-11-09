import React from "react";
import dayjs from "dayjs";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";
import useTranslation from "next-translate/useTranslation";
const OrderHistoryRent = ({ order }) => {
  const { t } = useTranslation();
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "VND";
  return (
    <>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="uppercase text-sm font-medium">{order.invoice}</span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          {dayjs(order.createdAt).format("DD/MM/YYYY")}
        </span>
      </td>

      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">{t(`common:${order.paymentMethod}`)}</span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
        {order.statusRent === "Pending" && (
          <span className="text-orange-500">
            {t(`common:${order.statusRent}`)}
          </span>
        )}
        {order.statusRent === "Deposit" && (
          <span className="text-orange-500">
            {t(`common:${order.statusRent}`)}
          </span>
        )}
        {order.statusRent === "Cancel" && (
          <span className="text-red-500">
            {t(`common:${order.statusRent}`)}
          </span>
        )}
        {order.statusRent === "Processing" && (
          <span className="text-indigo-500">
            {t(`common:${order.statusRent}`)}
          </span>
        )}
        {order.statusRent === "RentedOut" && (
          <span className="text-indigo-500">
            {t(`common:${order?.statusRent}`)}
          </span>
        )}
        {order.statusRent === "Expired" && (
          <span className="text-red-500">
            {t(`common:${order?.statusRent}`)}
          </span>
        )}
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm font-bold">
          {order?.BillOfLadingCode ? order.BillOfLadingCode : "Chưa có"}
        </span>
      </td>
    </>
  );
};

export default OrderHistoryRent;
