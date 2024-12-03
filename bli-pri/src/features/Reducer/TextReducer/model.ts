import { IActionText, ITextSettings } from "../../../shared/Types/interface";

export const TextReducer = (settings: ITextSettings, action: IActionText) => {
	switch (action.type) {
		case 'PunctuationEdit': {
			return  { ...settings, punctuation: action.boolean };
		}
		case 'NumberEdit': {
			return { ...settings, number: action.boolean };
		}
		case 'LengthTextEdit': {
			return { ...settings, lengthText: action.number };
		}
		case 'LanguageEdit': {
			return  { ...settings, language: action.string };
		}
		case 'RestartEdit': {
			return  { ...settings, restart: action.number };
		}
		case 'ModeEdit': {
			return  { ...settings, mode: action.string };
		}
		case 'PageEdit': {
			return  { ...settings, page: action.string };
		}
		default: {
			return settings
		}
	}
}