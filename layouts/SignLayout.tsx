import Error from "next/error";
import { Router } from "next/router";
import { useReducer } from "react";
import Footer from "../components/common/LoginSignup/Footer";
import withAuth from "../hoc/withAuth";
import withoutAuth from "../hoc/withoutAuth";
import { authenticatedSelector, isLoadingSelector } from "../react-redux/features/userSlice";
import { useSelector } from "../react-redux/store";
import styles from "./Layouts.module.scss";

interface Props {
   question: string;
   suggestion: string;
   to: "/login" | "/signup";
}

const SignLayout: React.FC<Props> = ({ children, question, suggestion, to }) => {
   const authenticated = useSelector(authenticatedSelector);
   const isLoading = useSelector(isLoadingSelector);

   if (isLoading) {
      return <p>Loading ...</p>;
   }

   if (authenticated) {
      // Router.push("/app");
      //  return null;
      return <Error statusCode={404} />;
   }

   return (
      <>
         <main className={styles.signMain}>{children}</main>
         <Footer question={question} suggestion={suggestion} to={to} />
      </>
   );
};

export default SignLayout;
