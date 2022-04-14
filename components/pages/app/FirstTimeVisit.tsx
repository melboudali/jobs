import cls from "classnames";
import Image from "next/image";
import { useState } from "react";
import styles from "./FirstTimeVisit.module.scss";

interface Props {}

const FirstTimeVisit = ({}: Props) => {
   const [isFirstCardSelected, setIsFirstCardSelected] = useState(true);

   const firstCardStyles = cls(styles.cards__card, { [styles["cards__card--selected"]]: isFirstCardSelected });
   const secCardStyles = cls(styles.cards__card, { [styles["cards__card--selected"]]: !isFirstCardSelected });

   return (
      <>
         <h1 className={styles.header}>How are you planning to use JOBS?</h1>
         <p className={styles.sub}>We’ll streamline your application experience accordingly.</p>
         <div className={styles.cards}>
            <div
               className={firstCardStyles}
               role="button"
               onClick={() => {
                  if (!isFirstCardSelected) {
                     setIsFirstCardSelected(!isFirstCardSelected);
                  }
               }}
            >
               <Image src="/svgs/job-seeker.svg" height={150} width={154.53} alt="job-seeker" />
               <h2 className={styles.cards__card__header}>Job seeker</h2>
               <p className={styles.cards__card__description}>Great job board. Easy apply. Follow companies Directly contact.</p>
            </div>
            <div
               className={secCardStyles}
               role="button"
               onClick={() => {
                  if (isFirstCardSelected) {
                     setIsFirstCardSelected(!isFirstCardSelected);
                  }
               }}
            >
               <Image src="/svgs/job-poster.svg" height={150} width={154.53} alt="job-poster" />
               <h2 className={styles.cards__card__header}>Job posting</h2>
               <p className={styles.cards__card__description}>
                  Attract quality employees. Increase Credibility. brand reputation.
               </p>
            </div>
         </div>
      </>
   );
};

export default FirstTimeVisit;
