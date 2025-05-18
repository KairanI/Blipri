import { FC } from "react"
import { useAppSelector } from '../../../../shared/hooks/useAppSelector'

export const SvgPlayButton: FC = () => {
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);

	return (
		<>
			{adaptiveSettings?.isPad && !adaptiveSettings.isMobile && (
				<svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.5 5.63398C11.1667 6.01888 11.1667 6.98113 10.5 7.36603L2.25 12.1292C1.58333 12.5141 0.75 12.0329 0.75 11.2631L0.75 1.73686C0.75 0.967059 1.58333 0.485935 2.25 0.870835L10.5 5.63398Z" fill="white" />
				</svg>
			)}
			{adaptiveSettings?.isMobile && (
				<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M16.5072 9.14908C17.1736 9.53443 17.1729 10.4967 16.506 10.8811L1.5002 19.5313C0.833269 19.9158 0.000260273 19.4341 0.000777272 18.6643L0.0124098 1.34377C0.0129267 0.573969 0.846584 0.0934043 1.51299 0.478752L16.5072 9.14908Z" fill="white" />
				</svg>
			)}
			{!adaptiveSettings?.isMobile && !adaptiveSettings?.isPad && (
				<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 12 15">
					<path fill="#fff" d="M11.5 6.634a1 1 0 0 1 0 1.732l-9.75 5.63a1 1 0 0 1-1.5-.867V1.871a1 1 0 0 1 1.5-.866l9.75 5.629Z" />
				</svg>
			)}
		</>
	)
}