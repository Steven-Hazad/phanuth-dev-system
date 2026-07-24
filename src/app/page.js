"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight, ChevronRight } from "lucide-react";

// ============================================================
// MESSI.COM LIGHT — White, clean, structured.
// White bg · sky-blue accent · outlined name behind photo
// Nav: centred logo, links either side
// Sections: hero · stats strip · about · projects · skills · contact
// Font: Oswald (condensed display) + Source Sans 3 (body)
// Signature: "HUN PHANUTH" in huge outlined ghost text behind photo
// ============================================================

const BLUE   = "#ff0000";
const LBLUE  = "#E8F4FC";
const INK    = "#111111";
const SUB    = "#555555";
const LGREY  = "#F4F6F8";
const MGREY  = "#E2E6EA";
const WHITE  = "#FFFFFF";

const STATS = [
  { value:"3+",     label:"YEARS BUILDING" },
  { value:"10+",    label:"PROJECTS SHIPPED" },
  { value:"1.04M+", label:"DATA ROWS PROCESSED" },
  { value:"3",      label:"CERTIFICATIONS" },
  { value:"2",      label:"DEGREES PURSUING" },
];

const DEFAULT_PROJECTS = [
  { id:1, name:"SROVCHLART", tag:"AGRITECH · MOBILE", description:"Rice marketplace for Cambodian farmers. React Native + TypeScript with live pricing and farmer-direct sales.", link:"#" },
  { id:2, name:"SAFEHIRE", tag:"TRUST & SAFETY · APP", description:"Anti-scam job verification platform protecting Cambodian workers. React Native Expo.", link:"#" },
  { id:3, name:"KOURSROV", tag:"AGRITECH · PLATFORM", description:"Full AgriTech pitch platform for Cambodia's rice industry — market data, supply chain, farmer onboarding.", link:"#" },
];
const DEFAULT_SKILLS = [
  "React / Next.js","Node.js","PostgreSQL","Python","React Native",
  "TypeScript","Supabase","REST APIs","Tailwind CSS","Expo",
  "Hadoop HDFS","PySpark","Spark SQL","Apache Hive","Data Analysis",
];
const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"National Institute of Civil Aviation (NICA)", period:"2022 – Present" },
  { id:2, degree:"Bachelor of Computer Science", university:"Cambodian University for Specialties (CUS)", period:"2022 – Present" },
];

const T = {
  en: {
    logoLine1:"HUN",
    logoLine2:"PHANUTH",
    ghostName:"HUN PHANUTH",
    heroSub:"Full-Stack Developer · Computer Science · Air Traffic Management",
    heroDesc:"Building production software and studying airspace — based in Phnom Penh, Cambodia.",
    aboutTitle:"ABOUT",
    aboutText1:"I'm a full-stack developer and Air Traffic Management student at the National Institute of Civil Aviation (NICA) in Phnom Penh. I build end-to-end digital products — POS systems, e-commerce platforms, agritech applications — and I'm working toward a career that bridges software engineering and aviation.",
    aboutText2:"My background in two demanding fields means I understand what it means to build things that have to work. Both aviation and software engineering come down to the same standard: precision, reliability, and getting it right the first time.",
    projectsTitle:"PROJECTS",
    projectsSub:"Selected work — full portfolio on GitHub",
    skillsTitle:"TECH STACK",
    eduTitle:"EDUCATION",
    awardsTitle:"AWARDS & CERTIFICATIONS",
    awards:[
      { date:"JUN 2026", title:"3RD PLACE — UNIPRENEURCAMP CLUSTER 1", org:"Khmer Enterprise · Team \"Safework\"", desc:"Secured 3rd place at UniPreneurCamp Cluster 1 organised by Khmer Enterprise. June 12–14, 2026." },
      { date:"DEC 2025", title:"BIG DATA COURSE CERTIFICATION", org:"Professional Training Programme", desc:"Capstone processed 1.04M+ rows using Hadoop HDFS, PySpark, Spark SQL, Apache Hive, and Parquet." },
      { date:"DEC 2024", title:"PYTHON PROGRAMMING CERTIFICATION", org:"Samsung Innovation Campus × RUPP", desc:"Completed Feb–Dec 2024. Certified by the Vice Director of the Royal University of Phnom Penh." },
    ],
    expTitle:"EXPERIENCE",
    exp:[
      { period:"Dec 2025 – Present", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh", desc:"End-to-end POS systems and e-commerce platforms for Cambodian businesses. Backend architecture, database design, API routing, and responsive client-facing storefronts." },
      { period:"Jan 2013 – Jan 2019", title:"Operations Assistant", org:"HHH Printer · Takeo", desc:"Managed daily print operations, digital design, and direct client service at a family business." },
    ],
    contactTitle:"CONTACT",
    contactSub:"OPEN TO OPPORTUNITIES AND COLLABORATION",
    contactBtn:"GET IN TOUCH",
    contact:{ email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    nav:["PROJECTS","SKILLS","CONTACT"],
    navIds:["projects","skills","contact"],
    toggle:"KH",
  },
  kh: {
    logoLine1:"ហ៊ុន",
    logoLine2:"ផានុត",
    ghostName:"ហ៊ុន ផានុត",
    heroSub:"អ្នកអភិវឌ្ឍន៍ Full-Stack · CS · គ្រប់គ្រងចរាចរណ៍អាកាស",
    heroDesc:"បង្កើតកម្មវិធី និងសិក្សាចរាចរណ៍អាកាស — ភ្នំពេញ, កម្ពុជា។",
    aboutTitle:"អំពីខ្ញុំ",
    aboutText1:"ខ្ញុំជាអ្នកអភិវឌ្ឍន៍ full-stack និងនិស្សិតគ្រប់គ្រងចរាចរណ៍អាកាសនៅ NICA ភ្នំពេញ។ ខ្ញុំបង្កើតផលិតផលឌីជីថលពីដើមដល់ចប់ — POS, e-commerce, AgriTech — ហើយកំពុងឆ្ពោះទៅអាជីពភ្ជាប់ CS និង aviation។",
    aboutText2:"ការទទួលបានផ្ទៃខាងក្រោយក្នុងវិស័យពីរដែលតម្រូវការភាពត្រឹមត្រូវ ធ្វើឱ្យខ្ញុំយល់ពីអ្វីដែលន័យ «ត្រឹមត្រូវ» ពិតប្រាកដ។",
    projectsTitle:"គម្រោង",
    projectsSub:"ការងារដែលបានជ្រើស",
    skillsTitle:"ជំនាញ",
    eduTitle:"ការសិក្សា",
    awardsTitle:"សមិទ្ធផល",
    awards:[
      { date:"មិថុនា 2026", title:"លេខ ៣ — UNIPRENEURCAMP CLUSTER 1", org:"Khmer Enterprise", desc:"UniPreneurCamp Cluster 1 — June 12–14, 2026." },
      { date:"ធ្នូ 2025", title:"វិញ្ញាបនបត្រ BIG DATA", org:"ការបណ្តុះបណ្តាលវិជ្ជាជីវៈ", desc:"Hadoop, PySpark, Spark SQL, Hive, Parquet — 1.04M+ rows." },
      { date:"ធ្នូ 2024", title:"វិញ្ញាបនបត្រ PYTHON", org:"Samsung Innovation Campus × RUPP", desc:"Feb–Dec 2024. RUPP." },
    ],
    expTitle:"បទពិសោធន៍",
    exp:[
      { period:"ធ្នូ 2025 – បច្ចុប្បន្ន", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ", desc:"ប្រព័ន្ធ POS និង e-commerce ពីដើមដល់ចប់ — backend, DB, API, storefront។" },
      { period:"មករា 2013 – មករា 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ", desc:"ប្រតិបត្តិការការបោះពុម្ព, រចនាក្រាហ្វិក, សេវាកម្មអតិថិជន។" },
    ],
    contactTitle:"ទំនាក់ទំនង",
    contactSub:"បើកចំហសម្រាប់ឱកាស",
    contactBtn:"ទំនាក់ទំនង",
    contact:{ email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    nav:["គម្រោង","ជំនាញ","ទំនាក់ទំនង"],
    navIds:["projects","skills","contact"],
    toggle:"EN",
  },
};

// Section heading — matches messi.com's all-caps bold section labels
function SecHead({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
      <div style={{ width:4, height:28, background:BLUE, flexShrink:0 }} />
      <h2 style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:"clamp(22px,3vw,32px)", letterSpacing:"0.06em", color:INK, textTransform:"uppercase" }}>
        {children}
      </h2>
    </div>
  );
}

// Project card — news-style like messi.com news cards
function ProjectCard({ project, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={project.link||"#"} target="_blank" rel="noreferrer"
      initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:index*0.08 }}
      style={{ textDecoration:"none", display:"flex", flexDirection:"column", background:WHITE, border:`1px solid ${MGREY}`, transition:"box-shadow 0.2s, transform 0.2s", boxShadow: hov ? "0 8px 32px rgba(0,133,195,0.12)" : "0 2px 8px rgba(0,0,0,0.06)", transform: hov ? "translateY(-4px)" : "translateY(0)" }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {/* Card image area — coloured top */}
      <div style={{ height:180, background: hov ? BLUE : LGREY, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", transition:"background 0.25s", position:"relative" }}>
        <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:72, color: hov ? "rgba(255,255,255,0.15)" : "rgba(0,133,195,0.1)", letterSpacing:"0.04em", transition:"color 0.25s" }}>
          {String(index+1).padStart(2,"0")}
        </span>
        {/* Tag badge */}
        <div style={{ position:"absolute", top:12, left:12, background: hov ? WHITE : BLUE, color: hov ? BLUE : WHITE, fontFamily:"'Oswald',sans-serif", fontSize:10, fontWeight:600, letterSpacing:"0.15em", padding:"3px 10px", transition:"all 0.2s" }}>
          {project.tag || "PROJECT"}
        </div>
      </div>
      {/* Card body */}
      <div style={{ padding:"18px 18px 22px", flex:1, display:"flex", flexDirection:"column" }}>
        <h3 style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:18, letterSpacing:"0.05em", color:INK, marginBottom:8, lineHeight:1.2, textTransform:"uppercase" }}>
          {project.name}
        </h3>
        <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:14, lineHeight:1.65, color:SUB, flex:1, margin:0 }}>
          {project.description}
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:14, fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:12, letterSpacing:"0.1em", color:BLUE, textTransform:"uppercase" }}>
          VIEW PROJECT <ArrowUpRight size={13}/>
        </div>
      </div>
    </motion.a>
  );
}

export default function MessiLight() {
  const [lang, setLang] = useState("en");
  const [apiProjects, setApiProjects] = useState([]);
  const [apiSkills, setApiSkills] = useState([]);
  const [apiEdu, setApiEdu] = useState([]);

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
  const projects  = apiProjects.length > 0 ? apiProjects.map((p,i)=>({...p,tag:DEFAULT_PROJECTS[i]?.tag||"PROJECT"})) : DEFAULT_PROJECTS;
  const skillList = apiSkills.length > 0 ? apiSkills.map(s=>s.name) : DEFAULT_SKILLS;
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;

  return (
    <div className={lang==="kh"?"font-khmer":""} style={{ minHeight:"100vh", background:WHITE, color:INK }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;600&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${WHITE}; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        @media(max-width:640px){
          .ghost-name { font-size:18vw!important; }
          .proj-grid { grid-template-columns:1fr!important; }
          .skill-grid { grid-template-columns:repeat(2,1fr)!important; }
          .nav-links { display:none!important; }
          .stats-strip { grid-template-columns:repeat(3,1fr)!important; }
          .two-col { grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* ══ NAV — centred logo, links either side ══ */}
      <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(8px)", borderBottom:`1px solid ${MGREY}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Left nav */}
          <nav className="nav-links" style={{ display:"flex", gap:28 }}>
            {d.nav.slice(0,2).map((label,i)=>(
              <a key={i} href={`#${d.navIds[i]}`} style={{ fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:13, letterSpacing:"0.12em", color:SUB, textDecoration:"none", transition:"color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.color=BLUE} onMouseLeave={e=>e.currentTarget.style.color=SUB}>
                {label}
              </a>
            ))}
          </nav>

          {/* Centred logo */}
          <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:20, letterSpacing:"0.1em", color:INK, textAlign:"center" }}>
            {d.logoLine1} {d.logoLine2}
          </div>

          {/* Right nav */}
          <div className="nav-links" style={{ display:"flex", gap:28, alignItems:"center" }}>
            {d.nav.slice(2).map((label,i)=>(
              <a key={i} href={`#${d.navIds[i+2]}`} style={{ fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:13, letterSpacing:"0.12em", color:SUB, textDecoration:"none", transition:"color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.color=BLUE} onMouseLeave={e=>e.currentTarget.style.color=SUB}>
                {label}
              </a>
            ))}
            <button onClick={()=>setLang(l=>l==="en"?"kh":"en")} style={{
              fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:12, letterSpacing:"0.12em",
              background:BLUE, border:"none", color:WHITE, padding:"5px 14px", cursor:"pointer",
            }}>{d.toggle}</button>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section style={{ position:"relative", minHeight:"92vh", background:WHITE, display:"flex", alignItems:"flex-end", overflow:"hidden" }}>

        {/* Ghost name — outlined behind photo */}
        <div className="ghost-name" style={{
          position:"absolute", inset:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          zIndex:1, overflow:"hidden", userSelect:"none", pointerEvents:"none",
        }}>
          <span style={{
            fontFamily:"'Oswald',sans-serif", fontWeight:700,
            fontSize:"clamp(100px,18vw,280px)",
            lineHeight:0.9, letterSpacing:"0.04em",
            color:"transparent",
            WebkitTextStroke:`2px ${MGREY}`,
            whiteSpace:"nowrap",
          }}>
            {d.ghostName}
          </span>
        </div>

        {/* Photo — centre */}
        <div style={{ position:"absolute", inset:0, zIndex:2, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <img src="images/Phanuth.png" alt="Hun Phanuth" style={{ height:"88vh", width:"auto", objectFit:"cover", objectPosition:"center top", display:"block" }} />
        </div>

        {/* Left info panel */}
        <motion.div initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.2 }}
          style={{ position:"relative", zIndex:3, padding:"0 0 64px 48px", maxWidth:320 }}>
          <div style={{ background:"rgba(255,255,255,0.95)", padding:"24px 24px", border:`1px solid ${MGREY}`, boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:"clamp(28px,4vw,44px)", lineHeight:1, letterSpacing:"0.04em", color:INK, marginBottom:8, textTransform:"uppercase" }}>
              {d.logoLine1}<br/><span style={{ color:BLUE }}>{d.logoLine2}</span>
            </div>
            <div style={{ height:3, width:48, background:BLUE, margin:"12px 0 14px" }} />
            <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, color:SUB, lineHeight:1.6, marginBottom:16 }}>{d.heroDesc}</p>
            <a href={`mailto:${d.contact.email}`} style={{
              display:"inline-flex", alignItems:"center", gap:6,
              fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase",
              background:BLUE, color:WHITE, padding:"10px 20px", textDecoration:"none",
            }}>{d.contactBtn} <ChevronRight size={14}/></a>
          </div>
        </motion.div>

        {/* Right sub-role */}
        <motion.div initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.3 }}
          style={{ position:"absolute", right:48, bottom:64, zIndex:3 }}>
          <div style={{ writingMode:"vertical-rl", textOrientation:"mixed", transform:"rotate(180deg)", fontFamily:"'Oswald',sans-serif", fontWeight:500, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:SUB }}>
            {d.heroSub}
          </div>
        </motion.div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <div className="stats-strip" style={{ background:BLUE, display:"grid", gridTemplateColumns:`repeat(${STATS.length},1fr)` }}>
        {STATS.map((s,i)=>(
          <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
            style={{ textAlign:"center", padding:"28px 16px", borderRight: i<STATS.length-1 ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:"clamp(28px,3vw,44px)", color:WHITE, letterSpacing:"0.04em", lineHeight:1 }}>{s.value}</div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:500, fontSize:10, color:"rgba(255,255,255,0.7)", letterSpacing:"0.18em", marginTop:6, textTransform:"uppercase" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ══ ABOUT ══ */}
      <section style={{ background:WHITE, padding:"80px 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px 64px", alignItems:"start" }}>
            <div>
              <SecHead>{d.aboutTitle}</SecHead>
              <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:16, lineHeight:1.8, color:SUB, marginBottom:20 }}>{d.aboutText1}</p>
              <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:16, lineHeight:1.8, color:SUB }}>{d.aboutText2}</p>
            </div>
            {/* Experience */}
            <div>
              <SecHead>{d.expTitle}</SecHead>
              {d.exp.map((exp,i)=>(
                <div key={i} style={{ marginBottom:24, paddingBottom:24, borderBottom: i<d.exp.length-1 ? `1px solid ${MGREY}` : "none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:12, flexWrap:"wrap", marginBottom:4 }}>
                    <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:17, color:INK }}>{exp.title}</span>
                    <span style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:12, color:SUB }}>{exp.period}</span>
                  </div>
                  <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:500, color:BLUE, letterSpacing:"0.06em", marginBottom:8 }}>{exp.org}</div>
                  <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:14, color:SUB, lineHeight:1.65 }}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" style={{ background:LGREY, padding:"80px 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SecHead>{d.projectsTitle}</SecHead>
          <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:14, color:SUB, marginBottom:36, marginTop:-16 }}>{d.projectsSub}</p>
          <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {projects.map((p,i)=><ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ background:WHITE, padding:"80px 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SecHead>{d.skillsTitle}</SecHead>
          <div className="skill-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:2 }}>
            {skillList.map((sk,i)=>(
              <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.03 }}
                style={{ padding:"14px 16px", border:`1px solid ${MGREY}`, textAlign:"center", cursor:"default", transition:"all 0.15s", background:WHITE }}
                onMouseEnter={e=>{ e.currentTarget.style.background=BLUE; e.currentTarget.style.borderColor=BLUE; e.currentTarget.querySelector("span").style.color=WHITE; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=WHITE; e.currentTarget.style.borderColor=MGREY; e.currentTarget.querySelector("span").style.color=INK; }}>
                <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:500, fontSize:13, letterSpacing:"0.06em", color:INK, transition:"color 0.15s", textTransform:"uppercase" }}>{sk}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EDUCATION + AWARDS ══ */}
      <section style={{ background:LGREY, padding:"80px 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px 64px" }}>
            <div>
              <SecHead>{d.eduTitle}</SecHead>
              {education.map((edu,i)=>(
                <div key={edu.id} style={{ display:"flex", gap:16, marginBottom:24, paddingBottom:24, borderBottom: i<education.length-1 ? `1px solid ${MGREY}` : "none" }}>
                  <div style={{ width:4, height:"auto", background:BLUE, flexShrink:0, alignSelf:"stretch" }} />
                  <div>
                    <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:16, color:INK, marginBottom:4 }}>{edu.degree}</div>
                    <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, color:BLUE, fontWeight:600, marginBottom:3 }}>{edu.university}</div>
                    <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:12, color:SUB }}>{edu.period || `${edu.startDate} – ${edu.endDate}`}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <SecHead>{d.awardsTitle}</SecHead>
              {d.awards.map((ach,i)=>(
                <div key={i} style={{ marginBottom:24, paddingBottom:24, borderBottom: i<d.awards.length-1 ? `1px solid ${MGREY}` : "none" }}>
                  <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:11, fontWeight:600, color:BLUE, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>{ach.date}</div>
                  <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15, color:INK, marginBottom:3, lineHeight:1.2 }}>{ach.title}</div>
                  <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:12, color:SUB, marginBottom:6 }}>{ach.org}</div>
                  <p style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:13, color:SUB, lineHeight:1.6 }}>{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ background:INK, padding:"80px 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px 64px", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontWeight:500, fontSize:12, letterSpacing:"0.2em", color:BLUE, textTransform:"uppercase", marginBottom:12 }}>{d.contactSub}</div>
              <h2 style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:"clamp(36px,5vw,64px)", letterSpacing:"0.04em", color:WHITE, lineHeight:0.95, marginBottom:28, textTransform:"uppercase" }}>
                {d.contactTitle}
              </h2>
              <a href={`mailto:${d.contact.email}`} style={{
                display:"inline-flex", alignItems:"center", gap:8,
                fontFamily:"'Oswald',sans-serif", fontWeight:600, fontSize:14, letterSpacing:"0.12em", textTransform:"uppercase",
                background:BLUE, color:WHITE, padding:"14px 32px", textDecoration:"none",
                transition:"opacity 0.15s",
              }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                {d.contactBtn} <ChevronRight size={16}/>
              </a>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { icon:<Mail size={15}/>, v:d.contact.email, href:`mailto:${d.contact.email}` },
                { icon:<Phone size={15}/>, v:d.contact.phone, href:`tel:${d.contact.phone}` },
                { icon:<Github size={15}/>, v:`github.com/${d.contact.github}`, href:`https://github.com/${d.contact.github}` },
                { icon:<Linkedin size={15}/>, v:"linkedin.com/in/Hun-Phanuth", href:"#" },
                { icon:<MapPin size={15}/>, v:d.contact.location, href:null },
              ].map((c,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, paddingBottom:14, borderBottom:`1px solid #222` }}>
                  <span style={{ color:BLUE, flexShrink:0 }}>{c.icon}</span>
                  {c.href ? (
                    <a href={c.href} style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:14, color:"rgba(255,255,255,0.7)", textDecoration:"none", transition:"color 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.color=WHITE} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.7)"}>
                      {c.v}
                    </a>
                  ) : (
                    <span style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:14, color:"rgba(255,255,255,0.4)" }}>{c.v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0A0A0A", borderTop:"1px solid #1A1A1A", padding:"20px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <span style={{ fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:16, letterSpacing:"0.1em", color:WHITE }}>{d.logoLine1} <span style={{ color:BLUE }}>{d.logoLine2}</span></span>
        <span style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize:12, color:"#555", letterSpacing:"0.06em" }}>© {new Date().getFullYear()} · PHNOM PENH, CAMBODIA</span>
      </footer>
    </div>
  );
}