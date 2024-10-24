import { useContext, useEffect, useState } from "react"
import { useImmer } from "use-immer"
import { IType } from "../../../shared/Types/interface";
import { AnimateKey } from "./AnimateKey";
import { ban_keys, controllerText, errorLetters, transfer, words } from "../../../shared/lib/constant";
import { FocusContext, FocusDispatchContext } from "../../../pages/Test";
import { TextContext } from "../../../pages/Test/model/Context";
import { createText } from "../../../shared/model/CreateText";
import { MoveCaretka } from "./MoveCaretka";

let contentDictation = "We had a great holiday by the sea yesterday. It's a pity it will never happen again. Good luck to you my old friend, hope to see you again"
let oneStartPoint: number = 0;

let lastCoordinatsSpace = 0;

const deleteTextEdit = (position: number, type: IType[], key: string) => {
  setTimeout(() => {
    let massiv: IType[] = [];
    for (let i = 0; i < type.length - 2; i++) {
      massiv.push({content: type[i].content, color: 'text-white'})
    }
    massiv.push({content: key, color: 'text-white'});
    massiv.push({ content: ' ', color: 'opacityElement' });
    massiv.push({ content: 'a', color: 'opacityElement' })
    const positionSpace: number = [...massiv].reverse().findIndex(item => item.content === ' ' && item.color === 'text-white') - 2;
    const coordinats: DOMRect | undefined = document.getElementById(`${position}`)?.getBoundingClientRect();
    const spaceCoordinats: DOMRect | undefined = document.getElementById(`${position - positionSpace}`)?.getBoundingClientRect();
    const space: DOMRect | undefined = document.getElementById(`${position - positionSpace}`);

    console.log(`coordinats: ${coordinats?.top} ` + `spaceCoordinats ${spaceCoordinats?.top}`)
    if (coordinats && spaceCoordinats && coordinats.top > spaceCoordinats.top) {
      console.log(space);
      console.log(`lastCoordinatsSpace: ${lastCoordinatsSpace} spaceCoordinats: ${spaceCoordinats.top}`);
      if (controllerText.req && lastCoordinatsSpace != spaceCoordinats.top || controllerText.deleteText == 0) controllerText.deleteText += 1;
      lastCoordinatsSpace = spaceCoordinats.top;
    }
    // console.log(coordinats?.top);
  }, 100)
  // const positionSpace = [...type].reverse().findIndex(item => item.content === ' ' && item.color === 'text-white') - 2;
  // const coordinats: DOMRect | undefined = document.getElementById(`${position}`)?.getBoundingClientRect();
  // const spaceCoordinats: DOMRect | undefined = document.getElementById(`${position - positionSpace - 1}`)

  // console.log(coordinats?.top);
  // console.log(spaceCoordinats);
  // console.log(`coordinats: ${coordinats?.top} ` + `lastCoordinats ${spaceCoordinats?.top}`)
  // if (coordinats && spaceCoordinats && coordinats.top > spaceCoordinats.top) {
  //   controllerText.deleteText += 1;
  // }
}

export const useType: () => (number | IType[])[] = () => {
  const focusSettings = useContext(FocusContext);
  const textSettings = useContext(TextContext);
  const dispatch = useContext(FocusDispatchContext);
  const [position, setPosition] = useState<number>(0);
  const [type, setType] = useImmer<IType[]>([]);

  useEffect(() => {
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
      oneStartPoint = 0;
      if (textSettings.lengthText != 0) controllerText.numWords = textSettings.lengthText - 30;
      else controllerText.numWords = 10;
      controllerText.req = false;
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
        else if (textSettings.mode == 'zen' || textSettings.mode == 'dictation') {
          drift.push({ content: ' ', color: 'opacityElement' })
          drift.push({ content: 'a', color: 'opacityElement' })
        }
      })
    }

  }, [textSettings])


  useEffect(() => {
    MoveCaretka(textSettings?.mode, position);

    const handleKey = (e: KeyboardEvent): void => {
      if (e.shiftKey && e.key == ' ' && textSettings?.mode == 'dictation') return;
      if (focusSettings && !focusSettings.activeTest && !focusSettings.activeModalSearch && !focusSettings.activeModalLength) keyActive(e.key, e.code);
      else if (focusSettings && focusSettings.activeTest == true) keyActive(e.key, e.code);
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey);
  }, [position, focusSettings, textSettings])

  const keyActive = (key: string, code: string): void => {
    if (focusSettings && ban_keys.includes(key, 1) == false && !focusSettings.activeTest && !focusSettings.activeModalSearch && !focusSettings.activeModalLength && dispatch) dispatch({ type: 'TestEdit', boolean: true })
    if (ban_keys.includes(key, 1) == false && dispatch) dispatch({ type: 'CaretkaEdit', boolean: false });

    // words
    if (textSettings?.mode == 'words') {
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
            AnimateKey('keybord-animate', code)
            setPosition(pos => pos + 1)
          }

          else if (key == 'Backspace' && position != 0) {
            if (controllerText.req) controllerText.req = false;
            if (drift[position - 1].content == ' ') words.finish -= 1;
            if (drift[position - 1].color == 'text-black-red') {
              errorLetters[words.finish] -= 1;
              drift.splice(position - 1, 1)
            }
            else drift[position - 1].color = 'grey'
            setPosition(pos => pos - 1)
            if (position == controllerText.endPoint || position - 1 == controllerText.endPoint) {
              if (controllerText.deleteText != 0) controllerText.deleteText -= 1;
            }
          }

          else if (key != drift[position].content && drift[position].content == ' ' && ban_keys.includes(key) == false) {
            if (errorLetters[words.finish] == 8 || controllerText.req) return
            drift.splice(position, 0, { content: key, color: 'text-black-red' });
            AnimateKey('keybord-error', code)

            errorLetters[words.finish] += 1;
            setPosition(pos => pos + 1)
          }

          else if (key != drift[position].content && ban_keys.includes(key) == false && type.length + 1 > position) {
            drift[position].color = 'text-red';
            AnimateKey('keybord-error', code)
            setPosition(pos => pos + 1)
          }

          if (controllerText.deleteText == 2 && textSettings) {
            drift.splice(0, controllerText.startPoint);

            setPosition(pos => pos - controllerText.startPoint)
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

    // zen
    else if (textSettings?.mode == 'zen') {
      setType(drift => {
        if (key == 'Backspace' && position != 0) {
          if (drift[position - 1].content == ' ') words.finish -= 1;
          else errorLetters[words.finish] -= 1;
          drift.splice(position - 1, 1)

          if (transfer.controller != 0) transfer.controller -= 1;

          if (position == controllerText.endPoint) {
            if (controllerText.deleteText != 0) controllerText.deleteText -= 1;
          }
          setPosition(pos => pos - 1)
          AnimateKey('keybord-animate', code)
        }

        else if (ban_keys.includes(key) == false) {
          if (key == ' ' && drift.length == 2) return
          if (errorLetters[words.finish] == 29 && key != ' ') return
          if (key == ' ' && drift[position - 1].content == ' ') return
          if (key == ' ') {
            if (controllerText.deleteText == 0) controllerText.startPoint = position;
            else if (controllerText.deleteText == 1) oneStartPoint = position - controllerText.startPoint;

            words.finish += 1;
            controllerText.req = true;
            errorLetters.push(0)
          }
          drift.splice(position, 0, { content: key, color: 'text-white' })
          if (key != '') errorLetters[words.finish] += 1;

          deleteTextEdit(position, type, key);
          if (controllerText.deleteText == 2) setTimeout(() => controllerText.startPoint = oneStartPoint, 200)
          setTimeout(() => console.log(controllerText.deleteText), 100)

          setPosition(pos => pos + 1)
          AnimateKey('keybord-animate', code)
        }

        if (controllerText.deleteText == 2) {
          drift.splice(0, controllerText.startPoint);
          setPosition(pos => pos - controllerText.startPoint)
          controllerText.deleteText = 1;
          controllerText.req = false;
        }
        
      })
    }

    // dictation
    else if (textSettings?.mode == "dictation") {
      setType(drift => {
        if (key == ' ' && drift.length == 2) return
        if (key == ' ' && drift[position - 1].content == ' ') return

        if (key == 'Backspace' && position != 0) {
          if (drift[position - 1].content == ' ') words.finish -= 1;
          else errorLetters[words.finish] -= 1;
          drift.splice(position - 1, 1)

          if (transfer.controller != 0) transfer.controller -= 1;

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
            else if (controllerText.deleteText == 1) oneStartPoint = position - controllerText.startPoint;

            words.finish += 1;
            errorLetters.push(0)
          }
          drift.splice(position, 0, { content: key, color: 'text-white' })
          if (key != '') errorLetters[words.finish] += 1;

          if (controllerText.req) {
            controllerText.deleteText += 1;
            if (controllerText.deleteText == 2) setTimeout(() => controllerText.startPoint = oneStartPoint, 200)
            controllerText.req = false;
          }

          setPosition(pos => pos + 1)
          AnimateKey('keybord-animate', code)
        }

        else if (ban_keys.includes(key) == false && key != contentDictation[position]) {
          if (errorLetters[words.finish] == 29 && key != ' ') return
          if (key == ' ') {
            if (controllerText.deleteText == 0) controllerText.startPoint = position;
            else if (controllerText.deleteText == 1) oneStartPoint = position - controllerText.startPoint;

            words.finish += 1;
            errorLetters.push(0)
          }
          drift.splice(position, 0, { content: key, color: 'text-red' })
          if (key != '') errorLetters[words.finish] += 1;

          if (controllerText.req) {
            controllerText.deleteText += 1;
            if (controllerText.deleteText == 2) setTimeout(() => controllerText.startPoint = oneStartPoint, 200)
            controllerText.req = false;
          }

          setPosition(pos => pos + 1)
          AnimateKey('keybord-error', code)
        }

        if (controllerText.deleteText == 2) {
          drift.splice(0, controllerText.startPoint);
  
          setPosition(pos => pos - controllerText.startPoint)
          controllerText.deleteText = 1;
        }
      })
    }
  }
  return [type]
}