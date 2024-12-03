import { useContext, useEffect, useRef, useState } from "react";
import { FocusDispatchContext, TextContext } from "../../../app/model/Context";
import { useImmer } from "use-immer";
import { controllers, interval, TypeAudioPlayer } from "../lib/constants";
import { arrowDown } from "../mode/arrowDown";
import { arrowUp } from "../mode/arrowUp";
import { handleClickPlay } from "../mode/handleClickPlay";
import { AudioLine } from "./AudioLine";
import { AudioInput } from "./AudioInput";
import { SvgPlayButton } from "./svgPlayButton";
import { ITimer } from "../../../shared/Types/interface";

let idTimeout: number = 0;

export const AudioPlayer: TypeAudioPlayer = ({ className, isMobile }) => {
	const textSettings = useContext(TextContext);
	const dispatchFocus = useContext(FocusDispatchContext);
	const [play, setPlay] = useState<boolean>(false);
	const [timer, setTimer] = useImmer<ITimer>({ minute: 0, second: 0 })
	const inputAudioRef = useRef<HTMLInputElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const timerCurrect: HTMLElement | null = document.getElementById('timerCurrect');
		const currectText: string = `0${timer.minute}:${timer.second > 9 ? timer.second : '0' + timer.second}`;
		if (timerCurrect) timerCurrect.textContent = currectText; 
	}, [timer])

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			arrowDown({ e, range: inputAudioRef.current, audio: audioRef.current });

			if (e.shiftKey && e.key == ' ') {
				if (!play && dispatchFocus) {
					if (audioRef.current?.duration == audioRef.current?.currentTime) {
						audioRef.current!.currentTime = 0;
						inputAudioRef.current!.value = "0";
						inputAudioRef.current!.style.background = `linear-gradient(to right, #FFFFFF ${0}%, #292929 ${0}%)`;
					}
					setPlay(true);
					dispatchFocus({ type: 'TestEdit', boolean: true });
					idTimeout = setTimeout(() => handleClickPlay({ range: inputAudioRef.current, audio: audioRef.current, setPlay, setTimer }), 2000);
				}

				else if (play) {
					audioRef.current?.pause();
					setPlay(false);
					controllers.stop = false;
					clearInterval(interval.audio);
					clearInterval(interval.timer);
					clearTimeout(idTimeout);
				}
			}
		}
		const handleKeyUp = () => arrowUp(play);

		if (textSettings?.mode == 'dictation') window.addEventListener("keyup", handleKeyUp);
		else if (textSettings?.mode != 'dictation') window.removeEventListener("keyup", handleKeyUp);
		if (textSettings?.mode == 'dictation') window.addEventListener("keydown", handleKey);
		else if (textSettings?.mode != 'dictation') window.removeEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [textSettings?.mode, play])

	useEffect(() => {
		const audioInput: HTMLInputElement = document.getElementById('audio-input') as HTMLInputElement;

		const updateRange = () => {
			if (audioInput) {
				const value: number = Number(audioInput.value);
				const min: number = Number(audioInput.min ? audioInput.min : 0);
				const max: number = Number(audioInput.max ? audioInput.max : 100);
				const percentage: number = (value - min) / (max - min) * 100;

				audioInput.style.background = `linear-gradient(to right, #FFFFFF ${percentage}%, #292929 ${percentage}%)`;

				setTimer(draft => {
					const currentTime = Math.floor(Math.floor(audioRef.current!.duration) * (parseFloat(inputAudioRef.current!.value) / 100));
					if (currentTime < 60 && !isNaN(currentTime)) {
						draft.second = currentTime;
						draft.minute = 0;
					} else if (!isNaN(currentTime)) {
						draft.second = currentTime % 60;
						draft.minute = Math.floor(currentTime / 60);
					}
				})
			}
		}

		audioInput?.addEventListener('input', updateRange);
		updateRange();

		return (() => {
			clearInterval(interval.audio);
			clearInterval(interval.timer);
			clearTimeout(idTimeout);
			audioInput?.removeEventListener('input', updateRange);
		})
	}, [textSettings?.mode])

	return (
		<>
			<div className={'w-[319px] max-tOne:max-w-[268px] max-tTwo:max-w-[221px] max-tTwo:max-h-[50px] pr-[15px] pl-[5px] h-[60px] rounded-[15px] bg-block-black shadow-block flex flex-row flex-center-center absolute left-[50.9vw] max-tOne:left-[52.5vw] max-tTwo:left-[53vw]' + ' ' + className}>
				{play ? (
					<div
						className='flex-center-center flex-row w-[47px] h-[47px] gap-[5px] max-tTwo:gap-[4px] cursor-pointer'
						onClick={() => {
							audioRef.current?.pause();
							setPlay(false);
							controllers.stop = false;
							clearInterval(interval.audio);
							clearInterval(interval.timer);
							clearTimeout(idTimeout);
						}}
					>
						<div className="w-[3px] h-[15px] max-tTwo:max-w-[2px] max-tTwo:max-h-3 bg-white"></div>
						<div className="w-[3px] h-[15px] max-tTwo:max-w-[2px] max-tTwo:max-h-3 bg-white"></div>
					</div>
				) : (
					<div
						className="flex-center-center w-[47px] h-[47px] cursor-pointer"
						onClick={() => {
							setPlay(true);
							handleClickPlay({ range: inputAudioRef.current, audio: audioRef.current, setPlay, setTimer })
						}
						}
					> 
						<SvgPlayButton isMobile={isMobile} />
					</div>
				)}

				<AudioInput inputAudioRef={inputAudioRef} audio={audioRef.current} setPlay={() => setPlay(false)} />
				<AudioLine audioRef={audioRef} setPlay={() => setPlay(false)} />
			</div>
		</>
	)
}