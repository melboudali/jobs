import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./Card.module.scss";
import cls from "classnames";

interface SmallData {
   logo: string;
   name: string;
   title: string;
}

interface FullData extends SmallData {
   price: string;
   time: string;
   place: string;
}

interface testimonial {
   children: ReactNode;
   data: SmallData;
   testimonial: boolean;
}

interface job {
   data: FullData;
   testimonial: boolean;
}

interface DetailsItemProps {
   children: ReactNode;
   path: string;
}

// type predicates https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
const isTestimonial = (props: testimonial | job): props is testimonial => (props as testimonial).testimonial;

const Card = (props: testimonial | job) => {
   const root = cls(styles.root, {
      [styles["testimonial"]]: props.testimonial,
      [styles["job"]]: !props.testimonial,
   });

   return (
      <div className={root}>
         <div className={styles.top}>
            <Image
               className={styles.top__img}
               src={props.data.logo}
               height={34}
               width={34}
               objectFit="cover"
               alt="logo"
               quality={100}
            />
            <div className={styles.top__titleAndCName}>
               <h3 title={props.data.title}>{props.data.title}</h3>
               <p>{props.data.name}</p>
            </div>
         </div>
         {isTestimonial(props) ? (
            <div className={styles.message}>{props.children}</div>
         ) : (
            <div className={styles.details}>
               <DetailsItem path="M7.5 0C3.35826 0 0 3.35826 0 7.5C0 11.6417 3.35826 15 7.5 15C11.6417 15 15 11.6417 15 7.5C15 3.35826 11.6417 0 7.5 0ZM7.5 13.7277C4.06138 13.7277 1.27232 10.9386 1.27232 7.5C1.27232 4.06138 4.06138 1.27232 7.5 1.27232C10.9386 1.27232 13.7277 4.06138 13.7277 7.5C13.7277 10.9386 10.9386 13.7277 7.5 13.7277ZM8.29855 7.11161L7.87333 7.01283V4.76451C8.50949 4.85156 8.9029 5.25 8.96987 5.73884C8.97824 5.8058 9.03516 5.85435 9.10212 5.85435H9.85379C9.93248 5.85435 9.99442 5.78571 9.98772 5.70703C9.8856 4.66406 9.02679 3.99442 7.88002 3.87891V3.33147C7.88002 3.25781 7.81975 3.19754 7.74609 3.19754H7.27567C7.20201 3.19754 7.14174 3.25781 7.14174 3.33147V3.88393C5.95647 3.99944 5.02902 4.65402 5.02902 5.87612C5.02902 7.00781 5.86272 7.55357 6.73828 7.76284L7.15179 7.8683V10.2573C6.41183 10.1585 5.99665 9.76339 5.91127 9.23103C5.90123 9.16741 5.84431 9.12054 5.77902 9.12054H5.00558C4.9269 9.12054 4.86496 9.1875 4.87165 9.26618C4.94699 10.1869 5.64509 11.034 7.13505 11.1429V11.6685C7.13505 11.7422 7.19531 11.8025 7.26897 11.8025H7.74442C7.81808 11.8025 7.87835 11.7422 7.87835 11.6669L7.875 11.1362C9.18583 11.0206 10.1233 10.3192 10.1233 9.06027C10.1217 7.89844 9.38337 7.37946 8.29855 7.11161ZM7.15011 6.8404C7.05636 6.81362 6.97768 6.7885 6.899 6.7567C6.33315 6.55246 6.07031 6.22266 6.07031 5.79743C6.07031 5.18973 6.53069 4.84319 7.15011 4.76451V6.8404ZM7.87333 10.2623V8.02399C7.92522 8.03906 7.9721 8.05078 8.02065 8.06083C8.8125 8.3019 9.07868 8.63672 9.07868 9.15067C9.07868 9.80524 8.58649 10.1987 7.87333 10.2623Z">
                  {`up to ${props.data.price} hourly`}
               </DetailsItem>
               <DetailsItem path="M7.5 0C3.35685 0 0 3.35685 0 7.5C0 11.6431 3.35685 15 7.5 15C11.6431 15 15 11.6431 15 7.5C15 3.35685 11.6431 0 7.5 0ZM7.5 13.5484C4.15827 13.5484 1.45161 10.8417 1.45161 7.5C1.45161 4.15827 4.15827 1.45161 7.5 1.45161C10.8417 1.45161 13.5484 4.15827 13.5484 7.5C13.5484 10.8417 10.8417 13.5484 7.5 13.5484ZM9.36895 10.3911L6.80141 8.5252C6.70766 8.45564 6.65323 8.34677 6.65323 8.23186V3.26613C6.65323 3.06653 6.81653 2.90323 7.01613 2.90323H7.98387C8.18347 2.90323 8.34677 3.06653 8.34677 3.26613V7.55141L10.3669 9.02117C10.5302 9.13911 10.5635 9.36593 10.4456 9.52923L9.87702 10.3125C9.75907 10.4728 9.53226 10.5091 9.36895 10.3911Z">
                  {props.data.time}
               </DetailsItem>
               <DetailsItem path="M6.93476 14.6974C2.77258 8.5263 2 7.89296 2 5.625C2 2.51839 4.46242 0 7.5 0C10.5376 0 13 2.51839 13 5.625C13 7.89296 12.2274 8.5263 8.06524 14.6974C7.7921 15.1009 7.20787 15.1009 6.93476 14.6974ZM7.5 7.96875C8.76566 7.96875 9.79167 6.91942 9.79167 5.625C9.79167 4.33058 8.76566 3.28125 7.5 3.28125C6.23434 3.28125 5.20833 4.33058 5.20833 5.625C5.20833 6.91942 6.23434 7.96875 7.5 7.96875Z">
                  {props.data.place}
               </DetailsItem>
            </div>
         )}
      </div>
   );
};

const DetailsItem = ({ path, children }: DetailsItemProps) => (
   <div className={styles.details__item} title={children as string}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d={path} />
      </svg>
      <span>{children}</span>
   </div>
);

Card.defaultProps = {
   testimonial: false,
};

export default Card;
