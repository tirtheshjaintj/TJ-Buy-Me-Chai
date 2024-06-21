import Payment from "@/models/paymentModel";
import User from "@/models/userModel";
import { connectDB } from "@/mongodb/connect";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
connectDB();
export const POST=async (req,res)=>{
let body=await req.formData();
body=Object.fromEntries(body);

if(!body.razorpay_order_id){
    return NextResponse.json({message:"Order Is Not Found",success:"false"});
}
//Check If Razorpaay Order Id present On Server
const payment=await Payment.findOne({oid:body.razorpay_order_id});
if(!payment){
    return NextResponse.json({message:"Order Is Not Found",success:"false"});
}

//Fetch RazorpaySecret
const user=await User.findById(payment.to_user);
const secret=user?.razorpaysecret||process.env.RAZORPAY_API_SECRET;

//verifing The Payment
const verifiedPayment=validatePaymentVerification({
    order_id:body.razorpay_order_id,
    payment_id:body.razorpay_payment_id
},body.razorpay_signature,secret);

if(verifiedPayment){
    const updatePayment=await Payment.findOneAndUpdate({
        oid:body.razorpay_order_id
    },{$set:{
        done:true,
    }},{new:true});
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/${user.username}?paymentdone=true`);
}else{
    return NextResponse.json({message:"Payment Verification failed",success:"false"});
}
}

export const GET=async(req,res)=>{
    return NextResponse.json({message:"Order Is Not Found",success:"false"});
}

