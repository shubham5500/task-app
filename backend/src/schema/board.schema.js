import {gql} from 'apollo-server-express';

const boardTypeDef = gql(`
  type Board {
    _id: ID!
    title: String!
    lists: [List]!
  }
  
  type Query {
    getBoards: [Board]!
    getBoard(boardId: ID!): Board
  }
  
  type Mutation {
    createBoard(title: String): Board!
    updateBoard(boardId: ID!, title: String): Board!
    deleteBoard(boardId: ID!): String
  }
`)

export {
  boardTypeDef
};
