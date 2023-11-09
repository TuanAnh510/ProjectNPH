import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import useTranslation from "next-translate/useTranslation";
//internal import

import { UserContext } from "@context/UserContext";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";

const useLoginSubmit = (setModalOpen) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = ({
    name,
    email,
    registerEmail,
    verifyEmail,
    password,
  }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    if (registerEmail && password) {
      CustomerServices.customerLogin({
        registerEmail,
        password,
      })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          router.push(redirect || "/");
          notifySuccess(t("common:loginSucess"));
          dispatch({ type: "USER_LOGIN", payload: res });
          Cookies.set("userInfo", JSON.stringify(res), {
            expires: cookieTimeOut,
          });
        })
        .catch((err) => {
          notifyError("Tên đăng nhập hoặc mật khẩu không hợp lệ!");
          setLoading(false);
        });
    }
    if (name && email && password) {
      CustomerServices.verifyEmailAddress({ name, email, password })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          notifySuccess("Vui lòng kiểm tra email của bạn để xác minh tài khoản của bạn!");


        })
        .catch((err) => {
          setLoading(false);
          notifyError("Email đã tồn tại");
        });
    }
    if (verifyEmail) {
      CustomerServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess("Vui lòng kiểm tra email của bạn để đặt lại mật khẩu!");
          setValue("verifyEmail");
        })
        .catch((err) => {
          setLoading(false);
          if (err.message === "You made too many requests. Please try again after 30 minutes.")
            notifyError("Bạn đã thực hiện quá nhiều yêu cầu. Vui lòng thử lại sau 30 phút.");
          else
            notifyError("Không tìm thấy người dùng với email này!");
        });
    }
  };

  const handleGoogleSignIn = (user) => {
    const cookieTimeOut = 0.5;

    if (user) {
      CustomerServices.signUpWithProvider(user?.credential)
        .then((res) => {
          setModalOpen(false);
          notifySuccess(t("common:loginSucess"));
          router.push(redirect || "/");
          dispatch({ type: "USER_LOGIN", payload: res });
          Cookies.set("userInfo", JSON.stringify(res), {
            expires: cookieTimeOut,
          });
        })

        .catch((err) => {
          notifyError(err.message);
          setModalOpen(false);
        });
    }
  };

  return {
    handleSubmit,
    submitHandler,
    handleGoogleSignIn,
    register,
    errors,
    GoogleLogin,
    loading,
  };
};

export default useLoginSubmit;
