import { ChangeEvent } from "react";
import styles from "./input.module.scss";

interface Props {
	label: string;
	id: string;
	name: string;
	type: string;
	placeHolder?: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, id, name, type, placeHolder, value, onChange }: Props) => {
	return (
		<div className={styles.root}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input className={styles.input} name={name} id={id} type={type} placeholder={placeHolder} value={value} onChange={onChange} />
		</div>
	);
};

export default Input;
