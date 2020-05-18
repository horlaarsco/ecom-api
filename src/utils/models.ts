import { gql } from "apollo-server";

export const typeDefs = gql`
  enum Role {
    Admin
    User
  }

  enum Category {
    Male
    Female
  }
  type User {
    id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String
    verified: Boolean!
    createdAt: String
    updatedAt: String
    role: Role
    tokens: [String]
  }

  type Brand {
    id: ID
    name: String!
    description: String!
    slug: String
  }

  type Product {
    id: ID
    name: String!
    owner: User!
    description: String!
    slug: String
    brand: Brand!
    price: Int!
    quantity: Int!
    createdAt: String
    updatedAt: String
    salePrice: Int!
    category: Category
  }

  input ProductInput {
    name: String!
    owner: String!
    description: String!
    brand: String!
    price: Int!
    quantity: Int!
    salePrice: Int!
    category: Category
  }

  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    verified: Boolean
    role: String!
  }

  input EditUserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    verified: Boolean
    role: String!
  }

  input BrandInput {
    name: String!
    description: String!
  }

  type Query {
    user(id: ID!): User!
    users: [User!]!
    brand(id: ID!): Brand!
    brands: [Brand!]!
    product(id: ID!): Product!
    products: [Product!]!
  }

  type Mutation {
    addUser(input: UserInput): User!
    editUser(input: EditUserInput, id: ID!): User!
    deleteUser(id: ID!): User!
    editPassword(password: String!, id: ID!): User!
    addBrand(input: BrandInput): Brand!
    editBrand(input: BrandInput, id: ID!): Brand!
    deleteBrand(id: ID!): Brand!
    addProduct(input: ProductInput): Product!
    editProduct(input: ProductInput, id: ID!): Product!
    deleteProduct(id: ID!): Product!
  }
`;
