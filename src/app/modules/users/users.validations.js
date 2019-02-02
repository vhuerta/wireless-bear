const validateSignUp = {
  type      : 'object',
  properties: {
    name: {
      type     : 'string',
      minLength: 1,
      maxLength: 100
    },
    fathersSurname: {
      type     : 'string',
      minLength: 1,
      maxLength: 200
    },
    mothersSurname: {
      type     : 'string',
      minLength: 1,
      maxLength: 200
    },
    email: {
      type     : 'string',
      format   : 'email',
      maxLength: 200
    },
    password: {
      type   : 'string',
      pattern: '^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{6,200}$'
    },
    confirmPassword: {
      type : 'string',
      const: {
        $data: '1/password'
      }
    }
  },
  required: [
    'name',
    'fathersSurname',
    'mothersSurname',
    'email',
    'password',
    'confirmPassword'
  ]
};

const validateLogin = {
  type      : 'object',
  properties: {
    email: {
      type     : 'string',
      format   : 'email',
      maxLength: 200
    },
    password: {
      type     : 'string',
      minLength: 1,
      maxLength: 200
    }
  }
};

module.exports = { validateSignUp, validateLogin };
