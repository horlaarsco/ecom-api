import { ApolloServer, gql } from "apollo-server";
import db from "./utils/connect";
import { typeDefs, resolvers } from "./utils/models";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  db.on;
  console.log(`Server ready at ${url}`);
});
