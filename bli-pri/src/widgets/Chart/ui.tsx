import { FC, useEffect } from "react";
import { createChart } from "../../features/createChart";

export const ChartWidget: FC = () => {
	useEffect(() => {
    createChart();
  }, []);

	return (
		<>
			<div className="relative h-[266px] w-[1017px] max-rOne:w-[800px] max-rTwo:w-[650px] max-rFour:w-[560px] max-rFive:w-[430px] max-rSix:w-[360px]">
				<canvas id="acquisitions"></canvas>
			</div>
		</>
	)
}