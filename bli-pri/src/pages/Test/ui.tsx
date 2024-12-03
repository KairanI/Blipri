import { FC, useCallback, useContext, useEffect } from "react"
import '../../index.css'
import { FocusContext, FocusDispatchContext } from "../../app/model/Context"
import { useMouse } from "./model/useMouse"

import { Typing } from "../../widgets/Typing"
import { HighElements } from "./ui/HighElemts"
import { LowElements } from "./ui/LowElements"
import { HotKeysTest } from "../../entities/hotkeys/hotkeysTest"


export const PageTest: FC = () => {
	const focusSettings = useContext(FocusContext);
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
			<HighElements />
			<Typing />
			<LowElements />
			<HotKeysTest />
		</>
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