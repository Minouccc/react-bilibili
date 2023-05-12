import { px2rem } from "@/assets/global-style";
import { styled } from "styled-components";

export const CartGoodWrapper = styled.div`
  .cart-good-wrapper {
    width: 90%;
    height: 4rem;
    background: gray;
    margin: 0 auto;
    margin-top: ${px2rem(60)};
    .cart-good-img {
      float: left;
      width: 4rem;
      img {
        width: 100%;
      }
    }
  }
`;
