import { configureStore } from "@reduxjs/toolkit";

import salary from "./salary";
import settings from "./settings";

const store = configureStore({
    reducer:{
        salary,
        settings
    }
})

export default store;