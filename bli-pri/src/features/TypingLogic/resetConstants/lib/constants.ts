import { Dispatch, SetStateAction } from "react";
import { ITextSettings, IType } from "../../../../shared/Types/interface";
import { Updater } from "use-immer";
// type

interface IMassivPunct {
	simplePunct: string[],
	hardPunct: string[]
}

export interface ITexts {
	[key: string]: string[];
}

export type TypeResetConstants = ({ setType, setPosition, textSettings }: {	setType: Updater<IType[]>,
	setPosition: Dispatch<SetStateAction<number>>,
	textSettings: ITextSettings | null
}) => void


// constants

export const massivPunct: IMassivPunct = {
	simplePunct: [',', ';', ':', '(', ')'],
	hardPunct:  ['.', '!', '?'],
}