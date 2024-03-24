"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Check, Pencil } from "lucide-react";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
}

export default function Tasks() {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [editText, setEditText] = useState("");

  const fetchTask = async () => {
    const reponse = await fetch(`${api}/api/task`);
    const data = await reponse.json();
    setTasks(data.task);
  };

  useEffect(() => {
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
        body: JSON.stringify({
          completed: updatedCompleted,
          id: id,
        }),
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

  const handleEditTask = async (id: number) => {
    try {
      await fetch(`${api}/api/task`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: editText,
        }),
      });

      toast({
        title: "Task updated!",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error editing task!",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id: number, title: string) => {
    setEditText(title);
    console.log(tasks);
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
              <div className="flex items-center justify-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="px-1 z-20">
                      <button
                        className="flex items-center justify-center z-20"
                        onClick={() => handleEdit(task.id, task.title)}
                      >
                        <Pencil className="hover:text-violet-500" />
                      </button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col justify-center items-center w-[80%] rounded-md bg-transparent border-zinc-600">
                    <DialogHeader>
                      <h1 className="text-white font-medium">Edit Task</h1>
                    </DialogHeader>
                    <div>
                      <input
                        type="text"
                        className="w-full rounded bg-transparent border py-1 border-zinc-600 placeholder:text-white pl-2 ring-1 ring-inset ring-transparent focus:ring-1 focus:border-violet-900  focus:ring-inset focus:outline-none focus:ring-violet-900"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-5">
                      <DialogClose asChild>
                        <button className="text-black bg-zinc-300 px-3 py-1 rounded hover:bg-zinc-400 transition-colors duration-100">
                          Cancel
                        </button>
                      </DialogClose>
                      <DialogFooter>
                        <button
                          className="text-white bg-violet-700 hover:bg-violet-800 px-4 py-1 rounded transition-colors duration-100"
                          onClick={() => handleEditTask(task.id)}
                        >
                          Edit
                        </button>
                      </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="px-1 z-20">
                      <button className="flex items-center justify-center z-20">
                        <Trash2 className="hover:text-red-500" />
                      </button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col justify-center items-center w-[80%] rounded-md bg-transparent border-zinc-600">
                    <DialogHeader>
                      <h1 className="text-white font-medium">
                        Are you sure you want to delete this task?
                      </h1>
                    </DialogHeader>
                    <div className="flex items-center gap-2 mt-5">
                      <DialogClose asChild>
                        <button className="text-black bg-zinc-300 px-3 py-1 rounded hover:bg-zinc-400 transition-colors duration-100">
                          Cancel
                        </button>
                      </DialogClose>
                      <DialogFooter>
                        <button
                          className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors duration-100"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                      </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
