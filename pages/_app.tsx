import { type FC, type ReactNode, useEffect } from "react";
import type { AppPropsWithLayout } from "next/app";
import { Provider } from "react-redux";
import store, { useDispatch, useSelector } from "../react-redux/store";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { authenticatedSelector, isLoadingSelector, myAuth } from "../react-redux/features/userSlice";
import "../styles/globals.scss";

const AppWrapper: FC = ({ children }) => {
   const dispatch = useDispatch();
   const authenticated = useSelector(authenticatedSelector);
   const isLoading = useSelector(isLoadingSelector);
   useEffect(() => {
      if (!authenticated && !isLoading) {
         const unsubscribe = onAuthStateChanged(auth, async user => {
            dispatch(myAuth(null));
         });
         return () => {
            unsubscribe();
         };
      }
   }, [authenticated, isLoading, dispatch]);
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
