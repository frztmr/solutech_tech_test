import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  activeCategory: string;
  searchQuery: string;
  sortBy: "default" | "name-asc" | "name-desc";
  showFiltersPanel: boolean;
  visibleCount: number;
}

const initialState: ProductState = {
  activeCategory: "Semua Produk",
  searchQuery: "",
  sortBy: "default",
  showFiltersPanel: false,
  visibleCount: 6,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      state.visibleCount = 6; // Reset visible count on category change
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.visibleCount = 6; // Reset visible count on search query change
    },
    setSortBy: (state, action: PayloadAction<"default" | "name-asc" | "name-desc">) => {
      state.sortBy = action.payload;
    },
    setShowFiltersPanel: (state, action: PayloadAction<boolean>) => {
      state.showFiltersPanel = action.payload;
    },
    setVisibleCount: (state, action: PayloadAction<number>) => {
      state.visibleCount = action.payload;
    },
    incrementVisibleCount: (state, action: PayloadAction<number>) => {
      state.visibleCount += action.payload;
    },
    resetFilters: (state) => {
      state.activeCategory = "Semua Produk";
      state.searchQuery = "";
      state.sortBy = "default";
      state.visibleCount = 6;
    },
  },
});

export const {
  setActiveCategory,
  setSearchQuery,
  setSortBy,
  setShowFiltersPanel,
  setVisibleCount,
  incrementVisibleCount,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
