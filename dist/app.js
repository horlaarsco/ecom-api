"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var utils_1 = require("./utils");
var app = express_1.default();
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: utils_1.typeDefs,
    resolvers: utils_1.resolvers,
    introspection: true,
    playground: true,
});
// @ts-ignore
server.applyMiddleware({ app: app });
var PORT = process.env.PORT;
app.get("/", function (req, res) { return res.send("ola"); });
app.listen(PORT, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:" + PORT + server.graphqlPath);
});
//# sourceMappingURL=app.js.map