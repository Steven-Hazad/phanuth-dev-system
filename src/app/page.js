"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Github, Linkedin, MapPin, Heart, Star, Sparkles } from "lucide-react";

// ============================================================
// BLOOMING CV — pastel soft, handwritten accents, sticky-note cards
// Font: Nunito (round & friendly) + Caveat (handwritten labels)
// Palette: blush pink / lavender / baby blue / mint rotating surfaces
// Signature: Caveat sticky-note tab on every section card
// ============================================================

const SURFACES = ["#F9E4EE", "#EDE4F9", "#E4F0F9", "#F4F9E4", "#FDE8D8", "#E4F9F0"];
const ACCENTS  = ["#C084BE", "#9B7FD4", "#6BAED6", "#82C37A", "#E09060", "#60B899"];

const DATA = {
  en: {
    name: "Hun Phanuth",
    role: "Full-Stack Developer ✦ CS + Air Traffic Management",
    greeting: "Hi there! I'm Phanuth 👋",
    about: "I'm a CS student and full-stack developer currently cross-training in Air Traffic Management at NICA. I build real software — POS systems, e-commerce platforms, agritech apps — and I love bridging the world of code with the precision of aviation. ✈️",
    contact: { phone: "+855 715 303 622", email: "hunphanut14@gmail.com", github: "Steven-Hazad", linkedin: "Hun Phanuth", location: "DangKao, Phnom Penh 🇰🇭" },
    experience: [
      {
        period: "Dec 2025 – Present", emoji: "💻",
        title: "Full-Stack Freelancer", org: "Independent · Phnom Penh",
        tag: "mid-level",
        points: ["Building end-to-end POS & e-commerce platforms for Cambodian businesses 🛒", "Architecting backends, databases, and APIs for production stability 🔧", "Turning client ideas into responsive, real-world digital products ✨"],
      },
      {
        period: "Jan 2013 – Jan 2019", emoji: "🖨️",
        title: "Operations Assistant", org: "HHH Printer · Takeo",
        tag: "junior",
        points: ["Managed daily print operations and digital design work 🎨", "Designed custom layouts from client briefs", "Operated professional printing equipment with care 🌟"],
      },
    ],
    achievements: [
      { date: "Jun 2026", emoji: "🏆", title: "3rd Place — UniPreneurCamp Cluster 1", org: "Khmer Enterprise", desc: 'Team "Safework" clinched 3rd at UniPreneurCamp Cluster 1, June 12–14, 2026.' },
      { date: "Dec 2025", emoji: "📊", title: "Big Data Certification", org: "Professional Training", desc: "Processed 1.04M+ rows using Hadoop HDFS, PySpark, Spark SQL, Apache Hive & Parquet." },
      { date: "Dec 2024", emoji: "🐍", title: "Python Programming Certification", org: "Samsung Innovation Campus × RUPP", desc: "Completed Feb–Dec 2024. Certified by the Vice Director of RUPP." },
    ],
    languages: [{ name: "Khmer 🇰🇭", level: "Native" }, { name: "English 🌍", level: "Professional" }],
    education: [],
    skills: [],
    labels: { about: "about me ♡", experience: "work history ✦", education: "studies ★", achievements: "wins & certs 🏅", skills: "tech stack 💡", languages: "languages 🌐", contact: "say hello! 💌", print: "Save PDF" },
  },
  kh: {
    name: "ហ៊ុន ផានុត",
    role: "អ្នកអភិវឌ្ឍន៍ Full-Stack ✦ CS + គ្រប់គ្រងចរាចរណ៍អាកាស",
    greeting: "សួស្ដី! ខ្ញុំជាផានុត 👋",
    about: "ខ្ញុំជានិស្សិត CS និងអ្នកអភិវឌ្ឍន៍ full-stack ដែលកំពុងសិក្សាការគ្រប់គ្រងចរាចរណ៍អាកាសនៅ NICA។ ខ្ញុំបង្កើតកម្មវិធីពិតប្រាកដ — POS, e-commerce, AgriTech — ✈️",
    contact: { phone: "+855 715 303 622", email: "hunphanut14@gmail.com", github: "Steven-Hazad", linkedin: "Hun Phanuth", location: "ដង្កោ, ភ្នំពេញ 🇰🇭" },
    experience: [
      { period: "ធ្នូ 2025 – បច្ចុប្បន្ន", emoji: "💻", title: "Full-Stack Freelancer", org: "Freelancer · ភ្នំពេញ", tag: "mid-level",
        points: ["បង្កើតប្រព័ន្ធ POS និង e-commerce 🛒", "រៀបចំ backend, ទិន្នន័យ, API 🔧", "បំប្លែងគំនិតអតិថិជនទៅជាផលិតផលឌីជីថល ✨"] },
      { period: "មករា 2013 – មករា 2019", emoji: "🖨️", title: "ជំនួយការប្រតិបត្តិការ", org: "HHH Printer · តាកែវ", tag: "junior",
        points: ["គ្រប់គ្រងប្រតិបត្តិការការបោះពុម្ព 🎨", "ផ្តល់សេវាកម្មអតិថិជន 🌟"] },
    ],
    achievements: [
      { date: "មិថុនា 2026", emoji: "🏆", title: "លេខ ៣ — UniPreneurCamp Cluster 1", org: "Khmer Enterprise", desc: 'ក្រុម "Safework" ទទួលបានលេខ ៣ — June 12–14, 2026.' },
      { date: "ធ្នូ 2025", emoji: "📊", title: "វិញ្ញាបនបត្រ Big Data", org: "Professional Training", desc: "ដំណើរការ 1.04M+ ជួររដ្ឋ ដោយប្រើ Hadoop, PySpark, Spark SQL។" },
      { date: "ធ្នូ 2024", emoji: "🐍", title: "វិញ្ញាបនបត្រ Python", org: "Samsung Innovation Campus × RUPP", desc: "បញ្ចប់ Feb–Dec 2024. បញ្ជាក់ដោយ RUPP។" },
    ],
    languages: [{ name: "ខ្មែរ 🇰🇭", level: "ភាសាមាតុភូមិ" }, { name: "អង់គ្លេស 🌍", level: "វិជ្ជាជីវៈ" }],
    education: [],
    skills: [],
    labels: { about: "អំពីខ្ញុំ ♡", experience: "បទពិសោធន៍ ✦", education: "ការសិក្សា ★", achievements: "សមិទ្ធផល 🏅", skills: "ជំនាញ 💡", languages: "ភាសា 🌐", contact: "ទំនាក់ទំនង 💌", print: "រក្សាទុក PDF" },
  },
};

const DEFAULT_EDU = [
  { id: 1, degree: "Bachelor of Air Traffic Management ✈️", university: "National Institute of Civil Aviation (NICA)", startDate: "2022", endDate: "Present" },
  { id: 2, degree: "Bachelor of Computer Science 💻", university: "Cambodian University for Specialties (CUS)", startDate: "2022", endDate: "Present" },
];
const DEFAULT_SKILLS = [
  { id:1, name:"Frontend 🎨", level:80 }, { id:2, name:"Backend ⚙️", level:70 },
  { id:3, name:"Data Analysis 📊", level:70 }, { id:4, name:"Aviation Safety ✈️", level:70 },
  { id:5, name:"Law of Aviation 📋", level:70 }, { id:6, name:"Quality Management 🎯", level:60 },
];

// Soft pastel pill badge
function Tag({ children, color = "#C084BE", bg = "#F9E4EE" }) {
  return (
    <span style={{ background: bg, color, fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:99, display:"inline-block", letterSpacing:"0.04em" }}>
      {children}
    </span>
  );
}

// Section card with handwritten sticky-note tab
function StickyCard({ label, children, surfaceIdx = 0, delay = 0 }) {
  const bg = SURFACES[surfaceIdx % SURFACES.length];
  const ac = ACCENTS[surfaceIdx % ACCENTS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      style={{ position: "relative", marginBottom: 28 }}
    >
      {/* Handwritten sticky tab */}
      <div style={{
        position: "absolute", top: -13, left: 24,
        background: bg, border: `1.5px solid ${ac}40`,
        borderBottom: "none",
        padding: "2px 14px 5px",
        borderRadius: "10px 10px 0 0",
        fontFamily: "'Caveat', cursive",
        fontSize: 15, color: ac,
        transform: "rotate(-1deg)",
        transformOrigin: "bottom left",
        zIndex: 2,
        boxShadow: `0 -2px 6px ${ac}18`,
      }}>
        {label}
      </div>
      <div style={{
        background: "#fff",
        border: `1.5px solid ${ac}30`,
        borderRadius: 20,
        padding: "24px 24px 20px",
        boxShadow: `0 4px 20px ${ac}15, 0 1px 4px ${ac}10`,
        position: "relative", zIndex: 1,
      }}>
        {children}
      </div>
    </motion.div>
  );
}

// Skill bar — pastel gradient fill
function SkillBar({ name, level, color }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:13, fontWeight:700, color:"#5A4A6A" }}>{name}</span>
        <span style={{ fontFamily:"'Caveat',cursive", fontSize:14, color }}>{level}%</span>
      </div>
      <div style={{ height:8, borderRadius:99, background:"#F0EBF7", overflow:"hidden" }}>
        <motion.div initial={{ width:0 }} whileInView={{ width:`${level}%` }} viewport={{ once:true }}
          transition={{ duration:0.9, ease:"easeOut" }}
          style={{ height:"100%", borderRadius:99, background:`linear-gradient(90deg, ${color}99, ${color})` }} />
      </div>
    </div>
  );
}

export default function CuteCV() {
  const [lang, setLang] = useState("en");
  const [apiEdu, setApiEdu]     = useState([]);
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

  const d = DATA[lang];
  const L = d.labels;
  const education = apiEdu.length   > 0 ? apiEdu   : DEFAULT_EDU;
  const skills    = apiSkills.length > 0 ? apiSkills : DEFAULT_SKILLS;

  return (
    <div className={lang === "kh" ? "font-khmer" : ""}
      style={{ minHeight:"100vh", background:"linear-gradient(135deg,#FFF0F5 0%,#F5F0FF 50%,#F0F5FF 100%)", color:"#5A4A6A" }}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Caveat:wght@400;600;700&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background: linear-gradient(135deg,#FFF0F5,#F5F0FF,#F0F5FF); }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        @media print {
          .no-print{display:none!important}
          body{background:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        }
      `}</style>

      {/* ── TOP CONTROLS ── */}
      <div className="no-print" style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(255,240,250,0.85)", backdropFilter:"blur(12px)",
        borderBottom:"1.5px solid #F0D8EA",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"10px 28px",
      }}>
        <span style={{ fontFamily:"'Caveat',cursive", fontSize:20, color:"#C084BE", letterSpacing:"0.04em" }}>
          ✦ Phanuth's CV
        </span>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => setLang(l => l==="en"?"kh":"en")} style={{
            fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:12,
            background:"#F9E4EE", border:"1.5px solid #C084BE40", color:"#C084BE",
            padding:"6px 16px", borderRadius:99, cursor:"pointer",
          }}>{lang==="en" ? "🇰🇭 KH" : "🌍 EN"}</button>
          <button onClick={() => window.print()} style={{
            fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:12,
            background:"linear-gradient(135deg,#C084BE,#9B7FD4)",
            border:"none", color:"#fff",
            padding:"6px 18px", borderRadius:99, cursor:"pointer",
          }}>🌸 {L.print}</button>
        </div>
      </div>

      <div style={{ maxWidth:780, margin:"0 auto", padding:"40px 20px 80px" }}>

        {/* ══════════════ HERO ══════════════ */}
        <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          style={{
            background:"#fff", borderRadius:32, padding:"32px 32px 28px",
            boxShadow:"0 8px 40px rgba(192,132,190,0.15), 0 2px 8px rgba(155,127,212,0.1)",
            border:"1.5px solid rgba(192,132,190,0.2)",
            marginBottom:32, position:"relative", overflow:"hidden",
          }}>
          {/* Decorative blobs */}
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"linear-gradient(135deg,#F9E4EE,#EDE4F9)", opacity:0.5, pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"linear-gradient(135deg,#E4F0F9,#F4F9E4)", opacity:0.5, pointerEvents:"none" }} />

          <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"0 28px", alignItems:"center", position:"relative" }}>
            {/* Photo */}
            <div style={{
              width:110, height:110, borderRadius:"50%", overflow:"hidden",
              border:"3px solid #F9E4EE",
              boxShadow:"0 0 0 4px #EDE4F9, 0 4px 16px rgba(192,132,190,0.25)",
              flexShrink:0,
            }}>
              <img src="images/bl-steven.png" alt="Hun Phanuth" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>

            <div>
              <div style={{ fontFamily:"'Caveat',cursive", fontSize:16, color:"#C084BE", marginBottom:4 }}>{d.greeting}</div>
              <h1 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:"clamp(24px,5vw,38px)", color:"#5A4A6A", lineHeight:1.1, marginBottom:8 }}>
                {d.name} <span style={{ color:"#C084BE" }}>✦</span>
              </h1>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:600, fontSize:13, color:"#9B7FD4", lineHeight:1.5, marginBottom:16 }}>{d.role}</p>

              {/* Contact pills */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {[
                  { icon:<Phone size={11}/>, v:d.contact.phone },
                  { icon:<Mail size={11}/>, v:d.contact.email },
                  { icon:<Github size={11}/>, v:d.contact.github },
                  { icon:<Linkedin size={11}/>, v:d.contact.linkedin },
                  { icon:<MapPin size={11}/>, v:d.contact.location },
                ].map((c,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:5, background:"#F5F0FF", borderRadius:99, padding:"4px 12px", fontSize:11, fontFamily:"'Nunito',sans-serif", fontWeight:600, color:"#8A7A9A" }}>
                    <span style={{ color:"#C084BE" }}>{c.icon}</span>{c.v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════ ABOUT ══════════════ */}
        <StickyCard label={L.about} surfaceIdx={0} delay={0.05}>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:14, lineHeight:1.8, color:"#6A5A7A" }}>{d.about}</p>
        </StickyCard>

        {/* ══════════════ EXPERIENCE ══════════════ */}
        <StickyCard label={L.experience} surfaceIdx={1} delay={0.08}>
          {d.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom:i < d.experience.length-1 ? 22 : 0 }}>
              {i > 0 && <div style={{ height:1, background:"#F0EBF7", margin:"18px 0" }} />}
              <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                <div style={{ width:42, height:42, borderRadius:14, background:SURFACES[i+1], display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                  {exp.emoji}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:8, marginBottom:3 }}>
                    <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, color:"#5A4A6A" }}>{exp.title}</h3>
                    <Tag color={ACCENTS[i+1]} bg={SURFACES[i+1]}>{exp.tag}</Tag>
                  </div>
                  <div style={{ fontFamily:"'Caveat',cursive", fontSize:14, color:"#9B7FD4", marginBottom:8 }}>
                    {exp.org} · {exp.period}
                  </div>
                  <ul style={{ listStyle:"none", paddingLeft:0, display:"flex", flexDirection:"column", gap:5 }}>
                    {exp.points.map((pt, pi) => (
                      <li key={pi} style={{ fontFamily:"'Nunito',sans-serif", fontSize:13, color:"#7A6A8A", display:"flex", gap:8, lineHeight:1.6 }}>
                        <span style={{ color:"#C084BE", flexShrink:0 }}>♡</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </StickyCard>

        {/* ══════════════ EDUCATION ══════════════ */}
        <StickyCard label={L.education} surfaceIdx={2} delay={0.1}>
          {education.map((edu, i) => (
            <div key={edu.id} style={{ marginBottom:i < education.length-1 ? 18 : 0 }}>
              {i > 0 && <div style={{ height:1, background:"#EAF0F9", margin:"14px 0" }} />}
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:38, height:38, borderRadius:12, background:SURFACES[2], display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🎓</div>
                <div>
                  <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:15, color:"#5A4A6A", marginBottom:3 }}>{edu.degree}</h3>
                  <div style={{ fontFamily:"'Caveat',cursive", fontSize:14, color:"#6BAED6" }}>{edu.university}</div>
                  <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:12, color:"#9A8AAA", marginTop:2 }}>{edu.startDate} – {edu.endDate}</div>
                  {edu.achievement && <div style={{ marginTop:4, fontFamily:"'Nunito',sans-serif", fontSize:12, color:"#82C37A" }}>⭐ {edu.achievement}</div>}
                </div>
              </div>
            </div>
          ))}
        </StickyCard>

        {/* ══════════════ SKILLS ══════════════ */}
        <StickyCard label={L.skills} surfaceIdx={3} delay={0.12}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"0 28px" }}>
            {skills.map((sk, i) => (
              <SkillBar key={sk.id||i} name={sk.name} level={sk.level||70} color={ACCENTS[i % ACCENTS.length]} />
            ))}
          </div>
        </StickyCard>

        {/* ══════════════ ACHIEVEMENTS ══════════════ */}
        <StickyCard label={L.achievements} surfaceIdx={4} delay={0.14}>
          {d.achievements.map((ach, i) => (
            <div key={i} style={{ marginBottom:i < d.achievements.length-1 ? 18 : 0 }}>
              {i > 0 && <div style={{ height:1, background:"#FDE8D820", margin:"14px 0" }} />}
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:38, height:38, borderRadius:12, background:SURFACES[4], display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
                  {ach.emoji}
                </div>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:2 }}>
                    <h3 style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14, color:"#5A4A6A" }}>{ach.title}</h3>
                  </div>
                  <div style={{ fontFamily:"'Caveat',cursive", fontSize:13, color:"#E09060", marginBottom:4 }}>{ach.org} · {ach.date}</div>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:13, color:"#7A6A8A", lineHeight:1.6 }}>{ach.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </StickyCard>

        {/* ══════════════ LANGUAGES ══════════════ */}
        <StickyCard label={L.languages} surfaceIdx={5} delay={0.16}>
          <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
            {d.languages.map((lg, i) => (
              <div key={i} style={{ background:SURFACES[i], borderRadius:16, padding:"14px 24px", textAlign:"center", minWidth:120 }}>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:16, color:"#5A4A6A", marginBottom:4 }}>{lg.name}</div>
                <div style={{ fontFamily:"'Caveat',cursive", fontSize:14, color:ACCENTS[i] }}>{lg.level}</div>
              </div>
            ))}
          </div>
        </StickyCard>

        {/* ══════════════ CONTACT CTA ══════════════ */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.18 }}
          style={{ background:"linear-gradient(135deg,#F9E4EE,#EDE4F9,#E4F0F9)", borderRadius:28, padding:"32px 28px", textAlign:"center", border:"1.5px solid rgba(192,132,190,0.2)", boxShadow:"0 4px 24px rgba(192,132,190,0.12)" }}>
          <div style={{ fontFamily:"'Caveat',cursive", fontSize:28, color:"#C084BE", marginBottom:6 }}>Let's make something lovely together! ✨</div>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:14, color:"#8A7A9A", marginBottom:20 }}>Open to opportunities, collaborations & coffee chats ☕</p>
          <a href="mailto:hunphanut14@gmail.com" style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"linear-gradient(135deg,#C084BE,#9B7FD4)",
            color:"#fff", borderRadius:99, padding:"12px 32px",
            fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14,
            textDecoration:"none", boxShadow:"0 4px 16px rgba(192,132,190,0.4)",
          }}>
            <Heart size={16} fill="white" /> Say Hello!
          </a>
          <div style={{ marginTop:16, fontFamily:"'Caveat',cursive", fontSize:14, color:"#B09AC0" }}>hunphanut14@gmail.com</div>
        </motion.div>

        {/* footer */}
        <div style={{ textAlign:"center", marginTop:32, fontFamily:"'Caveat',cursive", fontSize:16, color:"#C084BE", opacity:0.6 }}>
          made with ♡ · {d.name} · {new Date().getFullYear()}
        </div>

      </div>
    </div>
  );
}