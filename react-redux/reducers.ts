import { Codes, FieldError, useFormValues } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Firestore, { auth } from "@firebase";
import FormSubmit from "@utils/FormSubmit";
import { UserType } from "@customTypes/react-redux";

const formSubmit = new FormSubmit();

export const login = createAsyncThunk(
   "user/login",
   async ({ email, password }: Required<Pick<useFormValues, "email" | "password">>, thunkAPI) => {
      try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         const id = userCredential.user.uid;
         const querySnapshot = await getDoc(doc(Firestore, "users", id));
         return { ...querySnapshot.data(), id, date: new Date().toISOString() };
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
         const newUser: Omit<UserType, "id"> = {
            displayName: firstName + " " + lastName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            type: null,
            date: new Date().toISOString(),
         };

         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const id = userCredential.user.uid;
         await setDoc(doc(Firestore, "users", id), newUser);
         return { ...newUser, id };
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
      const id = user.uid;
      const querySnapshot = await getDoc(doc(Firestore, "users", id));
      const value: UserType = {
         id,
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
      const { message } = error as FieldError;
      return thunkAPI.rejectWithValue(message);
   }
});

export const signOutThunk = createAsyncThunk("user/signOut", async (_, thunkAPI) => {
   try {
      await signOut(auth);
   } catch (error) {
      const { message } = error as FieldError;
      return thunkAPI.rejectWithValue(message);
   }
});

export const updateUser = createAsyncThunk("user/update", async (user: UserType, thunkAPI) => {
   try {
      const newUser = doc(Firestore, "users", user.id);
      await updateDoc(newUser, { ...user });
      return user;
   } catch (error) {
      const { message } = error as FieldError;
      return thunkAPI.rejectWithValue(message);
   }
});
