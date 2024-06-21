import React from "react";
import PaymentPage from '@/components/PaymentPage';
import User from '@/models/userModel';
import { connectDB } from '@/mongodb/connect';
import {notFound} from 'next/navigation';
import { fetchuser } from "@/actions/userActions";
async function pages({params}) {
  const checkUser=async()=>{
    let user=await fetchuser(params.username);
    if(!user){
      return notFound();
    }
  }
  await checkUser();
  return (
    <>
    <PaymentPage username={params.username}/>
    </>
  )
}

export default pages