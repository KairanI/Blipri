import { Updater } from "use-immer"
import { ITextSettings, IType } from "../../../shared/Types/interface"
import { Dispatch, SetStateAction } from "react";
import { ban_keys, contents, controllerText, dataChart, errorLetters, transfer, words } from "../../../shared/lib/constant";
import { AnimateKey } from "../../../shared/model/AnimateKey";
import { calculationWPM } from "../../calculationWPM";

type TypeDictationType = ({setType, position, setPosition, key, code, textSettings} : {
		setType: Updater<IType[]>, 
		position: number, 
		setPosition: Dispatch<SetStateAction<number>>,
		key: string,
		code: string,
		textSettings: ITextSettings
}) => void

export const dictationType: TypeDictationType = ({setType, position, setPosition, key, code }) => {

		setType(drift => {
			if (drift.length < contents.dictation.length) {
				if (key == ' ' && drift.length == 0) return
				if (key == ' ' && drift[position - 1].content == ' ') return

				if (key == 'Backspace' && position != 0) {
					if (drift[position - 1].color == 'text-white') words.letters -= 1;
					if (drift[position - 1].content == ' ') words.finish -= 1;
					else errorLetters[words.finish] -= 1;
					drift.splice(position - 1, 1)

					if (position == controllerText.endPoint) {
						if (controllerText.deleteText != 0) controllerText.deleteText -= 1;
					}
					
					setPosition(pos => pos - 1)
					AnimateKey('keybord-animate', code)
				}

				else if (ban_keys.includes(key) == false && key == contents.dictation[position]) {
					if (errorLetters[words.finish] == 29 && key != ' ') return
					if (key == ' ') {
						if (controllerText.deleteText == 0) controllerText.startPoint = position;

						words.finish += 1;
						errorLetters.push(0)
					}
					drift.splice(position, 0, { content: key, color: 'text-white' })
					if (key != '') errorLetters[words.finish] += 1;
					if (controllerText.req) {
						controllerText.deleteText += 1;
						controllerText.req = false;
					};

					if (controllerText.findSpace) {
						for (let i = 1; i < transfer.length; i++) {
							if (drift[position - i].content == ' ') {
								controllerText.startPoint = position - i;
								i = transfer.length;
							}
							else if (i == transfer.length - 1) controllerText.startPoint = transfer.length;
						}
						controllerText.findSpace = false;
					}

					words.all += 1;
					words.letters += 1;
					setPosition(pos => pos + 1)
					AnimateKey('keybord-animate', code)
				}

				else if (ban_keys.includes(key) == false && key != contents.dictation[position]) {
					if (errorLetters[words.finish] == 29 && key != ' ') return
					if (key == ' ') {
						if (controllerText.deleteText == 0) controllerText.startPoint = position;

						words.finish += 1;
						errorLetters.push(0)
					}
					drift.splice(position, 0, { content: key, color: 'text-red' })
					if (key != '') errorLetters[words.finish] += 1;
					if (controllerText.req) {
						controllerText.deleteText += 1;
						controllerText.req = false;
					}

					if (controllerText.findSpace) {
						for (let i = 1; i < transfer.length; i++) {
							if (drift[position - i].content == ' ') {
								controllerText.startPoint = position - i;
								i = transfer.length;
							}
							else if (i == transfer.length - 1) controllerText.startPoint = transfer.length;
						}
						controllerText.findSpace = false;
					}

					const [, raw]: [number, number] = calculationWPM('wpm');
					if (dataChart.length != 0) {
						dataChart[dataChart.length - 1].errors.error += 1;
						dataChart[dataChart.length - 1].errors.raw += raw;
					}	
					
					words.all += 1;
					words.errors += 1;
					setPosition(pos => pos + 1)
					AnimateKey('keybord-error', code)
				}

				if (controllerText.deleteText == 2) {
					if (drift[controllerText.startPoint].content == ' ') {
						drift.splice(0, controllerText.startPoint + 1);
						setPosition(pos => pos - controllerText.startPoint - 1);
						contents.dictation = contents.dictation.slice(controllerText.startPoint + 1);
					} 

					else {
						drift.splice(0, controllerText.startPoint);
						setPosition(pos => pos - controllerText.startPoint);
						contents.dictation = contents.dictation.slice(controllerText.startPoint);
					}

					controllerText.findSpace = true;
					controllerText.deleteText = 1;
				}
			}
		})
}