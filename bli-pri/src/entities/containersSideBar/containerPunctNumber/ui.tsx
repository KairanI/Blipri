import { ReactElement } from "react";
import { TypeHandleClik } from "../../../shared/Types/types";
import { useAppSelector } from '../../../shared/hooks/useAppSelector'

type TypeContainerPunctNumber = ({ classContainer, classNumber, handleClick }: { classContainer: string, classNumber: string, handleClick: TypeHandleClik }) => ReactElement

export const ContainerPunctNumber: TypeContainerPunctNumber = ({ classContainer, classNumber, handleClick }) => {
	const textSettings = useAppSelector(state => state.textSettings);

	return (
		<div className={classContainer}>
			<div 
				className={`
						${textSettings?.mode == 'dictation' ? 'max-tOne:max-w-[131px] max-tTwo:max-w-[112px]' : 'max-tOne:max-w-[123.5px] max-tTwo:max-w-[110.5px]'}
						w-[141px] h-[100%] flex-center-center gap-1.5 self-center transition-colors hover:text-white cursor-pointer 
						${textSettings?.punctuation ? 'text-yellow' : ''}
				`}
				onClick={() => handleClick('PunctuationEdit', { boolean: !textSettings?.punctuation })}
			>
				<span className='font-inter-bold'>@</span>
				punctuation
			</div>
			<div className={`w-[111px] max-tOne:max-w-[93.5px] max-tTwo:max-w-[83.5px] h-[100%] flex-center-center gap-1.5 self-center hover:text-white cursor-pointer ${textSettings?.number ? 'text-yellow' : ''} ${classNumber}`}
				onClick={() => handleClick('NumberEdit', { boolean: !textSettings?.number })}
			>
				<span className='font-inter-bold'>#</span>
				number
			</div>
			<div className={`rounded-[3px] bg-black-gray self-center ${textSettings?.mode == 'dictation' ? 'opacity-0 duration-100' : 'w-[6px] h-[35px] mx-[15px] max-tOne:mx-[10px] max-tTwo:mx-[7.5px] max-tTwo:max-w-[4px] max-tTwo:max-h-[26px] duration-500'}`}></div>
		</div>
	)
}
