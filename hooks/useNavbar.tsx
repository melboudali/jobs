import { useEffect, useState } from "react";

const useNavbar = (navHeight: number) => {
   const [scrollDown, setNavScrollDown] = useState(true);

   useEffect(() => {
      let windowOffset = 0;
      const onScrollFunc = () => {
         let currentScroll = window.scrollY;
         if (currentScroll > navHeight) {
            if (currentScroll < windowOffset) {
               setNavScrollDown(true);
            } else {
               setNavScrollDown(false);
            }
         }
         windowOffset = window.pageYOffset;
      };

      window.addEventListener("scroll", onScrollFunc);
      return () => window.removeEventListener("scroll", onScrollFunc);
   }, [navHeight]);
   return { scrollDown };
};

export default useNavbar;
