import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
//internal import
import { UserContext } from "@context/UserContext";
import { FiSend } from "react-icons/fi";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";

const Footer = () => {
  const { t } = useTranslation();
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  return (
    <footer className=" bg-[#eeeeee] text-black pt-14 pb-3 ">
      <div className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0 w-[80%] mx-auto">
        <div className="flex gap-[50px] lg:gap-[50px]  flex-col md:flex-row">
          <div className="flex lg:w-[30%] flex-col gap-3 shrink-0">
            <Link href="/">
              <div className="mx-auto text-center">
                <img
                  src={globalSetting.logoweb}
                  alt=""
                  width={250}
                  height={150}
                />
              </div>
            </Link>
            <div className="leading-7 text-[15px]  text-black">
              <div className=" ">
                <span className="font-bold ">{t("common:footer-ad")}</span>
                <span className="ml-2">
                  838, Ấp Vĩnh Bình, Xã An Vĩnh Ngãi, Thành phố Tân An, Tỉnh
                  Long An, Việt Nam
                </span>
              </div>
              <div>
                <span>
                  {t("common:phoneNumber")}: {globalSetting.contact}
                </span>
              </div>
              <div>
                <span>Email: {globalSetting.email}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-[10px] md:gap-[75px] lg:gap-[100px] shrink-0">
            <div className="flex flex-col gap-3 text-[15px]">
              <div className="font-oswald font-bold uppercase text-[16px]">
                <Link href={"/about-us"}>{t("common:moreInfo")}</Link>
              </div>
              <div className="text-[#666] cursor-pointer">
                <Link href={"/about-us"}>{t("common:about-page-title")}</Link>
              </div>
              <div className="text-[#666] cursor-pointer">
                <Link href={"/privacy-policy"}>
                  {t("common:Privacy Policy")}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-[15px]">
              <div className="font-oswald font-bold uppercase text-[16px] ">
                {t("common:hotromuahang")}
              </div>
              <Link href={"/warranty-check"}>
                <div className="text-[#666] cursor-pointer">
                  {t("common:Check-warranty")}
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-3 text-[15px]">
              <div className="font-oswald font-bold uppercase text-[16px] ">
                {t("common:category")}
              </div>
              <Link href={"/product"}>
                <div className="text-[#666] cursor-pointer">
                  {t("common:product")}
                </div>
              </Link>

              <Link href={"/productsale"}>
                <div className="text-[#666] cursor-pointer">
                  {t("common:sale")}
                </div>
              </Link>
              <Link href={"/blog"}>
                <div className="text-[#666] cursor-pointer">
                  {t("common:Blog")}
                </div>
              </Link>
              <Link href={"/offer"}>
                <div className="text-[#666] cursor-pointer">
                  {t("common:offer-page")}
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-col">
          <div className="flex gap-4 justify-center md:justify-start">
            <div
              onClick={() =>
                window.open(globalSetting?.socialnetwork?.facebooklink)
              }
              className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-green-600 cursor-pointer"
            >
              <FaFacebookF size={20} />
            </div>

            <div
              onClick={() =>
                window.open(globalSetting?.socialnetwork?.youtubelink)
              }
              className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-green-600 cursor-pointer"
            >
              <FaYoutube size={20} />
            </div>

            <div
              onClick={() =>
                window.open(globalSetting?.socialnetwork?.instagramlink)
              }
              className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-green-600 cursor-pointer"
            >
              <FaInstagram size={20} />
            </div>
          </div>
          <div className="mt-5 mx-auto text-center">
            <Image
              width={170}
              height={100}
              className="w-full"
              src="/payment-method/payment-logo.png"
              alt="payment method"
            />
          </div>
        </div>

        {/* RIGHT END */}
      </div>
      <div className="flex justify-center mt-10 flex-col md:flex-row gap-[10px] md:gap-0 w-[80%] mx-auto">
        {/* LEFT START */}
        <div className="text-[12px] text-[#666] cursor-pointer text-center md:text-left">
          {t("common:Copyright")}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        {/* <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] text-[#666] cursor-pointer">
            {t("common:Instruct")}
          </div>
          <div className="text-[12px] text-[#666] cursor-pointer">
            {t("common:Terms-of-sale")}
          </div>
          <div className="text-[12px] text-[#666]  cursor-pointer">
            {t("common:terms-of-use")}
          </div>
          <Link href={"/privacy-policy"}>
            <div className="text-[12px] text-[#666]  cursor-pointer">
              {t("common:last")}
            </div>
          </Link>
        </div> */}
        {/* RIGHT END */}
      </div>
    </footer>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
