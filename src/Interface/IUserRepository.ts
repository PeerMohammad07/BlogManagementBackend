import { IBlogSchema } from "./IUserSchema"

export interface IUser{
  _id:string,
  name:string,
  email:string,
  password:string
}

export interface IBlog {
  _id : string,
  title : string,
  image : string,
  description : string
}


export default interface IUserRepostiory {
  checkEmailExists(email:string):Promise<IUser|null>
  createUser(name:string,email:string,password:string):Promise<IUser>
  createBlog(title:string,image:string,description:string,userId:string):Promise<IBlog>
  getAllBlogs():Promise<IBlogSchema[]>
  getAllBlogsByUser(userId:string):Promise<IBlogSchema[]>
  deleteBlog(blogId:string):Promise<IBlogSchema|null>
  updateBlog(blogId:string,title:string,description:string,image:string):Promise<IBlogSchema|null>
}