"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Github, Trophy, Mail, ArrowUpRight } from "lucide-react";

// ============================================================
// BRUTALISM — raw structure, hard edges, offset shadows.
// No radius. No blur. No gradients. The grid is the design.
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
      name: "HUN PHANUTH",
      role: "CS STUDENT / AIR TRAFFIC MANAGEMENT",
      about: "ABOUT",
      aboutDesc:
        "I'm a student with a background in Computer Science, currently pursuing studies in Air Traffic Management. I build practical software while training toward a career that bridges both disciplines.",
      logic: "ENGINEERING",
      logicDesc: "Structured, maintainable architecture.",
      scale: "OPERATIONS",
      scaleDesc: "Built to hold up under real, sustained use.",
      skills: "TECHNICAL SKILLS",
      work: "PROJECTS",
      edu: "EDUCATION",
      github: "CONTRIBUTION LOG",
      contact: "GET IN TOUCH",
      contactDesc: "OPEN TO OPPORTUNITIES AND COLLABORATIONNNNNNNNNNNNNNNNNNNNNN",
      btn: "SEND EMAIL",
      nav: { about: "ABOUT", skills: "SKILLS", work: "WORK", edu: "EDU" },
    },
    kh: {
      name: "ហ៊ុន ផានុត",
      role: "និស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រ / គ្រប់គ្រងចរាចរណ៍អាកាស",
      about: "អំពីខ្ញុំ",
      aboutDesc:
        "ខ្ញុំជានិស្សិតដែលមានភាពស៊ីជម្រៅក្នុងជំនាញវិទ្យាសាស្ត្រកុំព្យូទ័រ ហើយកំពុងសិក្សាផ្នែកគ្រប់គ្រងចរាចរណ៍អាកាសផងដែរ។",
      logic: "វិស្វកម្ម",
      logicDesc: "ស្ថាបត្យកម្មច្បាស់លាស់ និងស្ថិតស្ថេរ។",
      scale: "ប្រតិបត្តិការ",
      scaleDesc: "ត្រូវបានរចនាសម្រាប់ការប្រើប្រាស់ជាក់ស្តែង។",
      skills: "ជំនាញបច្ចេកទេស",
      work: "គម្រោង",
      edu: "ការសិក្សា",
      github: "កំណត់ត្រាការចូលរួម",
      contact: "ទាក់ទងមកខ្ញុំ",
      contactDesc: "បើកចំហសម្រាប់ឱកាស និងការសហការ",
      btn: "ផ្ញើអ៊ីមែល",
      nav: { about: "អំពីខ្ញុំ", skills: "ជំនាញ", work: "គម្រោង", edu: "ការសិក្សា" },
    },
  };

  const tr = t[lang];

  const c = isDark
    ? { bg: "#0A0A0A", panel: "#1A1A1A", ink: "#F5F5F0", sub: "#9A9A92", accent: "#FF3D00", border: "#F5F5F0" }
    : { bg: "#FFFFFF", panel: "#F5F5F0", ink: "#0A0A0A", sub: "#5A5A52", accent: "#FF3D00", border: "#0A0A0A" };

  const hardShadow = { boxShadow: `8px 8px 0 ${c.border}` };
  const hardShadowSm = { boxShadow: `5px 5px 0 ${c.border}` };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${lang === "kh" ? "font-khmer" : "font-mono"}`}
      style={{ backgroundColor: c.bg, color: c.ink }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Battambang:wght@400;700&display=swap");

        .font-mono { font-family: "IBM Plex Mono", monospace; }
        .font-khmer { font-family: "Battambang", sans-serif; }
        .font-display { font-family: "Archivo Black", "Space Grotesk", sans-serif; }

        .stamp {
          transition: box-shadow 0.1s linear, transform 0.1s linear;
        }
        .stamp:active {
          box-shadow: none !important;
          transform: translate(8px, 8px);
        }
        .stamp-sm:active {
          transform: translate(5px, 5px);
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <div
        className="border-b-2 flex items-center justify-between px-4 sm:px-6 py-2 text-[10px] tracking-[0.15em]"
        style={{ borderColor: c.border, backgroundColor: c.ink, color: c.bg }}
      >
        <span>SYSTEM: PORTFOLIO_V3</span>
        <span className="hidden sm:inline">STATUS: ONLINE</span>
      </div>

      {/* ── NAVBAR ── */}
      <header
        className="sticky top-0 z-50 border-b-2 backdrop-blur-none"
        style={{ borderColor: c.border, backgroundColor: c.bg }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="font-display text-base tracking-tight">P.</span>

          <nav className="hidden sm:flex items-center text-[11px] tracking-[0.1em] font-semibold">
            {Object.entries(tr.nav).map(([key, label], i) => (
              <a
                key={key}
                href={`#${key === "skills" ? "tech" : key}`}
                className="px-4 py-1.5 border-l-2 hover:opacity-100"
                style={{ borderColor: c.border, color: c.sub }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-0">
            <button
              onClick={() => setLang(lang === "en" ? "kh" : "en")}
              className="stamp-sm px-3 py-1.5 border-2 text-[11px] font-bold transition-transform"
              style={{ borderColor: c.border, backgroundColor: c.panel }}
            >
              {lang === "en" ? "KH" : "EN"}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              className="stamp-sm px-2.5 py-1.5 border-2 border-l-0 transition-transform"
              style={{ borderColor: c.border, backgroundColor: c.panel }}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-[1fr_220px] border-2" style={{ borderColor: c.border }}>
          <div className="p-6 sm:p-10 md:p-12 border-b-2 md:border-b-0 md:border-r-2" style={{ borderColor: c.border }}>
            <p
              className="text-[11px] font-bold tracking-[0.2em] mb-5 inline-block px-2 py-0.5"
              style={{ backgroundColor: c.accent, color: "#fff" }}
            >
              {tr.role.split(" / ")[1] || "PORTFOLIO"}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight mb-5 uppercase">
              {tr.name}
            </h1>
            <p className="text-xs sm:text-sm tracking-[0.05em]" style={{ color: c.sub }}>
              {tr.role}
            </p>
          </div>

          <div className="aspect-square overflow-hidden">
            <img
              src="images/bl-steven.png"
              className="w-full h-[300px] object-cover"
              style={{ filter: isDark ? "grayscale(1) contrast(1.1)" : "grayscale(1) contrast(1.05)" }}
              alt="Portrait of Hun Phanuth"
            />
          </div>
        </div>
      </section>

      {/* ── ABOUT ME steen!~!!!  */}
      <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <SectionHead c={c} label={tr.about} index="01" /> 

        <div className="grid md:grid-cols-2 border-2 border-t-0" style={{ borderColor: c.border }}>
          <p className="text-base sm:text-lg leading-relaxed p-6 sm:p-8 border-b-2 md:border-b-0 md:border-r-2" style={{ borderColor: c.border }}>
            {tr.aboutDesc}
          </p>

          <div className="grid grid-rows-2">
            <div className="p-6 sm:p-8 border-b-2" style={{ borderColor: c.border }}>
              <h4 className="text-[11px] font-bold tracking-[0.15em] mb-2" style={{ color: c.accent }}>
                {tr.logic}
              </h4>
              <p className="text-sm" style={{ color: c.sub }}>{tr.logicDesc}</p>
            </div>
            <div className="p-6 sm:p-8">
              <h4 className="text-[11px] font-bold tracking-[0.15em] mb-2" style={{ color: c.accent }}>
                {tr.scale}
              </h4>
              <p className="text-sm" style={{ color: c.sub }}>{tr.scaleDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="tech" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <SectionHead c={c} label={tr.skills} index="02" />

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-2 border-t-0"
          style={{ borderColor: c.border }}
        >
          {data.skills.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.02 }}
              className="p-5 border-r-2 border-b-2"
              style={{ borderColor: c.border, backgroundColor: c.panel }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold opacity-50">{String(idx + 1).padStart(2, "0")}</span>
                {s.iconUrl && <img src={s.iconUrl} alt={s.name} className="w-5 h-5 object-contain" />}
              </div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-tight">{s.name}</h3>
              <div className="h-2 w-full border" style={{ borderColor: c.border, backgroundColor: c.bg }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level || 80}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.02 }}
                  className="h-full"
                  style={{ backgroundColor: c.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      {data.projects.length > 0 && (
        <section id="work" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <SectionHead c={c} label={tr.work} index="03" />

          <div className="border-2 border-t-0 divide-y-2" style={{ borderColor: c.border }}>
            {data.projects.map((p, idx) => (
              <motion.a
                key={p.id}
                href={p.link || "#"}
                target={p.link ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="flex items-center justify-between gap-6 p-6 sm:p-7 group hover:opacity-90"
                style={{ borderColor: c.border }}
              >
                <div>
                  <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight mb-1">
                    {p.title || p.name}
                  </h3>
                  {p.description && (
                    <p className="text-sm max-w-lg" style={{ color: c.sub }}>{p.description}</p>
                  )}
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  style={{ color: c.accent }}
                />
              </motion.a>
            ))}
          </div>
        </section>
      )}

      {/* ── GITHUB ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <SectionHead c={c} label={tr.github} index="04" icon={<Github size={14} />} />

        <div className="border-2 border-t-0 p-5 sm:p-7" style={{ borderColor: c.border }}>
          <div className="border-2 p-3 sm:p-4 overflow-hidden" style={{ borderColor: c.border, backgroundColor: c.panel }}>
            <img
              src="https://ghchart.rshah.org/ff3d00/steven-hazad"
              alt="Github Contributions"
              className="w-full h-auto"
              style={{ filter: isDark ? "invert(0.9)" : "none" }}
            />
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-bold tracking-[0.15em]" style={{ color: c.sub }}>
            <span>LESS</span>
            <span>MORE</span>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="edu" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <SectionHead c={c} label={tr.edu} index="05" />

        <div className="border-2 border-t-0 divide-y-2" style={{ borderColor: c.border }}>
          {data.education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex flex-col sm:flex-row gap-5 p-6 sm:p-7"
              style={{ borderColor: c.border }}
            >
              <div className="w-14 h-14 border-2 p-1.5 shrink-0" style={{ borderColor: c.border, backgroundColor: c.panel }}>
                <img
                  src={edu.logoUrl || "/default-uni-icon.png"}
                  alt={edu.university}
                  className="w-full h-full object-contain"
                  style={{ filter: "grayscale(1)" }}
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h4 className="font-display text-lg uppercase tracking-tight">{edu.degree}</h4>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 border-2"
                    style={{ borderColor: c.border, backgroundColor: c.panel }}
                  >
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold mb-2" style={{ color: c.accent }}>
                  {edu.university}
                </p>
                {edu.achievement && (
                  <p className="flex items-start gap-2 text-sm" style={{ color: c.sub }}>
                    <Trophy size={13} className="shrink-0 mt-0.5" />
                    {edu.achievement}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <footer className="border-t-2" style={{ borderColor: c.border }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-6">
            <Mail size={16} style={{ color: c.accent }} />
            <p className="text-[11px] font-bold tracking-[0.2em]" style={{ color: c.sub }}>
              {tr.contactDesc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[0.95] max-w-lg">
              {tr.contact}
            </h2>
            <a
              href="mailto:phanuth.hun@gmail.com"
              className="stamp inline-flex items-center gap-2 px-7 py-4 border-2 font-bold text-sm tracking-[0.1em] shrink-0"
              style={{ borderColor: c.border, backgroundColor: c.accent, color: "#fff", ...hardShadow }}
            >
              {tr.btn}
            </a>
          </div>
          <p className="text-[10px] mt-14 tracking-[0.1em]" style={{ color: c.sub }}>
            PHANUTH.HUN@GMAIL.COM
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ c, label, index, icon }) {
  return (
    <div className="flex items-center gap-2 border-2 border-b-0 px-4 sm:px-6 py-3" style={{ borderColor: c.border, backgroundColor: c.ink, color: c.bg }}>
      {icon}
      <span className="text-[11px] font-bold tracking-[0.2em]">{label}</span>
      <span className="ml-auto text-[11px] font-bold opacity-60">{index}</span>
    </div>
  );
}