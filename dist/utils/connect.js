"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const url = process.env.MONGO;
mongoose_1.default
    .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
    return console.log(`Successfully connected to database`);
})
    .catch((error) => {
    console.log("Error connecting to database: ", error);
});
let db = mongoose_1.default.connection;
exports.default = db;
//# sourceMappingURL=connect.js.map