import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useTranslation from "next-translate/useTranslation";

//internal import
import { sliderData } from "@utils/data";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";

const MainCarousel = () => {
  const { t } = useTranslation();
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {globalSetting?.bannerimage?.map((item, i) => (
          <SwiperSlide
            className="h-full relative rounded-lg overflow-hidden"
            key={i + 1}
          >
            <div className="text-sm text-gray-600 hover:text-green-dark ">
              <img
                width={950}
                src={item}
                alt=""
                className="object-cover w-full max-h-[400px]"
              />
            </div>
            {/* <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
              <div className="pl-4 pr-12 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12">
                <h1 className="mb-2 font-serif text-xl sm:text-lg md:text-2xl line-clamp-1 md:line-clamp-none  lg:line-clamp-none  lg:text-3xl font-bold text-gray-800">
                  {t(`common:${item.title}`)}
                </h1>
                <p className="text-base leading-6 text-gray-600 font-sans line-clamp-1  md:line-clamp-none lg:line-clamp-none">
                  {t(`common:${item.info}`)}
                </p>
                <Link href={item.url}>
                  <a className="hidden sm:inline-block lg:inline-block text-sm leading-6 font-serif font-medium mt-6 px-6 py-2 bg-green-600 text-center rounded-md text-white hover:bg-green-600">
                    {t("common:Slider-btn")}
                  </a>
                </Link>
              </div>
            </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default React.memo(MainCarousel);
