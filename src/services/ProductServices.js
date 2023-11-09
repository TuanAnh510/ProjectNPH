import requests from "./httpServices";

const ProductServices = {
  getShowingProducts: async () => {
    return requests.get("/products/show");
  },
  getShowingStoreProducts: async ({ category = "", title = "" }) => {
    return requests.get(`/products/store?category=${category}&title=${title}`);
  },
  getDiscountedProducts: async () => {
    return requests.get("/products/discount");
  },

  getProductBySlug: async (slug) => {
    return requests.get(`/products/product/${slug}`);
  },
  createFeeback: async (id, body) => {
    return requests.post(`/products/rating/${id}`, body);
  },

  getRegion: async () => {
    return requests.get(`/region/all`);
  },

};

export default ProductServices;
