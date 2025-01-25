import { FC, useContext } from "react"
import { WindowLanguage } from "../../../widgets/Window-language"
import { AdaptiveContext, FocusContext, TextContext, TextDispatchContext } from "../../../app/model/Context"
import { calculationWPM } from "../../../features/calculationWPM";
import { words } from "../../../shared/lib/constant";

export const HighElements: FC = () => {
	const textDispatch = useContext(TextDispatchContext);
	const textSettings = useContext(TextContext);
	const focusSettings = useContext(FocusContext);
	const adaptiveSettings = useContext(AdaptiveContext);

	return (
		<div id="container-language" className={focusSettings?.activeTest ? `${adaptiveSettings?.isMobile && textSettings?.mode == 'zen' ? '' : 'opacity-0 transition-all select-none'}` : 'transition-all select-none'}>
			{textSettings?.mode == 'zen' ? (
				<div 
					className={`flex flex-row gap-[12px] m-auto ${adaptiveSettings?.isMobile ? 'w-[170px] cursor-pointer hover:text-white transition group' : 'w-[310px]'} h-[35px] font-inter-regular text-lg text-grey flex-center-center tracking-[2px] select-none`}
					onClick={() => {
						if (adaptiveSettings?.isMobile) {
							calculationWPM('all');
							if (textDispatch) textDispatch({ type: 'PageEdit', string: 'Result' });
							words.end = words.finish;
						}
					}}
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<mask id="mask0_326_732" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
							<rect width="24" height="24" fill="#D9D9D9" />
						</mask>
						<g mask="url(#mask0_326_732)">
							<path className='group-hover:fill-white transition' d="M7 17H9V10H7V17ZM11 17H13V7H11V17ZM15 17H17V13H15V17ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill="#8F8F8F" />
						</g>
					</svg>
					{adaptiveSettings?.isMobile ? 'finish zen' : 'shift + enter to finish zen'}
				</div>
			) : (
				<WindowLanguage />
			)}
		</div>
	)
}