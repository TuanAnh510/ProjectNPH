import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { IoBagCheckOutline, IoClose, IoBagHandle } from "react-icons/io5";

//internal import
import CartItem from "@component/cart/CartItem";
import LoginModal from "@component/modal/LoginModal";
import { UserContext } from "@context/UserContext";
import { SidebarContext } from "@context/SidebarContext";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";
import useTranslation from "next-translate/useTranslation";
import useAddRentToCart from "@hooks/useAddRentToCart";
import CartItemRent from "./CartItemRent";
import { CartRentContext } from "@context/CartRentContext";

const CartRent = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);

    const { toggleCartRentDrawer, closeCartRentDrawer } = useContext(SidebarContext);
    const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
    const { t } = useTranslation();
    const { cartItems, totalPriceRent } = useContext(CartRentContext);
    const currency = globalSetting?.default_currency || "VND";

    const {
        state: { userInfo },
    } = useContext(UserContext);

    const handleOpenLogin = () => {
        if (router.push("/?redirect=/checkout-rent")) {
            toggleCartRentDrawer();
            setModalOpen(!modalOpen);
        }
    };

    const checkoutClassRent = (
        <button
            onClick={closeCartRentDrawer}
            className="w-full py-3 px-3 rounded-lg bg-green-600 hover:bg-green-600 flex items-center justify-between bg-heading text-sm sm:text-base text-white focus:outline-none transition duration-300"
        >
            <span className="align-middle font-medium font-serif">
                {"Tiến hành thuê "}
            </span>
            <span className="rounded-lg font-bold font-serif py-2 px-3 bg-white text-green-600">
                {Intl.NumberFormat("vi-VN", { style: "currency", currency: currency }).format(Number(totalPriceRent))}
            </span>
        </button>
    );

    return (
        <>
            {modalOpen && (
                <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            )}
            <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded cursor-pointer">
                <div className="w-full flex justify-between items-center relative px-5 py-4 border-b bg-indigo-50 border-gray-100">
                    <h2 className="font-semibold font-serif text-lg m-0 text-heading flex items-center">
                        <span className="text-xl mr-2 mb-1">
                            <IoBagCheckOutline />
                        </span>
                        {t("common:Cart-Rent")}

                    </h2>

                    <button
                        onClick={closeCartRentDrawer}
                        className="inline-flex text-base items-center justify-center text-gray-500 p-2 focus:outline-none transition-opacity hover:text-red-400"
                    >
                        <IoClose />
                        <span className="font-sens text-sm text-gray-500 hover:text-red-400 ml-1">
                            {t("common:closeBtn")}

                        </span>
                    </button>
                </div>

                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
                    {cartItems?.length == 0 && (
                        <div className="flex flex-col h-full justify-center">
                            <div className="flex flex-col items-center">
                                <div className="flex justify-center items-center w-20 h-20 rounded-full bg-green-100">
                                    <span className="text-green-600 text-4xl block">
                                        <IoBagHandle />
                                    </span>
                                </div>
                                <h3 className="font-serif font-semibold text-gray-700 text-lg pt-5">
                                    {"Giỏ hàng thuê của bạn trống"}

                                </h3>
                                <p className="px-12 text-center text-sm text-gray-500 pt-2">
                                    {t("common:cartEmptyText")}

                                </p>
                            </div>
                        </div>
                    )}
                    {
                        cartItems.map((item, i) => (
                            <CartItemRent key={i + 1} item={item} />
                        ))
                    }
                </div>



                <div className="mx-5 my-3">
                    {cartItems.length <= 0 ? (
                        checkoutClassRent
                    ) : (
                        <span>
                            {!userInfo ? (
                                <div onClick={handleOpenLogin}>{checkoutClassRent}</div>
                            ) : (
                                <Link href="/checkout-rent">
                                    <a>{checkoutClassRent}</a>
                                </Link>
                            )}
                        </span>
                    )}
                </div>


            </div>
        </>
    );
};

export default CartRent;
