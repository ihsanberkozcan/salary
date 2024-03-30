import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true
};

const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
        console.log("jjjjj")
      state.loading = action.payload;
    },
  },
});

export const {setLoading} = loading.actions;
export default loading.reducer;
