"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const connect_1 = __importDefault(require("./utils/connect"));
const models_1 = require("./utils/models");
const server = new apollo_server_1.ApolloServer({ typeDefs: models_1.typeDefs, resolvers: models_1.resolvers });
server.listen({ port: process.env.PORT }).then(({ url }) => {
    connect_1.default.on;
    console.log(`Server ready at ${url}`);
});
//# sourceMappingURL=app.js.map