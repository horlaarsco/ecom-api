import { gql } from "apollo-server";
import UserModel from "./model";

export const typeDefs = gql`
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
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    verified: Boolean!
    role: String!
  }

  type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    addUser(input: UserInput): User!
  }
`;

export const resolvers = {
  Query: {
    users: async () => {
      const users = await UserModel.find();
      return users;
    },
    user: async (_, { id }) => {
      const user = await UserModel.findById(id);
      return user;
    },
  },
  Mutation: {
    addUser: async (_, { input }) => {
      console.log(Date.now());
      const user = await UserModel.create({
        ...input,
        createdAt: 277272,
        updatedAt: 2882,
      });
      return user;
    },
  },
};
