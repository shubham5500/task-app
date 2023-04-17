import {gql} from 'apollo-server-express';

const cardTypeDef = gql(`
  type Card {
    id: ID!
    title: String!
    description: String
    list: List!
  }
  
  type Query {
    getCard(cardId: ID!): Card
  }
  
  type Mutation {
    createCard(title: String, description: String!, listId: ID!, position: Int!): Card
    updateCard(cardId: ID!, title: String, description: String, position: Int): Card
    deleteCard(cardId: ID!): Card
  }
`);

export {
  cardTypeDef
};
