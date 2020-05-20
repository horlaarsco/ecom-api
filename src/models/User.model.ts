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
  slug: {
    type: String,
    required: [true, "Slug is Required?"],
  },
  tokens: [{ type: String }],
});

UserSchema.pre("validate", async function (next) {
  this.slug = await slugify(this.username, {
    lower: true,
  });
  this.createdAt = JSON.stringify(Date.now());
  this.updatedAt = JSON.stringify(Date.now());
  next();
});

UserSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  this.username = this.username.toLowerCase();
  this.email = this.email.toLowerCase();
  if (this.tokens.length < 0) {
    this.tokens.push(
      jwt.sign({ email: this.email, password: this.password }, process.env.JWT)
    );
  }
  next();
});

const User = model("User", UserSchema);
export default User;
