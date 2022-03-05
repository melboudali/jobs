import Title from "./title";
import data from "../../../data/icons.json";
import styles from "./icons.module.scss";

const Icons = () => (
	<>
		<Title>trusted by</Title>
		<div className={styles.wrapper}>
			<div className={styles.svgs}>
				{data.map(({ id, name, path }) => (
					<div key={id} className={styles.svgs__svg}>
						<span>{name}</span>
						<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d={path} />
						</svg>
					</div>
				))}
			</div>
		</div>
	</>
);

export default Icons;
