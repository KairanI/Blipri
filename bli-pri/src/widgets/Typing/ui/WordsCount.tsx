import { FC, useContext } from "react";
import { FocusContext, TextContext } from "../../../app/model/Context";
import { words } from "../../../shared/lib/constant";

export const WordsCount: FC = () => {
	const focusSettings = useContext(FocusContext);
	const textSettings = useContext(TextContext);

	return (
		<div className='text-[32px] flex absolute top-[300px] gap-[15px]'>
			{textSettings?.mode == 'dictation' && (
				<div id="timer" className={'font-inter-medium text-grey-80 flex timerActive'}>
					<span id="timerCurrect" className="w-[100px] flex-center-center">00:00</span>
					/
					<span id="timerDuration" className="w-[100px] flex-center-center">00:00</span>
				</div>
			)}
			<span className={`transition-all text-yellow font-inter-medium ${focusSettings && !focusSettings.activeTest ? ' opacity-0' : ''}`}>
				{words.finish}{words.end == 0 || textSettings?.mode == 'zen' ? '' : `/${words.end}`}
			</span>
		</div>
	)
}