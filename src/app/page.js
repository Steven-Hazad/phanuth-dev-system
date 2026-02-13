"use client";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const [data, setData] = useState({ projects: [], education: [], skills: [] });
  const [lang, setLang] = useState("en");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // 📩 Handle Contact Form
  const handleMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if(res.ok) {
      alert("System: Message transmitted successfully.");
      e.target.reset();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [p, e, s] = await Promise.all([
        fetch("/api/admin?type=project").then(res => res.json()),
        fetch("/api/admin?type=education").then(res => res.json()),
        fetch("/api/admin?type=skill").then(res => res.json()),
      ]);
      setData({ projects: p, education: e, skills: s });
      setLoading(false);
    };
    fetchData();
  }, []);

  const t = {
    en: { name: "PHANUTH", role: "Full Stack Engineer", projects: "Projects", edu: "Education", skills: "Skills", contact: "Inquire System Access" },
    kh: { name: "ផានុត", role: "អ្នកអភិវឌ្ឍកម្មវិធី", projects: "គម្រោង", edu: "ការសិក្សា", skills: "ជំនាញ", contact: "ទំនាក់ទំនងមកកាន់ខ្ញុំ" }
  };

  const categories = useMemo(() => ["All", ...new Set(data.projects.map(p => p.category))], [data.projects]);
  const filteredProjects = filter === "All" ? data.projects : data.projects.filter(p => p.category === filter);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-blue-500 font-black tracking-widest animate-pulse">SYSTEM INITIALIZING...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500 font-sans">
      
      {/* 🧭 NAV */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl">
        <h1 className="font-black text-xl tracking-tighter text-blue-500">P.</h1>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <a href="#projects" className="hover:text-white transition-colors">Work</a>
          <a href="#skills" className="hover:text-white transition-colors">Tech</a>
        </div>
        <button onClick={() => setLang(lang === "en" ? "kh" : "en")} className="bg-blue-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-blue-500 transition-all">
          {lang === "en" ? "KH" : "EN"}
        </button>
      </nav>

      {/* ⚡ HERO */}
      <section className="pt-48 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Full Stack Developer & System Architect</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8 italic">
            {t[lang].name}<span className="text-blue-600">.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Building secure, data-driven applications with <span className="text-white">Next.js</span> and <span className="text-white">MySQL</span>.
          </p>
        </div>
      </section>

      {/* 🛠️ PROJECTS (BENTO GRID STYLE) */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-black tracking-tight">{t[lang].projects}</h2>
            <div className="flex gap-2">
                {categories.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${filter === cat ? 'bg-blue-600' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredProjects.map((p, idx) => (
            <div key={p.id} className={`group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 ${idx === 0 ? 'md:col-span-8' : 'md:col-span-4'}`}>
              <div className="aspect-video relative overflow-hidden">
                {p.imageUrl ? (
                    <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100" alt="" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-6xl text-white/5">DB</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
              </div>
              <div className="p-10 relative mt-[-60px]">
                <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest">{p.category}</span>
                <h3 className="text-2xl font-black mt-2 mb-4">{p.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.techStack.split(',').map(s => (
                    <span key={s} className="bg-white/5 text-slate-300 text-[8px] font-bold px-3 py-1 rounded-full border border-white/5">{s.trim()}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📬 CONTACT (4 PROFESSIONAL FIELDS) */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-5xl font-black tracking-tighter mb-4">{t[lang].contact}</h2>
            <p className="text-blue-100 mb-10 font-bold italic">Ready to transform your ideas into high-performance systems?</p>
            
            <form onSubmit={handleMessage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" required className="bg-white/10 border border-white/20 p-5 rounded-2xl outline-none focus:bg-white/20 transition-all placeholder:text-blue-200" />
              <input name="email" type="email" placeholder="Email Address" required className="bg-white/10 border border-white/20 p-5 rounded-2xl outline-none focus:bg-white/20 transition-all placeholder:text-blue-200" />
              <input name="subject" placeholder="Project Type / Subject" required className="md:col-span-2 bg-white/10 border border-white/20 p-5 rounded-2xl outline-none focus:bg-white/20 transition-all placeholder:text-blue-200" />
              <textarea name="content" placeholder="Detailed Message" required className="md:col-span-2 bg-white/10 border border-white/20 p-5 rounded-2xl h-40 outline-none focus:bg-white/20 transition-all placeholder:text-blue-200 resize-none" />
              <button type="submit" className="md:col-span-2 bg-white text-blue-600 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[0.98] transition-all shadow-xl">
                Transmit Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 📊 SKILLS */}
      <section id="skills" className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div>
                <h2 className="text-6xl font-black tracking-tighter mb-6 leading-none italic">Technical <br/> Stack.</h2>
                <p className="text-slate-500 text-lg">Visualizing system proficiency through real-time database metrics.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.skills.map((s) => (
                    <div key={s.id} className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <div className="flex justify-between mb-3 items-end">
                            <span className="font-black text-xs uppercase tracking-widest text-slate-400">{s.name}</span>
                            <span className="text-blue-500 font-black text-xs">{s.level}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${s.level}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 🎓 FOOTER / EDUCATION */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">{t[lang].edu}</h3>
                {data.education.map(e => (
                    <div key={e.id}>
                        <p className="text-2xl font-black tracking-tight">{e.degree}</p>
                        <p className="font-bold text-slate-500 text-sm uppercase">{e.university} • {e.startDate} - {e.endDate}</p>
                    </div>
                ))}
            </div>
            <div className="text-right">
                <h2 className="text-8xl font-black tracking-tighter opacity-10 leading-none mb-4">PHANUTH</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">© 2026 Developer System • Cambodia</p>
            </div>
        </div>
      </footer>

    </div>
  );
}