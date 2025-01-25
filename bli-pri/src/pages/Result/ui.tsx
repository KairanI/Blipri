import { useContext, useEffect } from "react";
import { ButtonNextTest } from "../../entities/ButtonNextTest";
import { HotKeysResult } from "../../entities/hotkeys/hotkeysResult";
import { MoreInformationBlock } from "../../entities/MoreInfoBlock";
import { WpmAccBlock } from "../../entities/WPM&ACC";
import { ChartWidget } from "../../widgets/Chart";
import { AdaptiveContext, AdaptiveDispatchContext } from "../../app/model/Context";

export const PageResult = () => {
  const adaptiveSettings = useContext(AdaptiveContext);
  const adaptiveDispatch = useContext(AdaptiveDispatchContext);

  useEffect(() => {
    const handleResize = () => {
      if (adaptiveDispatch) {
				adaptiveDispatch({type: 'IsPadEdit', boolean: window.innerWidth <= 970})
      	adaptiveDispatch({type: 'IsMobileEdit', boolean: window.innerWidth <= 760})
			}
    }

    window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <>
      <div className="m-auto result max-rThree:pt-[82px] flex flex-row max-rThree:flex-col font-inter-medium w-[1240px] max-rOne:w-[1023px] max-rTwo:w-[873px] max-rThree:w-[650px] max-rFour:w-[560px] max-rFive:w-[480px] max-rSix:w-[400px] max-[400px]:w-[360px] gap-[15px] max-rFive:gap-0">
        <WpmAccBlock />
        <div>
          <ChartWidget />
          <p className="text-chart opacity-80 font-inter-regular flex justify-end mr-[40px] max-rThree:mr-[25px] max-rFive:mr-[80px]">Time in seconds</p>
        </div>
      </div>
      <MoreInformationBlock />
      <ButtonNextTest />
      {!adaptiveSettings?.isMobile && <HotKeysResult />}
    </>
  );
}
