import {gql} from 'apollo-server-express';

const commentTypeDef = gql(`
  type Comment {
    _id: ID!
    text: String!
    card: Card!
    author: User!
    createdAt: String!
  }
`)

module.exports = commentTypeDef;
