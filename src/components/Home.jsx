import React, { useContext, useState } from "react";
import { ProductsContext } from "../provider/ProductsProvider";
import GoTopButton from "../common/GoTopButton";

import loading from "../utils/loading.gif";
import CartDetail from "./CartDetail";
import Cart from "./Cart";


import Pagination from "react-js-pagination";

import "../common/Home.css"
import { getPagin } from "../data/getData";
import {
  TbArrowBigLeft,
  TbArrowBigRight,
  TbArrowBigRightLines,
  TbArrowBigLeftLines,
  TbArrowNarrowRight,
} from "react-icons/tb";

const Home = ({ selectItemHandler, showCart, setShowCart, selectedId }) => {
  const [state, dispatch] = useContext(ProductsContext);
  const [activePage, setActivePage] = useState(1);
  const [showShop, setShowShop] = useState(false);

  const handlePageChange = async (pageNumber) => {
    const test = await getPagin(pageNumber);
    setActivePage(pageNumber);
    state.productsData = test;
    window.history.pushState({}, null, `/page-${pageNumber}`);
    return;
  };

  // const closeAll =()=>{
  //   state.favOpen = false;
  //   // dispatch({ type: "TOGGLE_FAV" })
  // }

  // onClick={closeAll}

  if (!state.productsData)
    return (
      <div className="loading">
        <img src={loading} alt="loading" />
      </div>
    );

  return (
    <>
      {/* <section className={`welcome welcome1 ${showShop ? "showShopAnim1" : ""}`}></section>
      <section className={`welcome welcome2 ${showShop ? "showShopAnim2" : ""}`}></section>
      <section className={`welcome welcome3 ${showShop ? "showShopAnim3" : ""}`}>
        <h1>welcome to shop✨ </h1>
        <TbArrowNarrowRight  onClick={()=>setShowShop(!showShop)} />
      </section> */}


      {showCart && (
        <CartDetail
          itemId={selectedId}
          setShowCart={setShowCart}
          showCart={showCart}
        />
      )}

      <div className="main">
        {state.categorySort.length > 0 ? (
          <>
            {state.categorySort.map((item) => (
              <Cart
                item={item}
                key={item.id}
                detail={() => selectItemHandler(item.id)}
              />
            ))}
          </>
        ) : (
          <>
            {state.productsData.map((item) => (
              <Cart
                item={item}
                key={item.id}
                detail={() => selectItemHandler(item.id)}
              />
            ))}
          </>
        )}
      </div>

      <GoTopButton />

      <Pagination
        activePage={activePage}
        totalItemsCount={200}
        onChange={handlePageChange}
        itemsCountPerPage={20}
        pageRangeDisplayed={5}
        firstPageText={<TbArrowBigLeftLines />}
        lastPageText={<TbArrowBigRightLines />}
        prevPageText={<TbArrowBigLeft />}
        nextPageText={<TbArrowBigRight />}
      />
    </>
  );
};

export default Home;
