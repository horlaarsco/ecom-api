import { Schema, model, Types } from "mongoose";
import slugify from "slugify";
import { Brand } from "../models";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sizes: [
    {
      type: String,
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  colors: [
    {
      type: String,
    },
  ],
  brand: {
    type: Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
});

ProductSchema.pre("validate", async function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  this.createdAt = JSON.stringify(Date.now());
  this.updatedAt = JSON.stringify(Date.now());
  const brand = await Brand.findByIdAndUpdate(this.brand);
  brand.products = [...brand.products, this._id];
  brand.save();
  next();
});

const Product = model("Product", ProductSchema);
export default Product;
