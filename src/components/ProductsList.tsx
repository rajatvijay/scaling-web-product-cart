import { RouteComponentProps } from "@reach/router";
import { Modal, Spin } from "antd";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../common/store";
import { fetchProducts } from "../reducers/productsSlice";
import { addUser } from "../reducers/userSlice";
import { ProductCard } from "./ProductCard";

const mapStateToProps = (state: RootState) => {
  return {
    ...state.products,
    isLoggedIn: !!state.user.id,
  };
};
const connector = connect(mapStateToProps);

class ProductsList extends React.Component<
  RouteComponentProps &
    ConnectedProps<typeof connector> & { dispatch: AppDispatch }
> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }
  handleAddToCart = (productId: string) => {
    const { isLoggedIn, dispatch } = this.props;
    if (!isLoggedIn) {
      Modal.confirm({
        title: "Please login to add items to cart!",
        content: "Click on ok to login",
        onOk: () => {
          dispatch(addUser("Some Random User Name"));
        },
        onCancel: () => {},
      });
    }
  };
  render() {
    const { state, products, error } = this.props;
    return (
      <div>
        {state === "loading" ? <Spin /> : null}
        {state === "success" ? (
          <div>
            <h1>Products</h1>
            {Object.values(products).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={this.handleAddToCart}
              />
            ))}
          </div>
        ) : null}
        {state === "error" ? <p>{error}</p> : null}
      </div>
    );
  }
}

// Named exports let the user of this module
// rename the import explicitly rather than implicitly
const WrappedProductsList = connector(ProductsList);
export { WrappedProductsList as ProductsList };
