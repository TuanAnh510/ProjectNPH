import { useState } from "react";
import OrderServices from "@services/OrderServices";
import { notifyError, notifySuccess } from "@utils/toast";
import useTranslation from "next-translate/useTranslation";
const useCommentBlog = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  
  const handlePostComment = async () => {
    try {
      if (invoice === undefined) {
        notifyError(t("common:infoAdd"));
        return;
      }
      const res = await OrderServices.getOrderByInvoice(invoice);
      if (res.length !== 0) {
        setInfor(res);
        notifySuccess(t("common:infoFind"));
      } else {
        notifyError(t("common:infoNotFound"));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    handlePostComment,
  };
};

export default useCommentBlog;
