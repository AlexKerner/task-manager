'use client'
import CreateInput from '@/components/create-input'
import Header from '@/components/header'
import Tasks from '@/components/tasks'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [token, setToken] = useState("");
  const router = useRouter()
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      
      router.push("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };


  return (
    <div>
      {" "}
      <Header />
      <div className="max-w-[1024px] container">
        <CreateInput />
        <Tasks />
        <div className='mx-auto max-w-[90%] mt-10 flex justify-end items-center'>
        <button onClick={handleLogout} className='flex items-center justify-center gap-3 cursor-pointer rounded-md py-2 px-3 hover:bg-violet-800 transition-colors duration-200'>LogOut <LogOut /></button>
      </div>
      </div>
      
    </div>
  )
}
