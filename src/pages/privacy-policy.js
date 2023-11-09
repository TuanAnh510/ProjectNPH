import React from "react";
import useTranslation from "next-translate/useTranslation";
//internal import
import Layout from "@layout/Layout";
import PageHeader from "@component/header/PageHeader";
import SettingServices from "@services/SettingServices";
import useAsync from "@hooks/useAsync";

const PrivacyPolicy = ({ Setting }) => {
  const { t } = useTranslation();
  const { data: customPage } = useAsync(SettingServices.getCustomPage);

  return (
    <Layout
      title="Chính sách và quyền riêng tư"
      description="Đây là trang chính sách và quyền riêng tư"
    >
      <div className="lg:w-[80%] w-[100%] md:w-[100%] mx-auto">
        {/* <PageHeader title="Privacy Policy" /> */}
        <div className="relative">
          <img
            src={customPage?.backgoundImage}
            className="lg:h-[250px] h-[100px] w-full bg-cover "
          />
          {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> */}
          <p className="absolute inset-0 flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-bold font-serif text-center  ">
            {customPage?.titlePages?.titleWarranty}
          </p>
        </div>
        <div className="">
          <div className=" mx-auto lg:py-20 py-10 px-4 sm:px-10">
            <div className="mb-8 lg:mb-12 last:mb-0">
              <div
                dangerouslySetInnerHTML={{
                  __html: Setting.privacypolicy,
                }}
              />
            </div>
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

export default PrivacyPolicy;
