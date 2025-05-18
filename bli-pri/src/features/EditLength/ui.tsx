import { FC, useEffect, useRef, useState } from "react";
import { ban_keys, controllerInput } from "../../shared/lib/constant";
import { useAnimate } from "../../shared/hooks/useAnimate";
import { useAppSelector } from '../../shared/hooks/useAppSelector'
import { useActions } from '../../shared/hooks/useActions'

export const EditLength: FC = () => {
	const focusSettings = useAppSelector(state => state.focusSettings);
	const textSettings = useAppSelector(state => state.textSettings);
	const { editLengthText, editLengthModal } = useActions();
	const [value, setValue] = useState<string>(String(textSettings?.lengthText));
	const [, startAnimate] = useAnimate();
	const inputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

	const editText = (): void => {
		const popUp = document.getElementById("pop-up-length");
		popUp?.classList.remove("pop-up-active");
		startAnimate(false, false);
		setTimeout(() => {
			editLengthModal(false)
			editLengthText(Number(value))
			controllerInput.type = false;
		}, 100);
	};

	useEffect(() => {
		const keyEvent = (e: KeyboardEvent): void => {
			if (e.code === "Enter") editText();
			else if (controllerInput.type) {
				if (e.key == "Backspace" || ban_keys.includes(e.key) == false) {
					setValue("");
					controllerInput.type = false;
				}
			}
		};

		if (focusSettings?.activeModalLength) window.addEventListener("keydown", keyEvent);

		if (controllerInput.type) {
			inputRef.current?.focus();
			const range = document.createRange();
			const select = window.getSelection();
			range.selectNode(inputRef.current ?? document.body);
			select?.removeAllRanges();
			select?.addRange(range);
		}

		return () => {
			if (focusSettings?.activeModalLength) window.removeEventListener("keydown", keyEvent);
		};
	}, [focusSettings?.activeModalLength, value]);

	return (
		<>
			<span className="font-inter-regular text-grey text-2xl tracking-wider">Custom words amount</span>
			<div className="flex gap-[20px]">
				<input
					ref={inputRef}
					id="inputLength"
					value={value}
					type="number"
					className="w-[280px] min-w-[100px] h-[40px] rounded-[10px] pl-[15px] text-white bg-block-black font-inter-regular focus:outline-input"
					onChange={(e) => setValue(e.target.value)}
				/>
				<button
					className="min-w-[96px] h-[40px] rounded-[10px] text-white bg-block-black font-inter-regular tracking-wider hover:bg-hover-pop-up hover:text-black transition-colors"
					onClick={() => {
						setValue(String(Math.floor(Math.random() * 100)));
						controllerInput.type = false;
					}}
					onMouseDown={(e) => e.preventDefault()}
				>
					random
				</button>
			</div>
			<p className="text-white font-inter-regular text-sm tracking-wider">
				You can start an infinite test by entering 0. Then to stop the test press{" "}
				<span className="font-jetBrainsMono-medium text-black bg-word rounded-[5px] px-[4px]">shift</span> +{" "}
				<span className="font-jetBrainsMono-medium text-black bg-word rounded-[5px] px-[4px]">enter</span>
			</p>
			<button
				className="bg-block-black max-w-[410px] h-[40px] font-inter-regular tracking-wider rounded-[10px] text-white hover:bg-hover-pop-up hover:text-black transition-colors"
				onClick={() => editText()}
				onKeyDown={(e) => {
					if (e.code === "Space") e.preventDefault();
				}}
				onMouseDown={(e) => e.preventDefault()}
			>
				ok
			</button>
		</>
	);
};
