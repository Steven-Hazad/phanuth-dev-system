"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Cpu, Code2, Terminal, User, Briefcase, GraduationCap, Mail, Trophy } from "lucide-react";

export default function Home() {
  const [data, setData] = useState({ projects: [], education: [], skills: [] });
  const [lang, setLang] = useState("en");
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, e, s] = await Promise.all([
          fetch("/api/admin?type=project").then(res => res.json()),
          fetch("/api/admin?type=education").then(res => res.json()),
          fetch("/api/admin?type=skill").then(res => res.json()),
        ]);
        setData({ 
          projects: Array.isArray(p) ? p : [], 
          education: Array.isArray(e) ? e : [], 
          skills: Array.isArray(s) ? s : [] 
        });
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const t = {
    en: { 
      name: "HUN PHANUTH", 
      role: "System Architect", 
      about: "About Me",
      aboutDesc: "I'm a student with a strong background in Computer Science and currently pursuing Air Traffic Management . While I don’t have formal work experience yet, I work.",
      skills: "Tech Stack", 
      work: "Project Archive", 
      edu: "Academic",
      contact: "Let's Connect",
      btn: "Launch Mail Protocol"
    },
    kh: { 
      name: "ហ៊ុន ផានុត", 
      role: "System Architect", 
      about: "អំពីខ្ញុំ",
      aboutDesc: "ខ្ញុំជានិស្សិតដែលមានភាពរឹងមាំក្នុងវិទ្យាសាស្ត្រកុំព្យូទ័រ ហើយកំពុងសិក្សាផ្នែកគ្រប់គ្រងចរាចរណ៍អាកាស។ ខណៈពេលដែលខ្ញុំមិនទាន់មានបទពិសោធន៍ការងារផ្លូវការទេ ខ្ញុំក៏បានបង្កើតគម្រោងផ្ទាល់ខ្លួន និងចូលរួមក្នុងការប្រកួតប្រជែងដើម្បីបង្ហាញជំនាញ និងការប្តេជ្ញារបស់ខ្ញុំ។",
      skills: "ជំនាញ", 
      work: "គម្រោង", 
      edu: "ការសិក្សា",
      contact: "ទំនាក់ទំនង",
      btn: "ផ្ញើសារមកកាន់ខ្ញុំ"
    }
  };

  if (loading) return (
    <div className={`h-screen flex items-center justify-center font-black ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      SYNCING_SYSTEM...
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${lang === 'kh' ? 'font-khmer' : 'font-sans'} ${isDark ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-slate-900'}`}>
      
      {/* 📥 KHMER FONT IMPORT */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Khmer+OS+Siemreap&family=Inter:wght@400;700;900&display=swap');
        .font-khmer { font-family: 'Khmer OS Siemreap', cursive !important; }
      `}</style>

      {/* 🧭 HYPER-NAVBAR */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-3 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
        <div className="flex items-center gap-6 px-4 border-r border-white/10 mr-2 font-black text-sm tracking-tighter">P.</div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-50">
          <a href="#about" className="hover:opacity-100 transition-opacity whitespace-nowrap">{t[lang].about}</a>
          <a href="#tech" className="hover:opacity-100 transition-opacity whitespace-nowrap">{t[lang].skills}</a>
          <a href="#work" className="hover:opacity-100 transition-opacity whitespace-nowrap">{t[lang].work}</a>
          <a href="#edu" className="hover:opacity-100 transition-opacity whitespace-nowrap">{t[lang].edu}</a>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-xl transition-all ${isDark ? 'bg-white/10 text-yellow-400' : 'bg-black/10 text-blue-600'}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setLang(lang === "en" ? "kh" : "en")} className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all ${isDark ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
            {lang === "en" ? "KH" : "EN"}
          </button>
        </div>
      </nav>

      {/* 👤 HERO SECTION */}
      <section className="pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-8xl md:text-[140px] font-black tracking-tighter leading-none mb-6 italic uppercase">
              {t[lang].name}<span className="text-blue-600">.</span>
            </h1>
            <p className={`text-xl md:text-2xl font-medium max-w-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t[lang].role}
            </p>
          </motion.div>
        </div>
        
        <div className="relative group">
          <div className={`absolute -inset-4 rounded-[4rem] blur-3xl transition-opacity ${isDark ? 'bg-blue-600/20 opacity-40' : 'bg-blue-400/10 opacity-100'}`}></div>
          <div className={`w-80 h-[450px] rounded-[3.5rem] overflow-hidden border transition-colors ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-2xl'}`}>
            <img src="images/bl-steven.png" className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000" alt="Profile" />
          </div>
        </div>
      </section>

      {/* 📖 ABOUT ME SECTION */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className={`p-12 rounded-[3rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
                <div className="flex gap-4 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <h2 className="text-4xl font-black mb-6 italic">{t[lang].about}</h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {t[lang].aboutDesc}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className={`p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'}`}>
                    <Terminal className="text-blue-500 mb-4" />
                    <h4 className="font-black text-xl italic uppercase">Logic</h4>
                    <p className="text-xs text-slate-500 mt-2">Clean architecture design.</p>
                </div>
                <div className={`p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'}`}>
                    <Code2 className="text-blue-500 mb-4" />
                    <h4 className="font-black text-xl italic uppercase">Scale</h4>
                    <p className="text-xs text-slate-500 mt-2">Built for high traffic.</p>
                </div>
            </div>
        </div>
      </section>

      {/* 📊 TECH STACK MATRIX */}
      <section id="tech" className={`py-32 px-6 ${isDark ? 'bg-white/[0.02]' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.8em] text-blue-600 mb-4">{t[lang].skills} Matrix</h2>
            <p className="text-4xl font-black tracking-tight italic">{lang === 'en' ? 'Technical Capabilities.' : 'សមត្ថភាពបច្ចេកទេស'}</p>
          </div>
          
         {/* 📊 TECH STACK MATRIX */}
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {data.skills.map((s, idx) => (
    <motion.div 
      key={s.id}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-6 rounded-3xl border transition-all ${isDark ? 'bg-slate-900/50 border-white/5 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:shadow-xl'}`}
    >
      <div className="flex justify-between items-start mb-8">
        <span className={`text-[10px] font-black uppercase opacity-30`}>0{idx + 1}</span>
        
        {/* UPDATED LOGO LOGIC */}
        <div className="w-8 h-8 flex items-center justify-center">
          {s.iconUrl ? (
            <img src={s.iconUrl} alt={s.name} className="w-full h-full object-contain" />
          ) : (
            <div className="text-blue-500"><Cpu size={20} /></div>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">{s.name}</h3>
      <div className="h-1 w-full bg-blue-600/10 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} className="h-full bg-blue-600" />
      </div>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* 🖼️ PROJECT ALBUM */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          {data.projects.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="group">
              <div className={`aspect-[16/10] rounded-[3rem] overflow-hidden border mb-10 transition-all ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
                <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" alt="" />
              </div>
              <div className="px-6 flex justify-between items-start gap-10">
                <div className="flex-1">
                    <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">{p.category}</span>
                    <h3 className="text-5xl font-black tracking-tighter mt-4 italic leading-tight">{p.title}</h3>
                </div>
                <div className="flex gap-2 flex-wrap justify-end">
                    {p.techStack && p.techStack.split(',').map(tag => (
                        <span key={tag} className={`text-[9px] font-black px-4 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-900 text-white'}`}>{tag.trim()}</span>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎓 EDUCATION */}
      <section id="edu" className={`py-32 px-6 border-t border-white/5 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.8em] text-blue-600 mb-12">{t[lang].edu}</h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-8 before:h-full before:w-0.5 before:bg-slate-200">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative flex items-center gap-8 pl-4 group">
                {/* UNIVERSITY LOGO */}
                <div className="relative z-10 w-16 h-16 bg-white rounded-2xl border-2 border-slate-100 p-2 shadow-sm group-hover:border-blue-500 transition-colors shrink-0">
                  <img 
                    src={edu.logoUrl || "/default-uni-icon.png"} 
                    alt={edu.university}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className={`flex-1 p-6 rounded-[2rem] border transition-all ${isDark ? 'bg-white/5 border-white/10 hover:border-blue-500' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-2">
                    <div>
                      <h4 className={`text-xl font-black italic ${isDark ? 'text-white' : 'text-slate-800'}`}>{edu.degree}</h4>
                      <p className="font-bold text-blue-600">{edu.university}</p>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full shadow-sm italic shrink-0 ${isDark ? 'bg-white/10 text-slate-400' : 'bg-white text-slate-500'}`}>
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  
                  {edu.achievement && (
                    <div className={`mt-3 flex items-start gap-2 text-sm italic ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <Trophy size={14} className="text-orange-500 shrink-0 mt-1" />
                      <p>{edu.achievement}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📬 CONTACT CARD */}
      <section className="py-40 px-6">
        <div className={`max-w-5xl mx-auto rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden transition-all ${isDark ? 'bg-blue-600 text-white shadow-[0_0_100px_-20px_rgba(37,99,235,0.4)]' : 'bg-slate-900 text-white'}`}>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic leading-none">{t[lang].contact}.</h2>
          <a href="mailto:phanuth.hun@gmail.com" className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest inline-block transition-all hover:scale-105 ${isDark ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
            {t[lang].btn}
          </a>
        </div>
      </section>

    </div>
  );
}