import {CustomError} from "../utils/error.util";

// todo: Add validations
const boardResolver = {
  Board: {
    lists: async (parent, __, {ListModel}) => {
      return await ListModel.find({boardId: parent.id}).exec();
    },
  },
  Query : {
    getBoards: async (_, __, {BoardModel}) => {
      return await BoardModel.find();
    },
    getBoard: async (_, { boardId }, {BoardModel}) => {
      const board = await BoardModel.findOne({_id: boardId});
      if (!board) {
        throw new CustomError('Board not found', 404);
      }
      return board;
    },
  },
  Mutation: {
    createBoard: async (_, { title }, {BoardModel}) => {
      const board = new BoardModel({title});
      return board.save();
    },
    updateBoard: async (_, {boardId, title, listId, destinationPosition}, {BoardModel, ListModel}) => {

      if (title) {
        return BoardModel.findByIdAndUpdate({_id: boardId}, {title});
      }

      const list = await ListModel.findById(listId);

      if (!list) {
        throw new Error('List not found');
      }

      const currentPos = list.position;

      if (currentPos === destinationPosition) {
        return BoardModel.findById(boardId)
      }

      // If the new position is greater than the current position
      // shift all lists between the current and new positions to the left by one.
      if (currentPos < destinationPosition) {
        const listsToShift = await ListModel.find({
          boardId: list.boardId,
          position: { $gt: currentPos, $lte: destinationPosition },
        });

        for (let i = 0; i < listsToShift.length; i++) {
          const listToShift = listsToShift[i];
          listToShift.position = listToShift.position - 1;
          await listToShift.save();
        }
      }

      // If the new position is less than the current position
      // shift all lists between the new and current positions to the right by one.
      if (currentPos > destinationPosition) {
        const listsToShift = await ListModel.find({
          boardId: list.boardId,
          position: { $gte: destinationPosition, $lt: currentPos },
        });

        for (let i = 0; i < listsToShift.length; i++) {
          const listToShift = listsToShift[i];
          listToShift.position = listToShift.position + 1;
          await listToShift.save();
        }
      }

      list.position = destinationPosition;
      await list.save();

      return BoardModel.findById(boardId);

    },
    deleteBoard: async (_, {boardId}, {BoardModel}) => {
      let res = ''
      await BoardModel.deleteOne({_id: boardId}).then( result => {
        res = result.deletedCount === 1 ? 'Deleted Successfully': 'Unsuccessful';
      });
      return res;
    }
  },

}

export {
  boardResolver
}
