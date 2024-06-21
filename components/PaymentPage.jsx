"use client";
import React from 'react'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { initiate,fetchuser,fetchpayments} from '@/actions/userActions';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {useSearchParams } from 'next/navigation';

const PaymentPage = ({username}) => {
    const { data: session } = useSession();
    const [paymentForm,setPaymentForm]=useState({name:"",email:"",message:"",amount:0});
    const [currentCreator,setcurrentCreator]=useState(null);
    const [currentUser,setcurrentUser]=useState(null);
    const [dbPayments,setDbPayments]=useState(null);
    const searchParams=useSearchParams();
    const handleChange=(e)=>{
       setPaymentForm({...paymentForm,[e.target.id]:e.target.value});
    }

    const getData=async(username)=>{
        const user=await fetchuser(username);
        setcurrentCreator(user);
        const dbPayments=await fetchpayments(username);
        setDbPayments(dbPayments);
    }

    const checkoutHandler=async (amount)=>{
     const isValidEmail = (email) => {
  // Basic email format check (you can customize this as needed)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

       
        if (!paymentForm.name || typeof paymentForm.name !== 'string' || paymentForm.name.trim() === '') {
          toast.error('Name is required and must be a non-empty string');
          return;
        }
      
        if (!paymentForm.email || typeof paymentForm.email !== 'string' || !isValidEmail(paymentForm.email)) {
          toast.error('Email is required and must be a valid email address');
          return;
        }
      
        // Validate amount
        if (!amount || isNaN(amount) || Math.ceil(amount) <= 0) {
          toast.error('Amount must be a valid');
          return;
        }
        if(!paymentForm.name || !paymentForm.email || Math.ceil(amount)<=0){ 
          toast.error('Fill Values Correctly to Support!');
          return;
        }
        
        const key =currentCreator?.razorpaykey||process.env.NEXT_PUBLIC_RAZORPAY_API_KEY; 
        const order=await initiate(Math.ceil(amount),username,paymentForm);
        const options = {
            key,
            amount: Math.ceil(amount),
            currency: "INR",
            name: "TIrthesh Jain",
            description: "Tirthesh Jain RazorPay",
            image: "https://avatars.githubusercontent.com/u/105976900?v=4",
            order_id: order.id,
            callback_url: `https://buymechai.vercel.app/api/razorpay`,
            prefill: {
                name: paymentForm.name,
                email: paymentForm.email,
                contact: "7589064865"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    useEffect(()=>{
        getData(username);
        setPaymentForm({...paymentForm,name:session?.user.name||"",email:session?.user.email||""});
    },[session]);

    useEffect(()=>{
      if(searchParams.get("paymentdone")=="true" && currentCreator){
        toast.success('Hurray! Thanks for Supporting Me');
        window.history.replaceState(null, '', username);
       }
    },[currentCreator]);

  return (
    <>
<div className="mt-[-100px] flex flex-col items-center">
<Toaster />
      <div className="cover w-full"> 
      <img
      src={currentCreator?.coverpic||"https://assets.cntraveller.in/photos/667298314c3597714f7e0ea3/16:9/w_960,c_limit/about1.jpg"}
      width={500}
      height={500}
      onError={event => {
        event.target.src = "https://assets.cntraveller.in/photos/667298314c3597714f7e0ea3/16:9/w_960,c_limit/about1.jpg"
      }}
      alt="Picture of the author"
      className="object-cover w-full h-[350px]"
    /></div>
    <img className="mt-[-30px] rounded-full shadow-2xl h-[100px] w-[100px]"
     src={currentCreator?.profilepic||"https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"}
      onError={event => {
        event.target.src = "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
      }}/>
   <div className="info text-center"> 
    <h1 className="text-2xl font-bold mb-3"> @{username}</h1> 
    <div className="text-slate-400">{currentCreator?.name}</div>
    <div className="text-slate-400">  Total Supporters {dbPayments ? new Set(dbPayments.map(payment => payment.email)).size : 0}  |   Total Fund ₹{dbPayments?.reduce((a,b)=>a+b.amount,0)}   </div>
   </div>
   <div className="payment flex mt-10 gap-10 justify-evenly w-full flex-col-reverse  md:flex-row md:w-[90%] mb-[100px]">    <div className="supporters backdrop-blur-md  w-full rounded-xl pl-5 pb-9">
<h2 className="text-2xl font-bold mb-5">{dbPayments?.length} Supporters 🫂 </h2>
<ul>
{dbPayments && dbPayments.length>0?dbPayments.slice(0,10).map((p,i)=>(
  <li className='my-2 flex items-center gap-2 text-wrap' key={i}><img width={30} className="rounded-full shadow-2xl" 
  src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" />{p.name} donated ₹{p.amount} {(p.message.toString().length>0) && `with a message ${p.message.toString().substr(0,20)}`}</li>
)):<>Still waiting for someone to support</>}
</ul>
    </div>
    <form className="makePayment backdrop-blur-md  w-full rounded-xl p-5 pb-9" method="POST" action="/" onSubmit={(e)=>{e.preventDefault();checkoutHandler(paymentForm.amount);}}>
    <h2 className="text-2xl font-bold my-5">Make Payment 💰</h2>
    <div className="flex">
      <input type="text" minLength="2"  className="w-full p-3 rounded-lg bg-slate-900 focus:bg-slate-800 my-2" placeholder="Enter Name" id="name" onChange={handleChange} value={paymentForm.name} required/>
    </div>
    <div className="flex">
      <input type="email"  className="w-full p-3 rounded-lg bg-slate-900 focus:bg-slate-800 my-2" placeholder="Enter Email" id="email" onChange={handleChange} value={paymentForm.email} required/>
    </div>
    <div className="flex gap-2">
      <textarea min="0" className="w-full p-3 rounded-lg bg-slate-900 focus:bg-slate-800 my-2" placeholder="Enter Message" id="message" onChange={handleChange} value={paymentForm.message}  rows="4"/>
    </div>
    <div className="flex gap-2 items-center flex-col">
      <input type="number" min="0" className="w-full p-3 rounded-lg bg-slate-900 focus:bg-slate-800 my-2" onChange={handleChange} value={paymentForm.amount} id="amount" placeholder="Enter Amount" />
      <button type="submit" className="inline-flex text-xl h-12 w-full animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md"
      >Pay 💰 To 🫂 Support </button>
    </div>
     <div className="flex flex-wrap items-center gap-2 mt-10">
      <button type="button" className=" h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md" onClick={()=>{checkoutHandler(10)}}>Pay ₹10 </button>
      <button type="button" className=" h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md" onClick={()=>{checkoutHandler(50)}}>Pay ₹50 </button>
      <button type="button" className=" h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md" onClick={()=>{checkoutHandler(100)}}>Pay ₹100</button>
      <button type="button" className=" h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md" onClick={()=>{checkoutHandler(200)}}>Pay ₹200</button>
     </div>
    </form>
</div>
</div>
    </>
  )
}

export default PaymentPage