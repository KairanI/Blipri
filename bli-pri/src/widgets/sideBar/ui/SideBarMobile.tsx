import { TypeHandleFocusClik, TypeSideBarMobileComponent } from "../../../shared/Types/types";
import { SideBarWindow } from "../../../entities/sideBarMobile";
import { AudioPlayer } from "../../../features/AudioPlayer";
import { useAppSelector } from '../../../shared/hooks/useAppSelector'
import { useActions } from '../../../shared/hooks/useActions'

export const SideBarMobile: TypeSideBarMobileComponent = ({ handleClick, className }) => {
	const textSettings = useAppSelector(state => state.textSettings);
	const focusSettings = useAppSelector(state => state.focusSettings);
	const { editSideBarModal } = useActions();

	const handlePopUp: TypeHandleFocusClik = (type, payload) => {
		if (payload.boolean) {
			editSideBarModal(payload.boolean)
			setTimeout(() => {
				const popUp = document.getElementById('pop-up-sideBarMobile');
				popUp?.classList.add('pop-up-active');
			}, 10)
		} else if (!payload.boolean) {
			const popUp = document.getElementById('pop-up');
			popUp?.classList.remove('pop-up-active');
			setTimeout(() => 	editSideBarModal(payload.boolean), 70)
		}
	}

	return (
		<>
			{textSettings?.mode == 'dictation' ? (
				<div className="w-[271px] h-[74px] bg-block-black m-auto rounded-[7px] shadow-block px-[6px] pb-[6px] pt-[13px] flex">
					<div 
						onClick={() => {
							handlePopUp('SideBarModalEdit', { boolean: true });
						}}
						className="w-[24px] h-[24px] group flex-center-center self-end cursor-pointer"
					>
						<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path className='group-hover:fill-white transition' d="M13.4 6.147c-1.207 0-1.7-.854-1.1-1.9.347-.607.14-1.38-.466-1.727l-1.154-.66a1.113 1.113 0 0 0-1.52.4l-.073.127c-.6 1.046-1.587 1.046-2.193 0L6.82 2.26c-.3-.527-.98-.713-1.506-.4l-1.154.66a1.272 1.272 0 0 0-.467 1.733c.607 1.04.114 1.894-1.093 1.894a1.27 1.27 0 0 0-1.267 1.266v1.174A1.27 1.27 0 0 0 2.6 9.853c1.207 0 1.7.854 1.093 1.9-.346.607-.14 1.38.467 1.727l1.154.66a1.113 1.113 0 0 0 1.52-.4l.073-.127c.6-1.046 1.586-1.046 2.193 0l.074.127c.313.527.993.713 1.52.4l1.153-.66a1.266 1.266 0 0 0 .466-1.727c-.606-1.046-.113-1.9 1.094-1.9a1.27 1.27 0 0 0 1.267-1.266V7.413A1.28 1.28 0 0 0 13.4 6.147zM8 10.167A2.17 2.17 0 0 1 5.833 8 2.17 2.17 0 0 1 8 5.833 2.17 2.17 0 0 1 10.167 8 2.17 2.17 0 0 1 8 10.167z" fill="#8F8F8F"/>
						</svg>
					</div>
					<AudioPlayer className={className as string} />
				</div>
			)	: (
				<div
					className="w-[160px] h-[50px] bg-block-black flex-center-center tracking-[1px] gap-[8px] m-auto rounded-[10px] shadow-block text-grey-80 font-inter-medium text-[13px] group hover:text-black hover:bg-hover-pop-up transition-colors cursor-pointer mb-[15px]"
					onClick={() => {
						handlePopUp('SideBarModalEdit', { boolean: true });
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
						<path className='group-hover:fill-black transition' fill="#8F8F8F" fillOpacity=".8" d="M11.725 5.378c-1.056 0-1.487-.746-.962-1.662a1.106 1.106 0 0 0-.409-1.511l-1.009-.577a.974.974 0 0 0-1.33.35l-.064.11c-.525.916-1.388.916-1.92 0l-.063-.11a.957.957 0 0 0-1.319-.35l-1.009.577c-.53.303-.712.986-.408 1.517.53.91.099 1.656-.957 1.656-.607 0-1.108.496-1.108 1.109v1.026c0 .607.496 1.109 1.108 1.109 1.056 0 1.488.746.957 1.662a1.106 1.106 0 0 0 .408 1.511l1.01.578a.974.974 0 0 0 1.33-.35l.063-.111c.525-.916 1.389-.916 1.92 0l.064.11c.274.461.869.625 1.33.35l1.009-.577c.53-.303.712-.986.408-1.51-.53-.917-.099-1.663.957-1.663.607 0 1.108-.496 1.108-1.109V6.487a1.12 1.12 0 0 0-1.114-1.109M7 8.896A1.9 1.9 0 0 1 5.104 7 1.9 1.9 0 0 1 7 5.104 1.9 1.9 0 0 1 8.896 7 1.9 1.9 0 0 1 7 8.896" />
					</svg>
					test settings
				</div>
			)}
			
			{focusSettings?.activeModalSideBar && (
				<div id="pop-up-sideBarMobile" className='pop-up'
					onClick={() => handlePopUp('SideBarModalEdit', { boolean: false })}
				>
					<SideBarWindow handleClick={handleClick} handlePopUp={handlePopUp} />
				</div>
			)}
		</>
	)
}