import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGoodsListRequest } from "../../api/request";
import { unique } from "../../utils";

export const fetchFavorDataAction = createAsyncThunk(
  "fetchdata",
  (payload, { dispatch }) => {
    getGoodsListRequest().then((res) => {
      dispatch(changeGoodsListAction(res));
    });
  }
);
const favorSlice = createSlice({
  name: "favor",
  initialState: {
    goodsList: [],
  },
  reducers: {
    changeGoodsListAction(state, { payload }) {
      state.goodsList = payload;
    },
    addCollect(state, { payload }) {
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
  },
});

export const { changeGoodsListAction, addCollect } = favorSlice.actions;
export default favorSlice.reducer;
