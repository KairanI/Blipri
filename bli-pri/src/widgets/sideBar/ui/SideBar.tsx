import { useEffect, useState } from "react";
import { TypeHandleClik } from "../../../shared/Types/types";
import { useAnimate } from "../../../shared/hooks/useAnimate";
import { useClass } from "../mode/useClass";
import { AudioPlayer } from "../../../features/AudioPlayer";
import { ContainerPunctNumber } from "../../../entities/containersSideBar/containerPunctNumber";
import { ContainerMode } from "../../../entities/containersSideBar/containerMode";
import { ContainerNumber } from "../../../entities/containersSideBar/containerNumber";
import { SideBarMobile } from "./SideBarMobile";
import { useAppSelector } from '../../../shared/hooks/useAppSelector'
import { useActions } from '../../../shared/hooks/useActions'

let lastMode: string = "";

export const SideBar = () => {
	const textSettings = useAppSelector(state => state.textSettings);
	const focusSettings = useAppSelector(state => state.focusSettings);
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);
	const { editLengthText, editMode, editNumber, editPunctuation } = useActions();
	const [showPlayer, setShowPlayer] = useState<boolean>(false);
	const [isAnimating, startAnimate] = useAnimate();
	const [classObject, classEdit] = useClass();

	useEffect(() => {
		if (textSettings?.mode == "dictation") setShowPlayer(true);
		classEdit(textSettings?.mode as string, "NoAnimate");
	}, []);

	const handleClick: TypeHandleClik = (type, payload) => {
		if (!isAnimating && payload.string != textSettings?.mode) {
			if (payload.string) {
				lastMode = textSettings?.mode as string;
				classEdit(payload.string, lastMode);
				if (payload.string == "dictation") setShowPlayer(true);
				else if (lastMode == "dictation") setTimeout(() => setShowPlayer(false), 400);
				startAnimate(true, false);
			} else if (textSettings?.mode == "dictation") startAnimate(false, true);
			else startAnimate(false, false);

			setTimeout(() => {
				switch (type) {
					case 'PunctuationEdit': {
						if (payload.boolean !== undefined) editPunctuation(payload.boolean);
						return;
					}
					case 'NumberEdit': {
						if (payload.boolean !== undefined) editNumber(payload.boolean);
						return;
					}
					case 'LengthTextEdit': {
						if (payload.number !== undefined) editLengthText(payload.number);
						return;
					}
					case 'ModeEdit': {
						if (payload.string !== undefined) editMode(payload.string);
						return;
					}
				}
			}, 100);
		}
	};

	useEffect(() => {
		if (focusSettings?.activeTest) classEdit("focus", textSettings?.mode as string);
		else classEdit("antiFocus", textSettings?.mode as string);
	}, [focusSettings?.activeTest]);

	return (
		<>
			{!adaptiveSettings?.isMobile ? (
				<div>
					{showPlayer && <AudioPlayer className={classObject.audioPlayer} />}
					<div className={classObject.sideBar}>
						<ContainerPunctNumber
							classContainer={classObject.containerPunctNumber}
							classNumber={classObject.number}
							handleClick={handleClick}
						/>
						<ContainerMode classContainer={classObject.containerMode} handleClick={handleClick} />
						<ContainerNumber
							classObject={{
								container: classObject.containerNumber,
								ten: classObject.ten,
								twentyFive: classObject.twentyFive,
								fiftieth: classObject.fiftieth,
								hundred: classObject.hundred,
							}}
							handleClick={handleClick}
						/>
					</div>
				</div>
			) : (
				<SideBarMobile handleClick={handleClick} className={classObject.audioPlayer} />
			)}
		</>
	);
};
