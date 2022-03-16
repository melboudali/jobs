import { object, number, string, ObjectSchema } from "yup";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import type { RequiredStringSchema } from "yup/lib/string";
import type { AnyObject } from "yup/lib/types";

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
export interface YupError {
   message: { field: string; message: string } | string;
}

// Form, login, signup ans password-reset
export type Variant = "login" | "signup" | "password-rest";
