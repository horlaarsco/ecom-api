import { Schema, model, Types } from "mongoose";
import slugify from "slugify";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
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

ProductSchema.pre("validate", function (next) {
  this.slug = slugify(this.name);
  this.createdAt = JSON.stringify(Date.now());
  this.updatedAt = JSON.stringify(Date.now());
  next();
});

const Product = model("Product", ProductSchema);
export default Product;
