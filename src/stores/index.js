import { configureStore } from "@reduxjs/toolkit";

import salary from "./salary";
import settings from "./settings";
import loading from "./loading";

const store = configureStore({
  reducer: {
    salary,
    settings,
    loading,
  },
});

export default store;
