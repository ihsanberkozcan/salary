
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    salaries: []
}

const salaries = createSlice({

    name: 'salary',
    initialState,
    reducers:{
        filteredSalary: (state,action) => {
            state.salaries = action.payload
        }
    }
})

export const {filteredSalary} = salaries.actions;
export default salaries.reducer;