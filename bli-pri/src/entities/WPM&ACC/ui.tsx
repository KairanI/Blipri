import { FC } from "react";
import { resultTest } from "../../shared/lib/constant";

export const WpmAccBlock: FC = () => {
	return (
		<div className="flex flex-col gap-[30px] max-rThree:flex-row max-rThree:gap-[100px] max-rFive:gap-[50px] max-rThree:m-auto">
      <div className="flex flex-col">
        <span className="text-grey-80 text-[32px] max-rThree:flex-center-center">wpm</span>
        <span className="text-yellow text-[64px] max-rFive:text-[48px] leading-[0.8]">{resultTest.wpm}</span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-grey-80 text-[32px] max-rThree:flex-center-center">acc</span>
        <span className="text-yellow text-[64px] max-rFive:text-[48px] h-[66px] leading-[0.8]">{resultTest.acc}%</span>
      </div>
    </div>
	)
}