"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight } from "lucide-react";

// ============================================================
// MERIDIAN — Clean professional portfolio website
// Like Linear / Vercel / Stripe's about pages.
// Font: DM Sans — geometric, trusted, not the Inter AI default
// Accent: #0057FF electric blue — links, hover, CTA only
// Signature: hero tagline swaps between two identities on load
// No gradients. No glass. No animations except the one that matters.
// ============================================================

const BLUE = "#200112";
const INK  = "#0A0A0A";
const SUB  = "#6B7280";
const RULE = "#E5E7EB";
const ALT  = "#F9FAFB";

const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"National Institute of Civil Aviation (NICA)", startDate:"2022", endDate:"Present" },
  { id:2, degree:"Bachelor of Computer Science", university:"Cambodian University for Specialties (CUS)", startDate:"2022", endDate:"Present" },
];
const DEFAULT_SKILLS = [
  { id:1, name:"React / Next.js" }, { id:2, name:"Node.js" },
  { id:3, name:"PostgreSQL" }, { id:4, name:"REST APIs" },
  { id:5, name:"Python" }, { id:6, name:"Data Analysis" },
  { id:7, name:"Aviation Safety" }, { id:8, name:"Air Traffic Management" },
  { id:9, name:"POS Systems" }, { id:10, name:"E-commerce" },
];
const DEFAULT_PROJECTS = [
  { id:1, name:"SrovChlart", description:"Rice marketplace mobile app for Cambodian farmers — React Native + TypeScript.", link:"#" },
  { id:2, name:"SafeHire", description:"Anti-scam job verification platform — React Native Expo.", link:"#" },
  { id:3, name:"KourSrov", description:"AgriTech platform pitch for Cambodia's rice industry.", link:"#" },
];

const T = {
  en: {
    greeting: "Hi, I'm",
    name: "Hun Phanuth",
    identities: ["Full-Stack Developer.", "ATM Student."],
    about: "I build production software and I'm cross-training in Air Traffic Management at NICA. My work lives at the intersection of engineering and aviation — two disciplines that both demand precision.",
    workTitle: "What I've built",
    expTitle: "Experience",
    eduTitle: "Education",
    skillsTitle: "Skills",
    contactTitle: "Get in touch",
    contactSub: "Open to freelance projects, full-time roles, and interesting problems.",
    contactBtn: "Send a message",
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    experience: [
      { period:"Dec 2025 – Present", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh",
        desc:"Building end-to-end POS systems and e-commerce platforms for Cambodian businesses. Backend architecture, database design, API routing, and client-facing storefronts — full stack, soup to nuts." },
      { period:"Jan 2013 – Jan 2019", title:"Operations Assistant", org:"HHH Printer · Takeo",
        desc:"Managed daily print operations, digital design, and direct client service at a family printing business. First exposure to operational systems and business workflows." },
    ],
    achievements: [
      { date:"Jun 2026", title:"3rd Place, UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { date:"Dec 2025", title:"Big Data Certification", org:"Professional Training — Hadoop, PySpark, Spark SQL" },
      { date:"Dec 2024", title:"Python Programming Certification", org:"Samsung Innovation Campus × RUPP" },
    ],
    toggle: "KH",
    nav: { work:"Work", experience:"Experience", skills:"Skills", contact:"Contact" },
  },
  kh: {
    greeting: "សួស្ដី, ខ្ញុំគឺ",
    name: "ហ៊ុន ផានុត",
    identities: ["អ្នកអភិវឌ្ឍន៍ Full-Stack.", "និស្សិត ATM."],
    about: "ខ្ញុំបង្កើតកម្មវិធីផលិតផល និងកំពុងសិក្សាការគ្រប់គ្រងចរាចរណ៍អាកាសនៅ NICA។ ការងាររបស់ខ្ញុំស្ថិតនៅចំណុចប្រសព្វរវាង CS និង aviation — ជំនាញទាំងពីរដែលតម្រូវភាពត្រឹមត្រូវ។",
    workTitle: "គម្រោងដែលខ្ញុំបានបង្កើត",
    expTitle: "បទពិសោធន៍",
    eduTitle: "ការសិក្សា",
    skillsTitle: "ជំនាញ",
    contactTitle: "ទំនាក់ទំនងមកខ្ញុំ",
    contactSub: "បើកចំហសម្រាប់គម្រោង freelance, ការងារពេញម៉ោង, និងបញ្ហាគួរឱ្យចាប់អារម្មណ៍។",
    contactBtn: "ផ្ញើសារ",
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    experience: [
      { period:"ធ្នូ 2025 – បច្ចុប្បន្ន", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ",
        desc:"បង្កើតប្រព័ន្ធ POS និង e-commerce ពីដើមដល់ចប់ — backend, DB, API, storefront។" },
      { period:"មករា 2013 – មករា 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ",
        desc:"គ្រប់គ្រងប្រតិបត្តិការការបោះពុម្ព រចនាក្រាហ្វិក និងសេវាកម្មអតិថិជន។" },
    ],
    achievements: [
      { date:"មិថុនា 2026", title:"លេខ ៣, UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { date:"ធ្នូ 2025", title:"វិញ្ញាបនបត្រ Big Data", org:"Hadoop, PySpark, Spark SQL" },
      { date:"ធ្នូ 2024", title:"វិញ្ញាបនបត្រ Python", org:"Samsung Innovation Campus × RUPP" },
    ],
    toggle: "EN",
    nav: { work:"គម្រោង", experience:"បទពិសោធន៍", skills:"ជំនាញ", contact:"ទំនាក់ទំនង" },
  },
};

// Rotating identity tagline — the one animation
function IdentityLine({ identities }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % identities.length), 3000);
    return () => clearInterval(t);
  }, [identities.length]);
  return (
    <span style={{ display:"inline-block", minWidth:280 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity:0, y:8 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-8 }}
          transition={{ duration:0.35, ease:"easeInOut" }}
          style={{ display:"inline-block", color:BLUE }}
        >
          {identities[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Skill pill
function Pill({ name }) {
  return (
    <span style={{
      fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500,
      padding:"6px 14px", border:`1px solid ${RULE}`,
      color:SUB, display:"inline-block",
      transition:"all 0.15s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = RULE; e.currentTarget.style.color = SUB; }}
    >
      {name}
    </span>
  );
}

// Project card
function ProjectCard({ name, description, link }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={link || "#"} target={link && link !== "#" ? "_blank" : undefined} rel="noreferrer"
      style={{ textDecoration:"none", display:"block" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{
        padding:"28px 28px 24px",
        border:`1px solid ${hov ? BLUE : RULE}`,
        transition:"border-color 0.15s, transform 0.15s",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:17, color:INK }}>{name}</span>
          <ArrowUpRight size={18} style={{ color: hov ? BLUE : RULE, transition:"color 0.15s", flexShrink:0 }} />
        </div>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:SUB, lineHeight:1.65, margin:0 }}>{description}</p>
      </div>
    </a>
  );
}

export default function Meridian() {
  const [lang, setLang] = useState("en");
  const [apiEdu, setApiEdu] = useState([]);
  const [apiSkills, setApiSkills] = useState([]);
  const [apiProjects, setApiProjects] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin?type=education").then(r=>r.json()).catch(()=>[]),
      fetch("/api/admin?type=skill").then(r=>r.json()).catch(()=>[]),
      fetch("/api/admin?type=project").then(r=>r.json()).catch(()=>[]),
    ]).then(([e,s,p]) => {
      setApiEdu(Array.isArray(e)?e:[]);
      setApiSkills(Array.isArray(s)?s:[]);
      setApiProjects(Array.isArray(p)?p:[]);
    });
  }, []);

  const d = T[lang];
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;
  const skills    = apiSkills.length > 0 ? apiSkills.map(s=>({id:s.id,name:s.name})) : DEFAULT_SKILLS;
  const projects  = apiProjects.length > 0 ? apiProjects : DEFAULT_PROJECTS;

  return (
    <div className={lang==="kh"?"font-khmer":""} style={{ minHeight:"100vh", background:"#fff", color:INK }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#fff; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        @media(max-width:640px){ .hero-grid{grid-template-columns:1fr!important} .hero-img{display:none!important} }
      `}</style>

      {/* ── NAV ── */}
      <header style={{
        position:"sticky", top:0, zIndex:50,
        background:"rgba(255,255,255,0.92)", backdropFilter:"blur(8px)",
        borderBottom:`1px solid ${RULE}`,
      }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 32px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:16, letterSpacing:"-0.02em", color:INK }}>
            Phanuth<span style={{ color:BLUE }}>.</span>
          </span>
          <nav style={{ display:"flex", gap:32, alignItems:"center" }}>
            {Object.entries(d.nav).map(([k,v]) => (
              <a key={k} href={`#${k}`} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, color:SUB, textDecoration:"none" }}
                onMouseEnter={e=>e.currentTarget.style.color=INK}
                onMouseLeave={e=>e.currentTarget.style.color=SUB}>
                {v}
              </a>
            ))}
            <button onClick={()=>setLang(l=>l==="en"?"kh":"en")} style={{
              fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:13,
              background:"transparent", border:`1px solid ${RULE}`, color:SUB,
              padding:"5px 14px", cursor:"pointer",
              transition:"border-color 0.15s, color 0.15s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=BLUE;e.currentTarget.style.color=BLUE;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=RULE;e.currentTarget.style.color=SUB;}}>
              {d.toggle}
            </button>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ maxWidth:1080, margin:"0 auto", padding:"96px 32px 88px" }}>
        <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:"0 64px", alignItems:"center" }}>
          <div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, color:SUB, marginBottom:16 }}>
              {d.greeting}
            </p>
            <h1 style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:"clamp(40px,6vw,72px)", lineHeight:1.05, letterSpacing:"-0.03em", color:INK, marginBottom:16 }}>
              {d.name}
            </h1>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"clamp(22px,3.5vw,36px)", lineHeight:1.2, letterSpacing:"-0.02em", marginBottom:28, minHeight:"1.3em" }}>
              <IdentityLine identities={d.identities} />
            </div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:17, lineHeight:1.75, color:SUB, maxWidth:480, marginBottom:36 }}>
              {d.about}
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a href={`mailto:${d.contact.email}`} style={{
                fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14,
                background:BLUE, color:"#fff", padding:"12px 28px",
                textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8,
                transition:"opacity 0.15s",
              }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <Mail size={15}/>{d.contactBtn}
              </a>
              <a href={`https://github.com/${d.contact.github}`} target="_blank" rel="noreferrer" style={{
                fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14,
                background:"transparent", color:INK, padding:"12px 24px",
                textDecoration:"none", border:`1px solid ${RULE}`,
                display:"inline-flex", alignItems:"center", gap:8,
                transition:"border-color 0.15s",
              }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=INK}
                onMouseLeave={e=>e.currentTarget.style.borderColor=RULE}>
                <Github size={15}/>GitHub
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="hero-img" style={{ aspectRatio:"3/4", overflow:"hidden", background:ALT }}>
            <img src="images/bl-steven.png" alt="Hun Phanuth"
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>
        </div>
      </section>

      {/* ── WORK / PROJECTS ── */}
      <section id="work" style={{ background:ALT, padding:"80px 0" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 32px" }}>
          <h2 style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:32, letterSpacing:"-0.02em", color:INK, marginBottom:8 }}>{d.workTitle}</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:SUB, marginBottom:40 }}>
            Selected projects — more on <a href={`https://github.com/${d.contact.github}`} style={{ color:BLUE, textDecoration:"none" }}>GitHub</a>.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {projects.map(p => (
              <ProjectCard key={p.id} name={p.title||p.name} description={p.description} link={p.link} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 32px" }}>
          <h2 style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:32, letterSpacing:"-0.02em", color:INK, marginBottom:48 }}>{d.expTitle}</h2>

          {/* Experience rows */}
          <div style={{ marginBottom:56 }}>
            {d.experience.map((exp, i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:"0 48px", paddingTop:28, paddingBottom:28, borderTop:`1px solid ${RULE}` }}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:SUB, paddingTop:3 }}>{exp.period}</div>
                <div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:17, color:INK, marginBottom:3 }}>{exp.title}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:BLUE, fontWeight:500, marginBottom:10 }}>{exp.org}</div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:SUB, lineHeight:1.7 }}>{exp.desc}</p>
                </div>
              </div>
            ))}

            {/* Education inline */}
            <div style={{ paddingTop:28, borderTop:`1px solid ${RULE}` }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:17, color:INK, marginBottom:20 }}>{d.eduTitle}</div>
              {education.map((edu, i) => (
                <div key={edu.id} style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:"0 48px", marginBottom: i < education.length-1 ? 18 : 0 }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:SUB }}>{edu.startDate} – {edu.endDate}</div>
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:15, color:INK }}>{edu.degree}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:SUB, marginTop:2 }}>{edu.university}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements inline */}
            <div style={{ paddingTop:28, borderTop:`1px solid ${RULE}`, marginTop:28 }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:17, color:INK, marginBottom:20 }}>Awards & Certifications</div>
              {d.achievements.map((ach, i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:"0 48px", marginBottom: i < d.achievements.length-1 ? 14 : 0 }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:SUB }}>{ach.date}</div>
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14, color:INK }}>{ach.title}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:SUB, marginTop:2 }}>{ach.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ background:ALT, padding:"80px 0" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 32px" }}>
          <h2 style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:32, letterSpacing:"-0.02em", color:INK, marginBottom:32 }}>{d.skillsTitle}</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {skills.map(sk => <Pill key={sk.id} name={sk.name} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"96px 0" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 32px" }}>
          <div style={{ maxWidth:560 }}>
            <h2 style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:"clamp(32px,5vw,52px)", letterSpacing:"-0.03em", lineHeight:1.05, color:INK, marginBottom:16 }}>
              {d.contactTitle}
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:SUB, lineHeight:1.7, marginBottom:36 }}>{d.contactSub}</p>

            <a href={`mailto:${d.contact.email}`} style={{
              fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:15,
              background:BLUE, color:"#fff", padding:"14px 32px",
              textDecoration:"none", display:"inline-flex", alignItems:"center", gap:10, marginBottom:40,
            }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <Mail size={16}/>{d.contactBtn} →
            </a>

            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                { icon:<Phone size={14}/>, v:d.contact.phone },
                { icon:<Mail size={14}/>, v:d.contact.email },
                { icon:<Github size={14}/>, v:`github.com/${d.contact.github}` },
                { icon:<Linkedin size={14}/>, v:`linkedin.com/in/Hun-Phanuth` },
                { icon:<MapPin size={14}/>, v:d.contact.location },
              ].map((c,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:SUB }}>
                  <span style={{ color:INK }}>{c.icon}</span>{c.v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${RULE}`, padding:"24px 32px" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:SUB }}>
            © {new Date().getFullYear()} Hun Phanuth
          </span>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:SUB }}>
            Phnom Penh, Cambodia
          </span>
        </div>
      </footer>
    </div>
  );
}