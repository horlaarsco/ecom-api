import { Brand, Product, User } from "../models";
import {
  addModel,
  deleteModel,
  readModels,
  readModel,
  editModel,
  editUser,
  editPassword,
} from "../controller/Model";

export const resolvers = {
  Query: {
    users: async () => {
      return readModels(User);
    },
    user: async (_, { id }) => {
      return readModel(User, id);
    },
    products: async () => {
      const products = await Product.find()
        .populate({ path: "owner" })
        .populate({ path: "brand" });
      return products;
    },
    product: async (_, { id }) => {
      const product = await Product.findById(id)
        .populate({ path: "owner" })
        .populate({ path: "brand" });
      return product;
    },
    brands: async () => {
      return readModels(Brand);
    },
    brand: async (_, { id }) => {
      return readModel(Brand, id);
    },
  },
  Mutation: {
    addUser: async (_, { input }) => {
      try {
        const validation = User.validate(input);
        if (validation.error) {
          throw new Error(`${validation.error.message}`);
        }
        const model = await User.create(input);
        return model;
      } catch (error) {
        if (error.code == 11000) {
          throw new Error(`Duplicate`);
        } else {
          throw new Error(error);
        }
      }
    },
    editUser: async (_, { id, input }) => {
      return editUser(User, id, input);
    },
    editPassword: async (_, { id, password }) => {
      return editPassword(User, id, password);
    },
    deleteUser: async (_, { id }) => {
      return deleteModel(User, id);
    },
    addBrand: async (_, { input }) => {
      return addModel(Brand, input);
    },
    editBrand: async (_, { id, input }) => {
      return editModel(Brand, id, input);
    },
    deleteBrand: async (_, { id }) => {
      return deleteModel(Brand, id);
    },
    addProduct: async (_, { input }) => {
      const model = await Product.create(input);
      const product = await model
        .populate({ path: "owner" })
        .populate({ path: "brand" })
        .execPopulate();
      return product;
    },
    deleteProduct: async (_, { id }) => {
      return deleteModel(Product, id);
    },
    editProduct: async (_, { id, input }) => {
      let Keys = Object.keys(input);
      let product = await Product.findByIdAndUpdate(id);
      Keys.map((key) => {
        if (product[key] != input[key]) {
          return (product[key] = input[key]);
        }
      });
      product.save();
      const model = await product
        .populate({ path: "owner" })
        .populate({ path: "brand" })
        .execPopulate();
      return model;
    },
  },
};
