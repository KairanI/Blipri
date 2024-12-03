import { updateRange } from "../../../shared/model/UpdateRange";
import { controllers, interval, ITimer } from "../lib/constants";
import { Updater } from "use-immer";

type typeHandleClickPlay = ({ range, audio, setPlay } : {
	range: HTMLInputElement | null,
	audio: HTMLAudioElement | null,
	setPlay: React.Dispatch<React.SetStateAction<boolean>>,
	setTimer: Updater<ITimer>
}) => void;

export const handleClickPlay: typeHandleClickPlay = ({ range, audio, setPlay, setTimer }) => {
	audio?.play();
	controllers.stop = true;

	interval.audio = setInterval(() => {
		if (controllers.inputRange) {
			updateRange(range, audio);

			if (audio!.currentTime == audio!.duration) {
				audio?.pause();
				setPlay(false);
				clearInterval(interval.audio);
			}
		}
	}, 100);

	interval.timer = setInterval(() => {
		if (controllers.inputRange && controllers.arrow) {
			setTimer(draft => {
				const currentTime = Math.floor(audio!.currentTime);
				if (currentTime < 60) {
					draft.second = currentTime;
					draft.minute = 0;
				} else {
					draft.second = currentTime % 60;
					draft.minute = Math.floor(currentTime / 60);
				}
			})
		}
	}, 1000)
}