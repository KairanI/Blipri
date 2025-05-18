import { FC } from "react";
import { useAnimate } from "../../../shared/hooks/useAnimate";
import { useAppSelector } from '../../../shared/hooks/useAppSelector'
import { useActions } from '../../../shared/hooks/useActions'

interface ListLangProps {
	massiv: string[];
}

export const ListLang: FC<ListLangProps> = ({ massiv }) => {
	const textSettings = useAppSelector(state => state.textSettings);
	const { editLanguage, editSearchModal } = useActions();
	const [, startAnimate] = useAnimate();

	const handleClick = (language: string): void => {
		const popUp = document.getElementById("pop-up");
		popUp?.classList.remove("pop-up-active");
		setTimeout(() => {
			editSearchModal(false);
			startAnimate(true, false);
		}, 70);
		setTimeout(() => editLanguage(language), 170);
	};

	return (
		<>
			<ol className="overflow-y-scroll lang-scroll">
				{massiv.map((language, idx) => (
					<li
						key={idx}
						className="h-[40px] group cursor-pointer text-base flex items-center text-black-grey hover:bg-hover-pop-up hover:text-black"
						onClick={() => handleClick(language)}
					>
						<div
							key={idx}
							className={
								textSettings?.language == language
									? "ml-[20px] font-inter-regular flex flex-row gap-[10px]"
									: "ml-[50px] font-inter-regular"
							}
						>
							{textSettings?.language == language && (
								<svg
									className="mt-[2px]"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<mask id="mask0_339_115" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
										<rect width="20" height="20" fill="#D9D9D9" />
									</mask>
									<g mask="url(#mask0_339_115)">
										<path
											className="group-hover:fill-black"
											d="M7.9585 15L3.2085 10.25L4.396 9.06251L7.9585 12.625L15.6043 4.97917L16.7918 6.16667L7.9585 15Z"
											fill="#8F8F8F"
										/>
									</g>
								</svg>
							)}
							{language}
						</div>
					</li>
				))}
			</ol>
		</>
	);
};
