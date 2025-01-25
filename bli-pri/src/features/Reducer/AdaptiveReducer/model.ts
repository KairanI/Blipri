import { IActionAdaptive, IAdaptiveSettings } from "../../../shared/Types/interface";

export const AdaptiveReducer = (settings: IAdaptiveSettings, action: IActionAdaptive): IAdaptiveSettings => {
	switch (action.type) {
		case 'IsPadEdit': {
			return { ...settings, isPad: action.boolean };
		}
		case 'IsMobileEdit': {
			return { ...settings, isMobile: action.boolean };
		}
		default: {
			return settings;
		}
	}
}