import { ApolloServer } from "apollo-server";
import db from "./utils/connect";
import { typeDefs, resolvers } from "./utils/models";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT }).then(({ url }) => {
  db.on;
  console.log(`Server ready at ${url}`);
});
