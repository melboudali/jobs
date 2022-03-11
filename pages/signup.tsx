import type { MyNextPage } from "next";
import PropTypes from "prop-types";
import { ReactElement } from "react";
import Form from "../components/common/LoginSignup/Form";
import LargeLogo from "../components/common/LoginSignup/LargeLogo";
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

export default Signup;
