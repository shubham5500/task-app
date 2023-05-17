import {gql} from 'apollo-server-express';

const cardTypeDef = gql`
    type Card {
        _id: ID!
        title: String!
        description: String
        position: Int!
        listId: ID!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getCard(cardId: ID!): Card
        getCards: [Card]
    }

    type Mutation {
        createCard(title: String!, description: String!, listId: ID!, position: Int!): Card

        updateCard(
            cardId: ID!,
            title: String,
            description: String,
            sourcePosition: Int,
            destinationPosition: Int,
            sourceListId: ID,
            destinationListId: ID
        ): Card

        deleteCard(cardId: ID!, listId: ID!): [Card]
    }
`;

export {
  cardTypeDef
};
