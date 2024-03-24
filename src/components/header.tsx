import React from "react";
import { SparklesCore } from "./ui/sparkles";

export default function Header() {
  return (
    <div className="w-full bg-[#111111] flex items-center justify-center py-20">
      <div className="w-full z-10 absolute top-0 right-0 bottom-[68%] md:bottom-[65%] max-h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full z-10"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="sm:text-4xl md:text-5xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        My Tasks
      </h1>
    </div>
  );
}
