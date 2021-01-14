import { Button } from "antd";
import React, { FC } from "react";
import { Product } from "../common/data";

export const ProductCard: FC<{
  product: Product;
  onAdd: (id: string) => void;
}> = (props) => {
  const { product, onAdd } = props;
  return (
    // Doing inline styling
    // Since styling does not matter much
    <div
      style={{
        marginBottom: 20,
        display: "flex",
        width: 200,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <p>{product.name}</p>
        <p>Rs. {product.unitPrice}</p>
      </div>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => onAdd(product.id)}
      >
        Add to Cart
      </Button>
    </div>
  );
};
