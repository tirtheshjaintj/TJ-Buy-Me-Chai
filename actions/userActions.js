"use server";
import Razorpay from "razorpay";
import Payment from "@/models/paymentModel";
import { connectDB } from "@/mongodb/connect";
import User from "@/models/userModel";
export const initiate =async (amount,to_user,paymentform)=>{
  await connectDB();
  const user=await User.findOne({username:to_user}).lean();
  if(user){
  const key_secret=user.razorpaysecret||process.env.RAZORPAY_API_SECRET;
  const key_id=user.razorpaykey||process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
  const instance=new Razorpay({
      key_id,
      key_secret
    }
  )
  const options={
    amount:Number.parseInt(amount)*100,
    currency:"INR",
  }
  const paymentInit=await instance.orders.create(options);
  const{name,message,email}=paymentform;
  const payment=await Payment.create({
    oid:paymentInit.id,
    amount,
    to_user:user?._id,
    name,
    message,
    email
  });
  return paymentInit;
}
return {};
}

export const fetchuser=async (username)=>{
  await connectDB();
  const user=await User.findOne({username}).select("-_id").lean();
  return user;
}

export const fetchuserById=async (userId)=>{
  await connectDB();
  const user=await User.findById(userId).select("-_id").lean();
  return user;
}

export const fetchpayments=async (username)=>{
  await connectDB();
  const user=await User.findOne({username}).lean();
  if(user){
  const payments=await Payment.find({to_user:user?._id,done:true}).select("amount name message -_id").sort({amount:-1}).lean();
  return payments;
  }
  return [];
}

export const updateProfile=async (data,oldusername)=>{
  await connectDB();
const nData=data;
//If the username is update check if username is available
if(oldusername!==nData.username){ 
  const user=await User.findOne({username:nData.username}).lean();
  if(user){
    throw new Error("Username Already Exists");  
  }
}
const userdata=await User.updateOne({email:nData.email},{...nData,email:undefined}).lean();
return userdata;
}