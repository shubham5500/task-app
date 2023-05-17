import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
}, {timestamps: true})

const BoardModel = mongoose.model('Board' , boardSchema);

export {
  BoardModel
}
