"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight } from "lucide-react";

// ============================================================
// PHANUTH.DEV — My best design for this specific person.
//
// Phanuth is the only person I know who debugs code at night
// and studies how to separate aircraft by day. That duality
// is the entire brief. Neither identity dominates. Both are true.
//
// Concept: "Frequency" — the word belongs to both worlds.
// A radio frequency is how ATC talks to aircraft.
// A signal frequency is how computers talk to each other.
// Phanuth operates on both.
//
// Visual language: oscilloscope / waveform as the one decorative
// element — a single animated sine wave in the hero that is both
// a radar sweep and a signal trace. Everything else is stripped.
//
// Palette:
//   #0B0F1A — deep navy-black (night sky, instrument panel)
//   #F0EDE6 — warm off-white (aged paper, cockpit lighting)
//   #00B4D8 — frequency blue (radio waves, signal)
//   #1B2340 — surface (slightly lighter than bg)
//   #5A6A8A — secondary text
//
// Type:
//   "Space Grotesk" 700/800 — display (geometric, technical,
//    used by actual aerospace companies)
//   "Space Grotesk" 400 — body (same family, weight contrast only)
//   "Space Mono" — data/labels (monospace for anything that
//    looks like a readout: coordinates, dates, codes)
//
// Layout: full-bleed sections. Hero is split: left waveform
// canvas + name, right = photo in a hard-edge frame.
// Sections alternate bg: #0B0F1A and #1B2340.
//
// Signature: an animated waveform/sine that pulses slowly in the
// hero — one continuous SVG path drawn with stroke-dashoffset.
// It's the ONLY animation on the page. Everything else is static.
// ============================================================

const BG     = "#0B0F1A";
const SURF   = "#141929";
const INK    = "#F0EDE6";
const BLUE   = "#00B4D8";
const SUB    = "#5A6A8A";
const RULE   = "#1E2840";

const DEFAULT_PROJECTS = [
  { id:1, name:"SrovChlart", tag:"AGRITECH", year:"2024", desc:"Rice marketplace for Cambodian farmers. React Native + TypeScript — live pricing, farmer-direct sales, offline-first.", link:"#" },
  { id:2, name:"SafeHire", tag:"SAFETY", year:"2024", desc:"Anti-scam job verification platform protecting Cambodian workers from fraudulent employers. React Native Expo.", link:"#" },
  { id:3, name:"KourSrov", tag:"AGRITECH", year:"2023", desc:"Full AgriTech pitch platform for Cambodia's rice industry — market data, supply chain tools, farmer onboarding.", link:"#" },
];
const DEFAULT_SKILLS = [
  { cat:"Frontend", items:["React","Next.js","React Native","TypeScript","Tailwind CSS","Expo"] },
  { cat:"Backend", items:["Node.js","PostgreSQL","Supabase","REST APIs","Prisma"] },
  { cat:"Data", items:["Python","PySpark","Spark SQL","Hadoop HDFS","Apache Hive","Parquet"] },
  { cat:"Aviation", items:["Air Traffic Management","Aviation Safety","Law of Aviation","Quality Management"] },
];
const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"National Institute of Civil Aviation (NICA)", period:"2022 – Present", code:"ATM-401" },
  { id:2, degree:"Bachelor of Computer Science", university:"Cambodian University for Specialties (CUS)", period:"2022 – Present", code:"CS-301" },
];

// Animated waveform — the signature element
function Waveform({ width = 600, height = 120 }) {
  const pathRef = useRef(null);
  const rafRef  = useRef(null);
  const tRef    = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const draw = () => {
      tRef.current += 0.008;
      const t = tRef.current;
      const pts = [];
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const freq1 = Math.sin(i * 0.18 + t * 2.2) * 28;
        const freq2 = Math.sin(i * 0.07 + t * 0.9) * 16;
        const freq3 = Math.sin(i * 0.31 + t * 3.1) * 8;
        const y = height / 2 + freq1 + freq2 + freq3;
        pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      path.setAttribute("d", pts.join(" "));
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height]);

  return (
    <svg width={width} height={height} style={{ display:"block", overflow:"visible" }}>
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0" />
          <stop offset="30%" stopColor={BLUE} stopOpacity="0.8" />
          <stop offset="70%" stopColor={BLUE} stopOpacity="0.8" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path ref={pathRef} stroke="url(#waveGrad)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Mono label — for anything that reads like a system readout
function MonoTag({ children, style={} }) {
  return (
    <span style={{
      fontFamily:"'Space Mono',monospace",
      fontSize:10, letterSpacing:"0.12em",
      color:SUB, textTransform:"uppercase",
      ...style,
    }}>{children}</span>
  );
}

// Section divider with label
function SectionHead({ label, index }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:48 }}>
      <MonoTag style={{ color:BLUE }}>{index}</MonoTag>
      <div style={{ height:1, width:32, background:BLUE, opacity:0.5 }} />
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:"clamp(28px,4vw,44px)", letterSpacing:"-0.02em", color:INK }}>
        {label}
      </h2>
    </div>
  );
}

const T = {
  en: {
    name: ["HUN", "PHANUTH"],
    freq: "FREQ: 121.500 MHz",
    coord: "11.5564° N, 104.9282° E",
    role: "Full-Stack Developer",
    sector: "Air Traffic Management Student",
    about: "I write code and I study airspace. Not as a novelty — as a deliberate bet that the most interesting problems live at the boundary between two fields most people keep separate.",
    about2: "Currently building production software for Cambodian businesses while cross-training in Air Traffic Management at NICA. Both disciplines demand the same thing: when it matters, it has to work.",
    workLabel: "Work", expLabel: "Experience", eduLabel: "Education",
    skillsLabel: "Technical Profile", contactLabel: "Contact",
    contactSub: "Open to the right project or role.",
    contactBtn: "Send a message",
    awards: [
      { year:"2026", code:"UCL-01", title:"3rd Place, UniPreneurCamp Cluster 1", org:"Khmer Enterprise · Team Safework" },
      { year:"2025", code:"BDC-25", title:"Big Data Certification", org:"Hadoop · PySpark · Spark SQL · Hive · Parquet" },
      { year:"2024", code:"PYC-24", title:"Python Programming Certification", org:"Samsung Innovation Campus × RUPP" },
    ],
    experience: [
      { period:"Dec 2025 – Present", code:"EXP-01", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh",
        desc:"Building end-to-end POS systems and e-commerce platforms for Cambodian businesses. Architecture, database design, API routing, and client-facing storefronts." },
      { period:"Jan 2013 – Jan 2019", code:"EXP-02", title:"Operations Assistant", org:"HHH Printer · Takeo",
        desc:"Managed print operations, digital design, and client service. First look at how operational systems actually work." },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    toggle:"KH",
    nav:["Work","Skills","Contact"],
  },
  kh: {
    name: ["ហ៊ុន", "ផានុត"],
    freq: "FREQ: 121.500 MHz",
    coord: "11.5564° N, 104.9282° E",
    role: "អ្នកអភិវឌ្ឍន៍ Full-Stack",
    sector: "និស្សិត ATM",
    about: "ខ្ញុំសរសេរកូដ ហើយសិក្សាចរាចរណ៍អាកាស។ មិនមែនជាចំណង់ចំណូលចិត្ត — ជាការបញ្ចាប់ដោយចេតនាថាបញ្ហាដ៏흥趣ite នៅក្នុងព្រំដែននៃជំនាញពីរ។",
    about2: "បច្ចុប្បន្នកំពុងបង្កើតកម្មវិធីសម្រាប់អាជីវកម្មខ្មែរ ខណៈសិក្សា ATM នៅ NICA ។ ជំនាញទាំងពីរតម្រូវការតែមួយ: វាត្រូវតែដំណើរការ។",
    workLabel:"គម្រោង", expLabel:"បទពិសោធន៍", eduLabel:"ការសិក្សា",
    skillsLabel:"ជំនាញ", contactLabel:"ទំនាក់ទំនង",
    contactSub: "បើកចំហសម្រាប់គម្រោង ឬការងារត្រឹមត្រូវ។",
    contactBtn: "ផ្ញើសារ",
    awards: [
      { year:"2026", code:"UCL-01", title:"លេខ ៣, UniPreneurCamp Cluster 1", org:"Khmer Enterprise · ក្រុម Safework" },
      { year:"2025", code:"BDC-25", title:"វិញ្ញាបនបត្រ Big Data", org:"Hadoop · PySpark · Spark SQL" },
      { year:"2024", code:"PYC-24", title:"វិញ្ញាបនបត្រ Python", org:"Samsung × RUPP" },
    ],
    experience: [
      { period:"ធ្នូ 2025 – Now", code:"EXP-01", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ",
        desc:"ប្រព័ន្ធ POS និង e-commerce ពីដើមដល់ចប់ — backend, DB, API, storefront។" },
      { period:"មករា 2013 – 2019", code:"EXP-02", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ",
        desc:"ប្រតិបត្តិការការបោះពុម្ព, រចនាក្រាហ្វិក, សេវាកម្មអតិថិជន។" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    toggle:"EN",
    nav:["គម្រោង","ជំនាញ","ទំនាក់ទំនង"],
  },
};

export default function PhanuthDev() {
  const [lang, setLang] = useState("en");
  const [apiProjects, setApiProjects] = useState([]);
  const [apiSkills, setApiSkills]     = useState([]);
  const [apiEdu, setApiEdu]           = useState([]);
  const [waveW, setWaveW]             = useState(600);
  const waveRef = useRef(null);

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

  useEffect(() => {
    if (!waveRef.current) return;
    const ro = new ResizeObserver(entries => {
      setWaveW(entries[0].contentRect.width);
    });
    ro.observe(waveRef.current);
    return () => ro.disconnect();
  }, []);

  const d = T[lang];
  const projects  = apiProjects.length > 0 ? apiProjects : DEFAULT_PROJECTS;
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;

  // Build skill groups from API or default
  const skillGroups = apiSkills.length > 0
    ? [{ cat:"Stack", items: apiSkills.map(s=>s.name) }]
    : DEFAULT_SKILLS;

  return (
    <div className={lang==="kh"?"font-khmer":""}
      style={{ minHeight:"100vh", background:BG, color:INK, overflowX:"hidden" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${BG}; overflow-x:hidden; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:${BG}; }
        ::-webkit-scrollbar-thumb { background:${BLUE}40; border-radius:99px; }
        @media(max-width:700px){
          .hero-grid { grid-template-columns:1fr!important; }
          .hero-photo { display:none!important; }
          .proj-grid { grid-template-columns:1fr!important; }
          .skill-grid { grid-template-columns:1fr!important; }
          .contact-grid { grid-template-columns:1fr!important; }
          .nav-links { display:none!important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(11,15,26,0.92)", backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${RULE}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 48px", height:56,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:BLUE, animation:"pulse 2s infinite" }} />
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, letterSpacing:"0.1em", color:INK }}>
            PHANUTH.DEV
          </span>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>

        <div className="nav-links" style={{ display:"flex", gap:32, alignItems:"center" }}>
          {d.nav.map((label,i)=>(
            <a key={i} href={`#${["work","skills","contact"][i]}`}
              style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:500, fontSize:13, color:SUB, textDecoration:"none", letterSpacing:"0.02em", transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color=INK}
              onMouseLeave={e=>e.currentTarget.style.color=SUB}>
              {label}
            </a>
          ))}
        </div>

        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>setLang(l=>l==="en"?"kh":"en")} style={{
            fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:"0.1em",
            background:"transparent", border:`1px solid ${RULE}`, color:SUB,
            padding:"5px 12px", cursor:"pointer", transition:"all 0.15s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=BLUE;e.currentTarget.style.color=BLUE;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=RULE;e.currentTarget.style.color=SUB;}}>
            {d.toggle}
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ minHeight:"calc(100vh - 56px)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"64px 48px 48px", position:"relative", overflow:"hidden" }}>
        {/* Background grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${RULE} 1px, transparent 1px), linear-gradient(90deg, ${RULE} 1px, transparent 1px)`, backgroundSize:"60px 60px", opacity:0.3, pointerEvents:"none" }} />

        <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 400px", gap:"0 64px", alignItems:"center", maxWidth:1200, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>

          {/* Left — name + waveform */}
          <div>
            {/* System readout header */}
            <div style={{ display:"flex", gap:24, marginBottom:32, flexWrap:"wrap" }}>
              <MonoTag style={{ color:BLUE }}>{d.freq}</MonoTag>
              <MonoTag>·</MonoTag>
              <MonoTag>{d.coord}</MonoTag>
            </div>

            {/* Name */}
            <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:"clamp(52px,9vw,108px)", lineHeight:0.9, letterSpacing:"-0.03em", color:INK, marginBottom:8 }}>
              {d.name[0]}
            </h1>
            <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:"clamp(52px,9vw,108px)", lineHeight:0.9, letterSpacing:"-0.03em", color:BLUE, marginBottom:32 }}>
              {d.name[1]}
            </h1>

            {/* Waveform — the signature */}
            <div ref={waveRef} style={{ marginBottom:32, opacity:0.7 }}>
              <Waveform width={waveW} height={80} />
            </div>

            {/* Role tags */}
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
              {[d.role, d.sector].map((r,i) => (
                <div key={i} style={{
                  fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:13,
                  padding:"6px 14px", border:`1px solid ${i===0 ? BLUE : RULE}`,
                  color: i===0 ? BLUE : SUB, letterSpacing:"0.02em",
                }}>
                  {r}
                </div>
              ))}
            </div>

            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:400, fontSize:16, lineHeight:1.75, color:SUB, maxWidth:480 }}>
              {d.about}
            </p>

            <div style={{ display:"flex", gap:12, marginTop:32 }}>
              <a href={`mailto:${d.contact.email}`} style={{
                fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, letterSpacing:"0.04em",
                background:BLUE, color:BG, padding:"12px 28px", textDecoration:"none",
                display:"inline-flex", alignItems:"center", gap:8, transition:"opacity 0.15s",
              }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <Mail size={15}/>{d.contactBtn}
              </a>
              <a href={`https://github.com/${d.contact.github}`} target="_blank" rel="noreferrer" style={{
                fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13,
                background:"transparent", color:INK, padding:"12px 20px",
                textDecoration:"none", border:`1px solid ${RULE}`,
                display:"inline-flex", alignItems:"center", gap:8, transition:"border-color 0.15s",
              }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=INK}
                onMouseLeave={e=>e.currentTarget.style.borderColor=RULE}>
                <Github size={15}/>GitHub
              </a>
            </div>
          </div>

          {/* Right — photo */}
          <div className="hero-photo" style={{ position:"relative" }}>
            {/* Blue frame accent */}
            <div style={{ position:"absolute", top:-12, right:-12, width:"100%", height:"100%", border:`1px solid ${BLUE}30`, zIndex:0 }} />
            <div style={{ position:"relative", zIndex:1, background:SURF, overflow:"hidden" }}>
              <img src="images/bl-steven.png" alt="Hun Phanuth"
                style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", objectPosition:"center top", display:"block", filter:"brightness(0.9) contrast(1.05)" }} />
              {/* Blue overlay tint at bottom */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80, background:`linear-gradient(transparent, ${BLUE}18)` }} />
            </div>
            {/* Corner mono label */}
            <div style={{ position:"absolute", bottom:-24, left:0 }}>
              <MonoTag>PHN — 2026</MonoTag>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WORK ══ */}
      <section id="work" style={{ background:SURF, padding:"96px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionHead label={d.workLabel} index="01 —" />
          <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
            {projects.map((p,i)=>(
              <motion.a key={p.id}
                href={p.link||"#"} target="_blank" rel="noreferrer"
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ textDecoration:"none", display:"flex", flexDirection:"column", background:BG, padding:"32px 28px", borderTop:`1px solid ${RULE}`, transition:"border-color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=BLUE}
                onMouseLeave={e=>e.currentTarget.style.borderColor=RULE}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                  <MonoTag style={{ color:BLUE }}>{p.tag||DEFAULT_PROJECTS[i]?.tag||"PROJECT"}</MonoTag>
                  <MonoTag>{p.year||DEFAULT_PROJECTS[i]?.year||"2024"}</MonoTag>
                </div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:"clamp(18px,2vw,24px)", letterSpacing:"-0.02em", color:INK, marginBottom:12, lineHeight:1.1 }}>
                  {p.title||p.name}
                </div>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:400, fontSize:13, lineHeight:1.7, color:SUB, flex:1 }}>
                  {p.description||p.desc}
                </p>
                <div style={{ marginTop:20, display:"flex", alignItems:"center", gap:6, fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.12em", color:BLUE }}>
                  VIEW <ArrowUpRight size={12}/>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Experience */}
          <div style={{ marginTop:64, borderTop:`1px solid ${RULE}`, paddingTop:48 }}>
            <MonoTag style={{ display:"block", marginBottom:28 }}>{d.expLabel}</MonoTag>
            {d.experience.map((exp,i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:"0 32px", paddingBottom:28, marginBottom:28, borderBottom:`1px solid ${RULE}` }}>
                <div>
                  <MonoTag style={{ color:BLUE, display:"block", marginBottom:4 }}>{exp.code}</MonoTag>
                  <MonoTag style={{ display:"block", lineHeight:1.5 }}>{exp.period}</MonoTag>
                </div>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:18, color:INK, marginBottom:4 }}>{exp.title}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:BLUE, letterSpacing:"0.08em", marginBottom:10 }}>{exp.org}</div>
                  <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:400, fontSize:14, color:SUB, lineHeight:1.7 }}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ background:BG, padding:"96px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionHead label={d.skillsLabel} index="02 —" />
          <div className="skill-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }}>
            {skillGroups.map((grp,gi)=>(
              <div key={gi} style={{ background:SURF, padding:"28px 24px", borderTop:`2px solid ${gi===0?BLUE:RULE}` }}>
                <MonoTag style={{ display:"block", marginBottom:20, color:gi===0?BLUE:SUB }}>{grp.cat}</MonoTag>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {grp.items.map((item,ii)=>(
                    <div key={ii} style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:500, fontSize:14, color:INK, display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:4, height:4, borderRadius:"50%", background:BLUE, flexShrink:0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginTop:48, borderTop:`1px solid ${RULE}`, paddingTop:40 }}>
            <MonoTag style={{ display:"block", marginBottom:24 }}>{d.eduLabel}</MonoTag>
            {education.map((edu,i)=>(
              <div key={edu.id} style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:"0 32px", marginBottom:20, paddingBottom:20, borderBottom:`1px solid ${RULE}` }}>
                <MonoTag style={{ color:BLUE, paddingTop:3 }}>{edu.code||`EDU-0${i+1}`}</MonoTag>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:16, color:INK, marginBottom:3 }}>{edu.degree}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:SUB, letterSpacing:"0.06em", marginBottom:3 }}>{edu.university}</div>
                  <MonoTag>{edu.period||`${edu.startDate} – ${edu.endDate}`}</MonoTag>
                </div>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div style={{ marginTop:16, borderTop:`1px solid ${RULE}`, paddingTop:40 }}>
            <MonoTag style={{ display:"block", marginBottom:24 }}>RECOGNITION</MonoTag>
            {d.awards.map((ach,i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:"0 32px", marginBottom:16, paddingBottom:16, borderBottom:`1px solid ${RULE}` }}>
                <MonoTag style={{ color:BLUE, paddingTop:3 }}>{ach.code}</MonoTag>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, color:INK, marginBottom:3 }}>{ach.title}</div>
                  <MonoTag>{ach.org}</MonoTag>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ background:SURF, padding:"96px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionHead label={d.contactLabel} index="03 —" />
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px 96px", alignItems:"start" }}>
            <div>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:400, fontSize:18, lineHeight:1.75, color:SUB, marginBottom:16 }}>{d.about2}</p>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:400, fontSize:15, color:SUB, marginBottom:36 }}>{d.contactSub}</p>
              <a href={`mailto:${d.contact.email}`} style={{
                fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:14, letterSpacing:"0.04em",
                background:BLUE, color:BG, padding:"14px 32px", textDecoration:"none",
                display:"inline-flex", alignItems:"center", gap:10, transition:"opacity 0.15s",
              }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <Mail size={15}/>{d.contactBtn}
              </a>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {[
                { icon:<Mail size={14}/>, v:d.contact.email, href:`mailto:${d.contact.email}` },
                { icon:<Phone size={14}/>, v:d.contact.phone, href:null },
                { icon:<Github size={14}/>, v:`github.com/${d.contact.github}`, href:`https://github.com/${d.contact.github}` },
                { icon:<Linkedin size={14}/>, v:"linkedin.com/in/Hun-Phanuth", href:"#" },
                { icon:<MapPin size={14}/>, v:d.contact.location, href:null },
              ].map((c,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 0", borderBottom:`1px solid ${RULE}` }}>
                  <span style={{ color:BLUE, flexShrink:0 }}>{c.icon}</span>
                  {c.href ? (
                    <a href={c.href} style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:SUB, textDecoration:"none", transition:"color 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.color=INK}
                      onMouseLeave={e=>e.currentTarget.style.color=SUB}>
                      {c.v}
                    </a>
                  ) : (
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:SUB }}>{c.v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:BG, borderTop:`1px solid ${RULE}`, padding:"20px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:BLUE }} />
          <MonoTag style={{ color:INK }}>PHANUTH.DEV</MonoTag>
        </div>
        <MonoTag>© {new Date().getFullYear()} · PHNOM PENH · {d.freq}</MonoTag>
      </footer>
    </div>
  );
}
