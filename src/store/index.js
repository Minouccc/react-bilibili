import { configureStore } from "@reduxjs/toolkit";
import favorReducer from "./modules/favor";
const store = configureStore({
  reducer: {
    favor: favorReducer,
  },
});

export default store;
