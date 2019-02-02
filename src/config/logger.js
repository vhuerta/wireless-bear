/**
 * Config file for log constants
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

module.exports = {
  /**
   * log level, posible values:
   *
   * 'trace', 'debug', 'info', 'warn', 'error'
   *
   * @type {String}
   */
  level: process.env.LOG_LEVEL || 'info'
};
