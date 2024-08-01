import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateUser } from "../actions/userActions";

interface UserState {
  loading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  loading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError(state) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // pending fulfilled rejected
    builder
      .addCase(fetchCreateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
