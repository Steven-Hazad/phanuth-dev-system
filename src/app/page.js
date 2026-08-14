"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight } from "lucide-react";

// ============================================================
// CLEAN — Nothing clever. Just well-made.
// White background. One accent. Good type. Lots of space.
// Font: Geist Sans (Vercel's font — clean, modern, trusted)
// Accent: #2563EB — honest blue, not trendy, not corporate grey
// Layout: full-width hero, then alternating white/grey sections
// No animations except subtle fade-in on scroll
// ============================================================

const BLUE  = "#2563EB";
const LBLUE = "#EFF6FF";
const INK   = "#09090B";
const BODY  = "#52525B";
const SUB   = "#A1A1AA";
const RULE  = "#E4E4E7";
const WHITE = "#FFFFFF";
const GREY  = "#FAFAFA";

const DEFAULT_PROJECTS = [
  { id:1, name:"SrovChlart", tag:"Mobile · AgriTech", year:"2024", description:"Rice marketplace for Cambodian farmers. React Native + TypeScript, live pricing, farmer-direct sales.", link:"#" },
  { id:2, name:"SafeHire", tag:"Mobile · Safety", year:"2024", description:"Anti-scam job verification platform protecting Cambodian workers from fraudulent job offers.", link:"#" },
  { id:3, name:"KourSrov", tag:"Web · AgriTech", year:"2023", description:"AgriTech platform for Cambodia's rice industry — market data, supply chain, farmer onboarding.", link:"#" },
];
const DEFAULT_SKILLS = [
  "React", "Next.js", "Node.js", "PostgreSQL", "Python",
  "React Native", "TypeScript", "Tailwind CSS", "Supabase",
  "REST APIs", "Expo", "PySpark", "Spark SQL", "Hadoop",
  "Aviation Safety", "Air Traffic Management",
];
const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"National Institute of Civil Aviation (NICA)", period:"2022 – Present" },
  { id:2, degree:"Bachelor of Computer Science", university:"Cambodian University for Specialties (CUS)", period:"2022 – Present" },
];

const T = {
  en: {
    name: "Hun Phanuth",
    role: "Full-Stack Developer",
    tag: "Computer Science · Air Traffic Management",
    about: "I build production software and I'm studying Air Traffic Management at NICA. I take on freelance projects — mostly POS systems, e-commerce platforms, and agritech applications — and I'm open to the right full-time role.",
    workTitle: "Projects",
    expTitle: "Experience",
    eduTitle: "Education",
    skillsTitle: "Skills",
    awardsTitle: "Certifications",
    contactTitle: "Get in touch",
    contactSub: "Open to freelance projects, full-time roles, and interesting problems.",
    contactBtn: "Send an email",
    experience: [
      { period:"Dec 2025 – Present", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh",
        points:["Building end-to-end POS systems and e-commerce platforms for Cambodian businesses.", "Backend architecture, database design, API routing, and responsive client-facing storefronts.", "Working directly with business owners from requirements through deployment."] },
      { period:"Jan 2013 – Jan 2019", title:"Operations Assistant", org:"HHH Printer · Takeo",
        points:["Managed daily print operations, digital design, and direct client service.", "Designed custom layouts and graphics from client briefs."] },
    ],
    awards: [
      { date:"Jun 2026", title:"3rd Place — UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { date:"Dec 2025", title:"Big Data Certification", org:"Hadoop · PySpark · Spark SQL · Apache Hive · Parquet" },
      { date:"Dec 2024", title:"Python Programming Certification", org:"Samsung Innovation Campus × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    nav: ["Projects", "Experience", "Skills", "Contact"],
    navIds: ["work", "experience", "skills", "contact"],
    toggle: "KH",
  },
  kh: {
    name: "ហ៊ុន ផានុត",
    role: "អ្នកអភិវឌ្ឍន៍ Full-Stack",
    tag: "វិទ្យាសាស្ត្រកុំព្យូទ័រ · គ្រប់គ្រងចរាចរណ៍អាកាស",
    about: "ខ្ញុំបង្កើតកម្មវិធីផលិតផល ហើយសិក្សា ATM នៅ NICA។ ខ្ញុំទទួលគម្រោង freelance — ភាគច្រើន POS, e-commerce, AgriTech — ហើយបើកចំហសម្រាប់ការងារត្រឹមត្រូវ។",
    workTitle: "គម្រោង",
    expTitle: "បទពិសោធន៍",
    eduTitle: "ការសិក្សា",
    skillsTitle: "ជំនាញ",
    awardsTitle: "វិញ្ញាបនបត្រ",
    contactTitle: "ទំនាក់ទំនង",
    contactSub: "បើកចំហសម្រាប់គម្រោង freelance, ការងារពេញម៉ោង, និងបញ្ហាគួរឱ្យចាប់អារម្មណ៍។",
    contactBtn: "ផ្ញើអ៊ីមែល",
    experience: [
      { period:"ធ្នូ 2025 – Now", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ",
        points:["ប្រព័ន្ធ POS និង e-commerce ពីដើមដល់ចប់ — backend, DB, API, storefront។", "ធ្វើការដោយផ្ទាល់ជាមួយម្ចាស់អាជីវកម្ម។"] },
      { period:"មករា 2013 – 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ",
        points:["គ្រប់គ្រងប្រតិបត្តិការការបោះពុម្ព, រចនាក្រាហ្វិក, សេវាកម្មអតិថិជន។"] },
    ],
    awards: [
      { date:"មិថុនា 2026", title:"លេខ ៣ — UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { date:"ធ្នូ 2025", title:"វិញ្ញាបនបត្រ Big Data", org:"Hadoop · PySpark · Spark SQL" },
      { date:"ធ្នូ 2024", title:"វិញ្ញាបនបត្រ Python", org:"Samsung Innovation Campus × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    nav: ["គម្រោង","បទពិសោធន៍","ជំនាញ","ទំនាក់ទំនង"],
    navIds: ["work","experience","skills","contact"],
    toggle: "EN",
  },
};

const fade = { hidden:{ opacity:0, y:16 }, show:{ opacity:1, y:0, transition:{ duration:0.45 } } };

export default function Clean() {
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
  const projects  = apiProjects.length > 0 ? apiProjects : DEFAULT_PROJECTS;
  const skills    = apiSkills.length > 0 ? apiSkills.map(s=>s.name) : DEFAULT_SKILLS;
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;

  return (
    <div className={lang==="kh"?"font-khmer":""} style={{ background:WHITE, color:INK, minHeight:"100vh" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Battambang:wght@400;700&display=swap');
        @font-face { font-family:'Geist'; src:local('Geist'); }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${WHITE}; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        .geist { font-family:'Geist','Inter',system-ui,sans-serif; }
        @media(max-width:640px){
          .hero-inner{flex-direction:column!important;gap:40px!important}
          .hero-photo{width:100%!important;max-width:280px!important;margin:0 auto!important}
          .proj-grid{grid-template-columns:1fr!important}
          .skill-wrap{column-count:2!important}
          .nav-mid{display:none!important}
          .contact-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <header style={{ position:"sticky", top:0, zIndex:50, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(8px)", borderBottom:`1px solid ${RULE}` }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 32px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span className="geist" style={{ fontWeight:700, fontSize:15, color:INK, letterSpacing:"-0.01em" }}>
            Phanuth<span style={{ color:BLUE }}>.</span>
          </span>

          <nav className="nav-mid" style={{ display:"flex", gap:28 }}>
            {d.nav.map((label,i)=>(
              <a key={i} href={`#${d.navIds[i]}`} className="geist"
                style={{ fontSize:14, fontWeight:500, color:BODY, textDecoration:"none", transition:"color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.color=INK}
                onMouseLeave={e=>e.currentTarget.style.color=BODY}>
                {label}
              </a>
            ))}
          </nav>

          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button onClick={()=>setLang(l=>l==="en"?"kh":"en")} className="geist"
              style={{ fontSize:13, fontWeight:600, background:"transparent", border:`1px solid ${RULE}`, color:BODY, padding:"5px 14px", cursor:"pointer", transition:"all 0.15s", borderRadius:6 }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=INK;e.currentTarget.style.color=INK;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=RULE;e.currentTarget.style.color=BODY;}}>
              {d.toggle}
            </button>
            <a href={`mailto:${d.contact.email}`} className="geist"
              style={{ fontSize:13, fontWeight:600, background:BLUE, color:WHITE, padding:"6px 16px", textDecoration:"none", borderRadius:6, transition:"opacity 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {d.contactBtn}
            </a>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section style={{ maxWidth:1080, margin:"0 auto", padding:"96px 32px 80px" }}>
        <motion.div initial="hidden" animate="show" variants={{ show:{ transition:{ staggerChildren:0.08 } } }}
          className="hero-inner" style={{ display:"flex", alignItems:"center", gap:64 }}>
          <div style={{ flex:1 }}>
            <motion.p variants={fade} className="geist" style={{ fontSize:14, fontWeight:500, color:BLUE, marginBottom:12 }}>
              {d.tag}
            </motion.p>
            <motion.h1 variants={fade} className="geist"
              style={{ fontSize:"clamp(40px,6vw,68px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.05, color:INK, marginBottom:20 }}>
              {d.name}
            </motion.h1>
            <motion.p variants={fade} className="geist"
              style={{ fontSize:17, lineHeight:1.75, color:BODY, maxWidth:480, marginBottom:32 }}>
              {d.about}
            </motion.p>
            <motion.div variants={fade} style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a href={`mailto:${d.contact.email}`} className="geist"
                style={{ fontSize:14, fontWeight:600, background:BLUE, color:WHITE, padding:"11px 24px", textDecoration:"none", borderRadius:8, display:"inline-flex", alignItems:"center", gap:8, transition:"opacity 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <Mail size={15}/>{d.contactBtn}
              </a>
              <a href={`https://github.com/${d.contact.github}`} target="_blank" rel="noreferrer" className="geist"
                style={{ fontSize:14, fontWeight:600, background:WHITE, color:INK, padding:"11px 20px", textDecoration:"none", border:`1px solid ${RULE}`, borderRadius:8, display:"inline-flex", alignItems:"center", gap:8, transition:"border-color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=INK}
                onMouseLeave={e=>e.currentTarget.style.borderColor=RULE}>
                <Github size={15}/>GitHub
              </a>
            </motion.div>

            {/* Contact meta row */}
            <motion.div variants={fade} style={{ display:"flex", gap:20, flexWrap:"wrap", marginTop:28 }}>
              {[
                { icon:<Phone size={12}/>, v:d.contact.phone },
                { icon:<MapPin size={12}/>, v:d.contact.location },
              ].map((c,i)=>(
                <div key={i} className="geist" style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:SUB }}>
                  {c.icon}{c.v}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div variants={fade} className="hero-photo"
            style={{ width:300, flexShrink:0, borderRadius:16, overflow:"hidden", background:GREY, border:`1px solid ${RULE}` }}>
            <img src="images/bl-steven.png" alt="Hun Phanuth"
              style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", objectPosition:"center top", display:"block" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="work" style={{ background:GREY, padding:"80px 32px", borderTop:`1px solid ${RULE}` }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}>
            <h2 className="geist" style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.02em", color:INK, marginBottom:8 }}>{d.workTitle}</h2>
            <p className="geist" style={{ fontSize:14, color:SUB, marginBottom:40 }}>
              More on <a href={`https://github.com/${d.contact.github}`} style={{ color:BLUE, textDecoration:"none" }}>GitHub ↗</a>
            </p>
          </motion.div>

          <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {projects.map((p,i)=>(
              <motion.a key={p.id} href={p.link||"#"} target="_blank" rel="noreferrer"
                initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}
                style={{ textDecoration:"none", display:"flex", flexDirection:"column", background:WHITE, border:`1px solid ${RULE}`, borderRadius:12, padding:"24px", transition:"box-shadow 0.2s, border-color 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 4px 20px rgba(37,99,235,0.1)"; e.currentTarget.style.borderColor=BLUE; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor=RULE; }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                  <span className="geist" style={{ fontSize:11, fontWeight:600, color:BLUE, background:LBLUE, padding:"3px 10px", borderRadius:99 }}>
                    {p.tag||DEFAULT_PROJECTS[i]?.tag||"Project"}
                  </span>
                  <ArrowUpRight size={16} style={{ color:RULE, flexShrink:0 }} />
                </div>
                <h3 className="geist" style={{ fontSize:17, fontWeight:700, color:INK, marginBottom:8, letterSpacing:"-0.01em" }}>
                  {p.title||p.name}
                </h3>
                <p className="geist" style={{ fontSize:13, lineHeight:1.65, color:BODY, flex:1 }}>
                  {p.description||p.desc}
                </p>
                <div className="geist" style={{ fontSize:12, color:SUB, marginTop:14 }}>
                  {p.year||DEFAULT_PROJECTS[i]?.year||"2024"}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section id="experience" style={{ background:WHITE, padding:"80px 32px", borderTop:`1px solid ${RULE}` }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}
            className="geist" style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.02em", color:INK, marginBottom:40 }}>
            {d.expTitle}
          </motion.h2>

          {d.experience.map((exp,i)=>(
            <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}
              style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:"0 40px", paddingBottom:36, marginBottom:36, borderBottom:`1px solid ${RULE}` }}>
              <div>
                <div className="geist" style={{ fontSize:13, color:SUB, lineHeight:1.6 }}>{exp.period}</div>
              </div>
              <div>
                <div className="geist" style={{ fontWeight:700, fontSize:17, color:INK, marginBottom:3, letterSpacing:"-0.01em" }}>{exp.title}</div>
                <div className="geist" style={{ fontSize:13, color:BLUE, fontWeight:600, marginBottom:14 }}>{exp.org}</div>
                <ul style={{ listStyle:"none", paddingLeft:0, display:"flex", flexDirection:"column", gap:7 }}>
                  {exp.points.map((pt,pi)=>(
                    <li key={pi} style={{ display:"flex", gap:10 }}>
                      <span style={{ color:RULE, flexShrink:0, fontSize:14, lineHeight:"22px" }}>—</span>
                      <span className="geist" style={{ fontSize:14, color:BODY, lineHeight:1.65 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Education inline */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}>
            <h3 className="geist" style={{ fontSize:18, fontWeight:700, color:INK, marginBottom:24, letterSpacing:"-0.01em" }}>{d.eduTitle}</h3>
            {education.map((edu,i)=>(
              <div key={edu.id} style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:"0 40px", marginBottom:18, paddingBottom:18, borderBottom:`1px solid ${RULE}` }}>
                <div className="geist" style={{ fontSize:13, color:SUB }}>{edu.period||`${edu.startDate} – ${edu.endDate}`}</div>
                <div>
                  <div className="geist" style={{ fontWeight:600, fontSize:15, color:INK, marginBottom:3 }}>{edu.degree}</div>
                  <div className="geist" style={{ fontSize:13, color:BODY }}>{edu.university}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ background:GREY, padding:"80px 32px", borderTop:`1px solid ${RULE}` }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}
            className="geist" style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.02em", color:INK, marginBottom:32 }}>
            {d.skillsTitle}
          </motion.h2>

          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}
            className="skill-wrap" style={{ columnCount:4, columnGap:16 }}>
            {skills.map((sk,i)=>(
              <div key={i} className="geist"
                style={{ fontSize:14, fontWeight:500, color:BODY, padding:"10px 0", borderBottom:`1px solid ${RULE}`, breakInside:"avoid", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:BLUE, flexShrink:0 }} />
                {sk}
              </div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}
            style={{ marginTop:48, borderTop:`1px solid ${RULE}`, paddingTop:40 }}>
            <h3 className="geist" style={{ fontSize:18, fontWeight:700, color:INK, marginBottom:24 }}>{d.awardsTitle}</h3>
            {d.awards.map((ach,i)=>(
              <div key={i} style={{ display:"flex", gap:20, alignItems:"baseline", paddingBottom:14, marginBottom:14, borderBottom:`1px solid ${RULE}`, flexWrap:"wrap" }}>
                <span className="geist" style={{ fontSize:12, color:SUB, flexShrink:0 }}>{ach.date}</span>
                <span className="geist" style={{ fontWeight:600, fontSize:14, color:INK }}>{ach.title}</span>
                <span className="geist" style={{ fontSize:13, color:BODY }}>{ach.org}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ background:WHITE, padding:"80px 32px", borderTop:`1px solid ${RULE}` }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px 80px" }}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}>
              <h2 className="geist" style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-0.03em", color:INK, marginBottom:12 }}>
                {d.contactTitle}
              </h2>
              <p className="geist" style={{ fontSize:16, color:BODY, lineHeight:1.7, marginBottom:28 }}>{d.contactSub}</p>
              <a href={`mailto:${d.contact.email}`} className="geist"
                style={{ fontSize:14, fontWeight:600, background:BLUE, color:WHITE, padding:"12px 28px", textDecoration:"none", borderRadius:8, display:"inline-flex", alignItems:"center", gap:8, transition:"opacity 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <Mail size={15}/>{d.contactBtn}
              </a>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={fade}
              style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:0 }}>
              {[
                { icon:<Mail size={14}/>, v:d.contact.email, href:`mailto:${d.contact.email}` },
                { icon:<Phone size={14}/>, v:d.contact.phone, href:null },
                { icon:<Github size={14}/>, v:`github.com/${d.contact.github}`, href:`https://github.com/${d.contact.github}` },
                { icon:<Linkedin size={14}/>, v:"linkedin.com/in/Hun-Phanuth", href:"#" },
                { icon:<MapPin size={14}/>, v:d.contact.location, href:null },
              ].map((c,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 0", borderBottom:`1px solid ${RULE}` }}>
                  <span style={{ color:BLUE, flexShrink:0 }}>{c.icon}</span>
                  {c.href ? (
                    <a href={c.href} className="geist"
                      style={{ fontSize:14, color:BODY, textDecoration:"none", transition:"color 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.color=INK}
                      onMouseLeave={e=>e.currentTarget.style.color=BODY}>
                      {c.v}
                    </a>
                  ) : (
                    <span className="geist" style={{ fontSize:14, color:BODY }}>{c.v}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${RULE}`, padding:"20px 32px" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <span className="geist" style={{ fontSize:14, fontWeight:600, color:INK }}>
            Phanuth<span style={{ color:BLUE }}>.</span>
          </span>
          <span className="geist" style={{ fontSize:13, color:SUB }}>© {new Date().getFullYear()} · Phnom Penh, Cambodia</span>
        </div>
      </footer>
    </div>
  );
}
