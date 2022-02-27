import { useEffect, useState } from "react";

const useAppearOnScroll = (ref: React.RefObject<HTMLDivElement>) => {
	const [appear, setAppear] = useState(false);

	useEffect(() => {
		const easeContent = () => {
			if (ref.current && ref.current.getBoundingClientRect().top < globalThis.innerHeight) setAppear(true);
		};
		globalThis.addEventListener("scroll", easeContent);
		return () => globalThis.removeEventListener("scroll", easeContent);
	}, [ref]);

	return { appear };
};

export default useAppearOnScroll;
