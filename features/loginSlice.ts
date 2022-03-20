import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/react-redux";

const initialState: User = {
   displayName: "",
   firstName: "",
   lastName: "",
   email: "",
   photoURL: "",
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<User>) => {
         state = { ...state, ...action.payload };
      },
   },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
