"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var apollo_server_express_1 = require("apollo-server-express");
var connect_1 = __importDefault(require("./utils/connect"));
var models_1 = require("./utils/models");
var server = new apollo_server_express_1.ApolloServer({ typeDefs: models_1.typeDefs, resolvers: models_1.resolvers });
server.applyMiddleware({ app: app, path: "/graphql" });
app.listen({ port: process.env.PORT }, function () {
    connect_1.default.on;
    console.log("Apollo Server on http://localhost:8000/graphql");
});
//# sourceMappingURL=app.js.map