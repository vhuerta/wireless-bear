/**
 * Config object generator.
 *
 * Read all files in this folder (config) and generates an object,
 * where each key is the name of the file and the value is the default export of that file
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

const { importAll } = require('../utils/file');

module.exports = importAll(__dirname, { exclude: [__filename] });
