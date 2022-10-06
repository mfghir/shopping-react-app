import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbPlus, TbMinus, TbTrash, TbX } from "react-icons/tb";

import { ProductsContext } from "../provider/ProductsProvider";
import emptyBasket from "../utils/empty-cart.svg";
import "../common/CartList.css";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const CartList = ({ setSort, setPriceSort }) => {
  const [state, dispatch] = useContext(ProductsContext);
  const auth = useAuth();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (auth) {
      dispatch({ type: "CHECKOUT" });
      state.favOpen = false;
      setSort("");
      setPriceSort("");
      navigate("/checkout");
    } else {
      toast.error(`please login/signup first`, {
        theme: "colored",
      });
    }
  };

  const clearHandler = () => {
    dispatch({ type: "CLEAR" });
    setSort("");
    if (state.cart.length === 0) {
      return state.productsData;
    }
  };

  return (
    <section className={`cartList-container  ${state.cartOpen ? "scale-up-center" : "scale-down-center"}`}>
      <span
        className="close-btn"
        onClick={() => dispatch({ type: "TOGGLE_CART" })}
      >
        <TbX />
      </span>

      {!state.cart.length > 0 ? (
        <div className="empty-basket">
          <img src={emptyBasket} alt="empty-basket" />
          <h3>Your basket is empty!</h3>
          <button onClick={() => dispatch({ type: "TOGGLE_CART" })}>
            go to shop!
          </button>
        </div>
      ) : (
        <>
          <section className="cartList-items">
            {state.cart.map((item) => (
              <div className="cartList-item" key={item.id}>
                <img src={item.images[0]} alt={item.title} />
                <p>{item.title}</p>

                <div className="btns">
                  <button
                    onClick={() =>
                      dispatch({ type: "INCREASE", payload: item })
                    }
                  >
                    <TbPlus />
                  </button>

                  <span>{item.quantity}</span>

                  {item.quantity > 1 ? (
                    <button
                      onClick={() =>
                        dispatch({ type: "DECREASE", payload: item })
                      }
                    >
                      <TbMinus />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item })
                      }
                    >
                      <TbTrash />
                    </button>
                  )}
                </div>

                <span>$ {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </section>

          <section className="cartList-total">
            {state.cart.length > 0 && (
              <>
                <p>
                  <strong>Total: </strong>
                  <span>{state.total.toLocaleString()} $</span>
                </p>

                {/* <Link to="/checkout"  > */}
                {/* <Link to={auth ?"/checkout" : <p>wrong</p>  }  > */}
                <button onClick={() => checkoutHandler()}>checkout</button>
                {/* </Link> */}

                <button onClick={() => clearHandler()} className="btn-clear">
                  clear
                </button>
              </>
            )}
          </section>
        </>
      )}
    </section>
  );
};

export default CartList;
