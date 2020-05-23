import { Schema, model, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import slugify from "slugify";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is Required?"],
    maxlength: [100, "Maximum Character?"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is Required?"],
    maxlength: [100, "Maximum Character?"],
  },
  email: {
    type: String,
    required: [true, "email is Required?"],
    unique: true,
    maxlength: [100, "Maximum Character?"],
    lowercase: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "username is Required?"],
    maxlength: [100, "Maximum Character?"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is Required?"],
  },
  role: {
    type: String,
    required: [true, "role is Required?"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    required: [true, "createdAt is Required?"],
  },
  updatedAt: {
    type: String,
    required: [true, "updatedAt is Required?"],
  },
  // images: {
  //   type: String,
  //   required: [true, "images is Required?"],
  // },
  token: { type: String },
});

// UserSchema.static.fillothers = async function (username) {
//   const user = this;
//   const slug = await slugify(user.username, {
//     lower: true,
//   });
//   user.slug = slug;
//   await user.save();
//   return slug;
// };

// UserSchema.pre("save", async function (next) {
//   if (this.password) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   this.username = this.username.toLowerCase();
//   this.email = this.email.toLowerCase();
//   if (this.tokens.length === 0) {
//     this.tokens.push(
//       jwt.sign({ email: this.email, password: this.password }, process.env.JWT)
//     );
//   }

const User = model("User", UserSchema);
export default User;
