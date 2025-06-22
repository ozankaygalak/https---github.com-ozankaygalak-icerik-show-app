// src/services/productService.ts
import axios from 'axios';

const BASE_URL = 'https://icerik-goster-be.onrender.com';

export const fetchProduct = async (barcode: string) => {
  const response = await axios.get(`${BASE_URL}/product/${barcode}`);
  return response.data;
};
