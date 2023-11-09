import { useState } from "react";
import OrderServices from "@services/OrderServices";
import { notifyError, notifySuccess } from "@utils/toast";
import useTranslation from "next-translate/useTranslation";
const useWarrantyCheck = () => {
  const [infor, setInfor] = useState([]);
  const [invoice, setInvoice] = useState();
  const [styleCheck, setStyleCheck] = useState("invoice");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const handleCheck = async () => {
    try {
      setLoading(true);
      if (invoice === undefined) {
        setLoading(false);
        notifyError(t("common:infoAdd"));
        return;
      }
      const res = await OrderServices.getOrderByInvoice(invoice);
      const findSale = res.filter(or => or.rent == "sale")
      if (res.length !== 0) {
        setLoading(false);
        setInfor(res);
        notifySuccess(t("common:infoFind"));
      } else {
        setLoading(false);
        notifyError(t("common:infoNotFound"));
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const handleCheckPhone = async () => {
    setLoading(true);
    try {

      if (invoice === undefined) {
        setLoading(false);
        notifyError(t("common:infoAdd"));
        return;
      }
      const res = await OrderServices.getOrderByPhone(invoice);
      const findSale = res.filter(or => or.rent == "sale")

      if (res.length !== 0) {
        setLoading(false);
        setInfor(findSale);
        notifySuccess(t("common:infoFind"));
      } else {
        setLoading(false);
        notifyError(t("common:infoNotFound"));
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const handleStyleCheck = async () => {
    try {
      if (styleCheck === "invoice") setStyleCheck("phone");
      else setStyleCheck("invoice");
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    infor,
    invoice,
    setInvoice,
    loading,
    setLoading,
    setStyleCheck,
    styleCheck,
    handleCheck,
    handleCheckPhone,
    handleStyleCheck,
  };
};

export default useWarrantyCheck;
