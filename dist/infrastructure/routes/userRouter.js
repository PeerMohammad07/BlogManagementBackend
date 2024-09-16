"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtService_1 = __importDefault(require("../utils/jwtService"));
const hashingService_1 = __importDefault(require("../utils/hashingService"));
const userUserCases_1 = __importDefault(require("../../useCases/userUserCases"));
const userRepository_1 = __importDefault(require("../../adapters/repositorys/userRepository"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const userController_1 = __importDefault(require("../../adapters/controllers/userController"));
const blogSchema_1 = __importDefault(require("../model/blogSchema"));
const multer_1 = require("../midleware/multer");
const privateRoute_1 = __importDefault(require("../midleware/privateRoute"));
const userRouter = express_1.default.Router();
// Dependency Injection
const JwtService = new jwtService_1.default();
const hashingService = new hashingService_1.default();
const UserRepository = new userRepository_1.default(userSchema_1.default, blogSchema_1.default);
const UserUseCase = new userUserCases_1.default(UserRepository, hashingService, JwtService);
const UserController = new userController_1.default(UserUseCase);
userRouter.get("/getAllBlogs", UserController.getAllBlogs);
userRouter.get("/getAllBlogsByUser/:id", UserController.getAllBlogsByUser);
userRouter.post("/logout", UserController.logout);
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/createBlog", privateRoute_1.default, multer_1.ImageUpload.single('image'), UserController.createBlog);
userRouter.delete("/deleteBlog/:id", UserController.deleteBlog);
userRouter.put("/updateBlog", privateRoute_1.default, multer_1.ImageUpload.single('image'), UserController.updateBlog);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map