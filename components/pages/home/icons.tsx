import styles from "./icons.module.scss";
import data from "../../../data/icons.json";

const Icons = () => (
	<div className={styles.wrapper}>
		<div className={styles.svgs}>
			{data.map(({ name, path }) => (
				<div key={name} className={styles.svgs__svg}>
					<span>{name}</span>
					<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d={path} />
					</svg>
				</div>
			))}
		</div>
	</div>
);

export default Icons;
