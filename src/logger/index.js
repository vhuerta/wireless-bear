/**
 * Local Logger, this logger outputs to the console, usage:
 *
 * logger.trace({foo: 'bar'});
 * logger.debug({foo: 'bar'});
 * logger.info({foo: 'bar'});
 * logger.warn({foo: 'bar'});
 * logger.error({foo: 'bar'});
 *
 *  @author Victor Huerta <vhuertahnz@gmail.com>
 */

const Tracer = require('tracer');
const colors = require('colors');
const config = require('../config');

const LEVELS = ['trace', 'debug', 'info', 'warn', 'error'];
const DEFAULT_LEVEL = 'debug';

class LocalLogger {
  /**
   * [level description]
   * @param {Object} options options for the logger
   */
  constructor({ level = 'debug' }) {
    colors.enabled = true;

    this.options = {};
    this.options.level = level.toLowerCase();
    this.options.level =
      LEVELS.indexOf(this.options.level) > -1
        ? this.options.level
        : DEFAULT_LEVEL;
    this.tracer = Tracer.colorConsole({ level: this.options.level });

    // Attach a partial functions for each log level
    LEVELS.forEach(logLevel => {
      this[logLevel] = this.tracer[logLevel];
    });
  }
}

/**
 * Export a new instance of logger
 */
module.exports = new LocalLogger(config.logger);
