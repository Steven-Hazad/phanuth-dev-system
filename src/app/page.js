"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Github, Trophy } from "lucide-react";

// ============================================================
// EDITORIAL PORTFOLIO — clean, formal, static
// ============================================================
export default function Home() {
  const [data, setData] = useState({ projects: [], education: [], skills: [] });
  const [lang, setLang] = useState("en");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, e, s] = await Promise.all([
          fetch("/api/admin?type=project").then((res) => res.json()),
          fetch("/api/admin?type=education").then((res) => res.json()),
          fetch("/api/admin?type=skill").then((res) => res.json()),
        ]);

        setData({
          projects: Array.isArray(p) ? p : [],
          education: Array.isArray(e) ? e : [],
          skills: Array.isArray(s) ? s : [],
        });
      } catch (err) {
        console.error("Database fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const t = {
    en: {
      name: "Hun Phanuth",
      role: "Computer Science Student — Air Traffic Management",
      eyebrow: "Portfolio / 2026",
      about: "About",
      aboutDesc:
        "I'm a student with a background in Computer Science, currently pursuing studies in Air Traffic Management. I build practical software while training toward a career that bridges both disciplines.",
      logic: "Engineering",
      logicDesc: "Structured, maintainable code written with attention to long-term clarity.",
      scale: "Operations",
      scaleDesc: "Systems designed to hold up under real, sustained use.",
      skills: "Technical Skills",
      skillsSub: "Tools and technologies",
      work: "Projects",
      edu: "Education",
      eduSub: "Academic background",
      github: "Activity",
      githubSub: "Contribution record",
      contact: "Get in touch",
      contactSub: "Open to opportunities and collaboration",
      btn: "Send an email",
      nav: { about: "About", skills: "Skills", work: "Work", edu: "Education" },
    },
    kh: {
      name: "ហ៊ុន ផានុត",
      role: "និស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រ — គ្រប់គ្រងចរាចរណ៍អាកាស",
      eyebrow: "ប្រវត្តិរូប / ២០២៦",
      about: "អំពីខ្ញុំ",
      aboutDesc:
        "ខ្ញុំជានិស្សិតដែលមានភាពស៊ីជម្រៅក្នុងជំនាញវិទ្យាសាស្ត្រកុំព្យូទ័រ ហើយកំពុងសិក្សាផ្នែកគ្រប់គ្រងចរាចរណ៍អាកាសផងដែរ។",
      logic: "វិស្វកម្ម",
      logicDesc: "កូដដែលមានរចនាសម្ព័ន្ធច្បាស់លាស់ និងងាយស្រួលថែទាំ។",
      scale: "ប្រតិបត្តិការ",
      scaleDesc: "ប្រព័ន្ធដែលត្រូវបានរចនាឡើងសម្រាប់ការប្រើប្រាស់ជាក់ស្តែង។",
      skills: "ជំនាញបច្ចេកទេស",
      skillsSub: "ឧបករណ៍ និងបច្ចេកវិទ្យា",
      work: "គម្រោង",
      edu: "ការសិក្សា",
      eduSub: "ប្រវត្តិការសិក្សា",
      github: "សកម្មភាព",
      githubSub: "កំណត់ត្រាការចូលរួម",
      contact: "ទាក់ទងមកខ្ញុំ",
      contactSub: "បើកចំហសម្រាប់ឱកាស និងការសហការ",
      btn: "ផ្ញើអ៊ីមែល",
      nav: { about: "អំពីខ្ញុំ", skills: "ជំនាញ", work: "គម្រោង", edu: "ការសិក្សា" },
    },
  };

  const tr = t[lang];

  return (
    <div
      className={`min-h-screen transition-colors duration-300
        ${lang === "kh" ? "font-khmer" : "font-sans"}
        ${isDark ? "bg-[#121210] text-[#EDEAE3]" : "bg-[#FAFAF8] text-[#1A1A1A]"}`}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Battambang:wght@400;700&display=swap");

        .font-sans { font-family: "Inter", sans-serif; }
        .font-khmer { font-family: "Battambang", sans-serif; }
        .font-display { font-family: "Source Serif 4", serif; }
        .font-mono { font-family: "IBM Plex Mono", monospace; }
      `}</style>

      {/* ── NAVBAR ── */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-md
          ${isDark ? "bg-[#121210]/90 border-white/10" : "bg-[#FAFAF8]/90 border-black/10"}`}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <span className="font-display text-lg tracking-tight">Phanuth</span>

          <nav className="hidden sm:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] opacity-70">
            <a href="#about" className="hover:opacity-100 hover:underline underline-offset-4 transition">
              {tr.nav.about}
            </a>
            <a href="#tech" className="hover:opacity-100 hover:underline underline-offset-4 transition">
              {tr.nav.skills}
            </a>
            <a href="#work" className="hover:opacity-100 hover:underline underline-offset-4 transition">
              {tr.nav.work}
            </a>
            <a href="#edu" className="hover:opacity-100 hover:underline underline-offset-4 transition">
              {tr.nav.edu}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "kh" : "en")}
              className={`font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 border transition
                ${isDark ? "border-white/20 hover:bg-white/10" : "border-black/20 hover:bg-black/5"}`}
            >
              {lang === "en" ? "KH" : "EN"}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              className={`p-2 border transition
                ${isDark ? "border-white/20 hover:bg-white/10" : "border-black/20 hover:bg-black/5"}`}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50 mb-6">
          {tr.eyebrow}
        </p>
        <div className="grid md:grid-cols-[1fr_280px] gap-12 items-start">
          <div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6">
              {tr.name}
            </h1>
            <p
              className={`text-lg sm:text-xl leading-relaxed max-w-md ${
                isDark ? "text-[#B5B0A6]" : "text-[#5C5648]"
              }`}
            >
              {tr.role}
            </p>
          </div>

          <div
            className={`aspect-[3/4] border overflow-hidden ${
              isDark ? "border-white/10" : "border-black/10"
            }`}
          >
            <img
              src="images/bl-steven.png"
              className="w-full h-full object-cover"
              alt="Portrait of Hun Phanuth"
            />
          </div>
        </div>
      </section>

      <Divider isDark={isDark} index="01" />

      {/* ── ABOUT ── */}
      <section id="about" className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <SectionLabel isDark={isDark}>{tr.about}</SectionLabel>

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <p
            className={`font-display text-2xl sm:text-3xl leading-snug ${
              isDark ? "text-[#EDEAE3]" : "text-[#1A1A1A]"
            }`}
          >
            {tr.aboutDesc}
          </p>

          <div className="space-y-8">
            <div className={`border-l-2 pl-6 ${isDark ? "border-[#4A7A65]" : "border-[#2C4A3E]"}`}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2 opacity-60">
                {tr.logic}
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? "text-[#B5B0A6]" : "text-[#5C5648]"}`}>
                {tr.logicDesc}
              </p>
            </div>
            <div className={`border-l-2 pl-6 ${isDark ? "border-[#4A7A65]" : "border-[#2C4A3E]"}`}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] mb-2 opacity-60">
                {tr.scale}
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? "text-[#B5B0A6]" : "text-[#5C5648]"}`}>
                {tr.scaleDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider isDark={isDark} index="02" />

      {/* ── TECH STACK ── */}
      <section id="tech" className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <SectionLabel isDark={isDark}>{tr.skills}</SectionLabel>
        <p className={`mt-3 mb-10 text-sm ${isDark ? "text-[#B5B0A6]" : "text-[#5C5648]"}`}>
          {tr.skillsSub}
        </p>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t border-l ${
            isDark ? "border-white/10" : "border-black/10"
          }`}
        >
          {data.skills.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className={`p-6 border-r border-b group ${
                isDark ? "border-white/10" : "border-black/10"
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] opacity-40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {s.iconUrl && (
                  <img src={s.iconUrl} alt={s.name} className="w-5 h-5 object-contain" />
                )}
              </div>
              <h3 className="text-sm font-medium mb-3">{s.name}</h3>
              <div className={`h-px w-full ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level || 80}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.03 }}
                  className={`h-px ${isDark ? "bg-[#4A7A65]" : "bg-[#2C4A3E]"}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider isDark={isDark} index="03" />

      {/* ── PROJECTS ── */}
      {data.projects.length > 0 && (
        <>
          <section id="work" className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
            <SectionLabel isDark={isDark}>{tr.work}</SectionLabel>

            <div className="mt-8 divide-y divide-black/10 dark:divide-white/10">
              {data.projects.map((p, idx) => (
                <motion.a
                  key={p.id}
                  href={p.link || "#"}
                  target={p.link ? "_blank" : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`flex items-center justify-between gap-6 py-6 border-black/10 group ${
                    isDark ? "border-white/10" : ""
                  } ${idx === 0 ? "" : "border-t"}`}
                >
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl mb-1 group-hover:underline underline-offset-4">
                      {p.title || p.name}
                    </h3>
                    {p.description && (
                      <p className={`text-sm max-w-lg ${isDark ? "text-[#B5B0A6]" : "text-[#5C5648]"}`}>
                        {p.description}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-[11px] opacity-40 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
            </div>
          </section>

          <Divider isDark={isDark} index="04" />
        </>
      )}

      {/* ── GITHUB ── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="flex items-baseline gap-3 mb-8">
          <Github size={18} className={isDark ? "text-[#4A7A65]" : "text-[#2C4A3E]"} />
          <SectionLabel isDark={isDark} noMargin>
            {tr.github}
          </SectionLabel>
        </div>
        <p className={`mb-8 text-sm ${isDark ? "text-[#B5B0A6]" : "text-[#5C5648]"}`}>{tr.githubSub}</p>

        <div className={`border p-6 sm:p-8 ${isDark ? "border-white/10" : "border-black/10"}`}>
          <img
            src="https://ghchart.rshah.org/2C4A3E/steven-hazad"
            alt="Github Contributions"
            className="w-full h-auto"
          />
          <div className="mt-6 flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.15em] opacity-40">
            <span>Less</span>
            <span>More</span>
          </div>
        </div>
      </section>

      <Divider isDark={isDark} index="05" />

      {/* ── EDUCATION ── */}
      <section id="edu" className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <SectionLabel isDark={isDark}>{tr.edu}</SectionLabel>
        <p className={`mt-3 mb-10 text-sm ${isDark ? "text-[#B5B0A6]" : "text-[#5C5648]"}`}>{tr.eduSub}</p>

        <div className="space-y-0">
          {data.education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`flex flex-col sm:flex-row gap-6 py-8 border-black/10 ${
                isDark ? "border-white/10" : ""
              } ${idx === 0 ? "" : "border-t"}`}
            >
              <div
                className={`w-12 h-12 shrink-0 border p-1.5 ${
                  isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"
                }`}
              >
                <img
                  src={edu.logoUrl || "/default-uni-icon.png"}
                  alt={edu.university}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h4 className="font-display text-xl">{edu.degree}</h4>
                  <span className="font-mono text-[11px] opacity-50">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p
                  className={`text-sm font-medium mb-2 ${
                    isDark ? "text-[#4A7A65]" : "text-[#2C4A3E]"
                  }`}
                >
                  {edu.university}
                </p>
                {edu.achievement && (
                  <p
                    className={`flex items-start gap-2 text-sm ${
                      isDark ? "text-[#B5B0A6]" : "text-[#5C5648]"
                    }`}
                  >
                    <Trophy size={13} className="shrink-0 mt-0.5 opacity-60" />
                    {edu.achievement}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <footer
        className={`border-t mt-8 ${isDark ? "border-white/10" : "border-black/10"}`}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50 mb-4">
            {tr.contactSub}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight max-w-lg">
              {tr.contact}
            </h2>
            <a
              href="mailto:phanuth.hun@gmail.com"
              className={`inline-flex items-center gap-2 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.1em] transition shrink-0
                ${isDark ? "bg-[#EDEAE3] text-[#121210] hover:bg-white" : "bg-[#1A1A1A] text-white hover:bg-[#2C4A3E]"}`}
            >
              {tr.btn} →
            </a>
          </div>
          <p className="font-mono text-[10px] opacity-30 mt-16">
            phanuth.hun@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// Shared bits
// ============================================================
function SectionLabel({ children, isDark, noMargin }) {
  return (
    <h2
      className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
        noMargin ? "" : "mb-1"
      } ${isDark ? "text-[#4A7A65]" : "text-[#2C4A3E]"}`}
    >
      {children}
    </h2>
  );
}

function Divider({ isDark, index }) {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8">
      <div
        className={`flex items-center gap-4 ${isDark ? "text-white/20" : "text-black/20"}`}
      >
        <span className="font-mono text-[10px]">{index}</span>
        <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
      </div>
    </div>
  );
}