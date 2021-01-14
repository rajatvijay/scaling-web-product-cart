import React from "react";
import { AppDispatch, RootState } from "../common/store";
import { connect, ConnectedProps } from "react-redux";
import { addItem, deleteItem, flushCart } from "../reducers/cartSlice";
import { CartItem } from "./CartItem";
import { Button, message, Modal } from "antd";

const mapStateToProps = (state: RootState) => {
  return {
    ...state.products,
    cart: state.cart,
  };
};
const connector = connect(mapStateToProps);

class Cart extends React.Component<
  ConnectedProps<typeof connector> & { dispatch: AppDispatch }
> {
  handleIncrease = (id: string) => () => {
    const { dispatch } = this.props;
    dispatch(
      addItem({
        id,
        quantity: 1,
      })
    );
  };
  handleDecrease = (id: string) => () => {
    const { dispatch } = this.props;
    dispatch(
      deleteItem({
        id,
        quantity: 1,
      })
    );
  };
  handleDelete = (id: string) => () => {
    const { dispatch, cart } = this.props;
    dispatch(
      deleteItem({
        id,
        quantity: cart[id],
      })
    );
  };
  handleConfirmCart = () => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: "Place Order",
      content: "Please confirm your cart!",
      onOk: () => {
        dispatch(flushCart());
        message.success("Order Placed!");
      },
      onCancel: () => {},
    });
  };
  render() {
    const { cart, products, state } = this.props;
    const cartItemIds = Object.keys(cart).filter((id) => !!cart[id]);
    return (
      <div>
        <h1>Cart</h1>
        {state === "success" && (
          <div>
            {cartItemIds.map((id) => (
              <CartItem
                quantity={cart[id]}
                onIncrease={this.handleIncrease(id)}
                onDecrease={this.handleDecrease(id)}
                onDelete={this.handleDelete(id)}
                name={products[id].name}
                unitPrice={products[id].unitPrice}
              />
            ))}
            {cartItemIds.length ? (
              <Button onClick={this.handleConfirmCart} type="primary">
                Place Order
              </Button>
            ) : null}
          </div>
        )}
        {state === "success" && !cartItemIds.length ? (
          <div>
            <p>No items in the cart!</p>
          </div>
        ) : null}
      </div>
    );
  }
}

// Named exports let the user of this module
// rename the import explicitly rather than implicitly
const WrappedCart = connector(Cart);
export { WrappedCart as Cart };
