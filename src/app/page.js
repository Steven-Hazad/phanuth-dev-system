"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight, Star } from "lucide-react";

// ============================================================
// NJR STYLE — Yellow × Black × White. Bold, playful, energetic.
// Neymar's brand: #FDD900 yellow, #111 black, white accents
// Rounded cards, big photo hero, NJR-style logo mark
// Font: Montserrat (bold, rounded, Brazilian energy)
// Signature: yellow accent blocks, big bold numbers, fun grid
// ============================================================

const YELLOW  = "#FDD900";
const DYELLOW = "#E5C200";
const BLACK   = "#111111";
const WHITE   = "#FFFFFF";
const OFFBLK  = "#1A1A1A";
const GREY    = "#F5F5F5";
const MGREY   = "#E0E0E0";
const BODY    = "#444444";

const DEFAULT_PROJECTS = [
  { id:1, name:"SrovChlart", tag:"AgriTech · Mobile", year:"2024", desc:"Rice marketplace for Cambodian farmers — React Native + TypeScript with live pricing and farmer-direct sales.", emoji:"🌾" },
  { id:2, name:"SafeHire", tag:"Safety · App", year:"2024", desc:"Anti-scam job verification platform protecting Cambodian workers from fraudulent employers.", emoji:"🛡️" },
  { id:3, name:"KourSrov", tag:"AgriTech · Platform", year:"2023", desc:"AgriTech pitch platform for Cambodia's rice industry — market data, supply chain, farmer onboarding.", emoji:"🚜" },
];
const DEFAULT_SKILLS = [
  { name:"React / Next.js", cat:"Frontend" },
  { name:"Node.js", cat:"Backend" },
  { name:"PostgreSQL", cat:"Database" },
  { name:"Python", cat:"Data" },
  { name:"React Native", cat:"Mobile" },
  { name:"TypeScript", cat:"Language" },
  { name:"Tailwind CSS", cat:"Styling" },
  { name:"Supabase", cat:"Backend" },
  { name:"PySpark", cat:"Big Data" },
  { name:"Spark SQL", cat:"Big Data" },
  { name:"Hadoop", cat:"Big Data" },
  { name:"Aviation Safety", cat:"Aviation" },
  { name:"Air Traffic Mgmt", cat:"Aviation" },
  { name:"Expo", cat:"Mobile" },
];
const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"National Institute of Civil Aviation (NICA)", period:"2022 – Present", icon:"✈️" },
  { id:2, degree:"Bachelor of Computer Science", university:"Cambodian University for Specialties (CUS)", period:"2022 – Present", icon:"💻" },
];

const STATS = [
  { val:"10+", label:"Projects Shipped" },
  { val:"3+", label:"Years Building" },
  { val:"1M+", label:"Data Rows Processed" },
  { val:"3", label:"Certifications" },
];

const T = {
  en: {
    logo1:"HP", logo2:"7",
    heroTag:"Full-Stack Developer · ATM Student",
    heroName:"HUN PHANUTH",
    heroSub:"Building software. Studying airspace. Based in Phnom Penh.",
    heroCta:"Get in touch",
    aboutTitle:"Who am I?",
    aboutText:"I'm a full-stack developer and Air Traffic Management student at NICA. I build real, production software — POS systems, e-commerce platforms, agritech apps — while cross-training in aviation. Two fields, one standard: it has to work.",
    statsTitle:"BY THE NUMBERS",
    workTitle:"MY PROJECTS",
    workSub:"Selected work",
    expTitle:"EXPERIENCE",
    eduTitle:"EDUCATION",
    skillsTitle:"TECH STACK",
    awardsTitle:"RECOGNITION",
    contactTitle:"LET'S WORK\nTOGETHER",
    contactSub:"Open to freelance projects and the right full-time role.",
    contactBtn:"Send a message",
    awards:[
      { year:"2026", title:"3rd Place — UniPreneurCamp Cluster 1", org:"Khmer Enterprise · Team Safework" },
      { year:"2025", title:"Big Data Certification", org:"Hadoop · PySpark · Spark SQL · Hive · Parquet" },
      { year:"2024", title:"Python Programming Certification", org:"Samsung Innovation Campus × RUPP" },
    ],
    exp:[
      { period:"Dec 2025 – Present", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh",
        desc:"End-to-end POS systems and e-commerce platforms for Cambodian businesses. Architecture, database design, API, and storefront." },
      { period:"Jan 2013 – Jan 2019", title:"Operations Assistant", org:"HHH Printer · Takeo",
        desc:"Print operations, digital design, and direct client service at a family business." },
    ],
    contact:{ email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    toggle:"KH",
    nav:["Projects","Skills","Contact"],
    navIds:["work","skills","contact"],
  },
  kh: {
    logo1:"HP", logo2:"7",
    heroTag:"អ្នកអភិវឌ្ឍន៍ Full-Stack · និស្សិត ATM",
    heroName:"ហ៊ុន ផានុត",
    heroSub:"បង្កើតកម្មវិធី។ សិក្សាចរាចរណ៍អាកាស។ ភ្នំពេញ។",
    heroCta:"ទំនាក់ទំនង",
    aboutTitle:"ខ្ញុំជានរណា?",
    aboutText:"ខ្ញុំជាអ្នកអភិវឌ្ឍន៍ full-stack និងនិស្សិត ATM នៅ NICA។ ខ្ញុំបង្កើតកម្មវិធី POS, e-commerce, AgriTech — ខណៈបណ្តុះបណ្តាលខ្លួននៅ aviation។ ជំនាញពីរ, ស្តង់ដារតែមួយ: វាត្រូវតែដំណើរការ។",
    statsTitle:"តួលេខ",
    workTitle:"គម្រោងរបស់ខ្ញុំ",
    workSub:"ការងារដែលបានជ្រើស",
    expTitle:"បទពិសោធន៍",
    eduTitle:"ការសិក្សា",
    skillsTitle:"ជំនាញ",
    awardsTitle:"សមិទ្ធផល",
    contactTitle:"តោះ\nធ្វើការជាមួយគ្នា",
    contactSub:"បើកចំហសម្រាប់គម្រោង freelance និងការងារត្រឹមត្រូវ។",
    contactBtn:"ផ្ញើសារ",
    awards:[
      { year:"2026", title:"លេខ ៣ — UniPreneurCamp Cluster 1", org:"Khmer Enterprise · ក្រុម Safework" },
      { year:"2025", title:"វិញ្ញាបនបត្រ Big Data", org:"Hadoop · PySpark · Spark SQL" },
      { year:"2024", title:"វិញ្ញាបនបត្រ Python", org:"Samsung Innovation Campus × RUPP" },
    ],
    exp:[
      { period:"ធ្នូ 2025 – Now", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ",
        desc:"ប្រព័ន្ធ POS + e-commerce ពីដើមដល់ចប់ — backend, DB, API, storefront។" },
      { period:"មករា 2013 – 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ",
        desc:"ប្រតិបត្តិការការបោះពុម្ព, រចនាក្រាហ្វិក, សេវាកម្មអតិថិជន។" },
    ],
    contact:{ email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    toggle:"EN",
    nav:["គម្រោង","ជំនាញ","ទំនាក់ទំនង"],
    navIds:["work","skills","contact"],
  },
};

// NJR-style logo mark
function LogoMark({ size=40 }) {
  return (
    <div style={{ width:size, height:size, background:YELLOW, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", borderRadius:8 }}>
      <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900, fontSize:size*0.38, lineHeight:1, color:BLACK, letterSpacing:"-0.02em" }}>HP</span>
      <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900, fontSize:size*0.25, lineHeight:1, color:BLACK }}>7</span>
    </div>
  );
}

export default function NJRStyle() {
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
  const projects  = apiProjects.length > 0 ? apiProjects.map((p,i)=>({...p, emoji:DEFAULT_PROJECTS[i]?.emoji||"⚡", tag:DEFAULT_PROJECTS[i]?.tag||"Project"})) : DEFAULT_PROJECTS;
  const skills    = apiSkills.length > 0 ? apiSkills.map(s=>({name:s.name,cat:"Tech"})) : DEFAULT_SKILLS;
  const education = apiEdu.length > 0 ? apiEdu.map((e,i)=>({...e,icon:DEFAULT_EDU[i]?.icon||"🎓"})) : DEFAULT_EDU;

  return (
    <div className={lang==="kh"?"font-khmer":""} style={{ minHeight:"100vh", background:WHITE, color:BLACK, overflowX:"hidden" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${WHITE}; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        .mont { font-family:'Montserrat',sans-serif; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#f0f0f0; }
        ::-webkit-scrollbar-thumb { background:${YELLOW}; border-radius:99px; }
        @media(max-width:640px){
          .hero-inner { flex-direction:column!important; }
          .hero-photo { width:100%!important; max-width:320px!important; margin:0 auto!important; }
          .proj-grid { grid-template-columns:1fr!important; }
          .stats-grid { grid-template-columns:repeat(2,1fr)!important; }
          .skill-grid { grid-template-columns:repeat(2,1fr)!important; }
          .nav-links { display:none!important; }
          .edu-grid { grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:"sticky", top:0, zIndex:100,
        background:WHITE, borderBottom:`3px solid ${YELLOW}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 40px", height:64,
      }}>
        <LogoMark size={44} />

        <div className="nav-links mont" style={{ display:"flex", gap:32, alignItems:"center" }}>
          {d.nav.map((label,i)=>(
            <a key={i} href={`#${d.navIds[i]}`}
              style={{ fontSize:13, fontWeight:700, color:BODY, textDecoration:"none", letterSpacing:"0.04em", textTransform:"uppercase", transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color=BLACK}
              onMouseLeave={e=>e.currentTarget.style.color=BODY}>
              {label}
            </a>
          ))}
        </div>

        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button onClick={()=>setLang(l=>l==="en"?"kh":"en")}
            className="mont"
            style={{ fontSize:12, fontWeight:700, background:"transparent", border:`2px solid ${MGREY}`, color:BODY, padding:"6px 14px", cursor:"pointer", borderRadius:8, transition:"all 0.15s", letterSpacing:"0.06em" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=YELLOW;e.currentTarget.style.background=YELLOW;e.currentTarget.style.color=BLACK;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=MGREY;e.currentTarget.style.background="transparent";e.currentTarget.style.color=BODY;}}>
            {d.toggle}
          </button>
          <a href={`mailto:${d.contact.email}`} className="mont"
            style={{ fontSize:13, fontWeight:700, background:YELLOW, color:BLACK, padding:"8px 20px", textDecoration:"none", borderRadius:8, letterSpacing:"0.04em", transition:"opacity 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            {d.heroCta}
          </a>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ background:BLACK, minHeight:"90vh", display:"flex", alignItems:"center", overflow:"hidden", position:"relative" }}>
        {/* Yellow accent blob */}
        <div style={{ position:"absolute", top:-100, right:-100, width:500, height:500, borderRadius:"50%", background:YELLOW, opacity:0.08, pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-80, left:-80, width:300, height:300, borderRadius:"50%", background:YELLOW, opacity:0.06, pointerEvents:"none" }} />

        <div className="hero-inner" style={{ maxWidth:1100, margin:"0 auto", padding:"80px 40px", display:"flex", alignItems:"center", gap:64, width:"100%", position:"relative", zIndex:1 }}>
          <div style={{ flex:1 }}>
            {/* Tag */}
            <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
              <div className="mont" style={{ display:"inline-flex", alignItems:"center", gap:8, background:YELLOW, color:BLACK, padding:"6px 16px", borderRadius:99, fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:24 }}>
                <Star size={12} fill={BLACK}/>{d.heroTag}
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
              className="mont"
              style={{ fontSize:"clamp(44px,8vw,96px)", fontWeight:900, color:WHITE, lineHeight:0.92, letterSpacing:"-0.03em", marginBottom:24 }}>
              {d.heroName.split(" ").map((word,i)=>(
                <span key={i} style={{ display:"block", color: i===1 ? YELLOW : WHITE }}>{word}</span>
              ))}
            </motion.h1>

            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
              className="mont"
              style={{ fontSize:16, fontWeight:500, color:"rgba(255,255,255,0.55)", marginBottom:36, lineHeight:1.65, maxWidth:440 }}>
              {d.heroSub}
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }}
              style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a href={`mailto:${d.contact.email}`} className="mont"
                style={{ fontSize:14, fontWeight:700, background:YELLOW, color:BLACK, padding:"13px 28px", textDecoration:"none", borderRadius:10, display:"inline-flex", alignItems:"center", gap:8, transition:"opacity 0.15s", letterSpacing:"0.02em" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <Mail size={15}/>{d.heroCta}
              </a>
              <a href={`https://github.com/${d.contact.github}`} target="_blank" rel="noreferrer" className="mont"
                style={{ fontSize:14, fontWeight:700, background:"rgba(255,255,255,0.1)", color:WHITE, padding:"13px 24px", textDecoration:"none", borderRadius:10, display:"inline-flex", alignItems:"center", gap:8, transition:"background 0.15s", letterSpacing:"0.02em" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
                <Github size={15}/>GitHub
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div initial={{ opacity:0, x:32 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, delay:0.2 }}
            className="hero-photo"
            style={{ width:340, flexShrink:0, position:"relative" }}>
            <div style={{ position:"absolute", inset:-4, borderRadius:24, background:`linear-gradient(135deg, ${YELLOW}, transparent)`, zIndex:0 }} />
            <div style={{ position:"relative", zIndex:1, borderRadius:20, overflow:"hidden", background:"#222" }}>
              <img src="images/bl-steven.png" alt="Hun Phanuth"
                style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", objectPosition:"center top", display:"block", filter:"contrast(1.05)" }} />
            </div>
            {/* Floating badge */}
            <div className="mont" style={{ position:"absolute", bottom:-16, left:-16, background:YELLOW, borderRadius:12, padding:"10px 16px", boxShadow:"0 4px 16px rgba(253,217,0,0.4)", zIndex:2 }}>
              <div style={{ fontWeight:900, fontSize:20, color:BLACK, lineHeight:1 }}>✈️</div>
              <div style={{ fontWeight:700, fontSize:10, color:BLACK, letterSpacing:"0.08em", marginTop:2 }}>ATM STUDENT</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background:YELLOW, padding:"0" }}>
        <div className="stats-grid" style={{ maxWidth:1100, margin:"0 auto", padding:"0 40px", display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          {STATS.map((s,i)=>(
            <motion.div key={i} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
              style={{ textAlign:"center", padding:"28px 16px", borderRight:i<STATS.length-1?"2px solid rgba(0,0,0,0.1)":"none" }}>
              <div className="mont" style={{ fontWeight:900, fontSize:"clamp(32px,4vw,48px)", color:BLACK, lineHeight:1, letterSpacing:"-0.02em" }}>{s.val}</div>
              <div className="mont" style={{ fontWeight:700, fontSize:11, color:"rgba(0,0,0,0.55)", letterSpacing:"0.12em", marginTop:6, textTransform:"uppercase" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section style={{ background:WHITE, padding:"80px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:64, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:"0 0 auto" }}>
            <div className="mont" style={{ fontWeight:900, fontSize:"clamp(48px,8vw,96px)", color:GREY, lineHeight:1, letterSpacing:"-0.03em", userSelect:"none" }}>HP</div>
          </div>
          <div style={{ flex:1, minWidth:280 }}>
            <div className="mont" style={{ fontWeight:700, fontSize:11, color:YELLOW, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12, background:BLACK, display:"inline-block", padding:"3px 10px", borderRadius:4 }}>
              {d.aboutTitle}
            </div>
            <p className="mont" style={{ fontWeight:500, fontSize:"clamp(16px,2vw,20px)", color:BLACK, lineHeight:1.75, marginTop:12 }}>
              {d.aboutText}
            </p>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="work" style={{ background:GREY, padding:"80px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:8, flexWrap:"wrap" }}>
            <h2 className="mont" style={{ fontWeight:900, fontSize:"clamp(28px,4vw,44px)", color:BLACK, letterSpacing:"-0.02em" }}>{d.workTitle}</h2>
          </div>
          <p className="mont" style={{ fontSize:14, color:BODY, marginBottom:40, fontWeight:500 }}>{d.workSub}</p>

          <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {projects.map((p,i)=>(
              <motion.a key={p.id} href={p.link||"#"} target="_blank" rel="noreferrer"
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ textDecoration:"none", display:"block", background:WHITE, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", transition:"transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)"; }}>
                {/* Card top */}
                <div style={{ background: i===0?BLACK:i===1?"#1A1A2E":"#0D1B2A", height:120, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%", background:YELLOW, opacity:0.15 }} />
                  <span style={{ fontSize:48 }}>{p.emoji}</span>
                </div>
                <div style={{ padding:"20px 20px 24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <span className="mont" style={{ fontSize:11, fontWeight:700, color:YELLOW, background:BLACK, padding:"3px 10px", borderRadius:99, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                      {p.tag}
                    </span>
                    <span className="mont" style={{ fontSize:12, color:BODY, fontWeight:500 }}>{p.year}</span>
                  </div>
                  <h3 className="mont" style={{ fontWeight:900, fontSize:20, color:BLACK, marginBottom:10, letterSpacing:"-0.01em" }}>{p.title||p.name}</h3>
                  <p className="mont" style={{ fontSize:13, lineHeight:1.65, color:BODY, fontWeight:400 }}>{p.description||p.desc}</p>
                  <div className="mont" style={{ marginTop:16, display:"flex", alignItems:"center", gap:4, fontSize:12, fontWeight:700, color:BLACK }}>
                    VIEW PROJECT <ArrowUpRight size={13}/>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Experience */}
          <div style={{ marginTop:56 }}>
            <h3 className="mont" style={{ fontWeight:900, fontSize:26, color:BLACK, marginBottom:28, letterSpacing:"-0.01em" }}>{d.expTitle}</h3>
            {d.exp.map((exp,i)=>(
              <motion.div key={i} initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ background:WHITE, borderRadius:12, padding:"20px 24px", marginBottom:12, display:"flex", gap:20, alignItems:"flex-start", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", borderLeft:`4px solid ${YELLOW}` }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:4 }}>
                    <span className="mont" style={{ fontWeight:800, fontSize:16, color:BLACK }}>{exp.title}</span>
                    <span className="mont" style={{ fontSize:12, color:BODY, fontWeight:500 }}>{exp.period}</span>
                  </div>
                  <div className="mont" style={{ fontSize:13, fontWeight:700, color:YELLOW, background:BLACK, display:"inline-block", padding:"2px 8px", borderRadius:4, marginBottom:8 }}>{exp.org}</div>
                  <p className="mont" style={{ fontSize:13, color:BODY, lineHeight:1.65 }}>{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EDUCATION ══ */}
      <section style={{ background:BLACK, padding:"80px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 className="mont" style={{ fontWeight:900, fontSize:"clamp(28px,4vw,44px)", color:WHITE, letterSpacing:"-0.02em", marginBottom:40 }}>{d.eduTitle}</h2>
          <div className="edu-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {education.map((edu,i)=>(
              <motion.div key={edu.id} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ background:OFFBLK, borderRadius:16, padding:"28px 24px", border:`1px solid rgba(255,255,255,0.06)`, transition:"border-color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=YELLOW}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                <div style={{ fontSize:32, marginBottom:16 }}>{edu.icon}</div>
                <div className="mont" style={{ fontWeight:800, fontSize:16, color:WHITE, marginBottom:6, lineHeight:1.3 }}>{edu.degree}</div>
                <div className="mont" style={{ fontSize:13, color:YELLOW, fontWeight:700, marginBottom:4 }}>{edu.university}</div>
                <div className="mont" style={{ fontSize:12, color:"rgba(255,255,255,0.35)", fontWeight:500 }}>{edu.period||`${edu.startDate} – ${edu.endDate}`}</div>
              </motion.div>
            ))}
          </div>

          {/* Awards */}
          <div style={{ marginTop:48 }}>
            <h3 className="mont" style={{ fontWeight:900, fontSize:24, color:WHITE, marginBottom:24, letterSpacing:"-0.01em" }}>{d.awardsTitle}</h3>
            {d.awards.map((ach,i)=>(
              <motion.div key={i} initial={{ opacity:0, x:16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ display:"flex", gap:16, alignItems:"flex-start", padding:"16px 0", borderBottom:`1px solid rgba(255,255,255,0.07)` }}>
                <div style={{ background:YELLOW, color:BLACK, fontWeight:900, fontSize:13, padding:"4px 10px", borderRadius:6, flexShrink:0, fontFamily:"'Montserrat',sans-serif" }}>
                  {ach.year}
                </div>
                <div>
                  <div className="mont" style={{ fontWeight:700, fontSize:15, color:WHITE, marginBottom:3 }}>{ach.title}</div>
                  <div className="mont" style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontWeight:500 }}>{ach.org}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ background:WHITE, padding:"80px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 className="mont" style={{ fontWeight:900, fontSize:"clamp(28px,4vw,44px)", color:BLACK, letterSpacing:"-0.02em", marginBottom:40 }}>{d.skillsTitle}</h2>
          <div className="skill-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {skills.map((sk,i)=>(
              <motion.div key={i} initial={{ opacity:0, scale:0.92 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.03 }}
                style={{ background:GREY, borderRadius:10, padding:"14px 16px", transition:"all 0.15s", cursor:"default" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=YELLOW; e.currentTarget.querySelector(".sk-cat").style.color="rgba(0,0,0,0.5)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=GREY; e.currentTarget.querySelector(".sk-cat").style.color=BODY; }}>
                <div className="mont" style={{ fontWeight:700, fontSize:13, color:BLACK, marginBottom:2 }}>{sk.name}</div>
                <div className="mont sk-cat" style={{ fontSize:11, color:BODY, fontWeight:500, transition:"color 0.15s" }}>{sk.cat}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ background:YELLOW, padding:"80px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:64, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:280 }}>
            <h2 className="mont" style={{ fontWeight:900, fontSize:"clamp(36px,6vw,80px)", color:BLACK, letterSpacing:"-0.03em", lineHeight:0.95, marginBottom:20, whiteSpace:"pre-line" }}>
              {d.contactTitle}
            </h2>
            <p className="mont" style={{ fontSize:16, color:"rgba(0,0,0,0.6)", fontWeight:500, marginBottom:32, lineHeight:1.65 }}>
              {d.contactSub}
            </p>
            <a href={`mailto:${d.contact.email}`} className="mont"
              style={{ fontSize:14, fontWeight:800, background:BLACK, color:YELLOW, padding:"14px 32px", textDecoration:"none", borderRadius:10, display:"inline-flex", alignItems:"center", gap:8, transition:"opacity 0.15s", letterSpacing:"0.02em" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <Mail size={15}/>{d.contactBtn}
            </a>
          </div>

          <div style={{ flex:"0 0 auto", display:"flex", flexDirection:"column", gap:16 }}>
            {[
              { icon:<Mail size={16}/>, v:d.contact.email, href:`mailto:${d.contact.email}` },
              { icon:<Phone size={16}/>, v:d.contact.phone },
              { icon:<Github size={16}/>, v:`github.com/${d.contact.github}`, href:`https://github.com/${d.contact.github}` },
              { icon:<Linkedin size={16}/>, v:"linkedin.com/in/Hun-Phanuth", href:"#" },
              { icon:<MapPin size={16}/>, v:d.contact.location },
            ].map((c,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, background:BLACK, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:YELLOW, flexShrink:0 }}>{c.icon}</div>
                {c.href ? (
                  <a href={c.href} className="mont" style={{ fontSize:14, fontWeight:600, color:BLACK, textDecoration:"none", transition:"opacity 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.opacity="0.6"}
                    onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                    {c.v}
                  </a>
                ) : (
                  <span className="mont" style={{ fontSize:14, fontWeight:600, color:"rgba(0,0,0,0.55)" }}>{c.v}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:BLACK, padding:"20px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <LogoMark size={36} />
        <span className="mont" style={{ fontSize:12, color:"rgba(255,255,255,0.3)", fontWeight:500, letterSpacing:"0.06em" }}>
          © {new Date().getFullYear()} HUN PHANUTH · PHNOM PENH
        </span>
      </footer>
    </div>
  );
}
