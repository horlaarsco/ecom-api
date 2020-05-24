import { gql } from "apollo-server";

export const typeDefs = gql`
  enum Role {
    admin
    seller
    user
  }

  enum Category {
    Male
    Female
    Unisex
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
    token: String
    orders: [Order]
  }

  type Order {
    id: ID
    owner: ID
    firstName: String!
    lastName: String!
    address: String!
    address2: String!
    city: String
    number: String!
    postCode: Int
    createdAt: String
    updatedAt: String
    products: [String!]
  }

  type Brand {
    id: ID
    name: String!
    description: String!
    slug: String
    image: String!
    products: [Product]
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
    sizes: [String!]
    images: [String!]
    colors: [String!]
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
    sizes: [String!]
    images: [String!]
    colors: [String!]
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

  input OrderInput {
    owner: ID
    firstName: String!
    lastName: String!
    address: String!
    address2: String
    city: String
    number: String!
    products: [String!]
    postCode: Int
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
    image: String!
  }

  input LoginInput {
    user: String!
    password: String!
  }

  type Query {
    user(id: ID!): User!
    users: [User!]!
    brand(slug: String!): Brand!
    brands: [Brand!]!
    product(slug: String!): Product!
    products: [Product!]!
    allProduct(id: ID!): [Product!]
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
    loginUser(input: LoginInput): User!
    logout(id: ID): User!
    verifylogin(id: ID): User!
    addOrder(input: OrderInput): Order
  }
`;
