import {gql} from 'apollo-server-express';

const userTypeDef = gql(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    boards: [Board]!
  }
  
  type Query {
    getUser(userId: ID!): User
  }
  
  type Mutation {
       createUser(name: String!, email: String!, password: String!): User
  }
`)

export {
  userTypeDef
}
