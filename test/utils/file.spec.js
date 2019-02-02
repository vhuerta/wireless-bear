const fileUtils = require('src/utils/file');

describe('File utils', () => {
  describe('#importAll', () => {
    it('should load all the configuration files except index', () => {
      const imported = fileUtils.importAll('src/config', {
        exclude: ['index.js']
      });

      imported.should.have.property('jwt').which.is.an.Object();
      imported.should.have.property('logger').which.is.an.Object();
      imported.should.not.have.property('index');
    });

    // it('should default "exclude" prop to an empty array and import everything', () => {
    //   const imported = fileUtils.importAll('src/config', {});

    //   imported.should.have.property('jwt').which.is.an.Object();
    //   imported.should.have.property('logger').which.is.an.Object();
    //   imported.should.have.property('index').which.is.an.Object();
    // });
  });
});
