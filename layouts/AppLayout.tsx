import type { ReactNode } from "react";
import withAuth from "@hoc/withAuth";
import Navbar from "@components/pages/app/Navbar";
import styles from "./Layouts.module.scss";
import { useSelector } from "@redux/store";
import { isFetchingSelector, typeSelector } from "@redux/features/userSlice";
import FirstTimeVisit from "@components/pages/app/FirstTimeVisit";

interface Props {
   children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
   const userType = useSelector(typeSelector);
   const isFetching = useSelector(isFetchingSelector);

   return (
      <div className={styles.app}>
         <Navbar />
         <main className={styles.app__main}>{userType ? children : <FirstTimeVisit />}</main>
      </div>
   );
};

export default withAuth(false, AppLayout);
