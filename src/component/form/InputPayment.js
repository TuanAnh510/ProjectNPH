import React from 'react';
import useTranslation from 'next-translate/useTranslation';
const InputPayment = ({ register, Icon, name, value, setShowCard }) => {
  const { t } = useTranslation()


  
  return (
    <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
      <label className="cursor-pointer label">
        <div className="flex item-center justify-between">
          <div className="flex items-center">
            <span className="text-xl mr-3 text-gray-400">
              <Icon />
            </span>
            <h6 className="font-serif font-medium text-sm text-gray-600">
              {name}
            </h6>
          </div>
          <input
            onClick={() => setShowCard(value)}
            {...register('paymentMethod', {
              required: `${t("common:PaymentMethod")}`,
            })}
            type="radio"
            value={value}
            name="paymentMethod"
            className="form-radio outline-none focus:ring-0 text-green-600"
          />
        </div>
      </label>
    </div>
  );
};

export default InputPayment;
