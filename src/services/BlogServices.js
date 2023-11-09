import requests from "./httpServices";

const BlogServices = {
  getAllBlog: async () => {
    return requests.get("/blog/all");
  },
  getBlogById: async (id) => {
    return requests.get(`/blog/${id}`);
  },
  postCommnetBlog: async (id, body) => {
    return requests.post(`blog/comment/${id}`,body);
  },
};

export default BlogServices;
