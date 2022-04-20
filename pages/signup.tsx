import type { ReactElement } from "react";
import SignLayout from "@layouts/Sign.layout";
import type { SignLayoutProps } from "@globalTypes";
import LargeLogo from "@components/common/LoginSignup/LargeLogo";
import Form from "@components/common/LoginSignup/Form";

const Signup = () => (
   <>
      <LargeLogo variant="signup" />
      <Form variant="signup" />
   </>
);

Signup.getLayout = (page: ReactElement) => {
   const Props: Omit<SignLayoutProps, "children"> = {
      question: "Already have an account",
      suggestion: "Log in",
      to: "/login",
   };
   return <SignLayout {...Props}>{page}</SignLayout>;
};

export default Signup;
