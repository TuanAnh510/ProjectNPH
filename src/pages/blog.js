import React, { useContext, useState, useEffect } from "react";
import RecentCard from "@component/Blogs/RecentCard";
import Layout from "@layout/Layout";
import PageHeader from "@component/header/PageHeader";
import { useRouter } from "next/router";
import { SidebarContext } from "@context/SidebarContext";
import BlogServices from "@services/BlogServices";
const Blog = ({ blogs }) => {
  const router = useRouter();
  const [row, setRow] = useState(30);
  const { isLoading, setIsLoading } = useContext(SidebarContext);

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <Layout title="Tin tức" description="Đây là trang tin tức">
        {isLoading ? (
          <Loading loading={isLoading} />
        ) : (
          <div className="pb-[35px]">
            <RecentCard blogs={blogs} />
          </div>
        )}
      </Layout>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const blogs = await BlogServices.getAllBlog();

  return {
    props: {
      blogs: blogs,
    },
  };
};
export default Blog;
