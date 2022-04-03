import type { ReactElement } from "react";
import SignLayout from "../layouts/SignLayout";
import LargeLogo from "../components/common/LoginSignup/LargeLogo";
import Form from "../components/common/LoginSignup/Form";
import withoutAuth from "../hoc/withoutAuth";

const Login = () => (
   <>
      <LargeLogo variant="login" />
      <Form />
   </>
);

Login.getLayout = (page: ReactElement) => (
   <SignLayout question="New to jobs" suggestion="Create an account" to="/signup">
      {page}
   </SignLayout>
);

export default withoutAuth(Login);
