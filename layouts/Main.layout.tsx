import type { ReactNode } from "react";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import styles from "./Layouts.module.scss";

interface Props {
   children: ReactNode;
}

const Layout = ({ children }: Props) => (
   <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
   </>
);

export default Layout;
