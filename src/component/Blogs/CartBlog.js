import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "./CartBlog.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Link } from "react-router-dom";
// import img1 from "../../Image/1.webp";
// import img2 from "../../Image/1647316643.webp";
// import img3 from "../../Image/1672817926.webp";
// import img4 from "../../Image/1682067960.webp";
// import img5 from "../../Image/1682270821.webp";
// import { Rate } from "antd";
const CartBlog = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    fade: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef();
  const gotoNext = () => {
    sliderRef.current.slickNext();
  };
  const gotoPrev = () => {
    sliderRef.current.slickPrev();
  };

  const text =
    "Những thương hiệu mỹ phẩm “affordable luxury” bạn nhất định nên follow trong năm 2023";
  const text2 =
    "Máy Uốn Tóc Tự Xoay Ion Âm Halio InstaCurl Premium Automatic Hair Styler Pearl White";

  return (
    <>
      <div className="slider">
        <div className="flex justify-between">
          <h1 className="text-[22px] mt-10 font-bold">Bài Viết Liên Quan</h1>
        </div>
{/* 
        <Slider {...settings} ref={sliderRef} className="h-[300px]"> */}
          <div className="card flex flex-col">
            <div className="image-container">
              <img
                src="https://upload.lixibox.com/system/blogs/covers/000/000/847/original/1682503238.jpg"
                style={{
                  height: "150px",
                  width: "290px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <div className="">
              <div className="text-left text-[15px] mb-2 font-bold">
                {text.slice(0, 50)}...
              </div>
            </div>
          </div>
          <div className="card flex flex-col">
            <div className="">
              <img
                src="https://upload.lixibox.com/system/blogs/covers/000/001/664/original/1682565610.jpg"
                style={{
                  height: "150px",
                  width: "290px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <div className="">
              <div className="text-left text-[15px] mb-2 font-bold">
                {text2.slice(0, 50)}...
              </div>
            </div>
          </div>
          <div className="card flex flex-col">
            <div className="">
              <img
                src="https://upload.lixibox.com/system/blogs/covers/000/001/666/original/1682582233.jpg"
                style={{
                  height: "150px",
                  width: "290px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <div>
              <div className="text-left text-[15px] mb-2 font-bold">
                {text2.slice(0, 50)}...
              </div>
            </div>
          </div>
          <div className="card flex flex-col">
            <div className="">
              <img
                src="https://upload.lixibox.com/system/blogs/covers/000/001/663/original/1682496603.jpg"
                style={{
                  height: "150px",
                  width: "290px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <div>
              <div className="text-left text-[15px] mb-2 font-bold">
                {text2.slice(0, 50)}...
              </div>
            </div>
          </div>
          <div className="card flex flex-col">
            <div className="">
              <img
                src="https://upload.lixibox.com/system/blogs/covers/000/001/638/original/1681812017.jpg"
                style={{
                  height: "150px",
                  width: "290px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <div>
              <div className="text-left text-[15px] mb-2 font-bold">
                {text2.slice(0, 50)}...
              </div>
            </div>
          </div>
          <div className="card flex flex-col">
            <div className="">
              <img
                src="https://upload.lixibox.com/system/blogs/covers/000/001/666/original/1682582233.jpg"
                style={{
                  height: "150px",
                  width: "290px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <div>
              <div className="text-left text-[15px] mb-2 font-bold">
                {text2.slice(0, 50)}...
              </div>
            </div>
          </div>
        {/* </Slider> */}
      </div>
    </>
  );
};

export default CartBlog;
