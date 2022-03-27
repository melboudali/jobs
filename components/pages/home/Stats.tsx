import { useRef, type FC } from "react";
import useAppearOnScroll from "../../../hooks/useAppearOnScroll";
import CountUp from "react-countup";
import cls from "classnames";
import styles from "./Stats.module.scss";

interface Props {
   number: number;
   appear: boolean;
}

const Stats = () => {
   const ref = useRef<HTMLDivElement>(null);
   const { appear } = useAppearOnScroll(ref);

   const stats = cls(styles.stats, {
      [styles["stats--reveal"]]: appear,
   });

   return (
      <div className={stats} ref={ref}>
         <Item number={130000} appear={appear}>
            tech jobs
         </Item>
         <Item number={6000000} appear={appear}>
            matches made
         </Item>
         <Item number={8000000} appear={appear}>
            candidates
         </Item>
      </div>
   );
};

const Item: FC<Props> = ({ number, children, appear }) => (
   <div>
      <h4 className={styles.name}>{children}</h4>
      {appear && <CountUp className={styles.number} end={number} duration={4} useEasing={true} separator="," />}
   </div>
);

export default Stats;
