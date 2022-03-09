import { ChangeEvent, useState } from "react";

interface Props {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
}

const useForm = (defaults: Props) => {
	const [values, setValues] = useState(defaults);

	const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
		let { name, value } = e.target;
		console.log(name, value);
		setValues({ ...values, [name]: value });
	};

	const clearValues = () => {
		setValues(defaults);
	};

	return { values, updateValue, clearValues };
};

export default useForm;
