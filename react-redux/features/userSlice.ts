import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Firestore, { auth } from "../../lib/firebase";
import { Codes, FieldError, useFormValues } from "../../types";
import type { User, UserReducer } from "../../types/react-redux";
import FormSubmit from "../../utils/FormSubmit";
import { RootState } from "../store";

const formSubmit = new FormSubmit();

export const login = createAsyncThunk(
   "user/login",
   async ({ email, password }: Required<Pick<useFormValues, "email" | "password">>, thunkAPI) => {
      try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         const querySnapshot = await getDoc(doc(Firestore, "users", userCredential.user.uid));
         return { ...querySnapshot.data(), date: new Date().toISOString() } as User;
      } catch (error) {
         const { code } = error as FieldError;
         const errorMessage = formSubmit.firebaseErrors(code as keyof Codes);
         return thunkAPI.rejectWithValue(errorMessage);
      }
   }
);

export const signUp = createAsyncThunk(
   "user/signUp",
   async ({ firstName, lastName, email, password }: Required<useFormValues>, thunkAPI) => {
      try {
         const newUser: User = {
            displayName: firstName + " " + lastName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            date: new Date().toISOString(),
         };

         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         await setDoc(doc(Firestore, "users", userCredential.user.uid), newUser);
         return newUser;
      } catch (error) {
         const { code } = error as FieldError;
         const errorMessage = formSubmit.firebaseErrors(code as keyof Codes);
         return thunkAPI.rejectWithValue(errorMessage);
      }
   }
);

const initialState: UserReducer = {
   value: {
      displayName: "",
      firstName: "",
      lastName: "",
      email: "",
      photoURL: "",
      date: "",
   },
   authenticated: false,
   status: "idle",
   error: null,
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(login.pending, state => {
            state.status = "loading";
            state.error = null;
         })
         .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
            state.authenticated = true;
            state.status = "succeeded";
            Object.assign(state.value, action.payload);
         })
         .addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.error = { variant: "login", message: action.payload as string };
         });
      builder
         .addCase(signUp.pending, state => {
            state.status = "loading";
            state.error = null;
         })
         .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
            state.authenticated = true;
            state.status = "succeeded";
            Object.assign(state.value, action.payload);
         })
         .addCase(signUp.rejected, (state, action) => {
            state.status = "failed";
            state.error = { variant: "signup", message: action.payload as string };
         });
   },
});

export default userSlice.reducer;

export const selectUser: (state: RootState) => UserReducer = state => state.user;

export const authenticatedSelector = createSelector(selectUser, user => user.authenticated);

export const errorSelector = createSelector(selectUser, user => user.error);

export const userSelector = createSelector(selectUser, user => user.value);

export const statusSelector = createSelector(selectUser, user => user.status);
