"use client";
import { useState, useEffect } from "react";
import { Phone, Mail, Github, Linkedin, MapPin } from "lucide-react";

// ============================================================
// FORMAL — weight contrast + negative space. One red. That's it.
// Font: Syne 900 display / Syne 400–600 body (one family)
// Colour: #FAFAFA bg · #111111 ink · #E8000D ONE accent (name H + CTA)
// Layout: full-width name → hairline → two-col label/content rows
// Signature: red H in the name, dead silence everywhere else
// Now responsive (mobile-first breakpoints) + print-tuned for PDF export
// ============================================================

const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"National Institute of Civil Aviation (NICA)", startDate:"2022", endDate:"Present" },
  { id:2, degree:"Bachelor of Computer Science", university:"Cambodian University for Specialties (CUS)", startDate:"2022", endDate:"Present" },
];
const DEFAULT_SKILLS = [
  { id:1, name:"Frontend", level:80 }, { id:2, name:"Backend", level:70 },
  { id:3, name:"Data Analysis", level:70 }, { id:4, name:"Aviation Safety", level:70 },
  { id:5, name:"Law of Aviation", level:70 }, { id:6, name:"Quality Management", level:60 },
];

const CONTENT = {
  en: {
    first: "H", rest: "UN PHANUTH",
    role: "Full-Stack Developer",
    sector: "Computer Science — Air Traffic Management",
    about: "CS student and full-stack developer, cross-training in Air Traffic Management at NICA. I build production software — POS systems, e-commerce platforms, agritech apps — and I'm working toward a career that bridges engineering and aviation operations.",
    contact: { phone:"+855 715 303 622", email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia" },
    experience: [
      { period:"2025 – Present", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh",
        points:["Deliver end-to-end POS and e-commerce platforms for Cambodian businesses.","Architect backend systems, database structures, and API routing for production stability.","Build responsive storefronts with dynamic catalogs and smooth checkout flows.","Translate client operational needs directly into production-ready digital products."] },
      { period:"2013 – 2019", title:"Operations Assistant", org:"HHH Printer · Takeo",
        points:["Managed daily print operations, document processing, and digital design.","Designed custom layouts and graphics based on client briefs.","Operated and maintained professional printing equipment.","Provided direct customer service across all accounts."] },
    ],
    education: [],
    skills: [],
    achievements: [
      { date:"Jun 2026", title:"3rd Place — UniPreneurCamp Cluster 1", org:"Khmer Enterprise", desc:'Team "Safework" placed 3rd at UniPreneurCamp Cluster 1. June 12–14, 2026.' },
      { date:"Dec 2025", title:"Big Data Certification", org:"Professional Training Programme", desc:"Completed intensive enterprise big data training. Capstone processed 1.04M+ rows using Hadoop HDFS, PySpark, Spark SQL, Apache Hive, and Parquet." },
      { date:"Dec 2024", title:"Python Programming Certification", org:"Samsung Innovation Campus × RUPP", desc:"Completed Feb – Dec 2024. Certificate signed by the Vice Director of the Royal University of Phnom Penh." },
    ],
    languages: [{ name:"Khmer", note:"Native" }, { name:"English", note:"Professional working proficiency" }],
    nav: { experience:"Experience", education:"Education", skills:"Skills", contact:"Contact" },
    labels: { experience:"Experience", education:"Education", skills:"Technical skills", achievements:"Awards & certifications", languages:"Languages", contact:"Get in touch", print:"Print / PDF" },
    toggle: "KH",
  },
  kh: {
    first: "ហ៊ុន", rest: " ផានុត",
    role: "អ្នកអភិវឌ្ឍន៍ Full-Stack",
    sector: "វិទ្យាសាស្ត្រកុំព្យូទ័រ — គ្រប់គ្រងចរាចរណ៍អាកាស",
    about: "និស្សិត CS និងអ្នកអភិវឌ្ឍន៍ full-stack ដែលកំពុងសិក្សា ATM នៅ NICA។ ខ្ញុំបង្កើតកម្មវិធី POS, e-commerce, AgriTech — ឆ្ពោះទៅអាជីពភ្ជាប់ CS និង aviation។",
    contact: { phone:"+855 715 303 622", email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា" },
    experience: [
      { period:"2025 – បច្ចុប្បន្ន", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ",
        points:["ផ្តល់ប្រព័ន្ធ POS និង e-commerce ពីដើមដល់ចប់។","រៀបចំ backend, ទិន្នន័យ, API សម្រាប់ស្ថិរភាព។","បង្កើតទំព័រឆ្លើយតប។","បំប្លែងតម្រូវការអតិថិជនទៅជាផលិតផល។"] },
      { period:"2013 – 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ",
        points:["គ្រប់គ្រងប្រតិបត្តិការការបោះពុម្ព។","រចនាក្រាហ្វិក។","ផ្តល់សេវាកម្មអតិថិជន។"] },
    ],
    education: [],
    skills: [],
    achievements: [
      { date:"មិថុនា 2026", title:"លេខ ៣ — UniPreneurCamp Cluster 1", org:"Khmer Enterprise", desc:'ក្រុម "Safework" ទទួលបានលេខ ៣ — June 12–14, 2026.' },
      { date:"ធ្នូ 2025", title:"វិញ្ញាបនបត្រ Big Data", org:"ការបណ្តុះបណ្តាលវិជ្ជាជីវៈ", desc:"ដំណើរការ 1.04M+ ជួររដ្ឋ ដោយប្រើ Hadoop, PySpark, Spark SQL, Hive, Parquet។" },
      { date:"ធ្នូ 2024", title:"វិញ្ញាបនបត្រ Python", org:"Samsung Innovation Campus × RUPP", desc:"បញ្ចប់ Feb–Dec 2024. RUPP។" },
    ],
    languages: [{ name:"ខ្មែរ", note:"ភាសាមាតុភូមិ" }, { name:"អង់គ្លេស", note:"វិជ្ជាជីវៈ" }],
    nav: { experience:"បទពិសោធន៍", education:"ការសិក្សា", skills:"ជំនាញ", contact:"ទំនាក់ទំនង" },
    labels: { experience:"បទពិសោធន៍", education:"ការសិក្សា", skills:"ជំនាញបច្ចេកទេស", achievements:"សមិទ្ធផល", languages:"ភាសា", contact:"ទំនាក់ទំនង", print:"បោះពុម្ព / PDF" },
    toggle: "EN",
  },
};

const RED   = "#E8000D";
const INK   = "#111111";
const SUB   = "#777777";
const RULE  = "#E2E2E2";
const BG    = "#FAFAFA";

// Two-column row used throughout the body — layout lives in CSS (.cv-row)
// so it can respond to breakpoints; only color/type styling stays inline.
function Row({ label, children }) {
  return (
    <div className="cv-row">
      <div className="cv-row-label" style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:SUB }}>
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

// Experience / educadsadsadaation entry
function Entry({ period, title, org, points, achievement }) {
  return (
    <div className="cv-entry" style={{ marginBottom:28 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:16, flexWrap:"wrap", marginBottom:4 }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:17, color:INK }}>{title}</span>
        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:12, color:SUB, whiteSpace:"nowrap" }}>{period}</span>
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, color:SUB, marginBottom:points ? 12 : 0 }}>{org}</div>
      {points && (
        <ul style={{ listStyle:"none", paddingLeft:0, display:"flex", flexDirection:"column", gap:5 }}>
          {points.map((pt, i) => (
            <li key={i} style={{ fontFamily:"'Syne',sans-serif", fontSize:14, color:"#444", lineHeight:1.65, display:"flex", gap:10 }}>
              <span style={{ color:RULE, flexShrink:0, userSelect:"none" }}>—</span>{pt}
            </li>
          ))}
        </ul>
      )}
      {achievement && <div style={{ marginTop:8, fontFamily:"'Syne',sans-serif", fontSize:13, color:SUB }}>{achievement}</div>}
    </div>
  );
}

export default function FormalCV() {
  const [lang, setLang] = useState("en");
  const [apiEdu, setApiEdu] = useState([]);
  const [apiSkills, setApiSkills] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin?type=education").then(r => r.json()).catch(() => []),
      fetch("/api/admin?type=skill").then(r => r.json()).catch(() => []),
    ]).then(([e, s]) => {
      setApiEdu(Array.isArray(e) ? e : []);
      setApiSkills(Array.isArray(s) ? s : []);
    });
  }, []);

  const d = CONTENT[lang];
  const education = apiEdu.length   > 0 ? apiEdu   : DEFAULT_EDU;
  const skills    = apiSkills.length > 0 ? apiSkills : DEFAULT_SKILLS;

  return (
    <div className={lang === "kh" ? "font-khmer" : ""} style={{ minHeight:"100vh", background:BG, color:INK }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { -webkit-text-size-adjust:100%; }
        body { background:${BG}; overflow-x:hidden; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }

        /* ---------- structural / responsive layout ---------- */
        .cv-topbar {
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 48px; gap:16px;
        }
        .cv-nav { display:flex; gap:32px; overflow-x:auto; scrollbar-width:none; }
        .cv-nav::-webkit-scrollbar { display:none; }
        .cv-nav a { white-space:nowrap; }

        .cv-container { max-width:920px; margin:0 auto; padding:0 48px 100px; }

        .cv-hero { padding-top:80px; padding-bottom:56px; }
        .cv-hero h1 { font-size:clamp(56px,11vw,128px); }

        .cv-row {
          display:grid; grid-template-columns:160px 1fr; gap:0 48px;
          border-top:1px solid ${RULE}; padding-top:32px; padding-bottom:32px;
        }
        .cv-row-label { padding-top:3px; }

        .cv-contact-grid, .cv-skills-grid {
          display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px 32px;
        }

        .cv-cta {
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:24px;
        }
        .cv-cta h2 { font-size:clamp(28px,5vw,52px); }

        /* ---------- tablet / phone ---------- */
        @media (max-width:820px) {
          .cv-container { padding:0 32px 72px; }
          .cv-topbar { padding:12px 32px; }
        }

        @media (max-width:640px) {
          .cv-topbar { padding:12px 20px; gap:10px; }
          .cv-nav { gap:20px; }
          .cv-nav a { font-size:11px!important; }
          .cv-topbar button { padding:6px 12px!important; font-size:11px!important; }

          .cv-container { padding:0 20px 56px; }

          .cv-hero { padding-top:40px; padding-bottom:32px; }
          .cv-hero h1 { margin-bottom:20px!important; line-height:0.96!important; }
          .cv-hero .cv-role-line { flex-direction:column; align-items:flex-start!important; gap:6px!important; }

          .cv-row {
            grid-template-columns:1fr; gap:8px 0;
            padding-top:22px; padding-bottom:22px;
          }
          .cv-row-label { padding-top:0; }

          .cv-contact-grid, .cv-skills-grid { grid-template-columns:1fr 1fr; gap:14px 20px; }

          .cv-entry-header { flex-direction:column; align-items:flex-start!important; gap:4px!important; }

          .cv-cta { flex-direction:column; align-items:flex-start!important; }
          .cv-cta a { width:100%; text-align:center; }
        }

        @media (max-width:400px) {
          .cv-contact-grid, .cv-skills-grid { grid-template-columns:1fr; }
        }

        /* ---------- print / PDF export ---------- */
        @media print {
          @page { size:A4; margin:14mm 16mm; }
          .no-print { display:none!important; }
          html, body { background:#fff!important; }
          body {
            -webkit-print-color-adjust:exact; print-color-adjust:exact; color-adjust:exact;
            font-size:12px;
          }
          .cv-container { max-width:100%!important; padding:0!important; margin:0!important; }
          .cv-hero { padding-top:0!important; padding-bottom:28px!important; }
          .cv-hero h1 { font-size:64px!important; }
          .cv-row { padding-top:18px!important; padding-bottom:18px!important; break-inside:avoid; }
          .cv-entry { break-inside:avoid; margin-bottom:18px!important; }
          .cv-cta { break-inside:avoid; }
          a[href]:after { content:""!important; } /* suppress browsers' auto URL suffix */
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <div className="no-print cv-topbar" style={{
        position:"sticky", top:0, zIndex:50,
        background:BG, borderBottom:`1px solid ${RULE}`,
      }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:14, letterSpacing:"-0.01em", flexShrink:0 }}>
          <span style={{ color:RED }}>H</span>P
        </span>
        <nav className="cv-nav">
          {Object.entries(d.nav).map(([k, v]) => (
            <a key={k} href={`#${k}`} style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:600, color:SUB, textDecoration:"none", letterSpacing:"0.06em", textTransform:"uppercase" }}>
              {v}
            </a>
          ))}
        </nav>
        <div style={{ display:"flex", gap:10, flexShrink:0 }}>
          <button onClick={() => setLang(l => l === "en" ? "kh" : "en")} style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, background:"transparent", border:`1px solid ${RULE}`, color:SUB, padding:"6px 16px", cursor:"pointer", letterSpacing:"0.08em" }}>
            {d.toggle}
          </button>
          <button onClick={() => window.print()} style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, background:RED, border:"none", color:"#fff", padding:"6px 18px", cursor:"pointer", letterSpacing:"0.06em" }}>
            {d.labels.print}
          </button>
        </div>
      </div>

      <div className="cv-container">

        {/* ══ HERO ══ */}
        <div className="cv-hero">
          {/* Name — the whole design lives here */}
          <h1 style={{
            fontFamily:"'Syne',sans-serif", fontWeight:900,
            lineHeight:0.92, letterSpacing:"-0.03em",
            marginBottom:32,
          }}>
            <span style={{ color:RED }}>{d.first}</span>{d.rest}
          </h1>

          {/* Role + sector — quiet, below the name */}
          <div className="cv-role-line" style={{ display:"flex", alignItems:"baseline", gap:24, flexWrap:"wrap" }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, color:INK }}>{d.role}</span>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:14, color:SUB }}>{d.sector}</span>
          </div>
        </div>

        {/* ── BODY ── */}
        {/* About */}
        <Row label="Profile">
          <p style={{ fontFamily:"'Syne',sans-serif", fontSize:15, lineHeight:1.75, color:"#333", maxWidth:560 }}>{d.about}</p>
        </Row>

        {/* Contact */}
        <Row label={d.labels.contact}>
          <div className="cv-contact-grid">
            {[
              { icon:<Phone size={13}/>, v:d.contact.phone },
              { icon:<Mail size={13}/>, v:d.contact.email },
              { icon:<Github size={13}/>, v:d.contact.github },
              { icon:<Linkedin size={13}/>, v:d.contact.linkedin },
              { icon:<MapPin size={13}/>, v:d.contact.location },
            ].map((c, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:9, fontFamily:"'Syne',sans-serif", fontSize:13, color:"#444", minWidth:0 }}>
                <span style={{ color:SUB, flexShrink:0 }}>{c.icon}</span>
                <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.v}</span>
              </div>
            ))}
          </div>
        </Row>

        {/* Experience */}
        <div id="experience">
          <Row label={d.labels.experience}>
            <div>
              {d.experience.map((exp, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ height:1, background:RULE, margin:"4px 0 28px" }} />}
                  <Entry period={exp.period} title={exp.title} org={exp.org} points={exp.points} />
                </div>
              ))}
            </div>
          </Row>
        </div>

        {/* Education */}
        <div id="education">
          <Row label={d.labels.education}>
            <div>
              {education.map((edu, i) => (
                <div key={edu.id}>
                  {i > 0 && <div style={{ height:1, background:RULE, margin:"4px 0 24px" }} />}
                  <Entry
                    period={`${edu.startDate} – ${edu.endDate}`}
                    title={edu.degree}
                    org={edu.university}
                    achievement={edu.achievement}
                  />
                </div>
              ))}
            </div>
          </Row>
        </div>

        {/* Skills */}
        <div id="skills">
          <Row label={d.labels.skills}>
            <div className="cv-skills-grid">
              {skills.map((sk, i) => (
                <div key={sk.id || i}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                    <span style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:600, color:INK }}>{sk.name}</span>
                    <span style={{ fontFamily:"'Syne',sans-serif", fontSize:12, color:SUB }}>{sk.level || 70}%</span>
                  </div>
                  <div style={{ height:2, background:RULE }}>
                    <div style={{ height:"100%", width:`${sk.level || 70}%`, background:INK }} />
                  </div>
                </div>
              ))}
            </div>
          </Row>
        </div>

        {/* Achievements */}
        <Row label={d.labels.achievements}>
          <div>
            {d.achievements.map((ach, i) => (
              <div key={i} className="cv-entry">
                {i > 0 && <div style={{ height:1, background:RULE, margin:"4px 0 24px" }} />}
                <div className="cv-entry-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:16, flexWrap:"wrap", marginBottom:4 }}>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:INK }}>{ach.title}</span>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontSize:12, color:SUB, whiteSpace:"nowrap" }}>{ach.date}</span>
                </div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, color:SUB, marginBottom:6 }}>{ach.org}</div>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:14, color:"#444", lineHeight:1.65 }}>{ach.desc}</p>
              </div>
            ))}
          </div>
        </Row>

        {/* Languages */}
        <Row label={d.labels.languages}>
          <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
            {d.languages.map((lg, i) => (
              <div key={i}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:INK, marginBottom:3 }}>{lg.name}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, color:SUB }}>{lg.note}</div>
              </div>
            ))}
          </div>
        </Row>

        {/* CTA — dead simple */}
        <div style={{ borderTop:`1px solid ${RULE}`, paddingTop:48, marginTop:8 }}>
          <div className="cv-cta">
            <div>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:900, lineHeight:0.95, letterSpacing:"-0.02em", marginBottom:10 }}>
                Let's work together.
              </h2>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:14, color:SUB }}>Open to opportunities and collaboration.</p>
            </div>
            <a href="mailto:hunphanut14@gmail.com" style={{
              fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, letterSpacing:"0.04em",
              background:RED, color:"#fff", padding:"14px 32px",
              textDecoration:"none", flexShrink:0, display:"inline-block",
            }}>
              hunphanut14@gmail.com →
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop:48, fontFamily:"'Syne',sans-serif", fontSize:11, color:RULE, letterSpacing:"0.08em" }}>
          HUN PHANUTH · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
