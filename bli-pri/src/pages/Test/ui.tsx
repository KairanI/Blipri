import { FC, useCallback, useEffect, useReducer } from "react"
import { WindowLanguage } from "../../widgets/Window-language"
import { KeyBoard } from "../../entities/keyboard"
import '../../index.css'
import { FocusContext, FocusDispatchContext, TextContext, TextDispatchContext } from "./model/Context"
import { FocusReducer } from "../../features/Reducer/FocusReducer"
import { defaultFocusSettings } from "./lib/constants"
import { TextReducer } from "../../features/Reducer/TextReducer"
import { defaultTextSettings } from "../../shared/lib/constant"
import { useMouse } from "./model/useMouse"
import { WindowLength } from "../../widgets/Window-length"
import { useAnimate } from "../../shared/model/hooks"
import { SideBar } from "../../widgets/sideBar"
import { HotKeys } from "../../entities/hotkeys"
import { Typing } from "../../widgets/Typing"

export const PageTest: FC = () => {
	const [focusSettings, focusDispatch] = useReducer(FocusReducer, defaultFocusSettings);
	const [textSettings, textDispatch] = useReducer(TextReducer, defaultTextSettings);
	const [isAnimating, startAnimate] = useAnimate();

	const callback = useCallback(() => {
			if (focusSettings.activeTest == true) {
				focusDispatch({ type: 'TestEdit', boolean: false })
				focusDispatch({ type: 'CaretkaEdit', boolean: true })
			}
	}, [focusSettings.activeTest])
	const mouseMove = useMouse(callback, 1000)

	useEffect(() => {
		const body = document.getElementById("body")
		if (focusSettings.activeTest == true) body?.classList.add('cursor-delete')

		return () => body?.classList.remove('cursor-delete')
	}, [focusSettings.activeTest])

	useEffect(() => {
		window.addEventListener("pointermove", mouseMove)
		return () => window.removeEventListener("pointermove", mouseMove)
	}, [focusSettings.activeTest])

	return (
		<FocusContext.Provider value={focusSettings}>
			<FocusDispatchContext.Provider value={focusDispatch}>

				<TextContext.Provider value={textSettings}>
					<TextDispatchContext.Provider value={textDispatch}>
						<div className='pt-[120px] select-none'>
							<SideBar />
							<div className={focusSettings.activeTest ? 'opacity-0 transition-all' : 'transition-all'}>
								<div id="container-language">
									{textSettings.mode == 'zen' ? (
										<div className="flex flex-row gap-[12px] m-auto w-[310px] h-[35px] font-inter-regular text-lg text-grey flex-center-center mt-[120px] tracking-[2px]">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<mask id="mask0_326_732" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
													<rect width="24" height="24" fill="#D9D9D9"/>
												</mask>
												<g mask="url(#mask0_326_732)">
													<path d="M7 17H9V10H7V17ZM11 17H13V7H11V17ZM15 17H17V13H15V17ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill="#8F8F8F"/>
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
						<Typing />
						<div className="w-[1184px] h-[350px] bg-pop-up m-auto relative ">
							<KeyBoard />
							<div className='mt-[30px] w-14 h-14 m-auto flex-center-center group cursor-pointer' 
								onClick={() => {
									if (!isAnimating) {
										startAnimate(false);
										setTimeout(() => {
											if (textSettings.restart != undefined) {
												const sumRestart = textSettings.restart + 1;
												textDispatch({type: 'RestartEdit', number: sumRestart})
											}
										}, 100)
									}
								}}
							>
								<svg className='group-hover:scale-105 transition' width="47" height="46" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="47" height="46">
										<path className='group-hover:fill-white transition-colors' transform="rotate(45 23.19 .026)" fill="#D9D9D9" d="M23.189.026h32.42v32.42h-32.42z" /></mask><g mask="url(#a)">
										<path className='group-hover:fill-white transition-colors' d="M13.686 34.31c-1.687-2.166-2.443-4.602-2.268-7.308.175-2.706 1.234-5.03 3.176-6.973a10.71 10.71 0 0 1 3.641-2.4c1.377-.549 2.806-.8 4.287-.752V19.6a7.612 7.612 0 0 0-3.26.513 8.066 8.066 0 0 0-2.758 1.827c-1.4 1.4-2.193 3.084-2.376 5.05-.183 1.966.306 3.77 1.469 5.409l-1.91 1.91zm1.91 1.91 1.911-1.91c1.64 1.13 3.443 1.611 5.409 1.444 1.966-.167 3.65-.951 5.05-2.352 1.592-1.592 2.388-3.503 2.388-5.731 0-2.229-.796-4.14-2.388-5.731l-.072-.072v2.102H25.22v-6.687h6.686v2.675h-2.101l.072.071c2.133 2.134 3.2 4.68 3.2 7.642 0 2.96-1.067 5.508-3.2 7.641-1.927 1.926-4.243 2.977-6.95 3.152-2.706.175-5.15-.573-7.33-2.244z" fill="#8F8F8F" /></g>
								</svg>
							</div>
						</div>

						<HotKeys />
				
					</TextDispatchContext.Provider>
				</TextContext.Provider>

			</FocusDispatchContext.Provider>
		</FocusContext.Provider>
	)
}


// 1. От 20 до 30 слов
// 2. От 31 до 75 слов
// 3. От 76 до 125 слов
// 4. От 126 до 200 слов

// На 1 уровень 20 цитат
// На 2 уровень 20 цитат
// На 3 уровень 10 цитат

// На не попялрные языки 
// По 3 цитаты на уровень