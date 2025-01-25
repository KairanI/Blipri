import { controllers } from "../../lib/constants";

type TypeAudioInput = ({ inputAudioRef, audio, setPlay }: {
	inputAudioRef: React.RefObject<HTMLInputElement>,
	audio: HTMLAudioElement | null,
	setPlay: () => void;
}) => JSX.Element

export const AudioInput: TypeAudioInput = ({ inputAudioRef, audio, setPlay }) => {
	return (
		<input
			ref={inputAudioRef}
			id="audio-input"
			min='0'
			max='100'
			type="range"
			className="audio-line appearance-none w-[231px] h-[5px] max-tOne:max-w-[201px] max-tTwo:max-w-[171px] max-tTwo:max-h-[4px] max-tThree:w-[211px] max-tThree:max-h-[5px] rounded-[5px] cursor-pointer bg-black-grey outline-none"
			defaultValue={0}
			onMouseDown={() => controllers.inputRange = false}
			onMouseUp={() => {
				if (audio!.currentTime == audio!.duration) {
					audio?.pause();
					setPlay();
				}
				audio!.currentTime = audio!.duration * parseFloat(inputAudioRef.current!.value) / 100;
				controllers.inputRange = true;
			}}
			onTouchStart={() => controllers.inputRange = false}
			onTouchEnd={() => {
				if (audio!.currentTime == audio!.duration) {
					audio?.pause();
					setPlay();
				}
				audio!.currentTime = audio!.duration * parseFloat(inputAudioRef.current!.value) / 100;
				controllers.inputRange = true;
			}}
		/>
	)
}