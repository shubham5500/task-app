// todo: Add validations

import {CustomError} from "../utils/error.util";

const listResolver = {
  Query: {
    getList: async (_, {}, {ListModel}) => {
      return await ListModel.find({}).populate('board').populate('cards').exec();
    }
  },
  Mutation: {
    createList: async (_, {title, boardId, position,}, {ListModel, BoardModel}) => {
      const board = await BoardModel.findById(boardId);
      if (!board) {
        throw new CustomError('Board not found', 404);
      }
      const newLst = await ListModel.create({title, position, board: boardId});
      board.lists.push(newLst);

      await board.save();

      return newLst;
    },
    updateList: async (_, {listId, title, boardId, position,}, {BoardModel, ListModel}) => {
      return await ListModel.findOneAndUpdate({_id: listId}, {title, position}).populate('board').exec();
    },
    deleteList: async (_, {listId}, {ListModel}) => {
      return await ListModel.deleteOne({_id: listId}, {new: true}).exec();
    },
  },
}

export {
  listResolver
}
