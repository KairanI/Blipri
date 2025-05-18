import { FC } from "react"
import { useAppSelector } from '../../../../shared/hooks/useAppSelector'

export const SvgDictation: FC = () => {
	const textSettings = useAppSelector(state => state.textSettings);
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);
	
	return (
		<>
			{adaptiveSettings?.isPad ? (
				<svg className="mt-[2px]" xmlns="http://www.w3.org/2000/svg" width="17" height="13" fill="none">
					<path className={textSettings?.mode == 'dictation' ? 'svg-active group-hover:svg-pointer transition-colors' : 'group-hover:svg-pointer transition-colors'} fill="#797979" fillOpacity=".8" d="M1.828 9.17c-.486 0-.889-.36-.889-.796V3.821c0-.435.403-.796.89-.796.485 0 .888.36.888.796v4.553c0 .446-.403.796-.889.796M5.384 10.688c-.486 0-.89-.361-.89-.796V2.314c0-.435.404-.796.89-.796.485 0 .888.36.888.796v7.578c0 .446-.403.796-.888.796M8.939 12.206c-.486 0-.889-.361-.889-.796V.796C8.05.361 8.453 0 8.94 0s.889.36.889.796V11.41c0 .435-.403.796-.89.796M12.495 10.688c-.486 0-.889-.361-.889-.796V2.314c0-.435.403-.796.889-.796s.889.36.889.796v7.578c0 .446-.403.796-.89.796M16.05 9.17c-.485 0-.888-.36-.888-.796V3.821c0-.435.403-.796.888-.796.486 0 .89.36.89.796v4.553c0 .446-.404.796-.89.796" />
				</svg>
			) : (
				<svg width="19" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path className={textSettings?.mode == 'dictation' ? 'svg-active group-hover:svg-pointer transition-colors' : 'group-hover:svg-pointer transition-colors'} d="M.978 11.27A.985.985 0 0 1 0 10.29V4.696c0-.535.443-.979.978-.979.535 0 .979.444.979.979v5.595a.977.977 0 0 1-.979.979zM4.891 13.135a.985.985 0 0 1-.978-.979V2.843c0-.534.444-.978.978-.978.535 0 .979.444.979.978v9.313a.977.977 0 0 1-.979.979zM8.804 15a.985.985 0 0 1-.978-.978V.978c0-.535.443-.978.978-.978.535 0 .978.443.978.978v13.044a.985.985 0 0 1-.978.978zM12.717 13.135a.985.985 0 0 1-.978-.979V2.843c0-.534.444-.978.978-.978.535 0 .979.444.979.978v9.313a.977.977 0 0 1-.979.979zM16.63 11.27a.985.985 0 0 1-.978-.979V4.696c0-.535.444-.979.978-.979.535 0 .979.444.979.979v5.595a.977.977 0 0 1-.979.979z" fill="#797979" fillOpacity=".8" />
				</svg>	
			)}
		</>
	)
}