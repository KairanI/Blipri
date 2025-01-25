import { createContext } from "react";
import { IActionAdaptive, IActionFocus, IActionText, IAdaptiveSettings, IfocusSettings, ITextSettings } from "../../shared/Types/interface";

// focusContext
export const FocusContext = createContext<IfocusSettings | null>(null);
export const FocusDispatchContext = createContext<React.Dispatch<IActionFocus> | null>(null);

// textContext
export const TextContext = createContext<ITextSettings | null>(null);
export const TextDispatchContext = createContext<React.Dispatch<IActionText> | null>(null);

// adaptiveContext
export const AdaptiveContext = createContext<IAdaptiveSettings | null>(null);
export const AdaptiveDispatchContext = createContext<React.Dispatch<IActionAdaptive> | null>(null);