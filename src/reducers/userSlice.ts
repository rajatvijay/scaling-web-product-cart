import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../common/api";
import { AppThunk } from "../common/store";

type UserState = {
  user?: string;
  state: "idle" | "loading" | "success" | "error";
  error: string | null;
};

const initialState = {
  state: "idle",
  error: null,
} as UserState;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginLoading(state) {
      state.state = "loading";
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.state = "success";
      state.user = action.payload;
    },
    loginError(state, action: PayloadAction<string>) {
      state.state = "error";
      state.error = action.payload;
    },
    logout(state) {
      state.error = null;
      state.state = "idle";
      delete state.user;
    },
  },
});

export const {
  loginLoading,
  loginSuccess,
  loginError,
  logout,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const loginThunk = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  dispatch(loginLoading());
  try {
    const { status, user } = await login(email, password);
    if (!status || !user) {
      dispatch(loginError("User not found!"));
    } else {
      dispatch(loginSuccess(user));
    }
  } catch (e) {
    dispatch(loginError(e.message));
  }
};
