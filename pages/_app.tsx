import { type ReactNode, useEffect } from "react";
import type { AppPropsWithLayout } from "next/app";
import { Provider } from "react-redux";
import store, { useDispatch, useSelector } from "@redux/store";
import { auth } from "@firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
   isAuthenticatedSelector,
   errorVariantSelector,
   isLoadingSelector,
   myAuth,
   statusSelector,
} from "@redux/features/userSlice";
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
         const unsubscribe = onAuthStateChanged(auth, async user => {
            dispatch(myAuth(user));
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
