export const updateRange = (range: HTMLInputElement | null, audio: HTMLAudioElement | null) => {
	if (range && audio) {
		range.value = (100 * (Math.floor(audio.currentTime) / Math.floor(audio.duration))).toString();;
		const value: number = Number(range.value);
		const min: number = Number(range.min ? range.min : 0);
		const max: number = Number(range.max ? range.max : 100);
		const percentage: number = (value - min) / (max - min) * 100;
		range.style.background = `linear-gradient(to right, #FFFFFF ${percentage}%, #292929 ${percentage}%)`;
	}
}