exports.config = {
  output: './_output',
  include: {
    I: '../../../.config/codeceptjs/steps_file.js',
    Admin: './actors/Admin.js',
    ApplicationLoginPage: './pages/LoginPage.js',
    ApplicationHomePage: './pages/HomePage.js'
  },
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: process.env.CODECEPTJS_BASE_URL,
      show: false,
      windowSize: '1920x1080',
      waitForNavigation: 'domcontentloaded',
      ignoreHTTPSErrors: true,
      chromium: {
        args: [
          '--ignore-certificate-errors',
          '--font-render-hinting=none',
          '--disable-font-subpixel-positioning',
          '--disable-lcd-text'
        ]
      }
    },
    ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      screenshotFolder: './_output/',
      baseFolder: './screenshots/base/',
      diffFolder: './screenshots/diff/'
    }
  },
  hooks: [],
  gherkin: {
    features: './features/**/*.feature',
    steps: [
      '../../../.config/codeceptjs/step_definitions/steps.js',
      './step_definitions/application_steps.js'
    ]
  },
  plugins: {
    screenshotOnFail: { enabled: true },
    retryFailedStep: { enabled: true },
    tryTo: { enabled: true },
    pageInfo: {
      enabled: true,
      browserLogs: ["verbose", "debug", "info", "log", "warning", "error"]
    }
  },
  name: 'application-e2e'
}
