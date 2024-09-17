import { Request, Response } from "express";
import IUserUseCase from "../../Interface/IUserUseCase";

class userController {
  private userUseCase : IUserUseCase

  constructor(userUseCase:IUserUseCase){
    this.userUseCase = userUseCase
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.createBlog = this.createBlog.bind(this)
    this.getAllBlogs = this.getAllBlogs.bind(this)
    this.getAllBlogsByUser = this.getAllBlogsByUser.bind(this)
    this.deleteBlog = this.deleteBlog.bind(this)
    this.updateBlog = this.updateBlog.bind(this)
  }

  async register(req:Request<any>,res:Response<any>){
    try {
      const {name , email , password}  = req.body
      const response = await this.userUseCase.register(name,email,password)
      if(!response.status){       
       return res.status(401).json(response)
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async login(req:Request<any>,res:Response<any>){
    try {
      const {email,password} = req.body
      const response = await this.userUseCase.login(email,password)
      if(!response?.status){       
        res.status(401).json(response)
      }
      res.cookie("userToken",response.data.token,{ httpOnly: true, maxAge: 3600000 , secure : process.env.NODE_ENV != "development" })
      res.cookie("userRefreshToken",response.data.refreshToken,{ httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000,secure : process.env.NODE_ENV != "development" })
      res.status(200).json({status:true,message:response.message,data:response.data.user})
    } catch (error) {
      console.log(error)
    }
  }

  async logout(req:Request<any>,res:Response<any>) {
    try {
      res.cookie("userToken","")
      res.cookie("userRefreshToken","")
      res.status(200).json({status:true,message:"User logout successfully"})
    } catch (error) {
      console.log(error)
    }
  }

  async createBlog(req:Request<any>,res:Response<any>){
    try {
      const {title,description,userId} = req.body
      const image = req.file 
      const response = await this.userUseCase.createBlog(title,description,image,userId)
      if(!response?.status){
        return res.status(401).json(response)
      }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async getAllBlogs(req:Request<any>,res:Response<any>){
    try {
      const response = await this.userUseCase.getAllBlogs()
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async getAllBlogsByUser(req:Request<any>,res:Response<any>){
    try {
      const userId = req.params.id
      const response = await this.userUseCase.getAllBlogsByUser(userId)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteBlog(req:Request<any>,res:Response<any>){
    try {
      const blogId = req.params.id
      const response = await this.userUseCase.deleteBlog(blogId)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async updateBlog(req:Request<any>,res:Response<any>){
    try {
      let images ;
      const file = req.file
      const {blogId,title,description,image} = req.body
      if(file){
        images = file
      }else{
        images = image
      }
      const response = await this.userUseCase.updateBlog(blogId,title,description,images)
      if(!response){
        return res.status(400).json({
          status:false,
          message : "This property not exists"
        })
      }
      res.status(200).json({status:true,message:"Successfully updated",data:response})
    } catch (error) {
      console.log(error)
    }
  }
}


export default userController