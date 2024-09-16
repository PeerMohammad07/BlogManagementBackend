import mongoose,{Schema} from "mongoose"
import IUserSchema from "../../Interface/IUserSchema"

const user = new Schema({
  name : {
    type:String,
    required:true
  },
  email : {
    type:String,
    required : true
  },
  password : {
    type:String,
    required:true
  }
})

const userSchema = mongoose.model<IUserSchema>("user",user)

export default userSchema