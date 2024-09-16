import fs from "fs";
import IHashingService from "../Interface/IHashingService";
import IjwtService from "../Interface/IJwtService";
import IUserRepostiory from "../Interface/IUserRepository";
import IUserUseCase, { IReturnMessage } from "../Interface/IUserUseCase";
import cloudinary from "../infrastructure/utils/cloudinary";

class userUseCase implements IUserUseCase {
  private userRepository: IUserRepostiory
  private hashingService: IHashingService
  private jwtService: IjwtService

  constructor(userRepository: IUserRepostiory, hashingService: IHashingService, jwtService: IjwtService) {
    this.userRepository = userRepository
    this.hashingService = hashingService
    this.jwtService = jwtService
  }

  async register(name: string, email: string, password: string) {
    const userExists = await this.userRepository.checkEmailExists(email)
    if (userExists) {
      return {
        status: false,
        message: {
          email: "User already exists with this email"
        }
      }
    }

    if (password) {
      password = await this.hashingService.hashing(password)
    }

    const user = await this.userRepository.createUser(name, email, password)
    return {
      status: true,
      message: "User created successfully",
      data: user
    }
  }

  async login(email: string, password: string): Promise<IReturnMessage> {
    const user = await this.userRepository.checkEmailExists(email)
    if (!user) {
      return {
        status: false,
        message: {
          email: "User Not Found"
        }
      }
    }

    const status = await this.hashingService.compare(password, user.password)
    if (!status) {
      return {
        status: false,
        message: {
          password: "Incorrect Password"
        }
      }
    }

    const payload = { id: user._id, name: user.name }
    const token = this.jwtService.generateToken(payload)
    const refreshToken = this.jwtService.generateRefreshToken(payload)
    return {
      status: true,
      message: "User Login Succesfully",
      data: { token, refreshToken, user }
    }
  }

  async createBlog(title: string, description: string, image: any, userId: string) {
    try {
      const fileImage = await cloudinary.uploader.upload(image.path, {
        folder: "Blogs"
      })
      const blog = await this.userRepository.createBlog(title, fileImage.secure_url, description, userId)
      fs.unlinkSync(image.path);
      if (blog) {
        return {
          status: true,
          message: "Blog created successfully",
          data: blog
        }
      }
      return {
        status: false,
        message: "something went wrong failed to create blog"
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }


  async getAllBlogs() {
    try {
      return this.userRepository.getAllBlogs()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getAllBlogsByUser(userId: string) {
    try {
      return this.userRepository.getAllBlogsByUser(userId)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async deleteBlog(userId: string) {
    try {
      return this.userRepository.deleteBlog(userId)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateBlog(blogId: string, title: string, description: string, image: any) {
    try {
      let imageUrl;
      if (image.path) {
        const fileImage = await cloudinary.uploader.upload(image.path, {
          folder: "Blogs"
        })
        fs.unlinkSync(image.path);
        imageUrl = fileImage.secure_url
      } else {
        imageUrl = image
      }
      return this.userRepository.updateBlog(blogId, title, description, imageUrl)
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

export default userUseCase