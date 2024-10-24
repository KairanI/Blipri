import { useState } from "react";

export const useAnimate: () => [boolean, (mode: boolean) => void] = () => {
	const [isAnimating, setIsAnimating] = useState<boolean>(false);

	const startAnimate = (mode: boolean): void => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    const containerLength = document.getElementById('container-language');
    const textTest = document.getElementById('test-text');
    const caretka = document.getElementById('caretka');

    if (mode) containerLength?.classList.add('text-opacity');
    textTest?.classList.add('text-opacity');
    caretka?.classList.remove('caretka-blink');
    caretka?.classList.add('opacityElement');

    setTimeout(() => caretka?.classList.remove('opacityElement'), 140);

    setTimeout(() => {
      if (mode) containerLength?.classList.remove('text-opacity');
      textTest?.classList.remove('text-opacity');
			setIsAnimating(false);
    }, 300);

    setTimeout(() => caretka?.classList.add('caretka-blink'), 400);
  };

	return [isAnimating, startAnimate]
}