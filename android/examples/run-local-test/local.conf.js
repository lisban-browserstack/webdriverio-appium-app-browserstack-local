var browserstack = require('browserstack-local');

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || '',
  key: process.env.BROWSERSTACK_ACCESS_KEY || '',

  services: [
    ['browserstack', {
        browserstackLocal: true
    }]
],

  updateJob: false,
  specs: [
    './examples/run-local-test/specs/local_test.js'
  ],
  exclude: [],

  capabilities: [{
    project: "First Webdriverio Android Project",
    build: 'Webdriverio Android Local',
    name: 'local_test',
    device: 'Google Pixel 3',
    os_version: "9.0",
    app: process.env.BROWSERSTACK_APP_ID || '',
    'browserstack.local': true,
    'browserstack.debug': true
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 20000
  },

  // Code to start browserstack local before start of test
  onPrepare: (config, capabilities) => {
    console.log("Connecting local");
    return new Promise( (resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.key }, (error) => {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  onComplete: (capabilties, specs) => {
    console.log("Closing local tunnel");
    return new Promise( (resolve, reject) => {
      exports.bs_local.stop( (error) => {
        if (error) return reject(error);
        console.log("Stopped BrowserStackLocal");

        resolve();
      });
    });
  }
};
