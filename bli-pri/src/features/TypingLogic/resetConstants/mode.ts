import { Dispatch, SetStateAction } from "react";
import { ITextSettings, IType } from "../../../shared/Types/interface";
import { createText } from "../../../shared/model/CreateText";
import { controllerText, errorLetters, transfer, words } from "../../../shared/lib/constant";
import { Updater } from "use-immer";

type TypeResetConstants = ({setType, setPosition, textSettings} : {
	setType: Updater<IType[]>,  
	setPosition: Dispatch<SetStateAction<number>>,
	textSettings: ITextSettings | null
}) => void

export const resetConstants: TypeResetConstants = ({setType, setPosition, textSettings}) => {

	if (textSettings && textSettings.lengthText || textSettings?.lengthText == 0) {
		let lengthText: number = 0;
		if (textSettings.lengthText > 25 || textSettings.lengthText == 0) lengthText = 30;
		else lengthText = textSettings.lengthText;

		const content: IType[] = createText(textSettings, lengthText, true);
		if (textSettings.lengthText !== undefined) words.end = textSettings.lengthText;

		words.finish = 0;
		errorLetters.length = 0;
		controllerText.deleteText = 0;
		controllerText.endPoint = 0;
		transfer.controller = 0;
		controllerText.oneStartPoint = 0;
		if (textSettings.lengthText != 0) controllerText.numWords = textSettings.lengthText - 30;
		else controllerText.numWords = 10;
		controllerText.req = false;
		controllerText.oneStartPoint = 0;
		controllerText.startPoint = 0;
		errorLetters.push(0)
		setPosition(0)

		setType(drift => {
			drift.length = 0;
			if (textSettings.mode == 'words') {
				for (let a = 0; a < content.length; a++) {
					drift.push(content[a]);
				}
			}
			// else if (textSettings.mode == 'zen' || textSettings.mode == 'dictation') {
			// 	drift.push({ content: ' ', color: 'opacityElement' })
			// 	drift.push({ content: 'a', color: 'opacityElement' })
			// }
		})
	}
}