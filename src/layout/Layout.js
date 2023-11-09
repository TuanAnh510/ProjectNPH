import Head from "next/head";
import { ToastContainer } from "react-toastify";

//internal import
import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import MobileFooter from "@layout/footer/MobileFooter";
import NavBarTop from "./navbar/NavBarTop";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";

const Layout = ({ title, description, children }) => {
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const keywords = 'bán linh kiện máy tính, linh kiện máy tính giá rẻ, mạch in chất lượng, bộ vi xử lý hiệu năng cao, ổ cứng SSD tốc độ cao, card đồ họa gaming, ram máy tính đa năng, nguồn máy tính ổn định, màn hình máy tính chất lượng, chuột và bàn phím gaming, linh kiện máy tính đa dạng, cửa hàng bán linh kiện máy tính, phụ kiện máy tính độc đáo, linh kiện máy tính online, linh kiện máy tính chính hãng, tản nhiệt CPU hiệu quả, bán linh kiện máy tính trực tuyến, ổ cứng HDD lưu trữ, linh kiện máy tính cao cấp, linh kiện máy tính gaming';
  const themeColor = '#ffffff';
  return (
    <>
      <ToastContainer />
      <div className="font-sans">
        <Head>
          <title>{title ? `NPH Digital | ${title}` : `NPH Digital `}</title>
          {description && <meta name="description" content={description} />}
          <link ref="icon" href="/logo/logoweb.png" />
          <meta name="keywords" content={keywords} />

          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content={themeColor} />
        </Head>
        <NavBarTop />
        <Navbar globalSetting={globalSetting} />
        {/* <NavbarNew /> */}
        <div className="bg-gray-50">{children}</div>
        <MobileFooter />
        <div className="w-full">
          {/* <FooterTop /> */}
          <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
            {/* <FeatureCard /> */}
          </div>
          <hr className="hr-line"></hr>
          <div className="border-t border-gray-100 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
