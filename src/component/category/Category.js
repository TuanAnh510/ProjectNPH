import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import useTranslation from "next-translate/useTranslation";
//internal import
import { pages } from "@utils/data";
import useAsync from "@hooks/useAsync";
import Loading from "@component/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import CategoryServices from "@services/CategoryServices";
import CategoryCard from "@component/category/CategoryCard";
import { showingTranslateValue } from "@utils/translate";

import {
  // FiUser,
  FiGift,
  FiAlertCircle,
  FiHelpCircle,
  FiTruck,
  FiPhoneCall,
  FiCreditCard,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

import {
  HiOutlineDocumentText,
  HiOutlinePhoneIncoming,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  IoBagCheckOutline,
  IoGridOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { BiSolidPlaneAlt, BiPhoneCall } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { useState } from "react";
import { notifyError } from "@utils/toast";
import SettingServices from "@services/SettingServices";
import { useEffect } from "react";
const Category = () => {
  const { lang } = useTranslation("ns1");
  const [lange, setLange] = useState([]);
  const { t } = useTranslation();
  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);
  const { data, loading, error } = useAsync(() =>
    CategoryServices.getShowingCategory()
  );

  const [currentLang, setCurrentLang] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getAllLanguages();
        setLange(res);

        const result = res?.find((lang) => lang?.iso_code === locale);
        setCurrentLang(result);
      } catch (err) {
        notifyError(err);
      }
    })();
  }, []);
  return (
    <div className="flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
      {categoryDrawerOpen && (
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-green-600 text-white border-b border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center">
            <Link href="/">
              <a className="mr-10">
                <Image
                  width={150}
                  height={90}
                  src="/logo/logoweb.png"
                  alt="logo"
                />
              </a>
            </Link>
          </h2>
          <div className="">
            <div className="">
              {lange.map((language, i) => {
                return (
                  <Link key={i + 1} href="" locale={`${language.iso_code}`}>
                    <a onClick={() => setCurrentLang(language)}>
                      <div
                        className={`flot-l flag ${language?.flag?.toLowerCase()}`}
                      ></div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <button
            onClick={closeCategoryDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      )}

      <div className="overflow-y-scroll scrollbar-hide w-full max-h-full">
        {categoryDrawerOpen && (
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">
            {t("common:Allcate")}
          </h2>
        )}
        {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : data.length === 0 ? (
          <Loading loading={loading} />
        ) : (
          <div className="relative grid gap-2 p-6">
            {data[0]?.children?.map((category) => (
              <CategoryCard
                key={category._id}
                id={category._id}
                icon={category.icon}
                nested={category.children}
                title={showingTranslateValue(category?.name, lang)}
              />
            ))}
          </div>
        )}

        {categoryDrawerOpen && (
          <div className="relative grid gap-2 mt-5">
            <h3 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">
              {t("common:Page")}
            </h3>
            <div className="relative grid gap-1 p-6">
              <a
                href="/#"
                className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-green-600"
              >
                <AiOutlineHome
                  className="flex-shrink-0 h-4 w-4"
                  aria-hidden="true"
                />
                <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-green-600">
                  {t("common:HOME")}
                </p>
              </a>
              <a
                href="/product"
                className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-green-600"
              >
                <FiGift className="flex-shrink-0 h-4 w-4" aria-hidden="true" />
                <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-green-600">
                  {t("common:product-page")}
                </p>
              </a>
              <a
                href="/productsale"
                className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-green-600"
              >
                <div className="flex-shrink-0 h-4 w-4" aria-hidden="true">
                  <img src="/price-tag.png" />
                </div>
                <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-green-600">
                  {t("common:product-sale")}
                </p>
              </a>
              <a
                href="/warranty-check"
                className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-green-600"
              >
                <HiOutlineShieldCheck
                  className="flex-shrink-0 h-4 w-4"
                  aria-hidden="true"
                />
                <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-green-600">
                  {t("common:Warranty")}
                </p>
              </a>
              <a
                href="/blog"
                className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-green-600"
              >
                <BsNewspaper
                  className="flex-shrink-0 h-4 w-4"
                  aria-hidden="true"
                />
                <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-green-600">
                  {t("common:Blog")}
                </p>
              </a>
              <a
                href="/offer"
                className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-green-600"
              >
                <div className="flex-shrink-0 h-4 w-4" aria-hidden="true">
                  <img src="/marketing.png" />
                </div>
                <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-green-600">
                  {t("common:offer-page")}
                </p>
              </a>
              <a
                href="/about-us"
                className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-green-600"
              >
                <CgUserList
                  className="flex-shrink-0 h-4 w-4"
                  aria-hidden="true"
                />
                <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-green-600">
                  {t("common:about-us-page")}
                </p>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
