import type { Variant } from ".";

export interface User {
   displayName: string;
   firstName: string;
   lastName: string;
   email: string;
   photoURL: string;
   date: string;
}

interface Error {
   variant: Variant | "auth";
   message: string;
}

export interface UserReducer {
   value: User;
   authenticated: boolean;
   status: "idle" | "loading" | "succeeded" | "failed";
   error: Error | null;
}
