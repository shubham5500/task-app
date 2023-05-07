import { gql } from "@apollo/client";

export const UPDATE_LIST = gql`
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