const plato = require('es6-plato');
const src = [
  './packages/playalong-components/src/**/*.js',
  './packages/playalong-web/app/**/*.js',
];
let outputDir = './artifacts/reports';

let platoArgs = {
  title: 'Your Plato Report',
};

//you can use the reports in the callback.
function callback(reports){
  let overview = plato.getOverviewReport(reports);
  let {
    total,
    average
  } = overview.summary;

  let output = `total
    ----------------------
    eslint: ${total.eslint}
    sloc: ${total.sloc}
    maintainability: ${total.maintainability}
    average
    ----------------------
    eslint: ${average.eslint}
    sloc: ${average.sloc}
    maintainability: ${average.maintainability}`;

  console.log(output);
}


//usage is plato.inspect
plato.inspect(src, outputDir, platoArgs, callback);
