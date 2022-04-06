import { useState } from "react";
import cls from "classnames";
import data from "@data/navbarLinks.json";
import Navar from "./Navbar";
import Links from "./Navbar/Links";
import styles from "./Header.module.scss";

const Header = () => {
   const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

   const toggle = () => {
      document.documentElement.style.overflowY = showHamburgerMenu ? "visible" : "hidden";
      setShowHamburgerMenu(!showHamburgerMenu);
   };

   const headerStyles = cls(styles.header, { [styles["header--open"]]: showHamburgerMenu });

   return (
      <header className={headerStyles}>
         <Navar showHamburgerMenu={showHamburgerMenu} toggle={toggle} />
         {showHamburgerMenu && <Links variant="mobile" data={data} showHamburgerMenu={showHamburgerMenu} />}
      </header>
   );
};

export default Header;
