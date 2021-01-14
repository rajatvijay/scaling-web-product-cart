export type Product = {
  id: number;
  name: string;
  unitPrice: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Apples",
    unitPrice: 29,
  },
  {
    id: 2,
    name: "Bananas",
    unitPrice: 19,
  },
  {
    id: 3,
    name: "Kiwi",
    unitPrice: 39,
  },
  {
    id: 4,
    name: "Mango",
    unitPrice: 89,
  },
  {
    id: 5,
    name: "Oranges",
    unitPrice: 49,
  },
];
