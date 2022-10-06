import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/products?offset=0&limit=20";
const DETAIL_URL = `https://api.escuelajs.co/api/v1/products`;

const getProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const getPagin = async (pageNumber) => {
  const response = await axios.get(
    `${DETAIL_URL}?offset=${parseInt(pageNumber * 20)}&limit=20 `
  );
  return response.data;
};

const getDetail = async (itemId) => {
  const response = await axios.get(`${DETAIL_URL}/${itemId}`);
  return response.data;
};

export { getProducts, getDetail, getPagin };
