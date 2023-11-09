import requests from "./httpServices";
import requests2 from "./httpServices2";

const OrderServices = {
  addOrder: async (body, headers) => {
    return requests.post("/order/add", body, headers);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },
  createPaymentVnPay: async (body) => {
    return requests.post("/payment/create_payment_url", body);
  },
  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order?limit=${limit}&page=${page}`);
  },
  getOrderById: async (id, body) => {
    return requests.get(`/order/${id}`, body);
  },
  getOrderByInvoice: async (id) => {
    return requests.get(`/orders/warranty/${id}`);
  },
  getOrderByPhone: async (id) => {
    return requests.get(`/orders/warrantyphone/${id}`);
  },
  getOrderAll: async () => {
    return requests.get(`/orders/`);
  },
  getMoney: async () => {
    return requests2.get(
      `/gh/fawazahmed0/currency-api@1/latest/currencies/vnd.json`
    );
  },
  updateOrder: async (id, body, headers) => {
    return requests.put(`/orders/${id}`, body, headers);
  },
};

export default OrderServices;
