import { Updater } from "use-immer"
import { ITextSettings, IType } from "../../../shared/Types/interface"
import { Dispatch, SetStateAction } from "react";
import { ban_keys, controllerText, errorLetters, words } from "../../../shared/lib/constant";
import { AnimateKey } from "../../../shared/model/AnimateKey";

let contentDictation = "We had a great holiday by the sea yesterday. It's a pity it will never happen again. Good luck to you my old friend, hope to see you again";

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
		if (key == ' ' && drift.length == 2) return
		if (key == ' ' && drift[position - 1].content == ' ') return

		if (key == 'Backspace' && position != 0) {
			if (drift[position - 1].content == ' ') words.finish -= 1;
			else errorLetters[words.finish] -= 1;
			drift.splice(position - 1, 1)

			if (position == controllerText.endPoint) {
				if (controllerText.deleteText != 0) controllerText.deleteText -= 1;
			}
			setPosition(pos => pos - 1)
			AnimateKey('keybord-animate', code)
		}

		else if (ban_keys.includes(key) == false && key == contentDictation[position]) {
			if (errorLetters[words.finish] == 29 && key != ' ') return
			if (key == ' ') {
				if (controllerText.deleteText == 0) controllerText.startPoint = position;
				else if (controllerText.deleteText == 1) controllerText.oneStartPoint = position - controllerText.startPoint;

				words.finish += 1;
				errorLetters.push(0)
			}
			drift.splice(position, 0, { content: key, color: 'text-white' })
			if (key != '') errorLetters[words.finish] += 1;
			if (controllerText.req) {
				controllerText.deleteText += 1;
				controllerText.req = false;
			}
			if (controllerText.deleteText == 2) setTimeout(() => controllerText.startPoint = controllerText.oneStartPoint, 100)

			setPosition(pos => pos + 1)
			AnimateKey('keybord-animate', code)
		}

		else if (ban_keys.includes(key) == false && key != contentDictation[position]) {
			if (errorLetters[words.finish] == 29 && key != ' ') return
			if (key == ' ') {
				if (controllerText.deleteText == 0) controllerText.startPoint = position;
				else if (controllerText.deleteText == 1) controllerText.oneStartPoint = position - controllerText.startPoint;

				words.finish += 1;
				errorLetters.push(0)
			}
			drift.splice(position, 0, { content: key, color: 'text-red' })
			if (key != '') errorLetters[words.finish] += 1;
			if (controllerText.req) {
				controllerText.deleteText += 1;
				controllerText.req = false;
			}
			if (controllerText.deleteText == 2) setTimeout(() => controllerText.startPoint = controllerText.oneStartPoint, 100)

			setPosition(pos => pos + 1)
			AnimateKey('keybord-animate', code)
		}

		if (controllerText.deleteText == 2) {
			drift.splice(0, controllerText.startPoint);
			setPosition(pos => pos - controllerText.startPoint)
			controllerText.deleteText = 1;
		}
	})
}