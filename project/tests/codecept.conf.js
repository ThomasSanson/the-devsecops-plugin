/**
 * CodeceptJS Configuration
 *
 * Root configuration file that loads all domain features and steps.
 * Organized by Domain-Driven Design principles.
 */

exports.config = {
  output: './_output',
  include: {
    I: '../../.config/codeceptjs/steps_file.js'
  },
  gherkin: {
    features: './features/**/*.feature',
    steps: [
      '../../.config/codeceptjs/step_definitions/steps.js',
      './entrypoint.js'
    ]
  },
  name: 'devsecops-toolbox-tests'
}
