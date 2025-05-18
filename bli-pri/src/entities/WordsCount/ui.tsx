import { FC } from "react";
import { words } from "../../shared/lib/constant";
import { useAppSelector } from '../../shared/hooks/useAppSelector'

export const WordsCount: FC = () => {
	const focusSettings = useAppSelector(state => state.focusSettings);
	const textSettings = useAppSelector(state => state.textSettings);
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);

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