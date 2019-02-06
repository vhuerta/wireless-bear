const mutationLoginTest = {
  id   : 'should test Mutation login',
  query: `
    mutation {
      login(input: {
        email: "mock@mail.com"
        password: "password"
      }) {
        id
        token
        user {
          id
          name
          fathersSurname
          mothersSurname
          email
        }
      }
    }
  `,
  variables: {},
  context  : {},
  expected : {
    data: {
      login: {
        id   : '1',
        token: 'String',
        user : {
          id            : '1',
          name          : 'String',
          fathersSurname: 'String',
          mothersSurname: 'String',
          email         : 'String'
        }
      }
    }
  }
};

const mutationSignUpTest = {
  id   : 'should test Mutation signUp',
  query: `
    mutation {
      signUp(input: {
        name: "Foo"
        fathersSurname: "Bar"
        mothersSurname: "Baz"
        email: "mock@mail.com"
        password: "password"
        confirmPassword: "password"
      }) {
        id
        token
        user {
          id
          name
          fathersSurname
          mothersSurname
          email
        }
      }
    }
  `,
  variables: {},
  context  : {},
  expected : {
    data: {
      signUp: {
        id   : '1',
        token: 'String',
        user : {
          id            : '1',
          name          : 'String',
          fathersSurname: 'String',
          mothersSurname: 'String',
          email         : 'String'
        }
      }
    }
  }
};

module.exports = { mutationLoginTest, mutationSignUpTest };
