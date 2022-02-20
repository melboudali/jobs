import { useRef } from "react";
import useAppearOnScroll from "../hooks/useAppearOnScroll";
import styles from "./stats.module.scss";
import CountUp from "react-countup";
import cls from "classnames";

interface Props {
	number: number;
	children: string;
	appear: boolean;
}

const Stats = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { appear } = useAppearOnScroll(ref);
	console.log("rendered");

	const stats = cls(styles.stats, {
		[styles["stats--reveal"]]: appear
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

const Item = ({ number, children, appear }: Props) => {
	return (
		<div>
			<h4 className={styles.name}>{children}</h4>
			{appear && <CountUp className={styles.number} end={number} duration={4} useEasing={true} separator="," />}
		</div>
	);
};

export default Stats;
