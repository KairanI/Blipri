import { FC } from "react"
import { useAppSelector } from '../../../../shared/hooks/useAppSelector'

export const SvgZen: FC = () => {
	const textSettings = useAppSelector(state => state.textSettings);
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);
	
	return (
		<>
			{adaptiveSettings?.isPad ? (
					<svg className="mt-[2px]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
						<path className={textSettings?.mode == 'zen' ? 'svg-active group-hover:svg-pointer transition-colors' : 'group-hover:svg-pointer transition-colors'} fill="#797979" fillOpacity=".8" d="M11.789 4.845 7.297 7.447a.6.6 0 0 1-.595 0L2.211 4.845c-.321-.186-.403-.624-.158-.898.17-.193.362-.35.566-.46l3.162-1.75c.676-.38 1.773-.38 2.45 0l3.161 1.75c.205.11.397.273.566.46.233.274.152.712-.169.898M6.667 8.532v3.978a.59.59 0 0 1-.845.543c-1.202-.59-3.226-1.692-3.226-1.692C1.884 10.96 1.3 9.944 1.3 9.11V6.1a.59.59 0 0 1 .88-.525l4.195 2.433c.175.11.291.31.291.525M7.333 8.532v3.978c0 .444.449.735.845.543 1.202-.59 3.226-1.692 3.226-1.692.712-.402 1.295-1.417 1.295-2.252V6.1a.59.59 0 0 0-.88-.525L7.623 8.007a.63.63 0 0 0-.291.525" />
					</svg>
				) : (
					<svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path className={textSettings?.mode == 'zen' ? 'svg-active group-hover:svg-pointer transition-colors' : 'group-hover:svg-pointer transition-colors'} d="M14.315 5.54 8.861 8.697a.73.73 0 0 1-.722 0L2.684 5.54c-.39-.226-.488-.758-.19-1.09.205-.234.438-.426.686-.56l3.84-2.125c.821-.46 2.153-.46 2.974 0l3.84 2.125c.248.134.481.333.687.56.283.332.184.864-.206 1.09zM8.096 10.016v4.83a.716.716 0 0 1-1.027.66C5.61 14.79 3.152 13.45 3.152 13.45c-.864-.489-1.572-1.721-1.572-2.734V7.062c0-.56.588-.914 1.07-.637l5.092 2.953a.762.762 0 0 1 .354.638zM8.904 10.016v4.83c0 .539.545.893 1.027.66 1.46-.716 3.917-2.055 3.917-2.055.864-.489 1.572-1.721 1.572-2.734V7.062c0-.56-.587-.914-1.07-.637L9.259 9.378a.762.762 0 0 0-.354.638z" fill="#797979" fillOpacity=".8" />
					</svg>
			)}
		</>
	)
}