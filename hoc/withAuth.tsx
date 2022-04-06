import type { MyNextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "@redux/store";
import { authenticatedSelector, statusSelector } from "@redux/features/userSlice";
import Loading from "@components/common/Loading";

function withAuth<T, U>(isPublic: U, Component: MyNextPage<T>) {
   const Auth = (props: T) => {
      const router = useRouter();
      const authenticated = useSelector(authenticatedSelector);
      const status = useSelector(statusSelector);
      const [isAuth, route] = isPublic ? [authenticated, "/app"] : [!authenticated, "/login"];

      if (status === "loading" || status === "idle") {
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
