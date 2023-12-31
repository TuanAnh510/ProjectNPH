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

const useProductReviews = (setModalOpen) => {
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
                    notifyError(err ? err.response.data.message : err.message);
                    setLoading(false);
                });
        }
        if (name && email && password) {
            CustomerServices.verifyEmailAddress({ name, email, password })
                .then((res) => {
                    setLoading(false);
                    setModalOpen(false);
                    notifySuccess(res.message);
                })
                .catch((err) => {
                    setLoading(false);
                    notifyError(err.response.data.message);
                });
        }
        if (verifyEmail) {
            CustomerServices.forgetPassword({ verifyEmail })
                .then((res) => {
                    setLoading(false);
                    notifySuccess(res.message);
                    setValue("verifyEmail");
                })
                .catch((err) => {
                    setLoading(false);
                    notifyError(err ? err.response.data.message : err.message);
                });
        }
    };


    return {

    };
};

export default useProductReviews;
