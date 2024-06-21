"use client";
import { motion } from "framer-motion";
import { FaRegHandshake } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { GiCoffeeCup } from "react-icons/gi";
import Link from "next/link";

export default function Home() {

  return (
    <main className="text-white">
      <div className="flex flex-col justify-center items-center h-[70vh] text-white text-center">
        <motion.h1
          className="text-6xl md:text-8xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-5 flex items-center space-x-2"
        >
       <div className="flex flex-col items-center justify-center flex-wrap">  Buy Me Chai         <GiCoffeeCup className="text-9xl mb-4 mx-auto text-center text-white" /></div> 
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-center"
        >
          A crowdfunding platform for developers, open-source contributors and creators.
        </motion.p>
        <div>
          <div className="flex pt-5 space-x-4">

<Link href="/about">
<motion.button
  type="button"
  className="inline-flex text-lg h-12 animate-shimmer2 items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md"
  transition={{ duration: 0.3 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
    Learn More
</motion.button>
</Link>
<Link href="/login">

<motion.button
type="button"
className="inline-flex text-lg h-12 animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md"
transition={{ duration: 0.3 }}
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.9 }}
>
Let&apos;s Fund!
</motion.button>
</Link>
          </div>
        </div>
      </div>
      <section className="p-10">
        <div className="container mx-auto text-center">
          <motion.h2
          className="text-5xl mb-9 text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-5 space-x-2"
          initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className=" hover:animate-shimmer border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <FaRegHandshake className="text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Trustworthy</h3>
              <p>We ensure transparency and security in every transaction, building trust with our users.</p>
            </motion.div>
            <motion.div
              className=" hover:animate-shimmer border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <IoIosRocket className="text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Fast & Efficient</h3>
              <p>Our platform is optimized for speed, providing a seamless experience for all users.</p>
            </motion.div>
            <motion.div
              className=" hover:animate-shimmer border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <GiCoffeeCup className="text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Community Support</h3>
              <p>Join a vibrant community of developers and creators who support each other.</p>
            </motion.div>
          </div>
        </div>
      </section>




    </main>
  );
}
