import { ChartOptions } from "chart.js";
import { dataChart } from "../../../shared/lib/constant";

export const chartOptions: ChartOptions<"line"> = {
	maintainAspectRatio: false,
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			mode: 'index',
			intersect: false,
			titleFont: {
				size: 14,
			},
			bodyFont: {
				size: 14,
			},
			callbacks: {
				label: (tooltipItem) => {
					const { dataset, dataIndex } = tooltipItem;
					const datasetLabel: string = dataset.label || '';
					const errorsValue: number = dataChart[dataIndex].errors.error; 
					if (datasetLabel === 'errors') return `errors: ${errorsValue}`;
				},

				labelColor: (tooltipItem) => {
					if (tooltipItem.datasetIndex === 0) {
						return {
							backgroundColor: '#CA4754', 
							borderColor: '#CA4754',
							borderWidth: 3,
						};
					}
				
					const datasetBorderColor =
						typeof tooltipItem.dataset.borderColor === 'string'
							? tooltipItem.dataset.borderColor
							: '#000';
				
					return {
						backgroundColor: datasetBorderColor,
						borderColor: datasetBorderColor,
						borderWidth: 3,
					};
				},
			}
		},
		title: {
			display: true,
			position: 'left',
			font: {
				family: 'Inter-Regular',
				weight: 'lighter',
			},
			color: 'rgb(83, 83, 83, 80%)',
			text: 'Words per minute',
		},
	},
	elements: {
		line: {
			tension: 0.3,
		},
		point: {
			radius: 2,
			hoverRadius: 4,
		}
	},
	scales: {
		x: {
			grid: {
				color: 'rgb(0, 0, 0, 50%)', 
				drawTicks: false,
			},
			ticks: {
				padding: 10,
				font: {
					size: 14,
				}
			}
		},
		y: {
			grid: {
				color: 'rgb(0, 0, 0, 50%)',
				lineWidth: 1, 
				drawTicks: false,
			},
			ticks: {
				stepSize: 20,
				maxTicksLimit: 5,
				padding: 10,
				font: {
					size: 14,
				}
			}
		}
	}
}