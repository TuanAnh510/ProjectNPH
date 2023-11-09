import StickyCart from "@component/cart/StickyCart";
import Layout from "@layout/Layout";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@windmill/react-ui";
import Image from "next/image";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import useWarrantyCheck from "@hooks/useWarrantyCheck";

const WarrantyCheck = () => {
  const { t } = useTranslation();
  const {
    infor,
    setInvoice,
    setStyleCheck,
    styleCheck,
    handleCheck,
    handleCheckPhone,
    handleStyleCheck,
    loading,
    setLoading,
  } = useWarrantyCheck();

  const handleChangeSelect = (e) => {
    setStyleCheck(e.target.value);
  };
  return (
    <>
      <Layout
        title="Kiểm tra bảo hành"
        description="Đây là trang kiểm tra bảo hành"
      >
        <StickyCart />
        <div className=" w-[80%] mx-auto pt-10 pb">
          <div className="text-[25px] text-center font-bold~">
            <p>{t("common:Warranty-page")}</p>
          </div>
          <div className="pt-20">
            <div className=" gap-2 mb-5">
              <div className="inline-block relative w-64">
                <select
                  value={styleCheck}
                  onChange={handleChangeSelect}
                  className="block appearance-none w-full  border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline "
                >
                  <option value="invoice">
                    {" "}
                    {t("common:lookup-by-invoice")}
                  </option>
                  <option value="phone"> {t("common:lookup_by_phone")}</option>
                </select>
              </div>
            </div>
            {styleCheck === "invoice" ? (
              <>
                <label
                  for="input-group-1"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  {t("common:lookup-by-invoice")}
                </label>
                <div className="flex flex-wrap gap-5">
                  <div className="relative ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Image
                        src="/bill.png"
                        className=" text-gray-500 "
                        width={20}
                        height={20}
                      />
                    </div>
                    <input
                      onChange={(e) => setInvoice(e.target.value)}
                      type="text"
                      id="input-group-1"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-60 pl-10 p-2.5    "
                      placeholder={t("common:id-invoice")}
                    />
                  </div>
                  <div>
                    {loading ? (
                      <button
                        disabled={loading}
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-green-600 text-white px-5 md:px-6 lg:px-8 hover:text-white hover:bg-green-600 w-[200%] h-[40px] text-sm lg:text-sm sm:w-auto"
                      >
                        <img
                          src="/loader/spinner.gif"
                          alt="Loading"
                          width={20}
                          height={10}
                        />
                        <span className="font-serif ml-2 font-light">
                          Processing
                        </span>
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 text-white w-[200%] h-[40px] rounded-lg"
                        onClick={handleCheck}
                      >
                        {t("common:check")}
                      </button>
                    )}
                  </div>
                </div>
                {/* <button
                  className="bg-green-600 text-white w-[200px] h-[40px] rounded-lg my-2"
                  onClick={handleStyleCheck}
                >
                  Kiểm tra bằng số điện thoại
                </button> */}
              </>
            ) : (
              <>
                <label
                  for="input-group-1"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  {t("common:lookup_by_phone")}
                </label>
                <div className="flex flex-wrap gap-5">
                  <div className="relative ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Image
                        src="/phone.png"
                        className=" text-gray-500 "
                        width={20}
                        height={20}
                      />
                    </div>
                    <input
                      onChange={(e) => setInvoice(e.target.value)}
                      type="text"
                      id="input-group-1"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-60 pl-10 p-2.5    "
                      placeholder={t("common:phone")}
                    />
                  </div>
                  <div>
                    <button
                      className="bg-green-600 text-white w-[200%] h-[40px] rounded-lg"
                      onClick={handleCheckPhone}
                    >
                      {t("common:check")}
                    </button>
                  </div>
                </div>
                {/* <button
                  className="bg-green-600 text-white w-[200px] h-[40px] rounded-lg my-2"
                  onClick={handleStyleCheck}
                >
                  Kiểm tra bằng Hóa đơn
                </button> */}
              </>
            )}
          </div>

          {infor[0] !== undefined ? (
            <div className="mt-3">
              <h5 className="mx-5 mb-2"> {t("common:info")}</h5>
              <div className="w-[80%] lg:w-[20%] flex gap-2  h-[100px] rounded-[44px] bg-white shadow-2xl ">
                <div className="w-[45px] h-[45px] inline-block my-5 ml-5 rounded-xl">
                  <img src="profile.gif" alt="profile" />
                </div>
                <div className="py-6">
                  <h6 className="text-[13px]">
                    {t("common:name")} : {infor[0]?.user_info?.name}
                  </h6>
                  <h6 className="text-[13px]">
                    {t("common:phone")} : {infor[0]?.user_info?.contact}
                  </h6>
                </div>
              </div>
            </div>
          ) : (
            " "
          )}
        </div>

        <div className="w-[80%] mx-auto pt-5">
          {infor?.map((order, i) => (
            <>
              <div key={i + 1}>
                {t("common:invoice")} : {i + 1}
              </div>
              <TableContainer>
                <Table>
                  <TableHeader className="bg-green-600 ">
                    <TableRow className="text-white font-sans">
                      <TableCell>{t("common:numerical-order")}</TableCell>
                      <TableCell>{t("common:items")}</TableCell>
                      <TableCell>{t("common:Warranty-period")}</TableCell>
                      <TableCell>{t("common:Time-buy")}</TableCell>
                    </TableRow>
                  </TableHeader>
                  {order?.cart?.map((cart, index) => (
                    <TableBody key={index + 1}>
                      <TableRow>
                        <TableCell>
                          <span className="text-sm">{index + 1}</span>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm">{cart?.title}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {cart.warranty ? cart.warranty : 0}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {dayjs(order.updatedAt).format("DD/MM/YYYY")}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </TableContainer>
              <br />
            </>
          ))}

          <div className="mt-10 pb-10">
            <ul className="list-decimal leading-8">
              <li> {t("common:w1")}</li>
              <li>{t("common:w2")}</li>
              <li>{t("common:w3")}</li>
              <li>{t("common:w4")}</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(WarrantyCheck), { ssr: false });
