import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = settings.actions;
export default settings.reducer;
