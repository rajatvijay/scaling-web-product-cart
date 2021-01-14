import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Cart = Record<string, number>;

const initialState = {} as Cart;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      state[id] = (state[id] || 0) + quantity;
    },
    deleteItem(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      const currentQuantity = state[id] || 0;
      state[id] = currentQuantity > quantity ? currentQuantity - quantity : 0;
    },
  },
});

export const { addItem, deleteItem } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
