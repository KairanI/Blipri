import { ReactElement } from "react";
import { TypeHandleClik } from "../../../../shared/Types/types";
// types and interface

interface IClassObject {
	container: string;
	ten: string;
	twentyFive: string;
	fiftieth: string;
	hundred: string;
}

export type TypeContainerNumber = ({ classObject, isMobile, handleClick }: { classObject: IClassObject, isMobile: boolean, handleClick: TypeHandleClik }) => ReactElement

// constants

export const massivLength: number[] = [10, 25, 50, 100];