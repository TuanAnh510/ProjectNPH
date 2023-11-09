import requests from "./httpServices";

const ShippingServices = {
  getAllShipping: async () => {
    return requests.get("/shipping/all");
  },
};

export default ShippingServices;
