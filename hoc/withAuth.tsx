import { NextComponentType, MyNextPage } from "next";
import Error from "next/error";
import Router from "next/router";
import { useSelector } from "react-redux";
import { authenticatedSelector, selectUser, statusSelector, userSelector } from "../react-redux/features/userSlice";

function withAuth<T>(Component: MyNextPage<T>) {
   const Auth = (props: T) => {
      const user = useSelector(userSelector);
      const status = useSelector(statusSelector);
      const authenticated = useSelector(authenticatedSelector);
      const loading = status === "loading";

      if (loading) {
         return <p>Loading ...</p>;
      }

      if (!authenticated && !loading) {
         Router.push("/login");
         return null;
         //  return <Error statusCode={404} />;
      }

      return <Component {...props} />;
   };

   // Copy getInitial props so it will run as well
   // if (Component.getInitialProps) {
   // 	Auth.getInitialProps = Component.getInitialProps;
   // }

   return Auth;
}

export default withAuth;
