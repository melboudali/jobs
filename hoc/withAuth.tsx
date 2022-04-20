import type { MyNextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "@redux/store";
import { isAuthenticatedSelector, isFetchingSelector, statusSelector } from "@redux/selectors";
import Loading from "@components/common/Loading";

function withAuth<T, U>(isPublic: U, Component: MyNextPage<T>) {
   const Auth = (props: T) => {
      const router = useRouter();
      const isAuthenticated = useSelector(isAuthenticatedSelector);
      const status = useSelector(statusSelector);
      const isFetching = useSelector(isFetchingSelector);

      const [isAuth, route] = isPublic ? [isAuthenticated, "/app"] : [!isAuthenticated, "/login"];

      // ! fix this later
      // if (status === "loading" || status === "idle") {
      if (isFetching) {
         return <Loading />;
      }

      if (isAuth) {
         router.push(route);
         return null;
      }

      return <Component {...props} />;
   };

   // Copy getInitial props so it will run as well
   // if (Component.getInitialProps) {
   //    Auth.getInitialProps = Component.getInitialProps;
   // }

   return Auth;
}

export default withAuth;
