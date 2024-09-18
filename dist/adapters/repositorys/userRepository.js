"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userRepository {
    constructor(user, blog) {
        this.user = user;
        this.blog = blog;
    }
    async checkEmailExists(email) {
        return this.user.findOne({ email });
    }
    async createUser(name, email, password) {
        const user = new this.user({
            name,
            email,
            password
        });
        const savedUser = await user.save();
        return {
            _id: savedUser._id.toString(),
            name: savedUser.name,
            email: savedUser.email,
            password: savedUser.password
        };
    }
    async createBlog(title, image, description, userId) {
        const blog = new this.blog({
            userId,
            title,
            image,
            description
        });
        const savedBlog = await blog.save();
        return {
            _id: savedBlog._id.toString(),
            title: savedBlog.title,
            image: savedBlog.image,
            description: savedBlog.description,
            userId: savedBlog.userId
        };
    }
    async getAllBlogs() {
        return await this.blog.find();
    }
    async getAllBlogsByUser(userId) {
        return await this.blog.find({ userId: userId });
    }
    async deleteBlog(blogId) {
        return await this.blog.findOneAndDelete({ _id: blogId });
    }
    async updateBlog(blogId, title, description, image) {
        return await this.blog.findByIdAndUpdate({ _id: blogId }, { $set: { title, description, image } }, { new: true });
    }
}
exports.default = userRepository;
