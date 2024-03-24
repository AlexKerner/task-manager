"use client";
import CreateInput from "@/components/create-input";
import Header from "@/components/header";
import Tasks from "@/components/tasks";

export default function Home() {
  return (
    <div>
      {" "}
      <Header />
      <div className="max-w-[1024px] container">
        <CreateInput />
        <Tasks />
      </div>
    </div>
  );
}
