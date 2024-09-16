export default interface IUserSchema {
  name : string,
  email : string,
  password : string
}

export interface IBlogSchema {
  title : string,
  image : string,
  description : string,
  userId : string
}