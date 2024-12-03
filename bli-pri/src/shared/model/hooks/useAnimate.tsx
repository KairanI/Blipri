import { useState } from "react";

export const useAnimate: () => [boolean, (oneControl: boolean, twoControl: boolean) => void] = () => {
	const [isAnimating, setIsAnimating] = useState<boolean>(false);

	const startAnimate = (oneControl: boolean, twoControl: boolean): void => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    const containerLength: HTMLElement | null = document.getElementById('container-language');
    const textTest: HTMLElement | null = document.getElementById('test-text');
    const caretka: HTMLElement | null = document.getElementById('caretka');
    const timer: HTMLElement | null = document.getElementById('timer');

    if (oneControl) containerLength?.classList.add('text-opacity');
    textTest?.classList.add('text-opacity');
    caretka?.classList.remove('caretka-blink');
    caretka?.classList.add('opacityElement');

    setTimeout(() => {
      caretka?.classList.remove('opacityElement');
      if (twoControl) {
        timer?.classList.remove('timerActive');
        timer?.classList.add('text-opacity');
      };
    }, 140);

    setTimeout(() => {
      if (oneControl) containerLength?.classList.remove('text-opacity');
      textTest?.classList.remove('text-opacity');
			setIsAnimating(false);
    }, 300);

    setTimeout(() => {
      caretka?.classList.add('caretka-blink');
      if (twoControl) timer?.classList.remove('text-opacity');
    }, 400);
  };

	return [isAnimating, startAnimate]
}
