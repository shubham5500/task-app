import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import {ApolloServer, } from "apollo-server-express";
import {listTypeDefs} from "./schema/list.schema.js";
import {boardTypeDef} from "./schema/board.schema.js";
import {cardTypeDef} from "./schema/card.schema";
import {boardResolver} from "./resolvers/board.resolver";
import {BoardModel} from "./models/board.model";
import {ListModel} from "./models/list.model";
import {listResolver} from "./resolvers/list.resolver";
import {CustomError, errorHandler} from "./utils/error.util";
import {CardModel} from "./models/card.model";
import {cardResolver} from "./resolvers/card.resolver";
import {UserModel} from "./models/user.model";
import {userTypeDef} from "./schema/user.schema";
import {userResolver} from "./resolvers/user.resolver";
import bcrypt from "bcrypt";
import {CommentModel} from "./models/comment.model";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(process.env.MONGODB_URI_LOCAL)
await mongoose.connect(process.env.MONGODB_URI_LOCAL);

const authMiddleware = async (req, res, next) => {
  try {
    let decodedToken;
    let isAuth;
    const authHeader = req.get('Authorization'); // Extract token from Authorization header
    if (!authHeader) {
      isAuth = false;
      return next();
    }
    const token = authHeader;
    if (!token || token === '') {
      isAuth = false;
      return next();
    }
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    } catch (e) {
      isAuth = false;
      return next();
    }
    const user = await UserModel.findById(decodedToken.userId); // Find user by id in decoded token

    if (!user) {
      isAuth = false;
      return next();
    }
    isAuth = true;
    req.isAuth = isAuth;
    req.user = user; // Add user to request object
    next(); // Move on to next middleware or resolver
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' }); // Return error if authentication failed
  }
};
// app.use(authMiddleware)
const port = process.env.PORT;

const server = new ApolloServer({
  path: '/graphql',
  typeDefs: mergeTypeDefs([listTypeDefs, boardTypeDef, cardTypeDef, userTypeDef]),
  resolvers: mergeResolvers([boardResolver, listResolver, cardResolver, userResolver]),
  formatError: errorHandler,
  context: async ({req}) => {

    return {
      BoardModel,
      ListModel,
      CardModel,
      UserModel,
      CommentModel,
      user: req.user,
      isAuth: req.isAuth
    }
  },
});

await server.start();

server.applyMiddleware({
  app,
});

app.listen({port}, () => {
  console.log(`Server running on http://localhost:${port}${server.graphqlPath}`);
})

