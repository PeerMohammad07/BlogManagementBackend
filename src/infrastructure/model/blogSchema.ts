import mongoose, { mongo, Schema } from "mongoose";
import { IBlogSchema } from "../../Interface/IUserSchema";

const blog = new Schema({
  title : {
    type :String,
    required: true
  },
  image : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  userId : {
    type : mongoose.Types.ObjectId,
    required : true
  }
})

const blogSchema = mongoose.model<IBlogSchema>("blogs",blog)
export default blogSchema