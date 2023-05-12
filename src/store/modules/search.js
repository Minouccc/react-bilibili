import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSuggestListRequest } from "../../api/request";

export const fetchSearchAction = createAsyncThunk(
  "fetchdata",
  (query, { dispatch }) => {
    getSuggestListRequest().then((data) => {
      let res = data.filter((item) => item.title.indexOf(query) != -1);
      dispatch(changeSuggestList(res));
      dispatch(changeEnterLoading(false));
    });
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    suggestList: [],
    enterLoading: false,
  },
  reducers: {
    changeSuggestList(state, { payload }) {
      state.suggestList = payload;
    },
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload;
    },
  },
});
export const { changeSuggestList, changeEnterLoading } = searchSlice.actions;
export default searchSlice.reducer;
