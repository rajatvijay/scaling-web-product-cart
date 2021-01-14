import React from "react";
import { AppDispatch, RootState } from "../common/store";
import { connect, ConnectedProps } from "react-redux";
import { addItem, deleteItem } from "../reducers/cartSlice";
import { CartItem } from "./CartItem";

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
  render() {
    const { cart, products, state } = this.props;
    return (
      <div>
        <h1>Cart</h1>
        {state === "success" &&
          Object.keys(cart).map((id) =>
            cart[id] ? (
              <CartItem
                quantity={cart[id]}
                onIncrease={this.handleIncrease(id)}
                onDecrease={this.handleDecrease(id)}
                onDelete={this.handleDelete(id)}
                name={products[id].name}
                unitPrice={products[id].unitPrice}
              />
            ) : null
          )}
      </div>
    );
  }
}

// Named exports let the user of this module
// rename the import explicitly rather than implicitly
const WrappedCart = connector(Cart);
export { WrappedCart as Cart };
