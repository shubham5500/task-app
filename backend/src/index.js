import express from 'express';
import mongoose from "mongoose";
import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import {ApolloServer, } from "apollo-server-express";
import {listTypeDefs} from "./schema/list.schema";
import {boardTypeDef} from "./schema/board.schema";
import {cardTypeDef} from "./schema/card.schema";
import {boardResolver} from "./resolvers/board.resolver";
import {BoardModel} from "./models/board.model";
import {ListModel} from "./models/list.model";
import {listResolver} from "./resolvers/list.resolver";
import {errorHandler} from "./utils/error.util";
import {CardModel} from "./models/card.model";
import {cardResolver} from "./resolvers/card.resolver";

const app = express();

const port = 8000;

mongoose.connect('mongodb+srv://admin:admin@task-app-cluster.apqmdns.mongodb.net/trello-clone?retryWrites=true&w=majority').then(async (data) => {

  const server = new ApolloServer({
    typeDefs: mergeTypeDefs([listTypeDefs, boardTypeDef, cardTypeDef]),
    resolvers: mergeResolvers([boardResolver, listResolver, cardResolver]),
    formatError: errorHandler,
    context: {
      BoardModel,
      ListModel,
      CardModel,
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
  });

  app.listen({port}, () => {
    console.log(`Server running on http://localhost:${port}${server.graphqlPath}`);
  })
})

