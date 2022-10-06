import React, { useContext, useState } from "react";
import logo from "../utils/logo.png";
import "../common/Navbar.css";

import CartList from "./CartList";
import FavoritList from "./FavoritList";
import { ProductsContext } from "../provider/ProductsProvider";

import {
  TbShoppingCart,
  TbHeart,
  TbLogin,
  TbUser,
  TbLogout,
} from "react-icons/tb";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useAuth, UserContext } from "../provider/AuthProvider";

const Navbar = () => {
  const userData = useAuth();
  const [state, dispatch] = useContext(ProductsContext);
  const { user, login } = useContext(UserContext);

  const [sort, setSort] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const priceSortOptions = [
    { value: "highest", label: "🔺 Highest" },
    { value: "lowest", label: "🔻 Lowest" },
  ];

  const sortOptions = [
    { value: "All", label: "All", id: 0 },
    { value: "Clothes", label: "Clothes", id: 1 },
    { value: "Electronics", label: "Electronics", id: 2 },
    { value: "Furniture", label: "Furniture", id: 3 },
    { value: "Shoes", label: "Shoes", id: 4 },
    { value: "Others", label: "Others", id: 5 },
  ];

  const sortHandler = (selectedOption) => {
    dispatch({ type: "SORT", payload: selectedOption });
    setSort(selectedOption);
    state.cartOpen = false;
    state.favOpen = false;
  };

  const priceSortHandler = (selectedOption) => {
    dispatch({ type: "PRICE_SORT", payload: selectedOption });
    setPriceSort(selectedOption);
    state.cartOpen = false;
    state.favOpen = false;
  };

  const favHandler = () => {
    dispatch({ type: "TOGGLE_FAV" });
    state.cartOpen = false;
  };

  const cartListHandler = () => {
    dispatch({ type: "TOGGLE_CART" });
    state.favOpen = false;
  };

  const logoutHandler = () => {
    login({ authLogin: !user.authLogin });
  };

  return (
    <div className="navbar-container">
      <Link to="/">
        <figure>
          <img src={logo} alt="logo" />
        </figure>
      </Link>

      <section className="navbar-select">
        <Select
          placeholder="clothe, shoes, ..."
          className="categories"
          options={sortOptions}
          value={sort}
          onChange={sortHandler}
        />

        <Select
          placeholder="sort by price💲"
          className="categories"
          options={priceSortOptions}
          value={priceSort}
          onChange={priceSortHandler}
        />
      </section>

      <div className="navbar-emoji">
        <div onClick={() => favHandler()}>
          <TbHeart />
          <span>{state.fav?.length}</span>
        </div>

        {state.favOpen && <FavoritList />}

        <div onClick={() => cartListHandler()}>
          <TbShoppingCart />
          <span>{state.cart?.length}</span>
        </div>

        {state.cartOpen && (
          <CartList setSort={setSort} setPriceSort={setPriceSort} />
        )}
      </div>

      <section className="icons">
        {userData && user.authLogin ? (
          <>
            <Link to="/profile">Profile</Link>
            <span onClick={() => logoutHandler()}>
              <Link to="/">
                <TbLogout />
              </Link>
            </span>
          </>
        ) : (
          ""
        )}

        {!userData || !user.authLogin ? (
          <>
            <Link to="/login">
              <TbLogin />
            </Link>
            <Link to="/signup">
              <TbUser />
            </Link>
          </>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default Navbar;
