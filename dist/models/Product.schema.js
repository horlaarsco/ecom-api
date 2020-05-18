"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var slugify_1 = __importDefault(require("slugify"));
var ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.Types.ObjectId,
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
        type: mongoose_1.Types.ObjectId,
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
    this.slug = slugify_1.default(this.name);
    this.createdAt = JSON.stringify(Date.now());
    this.updatedAt = JSON.stringify(Date.now());
    next();
});
var Product = mongoose_1.model("Product", ProductSchema);
exports.default = Product;
//# sourceMappingURL=Product.schema.js.map