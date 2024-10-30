import { ReactElement, useContext } from "react";
import { TypeHandleClik } from "../../../shared/Types/types";
import { TextContext } from "../../../pages/Test/model/Context";

type TypeContainerMode = ({ classContainer, handleClick } : { classContainer: string, handleClick: TypeHandleClik }) => ReactElement

export const ContainerMode: TypeContainerMode = ({ classContainer, handleClick }) => {
	const textSettings = useContext(TextContext);

	return (
		<div className={classContainer}>
			<div className={`w-[104px] h-[60px] flex-center-center gap-1.5 self-center transition-colors hover:text-white cursor-pointer ${textSettings?.mode == 'words' ? 'text-yellow' : ''}`}
				onClick={() => handleClick('ModeEdit', { string: 'words' })}
			>
				<span className='font-kadwa-bold mt-[1px]'>A</span>
				words
			</div>
			<div className={`w-[121px] h-[60px] flex-center-center flex-row gap-1.5 self-center transition-colors group hover:text-white cursor-pointer ${textSettings?.mode == 'dictation' ? 'text-yellow' : ''}`}
				onClick={() => handleClick('ModeEdit', { string: 'dictation' })}
			>
				<svg width="18" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path className={textSettings?.mode == 'dictation' ? 'svg-active group-hover:svg-pointer transition-colors' : 'group-hover:svg-pointer transition-colors'} d="M.978 11.27A.985.985 0 0 1 0 10.29V4.696c0-.535.443-.979.978-.979.535 0 .979.444.979.979v5.595a.977.977 0 0 1-.979.979zM4.891 13.135a.985.985 0 0 1-.978-.979V2.843c0-.534.444-.978.978-.978.535 0 .979.444.979.978v9.313a.977.977 0 0 1-.979.979zM8.804 15a.985.985 0 0 1-.978-.978V.978c0-.535.443-.978.978-.978.535 0 .978.443.978.978v13.044a.985.985 0 0 1-.978.978zM12.717 13.135a.985.985 0 0 1-.978-.979V2.843c0-.534.444-.978.978-.978.535 0 .979.444.979.978v9.313a.977.977 0 0 1-.979.979zM16.63 11.27a.985.985 0 0 1-.978-.979V4.696c0-.535.444-.979.978-.979.535 0 .979.444.979.979v5.595a.977.977 0 0 1-.979.979z" fill="#797979" fillOpacity=".8" />
				</svg>
				dictation
			</div>
			<div className={`w-[80px] h-[60px] flex-center-center flex-row gap-1.5 self-center transition-colors group hover:text-white cursor-pointer ${textSettings?.mode == 'zen' ? 'text-yellow' : ''}`}
				onClick={() => handleClick('ModeEdit', { string: 'zen' })}
			>
				<svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path className={textSettings?.mode == 'zen' ? 'svg-active group-hover:svg-pointer transition-colors' : 'group-hover:svg-pointer transition-colors'} d="M14.315 5.54 8.861 8.697a.73.73 0 0 1-.722 0L2.684 5.54c-.39-.226-.488-.758-.19-1.09.205-.234.438-.426.686-.56l3.84-2.125c.821-.46 2.153-.46 2.974 0l3.84 2.125c.248.134.481.333.687.56.283.332.184.864-.206 1.09zM8.096 10.016v4.83a.716.716 0 0 1-1.027.66C5.61 14.79 3.152 13.45 3.152 13.45c-.864-.489-1.572-1.721-1.572-2.734V7.062c0-.56.588-.914 1.07-.637l5.092 2.953a.762.762 0 0 1 .354.638zM8.904 10.016v4.83c0 .539.545.893 1.027.66 1.46-.716 3.917-2.055 3.917-2.055.864-.489 1.572-1.721 1.572-2.734V7.062c0-.56-.587-.914-1.07-.637L9.259 9.378a.762.762 0 0 0-.354.638z" fill="#797979" fillOpacity=".8" />
				</svg>
				zen
			</div>
		</div>
	)
}
