'use client'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react'

const YELLOW = '#FDD900'
const BLACK = '#0D0D0D'
const WHITE = '#FFFFFF'
const GREY = '#F5F5F5'
const BODY = '#555555'

const HP7Logo = ({ size = 40, inverted = false }) => {
  const bg = inverted ? YELLOW : BLACK
  const fg = inverted ? BLACK : YELLOW
  return (
    <div style={{
      width: size, height: size, background: bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 900, lineHeight: 1, flexShrink: 0,
    }}>
      <span style={{ fontSize: size * 0.32, color: fg, letterSpacing: '-1px' }}>HP</span>
      <span style={{ fontSize: size * 0.32, color: fg, letterSpacing: '-1px' }}>7</span>
    </div>
  )
}

export default function PageNjrPro({ data = {} }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('EN')
  const [scrolled, setScrolled] = useState(false)

  const {
    name = 'Hun Phanuth',
    title = 'Full-Stack Developer',
    bio = 'I build digital products that perform. Clean code, sharp interfaces, results that matter.',
    projects = [],
    skills = [],
    education = [],
    experience = [],
    contact = {}
  } = data

  const firstName = name.split(' ')[0] || 'Hun'
  const lastName = name.split(' ').slice(1).join(' ') || 'Phanuth'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Projects', 'Experience', 'Skills', 'Education', 'Contact']

  const stats = [
    { label: 'Projects Shipped', value: projects.length || '12+' },
    { label: 'Years Building', value: '3+' },
    { label: 'Technologies', value: skills.length || '20+' },
    { label: 'Open Source', value: '100%' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Montserrat', sans-serif; background: ${WHITE}; color: ${BLACK}; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: ${YELLOW}; color: ${BLACK}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BLACK}; }
        ::-webkit-scrollbar-thumb { background: ${YELLOW}; }

        .nav-link {
          font-size: 13px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: ${WHITE}; opacity: 0.7;
          transition: opacity 0.2s, color 0.2s; cursor: pointer;
        }
        .nav-link:hover { opacity: 1; color: ${YELLOW}; }
        .nav-scrolled .nav-link { color: ${BLACK}; }
        .nav-scrolled .nav-link:hover { color: ${YELLOW}; opacity: 1; }

        .hero-name-solid {
          font-size: clamp(64px, 11vw, 160px);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -4px;
          color: ${BLACK};
          display: block;
        }
        .hero-name-outline {
          font-size: clamp(64px, 11vw, 160px);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -4px;
          color: transparent;
          -webkit-text-stroke: 2px ${BLACK};
          display: block;
        }

        .project-card {
          background: ${GREY};
          border-top: 4px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .project-card:hover {
          background: ${BLACK};
          border-top-color: ${YELLOW};
        }
        .project-card:hover .project-title { color: ${WHITE}; }
        .project-card:hover .project-desc { color: rgba(255,255,255,0.6); }
        .project-card:hover .project-tech span {
          background: rgba(253,217,0,0.15);
          color: ${YELLOW};
        }
        .project-card:hover .project-arrow { color: ${YELLOW}; }

        .skill-tile {
          background: ${GREY};
          padding: 20px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: ${BLACK};
          transition: all 0.25s ease;
          cursor: default;
        }
        .skill-tile:hover {
          background: ${BLACK};
          color: ${YELLOW};
        }

        .cta-btn-black {
          display: inline-block;
          background: ${BLACK};
          color: ${WHITE};
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 18px 40px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .cta-btn-black:hover { background: ${WHITE}; color: ${BLACK}; }

        .cta-btn-yellow {
          display: inline-block;
          background: ${YELLOW};
          color: ${BLACK};
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 18px 40px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .cta-btn-yellow:hover { background: ${BLACK}; color: ${WHITE}; }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${YELLOW};
          margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .edu-grid { grid-template-columns: 1fr !important; }
          .contact-flex { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? WHITE : 'transparent',
        borderBottom: scrolled ? `1px solid ${GREY}` : 'none',
        transition: 'background 0.3s, border 0.3s',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      }} className={scrolled ? 'nav-scrolled' : ''}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
        }}>
          <HP7Logo size={36} inverted={scrolled} />

          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="nav-link"
                style={{ color: scrolled ? BLACK : WHITE }}
              >{l}</a>
            ))}
            <button
              onClick={() => setLang(lang === 'EN' ? 'KH' : 'EN')}
              style={{
                background: 'none', border: `2px solid ${scrolled ? BLACK : WHITE}`,
                color: scrolled ? BLACK : WHITE,
                fontFamily: 'Montserrat', fontWeight: 700, fontSize: 11,
                letterSpacing: 2, padding: '6px 12px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >{lang === 'EN' ? 'KH' : 'EN'}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: WHITE, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 24px 80px', paddingTop: '120px',
        maxWidth: 1200, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 60, flexWrap: 'wrap' }}
          className="hero-grid">
          {/* Name Block */}
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ marginBottom: 24 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: YELLOW, padding: '6px 14px',
                fontSize: 11, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase', color: BLACK,
                marginBottom: 32,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: BLACK, display: 'inline-block',
                  animation: 'pulse 2s infinite',
                }}></span>
                Available for Work
              </span>
            </div>
            <span className="hero-name-solid">{firstName}</span>
            <span className="hero-name-outline">{lastName}</span>
            <p style={{
              marginTop: 32, fontSize: 16, color: BODY, lineHeight: 1.7,
              maxWidth: 440, fontWeight: 400,
            }}>{bio}</p>
            <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#projects" className="cta-btn-black">View Projects</a>
              <a href="#contact" className="cta-btn-yellow">Get in Touch</a>
            </div>
          </div>

          {/* Photo Block */}
          <div style={{ flex: '0 0 auto', position: 'relative' }}>
            <div style={{
              width: 320, height: 400,
              background: GREY,
              position: 'relative',
            }}>
              {/* Yellow offset border */}
              <div style={{
                position: 'absolute', top: -12, right: -12,
                width: '100%', height: '100%',
                border: `4px solid ${YELLOW}`,
                zIndex: 0,
              }}></div>
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${GREY} 0%, #e0e0e0 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1,
              }}>
                <HP7Logo size={80} />
              </div>
            </div>
          </div>
        </div>

        <a href="#projects" style={{
          marginTop: 80, display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
          color: BODY, transition: 'color 0.2s',
        }}>
          <ChevronDown size={16} />
          Scroll
        </a>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: YELLOW, padding: '48px 24px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '24px 16px',
              borderRight: i < stats.length - 1 ? `1px solid rgba(0,0,0,0.15)` : 'none',
            }}>
              <div style={{
                fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900,
                color: BLACK, lineHeight: 1, letterSpacing: -2,
              }}>{s.value}</div>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)',
                marginTop: 8,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: '100px 24px', background: WHITE }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-label">Selected Work</div>
              <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>
                Projects
              </h2>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer"
              style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, color: BODY, display: 'flex', alignItems: 'center', gap: 4 }}>
              All on GitHub <ArrowUpRight size={14} />
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 2,
          }} className="projects-grid">
            {(projects.length > 0 ? projects : [
              { title: 'Portfolio System', description: 'Full-stack portfolio with admin dashboard, project management, and bilingual support.', techStack: ['Next.js', 'Prisma', 'MySQL'], liveLink: '#', githubLink: '#' },
              { title: 'E-Commerce Platform', description: 'Multi-vendor marketplace with real-time inventory and payment integration.', techStack: ['React', 'Node.js', 'Stripe'], liveLink: '#', githubLink: '#' },
              { title: 'Dashboard Analytics', description: 'Real-time data visualization platform with customizable widgets.', techStack: ['TypeScript', 'D3.js', 'WebSocket'], liveLink: '#', githubLink: '#' },
              { title: 'Mobile App', description: 'Cross-platform mobile application with offline-first architecture.', techStack: ['React Native', 'SQLite', 'Redux'], liveLink: '#', githubLink: '#' },
            ]).map((p, i) => (
              <div key={i} className="project-card" style={{ padding: '36px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: 3,
                    textTransform: 'uppercase', color: BODY,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <a href={p.liveLink || p.githubLink || '#'}
                    target="_blank" rel="noreferrer"
                    className="project-arrow"
                    style={{ color: BLACK, transition: 'color 0.3s' }}>
                    <ArrowUpRight size={20} />
                  </a>
                </div>
                <h3 className="project-title" style={{
                  fontSize: 22, fontWeight: 900, letterSpacing: -0.5,
                  marginBottom: 12, color: BLACK, transition: 'color 0.3s',
                }}>{p.title}</h3>
                <p className="project-desc" style={{
                  fontSize: 14, color: BODY, lineHeight: 1.6, marginBottom: 24,
                  transition: 'color 0.3s',
                }}>{p.description}</p>
                <div className="project-tech" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {(p.techStack || []).map((t, j) => (
                    <span key={j} style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: 1,
                      textTransform: 'uppercase', background: 'rgba(0,0,0,0.06)',
                      color: BLACK, padding: '4px 10px', transition: 'all 0.3s',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: GREY, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label">Career</div>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, letterSpacing: -2, marginBottom: 60 }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {(experience.length > 0 ? experience : [
              { role: 'Senior Developer', org: 'Tech Company', period: '2023 — Present', desc: 'Led development of core product features, mentored junior developers, and improved system performance by 40%.' },
              { role: 'Full-Stack Developer', org: 'Startup', period: '2022 — 2023', desc: 'Built scalable web applications from scratch using modern frameworks and cloud infrastructure.' },
            ]).map((e, i) => (
              <div key={i} style={{
                background: WHITE, padding: '36px 40px',
                display: 'grid', gridTemplateColumns: '1fr auto',
                gap: 24, alignItems: 'start',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                    <span style={{
                      width: 12, height: 12, background: YELLOW, flexShrink: 0,
                    }}></span>
                    <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5 }}>{e.role}</h3>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: 1,
                      textTransform: 'uppercase', background: BLACK,
                      color: YELLOW, padding: '3px 10px',
                    }}>{e.org || e.organization}</span>
                  </div>
                  <p style={{ fontSize: 14, color: BODY, lineHeight: 1.7, paddingLeft: 28 }}>{e.desc || e.description}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: BODY, whiteSpace: 'nowrap' }}>{e.period || e.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ background: BLACK, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label">Background</div>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, letterSpacing: -2, color: WHITE, marginBottom: 60 }}>
            Education
          </h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 2,
          }} className="edu-grid">
            {(education.length > 0 ? education : [
              { institution: 'University of Technology', degree: 'B.Sc. Computer Science', year: '2020 — 2024', gpa: '3.8 GPA' },
            ]).map((e, i) => (
              <div key={i} style={{
                background: i === 0 ? '#1a1a1a' : '#111',
                borderTop: i === 0 ? `4px solid ${YELLOW}` : '4px solid #333',
                padding: '36px 32px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: YELLOW, textTransform: 'uppercase', marginBottom: 16 }}>
                  {e.year || e.duration}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: WHITE, marginBottom: 8, letterSpacing: -0.5 }}>
                  {e.institution}
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>{e.degree}</p>
                {e.gpa && <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  textTransform: 'uppercase', color: YELLOW,
                }}>{e.gpa}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: WHITE, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label">Tech Stack</div>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, letterSpacing: -2, marginBottom: 60 }}>
            Skills
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 2,
          }} className="skills-grid">
            {(skills.length > 0 ? skills : [
              'Next.js', 'React', 'TypeScript', 'Node.js', 'Prisma', 'MySQL',
              'Tailwind CSS', 'Framer Motion', 'Git', 'Docker', 'AWS', 'Figma',
            ]).map((s, i) => (
              <div key={i} className="skill-tile">
                {typeof s === 'string' ? s : s.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: YELLOW, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 48,
          }} className="contact-flex">
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 4,
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 16,
              }}>Let's Work Together</div>
              <h2 style={{
                fontSize: 'clamp(40px, 7vw, 96px)', fontWeight: 900,
                letterSpacing: -3, color: BLACK, lineHeight: 0.9, marginBottom: 32,
              }}>
                Get in<br />
                <span style={{
                  color: 'transparent',
                  WebkitTextStroke: `3px ${BLACK}`,
                }}>Touch</span>
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.65)', maxWidth: 400, lineHeight: 1.7 }}>
                Available for freelance projects, full-time roles, and collaborations. Let's build something great.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contact.email && (
                <a href={`mailto:${contact.email}`} style={{
                  fontSize: 20, fontWeight: 900, color: BLACK,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  {contact.email} <ArrowUpRight size={20} />
                </a>
              )}
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noreferrer"
                  style={{ fontSize: 15, fontWeight: 700, color: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  GitHub <ArrowUpRight size={14} />
                </a>
              )}
              <div style={{ marginTop: 16 }}>
                <a href={`mailto:${contact.email || 'hello@example.com'}`}
                  className="cta-btn-black">
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: BLACK, padding: '32px 24px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <HP7Logo size={32} />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
              {name}
            </span>
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
            {new Date().getFullYear()} — All rights reserved
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </>
  )
}
