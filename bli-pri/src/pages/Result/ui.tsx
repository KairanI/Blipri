import { ButtonNextTest } from "../../entities/ButtonNextTest";
import { HotKeysResult } from "../../entities/hotkeys/hotkeysResult";
import { MoreInformationBlock } from "../../entities/MoreInfoBlock";
import { WpmAccBlock } from "../../entities/WPM&ACC";
import { ChartWidget } from "../../widgets/Chart";

export const PageResult = () => {

  return (
    <>
      <div className="m-auto mt-[217px] flex font-inter-medium w-[1240px] gap-[15px]">
        <WpmAccBlock />
        <div>
          <ChartWidget />
          <p className="text-chart opacity-80 font-inter-regular flex justify-end mr-[40px]">Time in seconds</p>
        </div>
      </div>
      <MoreInformationBlock />
      <ButtonNextTest />
      <HotKeysResult />
    </>
  );
}
