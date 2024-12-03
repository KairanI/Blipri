import { controllers } from "../lib/constants";

export const arrowUp = (play: boolean) => {
	if (controllers.arrow == false) {
		if (controllers.stop == true) {
			const audio = document.getElementById('audio-line') as HTMLAudioElement;
			if (!play) audio.play();
		}
		controllers.arrow = true;
	}
}