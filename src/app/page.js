"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight } from "lucide-react";

// ============================================================
// NJR PRO — Yellow × Black. Premium, no emojis, no gimmicks.
// Same brand energy as Neymar's site — bold, confident, clean.
// Font: Montserrat 900 display + 400/500 body
// Accent: #FDD900 yellow — used on borders, tags, CTA, hover
// Layout: dark hero → yellow stats → white sections → dark footer
// ============================================================

const YELLOW  = "#FDD900";
const DYELLOW = "#E5C200";
const BLACK   = "#0D0D0D";
const WHITE   = "#FFFFFF";
const OFFBLK  = "#161616";
const GREY    = "#F5F5F5";
const MGREY   = "#E8E8E8";
const BODY    = "#555555";
const SUB     = "#888888";

const DEFAULT_PROJECTS = [
  { id:1, name:"SrovChlart", tag:"AgriTech · Mobile", year:"2024", desc:"Rice marketplace for Cambodian farmers. React Native + TypeScript — live pricing, farmer-direct sales, offline-first.", link:"#" },
  { id:2, name:"SafeHire", tag:"Safety · Mobile", year:"2024", desc:"Anti-scam job verification platform protecting Cambodian workers from fraudulent employers. React Native Expo.", link:"#" },
  { id:3, name:"KourSrov", tag:"AgriTech · Web", year:"2023", desc:"Full AgriTech platform for Cambodia's rice industry — market data, supply chain tools, farmer onboarding.", link:"#" },
];
const DEFAULT_SKILLS = [
  { name:"React / Next.js", cat:"Frontend" },
  { name:"Node.js", cat:"Backend" },
  { name:"PostgreSQL", cat:"Database" },
  { name:"Python", cat:"Language" },
  { name:"React Native", cat:"Mobile" },
  { name:"TypeScript", cat:"Language" },
  { name:"Tailwind CSS", cat:"Frontend" },
  { name:"Supabase", cat:"Backend" },
  { name:"PySpark", cat:"Big Data" },
  { name:"Spark SQL", cat:"Big Data" },
  { name:"Hadoop HDFS", cat:"Big Data" },
  { name:"Air Traffic Mgmt", cat:"Aviation" },
  { name:"Aviation Safety", cat:"Aviation" },
  { name:"REST APIs", cat:"Backend" },
];
const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"National Institute of Civil Aviation (NICA)", period:"2022 – Present" },
  { id:2, degree:"Bachelor of Computer Science", university:"Cambodian University for Specialties (CUS)", period:"2022 – Present" },
];
const STATS = [
  { val:"10+", label:"Projects Shipped" },
  { val:"3+", label:"Years Building" },
  { val:"1.04M+", label:"Data Rows Processed" },
  { val:"3", label:"Certifications" },
];

const T = {
  en: {
    name: "HUN PHANUTH",
    role: "Full-Stack Developer",
    sector: "Computer Science · Air Traffic Management",
    about: "I build production software and I'm cross-training in Air Traffic Management at NICA. POS systems, e-commerce platforms, agritech applications — end to end. Two disciplines, one standard: it has to work.",
    statsLabel: "BY THE NUMBERS",
    workTitle: "Projects",
    workSub: "Selected work — more on GitHub",
    expTitle: "Experience",
    expSub: "Professional history",
    eduTitle: "Education",
    skillsTitle: "Technical skills",
    awardsTitle: "Awards & Certifications",
    contactTitle: "Let's work\ntogether.",
    contactSub: "Open to freelance projects and the right full-time role.",
    contactBtn: "Get in touch",
    exp: [
      { period:"Dec 2025 – Present", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh",
        points:["End-to-end POS systems and e-commerce platforms for Cambodian businesses.", "Backend architecture, database design, API routing, and client storefronts.", "Working directly with owners from requirements through deployment."] },
      { period:"Jan 2013 – Jan 2019", title:"Operations Assistant", org:"HHH Printer · Takeo",
        points:["Managed print operations, document processing, and digital design.", "Delivered direct client service and custom layout work."] },
    ],
    awards: [
      { date:"Jun 2026", title:"3rd Place — UniPreneurCamp Cluster 1", org:"Khmer Enterprise · Team Safework" },
      { date:"Dec 2025", title:"Big Data Certification", org:"Hadoop · PySpark · Spark SQL · Apache Hive · Parquet" },
      { date:"Dec 2024", title:"Python Programming Certification", org:"Samsung Innovation Campus × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    nav: ["Work", "Skills", "Contact"],
    navIds: ["work", "skills", "contact"],
    toggle: "KH",
  },
  kh: {
    name: "ហ៊ុន ផានុត",
    role: "អ្នកអភិវឌ្ឍន៍ Full-Stack",
    sector: "វិទ្យាសាស្ត្រកុំព្យូទ័រ · គ្រប់គ្រងចរាចរណ៍អាកាស",
    about: "ខ្ញុំបង្កើតកម្មវិធីផលិតផល ហើយកំពុងសិក្សា ATM នៅ NICA។ POS, e-commerce, AgriTech — ពីដើមដល់ចប់។ ជំនាញពីរ, ស្តង់ដារតែមួយ: វាត្រូវតែដំណើរការ។",
    statsLabel: "តួលេខ",
    workTitle: "គម្រោង",
    workSub: "ការងារដែលបានជ្រើស",
    expTitle: "បទពិសោធន៍",
    expSub: "ប្រវត្តិការងារ",
    eduTitle: "ការសិក្សា",
    skillsTitle: "ជំនាញបច្ចេកទេស",
    awardsTitle: "សមិទ្ធផល & វិញ្ញាបនបត្រ",
    contactTitle: "តោះ\nធ្វើការជាមួយគ្នា។",
    contactSub: "បើកចំហសម្រាប់គម្រោង freelance និងការងារត្រឹមត្រូវ។",
    contactBtn: "ទំនាក់ទំនង",
    exp: [
      { period:"ធ្នូ 2025 – Now", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ",
        points:["ប្រព័ន្ធ POS + e-commerce ពីដើមដល់ចប់ — backend, DB, API, storefront។", "ធ្វើការជាមួយម្ចាស់ អាជីវកម្មពីតម្រូវការដល់ deployment។"] },
      { period:"មករា 2013 – 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ",
        points:["គ្រប់គ្រងប្រតិបត្តិការការបោះពុម្ព, រចនាក្រាហ្វិក, សេវាកម្មអតិថិជន។"] },
    ],
    awards: [
      { date:"មិថុនា 2026", title:"លេខ ៣ — UniPreneurCamp Cluster 1", org:"Khmer Enterprise · ក្រុម Safework" },
      { date:"ធ្នូ 2025", title:"វិញ្ញាបនបត្រ Big Data", org:"Hadoop · PySpark · Spark SQL" },
      { date:"ធ្នូ 2024", title:"វិញ្ញាបនបត្រ Python", org:"Samsung Innovation Campus × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    nav: ["គម្រោង", "ជំនាញ", "ទំនាក់ទំនង"],
    navIds: ["work", "skills", "contact"],
    toggle: "EN",
  },
};

// HP7 logo mark — clean, no emoji
function LogoMark({ size = 42, inverted = false }) {
  const bg = inverted ? WHITE : YELLOW;
  const ink = inverted ? YELLOW : BLACK;
  return (
    <div style={{ width:size, height:size, background:bg, borderRadius:6, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:0, flexShrink:0 }}>
      <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900, fontSize:size*0.36, lineHeight:1, color:ink, letterSpacing:"-0.03em" }}>HP</span>
      <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900, fontSize:size*0.24, lineHeight:1, color:ink, opacity:0.6 }}>7</span>
    </div>
  );
}

// Section label — yellow pill
function SecLabel({ children }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:12 }}>
      <div style={{ width:24, height:3, background:YELLOW, borderRadius:99 }} />
      <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:YELLOW }}>
        {children}
      </span>
    </div>
  );
}

export default function NJRPro() {
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
  const projects  = apiProjects.length > 0
    ? apiProjects.map((p,i) => ({ ...p, tag: DEFAULT_PROJECTS[i]?.tag || "Project", year: DEFAULT_PROJECTS[i]?.year || "2024" }))
    : DEFAULT_PROJECTS;
  const skills    = apiSkills.length > 0 ? apiSkills.map(s => ({ name:s.name, cat:"Tech" })) : DEFAULT_SKILLS;
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;

  return (
    <div className={lang==="kh"?"font-khmer":""} style={{ minHeight:"100vh", background:WHITE, color:BLACK, overflowX:"hidden" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${WHITE}; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        .m { font-family:'Montserrat',sans-serif; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#f0f0f0; }
        ::-webkit-scrollbar-thumb { background:${YELLOW}; }
        @media(max-width:700px){
          .hero-grid{grid-template-columns:1fr!important}
          .hero-photo{display:none!important}
          .proj-grid{grid-template-columns:1fr!important}
          .stat-grid{grid-template-columns:repeat(2,1fr)!important}
          .skill-grid{grid-template-columns:repeat(2,1fr)!important}
          .edu-grid{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .nav-links{display:none!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <header style={{
        position:"sticky", top:0, zIndex:100,
        background:BLACK, borderBottom:`3px solid ${YELLOW}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 48px", height:64,
      }}>
        <LogoMark size={42} />

        <nav className="nav-links m" style={{ display:"flex", gap:36, alignItems:"center" }}>
          {d.nav.map((label,i)=>(
            <a key={i} href={`#${d.navIds[i]}`}
              style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.5)", textDecoration:"none", letterSpacing:"0.06em", textTransform:"uppercase", transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color=WHITE}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}>
              {label}
            </a>
          ))}
        </nav>

        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button onClick={()=>setLang(l=>l==="en"?"kh":"en")}
            className="m"
            style={{ fontSize:12, fontWeight:700, background:"transparent", border:`1px solid rgba(255,255,255,0.2)`, color:"rgba(255,255,255,0.5)", padding:"6px 14px", cursor:"pointer", letterSpacing:"0.08em", transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=YELLOW;e.currentTarget.style.color=YELLOW;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.2)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>
            {d.toggle}
          </button>
          <a href={`mailto:${d.contact.email}`} className="m"
            style={{ fontSize:13, fontWeight:700, background:YELLOW, color:BLACK, padding:"8px 22px", textDecoration:"none", letterSpacing:"0.04em", transition:"opacity 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            {d.contactBtn}
          </a>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section style={{ background:BLACK, position:"relative", overflow:"hidden" }}>
        {/* Yellow accent line */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:YELLOW }} />

        <div className="hero-grid" style={{ maxWidth:1100, margin:"0 auto", padding:"88px 48px 80px", display:"grid", gridTemplateColumns:"1fr 360px", gap:80, alignItems:"center" }}>
          <div>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
              <div className="m" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:YELLOW, marginBottom:20 }}>
                {d.sector}
              </div>
              <h1 className="m" style={{ fontWeight:900, fontSize:"clamp(48px,8vw,96px)", lineHeight:0.92, letterSpacing:"-0.03em", color:WHITE, marginBottom:28 }}>
                {d.name.split(" ").map((w,i)=>(
                  <span key={i} style={{ display:"block" }}>
                    {i===1 ? <span style={{ WebkitTextStroke:`2px ${YELLOW}`, color:"transparent" }}>{w}</span> : w}
                  </span>
                ))}
              </h1>
              <div style={{ height:3, width:60, background:YELLOW, marginBottom:24 }} />
              <p className="m" style={{ fontWeight:400, fontSize:16, lineHeight:1.75, color:"rgba(255,255,255,0.5)", maxWidth:480, marginBottom:36 }}>
                {d.about}
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <a href={`mailto:${d.contact.email}`} className="m"
                  style={{ fontWeight:700, fontSize:14, background:YELLOW, color:BLACK, padding:"13px 32px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, transition:"opacity 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                  <Mail size={15}/>{d.contactBtn}
                </a>
                <a href={`https://github.com/${d.contact.github}`} target="_blank" rel="noreferrer" className="m"
                  style={{ fontWeight:700, fontSize:14, background:"transparent", color:WHITE, padding:"13px 28px", textDecoration:"none", border:`1px solid rgba(255,255,255,0.2)`, display:"inline-flex", alignItems:"center", gap:8, transition:"border-color 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=WHITE}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"}>
                  <Github size={15}/>GitHub
                </a>
              </div>
              <div className="m" style={{ display:"flex", gap:24, marginTop:28, flexWrap:"wrap" }}>
                {[
                  { icon:<Phone size={13}/>, v:d.contact.phone },
                  { icon:<MapPin size={13}/>, v:d.contact.location },
                ].map((c,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:7, fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.35)" }}>
                    {c.icon}{c.v}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div className="hero-photo" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.7, delay:0.2 }}
            style={{ position:"relative" }}>
            <div style={{ position:"absolute", bottom:-3, left:-3, right:3, top:3, border:`3px solid ${YELLOW}`, zIndex:0 }} />
            <div style={{ position:"relative", zIndex:1, overflow:"hidden", background:"#1A1A1A" }}>
              <img src="images/bl-steven.png" alt="Hun Phanuth"
                style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", objectPosition:"center top", display:"block", filter:"contrast(1.05) brightness(0.92)" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:120, background:`linear-gradient(transparent, ${BLACK})` }} />
            </div>
            <div className="m" style={{ position:"absolute", bottom:16, left:16, zIndex:2 }}>
              <div style={{ background:YELLOW, padding:"6px 14px", display:"inline-block" }}>
                <span style={{ fontWeight:800, fontSize:11, color:BLACK, letterSpacing:"0.12em", textTransform:"uppercase" }}>
                  Available for Work
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background:YELLOW }}>
        <div className="stat-grid" style={{ maxWidth:1100, margin:"0 auto", padding:"0 48px", display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          {STATS.map((s,i)=>(
            <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
              style={{ textAlign:"center", padding:"24px 16px", borderRight:i<STATS.length-1?"1px solid rgba(0,0,0,0.12)":"none" }}>
              <div className="m" style={{ fontWeight:900, fontSize:"clamp(28px,3.5vw,44px)", color:BLACK, lineHeight:1, letterSpacing:"-0.02em" }}>{s.val}</div>
              <div className="m" style={{ fontWeight:600, fontSize:11, color:"rgba(0,0,0,0.5)", letterSpacing:"0.14em", marginTop:5, textTransform:"uppercase" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="work" style={{ background:WHITE, padding:"88px 48px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SecLabel>{d.workTitle}</SecLabel>
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:16, marginBottom:40, flexWrap:"wrap" }}>
            <h2 className="m" style={{ fontWeight:900, fontSize:"clamp(28px,4vw,44px)", letterSpacing:"-0.02em", color:BLACK }}>{d.workSub}</h2>
            <a href={`https://github.com/${d.contact.github}`} target="_blank" rel="noreferrer" className="m"
              style={{ fontSize:13, fontWeight:700, color:BLACK, textDecoration:"none", display:"flex", alignItems:"center", gap:4, letterSpacing:"0.04em", borderBottom:`2px solid ${YELLOW}`, paddingBottom:2 }}>
              GitHub <ArrowUpRight size={14}/>
            </a>
          </div>

          <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
            {projects.map((p,i)=>(
              <motion.a key={p.id} href={p.link||"#"} target="_blank" rel="noreferrer"
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ textDecoration:"none", display:"flex", flexDirection:"column", background:GREY, padding:"32px 28px", transition:"background 0.2s", borderTop:`3px solid transparent` }}
                onMouseEnter={e=>{ e.currentTarget.style.background=BLACK; e.currentTarget.style.borderTopColor=YELLOW; e.currentTarget.querySelector(".proj-name").style.color=WHITE; e.currentTarget.querySelector(".proj-desc").style.color="rgba(255,255,255,0.45)"; e.currentTarget.querySelector(".proj-link").style.color=YELLOW; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=GREY; e.currentTarget.style.borderTopColor="transparent"; e.currentTarget.querySelector(".proj-name").style.color=BLACK; e.currentTarget.querySelector(".proj-desc").style.color=BODY; e.currentTarget.querySelector(".proj-link").style.color=BLACK; }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                  <span className="m" style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:YELLOW, background:BLACK, padding:"3px 10px" }}>
                    {p.tag}
                  </span>
                  <span className="m" style={{ fontSize:12, fontWeight:500, color:SUB }}>{p.year}</span>
                </div>
                <h3 className="m proj-name" style={{ fontWeight:900, fontSize:22, letterSpacing:"-0.01em", color:BLACK, marginBottom:12, lineHeight:1.1, transition:"color 0.2s" }}>
                  {p.title||p.name}
                </h3>
                <p className="m proj-desc" style={{ fontSize:13, lineHeight:1.7, color:BODY, flex:1, transition:"color 0.2s" }}>
                  {p.description||p.desc}
                </p>
                <div className="m proj-link" style={{ marginTop:20, fontSize:12, fontWeight:700, letterSpacing:"0.08em", color:BLACK, display:"flex", alignItems:"center", gap:4, transition:"color 0.2s" }}>
                  VIEW PROJECT <ArrowUpRight size={12}/>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Experience */}
          <div style={{ marginTop:72 }}>
            <SecLabel>{d.expTitle}</SecLabel>
            <h2 className="m" style={{ fontWeight:900, fontSize:"clamp(24px,3.5vw,36px)", letterSpacing:"-0.02em", color:BLACK, marginBottom:32 }}>{d.expSub}</h2>
            {d.exp.map((exp,i)=>(
              <motion.div key={i} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ display:"grid", gridTemplateColumns:"180px 1fr", gap:"0 40px", paddingBottom:32, marginBottom:32, borderBottom:`1px solid ${MGREY}` }}>
                <div style={{ paddingTop:3 }}>
                  <div className="m" style={{ fontSize:12, fontWeight:600, color:SUB, marginBottom:6 }}>{exp.period}</div>
                  <div className="m" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:YELLOW, background:BLACK, padding:"2px 8px", display:"inline-block" }}>
                    {exp.org.split("·")[0].trim()}
                  </div>
                </div>
                <div>
                  <div className="m" style={{ fontWeight:800, fontSize:18, color:BLACK, marginBottom:12, letterSpacing:"-0.01em" }}>{exp.title}</div>
                  <ul style={{ listStyle:"none", paddingLeft:0, display:"flex", flexDirection:"column", gap:7 }}>
                    {exp.points.map((pt,pi)=>(
                      <li key={pi} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                        <div style={{ width:6, height:6, background:YELLOW, flexShrink:0, marginTop:6 }} />
                        <span className="m" style={{ fontSize:14, color:BODY, lineHeight:1.65 }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EDUCATION ══ */}
      <section style={{ background:BLACK, padding:"88px 48px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SecLabel>{d.eduTitle}</SecLabel>
          <div className="edu-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, marginTop:32 }}>
            {education.map((edu,i)=>(
              <motion.div key={edu.id} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ background:OFFBLK, padding:"32px 28px", borderTop:`3px solid ${i===0?YELLOW:"rgba(255,255,255,0.08)"}`, transition:"border-top-color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderTopColor=YELLOW}
                onMouseLeave={e=>e.currentTarget.style.borderTopColor=i===0?YELLOW:"rgba(255,255,255,0.08)"}>
                <div className="m" style={{ fontWeight:800, fontSize:17, color:WHITE, marginBottom:6, lineHeight:1.3 }}>{edu.degree}</div>
                <div className="m" style={{ fontWeight:600, fontSize:13, color:YELLOW, marginBottom:6 }}>{edu.university}</div>
                <div className="m" style={{ fontSize:12, fontWeight:500, color:"rgba(255,255,255,0.35)" }}>{edu.period||`${edu.startDate} – ${edu.endDate}`}</div>
              </motion.div>
            ))}
          </div>

          {/* Awards */}
          <div style={{ marginTop:56 }}>
            <SecLabel>{d.awardsTitle}</SecLabel>
            <div style={{ marginTop:24, display:"flex", flexDirection:"column" }}>
              {d.awards.map((ach,i)=>(
                <motion.div key={i} initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                  style={{ display:"flex", gap:24, alignItems:"baseline", padding:"20px 0", borderBottom:"1px solid rgba(255,255,255,0.07)", flexWrap:"wrap" }}>
                  <span className="m" style={{ fontWeight:800, fontSize:12, color:YELLOW, background:"rgba(253,217,0,0.1)", padding:"3px 10px", flexShrink:0, letterSpacing:"0.08em" }}>{ach.date}</span>
                  <div style={{ flex:1 }}>
                    <div className="m" style={{ fontWeight:700, fontSize:15, color:WHITE, marginBottom:3 }}>{ach.title}</div>
                    <div className="m" style={{ fontSize:12, color:"rgba(255,255,255,0.35)", fontWeight:500 }}>{ach.org}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ background:WHITE, padding:"88px 48px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SecLabel>{d.skillsTitle}</SecLabel>
          <div className="skill-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2, marginTop:32 }}>
            {skills.map((sk,i)=>(
              <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.03 }}
                style={{ padding:"18px 20px", background:GREY, borderBottom:`2px solid transparent`, transition:"all 0.15s", cursor:"default" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=BLACK; e.currentTarget.style.borderBottomColor=YELLOW; e.currentTarget.querySelector(".sk-name").style.color=WHITE; e.currentTarget.querySelector(".sk-cat").style.color=YELLOW; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=GREY; e.currentTarget.style.borderBottomColor="transparent"; e.currentTarget.querySelector(".sk-name").style.color=BLACK; e.currentTarget.querySelector(".sk-cat").style.color=SUB; }}>
                <div className="m sk-name" style={{ fontWeight:700, fontSize:13, color:BLACK, marginBottom:3, transition:"color 0.15s" }}>{sk.name}</div>
                <div className="m sk-cat" style={{ fontWeight:500, fontSize:11, color:SUB, letterSpacing:"0.06em", textTransform:"uppercase", transition:"color 0.15s" }}>{sk.cat}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ background:YELLOW, padding:"88px 48px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px 96px", alignItems:"center" }}>
            <div>
              <h2 className="m" style={{ fontWeight:900, fontSize:"clamp(40px,6vw,80px)", letterSpacing:"-0.03em", lineHeight:0.92, color:BLACK, marginBottom:20, whiteSpace:"pre-line" }}>
                {d.contactTitle}
              </h2>
              <p className="m" style={{ fontSize:16, fontWeight:500, color:"rgba(0,0,0,0.55)", marginBottom:32, lineHeight:1.7 }}>
                {d.contactSub}
              </p>
              <a href={`mailto:${d.contact.email}`} className="m"
                style={{ fontWeight:800, fontSize:14, background:BLACK, color:YELLOW, padding:"14px 36px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, letterSpacing:"0.04em", transition:"opacity 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <Mail size={15}/>{d.contactBtn}
              </a>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {[
                { icon:<Mail size={15}/>, v:d.contact.email, href:`mailto:${d.contact.email}` },
                { icon:<Phone size={15}/>, v:d.contact.phone },
                { icon:<Github size={15}/>, v:`github.com/${d.contact.github}`, href:`https://github.com/${d.contact.github}` },
                { icon:<Linkedin size={15}/>, v:"linkedin.com/in/Hun-Phanuth", href:"#" },
                { icon:<MapPin size={15}/>, v:d.contact.location },
              ].map((c,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 0", borderBottom:"1px solid rgba(0,0,0,0.12)" }}>
                  <div style={{ width:38, height:38, background:BLACK, display:"flex", alignItems:"center", justifyContent:"center", color:YELLOW, flexShrink:0 }}>
                    {c.icon}
                  </div>
                  {c.href ? (
                    <a href={c.href} className="m" style={{ fontSize:14, fontWeight:600, color:BLACK, textDecoration:"none", transition:"opacity 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.opacity="0.6"}
                      onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      {c.v}
                    </a>
                  ) : (
                    <span className="m" style={{ fontSize:14, fontWeight:600, color:"rgba(0,0,0,0.5)" }}>{c.v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:BLACK, borderTop:`3px solid ${YELLOW}`, padding:"20px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <LogoMark size={38} />
        <span className="m" style={{ fontSize:12, fontWeight:500, color:"rgba(255,255,255,0.25)", letterSpacing:"0.08em" }}>
          © {new Date().getFullYear()} HUN PHANUTH · PHNOM PENH, CAMBODIA
        </span>
      </footer>
    </div>
  );
}
