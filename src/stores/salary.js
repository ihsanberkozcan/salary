import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salaries2023: [],
  salaries2024: [],
  salaries2025: [],
  average2023: 0,
};

const salaries = createSlice({
  name: "salary",
  initialState,
  reducers: {
    filteredSalary2023: (state, action) => {
      state.salaries2023 = action.payload;
    },
    filteredSalary2024: (state, action) => {
      state.salaries2024 = action.payload;
    },
    filteredSalary2025: (state, action) => {
      state.salaries2025 = action.payload;
    },
    setAverage2023:(state,action) =>{
      state.average2023 = action.payload
    },
    setAverage2024:(state,action) =>{
      state.average2024 = action.payload
    }

  },
});

export const { filteredSalary2023,filteredSalary2025,filteredSalary2024, setAverage2023,setAverage2024} = salaries.actions;
export default salaries.reducer;
