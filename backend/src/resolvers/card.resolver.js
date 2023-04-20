import {CustomError} from "../utils/error.util";

export const cardResolver = {
  Query: {
    getCard: async (_, {cardId}, {ListModel, CardModel, BoardModel}) => {
      return await CardModel.findById(cardId).populate('list').exec();
    },
    getCards: async (_, {}, {ListModel, CardModel, BoardModel}) => {
      return await CardModel.find({}).populate('list').exec();
    },
  },
  Mutation: {
    createCard: async (_, {title, description, listId,}, {ListModel, CardModel, BoardModel}) => {
      const list = await ListModel.findById(listId).exec();
      if (!list) {
        throw new CustomError('List not fount', 404);
      }

      const card = await CardModel.create({title, description, list: listId});

      list.cards.push(card);
      await list.save();
      return card;
    },
    updateCard: async (_, {cardId, title, description, sourceListId, desListId}, {ListModel, CardModel, BoardModel}) => {
      const card = await CardModel.findOneAndUpdate(cardId, {list: desListId}, {new: true});
      await ListModel.findOneAndUpdate({_id: sourceListId}, {$pull: {cards: cardId}});
      await ListModel.findOneAndUpdate({_id: desListId}, {$push: {cards: cardId}});
      return card;
    },
    deleteCard: async (_, {cardId, listId}, {ListModel, CardModel, BoardModel}) => {
      try {
        const deletedCard = CardModel.findByIdAndDelete(cardId);
        await ListModel.findByIdAndUpdate(listId, {$pull: {cards: cardId}});

        return deletedCard;
      } catch (e) {

      }
    },
  },
}
