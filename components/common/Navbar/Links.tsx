import Link from "next/link";
import cls from "classnames";
import styles from "./Navbar.module.scss";

interface Props {
   variant: "desktop" | "mobile";
   data: {
      name: string;
      href: string;
   }[];
   showHamburgerMenu: boolean;
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
      <a>
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
   showHamburgerMenu: false,
};

export default Links;