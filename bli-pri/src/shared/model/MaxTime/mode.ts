import { contents, durationTime } from "../../lib/constant";

export const maxTime = () => {
	const audio = new Audio(contents.path);

	audio.addEventListener('loadedmetadata', () => {
		const time: number = Math.floor(audio.duration);
		const timerDuration: HTMLElement | null = document.getElementById('timerDuration');

		if (time < 60) {
			durationTime.second = time;
			durationTime.minute = 0;
		} else {
			durationTime.second = time % 60;
			durationTime.minute = Math.floor(time / 60);
		}

		const durationText: string = `0${durationTime.minute}:${durationTime.second > 9 ? durationTime.second : '0' + durationTime.second}`;
		if (timerDuration) timerDuration.textContent = durationText;
	});

	audio.load();
}