import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import { store } from "./common/store";
import { Home } from "./pages/home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Home path="/" />
      </Router>
    </Provider>
  );
}

export default App;
