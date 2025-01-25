import { FC, useContext } from "react";
import { AdaptiveContext, FocusContext, TextContext } from "../../app/model/Context";
import { words } from "../../shared/lib/constant";

export const WordsCount: FC = () => {
	const focusSettings = useContext(FocusContext);
	const textSettings = useContext(TextContext);
	const adaptiveSettings = useContext(AdaptiveContext);

	return (
		<div id="wordsCount" className={`flex absolute bottom-[130px] ${adaptiveSettings?.isMobile ? 'text-[24px] gap-[10px]' : 'text-[32px] gap-[15px]'}`}>
			{textSettings?.mode == 'dictation' && (
				<div id="timer" className={'font-inter-medium text-grey-80 flex timerActive'}>
					<span id="timerCurrect" className="flex-center-center">00:00</span>
					/
					<span id="timerDuration" className="flex-center-center">00:00</span>
				</div>
			)}
			<span className={`transition-all text-yellow font-inter-medium ${focusSettings && !focusSettings.activeTest ? ' opacity-0' : ''}`}>
				{words.finish}{words.end == 0 || textSettings?.mode == 'zen' ? '' : `/${words.end}`}
			</span>
		</div>
	)
}