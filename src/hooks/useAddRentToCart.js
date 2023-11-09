import { useState } from "react";
import { useCart } from "react-use-cart";
import useTranslation from "next-translate/useTranslation";
import { notifyError, notifySuccess } from "@utils/toast";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CartRentContext } from "@context/CartRentContext";
import { useContext } from "react";

const useAddRentToCart = () => {
    const { t } = useTranslation();
    const [itemRent, setItemRent] = useState(1);
    const {
        setCartItems,
        setTotalItemRent,
        setTotalPriceRent,
        setTotalPriceRentMonth,
        setTotalPriceDateRent,
    } = useContext(CartRentContext);

    const addItem = (product, item, dateRent) => {
        let cart =
            localStorage.getItem("cartRent") == ""
                ? []
                : JSON.parse(localStorage.getItem("cartRent")) || [];
        const existingItem = cart?.find((cartItem) => cartItem._id === product._id);

        if (existingItem !== undefined) {
            existingItem.quantity = item;
            existingItem.dateRent = dateRent;
        } else {
            cart.push({ ...product, quantity: item, dateRent: dateRent });
        }
        localStorage.setItem("cartRent", JSON.stringify(cart));
        getTotalRent();
    };

    useEffect(() => {
        getTotalRent();
    }, []);

    const removeCartRent = () => {
        localStorage.removeItem("cartRent");
    };

    const getTotalRent = () => {
        const cart =
            localStorage.getItem("cartRent") == ""
                ? []
                : JSON.parse(window.localStorage.getItem("cartRent")) || [];

        let totalAmount = 0;
        cart.forEach((item) => {
            totalAmount += item?.rent?.depositcost * item?.quantity;
        });
        let totalAmountDateRent = 0;
        cart.forEach((item) => {
            totalAmountDateRent +=
                item?.rent?.monthlyrent * item?.quantity * item.dateRent?.monthRent;
        });
        let totalAmountMonth = 0;
        cart.forEach((item) => {
            totalAmountMonth += item?.rent?.monthlyrent * item?.quantity;
        });

        setTotalPriceDateRent(totalAmountDateRent);
        setTotalPriceRentMonth(totalAmountMonth);
        setCartItems(cart);
        setTotalPriceRent(totalAmount);
        setTotalItemRent(cart.length);
    };

    const removeFromCartLocalStorage = (itemId) => {
        const cart =
            localStorage.getItem("cartRent") == ""
                ? []
                : JSON.parse(window.localStorage.getItem("cartRent")) || [];

        const updatedCart = cart.filter((item) => item._id !== itemId);
        localStorage.setItem("cartRent", JSON.stringify(updatedCart));

        getTotalRent();
    };

    const updateItemQuantity = (product, item) => {
        if (item <= product?.stock) {
            let cart =
                localStorage.getItem("cartRent") == ""
                    ? []
                    : JSON.parse(localStorage.getItem("cartRent")) || [];
            const existingItem = cart?.find(
                (cartItem) => cartItem._id === product._id
            );

            if (existingItem !== undefined) {
                existingItem.quantity = item;
            }
            localStorage.setItem("cartRent", JSON.stringify(cart));

            getTotalRent();
            return true;
        } else {
            notifyError(t("common:Istock"));
            return false;
        }
    };

    const handleAddItemRent = (product, startDate, endDate, monthRent) => {
        if (!startDate) {
            notifyError("Chưa chọn ngày bắt đầu");
            return;
        }

        if (!endDate) {
            notifyError("Chưa chọn ngày kết thúc");
            return;
        }
        if (monthRent === 0) {
            notifyError("Thuê phải trên 1 tháng");
            return;
        }
        const stDate = startDate?.$D + "/" + startDate?.$M + "/" + startDate?.$y;
        const enDate = endDate?.$D + "/" + endDate?.$M + "/" + endDate?.$y;
        const dateRent = {
            startDate: stDate,
            endDate: enDate,
            monthRent: monthRent,
        };

        if (itemRent <= product?.stock) {
            addItem(product, itemRent, dateRent);
            notifySuccess(
                `${itemRent} ${product.title.vi} ${t("common:addedToCart")}`
            );
        } else {
            notifyError(t("common:Istock"));
        }
    }

    return {
        updateItemQuantity,
        setItemRent,
        itemRent,
        handleAddItemRent,
        removeFromCartLocalStorage,
        removeCartRent,
    };
};
export default useAddRentToCart;
