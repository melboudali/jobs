import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/react-redux";

interface userState {
   value: User;
}

const initialState: userState = {
   value: {
      displayName: "",
      firstName: "",
      lastName: "",
      email: "",
      photoURL: "",
   },
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<User>) => {
         state.value = { ...state.value, ...action.payload };
      },
   },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
