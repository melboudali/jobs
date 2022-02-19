import { useRef } from "react";
import useAppearOnScroll from "../hooks/useAppearOnScroll";
import styles from "./stats.module.scss";
import CountUp from "react-countup";
import cls from "classnames";

interface Props {
	number: number;
	children: string;
}

const Stats = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { appear } = useAppearOnScroll(ref);

	const stats = cls(styles.stats, {
		[styles["stats--reveal"]]: appear
	});

	return (
		<div className={stats} ref={ref}>
			{appear && (
				<>
					<Item number={130000}>tech jobs</Item>
					<Item number={6000000}>matches made</Item>
					<Item number={8000000}>candidates</Item>
				</>
			)}
		</div>
	);
};

const Item = ({ number, children }: Props) => {
	return (
		<div>
			<h4 className={styles.name}>{children}</h4>
			<CountUp className={styles.number} end={number} duration={4} useEasing={true} separator="," />
		</div>
	);
};

export default Stats;
