import React from "react";
import { Button } from "antd";

type CartItemProps = {
  name: string;
  quantity: number;
  unitPrice: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
};
export class CartItem extends React.PureComponent<CartItemProps> {
  render() {
    const {
      name,
      quantity,
      onIncrease,
      onDecrease,
      onDelete,
      unitPrice,
    } = this.props;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
          padding: "2px 5px",
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        <p style={{ marginBottom: 0 }}>{name}</p>
        <Button onClick={onDecrease}>-</Button>
        <p style={{ marginBottom: 0 }}>{quantity}</p>
        <Button onClick={onIncrease}>+</Button>
        <p style={{ marginBottom: 0 }}>Total Price: {quantity * unitPrice}</p>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    );
  }
}
