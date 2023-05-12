import { configureStore } from "@reduxjs/toolkit";
import favorReducer from "./modules/favor";
import homeReducer from "./modules/home";
import searchReducer from "./modules/search";
const store = configureStore({
  reducer: {
    favor: favorReducer,
    home: homeReducer,
    search: searchReducer,
  },
});

export default store;
