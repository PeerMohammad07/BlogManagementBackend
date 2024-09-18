"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("../infrastructure/utils/cloudinary"));
class userUseCase {
    constructor(userRepository, hashingService, jwtService) {
        this.userRepository = userRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    async register(name, email, password) {
        const userExists = await this.userRepository.checkEmailExists(email);
        if (userExists) {
            return {
                status: false,
                message: {
                    email: "User already exists with this email"
                }
            };
        }
        if (password) {
            password = await this.hashingService.hashing(password);
        }
        const user = await this.userRepository.createUser(name, email, password);
        return {
            status: true,
            message: "User created successfully",
            data: user
        };
    }
    async login(email, password) {
        const user = await this.userRepository.checkEmailExists(email);
        if (!user) {
            return {
                status: false,
                message: {
                    email: "User Not Found"
                }
            };
        }
        const status = await this.hashingService.compare(password, user.password);
        if (!status) {
            return {
                status: false,
                message: {
                    password: "Incorrect Password"
                }
            };
        }
        const payload = { id: user._id, name: user.name };
        const token = this.jwtService.generateToken(payload);
        const refreshToken = this.jwtService.generateRefreshToken(payload);
        return {
            status: true,
            message: "User Login Succesfully",
            data: { token, refreshToken, user }
        };
    }
    async createBlog(title, description, image, userId) {
        try {
            const fileImage = await cloudinary_1.default.uploader.upload(image.path, {
                folder: "Blogs"
            });
            const blog = await this.userRepository.createBlog(title, fileImage.secure_url, description, userId);
            fs_1.default.unlinkSync(image.path);
            if (blog) {
                return {
                    status: true,
                    message: "Blog created successfully",
                    data: blog
                };
            }
            return {
                status: false,
                message: "something went wrong failed to create blog"
            };
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async getAllBlogs() {
        try {
            return this.userRepository.getAllBlogs();
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async getAllBlogsByUser(userId) {
        try {
            return this.userRepository.getAllBlogsByUser(userId);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async deleteBlog(userId) {
        try {
            return this.userRepository.deleteBlog(userId);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateBlog(blogId, title, description, image) {
        try {
            let imageUrl;
            if (image.path) {
                const fileImage = await cloudinary_1.default.uploader.upload(image.path, {
                    folder: "Blogs"
                });
                fs_1.default.unlinkSync(image.path);
                imageUrl = fileImage.secure_url;
            }
            else {
                imageUrl = image;
            }
            return this.userRepository.updateBlog(blogId, title, description, imageUrl);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}
exports.default = userUseCase;
