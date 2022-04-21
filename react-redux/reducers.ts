import { Codes, FieldError, useFormValues } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Firestore, { auth as Auth } from "@firebase";
import FormSubmit from "@utils/FormSubmit";
import { UserType } from "@customTypes/react-redux";

const formSubmit = new FormSubmit();

export const login = createAsyncThunk(
   "user/login",
   async ({ email, password }: Required<Pick<useFormValues, "email" | "password">>, thunkAPI) => {
      try {
         const userCredential = await signInWithEmailAndPassword(Auth, email, password);
         const id = userCredential.user.uid;
         const querySnapshot = await getDoc(doc(Firestore, "users", id));
         return { ...querySnapshot.data(), id, date: new Date().toISOString() };
      } catch (error) {
         const { code } = error as FieldError;
         const message = formSubmit.firebaseErrors(code as keyof Codes);
         return thunkAPI.rejectWithValue({ variant: "login", message });
      }
   }
);

export const sign_up = createAsyncThunk(
   "user/sign_up",
   async ({ firstName, lastName, email, password }: Required<useFormValues>, thunkAPI) => {
      try {
         const newUser: Omit<UserType, "id"> = {
            userName: firstName + lastName,
            displayName: firstName + " " + lastName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            type: null,
            date: new Date().toISOString(),
         };

         const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
         const id = userCredential.user.uid;
         await setDoc(doc(Firestore, "users", id), newUser);
         return { ...newUser, id };
      } catch (error) {
         const { code } = error as FieldError;
         const message = formSubmit.firebaseErrors(code as keyof Codes);
         return thunkAPI.rejectWithValue({ variant: "sign_up", message });
      }
   }
);

export const auth = createAsyncThunk("user/auth", async (user: User | null, thunkAPI) => {
   try {
      if (!user) {
         throw { code: "auth/user-not-found" } as FieldError;
      }
      const id = user.uid;
      const querySnapshot = await getDoc(doc(Firestore, "users", id));
      console.log(querySnapshot.data());
      const value: UserType = {
         id,
         userName: querySnapshot.data()?.userName,
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
      const message = formSubmit.firebaseErrors(code as keyof Codes);
      return thunkAPI.rejectWithValue({ variant: "auth", message });
   }
});

export const password_reset = createAsyncThunk("user/password_reset", async (email: string, thunkAPI) => {
   try {
      // await sendPasswordResetEmail(auth, email);
      console.log("email reseting fired for the email: ", email);
   } catch (error) {
      const { message } = error as FieldError;
      return thunkAPI.rejectWithValue({ variant: "password_rest", message });
   }
});

export const sign_out = createAsyncThunk("user/sign_out", async (_, thunkAPI) => {
   try {
      await signOut(Auth);
   } catch (error) {
      const { message } = error as FieldError;
      return thunkAPI.rejectWithValue({ variant: "sign_out", message });
   }
});

export const update = createAsyncThunk("user/update", async (user: UserType, thunkAPI) => {
   try {
      const newUser = doc(Firestore, "users", user.id);
      await updateDoc(newUser, { ...user });
      return user;
   } catch (error) {
      const { message } = error as FieldError;
      return thunkAPI.rejectWithValue({ variant: "update", message });
   }
});
