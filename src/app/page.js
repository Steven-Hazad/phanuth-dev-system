"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  if (!profile) return <div className="p-10 text-center text-gray-500">Loading Academic Identity...</div>;

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 🏠 Hero / Identity Section */}
      <section className="max-w-4xl mx-auto pt-20 pb-10 px-6">
        <div className="border-l-4 border-blue-600 pl-6 mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight">
            {profile.fullName}
          </h1>
          <p className="text-xl text-blue-600 mt-2 font-medium">
            {profile.title}
          </p>
        </div>

        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          {profile.tagline}
        </p>

        {/* 📊 Quick Stats (The Academic Proof) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 uppercase font-semibold">Cumulative GPA</p>
            <p className="text-3xl font-bold text-blue-600">{profile.gpa}</p>
          </div>
          {/* We will add dynamic counts for these later */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 uppercase font-semibold">Projects</p>
            <p className="text-3xl font-bold text-slate-800">12+</p>
          </div>
        </div>
      </section>

      {/* 🎓 Language Toggle Strategy (Preview) */}
      <div className="fixed top-6 right-6">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium hover:bg-slate-50 transition shadow-sm">
          🇰🇭 Khmer
        </button>
      </div>
    </main>
  );
}