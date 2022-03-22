import { object, number, string, ObjectSchema } from "yup";
import { AssertsShape, ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import type { RequiredStringSchema } from "yup/lib/string";
import type { AnyObject } from "yup/lib/types";
import { User } from "./react-redux";

export interface testimonial {
   id: number;
   image: string;
   name: string;
   job: string;
   message: string;
}

export type testimonials = testimonial[];

export interface Post {
   id: string;
   title: string;
   cover: string;
   seo_description: string;
   summary: string;
   contentHtml: string;
   date: string;
}

export type Posts = Post[];

// Hooks
export interface useFormValues {
   firstName?: string;
   lastName?: string;
   email: string;
   password?: string;
}

// Yup
export type FieldError = {
   code?: string;
   field?: Fields;
   message: string;
};

export type UserValidationRes = AssertsShape<{
   lastName?: RequiredStringSchema<string | undefined, AnyObject>;
   firstName?: RequiredStringSchema<string | undefined, AnyObject>;
   password?: RequiredStringSchema<string | undefined, AnyObject>;
   email: RequiredStringSchema<string | undefined, AnyObject>;
   recaptcha: RequiredStringSchema<string | undefined, AnyObject>;
}>;

export interface YupError {
   message: FieldError | string;
}

// Form, login, signup ans password-reset
export type Fields = "firstName" | "lastName" | "email" | "password" | "recaptcha";
export type Variant = "login" | "signup" | "password-rest";

export interface Response {
   ok: boolean;
   error: FieldError | null;
}

export interface ValidateFuncResponse extends Response {
   user: UserValidationRes | null;
}

export interface SignUpAndLoginResponse extends Omit<Response, "ok"> {
   nUser: User | null;
}
