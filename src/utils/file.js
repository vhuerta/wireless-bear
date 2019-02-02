const fs = require('fs');
const path = require('path');

/**
 * This function loads all the defaul exports of files in given folder and returns and object
 * where the key is the name of the file and the value is the default export of that file
 *
 * @param {String} dirname the dirname
 * @param {*} omit the list of excluded files
 */
module.exports = {
  importAll: (dirname, { exclude = [] }) => {
    // List files in this directory
    const files = fs.readdirSync(dirname);
    // For each file found add a property where the key is
    // the file name and the value the default export
    const excludedFiles = exclude.map(filename => path.basename(filename));

    const result = files.reduce((re, file) => {
      // Prevent load this file
      if (excludedFiles.indexOf(file) === -1) {
        const name = path.basename(file, path.extname(file));
        const fullPath = path.join(dirname, file);
        return { ...re, [name]: require(fullPath) };
      }

      return re;
    }, {});

    return result;
  }
};
