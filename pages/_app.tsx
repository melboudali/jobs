import { ReactNode, useEffect } from "react";
import type { AppPropsWithLayout } from "next/app";
import store, { useDispatch } from "../react-redux/store";
import { Provider } from "react-redux";
import "../styles/globals.scss";

import { myAuth } from "../react-redux/features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const Auth = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async user => {
         dispatch(myAuth(user));
         console.log("rendered");
      });

      return () => {
         unsubscribe();
      };
   }, [dispatch]);
   return null;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
   const getLayout = Component.getLayout || ((page: ReactNode) => page);
   return getLayout(
      <Provider store={store}>
         <Auth />
         <Component {...pageProps} />
      </Provider>
   );
};

export default MyApp;
