// Karma configuration file
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const isCI = !!process.env.CI;

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      jasmine: {},
      clearContext: false
    },

    jasmineHtmlReporter: {
      suppressAll: true
    },

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/frontend'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    // 🔑 CI-safe settings
    autoWatch: !isCI,
    restartOnFileChange: !isCI,
    singleRun: isCI,

    browsers: isCI ? ['ChromeHeadlessCI'] : ['Chrome'],

    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage'
        ]
      }
    }
  });
};
