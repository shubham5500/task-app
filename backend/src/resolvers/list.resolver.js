// todo: Add validations

import {CustomError} from "../utils/error.util.js";

const listResolver = {
  List: {
    cards: async (parent, _, {CardModel}) => {
      return await CardModel.find({listId: parent._id}).exec();
    },
  },
  Query: {
    getList: async (_, {}, {ListModel, user}) => {
      if (!user) {
        throw new CustomError('Not Authenticated!', 401)
      }

      return await ListModel.find({}).exec();
    }
  },
  Mutation: {
    createList: async (_, {title, boardId, position,}, {ListModel}) => {
      return await ListModel.create({title, position, boardId});
    },
    updateList: async (_, {boardId, listId, title}, {ListModel, BoardModel}) => {
      try {
        const res = await ListModel.findOneAndUpdate({_id: listId}, {title});
        if (!res) {
          throw new Error('Id not found');
        }
        return await BoardModel.findById(boardId)
      } catch (error) {
        throw new CustomError(error.message)
      }
    },
    deleteList: async (_, {listId}, {ListModel}) => {
      return await ListModel.deleteOne({_id: listId}, {new: true}).exec();
    },
  },
}

export {
  listResolver
}
