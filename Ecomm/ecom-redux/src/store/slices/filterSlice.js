import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  priceRange: [0, 200000],
  rating: 0,
  sortBy: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const {
  setCategory,
  setPriceRange,
  setRating,
  setSortBy,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
