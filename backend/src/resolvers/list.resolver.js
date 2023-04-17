// todo: Add validations
const listResolver = {
  Query: {
    getList: async (_, {}, {ListModel}) => {
      return await ListModel.find({}).populate('board').exec();
    }
  },
  Mutation: {
    createList: async (_, {title, boardId, position,}, {ListModel}) => {
      const newLst = new ListModel({title, position, board: boardId});
      return newLst.save();
    },
    updateList: async (_, {listId, title, boardId, position,}, {BoardModel, ListModel}) => {
      return await ListModel.findOneAndUpdate({_id: listId}, {title, position}).populate('board').exec();
    },
    deleteList: async (_, {listId}, {ListModel}) => {
      return await ListModel.deleteOne({_id: listId}).exec();
    },
  },
}

export {
  listResolver
}
