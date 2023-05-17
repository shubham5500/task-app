import {gql} from "@apollo/client";

export const UPDATE_CARD = gql`
  mutation (
    $cardId: ID!
    $title: String
    $description: String
    $sourcePosition: Int
    $destinationPosition: Int
    $sourceListId: ID
    $destinationListId: ID
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

export const CREATE_CARD = gql`
    mutation(
        $title: String!,
        $description: String!,
        $listId: ID!,
        $position: Int!) {
        createCard(
            title: $title,
            description: $description,
            listId: $listId,
            position: $position) {
            title
        }
    }
`

export const GET_CARD_DETAIL = gql`
    query($cardId: ID!) {
        getCard(cardId: $cardId) {
            _id
            title
            description
        }
    }
`

export const DELETE_CARD = gql`
    mutation($cardId: ID!, $listId: ID!) {
        deleteCard(cardId: $cardId, listId: $listId) {
            _id
            title
            position
        }
    }
`
