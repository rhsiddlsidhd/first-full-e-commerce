import { createSlice } from "@reduxjs/toolkit";
import { fetchLoginWithUserIdAndEmail } from "../actions/authAction";

interface authState {
  loading: boolean;
  error: string;
  accessToken: string;
}

const initialState: authState = {
  loading: false,
  error: "",
  accessToken: "",
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
      })
      .addCase(fetchLoginWithUserIdAndEmail.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "";
        }
      });
  },
});

export const {} = authSilce.actions;
export default authSilce.reducer;
