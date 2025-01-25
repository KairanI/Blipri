import { IAdaptiveSettings, IfocusSettings } from "../../shared/Types/interface"

export const defaultFocusSettings: IfocusSettings = {
	activeTest: false,
	activeModalSearch: false,
	activeModalLength: false,
	activeModalSideBar: false,
	activeCaretka: true
}

export const defaultAdaptiveSettings: IAdaptiveSettings = {
	isPad: window.innerWidth <= 970,
	isMobile: window.innerWidth <= 760,
}

