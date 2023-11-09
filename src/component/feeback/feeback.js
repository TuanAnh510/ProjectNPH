import React from "react";
import { Input, Rate } from "antd";
import { useState } from "react";
import Image from "next/image";

import data from "/src/data/feeback.json";
import moment from "moment";
import { useSelector } from "react-redux";
import FeebackComment from "./feebackComment";
const { TextArea } = Input;

const feeback = ({ product, userInfo }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  function getAverageRating(product) {
    if (product.totalrating === 0) {
      return {
        percentageFiveStars: 0,
        percentageFourStars: 0,
        percentageThreeStars: 0,
        percentageTwoStars: 0,
        percentageOneStar: 0,
      };
    }

    const percentageFiveStars =
      (product.ratingcount.fiveStar / product.totalrating) * 100;
    const percentageFourStars =
      (product.ratingcount.fourStar / product.totalrating) * 100;
    const percentageThreeStars =
      (product.ratingcount.threeStar / product.totalrating) * 100;
    const percentageTwoStars =
      (product.ratingcount.twoStar / product.totalrating) * 100;
    const percentageOneStar =
      (product.ratingcount.oneStar / product.totalrating) * 100;

    return {
      percentageFiveStars,
      percentageFourStars,
      percentageThreeStars,
      percentageTwoStars,
      percentageOneStar,
    };
  }

  const {
    percentageFiveStars,
    percentageFourStars,
    percentageThreeStars,
    percentageTwoStars,
    percentageOneStar,
  } = getAverageRating(product);

  return (
    <div className="w-[90%] mx-auto">
      <div className="p-4 bg-[#f5f6f6]">
        <p className="text-[25px] font-bold mr-2 text-left">Đánh Giá</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
          <div>
            {" "}
            <div className="">
              <div className="text-[15px] ">Đánh giá trung bình</div>
            </div>
            <div className="flex justify-around">
              <div className="text-center items-center">
                <div className="text-[80px] font-bold text-center text-green-600">
                  {product.averagerating}
                </div>
                <div>
                  <Rate
                    allowHalf
                    value={product.averagerating}
                    style={{
                      fontSize: "20px",
                    }}
                    disabled
                  />
                </div>
                <div className="mt-2">Lượt đánh giá: {product.totalrating}</div>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <div className="text-center items-center py-14 ">
              <div className="flex justify-center lg:justify-normal">
                <span className="text-sm font-medium text-black">5 sao</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-[#e8e8e8]">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: `${percentageFiveStars}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-black">
                  {percentageFiveStars.toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-center lg:justify-normal mt-2">
                <span className="text-sm font-medium text-black">4 sao</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-[#e8e8e8]">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: `${percentageFourStars}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-black">
                  {" "}
                  {percentageFourStars.toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-normal mt-2">
                <span className="text-sm font-medium text-black">3 sao</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-[#e8e8e8]">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: `${percentageThreeStars}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-black">
                  {percentageThreeStars.toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-center lg:justify-normal mt-2">
                <span className="text-sm font-medium text-black">2 sao</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-[#e8e8e8]">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: `${percentageTwoStars}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-black">
                  {percentageTwoStars.toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-normal mt-2">
                <span className="text-sm font-medium  text-black">1 sao</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-[#e8e8e8]">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: `${percentageOneStar}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-black">
                  {percentageOneStar.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        {!userInfo ? (
          <div>
            <div className="mt-5 text-center items-center text-[15px]">
              Bạn cần đăng nhập tài khoản để chia sẻ nhận xét của bạn về sản phẩm
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-5 text-center items-center text-[15px]">
              Chia sẻ nhận xét của bạn về sản phẩm
            </div>
            <div className="text-center mt-5">
              <button
                className="mb-5 w-[50%] lg:w-[20%] text-[15px] rounded-lg bg-green-600 px-6 py-3 font-medium text-white"
                onClick={toggleCommentForm}
              >
                {showCommentForm ? "Thu gọn" : "Viết bình luận"}
              </button>
            </div>
          </div>
        )}

      </div>

      {showCommentForm && (
        <div>
          <FeebackComment idProduct={product._id} slug={product.slug} />
        </div>
      )}
      {/* khung bình luận */}

      <div className="bg-white w-[100%] mx-auto">
        <div className="antialiased mx-auto p-4 ">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Bình luận</h3>
          <div className="space-y-4 pt-3 h-[380px] w-[100%] overflow-y-scroll">
            {product?.ratings?.map((review, i) => (
              <div className="flex" key={i}>
                <div className="flex-shrink-0 mr-3">
                  {review?.ratingby?.image ? (
                    <Image
                      width={40}
                      height={40}
                      src={review?.ratingby?.image}
                      className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 shadow-xl "
                    />
                  ) : (
                    <div className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 shadow-xl border border-green-600 pt-1 lg:pt-2 ">
                      <p className="text-center justify-center">
                        {review?.ratingby?.name.slice(0, 1).toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex justify-between border shadow-lg rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed text-left">
                  <div className="flex flex-col">
                    <span className="font-bold text-[13px] ">
                      {review?.ratingby?.name}
                    </span>
                    <Rate
                      style={{ position: "static" }}
                      className="text-[12px] lg:text-[15px]"
                      value={review.rating}
                      allowHalf
                      disabled
                      defaultValue={5}
                    />
                    <div className="text-[10px] lg:text-[13px] text-gray-400 font-medium">
                      <span>
                        {moment(review.createdat).format("DD/MM/YYYY HH:mm")}
                      </span>
                    </div>
                    <span className="text-[15px] mt-2">{review.comment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default feeback;
