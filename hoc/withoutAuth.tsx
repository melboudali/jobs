import { MyNextPage, NextComponentType } from "next";
import Error from "next/error";
import Router from "next/router";
import { authenticatedSelector, statusSelector, userSelector } from "../react-redux/features/userSlice";
import { useSelector } from "../react-redux/store";

function withoutAuth(Component: any) {
   const Auth = (props: any) => {
      const user = useSelector(userSelector);
      const status = useSelector(statusSelector);
      const authenticated = useSelector(authenticatedSelector);
      const loading = status === "loading";

      if (loading) {
         return <p>Loading ...</p>;
      }

      if (!authenticated && !loading) {
         //  Router.push("/app");
         //  return null;
         return <Error statusCode={404} />;
      }

      return <Component {...props} />;
   };

   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
   }

   return Auth;
}

export default withoutAuth;