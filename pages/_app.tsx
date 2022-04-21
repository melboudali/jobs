import { type ReactNode, useEffect } from "react";
import type { AppPropsWithLayout } from "next/app";
import { Provider } from "react-redux";
import store, { useDispatch, useSelector } from "@redux/store";
import { auth as Auth } from "@firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isAuthenticatedSelector, errorVariantSelector, statusSelector } from "@redux/selectors";
import { auth } from "@redux/reducers";
import "../styles/globals.scss";

interface Props {
   children: ReactNode;
}

const AppWrapper = ({ children }: Props) => {
   const dispatch = useDispatch();
   const authenticated = useSelector(isAuthenticatedSelector);
   const errorVariant = useSelector(errorVariantSelector);
   const status = useSelector(statusSelector);

   useEffect(() => {
      if (!authenticated && status === "idle" && errorVariant !== "auth") {
         const unsubscribe = onAuthStateChanged(Auth, async user => {
            dispatch(auth(user));
         });
         return () => {
            unsubscribe();
         };
      }
   }, [authenticated, status, dispatch, errorVariant]);
   return <>{children}</>;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
   const getLayout = Component.getLayout || ((page: ReactNode) => page);
   return (
      <Provider store={store}>
         <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>
      </Provider>
   );
};

export default MyApp;
