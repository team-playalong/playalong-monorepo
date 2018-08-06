import {
	adminWeeklyChart,
	adminWeeklySearchArea,
	adminWeeklyChartCtrl,
	adminWeeklyChordResults,
} from './admin-weekly-chart.component';

export default window.angular.module('PlyAdmin', [])
	.component('admin', {
		template: `
			<ui-view></ui-view>
		`,
	})
	.component('adminWeeklyChart', adminWeeklyChart)
	.component('adminWeeklySearchArea', adminWeeklySearchArea)
	.controller('adminWeeklyChartCtrl', adminWeeklyChartCtrl)
	.component('adminWeeklyChordResults', adminWeeklyChordResults);
