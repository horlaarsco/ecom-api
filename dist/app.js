"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var utils_1 = require("./utils");
var server = new apollo_server_1.ApolloServer({
    typeDefs: utils_1.typeDefs,
    resolvers: utils_1.resolvers,
    playground: true,
    introspection: true,
});
server.listen({ port: process.env.PORT }).then(function (_a) {
    var url = _a.url;
    utils_1.db.on;
    console.log("Server ready at " + url);
});
//# sourceMappingURL=app.js.map