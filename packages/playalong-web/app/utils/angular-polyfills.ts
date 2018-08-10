(window as any).angular.lowercase = text => {
	return typeof text === 'string' ? text.toLowerCase() : text;
};
