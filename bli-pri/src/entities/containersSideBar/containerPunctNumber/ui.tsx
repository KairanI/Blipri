import { ReactElement, useContext } from "react";
import { TypeHandleClik } from "../../../shared/Types/types";
import { TextContext } from "../../../pages/Test/model/Context";

type TypeContainerPunctNumber = ({ classContainer, classNumber, handleClick }: { classContainer: string, classNumber: string, handleClick: TypeHandleClik }) => ReactElement

export const ContainerPunctNumber: TypeContainerPunctNumber = ({ classContainer, classNumber, handleClick }) => {
	const textSettings = useContext(TextContext);

	return (
		<div className={classContainer}>
			<div className={`w-[141px] h-[60px] flex-center-center gap-1.5 self-center transition-colors hover:text-white cursor-pointer ${textSettings?.punctuation ? 'text-yellow' : ''}`}
				onClick={() => handleClick('PunctuationEdit', { boolean: !textSettings?.punctuation })}
			>
				<span className='font-inter-bold'>@</span>
				punctuation
			</div>
			<div className={`w-[111px] h-[60px] flex-center-center gap-1.5 self-center hover:text-white cursor-pointer ${textSettings?.number ? 'text-yellow' : ''} ${classNumber}`}
				onClick={() => handleClick('NumberEdit', { boolean: !textSettings?.number })}
			>
				<span className='font-inter-bold'>#</span>
				number
			</div>
			<div className={textSettings?.mode == 'dictation' ? 'rounded-[3px] bg-black-gray self-center opacity-0 duration-100' : 'w-[6px] h-[35px] mx-[15px] rounded-[3px] bg-black-gray self-center duration-500'}></div>
		</div>
	)
}
