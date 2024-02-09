import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "user_name",
  initialState: {
    value: "",
  },
  reducers: {
    nameset: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { nameset } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    user_name: counterSlice.reducer,
  },
});
