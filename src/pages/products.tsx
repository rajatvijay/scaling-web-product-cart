import { RouteComponentProps } from "@reach/router";
import { Spin, Layout, Button } from "antd";
import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Product } from "../common/data";
import { AppDispatch, RootState } from "../common/store";
import { fetchProducts } from "../reducers/productsSlice";

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
  handleAddToCart = (productId: number) => {
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
              {products.map((product) => (
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

const ProductCard: FC<{
  product: Product;
  onAdd: (id: number) => void;
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
