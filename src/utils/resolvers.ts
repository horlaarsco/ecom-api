import { Brand, Product, User } from "../models";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {
  addModel,
  deleteModel,
  readModels,
  readModel,
  editModel,
  editUser,
  editPassword,
} from "../controller/Model";
import slugify from "slugify";

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
    product: async (_, { slug }) => {
      const product = await Product.findOne({ slug: slug })
        .populate({ path: "owner" })
        .populate({ path: "brand" });

      return product;
    },
    brands: async () => {
      return readModels(Brand);
    },
    brand: async (_, { slug }) => {
      const brand = await Brand.findOne({ slug: slug }).populate({
        path: "products",
      });
      return brand;
    },
    allProduct: async (_, { id }) => {
      const products = await Product.find({ brand: id })
        .populate({ path: "owner" })
        .populate({ path: "brand" });
      return products;
    },
  },
  Mutation: {
    addUser: async (_, { input }) => {
      try {
        const now = new Date();
        input.createdAt = JSON.stringify(now);
        input.updatedAt = JSON.stringify(now);
        input.password = await bcrypt.hash(input.password, 8);
        input.username = input.username.toLowerCase();
        input.email = input.email.toLowerCase();
        let token = jwt.sign(
          { email: input.email, password: input.password },
          process.env.JWT
        );
        input.token = token;
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
    loginUser: async (_, { input }) => {
      const user = await User.findOne({
        $or: [{ username: input.user }, { email: input.user }],
      });
      if (!user) throw new Error("Incorrect Email or Username");
      const check = await bcrypt.compare(input.password, user.password);
      console.log(check);
      if (check) {
        let token = jwt.sign(
          { email: input.email, password: input.password },
          process.env.JWT
        );
        user.token = token;
        user.save();
        return user;
      } else {
        throw new Error("Incorrect Password");
      }
    },
    logout: async (_, { id }) => {
      const user = await User.findByIdAndUpdate(id);
      user.token = "";
      user.save();
      return user;
    },
    verifylogin: async (_, { id }) => {
      const user = await User.findByIdAndUpdate(id);
      return user;
    },
  },
};
