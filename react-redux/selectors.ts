import { createSelector } from "@reduxjs/toolkit";
import { UserReducer } from "@customTypes/react-redux";
import { RootState } from "./store";

// User selectors
export const selectUser: (state: RootState) => UserReducer = state => state.user;

export const isAuthenticatedSelector = createSelector(selectUser, user => user.isAuthenticated);

export const errorSelector = createSelector(selectUser, user => user.error);

export const userSelector = createSelector(selectUser, user => user.value);

export const statusSelector = createSelector(selectUser, user => user.status);

export const isLoadingSelector = createSelector(selectUser, user => user.status === "loading");

export const errorVariantSelector = createSelector(selectUser, user => user.error?.variant);

export const isFetchingSelector = createSelector(selectUser, user => user.isFetching);

export const typeSelector = createSelector(selectUser, user => user.value.type);
