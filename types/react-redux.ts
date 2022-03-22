import { FieldError } from ".";

export interface User {
   displayName: string;
   firstName: string;
   lastName: string;
   email: string;
   photoURL: string;
   date?: string;
}

export interface UserReducer {
   value: User;
   loading: boolean;
   error: FieldError | null;
}
