/**
 * Configuration tests
 */

describe('Config loader', () => {
  it('should load all the config files present in config directory', () => {
    const config = require('src/config');

    config.should.have.property('jwt').which.is.an.Object();
    config.should.have.property('logger').which.is.an.Object();
  });
});