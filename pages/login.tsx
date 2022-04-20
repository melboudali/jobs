import type { ReactElement } from "react";
import { SignLayoutProps } from "@globalTypes";
import SignLayout from "@layouts/Sign.layout";
import LargeLogo from "@components/common/LoginSignup/LargeLogo";
import Form from "@components/common/LoginSignup/Form";

const Login = () => (
   <>
      <LargeLogo />
      <Form />
   </>
);

Login.getLayout = (page: ReactElement) => {
   const Props: Omit<SignLayoutProps, "children"> = {
      question: "New to jobs",
      suggestion: "Create an account",
      to: "/signup",
   };
   return <SignLayout {...Props}>{page}</SignLayout>;
};

export default Login;
