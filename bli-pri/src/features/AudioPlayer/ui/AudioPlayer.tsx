import { useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { controllers, interval, TypeAudioPlayer } from "../lib/constants";
import { arrowDown } from "../mode/arrowDown";
import { arrowUp } from "../mode/arrowUp";
import { handleClickPlay } from "../mode/handleClickPlay";
import { AudioLine } from "./AudioComponents/AudioLine";
import { AudioInput } from "./AudioComponents/AudioInput";
import { ITimer } from "../../../shared/Types/interface";
import { PlayStopButton } from "./AudioComponents/PlayStopButton";
import { useAppSelector } from '../../../shared/hooks/useAppSelector'
import { useActions } from '../../../shared/hooks/useActions'

export const AudioPlayer: TypeAudioPlayer = ({ className }) => {
	const textSettings = useAppSelector(state => state.textSettings);
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);
	const { editTest } = useActions();
	const [play, setPlay] = useState<boolean>(false);
	const [timer, setTimer] = useImmer<ITimer>({ minute: 0, second: 0 });
	const inputAudioRef = useRef<HTMLInputElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const timerCurrect: HTMLElement | null = document.getElementById('timerCurrect');
		const currectText: string = `0${timer.minute}:${timer.second > 9 ? timer.second : '0' + timer.second}`;
		if (timerCurrect) timerCurrect.textContent = currectText;
	}, [timer])

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			arrowDown({ stateArrow: e.key, range: inputAudioRef.current, audio: audioRef.current });

			if (e.shiftKey && e.key == ' ') {
				if (!play) {
					if (audioRef.current?.duration == audioRef.current?.currentTime) {
						audioRef.current!.currentTime = 0;
						inputAudioRef.current!.value = "0";
						inputAudioRef.current!.style.background = `linear-gradient(to right, #FFFFFF ${0}%, #292929 ${0}%)`;
					}
					setPlay(true);
					editTest(true);
					interval.timeout = setTimeout(() => handleClickPlay({ range: inputAudioRef.current, audio: audioRef.current, setPlay, setTimer }), 2000);
				}

				else if (play) {
					audioRef.current?.pause();
					setPlay(false);
					controllers.stop = false;
					clearInterval(interval.audio);
					clearInterval(interval.timer);
					clearTimeout(interval.timeout);
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
			clearTimeout(interval.timeout);
			audioInput?.removeEventListener('input', updateRange);
		})
	}, [textSettings?.mode])

	return (
		<>
			{adaptiveSettings?.isMobile ? (
				<div className="w-[211px] h-[52px] flex flex-col m-auto">
					<AudioInput inputAudioRef={inputAudioRef} audio={audioRef.current} setPlay={() => setPlay(false)} />
					<AudioLine audioRef={audioRef} setPlay={() => setPlay(false)} />
					<div className="flex-center-center gap-[15px] w-[95px] h-[24px] ml-[47px] mt-[18px]">
						<svg
							className="cursor-pointer" 
							onClick={() => {
								arrowDown({ stateArrow: 'ArrowLeft', range: inputAudioRef.current, audio: audioRef.current })
								if (audioRef.current) audioRef.current.play();
							}}
							xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
						>
							<mask id="a" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse"><path fill="#D9D9D9" d="M0 0h20v20H0z"/></mask>
							<g mask="url(#a)"><path fill="#fff" d="M4.52 15.667V4.333h2.626v11.334zm9.646 0L8.5 10l5.666-5.667L16 6.167 12.166 10 16 13.833z"/></g>
						</svg>
						<PlayStopButton play={play} range={inputAudioRef.current} audio={audioRef.current} setPlay={setPlay} setTimer={setTimer} />
						<svg 
							className="cursor-pointer" 
							onClick={() => {
								arrowDown({ stateArrow: 'ArrowRight', range: inputAudioRef.current, audio: audioRef.current });
								if (audioRef.current) audioRef.current.play();
							}}
							xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none"
						>
							<mask id="a" width="21" height="20" x="0" y="0" maskUnits="userSpaceOnUse"><path fill="#D9D9D9" d="M20.667 0h-20v20h20z"/></mask>
							<g mask="url(#a)"><path fill="#fff" d="M16.147 15.667V4.333h-2.625v11.334zm-9.646 0L12.167 10 6.501 4.333 4.667 6.167 8.501 10l-3.834 3.833z"/></g>
						</svg>
					</div>
				</div>
			) : (
				<div className={'w-[319px] max-tOne:max-w-[268px] max-tTwo:max-w-[221px] max-tTwo:max-h-[50px] pr-[15px] pl-[5px] h-[60px] rounded-[15px] bg-block-black shadow-block flex flex-row flex-center-center absolute left-[50.9vw] max-tOne:left-[52.5vw] max-tTwo:left-[53vw]' + ' ' + className}>
					<PlayStopButton play={play} range={inputAudioRef.current} audio={audioRef.current} setPlay={setPlay} setTimer={setTimer} />
					<AudioInput inputAudioRef={inputAudioRef} audio={audioRef.current} setPlay={() => setPlay(false)} />
					<AudioLine audioRef={audioRef} setPlay={() => setPlay(false)} />
				</div>
			)}
		</>
	)
}
