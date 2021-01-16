import { Button, message, Modal, Spin } from "antd";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../common/store";
import { addItem, flushCart } from "../reducers/cartSlice";
import { fetchProducts } from "../reducers/productsSlice";
import { logout } from "../reducers/userSlice";
import { LoginForm } from "./Login";
import { ProductCard } from "./ProductCard";

const mapStateToProps = (state: RootState) => {
  return {
    ...state.products,
    isLoggedIn: !!state.user.user,
    cart: state.cart,
  };
};
const connector = connect(mapStateToProps);

class ProductsList extends React.Component<
  ConnectedProps<typeof connector> & { dispatch: AppDispatch }
> {
  state = {
    loginModalVisible: false,
    productToAddAfterLogin: "",
  };
  showLoginModal = () => {
    this.setState({
      loginModalVisible: true,
    });
  };
  hideLoginModal = () => {
    this.setState({
      loginModalVisible: false,
    });
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }
  handleAddToCart = (productId: string) => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.setState({
        productToAddAfterLogin: productId,
      });
      this.showLoginModal();
    } else {
      this.addItemToCart(productId);
    }
  };
  addItemToCart = (id: string) => {
    const { cart, dispatch } = this.props;
    if (!cart[id]) {
      dispatch(
        addItem({
          id,
          quantity: 1,
        })
      );
    } else {
      message.warning(
        "Item already added to the cart. To increase the quantity go to the cart!"
      );
    }
  };
  handleSuccessfulLogin = () => {
    const { productToAddAfterLogin } = this.state;
    if (productToAddAfterLogin) {
      this.addItemToCart(productToAddAfterLogin);
      this.setState({
        productToAddAfterLogin: "",
      });
    }
    this.hideLoginModal();
  };
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(flushCart());
    dispatch(logout());
    message.success("You have been logged out successfully!");
  };
  render() {
    const { state, products, error, isLoggedIn } = this.props;
    const { loginModalVisible } = this.state;
    return (
      <div style={{ position: "relative" }}>
        {isLoggedIn && (
          <Button
            type="ghost"
            style={{ position: "absolute", top: 10, right: 20 }}
            onClick={this.handleLogout}
          >
            Logout
          </Button>
        )}
        <Modal
          visible={loginModalVisible}
          footer={null}
          onCancel={this.hideLoginModal}
        >
          <LoginForm onSuccess={this.handleSuccessfulLogin} />
        </Modal>
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
