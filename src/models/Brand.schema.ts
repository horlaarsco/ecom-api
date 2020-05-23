import { Schema, model, Types } from "mongoose";
import slugify from "slugify";

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  image: {
    type: String,
    required: [true, "images is Required?"],
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
});

// sw
BrandSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const Brand = model("Brand", BrandSchema);
export default Brand;
