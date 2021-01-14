import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id?: string;
  name?: string;
};

const initialState = {} as UserState;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<string>) {
      state.id = action.payload;
      state.name = action.payload;
    },
    removeUser(state) {
      delete state.id;
      delete state.name;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
