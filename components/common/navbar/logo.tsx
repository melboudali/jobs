import styles from "./index.module.scss";
import variables from "../../styles/variables.module.scss";

const Logo = () => (
	<div className={styles.logo}>
		<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M29.0208 4.97918C27.4422 3.40059 25.5682 2.14838 23.5056 1.29405C21.4431 0.439717 19.2325 -3.72575e-07 17 0C14.7675 3.72575e-07 12.5569 0.439719 10.4944 1.29405C8.43184 2.14838 6.55778 3.40059 4.97918 4.97919C3.40059 6.55778 2.14838 8.43185 1.29405 10.4944C0.439717 12.5569 -4.70159e-07 14.7675 0 17C4.7016e-07 19.2325 0.439719 21.4431 1.29405 23.5056C2.14838 25.5682 3.40059 27.4422 4.97919 29.0208L29.0208 4.97918Z" />
			<path d="M4.97919 29.0208C6.55778 30.5994 8.43185 31.8516 10.4944 32.706C12.5569 33.5603 14.7675 34 17 34C19.2325 34 21.4431 33.5603 23.5056 32.706C25.5682 31.8516 27.4422 30.5994 29.0208 29.0208C30.5994 27.4422 31.8516 25.5682 32.706 23.5056C33.5603 21.4431 34 19.2325 34 17C34 14.7675 33.5603 12.5569 32.706 10.4944C31.8516 8.43185 30.5994 6.55778 29.0208 4.97918L4.97919 29.0208Z" />
			<path d="M10.5212 23.5638C12.2508 25.2933 14.5965 26.265 17.0425 26.265C19.4885 26.265 21.8342 25.2933 23.5638 23.5638C25.2933 21.8342 26.265 19.4885 26.265 17.0425C26.265 14.5965 25.2933 12.2508 23.5638 10.5212L10.5212 23.5638Z" />
			<path d="M23.5638 10.5212C21.8342 8.79165 19.4885 7.82 17.0425 7.82C14.5965 7.82 12.2508 8.79165 10.5212 10.5212C8.79165 12.2508 7.82 14.5965 7.82 17.0425C7.82 19.4885 8.79165 21.8342 10.5212 23.5638L23.5638 10.5212Z" />
		</svg>
		<span>jobs</span>
	</div>
);

export default Logo;
