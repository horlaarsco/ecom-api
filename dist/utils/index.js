"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = exports.resolvers = exports.db = void 0;
var connect_1 = require("./connect");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return connect_1.db; } });
var resolvers_1 = require("./resolvers");
Object.defineProperty(exports, "resolvers", { enumerable: true, get: function () { return resolvers_1.resolvers; } });
var models_1 = require("./models");
Object.defineProperty(exports, "typeDefs", { enumerable: true, get: function () { return models_1.typeDefs; } });
//# sourceMappingURL=index.js.map