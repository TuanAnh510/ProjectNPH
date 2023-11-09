import Cookies from "js-cookie";
import * as dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useTranslation from "next-translate/useTranslation";
//internal import
import useAsync from "@hooks/useAsync";
import { UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import CouponServices from "@services/CouponServices";
import { notifyError, notifySuccess } from "@utils/toast";
import SettingServices from "@services/SettingServices";
import { CartRentContext } from "@context/CartRentContext";
import useAddRentToCart from "./useAddRentToCart";
import ProvincesServices from "@services/ProvincesServices";

const useCheckoutRentSubmit = ({ city }) => {
  const { t } = useTranslation();
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = useContext(UserContext);

  const { removeCartRent } = useAddRentToCart()

  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [cityData, setCityData] = useState({});
  const [districtData, setDistrictData] = useState({});
  const [wardData, setWardData] = useState({});
  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const { cartItems, totalPriceRent, totalPriceRentMonth, totalPriceDateRent } = useContext(CartRentContext)

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponRef = useRef("");
  const { isEmpty, emptyCart, items } = useCart();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();

  const { data } = useAsync(CouponServices.getAllCoupons);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "VND";

  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove("couponInfo");
    }
  }, [minimumAmount, total]);


  const handleCityChange = async (value) => {

    const cityDt = city.find(ct => ct.code === value);
    setCityData(cityDt)
    const res = await ProvincesServices.getDistricts(value)
    setSelectedDistrict(res.districts);

  }

  const handleWardChange = async (value) => {

    const wardDt = selectedWard.find(w => w.code === value);
    setWardData(wardDt)
  }

  const handleDistrictChange = async (value) => {

    const districtDt = selectedDistrict.find(dt => dt.code === value);
    setDistrictData(districtDt)
    const res = await ProvincesServices.getWards(value)
    setSelectedWard(res.wards)

  }


  //if not login then push user to home page
  useEffect(() => {

    if (!userInfo) {
      router.back()
      notifyError("Vui lòng đăng nhập")
    }

    setValue("firstName", shippingAddress.firstName);
    setValue("lastName", shippingAddress.lastName);
    setValue("address", shippingAddress.address);
    setValue("contact", shippingAddress.contact);
    setValue("email", shippingAddress.email);


  }, []);

  const handleCheck = () => {
    trigger()

    const formData = getValues();
    return formData
  }

  const submitHandler = async (data) => {

    if (Object.keys(cityData).length === 0) {
      notifyError("Chưa chọn tỉnh thành phố")
      return
    }

    if (Object.keys(districtData).length === 0) {
      notifyError("Chưa chọn quận huyện")
      return

    }
    if (Object.keys(wardData).length === 0) {
      notifyError("Chưa chọn phường xã")
      return

    }

    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
    Cookies.set("shippingAddress", JSON.stringify(data));
    setIsCheckoutSubmit(true);
    setError("");

    userInfo = {
      name: `${data.firstName} ${data.lastName}`,
      contact: data.contact,
      email: data.email,
      address: data.address,
      country: districtData.name,
      city: cityData.name,
      zipCode: wardData.name,

    };



    let orderInfo = {
      user_info: userInfo,
      shippingOption: data.shippingOption,
      paymentMethod: data.paymentMethod,
      statusRent: "Deposit",
      cart: cartItems,
      subTotal: total,
      discount: discountAmount,
      total: totalPriceRentMonth,
      totalRent: totalPriceDateRent,
      rent: "rent",
    };


    OrderServices.addOrder(orderInfo)
      .then((res) => {
        router.push(`/order-rent/${res._id}`);
        notifySuccess(t("common:orderConfirmed"));
        Cookies.remove("couponInfo");
        removeCartRent()
        emptyCart();
        setIsCheckoutSubmit(false);
      })
      .catch((err) => {
        notifyError(err.message);
        setIsCheckoutSubmit(false);
      });



  };


  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError(t("common:couponAdd"));
      return;
    }
    const result = data.filter(
      (coupon) => coupon.couponCode === couponRef.current.value
    );

    if (result.length < 1) {
      notifyError(t("common:couponValid"));
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError(t("common:couponWrong"));
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    } else {
      notifySuccess(
        `Your Coupon ${result[0].couponCode} is Applied on ${result[0].productType}!`
      );
      setIsCouponApplied(true);
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountPercentage(result[0].discountType);
      dispatch({ type: "SAVE_COUPON", payload: result[0] });
      Cookies.set("couponInfo", JSON.stringify(result[0]));
    }
  };

  return {
    totalPriceDateRent,
    cartItems,
    totalPriceRent,
    handleSubmit,
    submitHandler,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    total,
    isEmpty,
    items,
    currency,
    isCheckoutSubmit,
    isCouponApplied,
    handleCheck,
    setTotal,
    totalPriceRentMonth,
    handleWardChange,
    handleCityChange,
    handleDistrictChange,
    selectedDistrict,
    selectedWard,
    cityData,
    wardData,
    districtData
  };
};

export default useCheckoutRentSubmit;
