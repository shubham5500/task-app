import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    required: true,
    type: String,
  },
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  }]
}, {timestamps: true})

export const UserModel = mongoose.model('User', userSchema);
