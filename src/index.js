import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

import App from "./App";
import ProductsProvider from "./provider/ProductsProvider";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./provider/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </AuthProvider>
  </BrowserRouter>
);
