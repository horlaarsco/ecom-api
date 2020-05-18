"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
var url = process.env.MONGO;
mongoose_1.default
    .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(function () {
    return console.log("Success fully  connected to database");
})
    .catch(function (error) {
    console.log("Error connecting to database: ", error);
});
exports.db = mongoose_1.default.connection;
//# sourceMappingURL=connect.js.map