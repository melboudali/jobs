import { useState } from "react";
import Title from "./Title";
import Card from "./Card";
import { flexThis } from "../../../utils";
import data from "../../../data/testimonials.json";
import cls from "classnames";
import styles from "./Testimonials.module.scss";

const Testimonials = () => {
	const [more, setMore] = useState(false);

	const testimonials_styles = cls(styles.testimonials, { [styles["testimonials--show"]]: more });

	return (
		<>
			<Title>testimonials by people like you</Title>
			<div className={testimonials_styles}>
				{flexThis(data).map((testimonials, idx) => (
					<div key={idx} className={styles.testimonials__column}>
						{testimonials.map(({ id, image, name, job, message }) => (
							<Card key={id} data={{ logo: image, name: job, title: name }} testimonial>
								{message}
							</Card>
						))}
					</div>
				))}
				<div className={styles.testimonials__more__wrapper} />
				<button className={styles.testimonials__more__button} type="button" onClick={() => setMore(!more)}>
					show more
				</button>
			</div>
		</>
	);
};

export default Testimonials;
