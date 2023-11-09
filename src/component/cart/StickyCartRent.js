import dynamic from "next/dynamic";
import React, { useContext, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { useCart } from "react-use-cart";

//internal import
import { SidebarContext } from "@context/SidebarContext";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";
import useTranslation from "next-translate/useTranslation";
import useAddRentToCart from "@hooks/useAddRentToCart";


const StickyCart = () => {

    const { totalItems, cartTotal } = useAddRentToCart();
    const { toggleCartRentDrawer } = useContext(SidebarContext);
    const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
    const { t } = useTranslation()
    const currency = globalSetting?.default_currency || "VND";

    return (
        <button aria-label="Cart" onClick={toggleCartRentDrawer} className="absolute">
            <div className="right-5 w-35 float-right fixed top-2/4 bottom-2/4 align-middle shadow-lg cursor-pointer z-30 hidden lg:block xl:block">
                <div className="flex flex-col items-center justify-center bg-indigo-50 rounded-t-lg p-2 text-gray-700">
                    <span className="text-2xl mb-1 text-green-600">
                        <IoBagHandleOutline />
                    </span>
                    <span className="px-2 text-sm font-serif font-medium">
                        {totalItems} {t("common:items")}
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-green-700 p-2 text-white text-base font-serif font-medium rounded-b-lg mx-auto">


                    {Intl.NumberFormat("vi-VN", { style: "currency", currency: currency }).format(Number(cartTotal))}

                </div>
            </div>
        </button>
    );
};

export default dynamic(() => Promise.resolve(StickyCart), { ssr: false });
