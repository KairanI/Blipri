import { ReactElement, useContext } from "react";
import { TypeHandleClik } from "../../../shared/Types/types";
import { FocusDispatchContext, TextContext } from "../../../pages/Test/model/Context";
import { controllerInput } from "../../../shared/lib/constant";

interface IClassObject {
	container: string;
	ten: string;
	twentyFive: string;
	fiftieth: string;
	hundred:string;
}

type TypeContainerNumber = ({ classObject, handleClick } : { classObject: IClassObject, handleClick: TypeHandleClik }) => ReactElement
const massivLength: number[] = [10, 25, 50, 100];

export const ContainerNumber: TypeContainerNumber = ({ classObject, handleClick }) => {
	const textSettings = useContext(TextContext);
	const dispatchFocus = useContext(FocusDispatchContext);

	return (
		<div className={classObject.container}>
			<div className={textSettings?.mode == 'dictation' ? 'rounded-[3px] bg-black-gray self-center opacity-0 duration-100' : 'w-[6px] h-[35px] mx-[15px] rounded-[3px] bg-black-gray self-center duration-500'}></div>
			<div
				className={`w-[48px] h-[60px] flex-center-center self-center transition-colors hover:text-white cursor-pointer ${textSettings?.lengthText == 10 ? 'text-yellow' : ''} ${classObject.ten}`}
				onClick={() => handleClick('LengthTextEdit', { number: 10 })}
			>{textSettings?.mode == "dictation" ? '1' : '10'}</div>
			<div
				className={`w-[50px] h-[60px] flex-center-center self-center transition-colors hover:text-white cursor-pointer ${textSettings?.lengthText == 25 ? 'text-yellow' : ''} ${classObject.twentyFive}`}
				onClick={() => handleClick('LengthTextEdit', { number: 25 })}
			>{textSettings?.mode == "dictation" ? '2' : '25'}</div>
			<div
				className={`w-[50px] h-[60px] flex-center-center self-center transition-colors hover:text-white cursor-pointer ${textSettings?.lengthText == 50 ? 'text-yellow' : ''} ${classObject.fiftieth}`}
				onClick={() => handleClick('LengthTextEdit', { number: 50 })}
			>{textSettings?.mode == "dictation" ? '3' : '50'}</div>
			<div
				className={`w-[58px] h-[60px] flex-center-center self-center transition-colors hover:text-white cursor-pointer ${textSettings?.lengthText == 100 ? 'text-yellow' : ''} ${classObject.hundred}`}
				onClick={() => handleClick('LengthTextEdit', { number: 100 })}
			>{textSettings?.mode == "dictation" ? '4' : '100'}</div>
			<div className={`h-[60px] flex-center-center group cursor-pointer ${textSettings?.mode == 'dictation' ? 'w-0 duration-300 opacity-0 invisible' : 'w-[49px] duration-500'}`}

				onClick={() => {
					if (dispatchFocus) dispatchFocus({ type: 'LengthModalEdit', boolean: true })
					setTimeout(() => {
						const popUp = document.getElementById('pop-up-length');
						popUp?.classList.add('pop-up-active');
					}, 10)
					controllerInput.type = true;
				}}
			>
				<svg width="19" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path className={textSettings?.lengthText && massivLength.includes(textSettings.lengthText) && textSettings?.lengthText <= 100 ? 'group-hover:svg-pointer transition-colors fill-' : 'svg-active transition-colors group-hover:svg-pointer'} d="M5.938 3.562H5.74V1.583A.598.598 0 0 0 5.146.99a.598.598 0 0 0-.594.593v1.98h-.198c-1.259 0-1.979.72-1.979 1.979v4.75c0 1.258.72 1.979 1.98 1.979h.197v5.146c0 .324.27.593.594.593.324 0 .594-.269.594-.593V12.27h.197c1.26 0 1.98-.72 1.98-1.98v-4.75c0-1.258-.72-1.979-1.98-1.979zM14.646 6.73h-.198V1.582a.598.598 0 0 0-.594-.593.598.598 0 0 0-.594.593V6.73h-.198c-1.258 0-1.979.72-1.979 1.98v4.75c0 1.258.72 1.979 1.98 1.979h.197v1.979c0 .324.27.593.594.593.325 0 .594-.269.594-.593v-1.98h.198c1.258 0 1.979-.72 1.979-1.979v-4.75c0-1.258-.72-1.979-1.98-1.979z" fill="#797979" fillOpacity=".8" />
				</svg>
			</div>
		</div>
	)
}
