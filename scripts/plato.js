var plato = require('plato');
var glob = require('glob');
// options is optional
var fileList = [
  '',
];

var options = {};
glob('./packages/playalong-components/src/**/*.js', {} /* options */, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
  fileList = files;
  var outputDir = './reports';
  // null options for this example
  var options = {
    title: 'Your Plato Report',
  };

  function callback(report){
    console.log('Plato complete');
  }

  plato.inspect(files, outputDir, options, callback);
});
