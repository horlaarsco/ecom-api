import { Schema, model, Types } from "mongoose";
import slugify from "slugify";

const BrandSchema = new Schema({
  name: {
    type: String,
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
});

BrandSchema.pre("validate", async function (next) {
  this.slug = await slugify(this.name, {
    lower: true,
  });
  next();
});

const Brand = model("Brand", BrandSchema);
export default Brand;
