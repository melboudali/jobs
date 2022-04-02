import type { MyNextPage } from "next";
import type { ReactElement } from "react";
import Form from "../components/common/LoginSignup/Form";
import LargeLogo from "../components/common/LoginSignup/LargeLogo";
import withoutAuth from "../hoc/withoutAuth";
import SignLayout from "../layouts/SignLayout";

const Signup: MyNextPage = () => (
   <>
      <LargeLogo variant="signup" />
      <Form variant="signup" />
   </>
);

Signup.getLayout = (page: ReactElement) => (
   <SignLayout question="Already have an account" suggestion="Log in" to="/login">
      {page}
   </SignLayout>
);

export default withoutAuth(Signup);
