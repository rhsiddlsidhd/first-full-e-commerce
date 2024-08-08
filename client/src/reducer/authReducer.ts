import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLoginWithUserIdAndEmail,
  fetchNewAccessToken,
} from "../actions/authAction";

interface authState {
  loading: boolean;
  error: string | undefined;
  isRefresh: boolean;
  exp: number;
}

const initialState: authState = {
  loading: false,
  error: "",
  isRefresh: false,
  exp: 0,
};

const authSilce = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginWithUserIdAndEmail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchLoginWithUserIdAndEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.exp = action.payload.exp;
      })
      .addCase(fetchLoginWithUserIdAndEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(fetchNewAccessToken.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchNewAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.exp = action.payload.exp;
      })
      .addCase(fetchNewAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      });
  },
});

export const {} = authSilce.actions;
export default authSilce.reducer;
