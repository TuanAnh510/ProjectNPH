//internal import
import Layout from "@layout/Layout";
import Coupon from "@component/coupon/Coupon";
import PageHeader from "@component/header/PageHeader";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";

const Offer = () => {
  const { data: customPage } = useAsync(SettingServices.getCustomPage);

  return (
    <>
      <Layout title="Khuyến mãi" description="Đây là trang khuyến mãi">
        <div className="lg:w-[80%] w-[100%] md:w-[100%] mx-auto">
          {/* <PageHeader title="mega-offer" /> */}
          <div className="relative">
            <img
              src={customPage?.backgoundImage}
              className="lg:h-[250px] h-[100px] w-full bg-cover "
            />
            {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> */}
            <p className="absolute inset-0 flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-bold font-serif text-center  ">
              {customPage?.titlePages?.titleCoupon}
            </p>
          </div>
          <div className="mx-auto max-w-screen-2xl px-4 py-10 lg:py-20 sm:px-10">
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
              <Coupon />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Offer;
