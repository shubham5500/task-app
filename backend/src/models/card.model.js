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
  label: [{
   type: String,
  }],
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Users'
  // },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
}, {timestamps: true});

const CardModel = mongoose.model('Card', cardSchema);

export {
  CardModel
}
