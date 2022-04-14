import Logo from "@components/common/Navbar/Logo";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { useSelector } from "@redux/store";
import { signOutThunk, userSelector } from "@redux/features/userSlice";
import { useDispatch } from "react-redux";

interface Props {
   children: ReactNode;
   name: string;
   href: string;
}

interface Links {
   name: string;
   href: string;
   children: ReactNode;
}

const Navbar = () => {
   const dispatch = useDispatch();

   const user = useSelector(userSelector);
   const links: Links[] = [
      {
         name: "messages",
         href: "/app/messages",
         children: (
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M14.7158 3.71484C14.8301 3.62402 15 3.70898 15 3.85254V9.84375C15 10.6201 14.3701 11.25 13.5938 11.25H1.40625C0.629883 11.25 0 10.6201 0 9.84375V3.85547C0 3.70898 0.166992 3.62695 0.28418 3.71777C0.94043 4.22754 1.81055 4.875 4.79883 7.0459C5.41699 7.49707 6.45996 8.44629 7.5 8.44043C8.5459 8.44922 9.60938 7.47949 10.2041 7.0459C13.1924 4.875 14.0596 4.22461 14.7158 3.71484ZM7.5 7.5C8.17969 7.51172 9.1582 6.64453 9.65039 6.28711C13.5381 3.46582 13.834 3.21973 14.7305 2.5166C14.9004 2.38477 15 2.17969 15 1.96289V1.40625C15 0.629883 14.3701 0 13.5938 0H1.40625C0.629883 0 0 0.629883 0 1.40625V1.96289C0 2.17969 0.0996094 2.38184 0.269531 2.5166C1.16602 3.2168 1.46191 3.46582 5.34961 6.28711C5.8418 6.64453 6.82031 7.51172 7.5 7.5Z" />
            </svg>
         ),
      },
      {
         name: "notifications",
         href: "/app/notifications",
         children: (
            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M7.5 17.1428C8.68259 17.1428 9.64185 16.1835 9.64185 15H5.35815C5.35815 16.1835 6.31741 17.1428 7.5 17.1428ZM14.7117 12.1302C14.0648 11.4351 12.8544 10.3895 12.8544 6.96426C12.8544 4.36271 11.0303 2.28013 8.57076 1.76919V1.07143C8.57076 0.479798 8.09129 0 7.5 0C6.90871 0 6.42924 0.479798 6.42924 1.07143V1.76919C3.96965 2.28013 2.14555 4.36271 2.14555 6.96426C2.14555 10.3895 0.935177 11.4351 0.288304 12.1302C0.0874113 12.3462 -0.00165095 12.6043 2.31491e-05 12.8571C0.00370617 13.4062 0.43462 13.9285 1.0748 13.9285H13.9252C14.5654 13.9285 14.9966 13.4062 15 12.8571C15.0017 12.6043 14.9126 12.3458 14.7117 12.1302Z" />
            </svg>
         ),
      },
      {
         name: "profile",
         href: "/app/profile",
         children: (
            <Image
               src={user.photoURL}
               alt="profile image"
               height={30}
               width={30}
               objectFit="cover"
               className={styles.profileImg}
            />
         ),
      },
   ];
   return (
      <div className={styles.root}>
         <div className={styles.container}>
            <Logo />
            <nav>
               <ul className={styles.links}>
                  {links.map(({ name, href, children }, idx) => (
                     <CustomLink key={idx} name={name} href={href}>
                        {children}
                     </CustomLink>
                  ))}
                  <li>
                     <button
                        onClick={() => {
                           dispatch(signOutThunk());
                        }}
                     >
                        logout
                     </button>
                  </li>
               </ul>
            </nav>
         </div>
      </div>
   );
};

const CustomLink = ({ children, name, href }: Props) => {
   return (
      <li className={styles.link}>
         <Link href={href}>
            <a>
               {children}
               {name}
            </a>
         </Link>
      </li>
   );
};

export default Navbar;
