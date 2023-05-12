import React from "react";
import "./style.js";
import { CartGoodWrapper } from "./style.js";

const CartGoods = ({ data }) => {
  return (
    <CartGoodWrapper>
      <div className="cart-good-wrapper">
        <div className="cart-good-img">
          <img src={data.img} alt="" />
        </div>
      </div>
    </CartGoodWrapper>
  );
};

export default CartGoods;
