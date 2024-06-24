"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fetchuserById, updateProfile } from "@/actions/userActions";
import { useSession } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
function DashBoard() {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const router=useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpaykey: "",
    razorpaysecret: "",
  });

  const getData = async () => {
    if (session) {
      const userData = await fetchuserById(session?.user.userid);
      setUser(userData);
      setFormData({ ...userData, createdAt: undefined, updatedAt: undefined, _id: undefined, __v: undefined });
    }
  }

  const [isOpen, setIsOpen] = useState({
    personalInfo: true,
    mediaInfo: false,
    paymentInfo: false,
  });

  const handleToggle = (section) => {
    setIsOpen((prev) => ({
      personalInfo: section === 'personalInfo' ? !prev.personalInfo : false,
      mediaInfo: section === 'mediaInfo' ? !prev.mediaInfo : false,
      paymentInfo: section === 'paymentInfo' ? !prev.paymentInfo : false,
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const data = await updateProfile(formData, session?.user.username);
      console.log(data);
      getData();
      toast.success("Data Saved Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, [session]);



  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen mt-[-110px] ">
      <Toaster />
      <motion.div
        className="p-10 rounded-lg shadow-lg w-full md:max-w-[60%] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Update Your Profile
        </h2>
        <div className="flex justify-center mb-5">
        <Link href={`/${user?.username}`}>
    <button className="ml-2 inline-flex items-center h-12 animate-shimmer justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] px-6 font-bold transition-colors focus:outline-none focus:ring-2 hover:ring-blue-400 focus:ring-offset-2 hover:ring-offset-blue-50 shadow-md">
      <span className="mr-2">View Profile</span>
      <FaEye className="text-xl" />
    </button>
  </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <motion.button
              type="button"
              onClick={() => handleToggle("personalInfo")}
              className="inline-flex text-lg h-12 w-full items-center justify-center rounded-lg border border-blue-800 bg-gradient-to-r from-[#2B6CB0] to-[#3182CE] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md"
              whileTap={{ scale: 0.95 }}
            >
              Personal Information
            </motion.button>
            {isOpen.personalInfo && (
              <motion.div
                className="p-4 bg-gray-800 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  id="name"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                  required
                />
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mt-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white mt-2"
                  disabled
                />
                <label htmlFor="username" className="block text-sm font-medium text-gray-400 mt-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  id="username"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white mt-2"
                  pattern="^[a-zA-Z0-9_]+$"
                  title="Username should only contain constters, numbers, and underscores."
                  required
                />
                <div className="flex">
    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
    </span>
    <input
      type="text"
      id="website-admin"
      className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="elonmusk"
    />
  </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <motion.button
              type="button"
              onClick={() => handleToggle("mediaInfo")}
              className="inline-flex text-lg h-12 w-full items-center justify-center rounded-lg border border-blue-800 bg-gradient-to-r from-[#2B6CB0] to-[#3182CE] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md"
              whileTap={{ scale: 0.95 }}
            >
              Media Information
            </motion.button>
            {isOpen.mediaInfo && (
              <motion.div
                className="p-4 bg-gray-800 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="profilepic" className="block text-sm font-medium text-gray-400">Profile Pic URL</label>
                <input
                  type="url"
                  value={formData.profilepic}
                  onChange={handleChange}
                  id="profilepic"
                  placeholder="Profile Pic URL"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                  required
                />
                <label htmlFor="coverpic" className="block text-sm font-medium text-gray-400 mt-2">Cover Picture URL</label>
                <input
                  type="url"
                  value={formData.coverpic}
                  onChange={handleChange}
                  id="coverpic"
                  placeholder="Cover Picture URL"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white mt-2"
                  required
                />
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <motion.button
              type="button"
              onClick={() => handleToggle("paymentInfo")}
              className="inline-flex text-lg h-12 w-full items-center justify-center rounded-lg border border-blue-800 bg-gradient-to-r from-[#2B6CB0] to-[#3182CE] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md"
              whileTap={{ scale: 0.95 }}
            >
              Payment Information
            </motion.button>
            {isOpen.paymentInfo && (
              <motion.div
                className="p-4 bg-gray-800 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="razorpaykey" className="block text-sm font-medium text-gray-400">Razorpay KEY</label>
                <input
                  type="text"
                  value={formData.razorpaykey}
                  onChange={handleChange}
                  placeholder="Razorpay KEY"
                  id="razorpaykey"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                  title="Razorpay KEY should only contain constters and numbers."
                  required
                />
                <label htmlFor="razorpaysecret" className="block text-sm font-medium text-gray-400 mt-2">Razorpay Secret</label>
                <input
                  type="text"
                  value={formData.razorpaysecret}
                  onChange={handleChange}
                  id="razorpaysecret"
                  placeholder="Razorpay Secret"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white mt-2"
                  required
                />
              </motion.div>
            )}
          </div>

          <motion.button
            type="submit"
            className="inline-flex text-lg h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B6CB0] to-[#3182CE] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md"
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default DashBoard;
