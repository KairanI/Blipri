import { FC } from "react";
import { useAppSelector } from '../../../shared/hooks/useAppSelector'

export const HotKeysTest: FC = () => {
	const textSettings = useAppSelector(state => state.textSettings);

	return (
		<div className={textSettings?.mode == 'dictation' ? 'w-[290px] h-[66px] m-auto text-hotKeys font-inter-medium flex flex-col gap-[20px] text-mm opacity-100 transition-all' : 'w-[290px] h-[66px] m-auto text-hotKeys font-inter-medium flex flex-col gap-[20px] text-mm opacity-0 transition-all'}>

			<div className="flex-center-center gap-[10px] m-auto">
				<div className="w-[41px] h-[23px] bg-hotKeys rounded-[4px] text-hotKeys-black flex-center-center">
					<span className="mt-[1px]">shift</span>
				</div>
				<span className="text-base">+</span>
				<div className="w-[51px] h-[23px] bg-hotKeys rounded-[4px] text-hotKeys-black flex-center-center">
					<span className="mt-[0.5px]">space</span>
				</div>
				<span>=</span>
				<span>stop/play audio</span>
			</div>

			<div className="flex gap-[10px] flex-center-center">
				<div className="w-[25px] h-[23px] bg-hotKeys rounded-[4px] flex-center-center">
					<svg width="13" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M.54 4.54a.65.65 0 0 0 0 .92l4.137 4.136a.65.65 0 1 0 .92-.919L1.918 5l3.677-3.677a.65.65 0 0 0-.919-.92L.54 4.54zM13 4.35H1v1.3h12v-1.3z" fill="#121212" />
					</svg>
				</div>
				<span>or</span>
				<div className="w-[25px] h-[23px] bg-hotKeys rounded-[4px] flex-center-center">
					<svg width="13" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.46 5.46a.65.65 0 0 0 0-.92L8.323.404a.65.65 0 1 0-.92.919L11.082 5 7.404 8.677a.65.65 0 1 0 .919.92L12.46 5.46zM0 5.65h12v-1.3H0v1.3z" fill="#121212" />
					</svg>
				</div>
				<span>-</span>
				<span>rewind 5 seconds of audio</span>
			</div>

		</div>
	)
}