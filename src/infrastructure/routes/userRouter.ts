import express from "express";
import jwtService from "../utils/jwtService";
import HashingService from "../utils/hashingService";
import userUseCase from "../../useCases/userUserCases";
import userRepository from "../../adapters/repositorys/userRepository";
import userSchema from "../model/userSchema";
import userController from "../../adapters/controllers/userController";
import blogSchema from "../model/blogSchema";
import { ImageUpload } from "../midleware/multer";
import userAuth from "../midleware/privateRoute";

const userRouter = express.Router()

// Dependency Injection
const JwtService = new jwtService()
const hashingService = new HashingService()
const UserRepository = new userRepository(userSchema,blogSchema)
const UserUseCase = new userUseCase(UserRepository,hashingService,JwtService)
const UserController = new userController(UserUseCase)


userRouter.get("/getAllBlogs",UserController.getAllBlogs)
userRouter.get("/getAllBlogsByUser/:id",UserController.getAllBlogsByUser)

userRouter.post("/logout",UserController.logout)
userRouter.post("/register",UserController.register)
userRouter.post("/login",UserController.login)
userRouter.post("/createBlog",userAuth,ImageUpload.single('image'),UserController.createBlog)

userRouter.delete("/deleteBlog/:id",userAuth,UserController.deleteBlog)
userRouter.put("/updateBlog",userAuth,ImageUpload.single('image'),UserController.updateBlog)

export default userRouter