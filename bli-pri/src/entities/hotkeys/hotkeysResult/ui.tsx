import { FC } from "react"

export const HotKeysResult: FC = () => {
	return (
		<div className='w-[290px] h-[66px] m-auto text-hotKeys font-inter-medium flex text-mm hotkeysResult'>
			<div className="flex-center-center gap-[10px] m-auto">
				<div className="w-[32px] h-[23px] bg-hotKeys rounded-[4px] text-hotKeys-black flex-center-center">
					<span className="mt-[1px]">tab</span>
				</div>
				<span className="text-base">+</span>
				<div className="w-[47px] h-[23px] bg-hotKeys rounded-[4px] text-hotKeys-black flex-center-center">
					<span className="mt-[0.5px]">enter</span>
				</div>
				<span>=</span>
				<span>next test</span>
			</div>
		</div>
	)
}