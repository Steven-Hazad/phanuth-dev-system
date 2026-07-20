"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight } from "lucide-react";

// ============================================================
// THE PROFILE — editorial magazine portfolio
// Wired / Fast Company profile feature aesthetic
// Font: Playfair Display Condensed (headline) + Libre Baskerville
//       (body/article) + Barlow Condensed (masthead/labels)
// Ink: #1A1714 print-black · Paper: #F8F6F0 newsprint-white
// Red: #C41A1A — masthead marker + pull-quote mark ONLY
// Signature: "The developer who reads radar." pull quote at 48px
// ============================================================

const RED   = "#C41A1A";
const INK   = "#1A1714";
const INK2  = "#2B2825";
const META  = "#8C7B6B";
const PAPER = "#F8F6F0";
const RULE  = "#E8E4DC";

const DEFAULT_EDU = [
  { id:1, degree:"Bachelor of Air Traffic Management", university:"National Institute of Civil Aviation (NICA)", startDate:"2022", endDate:"Present" },
  { id:2, degree:"Bachelor of Computer Science", university:"Cambodian University for Specialties (CUS)", startDate:"2022", endDate:"Present" },
];
const DEFAULT_SKILLS = [
  { id:1, name:"React / Next.js", level:80 }, { id:2, name:"Node.js", level:70 },
  { id:3, name:"PostgreSQL", level:70 }, { id:4, name:"Python", level:75 },
  { id:5, name:"Aviation Safety", level:70 }, { id:6, name:"Data Analysis", level:70 },
  { id:7, name:"POS Systems", level:80 }, { id:8, name:"Air Traffic Mgmt", level:70 },
];
const DEFAULT_PROJECTS = [
  { id:1, name:"SrovChlart", description:"Rice marketplace mobile app for Cambodian farmers — React Native + TypeScript.", link:"#" },
  { id:2, name:"SafeHire", description:"Anti-scam job verification platform — React Native Expo.", link:"#" },
  { id:3, name:"KourSrov", description:"AgriTech pitch platform for Cambodia's rice industry.", link:"#" },
];

const CONTENT = {
  en: {
    issue: `Vol. ${new Date().getFullYear()} — Issue 01`,
    section: "PROFILE",
    kicker: "BUILDERS & PIONEERS",
    headline: "The developer\nwho reads radar.",
    subhead: "Hun Phanuth writes code by day and studies airspace by night. Meet the student who won't choose between two disciplines.",
    pullquote: "I don't see them as separate fields. Aviation and software engineering both come down to one thing: if you get it wrong, something fails.",
    byline: "Portfolio of Hun Phanuth",
    location: "Phnom Penh, Cambodia",
    body1: "There's a particular kind of discipline that comes from studying Air Traffic Management. Every decision is consequential. Ambiguity isn't tolerated. Procedures exist for a reason. It's not the obvious background for a full-stack developer — but for Hun Phanuth, it's exactly what makes him different.",
    body2: "Since December 2025, Phanuth has been building production software for Cambodian businesses — POS systems, e-commerce platforms, agritech applications — while simultaneously cross-training at the National Institute of Civil Aviation in Phnom Penh. He's not choosing one path. He's building both.",
    workLabel: "Selected work",
    expLabel: "Career",
    eduLabel: "Education",
    skillsLabel: "Technical profile",
    awardsLabel: "Recognition",
    contactLabel: "Contact",
    contactLine: "Open to serious projects and the right full-time role.",
    experience: [
      { period:"Dec 2025 – Present", title:"Full-Stack Freelancer", org:"Independent · Phnom Penh",
        desc:"Delivers end-to-end digital products for Cambodian businesses — POS systems, e-commerce storefronts, and agritech platforms. Backend architecture, database design, API routing." },
      { period:"Jan 2013 – Jan 2019", title:"Operations Assistant", org:"HHH Printer · Takeo",
        desc:"Managed print operations, digital design, and client service at a family printing business. First exposure to operational systems and business workflow." },
    ],
    achievements: [
      { date:"Jun 2026", title:"3rd Place, UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { date:"Dec 2025", title:"Big Data Certification", org:"Hadoop · PySpark · Spark SQL · Parquet" },
      { date:"Dec 2024", title:"Python Certification", org:"Samsung Innovation Campus × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"Phnom Penh, Cambodia", phone:"+855 715 303 622" },
    toggle: "KH",
    nav: ["Work", "Experience", "Skills", "Contact"],
    navIds: ["work", "experience", "skills", "contact"],
  },
  kh: {
    issue: `ឆ្នាំ ${new Date().getFullYear()} — លេខ ០១`,
    section: "ប្រវត្តិរូប",
    kicker: "អ្នកបង្កើត",
    headline: "អ្នកបង្កើតកម្មវិធី\nដែលអានរ៉ាដា។",
    subhead: "ហ៊ុន ផានុត សរសេរកូដពេលថ្ងៃ និងសិក្សាចរាចរណ៍អាកាសពេលយប់។",
    pullquote: "ខ្ញុំមិនមើលពួកវាជាវិស័យដាច់ដោយឡែកទេ។ Aviation និង software engineering ទាំងពីរអាស្រ័យលើរឿងតែមួយ: ប្រសិនបើខ្ញុំខុស វានឹងបរាជ័យ។",
    byline: "ប្រវត្តិរូបរបស់ ហ៊ុន ផានុត",
    location: "ភ្នំពេញ, កម្ពុជា",
    body1: "មានវិន័យពិសេសមួយដែលមកពីការសិក្សាការគ្រប់គ្រងចរាចរណ៍អាកាស។ ការសម្រេចចិត្តគ្រប់យ៉ាងមានផលប៉ះពាល់។ ភាពមិនច្បាស់លាស់មិនត្រូវបានអត់ឱននោះទេ។",
    body2: "ចាប់តាំងពីខែធ្នូ ២០២៥ ផានុតកំពុងបង្កើតកម្មវិធីផលិតផលសម្រាប់អាជីវកម្មខ្មែរ — ប្រព័ន្ធ POS, e-commerce, AgriTech — ខណៈពេលសិក្សានៅ NICA។",
    workLabel: "គម្រោងដែលបានជ្រើស",
    expLabel: "អាជីព",
    eduLabel: "ការសិក្សា",
    skillsLabel: "ប្រវត្តិបច្ចេកទេស",
    awardsLabel: "សមិទ្ធផល",
    contactLabel: "ទំនាក់ទំនង",
    contactLine: "បើកចំហសម្រាប់គម្រោងធ្ងន់ធ្ងរ និងការងារត្រឹមត្រូវ។",
    experience: [
      { period:"ធ្នូ 2025 – បច្ចុប្បន្ន", title:"Full-Stack Freelancer", org:"Freelancer · ភ្នំពេញ",
        desc:"ផ្តល់ផលិតផលឌីជីថលពីដើមដល់ចប់ — POS, e-commerce, AgriTech។ Backend, DB, API។" },
      { period:"មករា 2013 – មករា 2019", title:"ជំនួយការប្រតិបត្តិការ", org:"HHH Printer · តាកែវ",
        desc:"គ្រប់គ្រងប្រតិបត្តិការការបោះពុម្ព រចនាក្រាហ្វិក និងសេវាកម្មអតិថិជន។" },
    ],
    achievements: [
      { date:"មិថុនា 2026", title:"លេខ ៣, UniPreneurCamp Cluster 1", org:"Khmer Enterprise" },
      { date:"ធ្នូ 2025", title:"វិញ្ញាបនបត្រ Big Data", org:"Hadoop · PySpark · Spark SQL" },
      { date:"ធ្នូ 2024", title:"វិញ្ញាបនបត្រ Python", org:"Samsung Innovation Campus × RUPP" },
    ],
    contact: { email:"hunphanut14@gmail.com", github:"Steven-Hazad", linkedin:"Hun Phanuth", location:"ភ្នំពេញ, កម្ពុជា", phone:"+855 715 303 622" },
    toggle: "EN",
    nav: ["គម្រោង", "បទពិសោធន៍", "ជំនាញ", "ទំនាក់ទំនង"],
    navIds: ["work", "experience", "skills", "contact"],
  },
};

function ColumnRule() {
  return <div style={{ width:1, background:RULE, alignSelf:"stretch", margin:"0 32px" }} />;
}

function CapsLabel({ children, style={} }) {
  return (
    <div style={{
      fontFamily:"'Barlow Condensed',sans-serif",
      fontWeight:600, fontSize:11, letterSpacing:"0.18em",
      textTransform:"uppercase", color:META,
      ...style,
    }}>{children}</div>
  );
}

export default function Editorial() {
  const [lang, setLang] = useState("en");
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

  const d = CONTENT[lang];
  const education = apiEdu.length > 0 ? apiEdu : DEFAULT_EDU;
  const skills    = apiSkills.length > 0 ? apiSkills : DEFAULT_SKILLS;
  const projects  = apiProjects.length > 0 ? apiProjects : DEFAULT_PROJECTS;

  return (
    <div className={lang==="kh"?"font-khmer":""} style={{ minHeight:"100vh", background:PAPER, color:INK }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Barlow+Condensed:wght@400;500;600;700&family=Battambang:wght@400;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:${PAPER}; }
        .font-khmer * { font-family:'Battambang',sans-serif!important; }
        @media(max-width:700px){
          .hero-split{grid-template-columns:1fr!important}
          .hero-img-cell{display:none!important}
          .two-col-body{grid-template-columns:1fr!important}
          .col-rule{display:none!important}
        }
      `}</style>

      {/* ══ MASTHEAD ══ */}
      <header style={{ borderBottom:`2px solid ${INK}`, background:PAPER }}>
        {/* Top strip */}
        <div style={{ borderBottom:`1px solid ${RULE}`, padding:"8px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", gap:20, alignItems:"center" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:META }}>{d.issue}</span>
            <span style={{ width:1, height:12, background:RULE, display:"inline-block" }} />
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:META }}>{d.location}</span>
          </div>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button onClick={()=>setLang(l=>l==="en"?"kh":"en")} style={{
              fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:11,
              letterSpacing:"0.15em", textTransform:"uppercase",
              background:"transparent", border:`1px solid ${RULE}`, color:META,
              padding:"3px 10px", cursor:"pointer",
            }}>{d.toggle}</button>
          </div>
        </div>

        {/* Publication name */}
        <div style={{ padding:"14px 40px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:RED }}>■ {d.section}</div>
          </div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:28, letterSpacing:"-0.02em", color:INK, textAlign:"center", flex:1 }}>
            THE PORTFOLIO
          </div>
          <nav style={{ display:"flex", gap:20 }}>
            {d.nav.map((label, i) => (
              <a key={i} href={`#${d.navIds[i]}`} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:500, fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", color:INK2, textDecoration:"none" }}>{label}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* ══ HERO SPREAD ══ */}
      <section className="hero-split" style={{ display:"grid", gridTemplateColumns:"1fr 420px", minHeight:480, borderBottom:`1px solid ${RULE}` }}>

        {/* Text side */}
        <div style={{ padding:"48px 40px 40px", display:"flex", flexDirection:"column", justifyContent:"space-between", borderRight:`1px solid ${RULE}` }}>
          <div>
            <CapsLabel style={{ marginBottom:16 }}>{d.kicker}</CapsLabel>
            <h1 style={{
              fontFamily:"'Playfair Display',serif",
              fontWeight:900,
              fontSize:"clamp(44px,5.5vw,80px)",
              lineHeight:1.0,
              letterSpacing:"-0.02em",
              color:INK,
              marginBottom:24,
              whiteSpace:"pre-line",
            }}>{d.headline}</h1>
            <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:16, lineHeight:1.7, color:INK2, maxWidth:480 }}>{d.subhead}</p>
          </div>

          <div style={{ display:"flex", gap:24, alignItems:"center", marginTop:32, paddingTop:24, borderTop:`1px solid ${RULE}` }}>
            <div>
              <CapsLabel>Byline</CapsLabel>
              <div style={{ fontFamily:"'Libre Baskerville',serif", fontSize:14, color:INK, marginTop:4 }}>{d.byline}</div>
            </div>
            <div style={{ width:1, height:32, background:RULE }} />
            <div>
              <CapsLabel>Contact</CapsLabel>
              <a href={`mailto:${d.contact.email}`} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, fontWeight:500, color:INK, textDecoration:"none", letterSpacing:"0.04em", display:"block", marginTop:4 }}>{d.contact.email}</a>
            </div>
          </div>
        </div>

        {/* Photo side */}
        <div className="hero-img-cell" style={{ overflow:"hidden", position:"relative" }}>
          <img src="images/bl-steven.png" alt="Hun Phanuth"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"contrast(1.05)" }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 16px", background:"rgba(248,246,240,0.92)", borderTop:`1px solid ${RULE}` }}>
            <CapsLabel>Hun Phanuth, Phnom Penh — {new Date().getFullYear()}</CapsLabel>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 40px" }}>

        {/* ══ ARTICLE BODY — 2 col ══ */}
        <section style={{ padding:"48px 0 0" }}>
          <div className="two-col-body" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
            <div style={{ paddingRight:32 }}>
              <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:15, lineHeight:1.85, color:INK2, marginBottom:20 }}>{d.body1}</p>
            </div>
            <div className="col-rule" style={{ width:1, background:RULE }} />
            <div style={{ paddingLeft:32 }}>
              <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:15, lineHeight:1.85, color:INK2 }}>{d.body2}</p>
            </div>
          </div>
        </section>

        {/* ══ PULL QUOTE — signature element ══ */}
        <section style={{ padding:"48px 0", borderTop:`1px solid ${RULE}`, borderBottom:`1px solid ${RULE}`, margin:"40px 0 0" }}>
          <div style={{ position:"relative", paddingLeft:48 }}>
            <span style={{
              position:"absolute", left:0, top:-8,
              fontFamily:"'Playfair Display',serif",
              fontSize:80, lineHeight:1,
              color:RED, fontWeight:900,
              userSelect:"none",
            }}>"</span>
            <blockquote style={{
              fontFamily:"'Playfair Display',serif",
              fontStyle:"italic",
              fontWeight:400,
              fontSize:"clamp(22px,3vw,36px)",
              lineHeight:1.4,
              color:INK,
              letterSpacing:"-0.01em",
            }}>
              {d.pullquote}
            </blockquote>
            <CapsLabel style={{ marginTop:20 }}>— Hun Phanuth</CapsLabel>
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section id="work" style={{ padding:"48px 0", borderBottom:`1px solid ${RULE}` }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:28 }}>
            <CapsLabel>{d.workLabel}</CapsLabel>
            <div style={{ flex:1, height:1, background:RULE }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:0, border:`1px solid ${RULE}` }}>
           {projects.map((p, i) => (
  <motion.a 
    key={p.id} 
    href={p.link || "#"} 
    target={p.link && p.link !== "#" ? "_blank" : undefined} 
    rel="noreferrer"
    initial={{ opacity: 0 }} 
    whileInView={{ opacity: 1 }} 
    viewport={{ once: true }} 
    transition={{ delay: i * 0.07 }}
    style={{
      textDecoration: "none", 
      display: "block",
      padding: "24px 24px 20px",
      borderRight: i < projects.length - 1 ? `1px solid ${RULE}` : "none",
    }}
  >
    {/* Removed the stray arrow function line that was causing the error */}
    <ProjectInner name={p.title || p.name} desc={p.description} />
  </motion.a>
))}
          </div>
        </section>

        {/* ══ EXPERIENCE + EDUCATION ══ */}
        <section id="experience" style={{ padding:"48px 0", borderBottom:`1px solid ${RULE}` }}>
          <div className="two-col-body" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
            {/* Experience */}
            <div style={{ paddingRight:40 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:24 }}>
                <CapsLabel>{d.expLabel}</CapsLabel>
                <div style={{ flex:1, height:1, background:RULE }} />
              </div>
              {d.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom:24, paddingBottom:24, borderBottom: i < d.experience.length-1 ? `1px solid ${RULE}` : "none" }}>
                  <CapsLabel style={{ marginBottom:6 }}>{exp.period}</CapsLabel>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:18, color:INK, marginBottom:3 }}>{exp.title}</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:500, letterSpacing:"0.08em", color:META, marginBottom:8 }}>{exp.org}</div>
                  <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:13, lineHeight:1.7, color:INK2 }}>{exp.desc}</p>
                </div>
              ))}
            </div>

            <div className="col-rule" style={{ width:1, background:RULE }} />

            {/* Education + Awards */}
            <div style={{ paddingLeft:40 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:24 }}>
                <CapsLabel>{d.eduLabel}</CapsLabel>
                <div style={{ flex:1, height:1, background:RULE }} />
              </div>
              {education.map((edu, i) => (
                <div key={edu.id} style={{ marginBottom:18, paddingBottom:18, borderBottom:`1px solid ${RULE}` }}>
                  <CapsLabel style={{ marginBottom:4 }}>{edu.startDate} – {edu.endDate}</CapsLabel>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:15, color:INK, marginBottom:2 }}>{edu.degree}</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, color:META, letterSpacing:"0.06em" }}>{edu.university}</div>
                </div>
              ))}

              <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:20, marginTop:8 }}>
                <CapsLabel>{d.awardsLabel}</CapsLabel>
                <div style={{ flex:1, height:1, background:RULE }} />
              </div>
              {d.achievements.map((ach, i) => (
                <div key={i} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", gap:12, alignItems:"baseline" }}>
                    <CapsLabel style={{ flexShrink:0 }}>{ach.date}</CapsLabel>
                    <span style={{ fontFamily:"'Libre Baskerville',serif", fontSize:13, color:INK, fontWeight:700 }}>{ach.title}</span>
                  </div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, color:META, letterSpacing:"0.06em", marginTop:2, paddingLeft:0 }}>{ach.org}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section id="skills" style={{ padding:"48px 0", borderBottom:`1px solid ${RULE}` }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:28 }}>
            <CapsLabel>{d.skillsLabel}</CapsLabel>
            <div style={{ flex:1, height:1, background:RULE }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:"14px 32px" }}>
            {skills.map((sk, i) => (
              <div key={sk.id||i}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:13, letterSpacing:"0.06em", color:INK }}>{sk.name}</span>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, color:META }}>{sk.level||70}%</span>
                </div>
                <div style={{ height:1, background:RULE }}>
                  <motion.div initial={{ width:0 }} whileInView={{ width:`${sk.level||70}%` }} viewport={{ once:true }} transition={{ duration:0.7, delay:i*0.04 }}
                    style={{ height:"100%", background:INK }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" style={{ padding:"56px 0 80px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"start", flexWrap:"wrap" }} className="two-col-body">
            <div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"clamp(32px,5vw,56px)", lineHeight:1.05, letterSpacing:"-0.02em", color:INK, marginBottom:12 }}>
                {d.contactLabel}
              </h2>
              <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:15, color:INK2, lineHeight:1.7 }}>{d.contactLine}</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, minWidth:220 }}>
              {[
                { icon:<Mail size={13}/>, v:d.contact.email, href:`mailto:${d.contact.email}` },
                { icon:<Phone size={13}/>, v:d.contact.phone, href:`tel:${d.contact.phone}` },
                { icon:<Github size={13}/>, v:`github.com/${d.contact.github}`, href:`https://github.com/${d.contact.github}` },
                { icon:<Linkedin size={13}/>, v:"linkedin.com/in/Hun-Phanuth", href:"#" },
                { icon:<MapPin size={13}/>, v:d.contact.location, href:null },
              ].map((c,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ color:META, flexShrink:0 }}>{c.icon}</span>
                  {c.href ? (
                    <a href={c.href} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, fontWeight:500, letterSpacing:"0.04em", color:INK, textDecoration:"none" }}
                      onMouseEnter={e=>e.currentTarget.style.color=RED}
                      onMouseLeave={e=>e.currentTarget.style.color=INK}>
                      {c.v}
                    </a>
                  ) : (
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, color:META, letterSpacing:"0.04em" }}>{c.v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop:`2px solid ${INK}`, background:INK, padding:"16px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:16, color:PAPER, letterSpacing:"-0.01em" }}>THE PORTFOLIO</span>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:META }}>Hun Phanuth · Phnom Penh · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

// Extracted to avoid inline anonymous component issue with hover
function ProjectInner({ name, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ cursor:"pointer", padding:"24px", margin:"-24px", transition:"background 0.15s", background: hov ? INK : "transparent" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:18, color: hov ? PAPER : INK, transition:"color 0.15s" }}>{name}</span>
        <ArrowUpRight size={16} style={{ color: hov ? PAPER : META, transition:"color 0.15s", flexShrink:0 }} />
      </div>
      <p style={{ fontFamily:"'Libre Baskerville',serif", fontSize:13, lineHeight:1.65, color: hov ? "#C8C0B4" : META, transition:"color 0.15s", margin:0 }}>{desc}</p>
    </div>
  );
}
