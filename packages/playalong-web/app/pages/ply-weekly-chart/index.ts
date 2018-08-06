import { weeklyChartCtrl, plyWeeklyChart } from './ply-weekly-chart';
import WeeklyChart from './weeklyChart.service';

export default window.angular.module('PlyWeeklyChart', [])
	.controller('weeklyChartCtrl', weeklyChartCtrl)
	.component('plyWeeklyChart', plyWeeklyChart)
	.service('WeeklyChart', WeeklyChart);
