import { useRef } from "react";
import useSlider from "../../../hooks/useSlider";
import Title from "./Title";
import Card from "./Card";
import data from "../../../data/jobs.json";
import cls from "classnames";
import styles from "./Jobs.module.scss";

const Jobs = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const { translateValue, slideButtons, slideBack, slideNext } = useSlider({ containerRef, sliderRef });

	const next_button_styles = cls(styles.button, {
		[styles["button-disabled"]]: !slideButtons.next
	});

	const prev_button_styles = cls(styles.button, {
		[styles["button-disabled"]]: !slideButtons.prev
	});

	return (
		<>
			<div className={styles.title}>
				<Title>jobs hiring now</Title>
				<div className={styles.buttons}>
					<button className={prev_button_styles} type="button" onClick={slideBack} aria-label="back">
						<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 1L2 5L6 9" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
					<button className={next_button_styles} type="button" onClick={slideNext} aria-label="next">
						<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L5 5L1 9" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
				</div>
			</div>
			<div className={styles.cards__slider} ref={containerRef}>
				<div style={{ transform: `translateX(-${translateValue}px)` }} className={styles.cards} ref={sliderRef}>
					{data.map(({ id, ...others }) => (
						<Card key={id} data={others} />
					))}
				</div>
			</div>
		</>
	);
};

export default Jobs;
