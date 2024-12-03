import { updateRange } from "../../../shared/model/UpdateRange";
import { controllers } from "../lib/constants";

type typeArrowDown = ({ e, range, audio } : {
	e: KeyboardEvent,
	range: HTMLInputElement | null,
	audio: HTMLAudioElement | null
}) => void;

export const arrowDown: typeArrowDown = ({ e, range, audio }) => {
	if (e.key == 'ArrowLeft' && range && audio) {
		audio.pause();
		audio.currentTime -= 5
		controllers.arrow = false;

		if (controllers.inputRange) updateRange(range, audio);
	}
	else if (e.key == 'ArrowRight' && range && audio) {
		audio.pause();
		audio.currentTime += 5
		controllers.arrow = false;

		if (controllers.inputRange) updateRange(range, audio);
	};
}