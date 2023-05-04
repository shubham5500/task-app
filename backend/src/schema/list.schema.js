import {gql} from 'apollo-server-express';

const listTypeDefs = gql`
    type List {
        _id: ID!
        title: String!
        boardId: ID!
        board: Board
        cards: [Card]
        position: Int!
    }

    type Query {
        getList: [List]
    }

    type Mutation {
        createList(title: String!, boardId: ID!, position: Int!): List
        updateList(boardId: ID!, listId: ID!, title: String, position: Int): Board
        deleteList(listId: ID!): List
    }
`

export {
  listTypeDefs
};
