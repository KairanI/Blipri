import { useEffect } from "react";
import { interval, TypeAudioLine } from "../../lib/constants";
import { contents } from "../../../../shared/lib/constant";

export const AudioLine: TypeAudioLine = ({ audioRef, setPlay }) => {
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = contents.path;
			audioRef.current.load();

			const inputAudio: HTMLInputElement | null = document.getElementById('audio-input') as HTMLInputElement;
			inputAudio.value = "0";
			inputAudio!.style.background = `linear-gradient(to right, #FFFFFF ${0}%, #292929 ${0}%)`;

			clearInterval(interval.audio);
			clearInterval(interval.timer);
			setPlay();
		}
	}, [contents.path]);

	return (
		<audio id="audio-line" className="absolute top-64 invisible" ref={audioRef} defaultValue={0} controls>
			<source src={contents.path} type="audio/mpeg" />
		</audio>
	)
}