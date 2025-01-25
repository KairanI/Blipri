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

export type TypeContainerNumber = ({ classObject, handleClick }: { classObject: IClassObject, handleClick: TypeHandleClik }) => ReactElement