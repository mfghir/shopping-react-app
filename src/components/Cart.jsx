import React, { useContext } from "react";
import { TbHeart, TbCurrencyDollar, TbEye, TbCheck } from "react-icons/tb";
import { ProductsContext } from "../provider/ProductsProvider";

import { toast } from "react-toastify";
import "../common/Cart.css";
import { FiShoppingBag, FiPlus } from "react-icons/fi";

const Cart = ({ item, onClick, detail }) => {
  const [state, dispatch] = useContext(ProductsContext);

  const addToFav = () => {
    dispatch({ type: "ADD_TO_FAV", payload: item });
    toast(`*${item.title}* has added to ❤`);
    // console.log(JSON.stringify(item))
  };

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success(`*${item.title}* has added!`, {
      theme: "colored",
    });
  };

  function checkHandler(item) {
    return state.cart.find((c) => c.id === item.id);
  }

  return (
    <div className="cart-container" onClick={onClick}>
      <div className="cart-emoji">
        <span onClick={() => addToFav()}>
          <TbHeart />
        </span>
        <span onClick={detail}>
          <TbEye />
        </span>
      </div>

      <img src={item.images[0]} alt={item.title} />
      <h3>{item.title}</h3>

      <div className="btns">
        <strong>
          <TbCurrencyDollar />
          {item.price === null ? "0" : item.price.toLocaleString()}
        </strong>

        <button onClick={() => addToCart()}>
          {checkHandler(item) ? (
            <span className="btn-one">
              <TbCheck />
            </span>
          ) : (
            <span className="btn-two">
              <FiPlus /> <FiShoppingBag />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
