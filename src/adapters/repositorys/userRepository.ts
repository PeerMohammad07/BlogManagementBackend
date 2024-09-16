import IUserRepostiory, { IUser } from "../../Interface/IUserRepository";
import IUserSchema, { IBlogSchema } from "../../Interface/IUserSchema";
import { Model } from "mongoose"

class userRepository implements IUserRepostiory {

  private user: Model<IUserSchema>
  private blog : Model<IBlogSchema>

  constructor(user: Model<IUserSchema>, blog : Model<IBlogSchema>) {
    this.user = user
    this.blog = blog
  }

  async checkEmailExists(email: string): Promise<IUser|null> {
    return this.user.findOne({ email })
  }

  async createUser(name: string, email: string, password: string): Promise<IUser> {
    const user = new this.user({
      name,
      email,
      password
    })
    const savedUser = await user.save()
    return {
      _id:savedUser._id.toString(),
      name:savedUser.name,
      email:savedUser.email,
      password:savedUser.password
    }
  }

  async createBlog(title:string,image:string,description:string,userId:string){
    const blog = new this.blog({
      userId,
      title,
      image,
      description
    })
    const savedBlog =  await blog.save()
    return {
      _id:savedBlog._id.toString(),
      title:savedBlog.title,
      image:savedBlog.image,
      description:savedBlog.description,
      userId : savedBlog.userId
    }
  }

  async getAllBlogs(){
    return await this.blog.find()
  }

  async getAllBlogsByUser(userId:string){
    return await this.blog.find({userId:userId})
  }

  async deleteBlog(blogId:string){
    return await this.blog.findOneAndDelete({_id:blogId})
  }

  async updateBlog(blogId:string,title:string,description:string,image:string){
    return await this.blog.findByIdAndUpdate({_id:blogId},{$set:{title,description,image}},{new : true})
  }
}

export default userRepository