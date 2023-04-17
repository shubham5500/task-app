import {CustomError} from "../utils/error.util";

// todo: Add validations
const boardResolver = {
  Query : {
    getBoards: async (_, __, {BoardModel}) => {
      return await BoardModel.find().populate('lists').exec();
    },
    getBoard: async (_, { boardId }, {BoardModel}) => {
      const board = await BoardModel.findOne({_id: boardId}).populate('lists').exec();
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
    updateBoard: async (_, {boardId, title}, {BoardModel}) => {
      return BoardModel.findOneAndUpdate({_id: boardId}, {title}, {new: true})
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
