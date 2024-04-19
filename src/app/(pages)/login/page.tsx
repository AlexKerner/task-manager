"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      const userId = data.user.id;
      if (response.ok) {
        setIsLoading(false);
        localStorage.setItem("accessToken", data.user.token);
        router.push(`/home/${userId}`)
      }
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return error;
    }
  };

  return (
    <div className="flex flex-col z-30 border-[3px] px-10 py-10 rounded-md gap-5 backdrop-blur-[4px] max-w-[85%] sm:max-w-[100%] mx-auto">
      <h1 className="text-3xl font-semibold mb-10">Sign In</h1>
      <label htmlFor="" className="flex flex-col gap-2 z-30">
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className="bg-transparent px-3 py-2 border rounded-md z-30 ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:outline-none focus:ring-none focus:border-violet-700"
        />
      </label>
      <label htmlFor="" className="flex flex-col gap-2 z-30">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-transparent px-3 py-2 border rounded-md z-30 ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:outline-none focus:ring-none focus:border-violet-700"
        />
      </label>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="bg-violet-800 py-3 rounded-md font-semibold tracking-wide transition-opacity hover:opacity-70 flex justify-center items-center"
      >
        {isLoading ? (
          <div>
            <LoaderCircle className="animate-spin h-6 w-6"/>
          </div>
        ) : (
          <span>Login</span>
        )}
      </button>
      <span className="z-50">
        Not have an account yet?{" "}
        <Link href={"/register"} className="text-violet-500 hover:underline">
          Sign Up
        </Link>
        .
      </span>
    </div>
  );
};

export default LoginPage;
