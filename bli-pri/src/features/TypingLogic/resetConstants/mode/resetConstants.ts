import { createText } from "../../../../shared/model/CreateText";
import { IType } from "../../../../shared/Types/interface";
import { contents, controllerText, errorLetters, timerTyping, words } from "../../../../shared/lib/constant";
import textsData from "../../../../shared/lib/texts.json";
import { deletePunctuation } from "./deletePunctuation";
import { maxTime } from "../../../../shared/model/MaxTime";
import { ITexts, TypeResetConstants } from "../lib/constants";

const texts: ITexts = textsData;
let lastAudioID: number = 0;

export const resetConstants: TypeResetConstants = ({ setType, setPosition, textSettings }) => {

	if (textSettings && textSettings.lengthText || textSettings?.lengthText == 0) {
		let lengthText: number = 0;
		if (textSettings.lengthText > 25 || textSettings.lengthText == 0) lengthText = 30;
		else lengthText = textSettings.lengthText;

		const content: IType[] = createText(textSettings, lengthText, true);
		if (textSettings.lengthText !== undefined && textSettings.mode == 'words') words.end = textSettings.lengthText;
		else if (textSettings.mode == 'zen') words.end = -1;
		else if (textSettings.mode == 'dictation') {
			let numberText: number = Math.floor(Math.random() * 100 / 20) + 1;
			if (numberText == lastAudioID) {
				for (let a = 0; numberText == lastAudioID; a++) {
					numberText = Math.floor(Math.random() * 100 / 20) + 1;
				}
			}
			lastAudioID = numberText;

			if (textSettings.lengthText == 10) {
				contents.dictation = texts[1][numberText - 1]
				contents.path = `../../../src/assets/audio/1Audio/1.${numberText}.mp3`
			}
			else if (textSettings.lengthText == 25) {
				contents.dictation = texts[2][numberText - 1]
				contents.path = `../../../src/assets/audio/2Audio/2.${numberText}.mp3`
			}
			else if (textSettings.lengthText == 50) {
				contents.dictation = texts[3][numberText - 1]
				contents.path = `../../../src/assets/audio/3Audio/3.${numberText}.mp3`
			}
			else if (textSettings.lengthText == 100) {
				contents.dictation = texts[4][numberText - 1]
				contents.path = `../../../src/assets/audio/4Audio/4.${numberText}.mp3`
			}
			maxTime();
			if (!textSettings.punctuation) contents.dictation = deletePunctuation();
			words.end = contents.dictation.split(' ').length + 1;
		}

	
		words.errors = 0;
		words.all = 0;
		words.letters = 0;
		words.finish = 0;
		errorLetters.length = 0;
		controllerText.deleteText = 0;
		controllerText.endPoint = 0;
		controllerText.oneStartPoint = 0;
		if (textSettings.lengthText != 0) controllerText.numWords = textSettings.lengthText - 30;
		else controllerText.numWords = 10;
		controllerText.req = false;
		controllerText.oneStartPoint = 0;
		controllerText.startPoint = 0;
		timerTyping.second = 0;
		errorLetters.push(0)
		setPosition(0)

		setType(drift => {
			drift.length = 0;
			if (textSettings.mode == 'words') {
				for (let a = 0; a < content.length; a++) {
					drift.push(content[a]);
				}
			}
		})
	}
}