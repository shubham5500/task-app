import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  },
});

const ListModel = mongoose.model('List', listSchema);

export {
  ListModel
}
