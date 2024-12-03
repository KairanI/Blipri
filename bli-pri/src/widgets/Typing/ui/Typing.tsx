import { FC, useContext, useEffect, useRef } from "react";
import { FocusContext } from "../../../pages/Test";
import { useType } from "../model/useType";
import { WordsCount } from "./WordsCount";

export const Typing: FC = () => {
	const focusSettings = useContext(FocusContext);
	const caretkaRef = useRef<HTMLDivElement>(null);
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
		if (focusSettings && focusSettings.activeCaretka == true) caretkaRef.current?.classList.add('caretka-blink')
		return (() => caretkaRef.current?.classList.remove('caretka-blink'))
	}, [focusSettings]);

	return (
		<>
			<div id="test-text" className='font-jetBrainsMono-medium tracking-[2px] leading-[43px] text-grey text-[28px] w-[1184px] max-tTwo:max-w-[560px] max-tOne:max-w-[851px]  h-[132px] m-auto mt-[15px] flex flex-col select-none'>
				<WordsCount />
				<div>
					{Array.isArray(type) && type.map((types, index) => (
						<span className={types.color} key={types.content + index} id={String(index)}>{types.content}</span>
					))}
				</div>
			</div>
			<div id="caretka" ref={caretkaRef} className="w-[16px] h-[3px] left-[368px] top-[387px] transition-all rounded-[12px] bg-white absolute"></div>
		</>
	)
}