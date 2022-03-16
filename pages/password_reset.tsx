import type { MyNextPage } from "next";
import type { ReactElement } from "react";
import Form from "../components/common/LoginSignup/Form";
import LargeLogo from "../components/common/LoginSignup/LargeLogo";
import SignLayout from "../layouts/SignLayout";

const PasswordReset: MyNextPage = () => (
   <>
      <LargeLogo variant="password-rest" />
      <Form variant="password-rest" />
   </>
);

PasswordReset.getLayout = (page: ReactElement) => (
   <SignLayout question="Already have an account" suggestion="Log in" to="/login">
      {page}
   </SignLayout>
);

export default PasswordReset;
