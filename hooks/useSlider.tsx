import { RefObject, useRef, useState } from "react";

interface Props {
	sliderRef: RefObject<HTMLDivElement>;
	containerRef: RefObject<HTMLDivElement>;
}

const useSlider = ({ containerRef, sliderRef }: Props) => {
	const currentWidth = useRef(0);
	const [translateValue, setTranslateValue] = useState(0);

	const [slideButtons, setSlideButtons] = useState({
		back: false,
		next: true
	});

	const slideNext = () => {
		if (!currentWidth.current) currentWidth.current = containerRef.current!.clientWidth;
		if (currentWidth.current < sliderRef.current!.clientWidth && sliderRef.current!.clientWidth - currentWidth.current > 273) {
			currentWidth.current! += 273;
			setTranslateValue(currentWidth.current - containerRef.current!.clientWidth);
			{
				setSlideButtons({ back: true, next: true });
			}
		} else {
			sliderRef.current!.clientWidth - currentWidth.current > 0 ? (currentWidth.current += 273) : null;
			setTranslateValue(sliderRef.current!.clientWidth - containerRef.current!.clientWidth);
			{
				slideButtons.next && setSlideButtons({ ...slideButtons, next: false });
			}
		}
	};

	const slideBack = () => {
		if (currentWidth.current > containerRef.current!.clientWidth) {
			currentWidth.current -= 273;
			setTranslateValue(currentWidth.current - containerRef.current!.clientWidth);
			{
				!slideButtons.next && slideButtons.back && setSlideButtons({ back: true, next: true });
			}
		}
		if (currentWidth.current === containerRef.current!.clientWidth) {
			currentWidth.current = containerRef.current!.clientWidth;
			{
				slideButtons.back && setSlideButtons({ ...slideButtons, back: false });
			}
		}
	};
	return { translateValue, slideButtons, slideBack, slideNext };
};

export default useSlider;
