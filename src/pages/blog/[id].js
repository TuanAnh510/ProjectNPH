// import "./Blog.css";
import Tpost from "@component/Blogs/Tpost";
import ShowComment from "@component/Blogs/ShowComment";
import Comment from "@component/Blogs/Comment";
import { useRouter } from "next/router";
//internal import

import Footer from "@layout/footer/Footer";
import Layout from "@layout/Layout";
import PageHeader from "@component/header/PageHeader";
import BlogServices from "@services/BlogServices";
import { useContext, useEffect, useRef, useState } from "react";
import Loading from "@component/preloader/Loading";

const Blog = ({ params }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const printRef = useRef();
  const blogId = params.id;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await BlogServices.getBlogById(blogId);
        setData(res);
        setLoading(false);

      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Layout title="Tin tức" description="Đây là trang tin tức">
        {loading && !data ? (
          <Loading loading={loading} />
        ) : (
          <>
            {" "}
            <div className="pb-[35px]">
              <Tpost data={data} />
            </div>
            <div className="w-[100%] p-[20px]">
              <Comment data={data} />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};
export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};
export default Blog;
