import express from "express";

const app = express();
import { ApolloServer, gql } from "apollo-server-express";
import db from "./utils/connect";
import { typeDefs, resolvers } from "./utils/models";

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/graphql" });

app.get("/", (req, res) => res.send("Ola"));
app.listen({ port: process.env.PORT }, () => {
  db.on;
  console.log("Apollo Server on http://localhost:8000/graphql");
});
