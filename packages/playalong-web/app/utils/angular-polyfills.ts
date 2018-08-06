export default function angularPolyfill() {
	if (typeof window.angular !== undefined) {
		if (typeof window.angular.lowercase !== 'function') {
			window.angular.lowercase = text => {
				return typeof text === 'string' ? text.toLowerCase() : text;
			};
		}
	}

}
