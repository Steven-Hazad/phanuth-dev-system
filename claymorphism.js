"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Github, Trophy, Mail } from "lucide-react";

// ============================================================
// CLAYMORPHISM — PROFESSIONAL VARIANT
// Soft shadows kept, but tighter radii, muted slate palette,
// sharp grotesk type, no bounce. Reads as enterprise, not toy.
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
      about: "About",
      aboutDesc:
        "I'm a student with a background in Computer Science, currently pursuing studies in Air Traffic Management. I build practical software while training toward a career that bridges both disciplines.",
      logic: "Engineering",
      logicDesc: "Structured, maintainable architecture.",
      scale: "Operations",
      scaleDesc: "Built to hold up under real, sustained use.",
      skills: "Technical skills",
      work: "Projects",
      edu: "Education",
      github: "Contribution activity",
      contact: "Get in touch",
      contactDesc: "Open to opportunities and collaboration.",
      btn: "Send an email",
      nav: { about: "About", skills: "Skills", work: "Work", edu: "Education" },
    },
    kh: {
      name: "ហ៊ុន ផានុត",
      role: "និស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រ — គ្រប់គ្រងចរាចរណ៍អាកាស",
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
      contactDesc: "បើកចំហសម្រាប់ឱកាស និងការសហការ។",
      btn: "ផ្ញើអ៊ីមែល",
      nav: { about: "អំពីខ្ញុំ", skills: "ជំនាញ", work: "គម្រោង", edu: "ការសិក្សា" },
    },
  };

  const tr = t[lang];

  // muted slate clay tokens — desaturated, low-contrast shadows
  const clay = isDark
    ? {
        bg: "#1C1E24",
        surface: "#23262E",
        text: "#E4E6EB",
        sub: "#9298A6",
        accent: "#5B7DB1",
        accentSoft: "#3D4654",
        shadowLight: "rgba(255,255,255,0.035)",
        shadowDark: "rgba(0,0,0,0.45)",
      }
    : {
        bg: "#E9EBEF",
        surface: "#F3F4F7",
        text: "#262A33",
        sub: "#6B7280",
        accent: "#3E5C82",
        accentSoft: "#DCE2EA",
        shadowLight: "rgba(255,255,255,0.85)",
        shadowDark: "rgba(163,170,184,0.45)",
      };

  // tighter, quieter shadow scale
  const raised = {
    boxShadow: `5px 5px 10px ${clay.shadowDark}, -5px -5px 10px ${clay.shadowLight}`,
  };
  const raisedSm = {
    boxShadow: `3px 3px 6px ${clay.shadowDark}, -3px -3px 6px ${clay.shadowLight}`,
  };
  const pressed = {
    boxShadow: `inset 2px 2px 5px ${clay.shadowDark}, inset -2px -2px 5px ${clay.shadowLight}`,
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        lang === "kh" ? "font-khmer" : "font-sans"
      }`}
      style={{ backgroundColor: clay.bg, color: clay.text }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Battambang:wght@400;700&display=swap");

        .font-sans { font-family: "Inter", sans-serif; }
        .font-khmer { font-family: "Battambang", sans-serif; }

        .clay-press {
          transition: box-shadow 0.15s ease;
        }
        .clay-press:active {
          transform: scale(0.99);
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <header className="sticky top-3 z-50 max-w-3xl mx-auto px-4">
        <div
          className="flex items-center justify-between gap-4 rounded-2xl px-5 sm:px-6 py-2.5"
          style={{ backgroundColor: clay.surface, ...raisedSm }}
        >
          <span className="font-semibold text-sm tracking-tight" style={{ color: clay.accent }}>
            Phanuth
          </span>

          <nav className="hidden sm:flex items-center gap-1 text-sm">
            {Object.entries(tr.nav).map(([key, label]) => (
              <a
                key={key}
                href={`#${key === "work" ? "work" : key === "skills" ? "tech" : key}`}
                className="px-3 py-1.5 rounded-xl font-medium transition-colors hover:opacity-100"
                style={{ color: clay.sub }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "kh" : "en")}
              className="clay-press w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-semibold"
              style={{ backgroundColor: clay.bg, color: clay.accent, ...pressed }}
            >
              {lang === "en" ? "KH" : "EN"}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              className="clay-press w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: clay.bg, color: clay.accent, ...pressed }}
            >
              {isDark ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div
          className="rounded-3xl p-6 sm:p-10 md:p-12 grid md:grid-cols-[1fr_auto] gap-10 items-center"
          style={{ backgroundColor: clay.surface, ...raised }}
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: clay.accent }}
            >
              Portfolio
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              {tr.name}
            </h1>
            <p className="text-sm sm:text-base max-w-md leading-relaxed" style={{ color: clay.sub }}>
              {tr.role}
            </p>
          </div>

          <div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden mx-auto shrink-0"
            style={{ ...raisedSm }}
          >
            <img
              src="images/bl-steven.png"
              className="w-full h-full object-cover"
              alt="Portrait of Hun Phanuth"
            />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-5">
          <div
            className="rounded-2xl p-7 sm:p-9"
            style={{ backgroundColor: clay.surface, ...raised }}
          >
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
              style={{ color: clay.accent }}
            >
              {tr.about}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: clay.sub }}>
              {tr.aboutDesc}
            </p>
          </div>

          <div className="grid grid-rows-2 gap-5">
            <div
              className="rounded-2xl p-5 sm:p-6 flex flex-col justify-center"
              style={{ backgroundColor: clay.surface, ...raisedSm }}
            >
              <h4 className="text-sm font-semibold mb-1" style={{ color: clay.accent }}>
                {tr.logic}
              </h4>
              <p className="text-xs sm:text-sm" style={{ color: clay.sub }}>
                {tr.logicDesc}
              </p>
            </div>
            <div
              className="rounded-2xl p-5 sm:p-6 flex flex-col justify-center"
              style={{ backgroundColor: clay.surface, ...raisedSm }}
            >
              <h4 className="text-sm font-semibold mb-1" style={{ color: clay.accent }}>
                {tr.scale}
              </h4>
              <p className="text-xs sm:text-sm" style={{ color: clay.sub }}>
                {tr.scaleDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="tech" className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 px-1"
          style={{ color: clay.accent }}
        >
          {tr.skills}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.skills.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              className="rounded-2xl p-5"
              style={{ backgroundColor: clay.surface, ...raisedSm }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: clay.bg, ...pressed }}
              >
                {s.iconUrl ? (
                  <img src={s.iconUrl} alt={s.name} className="w-5 h-5 object-contain" />
                ) : (
                  <span className="text-[11px] font-semibold" style={{ color: clay.accent }}>
                    {s.name?.[0]}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium mb-2.5">{s.name}</h3>
              <div
                className="h-1.5 w-full rounded-full overflow-hidden"
                style={{ backgroundColor: clay.bg, ...pressed }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level || 80}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.03 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: clay.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      {data.projects.length > 0 && (
        <section id="work" className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 px-1"
            style={{ color: clay.accent }}
          >
            {tr.work}
          </h2>

          <div className="space-y-4">
            {data.projects.map((p, idx) => (
              <motion.a
                key={p.id}
                href={p.link || "#"}
                target={p.link ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="clay-press flex items-center justify-between gap-6 rounded-2xl p-6"
                style={{ backgroundColor: clay.surface, ...raisedSm }}
              >
                <div>
                  <h3 className="text-base font-semibold mb-1">{p.title || p.name}</h3>
                  {p.description && (
                    <p className="text-sm max-w-lg" style={{ color: clay.sub }}>
                      {p.description}
                    </p>
                  )}
                </div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-semibold text-[11px]"
                  style={{ backgroundColor: clay.bg, color: clay.accent, ...pressed }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      )}

      {/* ── GITHUB ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2.5 mb-5 px-1">
          <Github size={15} style={{ color: clay.accent }} />
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: clay.accent }}
          >
            {tr.github}
          </h2>
        </div>

        <div className="rounded-2xl p-6 sm:p-7" style={{ backgroundColor: clay.surface, ...raised }}>
          <div
            className="rounded-xl p-4 sm:p-5 overflow-hidden"
            style={{ backgroundColor: clay.bg, ...pressed }}
          >
            <img
              src="https://ghchart.rshah.org/3E5C82/steven-hazad"
              alt="Github Contributions"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="edu" className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5 px-1"
          style={{ color: clay.accent }}
        >
          {tr.edu}
        </h2>

        <div className="space-y-4">
          {data.education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="flex flex-col sm:flex-row gap-4 rounded-2xl p-6"
              style={{ backgroundColor: clay.surface, ...raisedSm }}
            >
              <div
                className="w-12 h-12 rounded-xl p-2 shrink-0"
                style={{ backgroundColor: clay.bg, ...pressed }}
              >
                <img
                  src={edu.logoUrl || "/default-uni-icon.png"}
                  alt={edu.university}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h4 className="text-base font-semibold">{edu.degree}</h4>
                  <span
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: clay.bg, color: clay.sub, ...pressed }}
                  >
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: clay.accent }}>
                  {edu.university}
                </p>
                {edu.achievement && (
                  <p className="flex items-start gap-2 text-sm" style={{ color: clay.sub }}>
                    <Trophy size={12} className="shrink-0 mt-0.5" />
                    {edu.achievement}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div
          className="rounded-3xl p-10 sm:p-14 text-center"
          style={{ backgroundColor: clay.surface, ...raised }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: clay.bg, ...pressed }}
          >
            <Mail size={17} style={{ color: clay.accent }} />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2.5">
            {tr.contact}
          </h2>
          <p className="mb-7 max-w-sm mx-auto text-sm" style={{ color: clay.sub }}>
            {tr.contactDesc}
          </p>
          <a
            href="mailto:phanuth.hun@gmail.com"
            className="clay-press inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: clay.accent, color: "#fff", ...raisedSm }}
          >
            {tr.btn}
          </a>
        </div>
      </section>

      <footer className="text-center pb-10 text-xs" style={{ color: clay.sub }}>
        phanuth.hun@gmail.com
      </footer>
    </div>
  );
}