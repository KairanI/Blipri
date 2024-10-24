import { IFocusPayload, IPayload } from "./interface";

export type TypeHandleClik = (type: string, payload: IPayload) => void 

export type TypeHandleFocusClik = (type: string, payload: IFocusPayload) => void