if (typeof angular !== undefined) {
  if (typeof angular.lowercase !== 'function') {
    angular.lowercase = (text: string) => {
      return typeof text === 'string' ? text.toLowerCase() : text;
    };
  }
}