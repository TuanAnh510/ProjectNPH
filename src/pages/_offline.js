import React from 'react';
import Head from 'next/head';

const Offline = () => {
  return (
    <>
      <Head>
        <title>NPH Digital</title>
      </Head>
      <div className="px-6 py-10 lg:py-20 bg-green-50 h-screen flex flex-wrap content-center">
        <div className="block justify-items-stretch mx-auto items-center text-center">
          <h2 className="font-bold font-serif font-2xl lg:text-3xl leading-6 mb-4">
            Không có kết nối mạng!
          </h2>
          <p className="block text-center text-base font-sans text-gray-600">
            Hãy kiểm tra kết nối mạng!
          </p>
        </div>
      </div>
    </>
  );
};

export default Offline;
