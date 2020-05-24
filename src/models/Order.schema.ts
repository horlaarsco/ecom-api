import { Schema, model, Types } from "mongoose";
import slugify from "slugify";
import User from "./User.model";

const OrderSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
  firstName: {
    type: String,
    required: [true, "images is Required?"],
  },
  lastName: {
    type: String,
    required: [true, "images is Required?"],
  },
  address: {
    type: String,
    required: [true, "images is Required?"],
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "images is Required?"],
  },
  number: {
    type: String,
    required: [true, "images is Required?"],
  },
  postCode: {
    type: Number,
    required: [true, "images is Required?"],
  },
  createdAt: {
    type: String,
    required: [true, "createdAt is Required?"],
  },
  updatedAt: {
    type: String,
    required: [true, "updatedAt is Required?"],
  },
  verified: {
    type: Boolean,
  },
});

OrderSchema.pre("validate", async function (next) {
  this.createdAt = Date.now();
  this.updatedAt = Date.now();
  this.verified = true;

  next();
});

const Order = model("Order", OrderSchema);
export default Order;
