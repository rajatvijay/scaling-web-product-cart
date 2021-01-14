import React from "react";
import "./App.css";
import { Redirect, Router } from "@reach/router";
import { ProductsList } from "./pages/products";
import { Provider } from "react-redux";
import { store } from "./common/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ProductsList path="/products" />
        <Redirect noThrow from="*" to="/products" />
      </Router>
    </Provider>
  );
}

export default App;
