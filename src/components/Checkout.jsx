import React from "react";
import { Link } from "react-router-dom";
import { TbBuildingStore, TbArrowNarrowRight } from "react-icons/tb";

import "../common/Checkout.css";

const Checkout = () => {
  return (
    <div className="checkout-container">
      <h3>Checked out successfully! 😄</h3>
      <h3>Do you want buy more? 🤔</h3>

      <Link to="/">
        back to shop <TbArrowNarrowRight /> <TbBuildingStore />
      </Link>
    </div>
  );
};

export default Checkout;
