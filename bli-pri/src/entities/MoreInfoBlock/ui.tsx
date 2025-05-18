import { FC } from "react";
import { timerTyping, words } from "../../shared/lib/constant";
import { useAppSelector } from '../../shared/hooks/useAppSelector'

export const MoreInformationBlock: FC = () => {
  const textSettings = useAppSelector(state => state.textSettings);

	return (
    <>
      <div className="flex gap-[212px] max-rOne:gap-[142px] max-rTwo:gap-[120px] max-rFour:gap-[12vw] justify-center ml-[40px] max-rFive:ml-0 mt-[26px]">
        <div className="flex flex-col">
          <span className="font-inter-regular text-xl max-rFour:text-base text-grey-80">time</span>
          <span className="font-inter-regular text-[32px] max-rFour:text-[24px] text-yellow">{timerTyping.second}s</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter-regular text-xl max-rFour:text-base text-grey-80">error</span>
          <span className="font-inter-regular text-[32px] max-rFour:text-[24px] text-yellow">{words.errors}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter-regular text-xl max-rFour:text-base text-grey-80">language</span>
          <span className="font-inter-regular text-[32px] max-rFour:text-[24px] text-yellow">{textSettings?.mode == 'dictation' ? 'english' : textSettings?.language}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter-regular text-xl max-rFour:text-base text-grey-80">words</span>
          <span className="font-inter-regular text-[32px] max-rFour:text-[24px] text-yellow">{textSettings?.mode == 'zen' ? words.finish : textSettings?.lengthText}</span>
        </div>
      </div>
    </>
	)
}