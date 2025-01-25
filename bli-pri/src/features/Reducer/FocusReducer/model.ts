import { IActionFocus, IfocusSettings } from "../../../shared/Types/interface";

export const FocusReducer = (settings: IfocusSettings, action: IActionFocus): IfocusSettings => {
	switch (action.type) {
		case 'SearchModalEdit': {
			return { ...settings, activeModalSearch: action.boolean };
		}
		case 'SideBarModalEdit': {
			return { ...settings, activeModalSideBar: action.boolean };
		}
		case 'LengthModalEdit': {
			return { ...settings, activeModalLength: action.boolean };
		}
		case 'TestEdit': {
			return { ...settings, activeTest: action.boolean };
		}
		case 'CaretkaEdit': {
			return { ...settings, activeCaretka: action.boolean };
		}
		default: {
			return settings;
		}
	}
}