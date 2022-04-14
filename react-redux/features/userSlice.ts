import { AsyncThunk, createAsyncThunk, createSelector, createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User, sendPasswordResetEmail, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Firestore, { auth } from "@firebase";
import { RootState } from "@redux/store";
import { Codes, FieldError, useFormValues } from "@globalTypes";
import type { User as UserType, UserReducer } from "@customTypes/react-redux";
import FormSubmit from "@utils/FormSubmit";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

const formSubmit = new FormSubmit();

export const login = createAsyncThunk(
   "user/login",
   async ({ email, password }: Required<Pick<useFormValues, "email" | "password">>, thunkAPI) => {
      try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         const querySnapshot = await getDoc(doc(Firestore, "users", userCredential.user.uid));
         return { ...querySnapshot.data(), date: new Date().toISOString() };
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
         const newUser: UserType = {
            displayName: firstName + " " + lastName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            type: null,
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

export const myAuth = createAsyncThunk("user/myAuth", async (user: User | null, thunkAPI) => {
   try {
      if (!user) {
         throw { code: "auth/user-not-found" } as FieldError;
      }

      const querySnapshot = await getDoc(doc(Firestore, "users", user.uid));
      const value: UserType = {
         displayName: querySnapshot.data()?.displayName,
         firstName: querySnapshot.data()?.firstName,
         lastName: querySnapshot.data()?.lastName,
         email: querySnapshot.data()?.email,
         photoURL: user.photoURL ?? querySnapshot.data()?.photoURL,
         type: querySnapshot.data()?.type,
         date: new Date().toISOString(),
      };
      return value;
   } catch (error) {
      const { code } = error as FieldError;
      const errorMessage = formSubmit.firebaseErrors(code as keyof Codes);
      return thunkAPI.rejectWithValue(errorMessage);
   }
});

export const passwordReset = createAsyncThunk("user/psswordReset", async (email: string, thunkAPI) => {
   try {
      // await sendPasswordResetEmail(auth, email);
      console.log("email reseting fired for the email: ", email);
   } catch (error) {
      const { code, message } = error as FieldError;
      console.log(code, message);
      return thunkAPI.rejectWithValue(message);
   }
});

export const signOutThunk = createAsyncThunk("user/signOut", async (_, thunkAPI) => {
   try {
      await signOut(auth);
   } catch (error) {
      const { code, message } = error as FieldError;
      console.log(code, message);
      return thunkAPI.rejectWithValue(message);
   }
});

const initialState: UserReducer = {
   value: {
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
         .addMatcher(isAnyOf(login.pending, signUp.pending, signOutThunk.pending), state => {
            state.status = "loading";
            state.error = null;
         })
         .addMatcher(isAnyOf(login.fulfilled, signUp.fulfilled, myAuth.fulfilled), (state, action) => {
            state.isFetching = false;
            state.isAuthenticated = true;
            state.status = "succeeded";
            Object.assign(state.value, action.payload);
         });
   },
});

export default userSlice.reducer;

export const selectUser: (state: RootState) => UserReducer = state => state.user;

export const isAuthenticatedSelector = createSelector(selectUser, user => user.isAuthenticated);

export const errorSelector = createSelector(selectUser, user => user.error);

export const userSelector = createSelector(selectUser, user => user.value);

export const statusSelector = createSelector(selectUser, user => user.status);

export const isLoadingSelector = createSelector(selectUser, user => user.status === "loading");

export const errorVariantSelector = createSelector(selectUser, user => user.error?.variant);

export const isFetchingSelector = createSelector(selectUser, user => user.isFetching);

export const typeSelector = createSelector(selectUser, user => user.value.type);
