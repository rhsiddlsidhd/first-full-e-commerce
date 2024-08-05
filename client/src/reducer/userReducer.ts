import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateUser, userActions } from "../actions/userActions";
import { userData } from "../layout/AppLayout";

interface UserState {
  loading: boolean;
  error: string | undefined;
  user: userData | null;
}

const initialState: UserState = {
  loading: false,
  error: undefined,
  user: null,
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
      .addCase(fetchCreateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userActions.fetchGetUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(userActions.fetchGetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userActions.fetchGetUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
