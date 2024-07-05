"use client"
import React, { useState } from "react";
import { GiCoffeeCup } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <nav className="bg-gray-900 bg-transparent z-[100] backdrop-blur-md text-white p-4 flex justify-between items-center fixed w-full">
      <Link href={"/"}>
        <div className="logo text-2xl font-bold flex items-center">
          BuyMeChai <GiCoffeeCup className="ml-1 text-3xl" />
        </div>
      </Link>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-3xl md:hidden focus:outline-none text-white"
      >
        ☰
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-900 md:hidden absolute top-16 left-0 backdrop-blur-md  z-[1000] text-white p-4 rounded-lg shadow-lg w-full"
          >
            <ul className="flex flex-col gap-4 text-center font-semibold" onClick={() => { setMenuOpen(false) }}>
              <motion.li
                whileHover={{ backgroundColor: '#4b5563' }}
                className="p-2 rounded-lg"
              >
                <Link href="/">
                  Home
                </Link>

              </motion.li>
              {(!session) ? <><motion.li
                whileHover={{ backgroundColor: '#4b5563' }}
                className="p-2 rounded-lg"
              >
                <Link href="/login" >
                    Sign Up
                  </Link>
              </motion.li>
                <motion.li
                  whileHover={{ backgroundColor: '#4b5563' }}
                  className="p-2 rounded-lg"
                >
                  <Link href="/login" >
                    Login
                  </Link>
                </motion.li>
              </> : <>
                <motion.li
                  whileHover={{ backgroundColor: '#4b5563' }}
                  className="p-2 rounded-lg"
                >
                  <Link href="/dashboard" >
                    <div className="flex justify-center items-center">Welcome, {session.user.name}
                    <img className="ml-1 shadow-white shadow-2xl rounded-full w-[40px] h-[40px]" 
                    src={session.user.profilepic} 
                    onError={event => {
                      event.target.src = "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                    }}
                    /> 
                    </div>               
                 </Link>
                </motion.li>
                <motion.li
                  whileHover={{ backgroundColor: '#4b5563' }}
                  className="p-2 rounded-lg"
                >
                  <Link href="/login" onClick={() => { signOut() }}>
                    Signout
                  </Link>
                </motion.li>
              </>
              }
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden md:flex gap-6 font-semibold justify-center items-center">
        <Link href="/" className="inline-flex">Home</Link>
        {(session) ?
          <div className="flex items-center justify-aroun ">
            <Link href="/dashboard">
              <div className="inline-flex p-2 h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md">
                Welcome, {session.user.name}
                <img className="ml-1 shadow-white shadow-2xl rounded-full w-[40px] h-[40px]" 
                    src={session.user.profilepic} 
                    onError={event => {
                      event.target.src = "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
                    }}
                    /> 
                </div>
            </Link>
            {/* <Link href={`/${session?.user.username}`}>
              <button className="ml-2 inline-flex p-2 h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md">
                Profile
              </button>
            </Link> */}
            <Link href="/login"><button onClick={() => { signOut() }} className="ml-2 inline-flex p-2 h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md">SignOut</button></Link>
          </div> :
          <>
            <Link href="/login" className="inline-flex p-2 h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md">Sign Up</Link>
            <Link href="/login" className="inline-flex p-2 h-12 hover:animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md">Login</Link>
          </>
        }
      </div>
    </nav>
  );
}

export default Navbar;
