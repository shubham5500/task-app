import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  }],
})

const BoardModel = mongoose.model('Board' , boardSchema);

export {
  BoardModel
}
