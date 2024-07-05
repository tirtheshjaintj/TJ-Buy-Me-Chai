"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fetchuserById, updateProfile } from "@/actions/userActions";
import { useSession } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
function DashBoard() {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const router = useRouter();
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

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
      setLoading(false);
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
    setLoading(true);
    e.preventDefault();
    try {
      const data = await updateProfile(formData, session?.user.username);
      getData();
      toast.success("Data Saved Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen mt-[-110px] ">
      <Toaster />
      <div className="p-10 rounded-lg shadow-lg w-full md:max-w-[60%] text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Update Your Profile
        </h2>
        <div className="flex justify-center mb-5">
          <Link href={`/${user?.username || session?.user.username}`}>
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
              <div className="p-4 bg-gray-800 rounded-lg">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  value={formData.name || session?.user.name}
                  onChange={handleChange}
                  placeholder="Name"
                  id="name"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                  required
                />
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mt-2">Email</label>
                <input
                  type="email"
                  value={formData.email ||session?.user.email}
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white mt-2"
                  disabled
                />
                <label htmlFor="username" className="block text-sm font-medium text-gray-400 mt-2">Username</label>
                <input
                  type="text"
                  value={formData.username || session?.user.username}
                  onChange={handleChange}
                  placeholder="Username"
                  id="username"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white mt-2"
                  pattern="^[a-zA-Z0-9_]+$"
                  title="Username should only contain letters, numbers, and underscores."
                  required
                />
              </div>
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
              <div className="p-4 bg-gray-800 rounded-lg">
                <label htmlFor="profilepic" className="block text-sm font-medium text-gray-400">Profile Pic URL</label>
                <input
                  type="url"
                  value={formData.profilepic || session?.user.profilepic}
                  onChange={handleChange}
                  id="profilepic"
                  placeholder="Profile Pic URL"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                  required
                />
                <label htmlFor="coverpic" className="block text-sm font-medium text-gray-400 mt-2">Cover Picture URL</label>
                <input
                  type="url"
                  value={formData.coverpic || session?.user.coverpic}
                  onChange={handleChange}
                  id="coverpic"
                  placeholder="Cover Picture URL"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white mt-2"
                  required
                />
              </div>
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
              <div className="p-4 bg-gray-800 rounded-lg">
                <label htmlFor="razorpaykey" className="block text-sm font-medium text-gray-400">Razorpay KEY</label>
                <input
                  type="text"
                  value={formData.razorpaykey}
                  onChange={handleChange}
                  placeholder="Razorpay KEY"
                  id="razorpaykey"
                  className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                  title="Razorpay KEY should only contain letters and numbers."
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
              </div>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex text-lg h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2B6CB0] to-[#3182CE] px-6 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 shadow-md"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
           {!loading?"Submit":<><svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>Saving Info...</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashBoard;
