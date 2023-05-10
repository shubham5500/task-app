import { gql } from "@apollo/client";

const UPDATE_LIST = gql`
   mutation($boardId: ID!, $listId: ID!, $title: String!, $position: Int) {
    updateList(boardId: $boardId, listId: $listId, title: $title, position: $position) {
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
            }
        }
  }
}
`;

const ADD_LIST = gql`
    mutation($title: String!, $boardId: ID!, $position: Int!) {
        createList(title: $title, boardId: $boardId, position: $position) {
            _id
            title
        }
    }
`;

export {
    UPDATE_LIST,
    ADD_LIST,
}
