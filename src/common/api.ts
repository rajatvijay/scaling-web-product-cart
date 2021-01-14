import { Product, PRODUCTS } from "./data";

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS);
      // Imitating super slow API
    }, 2000);
  });
};
