import { FC, useContext } from "react"
import { SideBar } from "../../../widgets/sideBar"
import { WindowLanguage } from "../../../widgets/Window-language"
import { WindowLength } from "../../../widgets/Window-length"
import { FocusContext, TextContext } from "../../../app/model/Context"

export const HighElements: FC = () => {
	const textSettings = useContext(TextContext);
	const focusSettings = useContext(FocusContext);

	return (
		<div className='pt-[120px] select-none'>
			<SideBar />
			<div className={focusSettings?.activeTest ? 'opacity-0 transition-all' : 'transition-all'}>
				<div id="container-language">
					{textSettings?.mode == 'zen' ? (
						<div className="flex flex-row gap-[12px] m-auto w-[310px] h-[35px] font-inter-regular text-lg text-grey flex-center-center mt-[120px] tracking-[2px]">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<mask id="mask0_326_732" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
									<rect width="24" height="24" fill="#D9D9D9" />
								</mask>
								<g mask="url(#mask0_326_732)">
									<path d="M7 17H9V10H7V17ZM11 17H13V7H11V17ZM15 17H17V13H15V17ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill="#8F8F8F" />
								</g>
							</svg>
							shift + enter to finish zen
						</div>
					) : (
						<WindowLanguage />
					)}
				</div>

				<WindowLength />
			</div>
		</div>
	)
}