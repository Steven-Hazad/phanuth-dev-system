"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Github, Linkedin, MapPin } from "lucide-react";

const DATA = {
  en: {
    name: "HUN PHANUTH", role: "FULL-STACK DEVELOPER",
    sector: "CS + AIR TRAFFIC MANAGEMENT", status: "AVAILABLE FOR CONTACT",
    alt: "PHNOM PENH / CAMBODIA",
    about: "Full-stack developer and Air Traffic Management student at NICA. I build production software — POS systems, e-commerce platforms, agritech marketplaces — while training toward a career that bridges software engineering and aviation operations.",
    contact: { phone: "+855 715 303 622", email: "hunphanut14@gmail.com", github: "Steven-Hazad", linkedin: "Hun Phanuth", location: "DangKao, Phnom Penh" },
    experience: [
      { id: "EXP-001", period: "2025.12 → PRESENT", title: "FULL-STACK FREELANCER", org: "INDEPENDENT · PHNOM PENH", clearance: "MID-LEVEL",
        points: ["Deliver end-to-end POS and e-commerce platforms for Cambodian SMEs.", "Architect backend logic, DB structures, and API routing for system stability.", "Build responsive storefronts with dynamic catalogs and checkout flows.", "Translate client operational needs into production-ready digital products."] },
      { id: "EXP-002", period: "2013.01 → 2019.01", title: "OPERATIONS ASSISTANT", org: "HHH PRINTER · TAKEO", clearance: "JUNIOR",
        points: ["Managed daily printing operations and digital design services.", "Designed custom layouts and graphics from client briefs.", "Operated and maintained professional printing equipment.", "Provided direct customer service across all client accounts."] },
    ],
    achievements: [
      { id: "ACH-001", date: "2026.06", title: "3RD PLACE — UNIPRENEURCAMP CLUSTER 1", org: "KHMER ENTERPRISE", desc: 'Team "Safework" secured 3rd at UniPreneurCamp Cluster 1. June 12–14, 2026.' },
      { id: "ACH-002", date: "2025.12", title: "BIG DATA CERTIFICATION", org: "PROFESSIONAL TRAINING", desc: "Capstone processed 1.04M+ rows using Hadoop HDFS, PySpark, Spark SQL, Apache Hive, Parquet." },
      { id: "ACH-003", date: "2024.12", title: "PYTHON PROGRAMMING CERTIFICATION", org: "SAMSUNG INNOVATION CAMPUS × RUPP", desc: "Completed Feb–Dec 2024. Certified by Vice Director of the Royal University of Phnom Penh." },
    ],
    languages: [{ name: "KHMER", level: "NATIVE" }, { name: "ENGLISH", level: "PROFESSIONAL" }],
    labels: { contact: "CONTACT DATA", experience: "CAREER LOG", education: "TRAINING RECORD", achievements: "CERTIFICATIONS", skills: "TECHNICAL STACK", languages: "LANGUAGE SYSTEMS", brief: "PILOT BRIEF", print: "EXPORT PDF" },
  },
  kh: {
    name: "ហ៊ុន ផានុត", role: "អ្នកអភិវឌ្ឍន៍ FULL-STACK",
    sector: "វិទ្យាសាស្ត្រកុំព្យូទ័រ + គ្រប់គ្រងចរាចរណ៍អាកាស", status: "បើកចំហសម្រាប់ទំនាក់ទំនង",
    alt: "ភ្នំពេញ / កម្ពុជា",
    about: "អ្នកអភិវឌ្ឍន៍ full-stack និងនិស្សិតគ្រប់គ្រងចរាចរណ៍អាកាសនៅ NICA។ ខ្ញុំបង្កើតកម្មវិធី — POS, e-commerce, AgriTech — ខណៈបណ្តុះបណ្តាលខ្លួនឆ្ពោះអាជីពភ្ជាប់ CS និង aviation។",
    contact: { phone: "+855 715 303 622", email: "hunphanut14@gmail.com", github: "Steven-Hazad", linkedin: "Hun Phanuth", location: "ដង្កោ, ភ្នំពេញ" },
    experience: [
      { id: "EXP-001", period: "2025.12 → បច្ចុប្បន្ន", title: "FULL-STACK FREELANCER", org: "FREELANCER · ភ្នំពេញ", clearance: "MID-LEVEL",
        points: ["ផ្តល់ប្រព័ន្ធ POS និង e-commerce ពីដើមដល់ចប់។", "រៀបចំ backend, ទិន្នន័យ, API សម្រាប់ស្ថិរភាព។", "បង្កើតផ្ទាំងអ្នកប្រើប្រាស់ឆ្លើយតប។"] },
      { id: "EXP-002", period: "2013.01 → 2019.01", title: "ជំនួយការប្រតិបត្តិការ", org: "HHH PRINTER · តាកែវ", clearance: "JUNIOR",
        points: ["គ្រប់គ្រងប្រតិបត្តិការការបោះពុម្ព និងរចនាក្រាហ្វិក។", "ផ្តល់សេវាកម្មអតិថិជនដោយផ្ទាល់។"] },
    ],
    achievements: [
      { id: "ACH-001", date: "2026.06", title: "លេខ ៣ — UNIPRENEURCAMP CLUSTER 1", org: "KHMER ENTERPRISE", desc: 'ក្រុម "Safework" ទទួលបានលេខ ៣។ June 12–14, 2026.' },
      { id: "ACH-002", date: "2025.12", title: "វិញ្ញាបនបត្រ BIG DATA", org: "PROFESSIONAL TRAINING", desc: "ដំណើរការ 1.04M+ ជួររដ្ឋ ដោយប្រើ Hadoop, PySpark, Spark SQL។" },
      { id: "ACH-003", date: "2024.12", title: "វិញ្ញាបនបត្រ PYTHON", org: "SAMSUNG INNOVATION CAMPUS × RUPP", desc: "បញ្ចប់ Feb–Dec 2024. បញ្ជាក់ដោយ RUPP។" },
    ],
    languages: [{ name: "ខ្មែរ", level: "ភាសាមាតុភូមិ" }, { name: "អង់គ្លេស", level: "វិជ្ជាជីវៈ" }],
    labels: { contact: "ទំនាក់ទំនង", experience: "កំណត់ហេតុអាជីព", education: "កំណត់ហេតុការសិក្សា", achievements: "វិញ្ញាបនបត្រ", skills: "ជំនាញបច្ចេកទេស", languages: "ភាសា", brief: "ការណែនាំ", print: "នាំចេញ PDF" },
  },
};

function RadarRing({ size = 260, name, role }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cx = size / 2, cy = size / 2, r = size / 2 - 12;
    let angle = 0;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      [1, 0.66, 0.33].forEach(f => {
        ctx.beginPath(); ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,65,${f === 1 ? 0.35 : 0.15})`; ctx.lineWidth = f === 1 ? 1.5 : 0.75; ctx.stroke();
      });
      ctx.strokeStyle = "rgba(0,255,65,0.1)"; ctx.lineWidth = 0.75;
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      for (let i = 0; i < 60; i++) {
        const a = angle - (Math.PI * 0.55 * i) / 60;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r - 2, a - 0.04, a + 0.04); ctx.closePath();
        ctx.fillStyle = `rgba(0,255,65,${(1 - i / 60) * 0.2})`; ctx.fill();
      }
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + (r - 2) * Math.cos(angle), cy + (r - 2) * Math.sin(angle));
      ctx.strokeStyle = "rgba(0,255,65,0.85)"; ctx.lineWidth = 1.5; ctx.stroke();
      [{ a: 0.8, d: 0.55 }, { a: 2.3, d: 0.72 }, { a: 4.1, d: 0.38 }, { a: 5.5, d: 0.6 }].forEach(b => {
        const bx = cx + r * b.d * Math.cos(b.a), by = cy + r * b.d * Math.sin(b.a);
        const diff = ((angle - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const glow = diff < 0.3 ? 1 : Math.max(0, 1 - diff / (Math.PI * 1.5));
        if (glow > 0.05) {
          ctx.beginPath(); ctx.arc(bx, by, 3.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,255,65,${glow * 0.9})`; ctx.fill();
          ctx.beginPath(); ctx.arc(bx, by, 7, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,255,65,${glow * 0.15})`; ctx.fill();
        }
      });
      ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fillStyle = "#00FF41"; ctx.fill();
      angle = (angle + 0.012) % (Math.PI * 2);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <canvas ref={canvasRef} width={size} height={size} style={{ display: "block" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(11px,2.5vw,16px)", color: "#00FF41", letterSpacing: "0.12em", textAlign: "center", textShadow: "0 0 16px rgba(0,255,65,0.8)", lineHeight: 1.4 }}>
          {name.split(" ").map((w, i) => <div key={i}>{w}</div>)}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "rgba(0,255,65,0.45)", letterSpacing: "0.15em", marginTop: 8, textAlign: "center" }}>{role}</div>
      </div>
    </div>
  );
}

function Section({ label, children, isDark }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45 }} style={{ marginBottom: 44 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, borderBottom: "1px solid #1A3A1A", paddingBottom: 10 }}>
        <span style={{ color: "#00FF41", fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: "0.25em" }}>◈ {label}</span>
      </div>
      {children}
    </motion.section>
  );
}

function CRow({ icon, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ color: "#00A328", flexShrink: 0 }}>{icon}</span>
      <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: "#8AB88A", letterSpacing: "0.04em" }}>{value}</span>
    </div>
  );
}

export default function RadarCV() {
  const [lang, setLang] = useState("en");
  const [apiEdu, setApiEdu] = useState([]);
  const [apiSkills, setApiSkills] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/api/admin?type=education").then(r => r.json()).catch(() => []),
      fetch("/api/admin?type=skill").then(r => r.json()).catch(() => []),
    ]).then(([e, s]) => { setApiEdu(Array.isArray(e) ? e : []); setApiSkills(Array.isArray(s) ? s : []); });
  }, []);

  const d = DATA[lang];
  const L = d.labels;
  const education = apiEdu.length > 0 ? apiEdu : [
    { id: 1, degree: "BACHELOR OF AIR TRAFFIC MANAGEMENT", university: "National Institute of Civil Aviation (NICA)", startDate: "2022", endDate: "Present" },
    { id: 2, degree: "BACHELOR OF COMPUTER SCIENCE", university: "Cambodian University for Specialties (CUS)", startDate: "2022", endDate: "Present" },
  ];
  const skills = apiSkills.length > 0 ? apiSkills : [
    { id: 1, name: "FRONTEND", level: 80 }, { id: 2, name: "BACKEND", level: 70 },
    { id: 3, name: "DATA ANALYSIS", level: 70 }, { id: 4, name: "AVIATION SAFETY", level: 70 },
    { id: 5, name: "LAW OF AVIATION", level: 70 }, { id: 6, name: "QUALITY MGT", level: 60 },
  ];

  return (
    <div className={lang === "kh" ? "font-khmer" : ""} style={{ minHeight: "100vh", backgroundColor: "#0A0F0A", color: "#E8F5E8" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Battambang:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0F0A; }
        .font-khmer * { font-family: 'Battambang', sans-serif !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0F0A; } ::-webkit-scrollbar-thumb { background: #1A3A1A; }
        body::after { content:''; position:fixed; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px); pointer-events:none; z-index:9999; }
        @media print { .no-print{display:none!important} body::after{display:none} body{background:#0A0F0A!important;-webkit-print-color-adjust:exact;print-color-adjust:exact} }
        @media (max-width:620px) { .hero-grid{grid-template-columns:1fr!important;justify-items:center} }
      `}</style>

      {/* TOP BAR */}
      <div className="no-print" style={{ borderBottom:"1px solid #1A3A1A", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 24px", position:"sticky", top:0, zIndex:100, backgroundColor:"#0A0F0A" }}>
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#2D4A2D", letterSpacing:"0.2em" }}>CTRL-TWR / CAREER-LOG / {new Date().getFullYear()}</span>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => setLang(l => l === "en" ? "kh" : "en")} style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, background:"transparent", border:"1px solid #2D4A2D", color:"#00A328", padding:"4px 12px", cursor:"pointer", letterSpacing:"0.1em" }}>{lang === "en" ? "KH" : "EN"}</button>
          <button onClick={() => window.print()} style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, background:"#00FF41", border:"none", color:"#0A0F0A", padding:"4px 14px", cursor:"pointer", fontWeight:700, letterSpacing:"0.08em" }}>{L.print}</button>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"40px 20px 80px" }}>

        {/* HERO */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
          className="hero-grid"
          style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"40px 48px", alignItems:"center", marginBottom:60, borderBottom:"1px solid #1A3A1A", paddingBottom:48 }}>
          <RadarRing size={260} name={d.name} role={d.role} />
          <div>
            <div style={{ marginBottom:20 }}>
              {[{ k:"DESIGNATION", v:d.name },{ k:"FUNCTION", v:d.role },{ k:"SECTOR", v:d.sector },{ k:"LOCATION", v:d.alt },{ k:"STATUS", v:d.status, green:true }].map(row => (
                <div key={row.k} style={{ display:"flex", gap:0, marginBottom:8 }}>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#2D4A2D", letterSpacing:"0.15em", minWidth:110, flexShrink:0 }}>{row.k}</span>
                  <span style={{ color:"#1A3A1A", fontFamily:"'Share Tech Mono',monospace", fontSize:10, marginRight:10 }}>│</span>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:row.green?11:12, color:row.green?"#00FF41":"#C8E8C8", textShadow:row.green?"0 0 12px rgba(0,255,65,0.5)":"none" }}>{row.v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"#0D180D", border:"1px solid #1A3A1A", padding:"14px 16px", marginBottom:20 }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"#2D4A2D", letterSpacing:"0.2em", marginBottom:8 }}>◈ {L.brief}</div>
              <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:"#8AB88A", lineHeight:1.7 }}>{d.about}</p>
            </div>
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"#2D4A2D", letterSpacing:"0.2em", marginBottom:10 }}>◈ {L.contact}</div>
              <CRow icon={<Phone size={12}/>} value={d.contact.phone} />
              <CRow icon={<Mail size={12}/>} value={d.contact.email} />
              <CRow icon={<Github size={12}/>} value={d.contact.github} />
              <CRow icon={<Linkedin size={12}/>} value={d.contact.linkedin} />
              <CRow icon={<MapPin size={12}/>} value={d.contact.location} />
            </div>
          </div>
        </motion.div>

        {/* EXPERIENCE */}
        <Section label={L.experience}>
          {d.experience.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.1 }}
              style={{ display:"grid", gridTemplateColumns:"140px 1fr", gap:"0 24px", marginBottom:i<d.experience.length-1?28:0 }}>
              <div style={{ paddingTop:2 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#00A328", marginBottom:4 }}>{exp.id}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#4A6A4A", lineHeight:1.5 }}>{exp.period}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"#0A0F0A", background:"#00A328", padding:"2px 6px", display:"inline-block", marginTop:6 }}>{exp.clearance}</div>
              </div>
              <div style={{ borderLeft:"1px solid #1A3A1A", paddingLeft:20 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:14, color:"#C8E8C8", letterSpacing:"0.08em", marginBottom:4 }}>{exp.title}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#4A6A4A", marginBottom:12 }}>{exp.org}</div>
                <ul style={{ listStyle:"none", paddingLeft:0, display:"flex", flexDirection:"column", gap:6 }}>
                  {exp.points.map((pt, pi) => (
                    <li key={pi} style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:"#8AB88A", display:"flex", gap:8, lineHeight:1.6 }}>
                      <span style={{ color:"#00FF41", flexShrink:0 }}>›</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </Section>

        {/* EDUCATION */}
        <Section label={L.education}>
          {education.map((edu, i) => (
            <motion.div key={edu.id} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.1 }}
              style={{ display:"grid", gridTemplateColumns:"140px 1fr", gap:"0 24px", marginBottom:i<education.length-1?20:0 }}>
              <div style={{ paddingTop:2 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#4A6A4A" }}>{edu.startDate} → {edu.endDate}</div>
              </div>
              <div style={{ borderLeft:"1px solid #1A3A1A", paddingLeft:20 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:13, color:"#C8E8C8", marginBottom:4 }}>{edu.degree}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#4A6A4A" }}>{edu.university}</div>
                {edu.achievement && <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#00FF41", marginTop:6 }}>⬡ {edu.achievement}</div>}
              </div>
            </motion.div>
          ))}
        </Section>

        {/* CERTIFICATIONS */}
        <Section label={L.achievements}>
          {d.achievements.map((ach, i) => (
            <motion.div key={ach.id} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.08 }}
              style={{ display:"grid", gridTemplateColumns:"140px 1fr", gap:"0 24px", marginBottom:i<d.achievements.length-1?20:0 }}>
              <div style={{ paddingTop:2 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#00A328" }}>{ach.id}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#4A6A4A", marginTop:3 }}>{ach.date}</div>
              </div>
              <div style={{ borderLeft:"1px solid #1A3A1A", paddingLeft:20 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:13, color:"#C8E8C8", marginBottom:4 }}>{ach.title}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#00A328", letterSpacing:"0.1em", marginBottom:6 }}>{ach.org}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:"#8AB88A", lineHeight:1.65 }}>{ach.desc}</div>
              </div>
            </motion.div>
          ))}
        </Section>

        {/* SKILLS */}
        <Section label={L.skills}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"16px 32px" }}>
            {skills.map((sk, i) => (
              <motion.div key={sk.id||i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.05 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:"#C8E8C8" }}>{sk.name}</span>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#4A6A4A" }}>{sk.level||70}%</span>
                </div>
                <div style={{ height:2, background:"#1A3A1A", position:"relative", overflow:"hidden" }}>
                  <motion.div initial={{ width:0 }} whileInView={{ width:`${sk.level||70}%` }} viewport={{ once:true }} transition={{ duration:0.8, delay:i*0.05 }}
                    style={{ position:"absolute", top:0, left:0, height:"100%", background:"#00FF41", boxShadow:"0 0 8px rgba(0,255,65,0.6)" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* LANGUAGES */}
        <Section label={L.languages}>
          <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
            {d.languages.map((lg, i) => (
              <div key={i}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:14, color:"#C8E8C8", marginBottom:4 }}>{lg.name}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#00FF41", letterSpacing:"0.15em" }}>{lg.level}</div>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ textAlign:"center", marginTop:48 }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"#1A3A1A", letterSpacing:"0.25em" }}>── END OF RECORD / {d.name} / {new Date().getFullYear()} ──</div>
        </div>
      </div>
    </div>
  );
}