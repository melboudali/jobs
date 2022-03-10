import type { MyNextPage } from "next";
import PropTypes from "prop-types";
import { ReactElement } from "react";
import SignLayout from "../layouts/SignLayout";

const Signup: MyNextPage = () => {
	return <div>This is PageName Component/Page</div>;
};

Signup.getLayout = (page: ReactElement) => (
	<SignLayout question="Already have an account" suggestion="Log in" to="/login">
		{page}
	</SignLayout>
);

export default Signup;
