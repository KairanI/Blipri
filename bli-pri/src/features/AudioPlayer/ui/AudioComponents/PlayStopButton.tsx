import { useAppSelector } from '../../../../shared/hooks/useAppSelector'
import { controllers, interval, TypePlayerComponents } from "../../lib/constants"
import { handleClickPlay } from "../../mode/handleClickPlay";
import { SvgPlayButton } from "./svgPlayButton";

export const PlayStopButton: TypePlayerComponents = ({ play, range, audio, setPlay, setTimer }) => {
	const adaptiveSettings = useAppSelector(state => state.adaptiveSettings);

	return (
		<>
			{play ? (
				<div
					className={`flex-center-center flex-row gap-[5px] max-tTwo:gap-[4px] max-tThree:gap-[6px] cursor-pointer ${!adaptiveSettings?.isMobile ? 'w-[47px] h-[47px]' : 'w-[17px] h-[20px]'}`}
					onClick={() => {
						audio?.pause();
						setPlay(false);
						controllers.stop = false
						clearInterval(interval.audio);
						clearInterval(interval.timer);
						clearTimeout(interval.timeout);
					}}
				>
					<div className="w-[3px] h-[15px] max-tTwo:w-[2px] max-tTwo:h-3 max-tThree:w-[3.6px] max-tThree:h-[18px] max-tThree:rounded-[1px] bg-white"></div>
					<div className="w-[3px] h-[15px] max-tTwo:w-[2px] max-tTwo:h-3 max-tThree:w-[3.6px] max-tThree:h-[18px] max-tThree:rounded-[1px] bg-white"></div>
				</div>
			) : (
				<div
					className={`flex-center-center cursor-pointer ${!adaptiveSettings?.isMobile ? 'w-[47px] h-[47px]' : ''}`}
					onClick={() => {
						setPlay(true);
						handleClickPlay({ range: range, audio: audio, setPlay, setTimer })
					}}
				>
					<SvgPlayButton />
				</div>
			)}
		</>
	)
}