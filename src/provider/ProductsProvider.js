import React, { useEffect, useReducer, createContext } from "react";
import { getProducts } from "../data/getData";
import { reducer } from "./reducers";

// import _ from "lodash";

const initialState = {
  productsData: [],
  fav: [],
  cart: [],
  checkout: false,
  total: 0,
  cartOpen: false,
  favOpen: false,
  categorySort: [],
};

export const ProductsContext = createContext(initialState); //state

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getProducts();
      dispatch({ type: "GET_DATA", payload: res });
    };

    fetchApi();
  }, []);

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     dispatch({ type: "GET_DATA", payload: await getData() });
  //   };

  //   fetchApi();
  // }, []);

  return (
    <ProductsContext.Provider value={[state, dispatch]}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
