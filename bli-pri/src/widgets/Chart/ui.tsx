import { FC, useEffect } from "react";
import { createChart } from "../../features/createChart";

export const ChartWidget: FC = () => {
	useEffect(() => {
    createChart();
  }, []);

	return (
		<>
			<canvas id="acquisitions"></canvas>
		</>
	)
}