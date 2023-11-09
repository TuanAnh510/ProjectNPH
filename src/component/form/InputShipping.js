import React from "react";
import { FiTruck } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
const InputShipping = ({
  register,
  value,
  logo,
  description,
  cost,
  currency,
  handleShippingCost,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="p-3 card border border-gray-200 bg-white rounded-md">
        <label className="cursor-pointer label">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3 text-gray-400">
                <img src={logo} className="w-[50px] h-[50px] rounded-lg shadow-md" />
              </span>
              <div>
                <h6 className="font-serif font-medium text-sm text-gray-600">
                  {value}
                </h6>
                <div className="text-xs  text-gray-500 font-medium">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  <span className="font-medium text-gray-600">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(cost))}
                  </span>
                </p>
              </div>
            </div>
            <input
              onClick={() => handleShippingCost(cost)}
              {...register(`shippingOption`, {
                required: `${t("common:ShippingMethod")}`,
              })}
              name="shippingOption"
              type="radio"
              value={value}
              className="form-radio outline-none focus:ring-0 text-green-600"
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default InputShipping;
