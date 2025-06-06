exports.config = {
  output: '../../tests/e2e/codeceptjs/output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: process.env.CODECEPTJS_BASE_URL || 'http://localhost:8080', // # DevSkim: ignore DS162092
      show: false,
      windowSize: '1920x1080'
    },
    ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      screenshotFolder: '../../tests/e2e/codeceptjs/output/',
      baseFolder: '../../tests/e2e/codeceptjs/screenshots/base/',
      diffFolder: '../../tests/e2e/codeceptjs/screenshots/diff/'
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: '../../project/**/*.feature',
    steps: [
      './step_definitions/steps.js',
      '../../tests/e2e/codeceptjs/step_definitions/entrypoint.js'
    ]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: '../../tests/e2e/codeceptjs/*.test.js',
  name: 'codeceptjs'
}
