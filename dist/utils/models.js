"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const model_1 = __importDefault(require("./model"));
exports.typeDefs = apollo_server_1.gql `
  enum Role {
    Admin
    User
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    verified: Boolean!
    createdAt: Int
    updatedAt: Int
    role: Role
  }

  input UserInput {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    verified: Boolean
    role: String
  }

  type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    addUser(input: UserInput): User!
    editUser(input: UserInput, id: ID!): User!
    deleteUser(id: ID!): User!
  }
`;
exports.resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield model_1.default.find();
            return users;
        }),
        user: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield model_1.default.findById(id);
            return user;
        }),
    },
    Mutation: {
        addUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(Date.now());
            const user = yield model_1.default.create(Object.assign(Object.assign({}, input), { createdAt: 277272, updatedAt: 2882 }));
            return user;
        }),
        editUser: (_, { id, input }) => __awaiter(void 0, void 0, void 0, function* () {
            let user = yield model_1.default.findByIdAndUpdate(id);
            user.username = input.username;
            user.save();
            return user;
        }),
        deleteUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield model_1.default.findByIdAndDelete(id);
            return user;
        }),
    },
};
//# sourceMappingURL=models.js.map