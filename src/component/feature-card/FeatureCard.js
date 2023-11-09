import React from "react";
import useTranslation from "next-translate/useTranslation";
import { featurePromo } from "@utils/data";
import { BiSolidPlaneAlt } from "react-icons/bi";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";
import { FiClock, FiPhoneCall } from "react-icons/fi";
import { BsUmbrellaFill } from "react-icons/bs";

const FeatureCard = () => {
  const { t } = useTranslation();
  const { data: customPage } = useAsync(SettingServices.getCustomPage);

  return (
    <div className="grid grid-cols- sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 mx-auto">
      <div className=" border-r border-gray-200 py-1 flex items-center  lg:justify-center bg-[#f6f6f6] h-24 ">
        <button className="mr-3 icon ">
          <BiSolidPlaneAlt
            className="flex-shrink-0 w-12 h-11 text-[#3b3b3b] hover:text-yellow-500  "
            aria-hidden="true"
          />
        </button>
        <div className="">
          <span className="block leading-5 hover:text-yellow-500">
            <div
              dangerouslySetInnerHTML={{
                __html: customPage?.slogan?.sloganShipping,
              }}
            />
          </span>
        </div>
      </div>
      <div className=" border-r border-gray-200 py-1 flex items-center  lg:justify-center bg-[#f6f6f6] h-24 ">
        <button className="mr-3 icon ">
          <FiClock
            className="flex-shrink-0 w-12 h-11 text-[#3b3b3b] hover:text-yellow-500  "
            aria-hidden="true"
          />
        </button>
        <div className="">
          <span className="block leading-5 hover:text-yellow-500">
            <div
              dangerouslySetInnerHTML={{
                __html: customPage?.slogan?.sloganWarranty,
              }}
            />
          </span>
        </div>
      </div>
      <div className=" border-r border-gray-200 py-1 flex items-center  lg:justify-center bg-[#f6f6f6] h-24 ">
        <button className="mr-3 icon ">
          <FiPhoneCall
            className="flex-shrink-0 w-12 h-11 text-[#3b3b3b] hover:text-yellow-500  "
            aria-hidden="true"
          />
        </button>
        <div className="">
          <span className="block leading-5 hover:text-yellow-500">
            <div
              dangerouslySetInnerHTML={{
                __html: customPage?.slogan?.sloganSupport,
              }}
            />
          </span>
        </div>
      </div>
      <div className=" border-r border-gray-200 py-1 flex items-center  lg:justify-center bg-[#f6f6f6] h-24 ">
        <button className="mr-3 icon ">
          <BsUmbrellaFill
            className="flex-shrink-0 w-12 h-11 text-[#3b3b3b] hover:text-yellow-500  "
            aria-hidden="true"
          />
        </button>
        <div className="">
          <span className="block leading-5 hover:text-yellow-500">
            <div
              dangerouslySetInnerHTML={{
                __html: customPage?.slogan?.sloganGenuineProduct,
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
