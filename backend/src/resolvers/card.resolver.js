export const cardResolver = {
  Query: {
    getCard: async (_, {cardId}, {ListModel, CardModel, BoardModel}) => {
      return await CardModel.findById(cardId).populate('list').exec();
    },
    getCards: async (_, {}, {ListModel, CardModel, BoardModel}) => {
      return await CardModel.find({});
    },
  },
  Mutation: {
    createCard: async (_, {title, description, listId, position}, {ListModel, CardModel, BoardModel}) => {
      return await CardModel.create({title, description, listId, position});
    },
    updateCard: async (_, {cardId, title, sourceListId, destinationListId, sourcePosition, destinationPosition}, {ListModel, CardModel, BoardModel}) => {
      console.log({cardId, title, sourceListId, destinationListId, sourcePosition, destinationPosition})
      let sourceCardList;
      let destinationCardList;
      // when moving the card to same list
      if (sourceListId === destinationListId) {
        if (sourcePosition > destinationPosition) {
          // when moving card from low to high position
          sourceCardList = await CardModel.find({
            listId: sourceListId,
            position: {$lt: sourcePosition, $gte: destinationPosition}
          });
          for (let i = 0; i < sourceCardList.length; i++) {
            const card = sourceCardList[i];
            card.position++;
            await card.save();
          }
        }
        // when moving the card to another list
        else {
          // when moving card from high to low position
          sourceCardList = await CardModel.find({
            listId: sourceListId,
            position: {$gt: sourcePosition, $lte: destinationPosition}
          });
          for (let i = 0; i < sourceCardList.length; i++) {
            const card = sourceCardList[i];
            card.position--;
            await card.save();
          }
        }
      } else {
        sourceCardList = await CardModel.find({listId: sourceListId, position: {$gt: sourcePosition}});
        destinationCardList = await CardModel.find({listId: destinationListId, position: {$gte: destinationPosition}});
        for (let i = 0; i < sourceCardList.length; i++) {
          const card = sourceCardList[i];
          card.position--;
          await card.save();
        }
        for (let i = 0; i < destinationCardList.length; i++) {
          const card = destinationCardList[i];
          card.position++;
          await card.save();
        }

      }
      return CardModel.findByIdAndUpdate(cardId, {listId: destinationListId, position: destinationPosition});
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
