import { FC, useEffect, useRef } from "react";
import { useType } from "../model/useType";
import { WordsCount } from "../../../entities/WordsCount";
import { useAppSelector } from '../../../shared/hooks/useAppSelector'

export const Typing: FC = () => {
	const focusSettings = useAppSelector(state => state.focusSettings);
	const caretkaRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [type] = useType();

	useEffect(() => {
		const testText: HTMLElement | null = document.getElementById('test-text');
		testText?.classList.add('hideTest');
		setTimeout(() => {
			testText?.classList.remove('hideTest');
			testText?.classList.add('showTest');
		}, 10)
	}, [])

	useEffect(() => {
		if (focusSettings && focusSettings.activeCaretka == true) caretkaRef.current?.classList.add('caretka-blink');
		return (() => caretkaRef.current?.classList.remove('caretka-blink'))
	}, [focusSettings]);

	return (
		<>
			<div
				id="test-text"
				className='font-jetBrainsMono-medium tracking-[2px] leading-[43px] text-grey text-[28px] w-[1184px] max-tThree:w-[80vw] max-tTwo:w-[600px] max-tOne:w-[851px] max-h-[132px] pt-[10px] m-auto flex flex-col select-none relative'
				onClick={() => inputRef.current?.focus()}
			>
				<input ref={inputRef} className="absolute z-1 selection:bg-opacity-color cursor-default w-[0px]" />
				<WordsCount />
				<div className="h-[132px] overflow-clip break-words relative z-[4]">
					{Array.isArray(type) && type.map((types, index) => (
						<span className={types.color} key={types.content + index} id={String(index)}>{types.content}</span>
					))}
				</div>
				<div id="caretka" ref={caretkaRef} className="w-[16px] h-[3px] left-[0px] top-[10px] mt-[37px] transition-all rounded-[12px] bg-white absolute"></div>
			</div>
		</>
	)
}