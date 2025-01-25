import { useContext, useEffect, useState } from "react"
import { useImmer } from "use-immer"
import { resetConstants } from "../../../features/TypingLogic/resetConstants";
import { FocusContext } from "../../../pages/Test";
import { FocusDispatchContext, TextContext, TextDispatchContext } from "../../../app/model/Context";
import { IType } from "../../../shared/Types/interface";
import { ban_keys, contents, dataChart, words } from "../../../shared/lib/constant";
import { wordsType } from "../../../features/TypingLogic/wordsType";
import { zenType } from "../../../features/TypingLogic/zenType";
import { dictationType } from "../../../features/TypingLogic/dictationType";
import { MoveCaretka } from "../../../features/TypingLogic/MoveCaretka";
import { useTimer } from "./useTimer";
import { useResize } from "./useResize";
import { objectResizeConst } from "../lib/config";
import { calculationWPM } from "../../../features/calculationWPM";

export const useType: () => (number | IType[])[] = () => {
  const focusSettings = useContext(FocusContext);
  const textSettings = useContext(TextContext);
  const focusDispatch = useContext(FocusDispatchContext);
  const textDispatch = useContext(TextDispatchContext);
  const [position, setPosition] = useState<number>(0);
  const [type, setType] = useImmer<IType[]>([]);
  useTimer({ focusSettings });
  useResize({ setType, setPosition });
  
  useEffect(() => {
    objectResizeConst.mode = textSettings?.mode as string;
    if (focusDispatch) focusDispatch({ type: 'TestEdit', boolean: false });
    resetConstants({ setType, setPosition, textSettings });
  }, [textSettings])

  useEffect(() => {
    objectResizeConst.positionText = position;
    MoveCaretka(textSettings?.mode, position);

    const handleKey = (e: KeyboardEvent): void => {
      if (e.shiftKey && e.key == ' ' && textSettings?.mode == 'dictation') return;
      if (focusSettings) {
        if (!focusSettings.activeTest && !focusSettings.activeModalSearch && !focusSettings.activeModalLength || focusSettings.activeTest == true) {
          keyActive(e.key, e.code);
          if (position == type.length - 1 && textSettings?.mode == 'words') {
            const [wpm, acc]: [number, number] = calculationWPM('all');
            console.log(`WPM: ${wpm}; ACC: ${acc}`);
            console.log(dataChart)
            if (textDispatch) textDispatch({ type: 'PageEdit', string: 'Result' });
          }
          else if (type.length == contents.dictation.length && textSettings?.mode == 'dictation') {
            calculationWPM('all');
            if (textDispatch) textDispatch({ type: 'PageEdit', string: 'Result' });
          }
          else if (e.shiftKey && e.key == 'Enter' && textSettings?.mode == 'zen') {
            calculationWPM('all');
            if (textDispatch) textDispatch({ type: 'PageEdit', string: 'Result' });
            words.end = words.finish;
          };
        }
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey);
  }, [position, focusSettings, textSettings])

  const keyActive = (key: string, code: string): void => {
    if (focusSettings && ban_keys.includes(key, 1) == false && !focusSettings.activeTest && !focusSettings.activeModalSearch && !focusSettings.activeModalLength && focusDispatch) focusDispatch({ type: 'TestEdit', boolean: true })
    if (ban_keys.includes(key, 1) == false && focusDispatch) focusDispatch({ type: 'CaretkaEdit', boolean: false });


    if (textSettings?.mode == 'words') wordsType({ type, setType, position, setPosition, key, code, textSettings })
    else if (textSettings?.mode == 'zen') zenType({ setType, position, setPosition, key, code })
    else if (textSettings?.mode == "dictation") dictationType({ setType, position, setPosition, key, code, textSettings })
  }
  return [type]
}