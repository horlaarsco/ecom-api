import { Schema, model, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import slugify from "slugify";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    lowercase: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 30,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
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
