import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

//internal import
import Layout from "@layout/Layout";
import PageHeader from "@component/header/PageHeader";
import SettingServices from "@services/SettingServices";

const AboutUs = ({ Setting }) => {
  const { t } = useTranslation();

  return (
    <Layout title="Về chúng tôi" description="Đây là trang về chúng tôi">
      {/* <PageHeader title="about-page-title" /> */}

      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-10 ">
            <>
              <div className="">
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: Setting.aboutus.anoutusdescription,
                    }}
                  />
                </div>
              </div>
              <div className="mt-10 lg:mt-0 ">
                <Image
                  width={800}
                  height={500}
                  src={Setting.aboutus.aboutusimage}
                  className="rounded-2xl shadow-xl"
                  alt=""
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getServerSideProps = async (context) => {
  const Setting = await SettingServices.getGlobalSetting();

  return {
    props: {
      Setting: Setting,
    },
  };
};

export default AboutUs;
