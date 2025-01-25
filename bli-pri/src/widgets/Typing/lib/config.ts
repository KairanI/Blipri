import { Dispatch, SetStateAction } from "react";
import { Updater } from "use-immer";
import { IType } from "../../../shared/Types/interface";

// type and interface 
interface IObjectResizeConst {
	mode: string;
	positionText: number;
}

export type TypeUseResize = ({ setType, setPosition } : {
	setType: Updater<IType[]>, 
	setPosition: Dispatch<SetStateAction<number>>,
}) => void

// constants
export const objectResizeConst: IObjectResizeConst = {
	mode: '',
	positionText: 0,
}