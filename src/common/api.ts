import { PRODUCTS } from "./data";

export const getProducts = () => {
  return Promise.resolve(PRODUCTS);
};
