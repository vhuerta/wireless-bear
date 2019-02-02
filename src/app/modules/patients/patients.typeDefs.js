const { gql } = require('apollo-server-express');

module.exports = gql`
  type Patient {
    id: ID!
    name: String
    fathersSurname: String
    mothersSurname: String
  }

  type PatientsResult {
    page: Int
    limit: Int
    totalPages: Int
    found: [Patient]
  }

  input PatientsFilters {
    name: String
    fathersSurname: String
    mothersSurname: String
  }

  extend type Query {
    patients(page: Int, limit: Int, filters: PatientsFilters): PatientsResult
  }
`;
