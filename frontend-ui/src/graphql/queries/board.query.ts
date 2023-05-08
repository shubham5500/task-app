import {gql} from "@apollo/client";

export const GET_BOARD = gql`
    query GetBoard {
        getBoards {
            _id
            title
            lists {
                _id
                title
                position
                cards {
                    _id
                    title
                    position
                    description
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export const CREATE_BOARD = gql`
    mutation CreateBoard($title: String!) {
        createBoard(title: $title) {
            _id
            title
        }
    }
`;

export const UPDATE_BOARD = gql`
    mutation (
        $boardId: ID!
        $title: String
        $listId: ID!
        $sourcePosition: Int!
        $destinationPosition: Int!
    ) {
        updateBoard(
            boardId: $boardId
            listId: $listId
            title: $title
            sourcePosition: $sourcePosition
            destinationPosition: $destinationPosition
        ) {
            _id
            title
            lists {
                _id
                title
                position
                cards {
                    _id
                    title
                    position
                    createdAt
                }
            }
        }
    }
`;
