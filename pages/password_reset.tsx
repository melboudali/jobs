import type { MyNextPage } from "next";
import { ReactElement } from "react";

interface Props {}

const PasswordReset: MyNextPage<Props> = props => {
	return <div>This is PageName Component/Page</div>;
};

PasswordReset.getLayout = (page: ReactElement) => page;

export default PasswordReset;
