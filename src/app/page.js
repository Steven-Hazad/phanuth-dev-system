"use client";
import { useEffect, useState } from "react";
import { translations } from "@/lib/translations";

export default function Home() {
  const [data, setData] = useState({ profile: null, education: [], projects: [], skills: [] });
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  useEffect(() => {
    async function fetchData() {
      const [p, e, pr, s] = await Promise.all([
        fetch("/api/profile").then(res => res.json()),
        fetch("/api/education").then(res => res.json()),
        fetch("/api/projects").then(res => res.json()),
        fetch("/api/skills").then(res => res.json())
      ]);
      setData({ profile: p, education: e, projects: pr, skills: s });
    }
    fetchData();
  }, []);

  if (!data.profile) return <div className="h-screen flex items-center justify-center font-mono">SYSTEM_LOADING...</div>;

  return (
    <div className="bg-[#fcfcfc] text-[#1a1a1a] min-h-screen pb-20">
      {/* 🟢 NAVBAR */}
      <nav className="max-w-5xl mx-auto p-8 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter">PHANUTH<span className="text-blue-600">.DEV</span></div>
        <button onClick={() => setLang(lang === "en" ? "kh" : "en")} className="font-bold text-sm bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
          {lang === "en" ? "🇰🇭 KH" : "🇺🇸 EN"}
        </button>
      </nav>

      {/* 🟢 HERO SECTION */}
      <header className="max-w-5xl mx-auto px-8 pt-12 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6">
          {data.profile.fullName}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <p className="text-xl md:text-2xl font-medium text-slate-500 max-w-2xl">
            {lang === "en" ? data.profile.bioEn : data.profile.bioKh}
          </p>
          <div className="bg-blue-600 text-white p-8 rounded-3xl shrink-0">
             <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{t.statsGpa}</p>
             <p className="text-4xl font-black">{data.profile.gpa}</p>
          </div>
        </div>
      </header>

      {/* 🟢 PROJECTS GRID */}
      <section className="max-w-5xl mx-auto px-8 mt-32">
        <h2 className="text-3xl font-black mb-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-slate-200"></span>
          {t.projectsTitle}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map(p => (
            <div key={p.id} className="group bg-white border border-slate-200 p-8 rounded-[2rem] hover:border-blue-500 transition-all shadow-sm">
              <span className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded-full uppercase mb-4 inline-block">{p.category}</span>
              <h3 className="text-2xl font-black mb-3 group-hover:text-blue-600">{p.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.techStack.split(',').map(s => <span key={s} className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded">{s.trim()}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🟢 SKILLS BAR */}
      <section className="max-w-5xl mx-auto px-8 mt-32">
        <h2 className="text-3xl font-black mb-12">{t.skillsTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6 bg-slate-900 p-10 rounded-[2.5rem] text-white">
          {data.skills.map(s => (
            <div key={s.id} className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase opacity-60">
                <span>{s.name}</span>
                <span>{s.level}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full">
                <div className="h-full bg-blue-500" style={{width: `${s.level}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}