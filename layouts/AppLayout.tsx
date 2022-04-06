import type { ReactNode } from "react";
import withAuth from "@hoc/withAuth";

interface Props {
   children: ReactNode;
}

const AppLayout = ({ children }: Props) => <main>{children}</main>;

export default withAuth(false, AppLayout);
