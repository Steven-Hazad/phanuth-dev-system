"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight } from "lucide-react";

// ============================================================
// RASHFORD-STYLE — Full-screen stacked panels, pure black/white
// Each section = a full-viewport dark panel with centred label
// Fixed left sidebar: nav links. Fixed right sidebar: status
// Font: Bebas Neue (massive condensed caps) + Inter (body)
// Zero colour. Zero radius. Just black, white, scale, photo.
// ============================================================

const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"NICA — National Institute of Civil Aviation", startDate:"2022", endDate:"Present" },
  { id:2, degree:"Bachelor of Computer Science", university:"CUS — Cambodian University for Specialties", startDate:"2022", endDate:"Present" },
];
const DEFAULT_SKILLS = [
  { id:1, name:"React / Next.js", level:80 },
  { id:2, name:"Node.js", level:70 },
  { id:3, name:"PostgreSQL", level:70 },
  { id:4, name:"Python", level:75 },
  { id:5, name:"Aviation Safety", level:70 },
  { id:6, name:"Data Analysis", level:70 },
  { id:7, name:"POS Systems", level:80 },
  { id:8, name:"Air Traffic Mgmt", level:70 },
];
const DEFAULT_PROJECTS = [
  { id:1, name:"SrovChlart", description:"Rice marketplace — React Native + TypeScript", link:"#" },
  { id:2, name:"SafeHire", description:"Anti-scam job verification — React Native Expo", link:"#" },
  { id:3, name:"KourSrov", description:"AgriTech platform for Cambodia's rice industry", link:"#" },
];

const T = {
  en: {
    name: "HUN PHANUTH",
    role: "FULL-STACK DEVELOPER",
    sector: "CS + AIR TRAFFIC MANAGEMENT",
    labels: { about:"ABOUT", work:"WORK", skills:"SKILLS", contact:"CONTACT" },
    about1: "I build production software.",
    about2: "POS systems. E-commerce platforms. Agritech applications. End to end, from architecture to deployment.",
    about3: "I'm also cross-training in Air Traffic Management at NICA. Two disciplines. One standard: if you get it wrong, something fails.",
    workLabel: "Selected Projects",
    expLabel: "Experience",
    exp: [
      { period:"2025 – Now", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh", desc:"End-to-end POS and e-commerce platforms for Cambodian businesses." },
      { period:"2013 – 2019", title:"Operations Assistant", org:"HHH Printer · Takeo", desc:"Print operations, digital design, and client service." },
    ],
    edu: "Education",
    awards: "Awards",
    achievements: [
      { date:"Jun 2026", title:"3rd Place, UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { date:"Dec 2025", title:"Big Data Certification", org:"Hadoop · PySpark · Spark SQL" },
      { date:"Dec 2024", title:"Python Certification", org:"Samsung Innovation Campus × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    contactLine: "Open to the right opportunity.",
    toggle: "KH",
    status: "AVAILABLE",
    based: "PHNOM PENH",
    year: String(new Date().getFullYear()),
  },
  kh: {
    name: "ហ៊ុន ផានុត",
    role: "អ្នកអភិវឌ្ឍន៍ FULL-STACK",
    sector: "CS + គ្រប់គ្រងចរាចរណ៍អាកាស",
    labels: { about:"អំពីខ្ញុំ", work:"គម្រោង", skills:"ជំនាញ", contact:"ទំនាក់ទំនង" },
    about1: "ខ្ញុំបង្កើតកម្មវិធីផលិតផល។",
    about2: "ប្រព័ន្ធ POS, e-commerce, AgriTech — ពីដើមដល់ចប់, ពី architecture ដល់ deployment។",
    about3: "ខ្ញុំក៏កំពុងសិក្សា ATM នៅ NICA ផងដែរ — ជំនាញពីរ, ស្តង់ដារតែមួយ: ប្រសិនបើខ្ញុំខុស, វានឹងបរាជ័យ។",
    workLabel: "គម្រោងដែលបានជ្រើស",
    expLabel: "បទពិសោធន៍",
    exp: [
      { period:"2025 – Now", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ", desc:"ប្រព័ន្ធ POS និង e-commerce ពីដើមដល់ចប់។" },
      { period:"2013 – 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ", desc:"ប្រតិបត្តិការការបោះពុម្ព, រចនាក្រាហ្វិក, សេវាកម្មអតិថិជន។" },
    ],
    edu: "ការសិក្សា",
    awards: "សមិទ្ធផល",
    achievements: [
      { date:"មិថុនា 2026", title:"លេខ ៣, UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { date:"ធ្នូ 2025", title:"វិញ្ញាបនបត្រ Big Data", org:"Hadoop · PySpark · Spark SQL" },
      { date:"ធ្នូ 2024", title:"វិញ្ញាបនបត្រ Python", org:"Samsung × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    contactLine: "បើកចំហសម្រាប់ឱកាសត្រឹមត្រូវ។",
    toggle: "EN",
    status: "AVAILABLE",
    based: "PHNOM PENH",
    year: String(new Date().getFullYear()),
  },
};

// Full-screen panel
function Panel({ id, children, bg="#000", style={} }) {
  return (
    <section id={id} style={{
      minHeight:"100vh", background:bg, position:"relative",
      display:"flex", alignItems:"center", justifyContent:"center",
      ...style,
    }}>
      {children}
    </section>
  );
}

// Side label — rotated vertical text
function SideLabel({ children, side="left" }) {
  return (
    <div style={{
      position:"fixed",
      [side]: 24,
      top:"50%",
      transform:"translateY(-50%)",
      zIndex:200,
      display:"flex",
      flexDirection:"column",
      gap:24,
      pointerEvents:"none",
    }}>
      {children}
    </div>
  );
}

export default function RashfordStyle() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [apiEdu, setApiEdu] = useState([]);
  const [apiSkills, setApiSkills] = useState([]);
  const [apiProjects, setApiProjects] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin?type=education").then(r=>r.json()).catch(()=>[]),
      fetch("/api/admin?type=skill").then(r=>r.json()).catch(()=>[]),
      fetch("/api/admin?type=project").then(r=>r.json()).catch(()=>[]),
    ]).then(([e,s,p])=>{
      setApiEdu(Array.isArray(e)?e:[]);
      setApiSkills(Array.isArray(s)?s:[]);
      setApiProjects(Array.isArray(p)?p:[]);
    });
  }, []);

  const d = T[lang];
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;
  const skills    = apiSkills.length > 0 ? apiSkills : DEFAULT_SKILLS;
  const projects  = apiProjects.length > 0 ? apiProjects : DEFAULT_PROJECTS;

  return (
    <div className={lang==="kh"?"font-khmer":""} style={{ background:"#000", color:"#fff", overflowX:"hidden" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:#000; overflow-x:hidden; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        ::-webkit-scrollbar { width:2px; }
        ::-webkit-scrollbar-track { background:#000; }
        ::-webkit-scrollbar-thumb { background:#333; }
        @media(max-width:700px){
          .side-label{display:none!important}
          .hero-name{font-size:18vw!important}
        }
      `}</style>

      {/* ── FIXED TOP NAV ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:500,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"20px 40px",
        background:"linear-gradient(to bottom,rgba(0,0,0,0.9),transparent)",
        pointerEvents:"none",
      }}>
        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:"0.15em", pointerEvents:"all" }}>
          {d.name}
        </span>
        <div style={{ display:"flex", gap:32, alignItems:"center", pointerEvents:"all" }}>
          {Object.entries(d.labels).map(([k,v]) => (
            <a key={k} href={`#${k}`} style={{
              fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:11,
              letterSpacing:"0.2em", textTransform:"uppercase",
              color:"rgba(255,255,255,0.55)", textDecoration:"none",
              transition:"color 0.2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.55)"}>
              {v}
            </a>
          ))}
          <button onClick={()=>setLang(l=>l==="en"?"kh":"en")} style={{
            fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:11,
            letterSpacing:"0.15em", textTransform:"uppercase",
            background:"transparent", border:"1px solid rgba(255,255,255,0.3)",
            color:"rgba(255,255,255,0.55)", padding:"4px 12px", cursor:"pointer",
          }}>{d.toggle}</button>
        </div>
      </nav>

      {/* ── FIXED LEFT SIDEBAR ── */}
      <div className="side-label" style={{ position:"fixed", left:20, top:"50%", transform:"translateY(-50%)", zIndex:200, display:"flex", flexDirection:"column", gap:0, alignItems:"center" }}>
        <div style={{ writingMode:"vertical-rl", textOrientation:"mixed", transform:"rotate(180deg)" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>
            {d.based} · {d.sector}
          </span>
        </div>
      </div>

      {/* ── FIXED RIGHT SIDEBAR ── */}
      <div className="side-label" style={{ position:"fixed", right:20, top:"50%", transform:"translateY(-50%)", zIndex:200, alignItems:"center" }}>
        <div style={{ writingMode:"vertical-rl", textOrientation:"mixed" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>
            {d.status} · {d.year}
          </span>
        </div>
      </div>

      {/* ══════════════ PANEL 01 — HERO ══════════════ */}
      <Panel id="hero" style={{ overflow:"hidden" }}>
        {/* Full-bleed photo */}
        <div style={{ position:"absolute", inset:0 }}>
          <img src="images/bl-steven.png" alt="Hun Phanuth" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"brightness(0.35) contrast(1.1)" }} />
        </div>

        {/* Overlay gradient */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />

        {/* Name — centred, massive */}
        <div style={{ position:"relative", textAlign:"center", zIndex:10, padding:"0 40px" }}>
          <motion.h1
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:1, ease:[0.16,1,0.3,1] }}
            className="hero-name"
            style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(64px,12vw,160px)", lineHeight:0.9, letterSpacing:"0.04em", color:"#fff", marginBottom:24 }}>
            {d.name}
          </motion.h1>
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:0.3 }}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20 }}>
            <div style={{ height:1, width:60, background:"rgba(255,255,255,0.3)" }} />
            <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:400, fontSize:12, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)" }}>
              {d.role}
            </span>
            <div style={{ height:1, width:60, background:"rgba(255,255,255,0.3)" }} />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <motion.div
            animate={{ y:[0,8,0] }}
            transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut" }}
            style={{ width:1, height:40, background:"rgba(255,255,255,0.25)" }} />
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)" }}>SCROLL</span>
        </div>
      </Panel>

      {/* ══════════════ PANEL 02 — ABOUT ══════════════ */}
      <Panel id="about" bg="#0A0A0A">
        {/* Big label */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,18vw,260px)", lineHeight:1, letterSpacing:"0.05em", color:"rgba(255,255,255,0.03)", whiteSpace:"nowrap" }}>
            {d.labels.about}
          </span>
        </div>

        <div style={{ position:"relative", zIndex:10, maxWidth:800, padding:"80px 40px", textAlign:"center" }}>
          <motion.p
            initial={{ opacity:0, y:30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.9 }}
            style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(28px,4vw,52px)", lineHeight:1.2, letterSpacing:"0.06em", color:"#fff", marginBottom:32 }}>
            {d.about1}
          </motion.p>
          <motion.p
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, delay:0.15 }}
            style={{ fontFamily:"'Inter',sans-serif", fontWeight:300, fontSize:18, lineHeight:1.8, color:"rgba(255,255,255,0.6)", marginBottom:20 }}>
            {d.about2}
          </motion.p>
          <motion.p
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, delay:0.28 }}
            style={{ fontFamily:"'Inter',sans-serif", fontWeight:300, fontSize:18, lineHeight:1.8, color:"rgba(255,255,255,0.45)" }}>
            {d.about3}
          </motion.p>

          {/* Experience inline */}
          <div style={{ marginTop:64, display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"rgba(255,255,255,0.08)" }}>
            {d.exp.map((exp,i)=>(
              <motion.div key={i}
                initial={{ opacity:0 }}
                whileInView={{ opacity:1 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.1 }}
                style={{ background:"#0A0A0A", padding:"28px 24px", textAlign:"left" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:10 }}>{exp.period}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:"0.06em", color:"#fff", marginBottom:4 }}>{exp.title}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:"0.1em", color:"rgba(255,255,255,0.4)", marginBottom:10 }}>{exp.org}</div>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:13, lineHeight:1.65, color:"rgba(255,255,255,0.45)", fontWeight:300 }}>{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Panel>

      {/* ══════════════ PANEL 03 — WORK ══════════════ */}
      <Panel id="work" bg="#000">
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,18vw,260px)", lineHeight:1, letterSpacing:"0.05em", color:"rgba(255,255,255,0.03)", whiteSpace:"nowrap" }}>
            {d.labels.work}
          </span>
        </div>

        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:960, padding:"80px 40px" }}>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:40, textAlign:"center" }}>
            {d.workLabel}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:1, background:"rgba(255,255,255,0.08)" }}>
            {projects.map((p,i)=>(
              <ProjectRow key={p.id} index={i+1} name={p.title||p.name} desc={p.description} link={p.link} />
            ))}
          </div>

          {/* Education + Awards */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, marginTop:64 }}>
            <div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:20 }}>{d.edu}</div>
              {education.map((edu,i)=>(
                <div key={edu.id} style={{ marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:"0.06em", color:"#fff", marginBottom:2 }}>{edu.degree}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:"0.04em" }}>{edu.university}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:"0.1em", marginTop:4, textTransform:"uppercase" }}>{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:20 }}>{d.awards}</div>
              {d.achievements.map((ach,i)=>(
                <div key={i} style={{ marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:"0.06em", color:"#fff", marginBottom:2 }}>{ach.title}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,0.35)" }}>{ach.org}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:"0.1em", marginTop:4, textTransform:"uppercase" }}>{ach.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* ══════════════ PANEL 04 — SKILLS ══════════════ */}
      <Panel id="skills" bg="#0A0A0A">
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,18vw,260px)", lineHeight:1, letterSpacing:"0.05em", color:"rgba(255,255,255,0.03)", whiteSpace:"nowrap" }}>
            {d.labels.skills}
          </span>
        </div>

        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:800, padding:"80px 40px" }}>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:48, textAlign:"center" }}>{d.labels.skills}</div>

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {skills.map((sk,i)=>(
              <motion.div key={sk.id||i}
                initial={{ opacity:0, x:-20 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.05 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.08em", color:"#fff" }}>{sk.name}</span>
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>{sk.level||70}%</span>
                </div>
                <div style={{ height:1, background:"rgba(255,255,255,0.1)", position:"relative" }}>
                  <motion.div
                    initial={{ width:0 }}
                    whileInView={{ width:`${sk.level||70}%` }}
                    viewport={{ once:true }}
                    transition={{ duration:1, delay:i*0.05, ease:"easeOut" }}
                    style={{ position:"absolute", top:0, left:0, height:"100%", background:"#fff" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Panel>

      {/* ══════════════ PANEL 05 — CONTACT ══════════════ */}
      <Panel id="contact" bg="#000" style={{ minHeight:"80vh" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,18vw,260px)", lineHeight:1, letterSpacing:"0.05em", color:"rgba(255,255,255,0.03)", whiteSpace:"nowrap" }}>
            {d.labels.contact}
          </span>
        </div>

        <div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"80px 40px" }}>
          <motion.h2
            initial={{ opacity:0, y:30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,8vw,100px)", lineHeight:0.95, letterSpacing:"0.04em", color:"#fff", marginBottom:20 }}>
            {d.labels.contact}
          </motion.h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:300, fontSize:16, color:"rgba(255,255,255,0.4)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:48 }}>
            {d.contactLine}
          </p>

          <a href={`mailto:${d.contact.email}`} style={{
            fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:"0.2em",
            color:"#000", background:"#fff", padding:"16px 48px",
            textDecoration:"none", display:"inline-block", marginBottom:48,
            transition:"opacity 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.8"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            {d.contact.email}
          </a>

          <div style={{ display:"flex", justifyContent:"center", gap:40, flexWrap:"wrap" }}>
            {[
              { icon:<Phone size={14}/>, v:d.contact.phone },
              { icon:<Github size={14}/>, v:`github.com/${d.contact.github}` },
              { icon:<Linkedin size={14}/>, v:"linkedin.com/in/Hun-Phanuth" },
              { icon:<MapPin size={14}/>, v:d.contact.location },
            ].map((c,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter',sans-serif", fontSize:12, color:"rgba(255,255,255,0.3)", letterSpacing:"0.06em" }}>
                {c.icon}{c.v}
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* ── FOOTER Streak ── */}
      <footer style={{ background:"#000", borderTop:"1px solid rgba(255,255,255,0.08)", padding:"24px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:"0.15em", color:"rgba(255,255,255,0.3)" }}>{d.name}</span>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} · PHNOM PENH, CAMBODIA</span>
      </footer>
    </div>
  );
}

function ProjectRow({ index, name, desc, link }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={link||"#"} target={link&&link!=="#"?"_blank":undefined} rel="noreferrer"
      style={{ textDecoration:"none", display:"block", background: hov ? "#fff" : "#000", transition:"background 0.2s", padding:"24px 28px" }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:20 }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:20 }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:"0.15em", color: hov ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.25)" }}>0{index}</span>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(20px,3vw,36px)", letterSpacing:"0.06em", color: hov ? "#000" : "#fff", transition:"color 0.2s" }}>{name}</span>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:300, color: hov ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.35)", transition:"color 0.2s" }}>{desc}</span>
        </div>
        <ArrowUpRight size={18} style={{ color: hov ? "#000" : "rgba(255,255,255,0.25)", transition:"color 0.2s", flexShrink:0 }} />
      </div>
    </a>
  );
}