import { UserContext } from "@context/UserContext";
import ProductServices from "@services/ProductServices";
import { notifyError, notifySuccess } from "@utils/toast";
import { Input, Rate } from "antd";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useContext, useState } from "react";
const { TextArea } = Input;

const FeebackComment = ({ idProduct, slug }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const {
    state: { userInfo },
  } = useContext(UserContext);

  const handlerFeebackComment = async () => {
    if (!userInfo || !userInfo._id) {
      notifyError(t("common:ErrorRatingProduct"));
      return; // Dừng việc thực hiện hàm nếu userInfo hoặc userInfo._id không tồn tại
    }
    setLoading(true);
    const data = {
      rating: rating,
      comment: comment,
      ratingby: userInfo._id,
    };

    const res = ProductServices.createFeeback(idProduct, data);
    if (res) {
      notifySuccess(t("common:rateSucess"));
      setLoading(false);
      setRating(5);
      setComment("");
      router.push(`/product/${slug}`);
    } else {
      setLoading(false);
      notifyError(t("common:rateWrong"));
    }
  };

  return (
    <div className=" bg-[#f5f6f6] w-[100%] p-4">
      <div className=" bg-[#f5f6f6] w-[100%]">
        <div className="box_comment">
          <div className="text-left text-[15px] font-semibold">
            {t("common:rate")}
          </div>
          <div className="">
            <Rate
              allowClear={false}
              value={rating}
              onChange={setRating}
              style={{
                fontSize: "30px",
                width: "80%",
                position: "static",
              }}
            />
          </div>

          <div className="mt-3 text-left text-[15px]">
            {t("common:Comment-Description")}
          </div>
          <div className="mt-2 mb-5">
            <TextArea
              rows={4}
              value={comment}
              placeholder={t("common:kitu2500")}
              maxLength={2500}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {loading ? (
            <button
              disabled={loading}
              className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none  mb-5 w-[20%] text-[15px] bg-green-600 px-6 py-3 text-white"
            >
              <img
                src="/loader/spinner.gif"
                alt="Loading"
                width={20}
                height={10}
              />
              <span className="font-serif ml-2 font-light">
                {t("common:processing")}
              </span>
            </button>
          ) : (
            <button
              onClick={handlerFeebackComment}
              className="mb-5 w-[20%] text-[15px] rounded-md bg-green-600 px-6 py-3 font-medium text-white"
            >
              {t("common:send")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeebackComment;
