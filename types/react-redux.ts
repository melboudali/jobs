import type { Variant } from ".";

export interface UserType {
   id: string;
   displayName: string;
   firstName: string;
   lastName: string;
   email: string;
   photoURL: string;
   type: "seeker" | "poster" | null;
   date: string;
}

interface Error {
   variant: Variant | "auth" | "update";
   message: string;
}

// export interface UserReducer {
//    value: User;
//    authenticated: boolean;
//    status: "idle" | "loading" | "succeeded" | "failed";
//    error: Error | null;
// }

export interface UserReducer {
   value: UserType;
   isAuthenticated: boolean;
   isFetching: boolean;
   status: "idle" | "loading" | "succeeded" | "failed";
   error: Error | null;
}
