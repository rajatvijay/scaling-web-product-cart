import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import { persistor, store } from "./common/store";
import { Home } from "./pages/home";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <Router>
          <Home path="/" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
