import { useContext, useEffect, useState } from "react"
import { useImmer } from "use-immer"
import { resetConstants } from "../../features/TypingLogic/resetConstants";
import { FocusContext } from "../../pages/Test";
import { FocusDispatchContext, TextContext } from "../../pages/Test/model/Context";
import { IType } from "../../shared/Types/interface";
import { ban_keys } from "../../shared/lib/constant";
import { wordsType } from "../../features/TypingLogic/wordsType";
import { zenType } from "../../features/TypingLogic/zenType";
import { dictationType } from "../../features/TypingLogic/dictationType";
import { MoveCaretka } from "../../features/TypingLogic/MoveCaretka";

export const useType: () => (number | IType[])[] = () => {
  const focusSettings = useContext(FocusContext);
  const textSettings = useContext(TextContext);
  const dispatch = useContext(FocusDispatchContext);
  const [position, setPosition] = useState<number>(0);
  const [type, setType] = useImmer<IType[]>([]);

  useEffect(() => {
    resetConstants({setType, setPosition, textSettings});
  }, [textSettings])

  useEffect(() => {
    MoveCaretka(textSettings?.mode, position);

    const handleKey = (e: KeyboardEvent): void => {
      if (e.shiftKey && e.key == ' ' && textSettings?.mode == 'dictation') return;
      if (focusSettings) {
        if (!focusSettings.activeTest && !focusSettings.activeModalSearch && !focusSettings.activeModalLength || focusSettings.activeTest == true) {
          keyActive(e.key, e.code);
        }
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey);
  }, [position, focusSettings, textSettings])

  const keyActive = (key: string, code: string): void => {
    if (focusSettings && ban_keys.includes(key, 1) == false && !focusSettings.activeTest && !focusSettings.activeModalSearch && !focusSettings.activeModalLength && dispatch) dispatch({ type: 'TestEdit', boolean: true })
    if (ban_keys.includes(key, 1) == false && dispatch) dispatch({ type: 'CaretkaEdit', boolean: false });


    if (textSettings?.mode == 'words') wordsType({ type, setType, position, setPosition, key, code, textSettings })
    else if (textSettings?.mode == 'zen') zenType({ type, setType, position, setPosition, key, code })
    else if (textSettings?.mode == "dictation") dictationType({ setType, position, setPosition, key, code, textSettings })
  }
  return [type]
}