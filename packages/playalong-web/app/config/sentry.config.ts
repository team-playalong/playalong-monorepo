const Raven = require('raven-js');

Raven
  .config('https://23405297a5c441f29a2b51c640789371@sentry.io/293400')
  .addPlugin(require('raven-js/plugins/angular'), angular)
  .install();