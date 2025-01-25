import { IFocusPayload, IPayload } from "./interface";

export type TypeHandleClik = (type: string, payload: IPayload) => void 

export type TypeHandleFocusClik = (type: string, payload: IFocusPayload) => void

export type TypeSideBarMobileComponent = ({handleClick, handlePopUp, className}: {
	handleClick: TypeHandleClik, 
	handlePopUp?: TypeHandleFocusClik,
	className?: string,
}) => JSX.Element