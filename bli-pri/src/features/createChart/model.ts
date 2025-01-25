import {
  Chart,
  LineController,
  LineElement,
  BarController, 
  BarElement,
  BubbleController,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler, 
} from "chart.js";
import { chartOptions } from "./lib/chartOptions";
import { dataChart } from "../../shared/lib/constant";

Chart.register(BubbleController, PointElement, LineController, LineElement, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);
Chart.defaults.font.size = 16;
Chart.defaults.font.family = 'JetBrainsMono-Regular';

export const createChart = () => {
	const ctx = document.getElementById('acquisitions') as HTMLCanvasElement | null;

	if (!ctx) {
		console.error("Элемент canvas не найден");
		return;
	}

	try {
		const chart: Chart<"line", number[], number> = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dataChart.map(row => row.second),
				datasets: [
					{
						label: 'errors',
						data: dataChart.map(row => row.raw + 10),
						pointStyle: 'crossRot', 
						showLine: false,
						pointRadius: 4,
						pointHoverRadius: 6, 
						
						pointBorderColor: (context) => {
							if (dataChart[context.dataIndex].errors.error == 0) {
								return 'transparent'
							} else return '#CA4754'
						},
						pointBackgroundColor: '#CA4754',
						borderWidth: 3,
					},
					{
						label: 'wpm',
						data: dataChart.map(row => row.wpm),
						pointBackgroundColor: '#FFD600',
						borderColor: '#FFD600',
						borderWidth: 3,
					},
					{
						label: 'raw',
						data: dataChart.map(row => row.raw),
						borderColor: '#636363',
						pointBackgroundColor: '#636363',
						borderWidth: 3,
						fill: true, 
						backgroundColor: 'rgba(10, 10, 10, 0.4)',
					},
				]
			},
			options: chartOptions
		});

		

		return () => {
			chart.destroy();
		};
	} catch (error) {
		console.error("Ошибка при создании диаграммы:", error);
	}
}