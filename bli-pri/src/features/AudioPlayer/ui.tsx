import { useContext, useEffect, useRef, useState } from "react";
import { TextContext } from "../../pages/Test/model/Context";
import { updateRange } from "./mode";
import { useImmer } from "use-immer";
import { controllers, durationTime, interval, ITimer, TypeAudioPlayer } from "./lib/constants";

export const AudioPlayer: TypeAudioPlayer = ({ className, classTimer }) => {
	const textSettings = useContext(TextContext);
	const [play, setPlay] = useState<boolean>(false);
	const [timer, setTimer] = useImmer<ITimer>({
		minute: 0,
		second: 0,
	})
	const inputAudioRef = useRef<HTMLInputElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	const maxTime: number = Math.floor(audioRef.current?.duration as number);
	if (maxTime < 60) {
		durationTime.second = maxTime;
		durationTime.minute = 0;
	} else {
		durationTime.second = maxTime % 60;
		durationTime.minute = Math.floor(maxTime / 60);
	}

	useEffect(() => {
		const handleKey = (e: KeyboardEvent): void => {
			if (e.key == 'ArrowLeft') {
				audioRef.current?.pause();
				audioRef.current!.currentTime -= 5
				controllers.arrow = false;

				if (controllers.inputRange) updateRange(inputAudioRef.current, audioRef.current);
			}
			else if (e.key == 'ArrowRight') {
				audioRef.current?.pause();
				audioRef.current!.currentTime += 5
				controllers.arrow = false;

				if (controllers.inputRange) updateRange(inputAudioRef.current, audioRef.current);
			};


			if (e.shiftKey && e.key == ' ') {
				if (!play) {
					setPlay(true);
					controllers.stop = true;
					audioRef.current?.play();
				}
				else if (play) {
					setPlay(false);
					controllers.stop = false;
					audioRef.current?.pause();
				}
			}
		}

		const handleKeyUp = () => {
			if (controllers.arrow == false) {
				if (controllers.stop == true) {
					const audio = document.getElementById('audio-line') as HTMLAudioElement;
					audio.play();
				}
				controllers.arrow = true;
			}
		}

		if (textSettings?.mode == 'dictation') window.addEventListener("keyup", handleKeyUp);
		else if (textSettings?.mode != 'dictation') window.removeEventListener("keyup", handleKeyUp);
		if (textSettings?.mode == 'dictation') window.addEventListener("keydown", handleKey);
		else if (textSettings?.mode != 'dictation') window.removeEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [textSettings?.mode, play])

	useEffect(() => {
		const audioInput = document.getElementById('audio-input') as HTMLInputElement;

		function updateRange() {
			if (audioInput) {
				const value: number = Number(audioInput.value);
				const min: number = Number(audioInput.min ? audioInput.min : 0);
				const max: number = Number(audioInput.max ? audioInput.max : 100);
				const percentage: number = (value - min) / (max - min) * 100;

				audioInput.style.background = `linear-gradient(to right, #FFFFFF ${percentage}%, #292929 ${percentage}%)`;

				setTimer(draft => {
					const currentTime = Math.floor(Math.floor(audioRef.current!.duration) * (parseFloat(inputAudioRef.current!.value) / 100));
					if (currentTime < 60) {
						draft.second = currentTime;
						draft.minute = 0;
					} else {
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
			audioInput?.removeEventListener('input', updateRange);
		})
	}, [textSettings?.mode])

	const handleClickPlay = () => {
		audioRef.current?.play();
		setPlay(true);
		controllers.stop = true;

		interval.audio = setInterval(() => {
			if (controllers.inputRange) {
				updateRange(inputAudioRef.current, audioRef.current);

				if (audioRef.current!.currentTime == audioRef.current!.duration) {
					audioRef.current?.pause();
					setPlay(false);
				}
			}
		}, 100);

		interval.timer = setInterval(() => {
			if (controllers.inputRange && controllers.arrow) {
				setTimer(draft => {
					const currentTime = Math.floor(audioRef.current!.currentTime);
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

	return (
		<>
			<div className={'w-[319px] h-[60px] rounded-[15px] bg-block-black shadow-block flex flex-row pr-[30px] pl-[10px] flex-center-center absolute left-[50.9vw]' + ' ' + className}>
				{play ? (
					<div
						className='flex-center-center flex-row w-[47px] h-[47px] cursor-pointer'
						onClick={() => {
							audioRef.current?.pause();
							setPlay(false);
							controllers.stop = false;
							clearInterval(interval.audio);
							clearInterval(interval.timer);
						}}
					>
						<div className="w-[3px] h-[15px] mr-[3px] bg-white"></div>
						<div className="w-[3px] h-[15px] ml-[3px] bg-white"></div>
					</div>
				) : (
					<div
						className="flex-center-center w-[47px] h-[47px] cursor-pointer"
						onClick={() => handleClickPlay()}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 12 15">
							<path fill="#fff" d="M11.5 6.634a1 1 0 0 1 0 1.732l-9.75 5.63a1 1 0 0 1-1.5-.867V1.871a1 1 0 0 1 1.5-.866l9.75 5.629Z" />
						</svg>
					</div>
				)}

				<input
					ref={inputAudioRef}
					id="audio-input"
					min='0'
					max='100'
					type="range"
					className="audio-line appearance-none w-[231px] h-[5px] rounded-[5px] cursor-pointer bg-black-grey outline-none"
					defaultValue={0}
					onMouseDown={() => controllers.inputRange = false}
					onMouseUp={() => {
						if (audioRef.current!.currentTime == audioRef.current!.duration) {
							audioRef.current?.pause();
							setPlay(false);
						}
						audioRef.current!.currentTime = Math.floor(audioRef.current!.duration) * (parseFloat(inputAudioRef.current!.value) / 100);
						controllers.inputRange = true;
					}}
				/>

				<audio id="audio-line" className="absolute top-64 invisible" ref={audioRef} controls>
					<source src="../../../src/assets/Eminem - Mockingbird.mp3" type="audio/mpeg" />
				</audio>
			</div>

			<div className={'font-inter-medium text-[32px] absolute left-[365px] top-[298px] text-grey-80 w-[300px] flex' + ' ' + classTimer}>
				<span className="w-[100px] flex-center-center">0{timer.minute}:{timer.second > 9 ? timer.second : '0' + timer.second}</span>
				/
				<span className="w-[100px] flex-center-center">0{durationTime.minute}:{durationTime.second > 9 ? durationTime.second : '0' + durationTime.second}</span>
			</div>
		</>
	)
}