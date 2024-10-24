import { FC, useContext, useEffect, useRef } from "react";
import { useType } from "./model/useType"
import { words } from "../../shared/lib/constant";
import { FocusContext } from "../../pages/Test";
import { TextContext } from "../../pages/Test/model/Context";

export const Typing: FC = () => {
	const focusSettings = useContext(FocusContext);
	const textSettings = useContext(TextContext);
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
	}, [focusSettings])
	
	return (
		<>
			<div id="test-text" className='font-jetBrainsMono-medium tracking-[2px] leading-[43px] text-grey text-[28px] w-[1184px] h-[132px] m-auto mt-[15px] flex flex-col select-none'>
				<span className={focusSettings && focusSettings.activeTest ? 'transition-all text-yellow font-inter-medium text-[32px] absolute top-[300px]' : 'transition-all top-[300px] opacity-0 text-[32px] font-inter-regular absolute'}>{words.finish}{words.end == 0 || textSettings?.mode == 'zen' ? '' : `/${words.end}`}</span>
				<div className="w-[1184px]">
					{Array.isArray(type) && type.map((types, index) => (
						<span className={types.color} key={types.content + index} id={String(index)}>{types.content}</span>
					))}
				</div>
			</div>
			<div id="caretka" ref={caretkaRef} className="w-[16px] h-[3px] left-[368px] top-[387px] transition-all rounded-[12px] bg-white absolute"></div>
		</>
	)
}


