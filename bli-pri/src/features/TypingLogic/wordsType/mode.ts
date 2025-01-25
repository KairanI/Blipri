import { Updater } from "use-immer"
import { ITextSettings, IType } from "../../../shared/Types/interface"
import { Dispatch, SetStateAction } from "react";
import { ban_keys, controllerText, dataChart, errorLetters, words } from "../../../shared/lib/constant";
import { createText } from "../../../shared/model/CreateText";
import { AnimateKey } from "../../../shared/model/AnimateKey";
import { calculationWPM } from "../../calculationWPM";

type TypeWordsType = ({type, setType, position, setPosition, key, code, textSettings} : {
		type: IType[], 
		setType: Updater<IType[]>, 
		position: number, 
		setPosition: Dispatch<SetStateAction<number>>,
		key: string,
		code: string,
		textSettings: ITextSettings
}) => void

export const wordsType: TypeWordsType = ({type, setType, position, setPosition, key, code, textSettings}) => {

	if (position < type.length || type.length == 0) {
		setType(drift => {
			if (key == drift[position].content) {
				if (key == ' ') {
					words.finish += 1;
					errorLetters.push(0);
				}
				drift[position].color = 'text-white';
				if (controllerText.req) {
					if (controllerText.deleteText == 0) controllerText.startPoint = position + 1
					else if (controllerText.deleteText > 0) setTimeout(() => controllerText.startPoint = position - controllerText.startPoint + 1, 200)

					controllerText.deleteText += 1;
					controllerText.req = false;
				}
				words.all += 1;
				words.letters += 1;
				AnimateKey('keybord-animate', code)
				setPosition(pos => pos + 1)
			}

			else if (key == 'Backspace' && position != 0) {
				if (drift[position - 1].color == 'text-white') words.letters -= 1;
				if (controllerText.req) controllerText.req = false;
				if (drift[position - 1].content == ' ') words.finish -= 1;
				if (drift[position - 1].color == 'text-black-red') {
					errorLetters[words.finish] -= 1;
					drift.splice(position - 1, 1)
				}
				else drift[position - 1].color = 'grey';
				setPosition(pos => pos - 1)
				if (position == controllerText.endPoint || position - 1 == controllerText.endPoint) {
					if (controllerText.deleteText != 0) controllerText.deleteText -= 1;
				}
			}

			else if (key != drift[position].content && drift[position].content == ' ' && ban_keys.includes(key) == false) {
				if (errorLetters[words.finish] == 8 || controllerText.req) return
				drift.splice(position, 0, { content: key, color: 'text-black-red' });
				AnimateKey('keybord-error', code)

				const [, raw]: [number, number] = calculationWPM('wpm');
				if (dataChart.length != 0) {
					dataChart[dataChart.length - 1].errors.error += 1;
					dataChart[dataChart.length - 1].errors.raw += raw;
				}

				errorLetters[words.finish] += 1;
				words.all += 1;
				words.errors += 1;
				setPosition(pos => pos + 1)
			}

			else if (key != drift[position].content && ban_keys.includes(key) == false && type.length + 1 > position) {
				drift[position].color = 'text-red';

				const [, raw]: [number, number] = calculationWPM('wpm');
				if (dataChart.length != 0) {
					dataChart[dataChart.length - 1].errors.error += 1;
					dataChart[dataChart.length - 1].errors.raw += raw;
				}

				words.all += 1;
				words.errors += 1;
				AnimateKey('keybord-error', code)
				setPosition(pos => pos + 1)
			}

			if (controllerText.deleteText == 2 && textSettings) {
				drift.splice(0, controllerText.startPoint);

				setPosition(pos => pos - controllerText.startPoint);
				controllerText.deleteText = 1;

				if (controllerText.numWords > 0) {
					let lengthText: number = 0
					if (controllerText.numWords < 10) lengthText = controllerText.numWords;
					else lengthText = 10;

					const content: IType[] = createText(textSettings, lengthText, false)
					for (let a = 0; a < content.length; a++) {
						drift.push(content[a]);
					}

					if (textSettings.lengthText != 0) controllerText.numWords -= lengthText;
				}
			}
		})
	}
}