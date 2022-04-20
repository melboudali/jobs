import { AsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { UserReducer } from "@customTypes/react-redux";
import { login, myAuth, passwordReset, signOutThunk, signUp } from "@redux/reducers";
import { updateUser } from "./userSlice with selectors and reducers";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

const initialState: UserReducer = {
   value: {
      id: "",
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
         .addCase(myAuth.rejected, (state, action) => {
            state.isFetching = false;
            state.status = "failed";
            state.error = { variant: "auth", message: action.payload as string };
         })
         .addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.error = { variant: "login", message: action.payload as string };
         })
         .addCase(signUp.rejected, (state, action) => {
            state.status = "failed";
            state.error = { variant: "signup", message: action.payload as string };
         })
         .addCase(passwordReset.rejected, (state, action) => {
            state.status = "failed";
            state.error = { variant: "password-rest", message: action.payload as string };
         })
         .addCase(signOutThunk.fulfilled, () => ({ ...initialState, isFetching: false, status: "succeeded" }))
         .addMatcher(isAnyOf(login.pending, signUp.pending, signOutThunk.pending, updateUser.pending), state => {
            state.status = "loading";
            state.error = null;
         })
         .addMatcher(isAnyOf(login.fulfilled, signUp.fulfilled, myAuth.fulfilled, updateUser.fulfilled), (state, action) => {
            state.isFetching = false;
            state.isAuthenticated = true;
            state.status = "succeeded";
            Object.assign(state.value, action.payload);
         });
   },
});

export default userSlice.reducer;
