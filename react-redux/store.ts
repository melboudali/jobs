import { type TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

const store = configureStore({
   reducer: { user: userReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default store;
