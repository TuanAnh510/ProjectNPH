import React from "react";

import Coupon from "@component/coupon/Coupon";
import useTranslation from "next-translate/useTranslation";
const OfferCard = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full group">
      <div className="bg-gray-50 h-full border-2 border-green-600 transition duration-150 ease-linear transform group-hover:border-green-700 rounded shadow-lg">
        <div className="bg-green-100 text-gray-900 px-6 py-2 rounded-t border-b flex items-center justify-center">
          <h3 className="text-base font-serif font-bold ">
            {t("common:OfferCard-Title")}
          </h3>
        </div>
        <div className="overflow-hidden">
          <Coupon couponInHome />
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
