import { FC, useCallback, useContext, useEffect } from "react"
import { AdaptiveContext, FocusContext, FocusDispatchContext, TextContext } from "../../../app/model/Context"
import { useMouse } from "../model/useMouse"
import { Typing } from "../../../widgets/Typing"
import { HighElements } from "./HighElemts"
import { LowElements } from "./LowElements"
import { HotKeysTest } from "../../../entities/hotkeys/hotkeysTest"
import { SideBar } from "../../../widgets/sideBar"
import { WindowLength } from "../../../widgets/Window-length"
import '../../../index.css'


export const PageTest: FC = () => {
	const focusSettings = useContext(FocusContext);
	const adaptiveSettings = useContext(AdaptiveContext);
	const textSettings = useContext(TextContext);
	const focusDispatch = useContext(FocusDispatchContext);

	const callback = useCallback(() => {
		if (focusSettings?.activeTest == true && focusDispatch) {
			focusDispatch({ type: 'TestEdit', boolean: false });
			focusDispatch({ type: 'CaretkaEdit', boolean: true });
		}
	}, [focusSettings?.activeTest])
	const mouseMove = useMouse(callback, 1000);

	useEffect(() => {
		const body = document.getElementById("body")
		if (focusSettings?.activeTest == true) body?.classList.add('cursor-delete')

		return () => body?.classList.remove('cursor-delete')
	}, [focusSettings?.activeTest])

	useEffect(() => {
		window.addEventListener("pointermove", mouseMove)
		return () => window.removeEventListener("pointermove", mouseMove)
	}, [focusSettings?.activeTest])

	return (
		<>
			<div className={`select-none sideBar ${textSettings?.mode == 'dictation' ? 'max-tThree:pt-[70px] max-tThree:pb-[50px]' : ''}`}><SideBar /></div>
			<div className="h-[72vh] grid grid-rows-[auto_450px_auto] justify-center">
				<div className={adaptiveSettings?.isMobile ? 'self-center' : 'self-end'}><HighElements /></div>
				<div>
					<Typing />
					<LowElements />
				</div>
			</div>
			
			<WindowLength />
			{!adaptiveSettings?.isMobile && <HotKeysTest />}
		</>
	)
}
