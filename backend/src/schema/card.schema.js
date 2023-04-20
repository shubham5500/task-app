import {gql} from 'apollo-server-express';

const cardTypeDef = gql(`
  type Card {
    id: ID!
    title: String!
    description: String
    position: Int!
    list: List!
  }
  
  type Query {
    getCard(cardId: ID!): Card
    getCards: [Card]
  }
  
  type Mutation {
    createCard(title: String!, description: String!, listId: ID!, position: Int!): Card
    
    updateCard(cardId: ID!,
     title: String,
     description: String,
     position: Int,
     sourceListId: ID!,
     desListId: ID!
     ): Card
     
    deleteCard(cardId: ID!, listId: ID!): Card
  }
`);

export {
  cardTypeDef
};
