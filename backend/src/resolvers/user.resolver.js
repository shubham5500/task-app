import {CustomError} from "../utils/error.util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userResolver = {
  Query: {
    getUsers: async (_, {userId}, {UserModel}) => {
      return await UserModel.find({});
    },
    getUser: async (_, {userId}, {UserModel}) => {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      return user;
    }
  },
  Mutation: {
    register: async (_, {email, password}, {UserModel}) => {
      const user = await UserModel.findOne({email});
      console.log({user})
      if (user) {
        throw new CustomError('User already exists', 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({email, password: hashedPassword});
      newUser.save();

      const token = jwt.sign({user: newUser._id}, 'mySecret');
      return {newUser, token};
    },
    login: async (_, {email, password}, {UserModel}) => {
      const user = await UserModel.findOne({email});
      if (!user) {
        throw new CustomError('User not found', 404);
      }

      const validPassword = bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new CustomError('Password is not valid', 401);
      }

      const token = jwt.sign({ userId: user._id }, 'mySecret');

      return {user, token}

    }
  }
}
