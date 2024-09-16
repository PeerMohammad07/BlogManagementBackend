import { IBlogSchema } from "./IUserSchema"

export interface IReturnMessage {
  status : boolean,
  message : any,
  data ? : any
}

export default interface IUserUseCase {
  register(name:string,email:string,password:string) : Promise<IReturnMessage>
  login(email:string,password:string):Promise<IReturnMessage>
  createBlog(title:string,description:string,image:any,userId:string):Promise<IReturnMessage|null>
  getAllBlogs():Promise<IBlogSchema[]|null>
  getAllBlogsByUser(userId:string):Promise<IBlogSchema[]|null>
  deleteBlog(userId:string):Promise<IBlogSchema|null>
  updateBlog(blogId:string,title:string,description:string,image:string):Promise<IBlogSchema|null>
}