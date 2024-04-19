"use client";
import RegisterComponent from "@/components/register";
import { SparklesCore } from "@/components/ui/sparkles";

const RegisterPage = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full z-10 absolute top-0 right-0 h-full">
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
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30">
        <RegisterComponent />
      </div>
    </div>
  );
};

export default RegisterPage;
