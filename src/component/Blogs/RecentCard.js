import React from "react";
import Link from "next/link";
import moment from "moment";

const RecentCard = ({ blogs }) => {
  const limitTitleBlogs = (title, limit) => {
    if (title.length > limit) {
      return title.slice(0, limit) + "...";
    }
    return title;
  };

  const sortedBlogs = [...blogs].sort((a, b) =>
    a.status === "show" ? -1 : b.status === "show" ? 1 : 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 mtop w-[90%] ml-auto mr-auto gap-10">
      {sortedBlogs.map((blog, index) => (
        <div
          key={index}
          className={`bg-color-card shadow-md p-[20px] rounded-2xl cursor-pointer ${
            blog.status === "hide" ? "hidden" : ""
          }`}
        >
          <Link href={`/blog/${blog._id}`}>
            <div className="">
              <img
                src={blog.image}
                className="rounded-md w-[400px] h-[250px]  object-cover"
                alt=""
              />
            </div>
          </Link>
          <div className="is-divider mt-3"></div>
          <div className="text-sm font-bold text-left text-[#fe2c6d]">
            <p>{blog.category.title}</p>
          </div>
          <div className="text pt-1">
            <h6 className="h5_location text-black text-left">
              {limitTitleBlogs(blog.title, 100)}
            </h6>
          </div>
          <div className="text-sm text-gray-500 text-right">
            <span>{moment(blog.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentCard;
