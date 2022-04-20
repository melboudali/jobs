import { useState } from "react";
import cls from "classnames";
import LinksData from "@data/navbarLinks.json";
import Navar from "./Navbar";
import Links from "./Navbar/Links";
import styles from "./Header.module.scss";
import { useSelector } from "@redux/store";
import { isAuthenticatedSelector } from "@redux/selectors";
import useNavbar from "@hooks/useNavbar";

const Header = () => {
   const isAthenticated = useSelector(isAuthenticatedSelector);
   const data = [...LinksData, { name: "Start Free", href: isAthenticated ? "/app" : "/login" }];
   const { scrollDown } = useNavbar(47);
   const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

   const toggle = () => {
      document.documentElement.style.overflowY = showHamburgerMenu ? "visible" : "hidden";
      setShowHamburgerMenu(!showHamburgerMenu);
   };

   const headerStyles = cls(styles.header, {
      [styles["header--open"]]: showHamburgerMenu,
      [styles["header--show"]]: scrollDown,
      [styles["header--hide"]]: !scrollDown,
   });

   return (
      <header className={headerStyles}>
         <Navar data={data} showHamburgerMenu={showHamburgerMenu} toggle={toggle} />
         {showHamburgerMenu && <Links variant="mobile" data={data} showHamburgerMenu={showHamburgerMenu} />}
      </header>
   );
};

export default Header;
