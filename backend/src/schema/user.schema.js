import {gql} from 'apollo-server-express';

const userTypeDef = gql(`
  type User {
    id: ID!
    email: String!
    password: String!
    boards: [Board]
    token: String
  }
  
  type Query {
    getUser(userId: ID!): User
    getUsers: [User]
  }
  
  type AuthPayload {
    token: ID!
    user: User
  }
  
  type Mutation {
     register(email: String!, password: String!): AuthPayload
     login(email: String!, password: String!): AuthPayload
  }
`)

export {
  userTypeDef
}
