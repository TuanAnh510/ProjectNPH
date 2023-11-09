import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

//internal import
import { notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";
import { UserContext } from "@context/UserContext";
import Loading from "@component/preloader/Loading";
import useTranslation from "next-translate/useTranslation";
const EmailVerification = ({ params }) => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { dispatch } = useContext(UserContext);


  useEffect(() => {
    setLoading(true);
    CustomerServices.registerCustomer(params?.token)
      .then((res) => {
        router.push("/");
        setLoading(false);
        if (res.message == "Email Already Verified!") {
          setSuccess("Email đã được xác minh trước đó!");
          notifySuccess("Email đã được xác minh trước đó!");
        }
        if (res.message == "Token Expired, Please try again!") {
          notifySuccess("Mã đã hết hạn, vui lòng thử lại!");
          setSuccess("Mã đã hết hạn, vui lòng thử lại!");
        }
        if (res.message == "Email Verified, Please Login Now!") {
          notifySuccess("Email đã được xác minh, vui lòng đăng nhập ngay!");
          setSuccess("Email đã được xác minh, vui lòng đăng nhập ngay!");
        }

        dispatch({ type: "USER_LOGIN", payload: res });
        Cookies.set("userInfo", JSON.stringify(res));
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      {loading ? (
        <Loading loading={loading} />
      ) : success ? (
        <div className="text-emerald-500">
          <IoCheckmarkCircle className="mx-auto mb-2 text-center text-4xl" />
          <h2 className="text-xl font-medium"> {success} </h2>
        </div>
      ) : (
        <div className="text-red-500">
          <IoCloseCircle className="mx-auto mb-2 text-center text-4xl" />
          <h2 className="text-xl font-medium"> {error} </h2>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  return {
    props: { params },
  };
};

export default EmailVerification;
