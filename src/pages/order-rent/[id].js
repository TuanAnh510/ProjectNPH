import { PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { IoCloudDownloadOutline, IoPrintOutline } from "react-icons/io5";
import ReactToPrint from "react-to-print";

//internal import
import Invoice from "@component/invoice/Invoice";
import InvoiceForDownload from "@component/invoice/InvoiceForDownload";
import Loading from "@component/preloader/Loading";
import { UserContext } from "@context/UserContext";
import Layout from "@layout/Layout";
import OrderServices from "@services/OrderServices";
import SettingServices from "@services/SettingServices";

import useTranslation from "next-translate/useTranslation";
import InvoiceRent from "@component/invoice/InvoiceRent";

const OrderRent = ({ params }) => {
  const printRef = useRef();
  const orderId = params.id;
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [globalSetting, setGlobalSetting] = useState([]);
  const {
    state: { userInfo },
  } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await OrderServices.getOrderById(orderId);

        setData(res);
        setLoading(false);
        const res2 = await SettingServices.getGlobalSetting();
        setGlobalSetting(res2);
      } catch (err) {
        setLoading(false);
      }
    })();

    if (!userInfo) {
      router.push("/");
    }
  }, []);

  const { t } = useTranslation();

  return (

    <Layout title="Invoice" description="order confirmation page">
      {loading && !data ? (
        <Loading loading={loading} />
      ) : (

        <div className="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
          <div className="bg-green-100 rounded-md mb-5 px-4 py-3">
            <label>
              {t("common:thankyou")}{" "}
              <span className="font-bold text-green-600">
                {data?.user_info?.name},
              </span>{" "}
              {"Đặt thuê thành công"}
            </label>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <InvoiceRent
              data={data}
              printRef={printRef}
              globalSetting={globalSetting}
              currency={globalSetting?.default_currency || "VND"}
            />
            {/* <div className="bg-white p-8 rounded-b-xl">
              <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between invoice-btn">
                <PDFDownloadLink
                  document={
                    <InvoiceForDownload
                      data={data}
                      globalSetting={globalSetting}
                      currency={globalSetting?.default_currency || "VND"}
                    />
                  }
                  fileName="Invoice"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      "Loading..."
                    ) : (
                      <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-green-600  text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                        {t("common:downloadInvoice")}{" "}
                        <span className="ml-2 text-base">
                          <IoCloudDownloadOutline />
                        </span>
                      </button>
                    )
                  }
                </PDFDownloadLink>

                <ReactToPrint
                  trigger={() => (
                    <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-green-600  text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                      {t("common:printInvoice")}{" "}
                      <span className="ml-2">
                        <IoPrintOutline />
                      </span>
                    </button>
                  )}
                  content={() => printRef.current}
                  documentTitle="Invoice"
                />
              </div>
            </div> */}
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};

export default dynamic(() => Promise.resolve(OrderRent), { ssr: false });
