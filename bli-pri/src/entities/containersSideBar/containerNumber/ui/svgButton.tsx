import { FC } from "react"
import { massivLength } from "../../../../shared/lib/constant";
import { useAppSelector } from '../../../../shared/hooks/useAppSelector'

export const SvgButton: FC = () => {
	const textSettings = useAppSelector(state => state.textSettings);
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);

	return (
		<>
			{adaptiveSettings?.isPad ? (
				<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none">
					<path className={textSettings?.lengthText && massivLength.includes(textSettings.lengthText) && textSettings?.lengthText <= 100 ? 'group-hover:svg-pointer transition-colors' : 'svg-active transition-colors group-hover:svg-pointer'} fill="#797979" fillOpacity=".8" d="M5.313 3.347h-.178V1.761c0-.26-.24-.476-.53-.476s-.532.216-.532.476v1.586h-.177c-1.126 0-1.771.577-1.771 1.586v3.806c0 1.008.645 1.586 1.77 1.586h.178v4.123c0 .26.24.476.531.476.29 0 .531-.216.531-.476v-4.123h.178c1.126 0 1.77-.578 1.77-1.586V4.933c0-1.009-.644-1.586-1.77-1.586M13.104 5.884h-.177V1.761c0-.26-.24-.476-.531-.476-.29 0-.531.216-.531.476v4.123h-.177c-1.127 0-1.771.578-1.771 1.586v3.806c0 1.009.644 1.586 1.77 1.586h.178v1.586c0 .26.24.476.53.476s.532-.216.532-.476v-1.586h.177c1.127 0 1.771-.577 1.771-1.586V7.47c0-1.008-.645-1.586-1.77-1.586" />
				</svg>
			) : (
				<svg width="19" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path className={textSettings?.lengthText && massivLength.includes(textSettings.lengthText) && textSettings?.lengthText <= 100 ? 'group-hover:svg-pointer transition-colors' : 'svg-active transition-colors group-hover:svg-pointer'} d="M5.938 3.562H5.74V1.583A.598.598 0 0 0 5.146.99a.598.598 0 0 0-.594.593v1.98h-.198c-1.259 0-1.979.72-1.979 1.979v4.75c0 1.258.72 1.979 1.98 1.979h.197v5.146c0 .324.27.593.594.593.324 0 .594-.269.594-.593V12.27h.197c1.26 0 1.98-.72 1.98-1.98v-4.75c0-1.258-.72-1.979-1.98-1.979zM14.646 6.73h-.198V1.582a.598.598 0 0 0-.594-.593.598.598 0 0 0-.594.593V6.73h-.198c-1.258 0-1.979.72-1.979 1.98v4.75c0 1.258.72 1.979 1.98 1.979h.197v1.979c0 .324.27.593.594.593.325 0 .594-.269.594-.593v-1.98h.198c1.258 0 1.979-.72 1.979-1.979v-4.75c0-1.258-.72-1.979-1.98-1.979z" fill="#797979" fillOpacity=".8" />
				</svg>
			)}
		</>
	)
}