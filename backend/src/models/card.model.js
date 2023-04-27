import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    default: 1,
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
});

const CardModel = mongoose.model('Card', cardSchema);

export {
  CardModel
}
