import { FC, useContext } from "react";
import { timerTyping, words } from "../../shared/lib/constant";
import { TextContext } from "../../app/model/Context";

export const MoreInformationBlock: FC = () => {
  const textSettings = useContext(TextContext);

	return (
    <>
      <div className="flex gap-[212px] justify-center ml-[40px] mt-[26px]">
        <div className="flex flex-col">
          <span className="font-inter-regular text-xl text-grey-80">time</span>
          <span className="font-inter-regular text-[32px] text-yellow">{timerTyping.second}s</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter-regular text-xl text-grey-80">error</span>
          <span className="font-inter-regular text-[32px] text-yellow">{words.errors}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter-regular text-xl text-grey-80">language</span>
          <span className="font-inter-regular text-[32px] text-yellow">{textSettings?.language}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-inter-regular text-xl text-grey-80">words</span>
          <span className="font-inter-regular text-[32px] text-yellow">{textSettings?.lengthText}</span>
        </div>
      </div>
    </>
	)
}