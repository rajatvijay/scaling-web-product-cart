import { Product, PRODUCTS } from "./data";

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS);
      // Imitating super slow API
    }, 2000);
  });
};

// Adding the dummy creds here itself!
const USER_EMAIL = "rajat@scalingweb.com";
const USER_PASSWORD = "scaling-web";
export const login = (
  email: string,
  password: string
): Promise<{
  status: boolean;
  user?: string;
}> => {
  return new Promise((resolve) => {
    if (email === USER_EMAIL && password === USER_PASSWORD) {
      resolve({
        status: true,
        user: email,
      });
    } else {
      resolve({
        status: false,
      });
    }
  });
};
