import Image from "next/image";
import cls from "classnames";
import styles from "./Card.module.scss";

interface Props {
   isSelected: boolean;
   imgSrc: string;
   imgAlt: string;
   title: string;
   description: string;
   onClick: () => void;
}

const Card = ({ isSelected, imgSrc, imgAlt, title, description, onClick }: Props) => {
   const cardStyles = cls(styles.card, { [styles["card--selected"]]: isSelected });

   return (
      <div className={cardStyles} role="button" onClick={onClick}>
         <div className={styles.card__check}>
            {isSelected && (
               <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M2 6.61538L5.46154 11.2308L12 2"
                     stroke="white"
                     strokeWidth="3"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            )}
         </div>
         <Image src={imgSrc} height={120} width={127} alt={imgAlt} />
         <h2 className={styles.card__header}>{title}</h2>
         <p className={styles.card__description}>{description}</p>
      </div>
   );
};

export default Card;
