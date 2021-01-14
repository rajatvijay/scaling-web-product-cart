import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../common/api";
import { Product } from "../common/data";
import { AppThunk } from "../common/store";

type ProductsState = {
  products: Product[];
  state: "idle" | "error" | "success" | "loading";
  error: string | null;
};

const initialState = {
  products: [],
  state: "idle",
  error: null,
} as ProductsState;

// Creating Slice instead of actual reducer
// Since this will take care of a lot of boiler plate
// And provides good support for TS
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsLoading(state) {
      state.state = "loading";
    },
    getProductsSuccess(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      state.state = "success";
      state.products = products;
    },
    getProductsError(state, action: PayloadAction<string>) {
      const error = action.payload;
      state.error = error;
      state.state = "error";
    },
  },
});

export const {
  getProductsLoading,
  getProductsSuccess,
  getProductsError,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

export const fetchProducts = (): AppThunk => async (dispatch) => {
  dispatch(getProductsLoading());
  try {
    const products = await getProducts();
    dispatch(getProductsSuccess(products));
  } catch (e) {
    dispatch(getProductsError(e.message));
  }
};
