import { updateRange } from "../../../shared/model/UpdateRange";
import { controllers } from "../lib/constants";

type TypeArrowDown = ({ stateArrow, range, audio } : {
	stateArrow: string,
	range: HTMLInputElement | null,
	audio: HTMLAudioElement | null
}) => void;

export const arrowDown: TypeArrowDown = ({ stateArrow, range, audio }) => {
	if (stateArrow == 'ArrowLeft' && range && audio) {
		audio.pause();
		audio.currentTime -= 5
		controllers.arrow = false;

		if (controllers.inputRange) updateRange(range, audio);
	}
	else if (stateArrow == 'ArrowRight' && range && audio) {
		audio.pause();
		audio.currentTime += 5
		controllers.arrow = false;

		if (controllers.inputRange) updateRange(range, audio);
	};
}