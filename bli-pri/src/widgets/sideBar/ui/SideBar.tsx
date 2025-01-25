import { useContext, useEffect, useState } from "react";
import { AdaptiveContext, FocusContext, TextContext, TextDispatchContext } from "../../../app/model/Context";
import { TypeHandleClik } from "../../../shared/Types/types";
import { useAnimate } from "../../../shared/model/hooks";
import { useClass } from "../mode/useClass";
import { AudioPlayer } from "../../../features/AudioPlayer";
import { ContainerPunctNumber } from "../../../entities/containersSideBar/containerPunctNumber";
import { ContainerMode } from "../../../entities/containersSideBar/containerMode";
import { ContainerNumber } from "../../../entities/containersSideBar/containerNumber";
import { SideBarMobile } from "./SideBarMobile";

let lastMode: string = '';

export const SideBar = () => {
	const textSettings = useContext(TextContext);
	const focusSettings = useContext(FocusContext);
	const adaptiveSettings = useContext(AdaptiveContext);
	const dispatchText = useContext(TextDispatchContext);
	const [showPlayer, setShowPlayer] = useState<boolean>(false);
	const [isAnimating, startAnimate] = useAnimate();
	const [classObject, classEdit] = useClass();

	useEffect(() => {
		if (textSettings?.mode == 'dictation') setShowPlayer(true);
		classEdit(textSettings?.mode as string, 'NoAnimate');
	}, []);

	const handleClick: TypeHandleClik = (type, payload) => {
		if (!isAnimating && dispatchText && payload.string != textSettings?.mode) {
			if (payload.string) {
				lastMode = textSettings?.mode as string
				classEdit(payload.string, lastMode);
				if (payload.string == 'dictation') setShowPlayer(true)
				else if (lastMode == 'dictation') setTimeout(() => setShowPlayer(false), 400)
				startAnimate(true, false);
			}
			else if (textSettings?.mode == "dictation") startAnimate(false, true);
			else startAnimate(false, false);

			setTimeout(() => dispatchText({ type, ...payload }), 100);
		}
	};

	useEffect(() => {
		if (focusSettings?.activeTest) classEdit('focus', textSettings?.mode as string);
		else classEdit('antiFocus', textSettings?.mode as string);
	}, [focusSettings?.activeTest])

	return (
		<>
			{!adaptiveSettings?.isMobile ? (
				<div>
					{showPlayer && <AudioPlayer className={classObject.audioPlayer} />}
					<div className={classObject.sideBar}>
						<ContainerPunctNumber classContainer={classObject.containerPunctNumber} classNumber={classObject.number} handleClick={handleClick} />
						<ContainerMode classContainer={classObject.containerMode} handleClick={handleClick} />
						<ContainerNumber
							classObject={{
								container: classObject.containerNumber,
								ten: classObject.ten,
								twentyFive: classObject.twentyFive,
								fiftieth: classObject.fiftieth,
								hundred: classObject.hundred
							}}
							handleClick={handleClick}
						/>
					</div>
				</div>
			) : (
				<SideBarMobile handleClick={handleClick} className={classObject.audioPlayer} />
			)}
		</>
	)
}