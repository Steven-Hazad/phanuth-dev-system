"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
import { Sun, Moon, Cpu, Code2, Terminal, User, Briefcase, GraduationCap, Mail, Trophy, Globe, ArrowUpRight, Github, Activity } from "lucide-react";

// ============================================================
// 🎨 ANIMATED BACKGROUND ENGINE
// Two modes: "standard" (clean mesh gradient) | "premium" (full particle + aurora system)
// ============================================================

function AnimatedBackground({ isDark, mode = "premium" }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // ── STANDARD: Flowing aurora mesh ──
    if (mode === "standard") {
      let t = 0;
      const orbs = [
        { x: 0.2, y: 0.3, r: 0.45, speed: 0.0007, color: isDark ? "59,130,246" : "59,130,246" },
        { x: 0.8, y: 0.7, r: 0.40, speed: 0.0009, color: isDark ? "139,92,246" : "99,102,241" },
        { x: 0.5, y: 0.1, r: 0.35, speed: 0.0006, color: isDark ? "6,182,212" : "14,165,233" },
      ];

  
    }

    // ── PREMIUM: Particles + Aurora + Noise trails ──
    if (mode === "premium") {
      // Init particles
      const COUNT = 90;
      particlesRef.current = Array.from({ length: COUNT }, (_, i) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.5 + 0.2,
      
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      }));

      let t = 0;
      const AURORA_BANDS = [
        { y: 0.25, amp: 80, freq: 0.003, speed: 0.0008, color: isDark ? "37,99,235" : "59,130,246" },
        { y: 0.45, amp: 60, freq: 0.004, speed: 0.0012, color: isDark ? "109,40,217" : "99,102,241" },
        { y: 0.65, amp: 50, freq: 0.002, speed: 0.0006, color: isDark ? "6,148,162" : "14,165,233" },
      ];

      const drawAurora = () => {
        AURORA_BANDS.forEach((band, bi) => {
          const points = [];
          const steps = 12;
          for (let i = 0; i <= steps; i++) {
            const px = (i / steps) * canvas.width;
            const py =
              band.y * canvas.height +
              Math.sin(px * band.freq + t * band.speed * 1000 + bi) * band.amp +
              Math.sin(px * band.freq * 2.3 + t * band.speed * 700) * band.amp * 0.4;
            points.push({ x: px, y: py });
          }

          ctx.beginPath();
          ctx.moveTo(points[0].x, 0);
          for (let i = 0; i < points.length; i++) {
            if (i === 0) ctx.lineTo(points[i].x, points[i].y);
            else {
              const cp = points[i - 1];
              ctx.quadraticCurveTo(cp.x, cp.y, (cp.x + points[i].x) / 2, (cp.y + points[i].y) / 2);
            }
          }
          ctx.lineTo(canvas.width, 0);
          ctx.closePath();

          const grad = ctx.createLinearGradient(0, band.y * canvas.height - band.amp, 0, band.y * canvas.height + band.amp * 2);
          grad.addColorStop(0, `rgba(${band.color},${isDark ? 0.08 : 0.05})`);
          grad.addColorStop(0.5, `rgba(${band.color},${isDark ? 0.14 : 0.08})`);
          grad.addColorStop(1, `rgba(${band.color},0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        });
      };

      const drawConnections = () => {
        const particles = particlesRef.current;
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * (isDark ? 0.18 : 0.1);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${isDark ? "100,149,237" : "37,99,235"},${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      };

      const drawMouseAttract = () => {
        const { x: mx, y: my } = mouseRef.current;
        if (mx < 0) return;
        particlesRef.current.forEach((p) => {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.015;
            p.vx += dx * force * 0.05;
            p.vy += dy * force * 0.05;
          }
        });
      };

      const draw = () => {
        t += 0.016;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aurora background waves
        drawAurora();

      

        // Particles
        particlesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.99;
          p.vy *= 0.99;
          p.pulse += p.pulseSpeed;

          // Wrap edges
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          const pulseR = Math.max(0.1, p.radius + Math.sin(p.pulse) * 0.5);
          const alpha = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);

          // Glow halo
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseR * 6);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR * 6, 0, Math.PI * 2);
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},90%,75%,${alpha})`;
          ctx.fill();
        });

        // Scanline texture
        for (let y = 0; y < canvas.height; y += 4) {
          ctx.fillStyle = isDark ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)";
          ctx.fillRect(0, y, canvas.width, 1);
        }

        animRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [isDark, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: isDark ? 1 : 0.7 }}
    />
  );
}

// ============================================================
// 🏠 MAIN PORTFOLIO COMPONENT
// ============================================================
export default function Home() {
  // ✅ This is your single state object
  const [data, setData] = useState({ projects: [], education: [], skills: [] });
  const [lang, setLang] = useState("en");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uptime, setUptime] = useState(0);
  const [bgMode, setBgMode] = useState("premium");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSpringX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ✅ FIXED FETCH LOGIC
    const fetchData = async () => {
      try {
        const [p, e, s] = await Promise.all([
          fetch("/api/admin?type=project").then(res => res.json()),
          fetch("/api/admin?type=education").then(res => res.json()),
          fetch("/api/admin?type=skill").then(res => res.json()),
        ]);

        // ✅ Update the 'data' state object using the results
        // We use Array.isArray to prevent crashes if the API returns an error message
        setData({
          projects: Array.isArray(p) ? p : [],
          education: Array.isArray(e) ? e : [],
          skills: Array.isArray(s) ? s : [],
        });

      } catch (err) {
        console.error("Database fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, []);
  const t = {
    en: {
      name: "HUN PHANUTH",
      role: "System Architect",
      about: "About Me",
      aboutDesc: "I'm a student with a strong background in Computer Science and currently pursuing Air Traffic Management.",
      skills: "Tech Stack",
      work: "Project Archive",
      edu: "Academic",
      contact: "Let's Connect to STeven",
      btn: "Launch Mail Protocol"
    },
    kh: {
      name: "ហ៊ុន ផានុត",
      role: "System Architect",
      about: "អំពីខ្ញុំ",
      aboutDesc: "ខ្ញុំជានិស្សិតដែលមានភាពស៊ីជម្រៅក្នុងជំនាញវិទ្យាសាស្ត្រកុំព្យូទ័រ ហើយកំពុងសិក្សាផ្នែកគ្រប់គ្រងចរាចរណ៍អាកាសផងដែរ។",
      skills: "ជំនាញ",
      work: "គម្រោង",
      edu: "ការសិក្សា",
      contact: "ទំនាក់ទំនង",
      btn: "ផ្ញើសារមកកាន់ខ្ញុំ"
    }
  };
return (
    <div
      className={`min-h-screen transition-colors duration-500 relative overflow-x-hidden
        ${lang === "kh" ? "font-khmer" : "font-sans"}
        ${isDark ? "bg-[#000000] text-white" : "bg-[#f8fafc] text-slate-900"}`}
    >
      <AnimatedBackground isDark={isDark} mode={bgMode} />

      {/* Custom cursor — only on large screens */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] hidden lg:block
          ${isDark ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-slate-900"}`}
        style={{ x: cursorSpringX, y: cursorSpringY }}
      />

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[1000] origin-left"
        style={{ scaleX }}
      />

      {/* Font import */}
      <style jsx global>{`
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&display=swap');
        .font-khmer { font-family: 'Battambang', cursive !important; }
        html { cursor: none; }
      `}</style>

      {/* Command center bar — hidden on mobile/tablet */}
      <div
        className={`fixed bottom-6 left-4 sm:left-10 z-[100] hidden lg:flex items-center gap-4 sm:gap-6 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border backdrop-blur-xl transition-all
          ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">System Online</span>
        </div>
        <div className="hidden sm:block h-4 w-px bg-current opacity-10" />
        <div className="hidden sm:block text-[10px] font-mono opacity-60">UPTIME: {uptime}s</div>
        <div className="hidden sm:block h-4 w-px bg-current opacity-10" />
        <Activity size={14} className="text-blue-600" />
        <div className="h-4 w-px bg-current opacity-10" />
        <button
          onClick={() => setBgMode((m) => (m === "standard" ? "premium" : "standard"))}
          className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest transition-all
            ${bgMode === "premium" ? "bg-blue-600 text-white" : isDark ? "bg-white/10 text-white/60" : "bg-black/10 text-black/60"}`}
        >
          {bgMode === "premium" ? "✦ Premium" : "◈ Standard"}
        </button>
      </div>

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all text-sm
          ${isDark ? "bg-white/5 border-white/10" : "bg-white/60 border-black/10"}`}
      >
        <div className="flex items-center gap-4 sm:gap-6 px-3 sm:px-4 border-r border-white/10 mr-1 sm:mr-2 font-black tracking-tighter">
          P.
        </div>

        <div className="hidden sm:flex gap-6 md:gap-8 text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-50">
          <a href="#about" className="hover:opacity-100 transition-opacity whitespace-nowrap">
            {t[lang].about}
          </a>
          <a href="#tech" className="hover:opacity-100 transition-opacity whitespace-nowrap">
            {t[lang].skills}
          </a>
          <a href="#work" className="hover:opacity-100 transition-opacity whitespace-nowrap">
            {t[lang].work}
          </a>
          <a href="#edu" className="hover:opacity-100 transition-opacity whitespace-nowrap">
            {t[lang].edu}
          </a>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-xl transition-all ${isDark ? "bg-white/10 text-yellow-400" : "bg-black/10 text-blue-600"}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setLang(lang === "en" ? "kh" : "en")}
            className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-black transition-all
              ${isDark ? "bg-blue-600 text-white" : "bg-slate-900 text-white"}`}
          >
            {lang === "en" ? "KH" : "EN"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-40 sm:pt-48 pb-16 sm:pb-20 px-5 sm:px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 sm:gap-16">
        <div className="flex-1 z-10 w-full text-center md:text-left">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-6xl sm:text-7xl md:text-[11rem] lg:text-[140px] font-black tracking-tighter leading-none mb-4 sm:mb-6 italic uppercase">
              {t[lang].name}
              <span className="text-blue-600">.</span>
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl font-medium max-w-lg mx-auto md:mx-0 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {t[lang].role}
            </p>
          </motion.div>
        </div>

        <div className="relative group z-10 w-64 sm:w-72 md:w-80 lg:w-[380px]">
          <div
            className={`absolute -inset-4 sm:-inset-6 rounded-[3rem] sm:rounded-[4rem] blur-2xl sm:blur-3xl transition-opacity
              ${isDark ? "bg-blue-600/20 opacity-40" : "bg-blue-400/10 opacity-100"}`}
          />
          <div
            className={`aspect-[3/4] sm:aspect-[9/12] md:w-80 lg:w-[380px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border transition-colors
              ${isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200 shadow-2xl"}`}
          >
            <img
              src="images/bl-steven.png"
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
              alt="Profile"
            />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 py-20 sm:py-32 px-5 sm:px-6">
        <div
          className={`absolute top-0 right-[-10%] sm:right-0 text-[120px] sm:text-[180px] md:text-[200px] font-black opacity-[0.02] select-none pointer-events-none
            ${isDark ? "text-white" : "text-black"}`}
        >
          STEVENNNNN
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div
            className={`p-6 sm:p-12 rounded-2xl sm:rounded-[3rem] border backdrop-blur-sm
              ${isDark ? "bg-white/5 border-white/10" : "bg-white/70 border-slate-200 shadow-xl"}`}
          >
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6 italic">{t[lang].about}</h2>
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              {t[lang].aboutDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div
              className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm
                ${isDark ? "bg-white/5 border-white/5" : "bg-white/70 border-slate-100"}`}
            >
              <Terminal className="text-blue-500 mb-3 sm:mb-4" size={28} />
              <h4 className="font-black text-lg sm:text-xl italic uppercase">Logic</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">Clean architecture design.</p>
            </div>
            <div
              className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm
                ${isDark ? "bg-white/5 border-white/5" : "bg-white/70 border-slate-100"}`}
            >
              <Code2 className="text-blue-500 mb-3 sm:mb-4" size={28} />
              <h4 className="font-black text-lg sm:text-xl italic uppercase">Scale</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">Built for high traffic.</p>
            </div>
          </div>
        </div>
      </section>
   
   {/* 📊 TECH STACK MATRIX */}
      <section id="tech" className={`py-32 px-6 relative overflow-hidden z-10 ${isDark ? 'bg-white/[0.02]' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-xs font-black uppercase tracking-[0.8em] text-blue-600 mb-4">{t[lang].skills} Matrix</h2>
            <p className="text-4xl font-black tracking-tight italic uppercase">{lang === 'en' ? 'Technical Capabilities' : 'សមត្ថភាពបច្ចេកទេស'}</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.skills.map((s, idx) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
                className={`p-6 rounded-3xl border transition-all cursor-pointer ${isDark ? 'bg-slate-900/50 border-white/5 hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]' : 'bg-white border-slate-200 hover:shadow-xl'}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className={`text-[10px] font-black uppercase opacity-30`}>0{idx + 1}</span>
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    {s.iconUrl ? (
                      <img src={s.iconUrl} alt={s.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-blue-500"><Cpu size={20} /></div>
                    )}
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">{s.name}</h3>
                <div className="h-1 w-full bg-blue-600/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: `${s.level || 80}%` }}
                      transition={{ duration: 1, delay: idx * 0.05 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600" 
                    />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🐙 GITHUB CONTRIBUTIONS */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Github className="text-blue-600" size={32} />
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Contribution GitHUB Protocol</h2>
          </div>
          <div className={`p-10 rounded-[4rem] border backdrop-blur-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-slate-200 shadow-2xl'} overflow-hidden`}>
            <img
              src="https://ghchart.rshah.org/steven-hazad"
              alt="Github Contributions"
              className={`w-full h-auto ${isDark ? 'invert brightness-200 hue-rotate-180' : ''}`}
            />
            <div className="mt-10 flex justify-between items-center text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">
              <span>Status: Synchronized</span>
              <div className="flex gap-4">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-green-100 rounded"></div>
                  <div className="w-3 h-3 bg-green-300 rounded"></div>
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎓 EDUCATION */}
      <section id="edu" className={`relative z-10 py-32 px-6 border-t border-white/5 ${isDark ? 'bg-black/40' : 'bg-white/60'} backdrop-blur-sm`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.8em] text-blue-600 mb-12">{t[lang].edu} History</h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-8 before:h-full before:w-0.5 before:bg-slate-200">
            {data.education.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative flex items-center gap-8 pl-4 group"
              >
                {/* Animated timeline dot */}
                <div className="absolute left-[26px] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-400"
                    animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                  />
                </div>

                <motion.div
                  className="relative z-10 w-16 h-16 bg-white rounded-2xl border-2 border-slate-100 p-2 shadow-sm group-hover:border-blue-500 transition-colors shrink-0"
                  whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
                >
                  <img src={edu.logoUrl || "/default-uni-icon.png"} alt={edu.university} className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                  className={`flex-1 p-6 rounded-[2rem] border transition-all backdrop-blur-sm overflow-hidden relative ${isDark ? 'bg-white/5 border-white/10 hover:border-blue-500' : 'bg-white/70 border-transparent hover:border-slate-200'}`}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  {/* Hover shimmer */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none" />

                  <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-2">
                    <div>
                      <motion.h4
                        className={`text-xl font-black italic ${isDark ? 'text-white' : 'text-slate-800'}`}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.25 }}
                      >
                        {edu.degree}
                      </motion.h4>
                      <motion.p
                        className="font-bold text-blue-600"
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.35 }}
                      >
                        {edu.university}
                      </motion.p>
                    </div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.45, type: "spring" }}
                      className={`text-[10px] font-black px-3 py-1 rounded-full shadow-sm italic shrink-0 ${isDark ? 'bg-white/10 text-slate-400' : 'bg-white text-slate-500'}`}
                    >
                      {edu.startDate} — {edu.endDate}
                    </motion.span>
                  </div>

                  {edu.achievement && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.55 }}
                      className={`mt-3 flex items-start gap-2 text-sm italic ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      <Trophy size={14} className="text-orange-500 shrink-0 mt-1" />
                      <p>{edu.achievement}</p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📬 CONTACT */}
      <section className="relative z-10 py-40 px-6">
        <div className={`max-w-5xl mx-auto rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden transition-all ${isDark ? 'bg-blue-600 text-white shadow-[0_0_100px_-20px_rgba(37,99,235,0.4)]' : 'bg-slate-900 text-white'}`}>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic leading-none relative z-10">{t[lang].contact}.</h2>
          <a href="mailto:phanuth.hun@gmail.com" className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest inline-block transition-all hover:scale-105 relative z-10 ${isDark ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
            {t[lang].btn}
          </a>
        </div>
      </section>

    </div>
  );
}
