import Link from "next/link";
import cls from "classnames";
import { navbarProps } from "@customTypes/index";
import styles from "./index.module.scss";

interface Props extends navbarProps {
   variant: "desktop" | "mobile";
}

interface CustomLinkProps {
   name: string;
   href: string;
   last: boolean;
}

const Links = ({ variant, data, showHamburgerMenu }: Props) => (
   <ul
      className={cls(
         styles.links,
         { [styles["links--desktop"]]: variant === "desktop" },
         { [styles["links--mobile"]]: variant === "mobile" && showHamburgerMenu }
      )}
   >
      {data.map(({ name, href }, idx) => (
         <li key={idx}>
            <CustomLink name={name} href={href} last={idx === data.length - 1} />
         </li>
      ))}
   </ul>
);

const CustomLink = ({ name, href, last }: CustomLinkProps) => (
   <Link href={href}>
      <a
         onClick={() => {
            if (document.documentElement.style.overflowY === "hidden") {
               document.documentElement.style.overflowY = "visible";
            }
         }}
      >
         {last ? (
            <>
               <span>{name}</span>
               <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L1 9" strokeWidth="2" strokeLinecap="round" />
               </svg>
            </>
         ) : (
            name
         )}
      </a>
   </Link>
);

Links.defaultProps = {
   variant: "desktop",
   showHamburgerMenu: false,
};

export default Links;
