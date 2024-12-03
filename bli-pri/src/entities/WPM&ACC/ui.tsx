import { FC } from "react";
import { resultTest } from "../../shared/lib/constant";

export const WpmAccBlock: FC = () => {
	return (
		<div className="flex flex-col gap-[30px]">
      <div className="flex flex-col">
        <span className="text-grey-80 text-[32px]">wpm</span>
        <span className="text-yellow text-[64px] leading-[0.8]">{resultTest.wpm}</span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-grey-80 text-[32px]">acc</span>
        <span className="text-yellow text-[64px] h-[66px] leading-[0.8]">{resultTest.acc}%</span>
      </div>
    </div>
	)
}