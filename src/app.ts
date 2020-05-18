import express from "express";
import { ApolloServer } from "apollo-server-express";
import { db, resolvers, typeDefs } from "./utils";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

// @ts-ignore
server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
