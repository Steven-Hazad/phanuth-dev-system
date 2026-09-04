"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";

// ============================================================
// SCRAPBOOK — torn paper, tape strips, pinned photos,
// handwritten labels, rubber stamps, sticky notes.
// Paper: #FBF7F0 · Ink: #2C1810 · Tape: #D4C5A9
// Accents: highlighter yellow #FFE566, stamp red #C0392B,
//          washi blue #7EB8D4, sticky pink #FFB3BA
// Font: Caveat (handwritten) + Kalam (printed handwriting)
// Signature: everything is slightly rotated, nothing is perfect
// ============================================================

const PAPER  = "#FBF7F0";
const INK    = "#2C1810";
const TAPE   = "rgba(212,197,169,0.7)";
const YELLOW = "#FFE566";
const RED    = "#C0392B";
const BLUE   = "#7EB8D4";
const PINK   = "#FFB3BA";
const MINT   = "#B5EAD7";
const AGED   = "#F0E6D3";

const DEFAULT_PROJECTS = [
  { id:1, name:"SrovChlart", tag:"AgriTech", year:"'24", desc:"Rice marketplace for Cambodian farmers. React Native + TypeScript.", color:MINT },
  { id:2, name:"SafeHire", tag:"Safety App", year:"'24", desc:"Anti-scam job verification platform. React Native Expo.", color:PINK },
  { id:3, name:"KourSrov", tag:"AgriTech", year:"'23", desc:"AgriTech platform for Cambodia's rice industry.", color:YELLOW },
];
const DEFAULT_SKILLS = [
  "React","Next.js","Node.js","PostgreSQL","Python",
  "React Native","TypeScript","Tailwind","Supabase","Expo",
  "PySpark","Spark SQL","Hadoop","Aviation Safety","Air Traffic Mgmt",
];
const DEFAULT_EDU = [
  { id:1, degree:"Air Traffic Management", university:"NICA — National Institute of Civil Aviation", period:"2022 – now" },
  { id:2, degree:"Computer Science", university:"CUS — Cambodian University for Specialties", period:"2022 – now" },
];

// Washi tape strip — horizontal
function Tape({ color = TAPE, rotate = "-1deg", top = -10, width = "60%", left = "20%" }) {
  return (
    <div style={{
      position:"absolute", top, left, width, height:22,
      background:color, opacity:0.75,
      transform:`rotate(${rotate})`,
      zIndex:10,
      borderLeft:"1px solid rgba(0,0,0,0.04)",
      borderRight:"1px solid rgba(0,0,0,0.04)",
    }} />
  );
}

// Torn edge — bottom of a paper piece
function TornBottom() {
  return (
    <svg viewBox="0 0 400 16" style={{ display:"block", width:"100%", height:16, marginTop:-1 }} preserveAspectRatio="none">
      <path d="M0,0 Q20,14 40,6 Q60,0 80,10 Q100,18 120,8 Q140,0 160,12 Q180,20 200,6 Q220,0 240,10 Q260,18 280,4 Q300,0 320,12 Q340,20 360,6 Q380,0 400,10 L400,0 Z"
        fill={PAPER} />
    </svg>
  );
}

// Sticky note
function Sticky({ children, color = YELLOW, rotate = "2deg", style = {} }) {
  return (
    <div style={{
      background: color,
      padding:"14px 16px 18px",
      boxShadow:"2px 3px 8px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(0,0,0,0.05)",
      transform:`rotate(${rotate})`,
      position:"relative",
      ...style,
    }}>
      {/* Top fold */}
      <div style={{ position:"absolute", top:0, right:0, width:0, height:0, borderStyle:"solid", borderWidth:"0 14px 14px 0", borderColor:`transparent rgba(0,0,0,0.08) transparent transparent` }} />
      {children}
    </div>
  );
}

// Rubber stamp
function Stamp({ children, color = RED }) {
  return (
    <div style={{
      display:"inline-block",
      border:`2.5px solid ${color}`,
      color, padding:"4px 12px",
      fontFamily:"'Kalam',cursive",
      fontWeight:700, fontSize:13,
      letterSpacing:"0.12em",
      textTransform:"uppercase",
      transform:"rotate(-3deg)",
      opacity:0.75,
      filter:"url(#roughen)",
    }}>
      {children}
    </div>
  );
}

// Pinned card — paper with a pin hole
function PinnedCard({ children, rotate = "1deg", bg = AGED, style = {} }) {
  return (
    <div style={{ position:"relative", transform:`rotate(${rotate})`, ...style }}>
      {/* Pin */}
      <div style={{
        position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)",
        width:14, height:14, borderRadius:"50%",
        background:"radial-gradient(circle at 35% 35%, #E8D5C4, #C4956A)",
        boxShadow:"0 2px 4px rgba(0,0,0,0.3)",
        zIndex:20,
      }} />
      <div style={{
        background:bg,
        padding:"24px 20px 20px",
        boxShadow:"2px 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
      }}>
        {children}
      </div>
    </div>
  );
}

const T = {
  en: {
    greeting: "hey, i'm",
    name: "Hun Phanuth",
    role: "full-stack dev + atm student",
    location: "Phnom Penh, Cambodia",
    about: "I write code and study airspace. Freelancing on POS systems, e-commerce + agritech apps. Also training in Air Traffic Management at NICA.",
    note1: "open to work!",
    note2: "CS + Aviation = me",
    projectsTitle: "stuff i've built",
    expTitle: "work history",
    eduTitle: "school stuff",
    skillsTitle: "things i know",
    awardsTitle: "wins ✦",
    contactTitle: "say hi!",
    exp: [
      { period:"Dec 2025 – now", title:"Full-Stack Freelancer", org:"Independent, Phnom Penh", desc:"Building POS + e-commerce platforms for Cambodian businesses end-to-end." },
      { period:"2013 – 2019", title:"Operations Assistant", org:"HHH Printer, Takeo", desc:"Print ops, digital design, direct client work." },
    ],
    awards: [
      { year:"2026", title:"3rd place, UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { year:"2025", title:"Big Data Certification", org:"Hadoop · PySpark · Spark SQL" },
      { year:"2024", title:"Python Certification", org:"Samsung × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    toggle:"KH",
  },
  kh: {
    greeting: "សួស្ដី, ខ្ញុំ",
    name: "ហ៊ុន ផានុត",
    role: "full-stack dev + និស្សិត ATM",
    location: "ភ្នំពេញ, កម្ពុជា",
    about: "ខ្ញុំសរសេរកូដ ហើយសិក្សាចរាចរណ៍អាកាស។ Freelancing — POS, e-commerce, AgriTech។ សិក្សា ATM នៅ NICA ។",
    note1: "បើកចំហ!",
    note2: "CS + Aviation = ខ្ញុំ",
    projectsTitle: "អ្វីដែលខ្ញុំបានបង្កើត",
    expTitle: "ប្រវត្តិការងារ",
    eduTitle: "ការសិក្សា",
    skillsTitle: "ជំនាញ",
    awardsTitle: "សមិទ្ធផល ✦",
    contactTitle: "ទំនាក់ទំនង!",
    exp: [
      { period:"ធ្នូ 2025 – Now", title:"Full-Stack Freelancer", org:"Freelancer, ភ្នំពេញ", desc:"POS + e-commerce ពីដើមដល់ចប់។" },
      { period:"2013 – 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer, តាកែវ", desc:"ប្រតិបត្តិការការបោះពុម្ព, រចនា, អតិថិជន។" },
    ],
    awards: [
      { year:"2026", title:"លេខ ៣, UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { year:"2025", title:"វិញ្ញាបនបត្រ Big Data", org:"Hadoop · PySpark · Spark SQL" },
      { year:"2024", title:"វិញ្ញាបនបត្រ Python", org:"Samsung × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    toggle:"EN",
  },
};

export default function Scrapbook() {
  const [lang, setLang] = useState("en");
  const [apiProjects, setApiProjects] = useState([]);
  const [apiSkills, setApiSkills]     = useState([]);
  const [apiEdu, setApiEdu]           = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin?type=project").then(r=>r.json()).catch(()=>[]),
      fetch("/api/admin?type=skill").then(r=>r.json()).catch(()=>[]),
      fetch("/api/admin?type=education").then(r=>r.json()).catch(()=>[]),
    ]).then(([p,s,e])=>{
      setApiProjects(Array.isArray(p)?p:[]);
      setApiSkills(Array.isArray(s)?s:[]);
      setApiEdu(Array.isArray(e)?e:[]);
    });
  }, []);

  const d = T[lang];
  const projects  = apiProjects.length > 0 ? apiProjects.map((p,i)=>({ ...p, color:DEFAULT_PROJECTS[i]?.color||MINT })) : DEFAULT_PROJECTS;
  const skills    = apiSkills.length > 0 ? apiSkills.map(s=>s.name) : DEFAULT_SKILLS;
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;

  // Tape colours cycling
  const tapeColors = ["rgba(212,197,169,0.6)","rgba(126,184,212,0.5)","rgba(255,229,102,0.5)","rgba(181,234,215,0.5)","rgba(255,179,186,0.5)"];

  return (
    <div className={lang==="kh"?"font-khmer":""} style={{ minHeight:"100vh", background:`${PAPER} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23FBF7F0'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23E8DDD0' opacity='0.4'/%3E%3C/svg%3E")`, color:INK }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400;700&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:${PAPER}; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        .hand { font-family:'Caveat',cursive; }
        .print { font-family:'Kalam',cursive; }
        @media(max-width:640px){
          .hero-grid{grid-template-columns:1fr!important}
          .proj-grid{grid-template-columns:1fr!important}
          .skill-grid{grid-template-columns:repeat(3,1fr)!important}
        }
      `}</style>

      {/* SVG filter for rough stamp look */}
      <svg style={{ position:"absolute", width:0, height:0 }}>
        <defs>
          <filter id="roughen">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feDisplacementMap in="SourceGraphic" scale="1.5"/>
          </filter>
          <filter id="worn">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      {/* ── CONTROLS ── */}
      <div style={{ position:"fixed", top:16, right:16, zIndex:500, display:"flex", gap:8 }}>
        <button onClick={()=>setLang(l=>l==="en"?"kh":"en")}
          className="hand"
          style={{ fontSize:15, background:YELLOW, border:"2px solid rgba(0,0,0,0.15)", color:INK, padding:"4px 14px", cursor:"pointer", transform:"rotate(1deg)", boxShadow:"1px 2px 4px rgba(0,0,0,0.15)" }}>
          {d.toggle}
        </button>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"48px 24px 80px" }}>

        {/* ══ HERO ══ */}
        <section style={{ marginBottom:64, position:"relative" }}>
          <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:32, alignItems:"start" }}>

            {/* Left — main intro card */}
            <div style={{ position:"relative" }}>
              <Tape top={-8} left="15%" width="55%" rotate="-1.5deg" color={tapeColors[1]} />
              <div style={{ background:AGED, padding:"32px 28px 28px", boxShadow:"3px 5px 16px rgba(0,0,0,0.1)", position:"relative" }}>
                <p className="hand" style={{ fontSize:20, color:"#8B6F5E", marginBottom:4 }}>{d.greeting}</p>
                <h1 className="hand" style={{ fontSize:"clamp(48px,8vw,80px)", fontWeight:700, lineHeight:1, color:INK, marginBottom:8 }}>
                  {d.name}
                </h1>
                {/* Underline scribble */}
                <svg viewBox="0 0 300 12" style={{ width:"min(300px,90%)", height:12, marginBottom:16 }}>
                  <path d="M0,8 Q30,2 60,7 Q90,12 120,6 Q150,1 180,8 Q210,13 240,7 Q270,3 300,8" stroke={RED} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                </svg>
                <p className="print" style={{ fontSize:16, color:"#6B4F3A", marginBottom:20 }}>{d.role}</p>
                <p className="print" style={{ fontSize:14, lineHeight:1.8, color:"#5A3E2B", maxWidth:400 }}>{d.about}</p>

                <div style={{ marginTop:20, display:"flex", gap:12, flexWrap:"wrap" }}>
                  <a href={`mailto:${d.contact.email}`}
                    className="hand"
                    style={{ fontSize:16, background:INK, color:PAPER, padding:"8px 20px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6, transform:"rotate(-0.5deg)", boxShadow:"2px 3px 6px rgba(0,0,0,0.2)" }}>
                    <Mail size={14}/> email me
                  </a>
                  <a href={`https://github.com/${d.contact.github}`} target="_blank" rel="noreferrer"
                    className="hand"
                    style={{ fontSize:16, background:BLUE, color:INK, padding:"8px 20px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6, transform:"rotate(0.8deg)", boxShadow:"2px 3px 6px rgba(0,0,0,0.15)" }}>
                    <Github size={14}/> github
                  </a>
                </div>
              </div>
              <TornBottom />
            </div>

            {/* Right — photo + stickies */}
            <div style={{ display:"flex", flexDirection:"column", gap:20, paddingTop:16 }}>
              {/* Photo */}
              <PinnedCard rotate="-2deg">
                <div style={{ width:"100%", aspectRatio:"3/4", overflow:"hidden", marginBottom:8 }}>
                  <img src="images/bl-steven.png" alt="Hun Phanuth" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"sepia(0.15) contrast(1.05)" }} />
                </div>
                <p className="hand" style={{ fontSize:13, color:"#8B6F5E", textAlign:"center" }}>{d.location} ✈</p>
              </PinnedCard>

              {/* Stickies */}
              <Sticky color={YELLOW} rotate="3deg" style={{ alignSelf:"flex-end", maxWidth:160 }}>
                <p className="hand" style={{ fontSize:15, color:INK, fontWeight:600 }}>{d.note1}</p>
                <p className="hand" style={{ fontSize:12, color:"#5A3E2B" }}>{d.contact.phone}</p>
              </Sticky>

              <Sticky color={MINT} rotate="-2deg" style={{ alignSelf:"flex-start", maxWidth:160 }}>
                <p className="hand" style={{ fontSize:14, color:INK, fontWeight:600 }}>{d.note2}</p>
              </Sticky>
            </div>
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:"relative", marginBottom:28, display:"inline-block" }}>
            <Tape top={-6} left="-8px" width="110%" rotate="1deg" color={tapeColors[0]} />
            <h2 className="hand" style={{ fontSize:32, fontWeight:700, color:INK, position:"relative", zIndex:1, padding:"4px 8px" }}>
              {d.projectsTitle}
            </h2>
          </div>

          <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
            {projects.map((p,i)=>{
              const rotations = ["-1.5deg","1.8deg","-0.8deg"];
              return (
                <motion.div key={p.id}
                  initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                  style={{ position:"relative" }}>
                  <Tape top={-8} left="10%" width="80%" rotate={`${(i%2===0?-1:1)*1.2}deg`} color={tapeColors[i%tapeColors.length]} />
                  <div style={{ background:p.color||MINT, padding:"20px 18px 18px", boxShadow:"2px 4px 12px rgba(0,0,0,0.1)", transform:`rotate(${rotations[i%3]})` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                      <span className="hand" style={{ fontSize:13, color:"#5A3E2B", background:"rgba(255,255,255,0.5)", padding:"2px 8px" }}>{p.tag||DEFAULT_PROJECTS[i]?.tag}</span>
                      <span className="hand" style={{ fontSize:13, color:"#8B6F5E" }}>{p.year||DEFAULT_PROJECTS[i]?.year}</span>
                    </div>
                    <h3 className="hand" style={{ fontSize:22, fontWeight:700, color:INK, marginBottom:8 }}>{p.title||p.name}</h3>
                    <p className="print" style={{ fontSize:13, lineHeight:1.65, color:"#3D2B1A" }}>{p.description||p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══ EXPERIENCE ══ */}
        <section style={{ marginBottom:64 }}>
          <div style={{ background:AGED, padding:"32px 28px", position:"relative", boxShadow:"2px 4px 14px rgba(0,0,0,0.08)" }}>
            <Tape top={-8} left="5%" width="40%" rotate="-2deg" color={tapeColors[2]} />
            <div style={{ display:"flex", gap:16, alignItems:"baseline", marginBottom:28, flexWrap:"wrap" }}>
              <h2 className="hand" style={{ fontSize:30, fontWeight:700, color:INK }}>{d.expTitle}</h2>
              <Stamp>{lang==="en"?"verified":"បានផ្ទៀងផ្ទាត់"}</Stamp>
            </div>

            {d.exp.map((exp,i)=>(
              <div key={i} style={{ marginBottom:i<d.exp.length-1?24:0, paddingBottom:i<d.exp.length-1?24:0, borderBottom:i<d.exp.length-1?`2px dashed rgba(44,24,16,0.15)`:none }}>
                <div style={{ display:"flex", gap:16, alignItems:"flex-start", flexWrap:"wrap" }}>
                  <div style={{ background:YELLOW, padding:"3px 10px", transform:"rotate(-1deg)" }}>
                    <span className="hand" style={{ fontSize:13, color:INK, fontWeight:600 }}>{exp.period}</span>
                  </div>
                </div>
                <h3 className="hand" style={{ fontSize:22, fontWeight:700, color:INK, margin:"8px 0 4px" }}>{exp.title}</h3>
                <p className="hand" style={{ fontSize:15, color:"#8B6F5E", marginBottom:6 }}>{exp.org}</p>
                <p className="print" style={{ fontSize:14, lineHeight:1.7, color:"#5A3E2B" }}>{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ EDUCATION + AWARDS ══ */}
        <section style={{ marginBottom:64, display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }}>
          {/* Education */}
          <div style={{ position:"relative" }}>
            <Tape top={-8} left="5%" width="75%" rotate="1.5deg" color={tapeColors[4]} />
            <div style={{ background:PINK, padding:"24px 20px", boxShadow:"2px 4px 12px rgba(0,0,0,0.1)", transform:"rotate(-0.5deg)" }}>
              <h2 className="hand" style={{ fontSize:26, fontWeight:700, color:INK, marginBottom:20 }}>{d.eduTitle}</h2>
              {education.map((edu,i)=>(
                <div key={edu.id} style={{ marginBottom:16, paddingBottom:16, borderBottom:i<education.length-1?`2px dashed rgba(44,24,16,0.2)`:none }}>
                  <div className="hand" style={{ fontSize:17, fontWeight:700, color:INK, marginBottom:3 }}>{edu.degree}</div>
                  <div className="print" style={{ fontSize:13, color:"#5A3E2B", marginBottom:2 }}>{edu.university}</div>
                  <div style={{ display:"inline-block", background:"rgba(255,255,255,0.5)", padding:"1px 8px" }}>
                    <span className="hand" style={{ fontSize:13, color:"#8B6F5E" }}>{edu.period||`${edu.startDate} – ${edu.endDate}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div style={{ position:"relative" }}>
            <Tape top={-8} left="10%" width="70%" rotate="-1.2deg" color={tapeColors[1]} />
            <div style={{ background:AGED, padding:"24px 20px", boxShadow:"2px 4px 12px rgba(0,0,0,0.1)", transform:"rotate(0.8deg)" }}>
              <div style={{ display:"flex", gap:12, alignItems:"baseline", marginBottom:20 }}>
                <h2 className="hand" style={{ fontSize:26, fontWeight:700, color:INK }}>{d.awardsTitle}</h2>
              </div>
              {d.awards.map((ach,i)=>(
                <div key={i} style={{ marginBottom:14, display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ background:RED, color:PAPER, padding:"2px 8px", flexShrink:0, transform:"rotate(-1deg)" }}>
                    <span className="hand" style={{ fontSize:13, fontWeight:700 }}>{ach.year}</span>
                  </div>
                  <div>
                    <div className="hand" style={{ fontSize:16, fontWeight:700, color:INK, lineHeight:1.2 }}>{ach.title}</div>
                    <div className="print" style={{ fontSize:12, color:"#8B6F5E" }}>{ach.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section style={{ marginBottom:64, position:"relative" }}>
          <Tape top={-8} left="0%" width="50%" rotate="1deg" color={tapeColors[2]} />
          <div style={{ background:AGED, padding:"28px 24px", boxShadow:"2px 4px 12px rgba(0,0,0,0.08)" }}>
            <h2 className="hand" style={{ fontSize:28, fontWeight:700, color:INK, marginBottom:24 }}>{d.skillsTitle}</h2>
            <div className="skill-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
              {skills.map((sk,i)=>{
                const colors = [YELLOW, MINT, PINK, BLUE, AGED];
                const rots = ["-2deg","1.5deg","-1deg","2.5deg","-0.5deg","1deg"];
                return (
                  <motion.div key={i}
                    initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.03 }}
                    style={{ background:colors[i%colors.length], padding:"7px 10px", transform:`rotate(${rots[i%rots.length]})`, boxShadow:"1px 2px 4px rgba(0,0,0,0.1)", textAlign:"center" }}>
                    <span className="hand" style={{ fontSize:14, color:INK, fontWeight:600 }}>{sk}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section style={{ position:"relative" }}>
          <Tape top={-8} left="20%" width="60%" rotate="-1.5deg" color={tapeColors[3]} />
          <div style={{ background:INK, padding:"36px 32px", boxShadow:"4px 6px 20px rgba(0,0,0,0.2)", transform:"rotate(-0.3deg)", position:"relative" }}>
            {/* Corner doodle star */}
            <div style={{ position:"absolute", top:16, right:20, fontFamily:"serif", fontSize:28, color:"rgba(255,255,255,0.1)" }}>✦</div>

            <h2 className="hand" style={{ fontSize:36, fontWeight:700, color:PAPER, marginBottom:8 }}>{d.contactTitle}</h2>
            <div style={{ height:2, width:60, background:YELLOW, marginBottom:24 }} />

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { icon:<Mail size={14}/>, v:d.contact.email, href:`mailto:${d.contact.email}` },
                { icon:<Phone size={14}/>, v:d.contact.phone },
                { icon:<Github size={14}/>, v:`github.com/${d.contact.github}`, href:`https://github.com/${d.contact.github}` },
                { icon:<Linkedin size={14}/>, v:"linkedin.com/in/Hun-Phanuth", href:"#" },
                { icon:<MapPin size={14}/>, v:d.contact.location },
              ].map((c,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ color:YELLOW, flexShrink:0 }}>{c.icon}</span>
                  {c.href ? (
                    <a href={c.href} className="print" style={{ fontSize:15, color:"rgba(251,247,240,0.75)", textDecoration:"none", transition:"color 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.color=PAPER}
                      onMouseLeave={e=>e.currentTarget.style.color="rgba(251,247,240,0.75)"}>
                      {c.v}
                    </a>
                  ) : (
                    <span className="print" style={{ fontSize:15, color:"rgba(251,247,240,0.55)" }}>{c.v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div style={{ textAlign:"center", marginTop:48 }}>
          <span className="hand" style={{ fontSize:15, color:"#8B6F5E", opacity:0.6 }}>
            made with care ♡ · {d.name} · {new Date().getFullYear()}
          </span>
        </div>

      </div>
    </div>
  );
}
