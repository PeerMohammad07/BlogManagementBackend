"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./infrastructure/config/db"));
const userRouter_1 = __importDefault(require("./infrastructure/routes/userRouter"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Config the Dotenv
dotenv_1.default.config();
// Use morgan middleware to log HTTP requests
app.use((0, morgan_1.default)("dev"));
// Setting Cors 
app.use((0, cors_1.default)({
    origin: ["https://blog-management-system-omega.vercel.app", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use((0, cookie_parser_1.default)());
// For parsing application/json
app.use(express_1.default.json());
// For parsing application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../infrastructure/public")));
app.use("/api", userRouter_1.default);
// Mongodb Connect
(0, db_1.default)();
// Server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running : http://localhost:4000");
});
exports.default = app;
