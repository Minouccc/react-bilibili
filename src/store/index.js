import { configureStore } from "@reduxjs/toolkit";
import favorReducer from "./modules/favor";
import homeReducer from "./modules/home";
const store = configureStore({
  reducer: {
    favor: favorReducer,
    home: homeReducer,
  },
});

export default store;
