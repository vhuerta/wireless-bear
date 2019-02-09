const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    name: String
    fathersSurname: String
    mothersSurname: String
    email: String
  }

  type AuthenticatedPayload {
    id: ID!
    user: User!
    token: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    name: String!
    fathersSurname: String!
    mothersSurname: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  extend type Mutation {
    login(input: LoginInput!): AuthenticatedPayload
    signUp(input: SignUpInput): AuthenticatedPayload
  }

  extend type Query {
    verifyToken: User
  } 
`;
