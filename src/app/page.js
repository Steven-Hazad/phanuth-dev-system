"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight } from "lucide-react";

// ============================================================
// CR7 STYLE — Black · White · Gold. Cinematic. Luxury brand.
// Horizontal scroll hero tiles · ghosted "HP" watermark
// Career chapters · full-bleed dramatic sections
// Font: Bebas Neue (display) + Barlow Condensed (labels) + Inter (body)
// Palette: #000 · #FFF · #C9A84C gold
// Signature: horizontal scroll hero with 3 tall portrait tiles
// ============================================================

const GOLD  = "#C9A84C";
const DGOLD = "#8B6F2E";
const BLACK = "#000000";
const WHITE = "#FFFFFF";
const DIM   = "#111111";
const GREY  = "#888888";

const DEFAULT_PROJECTS = [
  { id:1, name:"SROVCHLART", tag:"AGRITECH · MOBILE", year:"2024", description:"Rice marketplace for Cambodian farmers — React Native + TypeScript.", link:"#" },
  { id:2, name:"SAFEHIRE", tag:"TRUST & SAFETY", year:"2024", description:"Anti-scam job verification platform — React Native Expo.", link:"#" },
  { id:3, name:"KOURSROV", tag:"AGRITECH · PLATFORM", year:"2023", description:"AgriTech platform for Cambodia's rice industry.", link:"#" },
];
const DEFAULT_SKILLS = [
  "REACT","NEXT.JS","NODE.JS","POSTGRESQL","PYTHON","REACT NATIVE",
  "TYPESCRIPT","SUPABASE","REST APIs","TAILWIND","HADOOP","PYSPARK",
];
const DEFAULT_EDU = [
  { id:1, degree:"BACHELOR OF AIR TRAFFIC MANAGEMENT", university:"National Institute of Civil Aviation (NICA)", period:"2022 – PRESENT" },
  { id:2, degree:"BACHELOR OF COMPUTER SCIENCE", university:"Cambodian University for Specialties (CUS)", period:"2022 – PRESENT" },
];

const CHAPTERS = [
  { id:"01", era:"2025 – NOW", club:"FREELANCE", title:"FULL-STACK FREELANCER", sub:"Independent · Phnom Penh", desc:"End-to-end POS systems and e-commerce platforms. Architecture to deployment." },
  { id:"02", era:"2022 – NOW", club:"NICA", title:"ATM STUDENT", sub:"National Institute of Civil Aviation", desc:"Cross-training in Air Traffic Management alongside software engineering." },
  { id:"03", era:"2013 – 2019", club:"HHH PRINTER", title:"OPERATIONS ASSISTANT", sub:"Takeo, Cambodia", desc:"First exposure to business operations, design, and client service." },
];

const T = {
  en: {
    tiles: ["DEVELOPER", "STUDENT", "BUILDER"],
    heroSub: "FULL-STACK · AIR TRAFFIC MANAGEMENT · PHNOM PENH",
    chaptersTitle: "CAREER",
    chaptersLabel: "CHAPTERS",
    projectsTitle: "PROJECTS",
    skillsTitle: "TECHNICAL PROFILE",
    statsTitle: "BY THE NUMBERS",
    stats: [
      { val:"10+", label:"PROJECTS SHIPPED" },
      { val:"3+", label:"YEARS BUILDING" },
      { val:"1.04M+", label:"DATA ROWS PROCESSED" },
      { val:"3", label:"CERTS EARNED" },
    ],
    awardsTitle: "RECOGNITION",
    awards: [
      { year:"2026", title:"3RD PLACE", event:"UNIPRENEURCAMP CLUSTER 1", org:"Khmer Enterprise" },
      { year:"2025", title:"CERTIFIED", event:"BIG DATA PROGRAMME", org:"Hadoop · PySpark · Spark SQL" },
      { year:"2024", title:"CERTIFIED", event:"PYTHON PROGRAMMING", org:"Samsung Innovation Campus × RUPP" },
    ],
    contactTitle: "CONTACT",
    contactSub: "OPEN TO THE RIGHT OPPORTUNITY",
    contactBtn: "GET IN TOUCH",
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    toggle:"KH",
  },
  kh: {
    tiles: ["អ្នកអភិវឌ្ឍន៍", "និស្សិត", "អ្នកបង្កើត"],
    heroSub: "FULL-STACK · ចរាចរណ៍អាកាស · ភ្នំពេញ",
    chaptersTitle: "អាជីព",
    chaptersLabel: "ជំពូក",
    projectsTitle: "គម្រោង",
    skillsTitle: "ជំនាញ",
    statsTitle: "តួលេខ",
    stats: [
      { val:"10+", label:"គម្រោង" },
      { val:"3+", label:"ឆ្នាំ" },
      { val:"1.04M+", label:"ជួររដ្ឋ" },
      { val:"3", label:"វិញ្ញាបនបត្រ" },
    ],
    awardsTitle: "សមិទ្ធផល",
    awards: [
      { year:"2026", title:"លេខ ៣", event:"UNIPRENEURCAMP CLUSTER 1", org:"Khmer Enterprise" },
      { year:"2025", title:"វិញ្ញាបនបត្រ", event:"BIG DATA", org:"Hadoop · PySpark · Spark SQL" },
      { year:"2024", title:"វិញ្ញាបនបត្រ", event:"PYTHON", org:"Samsung × RUPP" },
    ],
    contactTitle: "ទំនាក់ទំនង",
    contactSub: "បើកចំហសម្រាប់ឱកាស",
    contactBtn: "ទំនាក់ទំនង",
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    toggle:"EN",
  },
};

// Horizontal scroll hero tile
function HeroTile({ label, index, total, photo }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: `0 0 ${hov ? "38vw" : "30vw"}`,
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        transition: "flex 0.5s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
        borderRight: index < total - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      {/* Photo */}
      {photo && (
        <img src={photo} alt="Hun Phanuth" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center top",
          filter: hov ? "brightness(0.45) contrast(1.1)" : "brightness(0.25) contrast(1.1)",
          transition: "filter 0.5s ease",
        }} />
      )}
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: hov ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.6)", transition: "background 0.5s" }} />

      {/* Index number */}
      <div style={{
        position: "absolute", top: 32, left: 24,
        fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
        fontSize: 11, letterSpacing: "0.25em", color: GOLD,
      }}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Label — vertical then horizontal on hover */}
      <div style={{
        position: "absolute", bottom: 48, left: 0, right: 0, padding: "0 28px",
        transform: hov ? "translateY(0)" : "translateY(8px)",
        transition: "transform 0.4s ease",
      }}>
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(36px, 5vw, 72px)",
          lineHeight: 0.92,
          letterSpacing: "0.04em",
          color: WHITE,
          marginBottom: 12,
        }}>{label}</div>
        <motion.div
          animate={{ width: hov ? "100%" : "0%" }}
          style={{ height: 2, background: GOLD, transformOrigin: "left" }}
          transition={{ duration: 0.35 }}
        />
      </div>
    </div>
  );
}

export default function CR7Style() {
  const [lang, setLang] = useState("en");
  const [apiProjects, setApiProjects] = useState([]);
  const [apiSkills, setApiSkills] = useState([]);
  const [apiEdu, setApiEdu] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin?type=project").then(r => r.json()).catch(() => []),
      fetch("/api/admin?type=skill").then(r => r.json()).catch(() => []),
      fetch("/api/admin?type=education").then(r => r.json()).catch(() => []),
    ]).then(([p, s, e]) => {
      setApiProjects(Array.isArray(p) ? p : []);
      setApiSkills(Array.isArray(s) ? s : []);
      setApiEdu(Array.isArray(e) ? e : []);
    });
  }, []);

  const d = T[lang];
  const projects = apiProjects.length > 0
    ? apiProjects.map((p, i) => ({ ...p, tag: DEFAULT_PROJECTS[i]?.tag || "PROJECT", year: DEFAULT_PROJECTS[i]?.year || "2024" }))
    : DEFAULT_PROJECTS;
  const skills = apiSkills.length > 0 ? apiSkills.map(s => s.name.toUpperCase()) : DEFAULT_SKILLS;
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;

  return (
    <div className={lang === "kh" ? "font-khmer" : ""} style={{ background: BLACK, color: WHITE, minHeight: "100vh", overflowX: "hidden" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;500;600;700&family=Inter:wght@300;400;500&family=Battambang:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #000; overflow-x: hidden; }
        .font-khmer * { font-family: 'Battambang', sans-serif !important; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: ${GOLD}; }
        @media(max-width:700px) {
          .hero-tiles { flex-direction:column!important; height:auto!important; overflow-x:visible!important; }
          .hero-tile-item { flex:0 0 100vh!important; width:100%!important; }
          .stats-row { grid-template-columns:repeat(2,1fr)!important; }
          .proj-grid { grid-template-columns:1fr!important; }
          .chap-grid { grid-template-columns:1fr!important; }
          .skill-grid { grid-template-columns:repeat(3,1fr)!important; }
        }
      `}</style>

      {/* ── FIXED NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 40px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)",
      }}>
        {/* CR7-style logo mark */}
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: "0.15em", color: WHITE }}>
          HP<span style={{ color: GOLD }}>7</span>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["PROJECTS", "CAREER", "CONTACT"].map((label, i) => (
            <a key={i} href={`#${label.toLowerCase()}`}
              style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = WHITE}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
              {label}
            </a>
          ))}
          <button onClick={() => setLang(l => l === "en" ? "kh" : "en")} style={{
            fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.18em",
            background: "transparent", border: `1px solid ${GOLD}`, color: GOLD, padding: "5px 14px", cursor: "pointer",
          }}>{d.toggle}</button>
        </div>
      </nav>

      {/* ══ HERO — horizontal tile scroll ══ */}
      <section style={{ height: "100vh", overflow: "hidden" }}>
        <div ref={heroRef} className="hero-tiles" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          {d.tiles.map((label, i) => (
            <HeroTile key={i} label={label} index={i} total={d.tiles.length} photo="images/bl-steven.png" />
          ))}
        </div>

        {/* Name overlay — bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
            padding: "0 40px 36px",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
          }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(40px,7vw,90px)", lineHeight: 0.9, letterSpacing: "0.04em", color: WHITE }}>
              HUN <span style={{ color: GOLD }}>PHANUTH</span>
            </div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
              {d.heroSub}
            </div>
          </div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 80, lineHeight: 1, color: "rgba(201,168,76,0.15)", letterSpacing: "0.04em", userSelect: "none" }}>
            CR<span style={{ color: "rgba(255,255,255,0.06)" }}>7</span>
          </div>
        </motion.div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <div className="stats-row" style={{ display: "grid", gridTemplateColumns: `repeat(${d.stats.length},1fr)`, background: GOLD }}>
        {d.stats.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            style={{ textAlign: "center", padding: "24px 16px", borderRight: i < d.stats.length - 1 ? "1px solid rgba(0,0,0,0.15)" : "none" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,4vw,52px)", color: BLACK, lineHeight: 1, letterSpacing: "0.04em" }}>{s.val}</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 10, color: "rgba(0,0,0,0.6)", letterSpacing: "0.2em", marginTop: 4, textTransform: "uppercase" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ══ CAREER CHAPTERS ══ */}
      <section id="career" style={{ background: DIM, padding: "100px 40px", position: "relative", overflow: "hidden" }}>
        {/* Ghost HP watermark */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(200px,30vw,400px)", color: "rgba(255,255,255,0.025)", letterSpacing: "0.04em", userSelect: "none", pointerEvents: "none", lineHeight: 1, whiteSpace: "nowrap" }}>
          HP
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 56 }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", color: GOLD }}>{d.chaptersLabel}</span>
            <div style={{ width: 40, height: 1, background: GOLD }} />
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,5vw,60px)", letterSpacing: "0.06em", color: WHITE }}>{d.chaptersTitle}</h2>
          </div>

          <div className="chap-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            {CHAPTERS.map((ch, i) => (
              <motion.div key={ch.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: BLACK, padding: "36px 28px", borderTop: `2px solid ${i === 0 ? GOLD : "#222"}`, transition: "border-color 0.2s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                onMouseLeave={e => e.currentTarget.style.borderColor = i === 0 ? GOLD : "#222"}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 64, color: "rgba(255,255,255,0.05)", lineHeight: 1, marginBottom: -8, letterSpacing: "0.04em" }}>{ch.id}</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.25em", color: GOLD, marginBottom: 10 }}>{ch.era}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(20px,2.5vw,28px)", letterSpacing: "0.06em", color: WHITE, marginBottom: 4 }}>{ch.title}</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: GREY, letterSpacing: "0.1em", marginBottom: 14 }}>{ch.sub}</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{ch.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginTop: 56, borderTop: "1px solid #222", paddingTop: 40 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", color: GOLD, marginBottom: 28 }}>EDUCATION</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {education.map((edu, i) => (
                <div key={edu.id} style={{ display: "flex", gap: 24, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, color: GOLD, letterSpacing: "0.1em", flexShrink: 0 }}>
                    {edu.period || `${edu.startDate} – ${edu.endDate}`}
                  </span>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: WHITE, letterSpacing: "0.04em" }}>{edu.degree}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: GREY }}>{edu.university}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" style={{ background: BLACK, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 56 }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", color: GOLD }}>SELECTED WORK</span>
            <div style={{ width: 40, height: 1, background: GOLD }} />
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,5vw,60px)", letterSpacing: "0.06em", color: WHITE }}>{d.projectsTitle}</h2>
          </div>

          <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            {projects.map((p, i) => (
              <motion.a key={p.id}
                href={p.link || "#"} target="_blank" rel="noreferrer"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ textDecoration: "none", display: "block", background: DIM, padding: "32px 28px", borderBottom: `2px solid #222`, transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = "#0A0A0A"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.background = DIM; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.2em", color: GOLD }}>{p.tag}</span>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: GREY }}>{p.year}</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(22px,2.5vw,32px)", letterSpacing: "0.05em", color: WHITE, marginBottom: 10, lineHeight: 1.1 }}>{p.name}</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.65, color: GREY }}>{p.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", color: GOLD }}>
                  VIEW <ArrowUpRight size={13} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section style={{ background: DIM, padding: "100px 40px", position: "relative", overflow: "hidden" }}>
        {/* Ghost number */}
        <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "40vw", color: "rgba(255,255,255,0.02)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>7</div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 48 }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", color: GOLD }}>ARSENAL</span>
            <div style={{ width: 40, height: 1, background: GOLD }} />
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,5vw,60px)", letterSpacing: "0.06em", color: WHITE }}>{d.skillsTitle}</h2>
          </div>

          <div className="skill-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 2 }}>
            {skills.map((sk, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                style={{ padding: "18px 14px", border: "1px solid #1A1A1A", textAlign: "center", cursor: "default", transition: "all 0.15s", background: BLACK }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.borderColor = GOLD; e.currentTarget.querySelector("span").style.color = BLACK; }}
                onMouseLeave={e => { e.currentTarget.style.background = BLACK; e.currentTarget.style.borderColor = "#1A1A1A"; e.currentTarget.querySelector("span").style.color = WHITE; }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", color: WHITE, transition: "color 0.15s" }}>{sk}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AWARDS ══ */}
      <section style={{ background: BLACK, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 48 }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", color: GOLD }}>HONOURS</span>
            <div style={{ width: 40, height: 1, background: GOLD }} />
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,5vw,60px)", letterSpacing: "0.06em", color: WHITE }}>{d.awardsTitle}</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {d.awards.map((ach, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ display: "flex", alignItems: "center", gap: 32, padding: "28px 0", borderBottom: "1px solid #1A1A1A", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, color: "rgba(201,168,76,0.3)", lineHeight: 1, minWidth: 72 }}>{ach.year}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(18px,2.5vw,28px)", letterSpacing: "0.06em", color: WHITE, marginBottom: 4 }}>{ach.title} — {ach.event}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, letterSpacing: "0.12em", color: GREY }}>{ach.org}</div>
                </div>
                <div style={{ width: 32, height: 32, border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 8, height: 8, background: GOLD, borderRadius: "50%" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ background: DIM, padding: "100px 40px", position: "relative", overflow: "hidden" }}>
        {/* Ghost CR7-style number */}
        <div style={{ position: "absolute", bottom: -40, right: -20, fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(200px,35vw,500px)", color: "rgba(255,255,255,0.02)", lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "0.04em" }}>HP</div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", color: GOLD }}>REACH OUT</span>
            <div style={{ width: 40, height: 1, background: GOLD }} />
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(60px,10vw,140px)", letterSpacing: "0.04em", lineHeight: 0.88, color: WHITE, marginBottom: 48 }}>
            {d.contactTitle}
          </h2>

          <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, letterSpacing: "0.18em", color: GREY, textTransform: "uppercase", marginBottom: 28 }}>{d.contactSub}</p>
              <a href={`mailto:${d.contact.email}`} style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: "0.15em",
                background: GOLD, color: BLACK, padding: "14px 36px",
                textDecoration: "none", transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                {d.contactBtn}
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: <Mail size={14} />, v: d.contact.email },
                { icon: <Phone size={14} />, v: d.contact.phone },
                { icon: <Github size={14} />, v: `github.com/${d.contact.github}` },
                { icon: <Linkedin size={14} />, v: "linkedin.com/in/Hun-Phanuth" },
                { icon: <MapPin size={14} />, v: d.contact.location },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'Inter',sans-serif", fontSize: 13, color: GREY }}>
                  <span style={{ color: GOLD }}>{c.icon}</span>{c.v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: BLACK, borderTop: "1px solid #111", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: "0.12em", color: WHITE }}>HP<span style={{ color: GOLD }}>7</span></span>
        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "#333", textTransform: "uppercase" }}>HUN PHANUTH · {new Date().getFullYear()} · PHNOM PENH</span>
      </footer>
    </div>
  );
}
