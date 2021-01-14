import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import React, { FC } from "react";
import { Cart } from "../components/Cart";
import { ProductsList } from "../components/ProductsList";

const { Content } = Layout;

const Home: FC<RouteComponentProps> = (props) => {
  return (
    <Layout>
      <Content
        style={{
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <div
          style={{
            flexBasis: "50%",
            borderRight: "1px solid gray",
            padding: 25,
          }}
        >
          <ProductsList />
        </div>
        <div style={{ flexBasis: "50%", padding: 25 }}>
          <Cart />
        </div>
      </Content>
    </Layout>
  );
};

export { Home };
