import { AsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { UserReducer } from "@customTypes/react-redux";
import { login, auth, password_reset, sign_out, sign_up, update } from "@redux/reducers";
import { Variant } from "@customTypes/index";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

const initialState: UserReducer = {
   value: {
      id: "",
      userName: "",
      displayName: "",
      firstName: "",
      lastName: "",
      email: "",
      photoURL: "",
      type: null,
      date: "",
   },
   isAuthenticated: false,
   isFetching: true,
   status: "idle",
   error: null,
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(sign_out.fulfilled, () => ({ ...initialState, isFetching: false, status: "succeeded" }))
         .addCase(auth.rejected, (state, action) => {
            const { variant, message } = action.payload as { variant: Variant; message: string };
            state.isFetching = false;
            state.status = "failed";
            state.error = { variant, message };
         })
         .addMatcher(isAnyOf(login.pending, sign_up.pending, sign_out.pending, update.pending), state => {
            state.status = "loading";
            state.error = null;
         })
         .addMatcher(isAnyOf(login.fulfilled, sign_up.fulfilled, auth.fulfilled, update.fulfilled), (state, action) => {
            state.isFetching = false;
            state.isAuthenticated = true;
            state.status = "succeeded";
            Object.assign(state.value, action.payload);
         })
         .addMatcher(isAnyOf(login.rejected, sign_up.rejected, password_reset.rejected, update.rejected), (state, action) => {
            const { variant, message } = action.payload as { variant: Variant; message: string };
            state.status = "failed";
            state.error = { variant, message };
         });
   },
});

export default userSlice.reducer;
