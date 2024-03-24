"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Check } from "lucide-react";
import { toast } from "./ui/use-toast";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";

interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
}

export default function Tasks() {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    const fetchTask = async () => {
      const reponse = await fetch(`${api}/api/task`);
      const data = await reponse.json();
      console.log(data.task);
      setTasks(data.task);
    };
    fetchTask();
  }, [tasks]);

  const handleDelete = (id: number) => {
    try {
      fetch(`${api}/api/task`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      toast({
        title: "Task deleted!",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting task!",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  const handleTaskCompletion = async (id: number) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) {
        throw new Error(`Task with id ${id} not found`);
      }
      const updatedCompleted = !taskToUpdate.completed;
      await fetch(`${api}/api/task`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: updatedCompleted, id: id }), // Define o campo completed como true
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: updatedCompleted } : task
        )
      );
      toast({
        title: `Task ${updatedCompleted ? "completed!" : "incomplete!"}`,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error completing task!",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-[90%] mt-10 z-32">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-2">
          <span className="text-violet-500 font-medium">Tasks</span>
          <div className="bg-[#222222] rounded-[0.65rem] px-3 flex justify-center items-center text-center">
            <span className="flex justify-center items-center text-center">
              {tasks.length}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-green-400 font-medium">Completed</span>
          <div className="bg-[#222222] rounded-[0.65rem] px-3 flex justify-center items-center text-center">
            <span className="flex justify-center items-center text-center">
              {tasks.filter((task) => task.completed).length}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#222222] w-full h-0.5 rounded-xl my-5" />
      <div className="flex items-center flex-col gap-2 justify-center w-full z-20">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-[#222222] w-full rounded-md py-3 z-20 px-2 gap-3 ${
              task.completed ? "line-through opacity-50" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3 z-20">
              <div className="flex items-center z-20">
                <input
                  type="checkbox"
                  checked={task.completed}
                  id={`task-${task.id}`}
                  className="hidden"
                  onChange={() => handleTaskCompletion(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className="flex items-center"
                >
                  <div
                    className={`w-5 h-5 cursor-pointer rounded-[90%] border-violet-600 border-2 mr-2.5 ${
                      task.completed ? "bg-violet-700" : ""
                    }`}
                    style={{ position: "relative" }}
                  >
                    {task.completed && (
                      <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-1 cursor-pointer" />
                    )}{" "}
                  </div>
                  {task.title}
                </label>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="px-1 z-20">
                    <button
                      className="flex items-center justify-center z-20"
                    >
                      <Trash2 className="hover:text-red-500" />
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="flex flex-col justify-center items-center">
                  <DialogHeader>
                    <h1 className="text-black font-medium">Are you sure you want delet this task?</h1>
                  </DialogHeader>
                  <div className="flex items-center gap-2">
                    <DialogClose asChild>
                      <button className="text-black bg-zinc-300 px-3 py-1 rounded hover:bg-zinc-400 transition-colors duration-100">
                        Cancel
                      </button>
                    </DialogClose>
                    <DialogFooter>
                      <button className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors duration-100" onClick={() => handleDelete(task.id)}>
                        Delete
                      </button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
