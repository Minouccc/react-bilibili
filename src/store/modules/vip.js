import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBannersListRequest, getGoodsListRequest } from "../../api/request";
import { unique } from "../../utils";
export const fetchVipDataAction = createAsyncThunk(
  "fetchdata",
  (payload, { dispatch }) => {
    getBannersListRequest().then((res) => {
      dispatch(changeBannersList(res));
    });
    getGoodsListRequest().then((res) => {
      dispatch(changeGoodsList(res));
      dispatch(changeLoading(false));
    });
  }
);
const vipSlice = createSlice({
  name: "vip",
  initialState: {
    bannersList: [],
    cartGoodsList: [],
    collectGoodsList: [],
    goodsList: [],
    goodList: [],
    enterLoading: true,
  },
  reducers: {
    changeBannersList(state, { payload }) {
      state.bannersList = payload;
    },
    changeGoodsList(state, { payload }) {
      state.goodsList = payload;
    },
    addCollectGoods(state, { payload }) {
      let addGoodsList = state.collectGoodsList;
      state.goodsList.map((item) => {
        if (item.id === payload) {
          item.like = true;
          item.collection += 1;
          addGoodsList.unshift(item);
        }
      });
      state.collectGoodsList = unique(addGoodsList);
    },
    deleteCollectGoods(state, { payload }) {
      let deleteGoodsList = state.collectGoodsList.filter(
        (item) => item.id !== payload
      );
      state.collectGoodsList = deleteGoodsList;
    },

    changeLoading(state, { payload }) {
      state.enterLoading = payload;
    },
    getGoodDetail(state, { payload }) {
      let goodDetail = state.goodsList.filter((item) => item.id == payload)[0];
      state.goodList = goodDetail;
    },
    addCartGoods(state, { payload }) {
      let cartList = state.cartGoodsList;
      state.goodsList.map((item) => {
        if (item.id == payload) {
          cartList.unshift(item);
        }
      });
      state.cartGoodsList = cartList;
    },
  },
  deleteCartGoods(state, { payload }) {
    let deleteGoodsList = state.collectGoodsList.filter(
      (item) => item.id !== payload
    );
    state.collectGoodsList = deleteGoodsList;
  },
});
export const {
  changeBannersList,
  addCartGoods,
  deleteCartGoods,
  changeLoading,
  changeGoodsList,
  getGoodDetail,
  addCollectGoods,
  deleteCollectGoods,
} = vipSlice.actions;
export default vipSlice.reducer;
