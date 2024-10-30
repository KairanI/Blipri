export const AnimateKey = (classKey: string, code: string): void => {
	let key_animate = document.getElementById(code);
	if (key_animate) {
			key_animate.classList.add(classKey);

			setTimeout(() => {
					key_animate.classList.remove(classKey)
			}, 200);
	}
}