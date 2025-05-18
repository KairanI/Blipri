import { FC } from "react";
import { KeyBoard } from "../../../entities/MoreInfoBlock/keyboard";
import { useAnimate } from "../../../shared/hooks/useAnimate";
import { useAppSelector } from '../../../shared/hooks/useAppSelector'
import { useActions } from '../../../shared/hooks/useActions'

export const LowElements: FC = () => {
	const { editRestart } = useActions();
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);
	const textSettings = useAppSelector(state => state.textSettings);
	const [isAnimating, startAnimate] = useAnimate();

	return (
		<div className={`bg-pop-up relative ${adaptiveSettings?.isMobile ? "h-[287px] pt-[20px]" : ""}`}>
			{!adaptiveSettings?.isMobile && <KeyBoard />}
			<div
				className={`max-w-[50px] h-[50px] m-auto flex-center-center group cursor-pointer ${
					adaptiveSettings?.isMobile ? "mt-[0px]" : "mt-[30px]"
				}`}
				onClick={() => {
					if (!isAnimating) {
						if (textSettings?.mode == "dictation") startAnimate(false, true);
						else startAnimate(false, false);
						setTimeout(() => {
							if (textSettings?.restart != undefined) {
								editRestart(textSettings.restart + 1)
							}
						}, 100);
					}
				}}
			>
				<svg
					className="group-hover:scale-105 transition"
					width="47"
					height="46"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="47" height="46">
						<path
							className="group-hover:fill-white transition-colors"
							transform="rotate(45 23.19 .026)"
							fill="#D9D9D9"
							d="M23.189.026h32.42v32.42h-32.42z"
						/>
					</mask>
					<g mask="url(#a)">
						<path
							className="group-hover:fill-white transition-colors"
							d="M13.686 34.31c-1.687-2.166-2.443-4.602-2.268-7.308.175-2.706 1.234-5.03 3.176-6.973a10.71 10.71 0 0 1 3.641-2.4c1.377-.549 2.806-.8 4.287-.752V19.6a7.612 7.612 0 0 0-3.26.513 8.066 8.066 0 0 0-2.758 1.827c-1.4 1.4-2.193 3.084-2.376 5.05-.183 1.966.306 3.77 1.469 5.409l-1.91 1.91zm1.91 1.91 1.911-1.91c1.64 1.13 3.443 1.611 5.409 1.444 1.966-.167 3.65-.951 5.05-2.352 1.592-1.592 2.388-3.503 2.388-5.731 0-2.229-.796-4.14-2.388-5.731l-.072-.072v2.102H25.22v-6.687h6.686v2.675h-2.101l.072.071c2.133 2.134 3.2 4.68 3.2 7.642 0 2.96-1.067 5.508-3.2 7.641-1.927 1.926-4.243 2.977-6.95 3.152-2.706.175-5.15-.573-7.33-2.244z"
							fill="#8F8F8F"
						/>
					</g>
				</svg>
			</div>
		</div>
	);
};
