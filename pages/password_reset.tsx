import type { ReactElement } from "react";
import SignLayout from "@layouts/Sign.layout";
import type { SignLayoutProps } from "@globalTypes";
import LargeLogo from "@components/common/LoginSignup/LargeLogo";
import Form from "@components/common/LoginSignup/Form";

const PasswordReset = () => (
   <>
      <LargeLogo variant="password-rest" />
      <Form variant="password-rest" />
   </>
);

PasswordReset.getLayout = (page: ReactElement) => {
   const Props: Omit<SignLayoutProps, "children"> = {
      question: "Already have an account",
      suggestion: "Log in",
      to: "/login",
   };
   return <SignLayout {...Props}>{page}</SignLayout>;
};

export default PasswordReset;
