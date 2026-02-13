"use client";
import { useState } from "react";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState("project"); // project, education, or skill
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === "admin123") setIsLoggedIn(true); // Simple secure-ish check
    else alert("Wrong password, mate!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Convert GPA/Level to numbers
    if(data.gpa) data.gpa = parseFloat(data.gpa);
    if(data.level) data.level = parseInt(data.level);

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: tab, data }),
    });

    if (res.ok) { alert("Data Saved to MySQL!"); e.target.reset(); }
  };

  if (!isLoggedIn) return (
    <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 w-80">
        <h2 className="text-xl font-bold mb-4">Admin Access</h2>
        <input type="password" placeholder="Enter Key" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg mb-4 outline-none focus:border-blue-500" onChange={(e)=>setPass(e.target.value)} />
        <button className="w-full bg-blue-600 py-3 rounded-lg font-bold">Unlock System</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-2">
        <h1 className="font-black text-xl mb-8">ADMIN<span className="text-blue-600">.DB</span></h1>
        {['project', 'education', 'skill'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`text-left px-4 py-3 rounded-xl font-bold capitalize ${tab === t ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-500'}`}>
            Manage {t}s
          </button>
        ))}
      </div>

      {/* Form Area */}
      <div className="flex-1 p-12">
        <div className="max-w-xl bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-black mb-8 capitalize underline decoration-blue-500">Add New {tab}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "project" && (
              <>
                <input name="title" placeholder="Project Title" className="form-input" required />
                <input name="category" placeholder="Category (e.g. Web System)" className="form-input" />
                <textarea name="description" placeholder="Description" className="form-input h-32" />
                <input name="techStack" placeholder="Tech Stack (Next.js, MySQL)" className="form-input" />
              </>
            )}
            {tab === "education" && (
              <>
                <input name="degree" placeholder="Degree Name" className="form-input" />
                <input name="university" placeholder="University" className="form-input" />
                <div className="flex gap-4">
                  <input name="startDate" placeholder="Start Year" className="form-input" />
                  <input name="endDate" placeholder="End Year" className="form-input" />
                </div>
                <input name="gpa" placeholder="GPA" type="number" step="0.01" className="form-input" />
                <textarea name="achievements" placeholder="Achievements" className="form-input" />
              </>
            )}
            {tab === "skill" && (
              <>
                <input name="name" placeholder="Skill Name (e.g. JavaScript)" className="form-input" />
                <input name="category" placeholder="Category (Frontend, Backend)" className="form-input" />
                <input name="level" placeholder="Proficiency (1-100)" type="number" className="form-input" />
              </>
            )}
            <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all">Save to Database</button>
          </form>
        </div>
      </div>
      <style jsx>{`.form-input { width: 100%; padding: 0.75rem 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; outline: none; transition: 0.2s; } .form-input:focus { border-color: #2563eb; background: white; }`}</style>
    </div>
  );
}