import React from "react";
import dayjs from "dayjs";
import { notifyError, notifySuccess } from "@utils/toast";
import { useContext } from "react";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";
import useTranslation from "next-translate/useTranslation";
import OrderServices from "@services/OrderServices";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";

const OrderHistory = ({ order }) => {
  const { t } = useTranslation();
  const { setIsUpdate } = useContext(SidebarContext);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "VND";

  const handleCancleOrders = (id) => {
    OrderServices.updateOrder(id, { status: "Cancel" })
      .then((res) => {
        notifySuccess("Cập nhật trạng thái thàng công!");
        setIsUpdate(true);
        order.status = "Cancel";
        window.location.reload();
      })
      .catch((err) => notifyError("Cập nhật trạng thái thất bại!"));
  };

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
        {order.status === "Delivered" && (
          <span className="text-emerald-500">
            {t(`common:${order?.status}`)}
          </span>
        )}
        {order.status === "Pending" && (
          <span className="text-orange-500">
            {t(`common:${order?.status}`)}
          </span>
        )}
        {order.status === "Cancel" && (
          <span className="text-red-500">{t(`common:${order?.status}`)}</span>
        )}
        {order.status === "InTransit" && (
          <span className="text-indigo-500">{t(`common:${order.status}`)}</span>
        )}
        {order.status === "Processing" && (
          <span className="text-indigo-500">
            {t(`common:${order?.status}`)}
          </span>
        )}
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm font-bold">
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: currency,
          }).format(Number(order?.total))}
        </span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm font-bold">
          {order?.BillOfLadingCode ? order.BillOfLadingCode : "Chưa có"}
        </span>
      </td>
      {order?.status === "Pending" ? (
        <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
          <button
            className="w-full py-3 px-3 rounded-lg flex items-center justify-between bg-heading text-sm sm:text-base text-white focus:outline-none transition duration-300"
            onClick={() => handleCancleOrders(order?._id)}
          >
            <span className="align-center text-center ml-auto mr-auto font-medium font-serif text-red-600">
              Hủy đơn
            </span>
          </button>
        </td>
      ) : (
        <>
          <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
            <span className="text-center ml-auto mr-auto font-medium font-serif text-gray-400">
              Đã duyệt
            </span>
          </td>
        </>
      )}
    </>
  );
};

export default OrderHistory;
