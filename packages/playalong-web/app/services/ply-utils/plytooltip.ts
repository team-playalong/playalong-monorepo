import $translate from 'angular-translate';

class PlyTooltip {
	public getHorizontalDirection() {
		const direction = $translate.use() === 'he' ? 'right' : 'left';
		return direction;
	}

	public setTooltip(elem) {
		const newElem = window.angular.element(elem);
		newElem.attr('uib-tooltip', 'Test');
	}
}

export default new PlyTooltip();
