import React, { useState, useEffect } from "react";
// import "./Tpost.css";
import Link from "next/link";
import dayjs from "dayjs";
// import Carts from "../HomePage/Cart";
// import CartBlog from "./CartBlog";
const Tpost = ({ data }) => {
  return (
    <>
      <div>
        <main>
          <div className="w-full lg:w-[90%] mx-auto ">
            <section className="contentsBlog mtop">
              <div className="w-[80%] pt-3 mx-auto">
                <h1 className="block  text-xl lg:text-2xl font-semibold leading-10 lg:leading-10 text-black text-left">
                  {data.title}
                </h1>
              </div>
              <div className="w-[80%] mx-auto pt-3 text-right">
                <span className="text-gray-500"> {dayjs(data?.updatedAt).format("DD/MM/YYYY")}</span>
              </div>

              <div className="lg:h-[400px] h-[200px] w-[90%] lg:w-[70%] md:w-[80%] ml-auto mr-auto pt-3">
                <img
                  src={data.image}
                  className="w-full h-full object-cover  mb-[20px] block relative rounded-[8px]"
                  alt=""
                />
              </div>


              <div className="w-[70%] mx-auto pt-10 pb-10">
                <p
                  className="text-justify text-[16px]"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></p>
              </div>
            </section>
            <section className="sideContent"></section>
          </div>
        </main>
      </div >
    </>
  );
};

export default Tpost;
