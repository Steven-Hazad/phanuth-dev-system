"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username, password, redirect: false,
    });

    if (res.error) alert("Invalid Credentials");
    else router.push("/admin");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-sm">
        <h1 className="text-2xl font-black mb-6 text-slate-900">System Access jol ban tea STevn Teh </h1>
        <div className="space-y-4">
          <input type="text" placeholder="Username" className="w-full p-4 bg-slate-100 rounded-xl outline-none" 
            onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-4 bg-slate-100 rounded-xl outline-none" 
            onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700">
            Login to Admin
          </button>
        </div>
      </form>
    </div>
  );
}
