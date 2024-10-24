import { createContext } from "react";
import { IActionFocus, IActionText, IfocusSettings, ITextSettings } from "../../../shared/Types/interface";

// focusContext
export const FocusContext = createContext<IfocusSettings | null>(null);
export const FocusDispatchContext = createContext<React.Dispatch<IActionFocus> | null>(null);

// textContext
export const TextContext = createContext<ITextSettings | null>(null);
export const TextDispatchContext = createContext<React.Dispatch<IActionText> | null>(null);