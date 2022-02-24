import { testimonials } from "../types";

export const flexThis = (arr: testimonials) => {
	const res: testimonials[] = [];
	let subRes: testimonials = [];
	for (let i = 0; i < arr.length; i++) {
		subRes.push(arr[i]);
		if (arr[i].id % 3 === 0 || i === arr.length - 1) {
			res.push(subRes);
			subRes = [];
		}
	}

	return res;
};
