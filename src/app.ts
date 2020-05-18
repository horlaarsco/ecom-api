import { ApolloServer } from "apollo-server";
import { db, resolvers, typeDefs } from "./utils";

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  db.on;
  console.log(`Server ready at ${url}`);
});
