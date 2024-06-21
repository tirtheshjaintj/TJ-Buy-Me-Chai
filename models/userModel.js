import mongoose from "mongoose";
const {Schema,model}=mongoose;
const userSchema=new Schema({
email:{
    type:String,
    unique:true,
    required:true,
},
profilepic:{
    type:String,
    default:"https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png",
},
coverpic:{
type:String,
default:"https://assets.cntraveller.in/photos/667298314c3597714f7e0ea3/16:9/w_960,c_limit/about1.jpg"
}
,name:{
    type:String,
    required:true,
},
username:{
    type:String,
    required:true,
    unique:true,
},
razorpaysecret:{
    type:String
},
razorpaykey:{
    type:String
}
},{timestamps:true});

const User=mongoose.models.users||mongoose.model("users",userSchema);
export default User;