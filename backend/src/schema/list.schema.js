import {gql} from 'apollo-server-express';

const listTypeDefs = gql(`
  type List {
    id: ID!
    title: String!
    board: Board!
    position: Int!
    cards: [Card]
  }
  
  type Query {
    getList: [List]
  }
  
  type Mutation {
    createList(title: String!, boardId: ID!, position: Int!): List
    updateList(listId: ID!, title: String!, position: Int): List
    deleteList(listId: ID!): List
  }
`)

export {
  listTypeDefs
};
