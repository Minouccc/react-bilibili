import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideosListRequest } from "./../../api/request";
import { unique } from "../../utils";

export const fetchHomeDataAction = createAsyncThunk(
  "fetchdata",
  (payload, { dispatch }) => {
    getVideosListRequest().then((res) => {
      dispatch(changeVideosList(res));
      dispatch(changeEnterLoading(false));
    });
  }
);
const homeSlice = createSlice({
  name: "home",
  initialState: {
    videosList: [],
    enterLoading: true,
    waitVideosList: [],
  },
  reducers: {
    changeVideosList(state, { payload }) {
      state.videosList = payload;
    },
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload;
    },
    addWaitVideos(state, { payload }) {
      let addVideosList = state.waitVideosList;
      state.videosList.map((item) => {
        if (item.id === payload) {
          addVideosList.unshift(item);
        }
      });
      state.waitVideosList = unique(addVideosList);
    },
  },
});
export const { changeVideosList, changeEnterLoading, addWaitVideos } =
  homeSlice.actions;
export default homeSlice.reducer;
