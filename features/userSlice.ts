import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserReducer } from "../types/react-redux";

const initialState: UserReducer = {
   value: {
      displayName: "",
      firstName: "",
      lastName: "",
      email: "",
      photoURL: "",
      date: "",
   },
   loading: false,
   error: null,
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      // setUser: (state, action: PayloadAction<User>) => {
      //    state.loading = true;
      //    state.value = action.payload;
      //    state.loading = false;
      // },
      // OR we can use the reducer and prepare to modifie the action lika a middleware
      setUser: {
         reducer(state, action: PayloadAction<User>) {
            state.value = action.payload; //the payload from prepare function
         },
         prepare({ displayName, firstName, lastName, email, photoURL }: User) {
            return {
               payload: {
                  displayName: displayName + "KEKW",
                  firstName,
                  lastName,
                  email,
                  photoURL,
                  date: new Date().toISOString(),
               },
            };
         },
         resetUser: () => initialState,
      },
   },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
