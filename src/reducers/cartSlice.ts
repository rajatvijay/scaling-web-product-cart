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
      if (currentQuantity > quantity) {
        state[id] = currentQuantity - quantity;
      } else {
        delete state[id];
      }
    },
    flushCart(state) {
      Object.keys(state).forEach((id) => {
        delete state[id];
      });
    },
  },
});

export const { addItem, deleteItem, flushCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
