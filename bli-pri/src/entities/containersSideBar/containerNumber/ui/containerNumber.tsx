import { controllerInput } from "../../../../shared/lib/constant";
import { TypeContainerNumber } from "../lib/types";
import { SvgButton } from "./svgButton";
import { useAppSelector } from '../../../../shared/hooks/useAppSelector'
import { useActions } from '../../../../shared/hooks/useActions'

export const ContainerNumber: TypeContainerNumber = ({ classObject, handleClick }) => {
	const textSettings = useAppSelector(state => state.textSettings);
	const { editLengthModal } = useActions();

	return (
		<div className={classObject.container}>
			<div className={`rounded-[3px] bg-black-gray self-center ${textSettings?.mode == 'dictation' ? 'opacity-0 duration-100' : 'w-[6px] h-[35px] mx-[15px] max-tOne:mx-[10px] max-tTwo:mx-[7.5px] max-tTwo:max-w-[4px] max-tTwo:max-h-[26px] duration-500'}`}></div>
			<div
				className={`
					${textSettings?.mode == 'dictation' ? 'max-tOne:max-w-[25.5px] max-tTwo:max-w-[19.5px]' : 'max-tOne:max-w-[30.5px] max-tTwo:max-w-[29.5px]'}
					w-[48px] h-[100%] flex-center-center self-center transition-colors hover:text-white cursor-pointer 
					${textSettings?.lengthText == 10 ? 'text-yellow' : ''} ${classObject.ten}
				`}
				onClick={() => handleClick('LengthTextEdit', { number: 10 })}
			>{textSettings?.mode == "dictation" ? '1' : '10'}</div>
			<div
				className={`
					${textSettings?.mode == 'dictation' ? 'max-tOne:max-w-[25px] max-tTwo:max-w-[19px]' : 'max-tOne:max-w-[35px] max-tTwo:max-w-[27px]'}
					w-[50px] h-[100%] flex-center-center self-center transition-colors hover:text-white cursor-pointer 
					${textSettings?.lengthText == 25 ? 'text-yellow' : ''} ${classObject.twentyFive}
				`}
				onClick={() => handleClick('LengthTextEdit', { number: 25 })}
			>{textSettings?.mode == "dictation" ? '2' : '25'}</div>
			<div
				className={`
					${textSettings?.mode == 'dictation' ? 'max-tOne:max-w-[26px] max-tTwo:max-w-[19px]' : 'max-tOne:max-w-[35px] max-tTwo:max-w-[27px]'}
					w-[50px] h-[100%] flex-center-center self-center transition-colors hover:text-white cursor-pointer 
					${textSettings?.lengthText == 50 ? 'text-yellow' : ''} ${classObject.fiftieth}
				`}
				onClick={() => handleClick('LengthTextEdit', { number: 50 })}
			>{textSettings?.mode == "dictation" ? '3' : '50'}</div>
			<div
				className={`
					${textSettings?.mode == 'dictation' ? 'max-tOne:max-w-[28.5px] max-tTwo:max-w-[21.5px]' : 'max-tOne:max-w-[43px] max-tTwo:max-w-[37.5px]'}
					w-[58px] h-[100%] flex-center-center self-center transition-colors hover:text-white cursor-pointer 
					${textSettings?.lengthText == 100 ? 'text-yellow' : ''} ${classObject.hundred}
				`}
				onClick={() => handleClick('LengthTextEdit', { number: 100 })}
			>{textSettings?.mode == "dictation" ? '4' : '100'}</div>
			<div className={`h-[100%] flex-center-center group cursor-pointer ${textSettings?.mode == 'dictation' ? 'w-0 duration-300 opacity-0 invisible' : 'w-[49px] max-tOne:max-w-[31.5px] max-tTwo:max-w-[29.5px] duration-500'}`}
				onClick={() => {
					editLengthModal(true)
					setTimeout(() => {
						const popUp = document.getElementById('pop-up-length');
						popUp?.classList.add('pop-up-active');
					}, 10)
					controllerInput.type = true;
				}}
			>
				<SvgButton />
			</div>
		</div>
	)
}
