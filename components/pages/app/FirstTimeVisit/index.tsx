import { useState } from "react";
import Card from "./Card";
import styles from "./index.module.scss";

const FirstTimeVisit = () => {
   const [isFirstCardSelected, setIsFirstCardSelected] = useState(true);

   return (
      <>
         <h1 className={styles.header}>How are you planning to use JOBS?</h1>
         <p className={styles.sub}>We’ll streamline your application experience accordingly.</p>
         <div className={styles.cards}>
            <Card
               isSelected={isFirstCardSelected}
               imgSrc="/svgs/job-seeker.svg"
               imgAlt="job-seeker"
               title="Job seeker"
               description="Great job board. Easy apply. Follow companies Directly contact."
               onClick={() => {
                  if (!isFirstCardSelected) {
                     setIsFirstCardSelected(!isFirstCardSelected);
                  }
               }}
            />
            <Card
               isSelected={!isFirstCardSelected}
               imgSrc="/svgs/job-posting.svg"
               imgAlt="job-posting"
               title="Job posting"
               description="Attract quality employees. Increase Credibility. brand reputation."
               onClick={() => {
                  if (isFirstCardSelected) {
                     setIsFirstCardSelected(!isFirstCardSelected);
                  }
               }}
            />
         </div>
      </>
   );
};

export default FirstTimeVisit;
