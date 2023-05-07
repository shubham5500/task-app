import { gql } from "@apollo/client";

export const UPDATE_CARD = gql`
  mutation (
    $cardId: ID!
    $sourcePosition: Int!
    $destinationPosition: Int!
    $sourceListId: ID!
    $destinationListId: ID!
  ) {
    updateCard(
      cardId: $cardId
      sourcePosition: $sourcePosition
      destinationPosition: $destinationPosition
      sourceListId: $sourceListId
      destinationListId: $destinationListId
    ) {
      _id
      listId
    }
  }
`;
