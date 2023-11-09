import { Input, Rate } from "antd";
import { useContext, useState } from "react";
import Image from "next/image";
import Loading from "@component/preloader/Loading";
import useCommentBlog from "@hooks/useCommentBlog";
import BlogServices from "@services/BlogServices";
import { UserContext } from "@context/UserContext";
import { notifyError, notifySuccess } from "@utils/toast";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
const { TextArea } = Input;

const Comment = ({ data }) => {
  if (!data || !data.comments) {
    return <Loading />;
  }
  const [showCommentForm, setShowCommentForm] = useState(true);
  const { t } = useTranslation();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentsData, setCommentsData] = useState(data.comments);
  const checkMail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handelBlogComment = async () => {
    setLoading(true);

    if (!checkMail.test(email)) {
      setLoading(false);
      notifyError(t("common:emailWrong"));
      return;
    }

    const dataBlog = {
      email: email,
      username: title,
      description: comment,
    };

    const res = await BlogServices.postCommnetBlog(data._id, dataBlog);
    if (res) {
      notifySuccess(t("common:commentSuccess"));
      setLoading(false);
      setComment("");
      setEmail("");
      setTitle("");
      router.push(`/blog/${data._id}`);
      setCommentsData([
        ...commentsData,
        {
          ...dataBlog,
          _id: "new-comment-id",
          created: moment().toISOString(),
        },
      ]);
    } else {
      setLoading(false);
      notifyError(t("common:commentWrong"));
    }
  };

  return (
    <div>
      <div className="w-[90%] mx-auto">
        <div className="p-4 bg-[#f5f6f6]">
          <p className="text-[25px] font-bold mr-2 text-left">
          {t("common:Comment")}
          </p>
        </div>

        {showCommentForm && (
          <div className=" bg-[#f5f6f6] w-[100%] p-4">
            <div className=" bg-[#f5f6f6] w-[100%]">
              <div className="box_comment">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-left text-[15px] mt-3">Email *</span>
                    <Input
                      type="text"
                      placeholder="Nhập email"
                      className="rounded-lg border border-gray-300 w-full"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="text-left text-[15px] mt-3">
                    {t("common:contact-page-form-input-name")} *
                    </span>
                    <Input
                      type="text"
                      placeholder="Nhập tên người dùng"
                      className="rounded-lg border border-gray-300 w-full"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3 text-left text-[15px]">
                {t("common:Comment-Description")} *
                </div>
                <div className="mt-2 mb-5">
                  <TextArea
                    rows={4}
                    placeholder="Kí tự tối đa 2500"
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
                    className="mb-5 w-[30%] text-[15px] rounded-md bg-green-600 px-6 py-3 font-medium text-white"
                    onClick={handelBlogComment}
                  >
                    {t("common:send")}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {/* khung bình luận */}

        <div className="bg-white w-[100%] mx-auto">
          <div className="antialiased mx-auto p-4 ">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">{t("common:Comment")}</h3>
            <div className="space-y-4 pt-3 h-[380px] w-[100%] overflow-y-scroll">
              {commentsData?.map((comments, i) => (
                <div className="flex">
                  <div className="flex-1 flex justify-between border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed text-left">
                    <div key={i} className="flex flex-col">
                      <span>{comments.username}</span>

                      <div className="text-[10px] lg:text-[13px] text-gray-400 font-medium">
                        {moment(comments.created).format("YYYY-MM-DD HH:mm")}
                      </div>

                      <span className="text-[13px] mt-2">
                        {comments.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comment;
