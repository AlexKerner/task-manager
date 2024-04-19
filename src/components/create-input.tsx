"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "./ui/use-toast";




export default function CreateInput() {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;
  const pathname = window.location.pathname; // Obtém o pathname da URL
  const userId = parseInt(pathname.split("/")[2], 10);

  const [titleInput, setTitleInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };

  const createTask = async () => {
    try {
      fetch(`${api}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: titleInput, userId: userId }),
      });
      setTitleInput("");
      toast({
        title: "Task created!",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating task!",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full max-w-[90.5%] mb-10 mx-auto -mt-5 z-32">
      <div className="flex justify-center items-center gap-2 w-full z-20">
        <input
          type="text"
          value={titleInput}
          onChange={handleInputChange}
          className="py-3 px-5 w-full rounded-md bg-[#222222] ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-inset focus:outline-none focus:ring-violet-900 shadow-md"
          placeholder="Create a new task..."
        />
        <button
          onClick={createTask}
          className="flex items-center justify-between gap-2 bg-violet-800 rounded-md px-4 py-3 shadow-md"
        >
          <span className="font-semibold hidden">Create</span>
          <Plus className="font-bold" />
        </button>
      </div>
    </div>
  );
}
