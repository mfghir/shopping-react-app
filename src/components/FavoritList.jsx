import React, { useContext } from "react";
import { ProductsContext } from "../provider/ProductsProvider";
import emptyFav from "../utils/empty-fav.png";

import { TbX, TbTrash } from "react-icons/tb";
import "../common/FavoritList.css";

const FavoritList = () => {
  const [state, dispatch] = useContext(ProductsContext);

  return (
    <section
      className={`favoritList-container ${
        state.favOpen ? "scale-up-center" : "scale-down-center"
      }`}
    >
      <span
        className="close-btn"
        onClick={() => dispatch({ type: "TOGGLE_FAV" })}
      >
        <TbX />
      </span>

      {!state.fav.length > 0 ? (
        <div className="empty-basket">
          <img src={emptyFav} alt="empty-basket" />
          <h3>Your favorit list is empty!</h3>
        </div>
      ) : (
        <div className="fav-items">
          {state.fav.map((item) => (
            <div className="fav-item" key={item.id}>
              <img src={item.images[0]} alt={item.title} />
              <p>{item.title}</p>
              <button
                onClick={() => dispatch({ type: "REMOVE_FAV", payload: item })}
              >
                <TbTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritList;
