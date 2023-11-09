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
import ProvincesServices from "@services/ProvincesServices";

const useCheckoutSubmit = ({ city }) => {
  const { t } = useTranslation();
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = useContext(UserContext);

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
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [money, setMoney] = useState()
  const [totals, setTotals] = useState();


  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponRef = useRef("");
  const { isEmpty, emptyCart, items, cartTotal } = useCart();

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
  useEffect(() => {
    if (Cookies.get("couponInfo")) {
      const coupon = JSON.parse(Cookies.get("couponInfo"));
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountType);
      setMinimumAmount(coupon.minimumAmount);
    }
  }, [isCouponApplied]);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove("couponInfo");
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  //calculate total and discount value
  useEffect(() => {
    const discountProductTotal = items?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );

    let totalValue = "";
    let subTotal = parseFloat(cartTotal + Number(shippingCost));
    const discountAmount =
      discountPercentage?.type === "fixed"
        ? discountPercentage?.value
        : discountProductTotal * (discountPercentage?.value / 100);

    const discountAmountTotal = discountAmount ? discountAmount : 0;

    totalValue = Number(subTotal) - discountAmountTotal;

    setDiscountAmount(discountAmountTotal);

    setTotal(totalValue);

  }, [cartTotal, shippingCost, discountPercentage]);

  //if not login then push user to home page
  useEffect(() => {

    const { query } = router;
    const vnp_ResponseCode = query.vnp_ResponseCode;
    const vnp_TxnRef = query.vnp_TxnRef;

    if (vnp_ResponseCode === "00") {
      const orderInfo = JSON.parse(localStorage.getItem("PaymentInfo"))
      OrderServices.getOrderByInvoice(vnp_TxnRef).then((res) => {
        if (res.length == 0) {
          OrderServices.addOrder(orderInfo)
            .then((res) => {
              router.push(`/order/${res._id}`);
              notifySuccess(t("common:orderSucess"));
              Cookies.remove("couponInfo");
              sessionStorage.removeItem("products");
              localStorage.removeItem("PaymentInfo")
              emptyCart();
              setIsCheckoutSubmit(false);
            })
            .catch((err) => {
              notifyError(err.message);
              setIsCheckoutSubmit(false);
            });
        } else {
          router.push(`/order/${res[0]._id}`);
          notifyError(t("common:orderPaid"));

        }
      })
    }

    if (!userInfo) {
      router.back();
      notifyError("Vui lòng đăng nhập ")
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
      status: "Pending",
      cart: items,
      subTotal: cartTotal,
      shippingCost: shippingCost,
      discount: discountAmount,
      total: total,
    };

    // if (data.paymentMethod === "Card") {
    //   if (!stripe || !elements) {
    //     return;
    //   }

    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: elements.getElement(CardElement),
    //   });

    //   if (error && !paymentMethod) {
    //     setError(error.message);
    //     setIsCheckoutSubmit(false);
    //   } else {
    //     setError("");
    //     const orderData = {
    //       ...orderInfo,
    //       cardInfo: paymentMethod,
    //     };
    //     handlePaymentWithStripe(orderData);
    //     return;
    //   }
    // }
    if (data.paymentMethod === "Cash") {
      OrderServices.addOrder(orderInfo)
        .then((res) => {
          router.push(`/order/${res._id}`);
          notifySuccess(t("common:orderConfirmed"));
          Cookies.remove("couponInfo");
          sessionStorage.removeItem("products");
          emptyCart();
          setIsCheckoutSubmit(false);
        })
        .catch((err) => {
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }
    if (data.paymentMethod === "Payment") {
      OrderServices.addOrder(orderInfo)
        .then((res) => {
          router.push(`/order/${res._id}`);
          notifySuccess(t("common:orderConfirmed"));
          Cookies.remove("couponInfo");
          sessionStorage.removeItem("products");
          emptyCart();
          setIsCheckoutSubmit(false);
        })
        .catch((err) => {
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }
    if (data.paymentMethod == "PayPal") {
      OrderServices.addOrder(orderInfo)
        .then((res) => {
          router.push(`/order/${res._id}`);
          notifySuccess(t("common:orderConfirmed"));
          Cookies.remove("couponInfo");
          sessionStorage.removeItem("products");
          emptyCart();
          setIsCheckoutSubmit(false);
        })
        .catch((err) => {
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }

    // if (data.paymentMethod === "VnPay") {
    //   let maxInvoice = 0
    //   const res = await OrderServices.getOrderAll()
    //   if (res && res.orders && res.orders.length > 0) {
    //     res.orders.forEach((order) => {
    //       if (order.invoice > maxInvoice) {
    //         maxInvoice = order.invoice;
    //       }
    //     });
    //   }
    //   const totalPrice = {
    //     "totalPrice": orderInfo.total,
    //     "orderId": maxInvoice + 1
    //   }
    //   OrderServices.createPaymentVnPay(totalPrice)
    //     .then((res) => {
    //       localStorage.setItem("PaymentInfo", JSON.stringify(orderInfo))
    //       window.location.href = res.vnPayUrl
    //     }).catch((err) => {
    //       notifyError(err.message);
    //     })
    // }
  };

  const handlePaymentWithStripe = async (order) => {
    try {
      // const updatedOrder = {
      //   ...order,
      //   currency: 'usd',
      // };
      OrderServices.createPaymentIntent(order)
        .then((res) => {
          stripe.confirmCardPayment(res.client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          });

          const orderData = {
            ...order,
            cardInfo: res,
          };
          OrderServices.addOrder(orderData)
            .then((res) => {
              router.push(`/order/${res._id}`);
              notifySuccess(t("common:orderConfirmed"));
              Cookies.remove("couponInfo");
              emptyCart();
              sessionStorage.removeItem("products");
              setIsCheckoutSubmit(false);
            })
            .catch((err) => {
              notifyError(err ? err?.response?.data?.message : err.message);
              setIsCheckoutSubmit(false);
            });
        })

        .catch((err) => {
          notifyError(err ? err?.response?.data?.message : err.message);
          setIsCheckoutSubmit(false);
        });
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsCheckoutSubmit(false);
    }
  };

  const handleShippingCost = (value) => {
    setShippingCost(value);
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
    money,
    totals,
    handleSubmit,
    submitHandler,
    handleShippingCost,
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
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    isCheckoutSubmit,
    isCouponApplied,
    handleCheck,
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

export default useCheckoutSubmit;
