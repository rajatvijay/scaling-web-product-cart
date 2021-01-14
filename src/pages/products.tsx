import { RouteComponentProps } from "@reach/router";
import { Spin, Layout } from "antd";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../common/store";
import { fetchProducts } from "../reducers/productsSlice";
import { ProductCard } from "../components/ProductCard";

const { Content } = Layout;
const mapStateToProps = (state: RootState) => {
  return {
    ...state.products,
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
    // TODO: Implement me!
  };
  render() {
    const { state, products, error } = this.props;
    return (
      <Layout>
        <Content
          style={{
            maxWidth: "800px",
            padding: 50,
            minHeight: "100vh",
          }}
        >
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
        </Content>
      </Layout>
    );
  }
}

// Named exports let the user of this module
// rename the import explicitly rather than implicitly
const WrappedProductsList = connector(ProductsList);
export { WrappedProductsList as ProductsList };
