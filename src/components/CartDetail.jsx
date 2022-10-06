import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../provider/ProductsProvider";
import { TbBasket } from "react-icons/tb";

import { toast } from "react-toastify";
import { getDetail } from "../data/getData";
import "../common/CartDetail.css"

const CartDetail = ({ itemId, setShowCart, showCart }) => {
  const [item, setItem] = useState([]);
  const [state, dispatch] = useContext(ProductsContext);

  // useEffect(() => {
  //   const getData = async () => {
  //     if (itemId) {
  //       try {
  //         const response = await fetch(
  //           `https://api.escuelajs.co/api/v1/products/${itemId}`
  //         );
  //         const result = await response.json();
  //         return setItem(result);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   getData();
  // }, [itemId]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getDetail(itemId);
      return setItem(res);
    };
    fetchApi();
  }, [itemId]);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success(`*${item.title}* has added!`, {
      theme: "colored",
    });
  };

  let itemDetail;
  if (!item) return <p>loading...</p>;

  if (item) {
    itemDetail = (
      <div
        className={`cartDetail-container ${showCart ? "scale-up-center" :"scale-down-center"}`}
        onClick={() => setShowCart(false)}
      >
        <div className="cartDetail-main">
          {item.images && <img src={item.images[0]} alt={item.title} />}

          <div className="cartDetail-tp">
            <span>{item?.category?.name}</span>
            <h2>{item.title}</h2>
            <h3>$ {item.price}</h3>
            <p>{item.description}</p>

            <button onClick={() => addToCart()}>
              <TbBasket /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return itemDetail;
};

export default CartDetail;
