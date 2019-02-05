const should = require('should');
const { makeExecutableSchema, addMockFunctionsToSchema, mockServer } = require('graphql-tools');
const { graphql } = require('graphql');
const { typeDefs } = require('src/app/modules').modules;

should.config.checkProtoEql = false;

const queryPingTest = {
  id   : 'should test Query Ping',
  query: `
    query {
      ping
    }
  `,
  variables: {},
  context  : {},
  expected : { data: { ping: 'String' } }
};

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

describe('Schema', () => {
  // Array of case types
  const cases = [queryPingTest, mutationLoginTest, mutationSignUpTest];

  const mockSchema = makeExecutableSchema({ typeDefs });

  // Here we specify the return payloads of mocked types
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks : {
      Boolean: () => false,
      ID     : () => '1',
      Int    : () => 1,
      Float  : () => 12.34,
      String : () => 'String'
    }
  });

  it('should has valid type definitions', async () => {
    should.doesNotThrow(async () => {
      const MockServer = mockServer(typeDefs);
      await MockServer.query('{ __schema { types { name } } }');
    });
  });

  cases.forEach(obj => {
    const { id, query, variables, context, expected } = obj;

    it(`${id}`, async () => {
      const result = await graphql(mockSchema, query, null, context, variables);
      should(result).be.deepEqual(expected);
    });
  });
});
