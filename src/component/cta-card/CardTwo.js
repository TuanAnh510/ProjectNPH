import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";

const CardTwo = () => {
  const { t } = useTranslation();
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  return (
    <>
      <div className="w-full bg-white shadow-sm lg:px-10 lg:py-5 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="lg:w-3/5">
            <span className="">
              <div
                dangerouslySetInnerHTML={{
                  __html: globalSetting?.introduction?.introductiondescription,
                }}
              />
            </span>
          </div>
          <div className="w-1/5 flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-end">
            <img
              width={373}
              height={500}
              src={globalSetting?.introduction?.introductionimage}
              alt=""
              className="block w-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTwo;
