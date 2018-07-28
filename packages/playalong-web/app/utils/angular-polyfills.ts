/* tslint:disable */
if (typeof angular !== undefined) {
  if (typeof angular.lowercase !== 'function') {
    angular.lowercase = text => {
      return typeof text === 'string' ? text.toLowerCase() : text;
    };
  }
}
/* tslint:enable */