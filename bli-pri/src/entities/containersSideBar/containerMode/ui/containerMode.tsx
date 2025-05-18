import { ReactElement } from "react";
import { TypeHandleClik } from "../../../../shared/Types/types";
import { SvgDictation } from "./svgDictation";
import { SvgZen } from "./svgZen";
import { useAppSelector } from '../../../../shared/hooks/useAppSelector'

type TypeContainerMode = ({ classContainer, handleClick }: { classContainer: string, handleClick: TypeHandleClik }) => ReactElement

export const ContainerMode: TypeContainerMode = ({ classContainer, handleClick }) => {
	const textSettings = useAppSelector(state => state.textSettings);

	return (
		<div className={classContainer}>
			<div 
				className={`w-[104px] max-tOne:max-w-[86.5px] max-tTwo:max-w-[68.5px] h-[100%] flex-center-center gap-1.5 self-center transition-colors hover:text-white cursor-pointer ${textSettings?.mode == 'words' ? 'text-yellow' : ''}`}
				onClick={() => handleClick('ModeEdit', { string: 'words' })}
			>
				<span className='font-kadwa-bold mt-[1px] max-tTwo:mt-[4px]'>A</span>
				words
			</div>
			<div className={`w-[121px] max-tOne:max-w-[106px] max-tTwo:max-w-[89px] h-[100%] flex-center-center flex-row gap-1.5 self-center transition-colors group hover:text-white cursor-pointer ${textSettings?.mode == 'dictation' ? 'text-yellow' : ''}`}
				onClick={() => handleClick('ModeEdit', { string: 'dictation' })}
			>
				<SvgDictation />
				dictation
			</div>
			<div className={`w-[80px] max-tOne:max-w-[62.5px] max-tTwo:max-w-[55.5px] h-[100%] flex-center-center flex-row gap-1.5 self-center transition-colors group hover:text-white cursor-pointer ${textSettings?.mode == 'zen' ? 'text-yellow' : ''}`}
				onClick={() => handleClick('ModeEdit', { string: 'zen' })}
			>
				<SvgZen />
				zen
			</div>
		</div>
	)
}
