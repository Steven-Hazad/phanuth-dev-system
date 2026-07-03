"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
import { Sun, Moon, Cpu, Code2, Terminal, Briefcase, GraduationCap, Mail, Trophy, Globe, ArrowUpRight, Github, Activity, Zap } from "lucide-react";

// ============================================================
// 🎨 ANIMATED BACKGROUND ENGINE
// ===============================================sdfdsfsf==ddddddddddddddd===========
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

    // ── STANDARD: Clean flowing aurora mesh ──
    if (mode === "standard") {
      let t = 0;
      const orbs = [
        { ox: 0.2, oy: 0.3, r: 0.45, speed: 0.0007, hue: isDark ? "59,130,246" : "59,130,246" },
        { ox: 0.8, oy: 0.7, r: 0.40, speed: 0.0009, hue: isDark ? "139,92,246" : "99,102,241" },
        { ox: 0.5, oy: 0.1, r: 0.35, speed: 0.0006, hue: isDark ? "6,182,212" : "14,165,233" },
      ];

      const draw = () => {
        t += 0.016;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        orbs.forEach((orb, i) => {
          const x = (orb.ox + Math.sin(t * orb.speed * 1000 + i) * 0.15) * canvas.width;
          const y = (orb.oy + Math.cos(t * orb.speed * 800 + i * 1.3) * 0.12) * canvas.height;
          const r = orb.r * Math.min(canvas.width, canvas.height);
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
          grad.addColorStop(0, `rgba(${orb.hue},${isDark ? 0.18 : 0.12})`);
          grad.addColorStop(1, `rgba(${orb.hue},0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
        animRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    // ── PREMIUM: Particles + Aurora + Mouse attraction ──
    if (mode === "premium") {
      const COUNT = 80;
      particlesRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.5,
        alpha: Math.random() * 0.4 + 0.25,
        hue: Math.random() > 0.6
          ? (isDark ? 210 + Math.random() * 40 : 200 + Math.random() * 30)  // blues
          : (isDark ? 260 + Math.random() * 30 : 240 + Math.random() * 20), // purples
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.018,
      }));

      let t = 0;
      const AURORA_BANDS = [
        { y: 0.22, amp: 90, freq: 0.0025, speed: 0.00065, color: isDark ? "37,99,235" : "59,130,246" },
        { y: 0.48, amp: 65, freq: 0.0035, speed: 0.0010, color: isDark ? "109,40,217" : "99,102,241" },
        { y: 0.70, amp: 45, freq: 0.002,  speed: 0.00055, color: isDark ? "6,148,162" : "14,165,233" },
      ];

      const drawAurora = () => {
        AURORA_BANDS.forEach((band, bi) => {
          const points = [];
          const steps = 16;
          for (let i = 0; i <= steps; i++) {
            const px = (i / steps) * canvas.width;
            const py =
              band.y * canvas.height +
              Math.sin(px * band.freq + t * band.speed * 1000 + bi * 1.2) * band.amp +
              Math.sin(px * band.freq * 2.7 + t * band.speed * 600 + bi) * band.amp * 0.35;
            points.push({ x: px, y: py });
          }

          ctx.beginPath();
          ctx.moveTo(points[0].x, 0);
          ctx.lineTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            const cp = points[i - 1];
            ctx.quadraticCurveTo(cp.x, cp.y, (cp.x + points[i].x) / 2, (cp.y + points[i].y) / 2);
          }
          ctx.lineTo(canvas.width, 0);
          ctx.closePath();

          const grad = ctx.createLinearGradient(0, band.y * canvas.height - band.amp, 0, band.y * canvas.height + band.amp * 2.5);
          grad.addColorStop(0, `rgba(${band.color},${isDark ? 0.10 : 0.06})`);
          grad.addColorStop(0.45, `rgba(${band.color},${isDark ? 0.16 : 0.09})`);
          grad.addColorStop(1, `rgba(${band.color},0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        });
      };

      const drawConnections = () => {
        const particles = particlesRef.current;
        const maxDist = 110;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * (isDark ? 0.15 : 0.08);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${isDark ? "99,130,240" : "37,99,235"},${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      };

      const applyMouseAttraction = () => {
        const { x: mx, y: my } = mouseRef.current;
        if (mx < 0) return;
        particlesRef.current.forEach((p) => {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            const force = (200 - dist) / 200 * 0.012;
            p.vx += dx / dist * force;
            p.vy += dy / dist * force;
          }
        });
      };

      const draw = () => {
        t += 0.016;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawAurora();
        applyMouseAttraction();
        drawConnections();

        particlesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          // Gentle velocity damping
          p.vx *= 0.989;
          p.vy *= 0.989;
          p.pulse += p.pulseSpeed;

          // Wrap edges
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          const pulseR = Math.max(0.1, p.radius + Math.sin(p.pulse) * 0.4);
          const alpha = p.alpha * (0.75 + Math.sin(p.pulse) * 0.25);

          // Soft glow halo
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseR * 7);
          glow.addColorStop(0, `hsla(${p.hue},80%,70%,${alpha * 0.25})`);
          glow.addColorStop(1, `hsla(${p.hue},80%,70%,0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR * 7, 0, Math.PI * 2);
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue},85%,78%,${alpha})`;
          ctx.fill();
        });

        // Subtle scanlines
        for (let y = 0; y < canvas.height; y += 5) {
          ctx.fillStyle = isDark ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.035)";
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
      style={{ opacity: isDark ? 1 : 0.65 }}
    />
  );
}

// ============================================================
// ✨ GLITCH TEXT EFFECT
// ============================================================
function GlitchText({ text, className }) {
  return (
    <span className={`relative inline-block ${className}`} data-text={text}>
      {text}
      <style jsx>{`
        span[data-text]::before,
        span[data-text]::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
        }
        span[data-text]::before {
          animation: glitch1 4s infinite;
          clip-path: polygon(0 30%, 100% 30%, 100% 55%, 0 55%);
          color: #3b82f6;
          opacity: 0;
        }
        span[data-text]::after {
          animation: glitch2 4s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          color: #8b5cf6;
          opacity: 0;
        }
        @keyframes glitch1 {
          0%, 90%, 100% { transform: none; opacity: 0; }
          92% { transform: translateX(-3px); opacity: 0.7; }
          94% { transform: translateX(3px); opacity: 0.5; }
          96% { transform: translateX(-1px); opacity: 0; }
        }
        @keyframes glitch2 {
          0%, 90%, 100% { transform: none; opacity: 0; }
          93% { transform: translateX(3px); opacity: 0.7; }
          95% { transform: translateX(-2px); opacity: 0.4; }
          97% { transform: none; opacity: 0; }
        }
      `}</style>
    </span>
  );
}

// ============================================================
// 📊 SKILL CARD with animated ring
// ============================================================
function SkillCard({ skill, idx, isDark }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const level = skill.level || 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.04, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`group p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden
        ${isDark
          ? "bg-slate-900/60 border-white/5 hover:border-blue-500/40 hover:shadow-[0_0_25px_-8px_rgba(59,130,246,0.35)]"
          : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl"}`}
    >
      {/* Shimmer on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      <div className="flex justify-between items-start mb-5">
        <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? "text-white/20" : "text-slate-300"}`}>
          {String(idx + 1).padStart(2, "0")}
        </span>
        {/* SVG ring progress */}
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r={radius} fill="none" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="3" />
          <motion.circle
            cx="24" cy="24" r={radius}
            fill="none"
            stroke="url(#skillGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - level / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: idx * 0.04 + 0.3, ease: "easeOut" }}
            transform="rotate(-90 24 24)"
          />
          <defs>
            <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {skill.iconUrl ? (
            <image href={skill.iconUrl} x="13" y="13" width="22" height="22" />
          ) : (
            <text x="24" y="28" textAnchor="middle" fontSize="14" fill={isDark ? "#60a5fa" : "#3b82f6"}>⚡</text>
          )}
        </svg>
      </div>

      <h3 className={`text-sm font-black uppercase tracking-tight mb-1 ${isDark ? "text-white" : "text-slate-800"}`}>
        {skill.name}
      </h3>
      <p className={`text-[10px] font-bold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        {level}% proficiency
      </p>
    </motion.div>
  );
}

// ============================================================
// 🏠 MAIN PORTFOLIO COMPONENT
// ============================================================
export default function Home() {
  const [data, setData] = useState({ education: [], skills: [] });
  const [lang, setLang] = useState("en");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uptime, setUptime] = useState(0);
  const [bgMode, setBgMode] = useState("premium");
  const [hoveredNav, setHoveredNav] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSpringX = useSpring(mouseX, { stiffness: 600, damping: 35 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 600, damping: 35 });
  const cursorScale = useMotionValue(1);
  const cursorScaleSpring = useSpring(cursorScale, { stiffness: 400, damping: 30 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", handleMouseMove);

    const fetchData = async () => {
      try {
        const [e, s] = await Promise.all([
          fetch("/api/admin?type=education").then(res => res.json()),
          fetch("/api/admin?type=skill").then(res => res.json()),
        ]);
        setData({
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
      edu: "Academic",
      contact: "Let's Connect",
      btn: "Launch Mail Protocol",
      greeting: "Hello, World.",
    },
    kh: {
      name: "ហ៊ុន ផានុត",
      role: "System Architect",
      about: "អំពីខ្ញុំ",
      aboutDesc: "ខ្ញុំជានិស្សិតដែលមានភាពស៊ីជម្រៅក្នុងជំនាញវិទ្យាសាស្ត្រកុំព្យូទ័រ ហើយកំពុងសិក្សាផ្នែកគ្រប់គ្រងចរាចរណ៍អាកាសផងដែរ។",
      skills: "ជំនាញ",
      edu: "ការសិក្សា",
      contact: "ទំនាក់ទំនង",
      btn: "ផ្ញើសារមកកាន់ខ្ញុំ",
      greeting: "សួស្តី, ពិភព",
    }
  };

  const navLinks = [
    { id: "about", label: t[lang].about },
    { id: "tech", label: t[lang].skills },
    { id: "edu", label: t[lang].edu },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-700 relative overflow-x-hidden
        ${lang === "kh" ? "font-khmer" : "font-sans"}
        ${isDark ? "bg-[#050507] text-white" : "bg-[#f6f8fc] text-slate-900"}`}
    >
      <AnimatedBackground isDark={isDark} mode={bgMode} />

      {/* Custom cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] hidden lg:block mix-blend-difference`}
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          scale: cursorScaleSpring,
          borderColor: isDark ? "#60a5fa" : "#1e40af",
          boxShadow: isDark ? "0 0 18px rgba(96,165,250,0.4)" : "none",
        }}
      />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[1000] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
        }}
      />

      {/* Font imports */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Khmer+OS+Siemreap&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-khmer { font-family: 'Khmer OS Siemreap', cursive !important; }
        html { cursor: none; }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* ── COMMAND CENTER BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className={`fixed bottom-5 left-6 z-[100] hidden lg:flex items-center gap-4 px-5 py-3 rounded-2xl border backdrop-blur-2xl transition-all
          ${isDark ? "bg-white/[0.04] border-white/10" : "bg-black/[0.04] border-black/10"}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50">Online</span>
        </div>
        <div className="h-3 w-px bg-current opacity-10" />
        <span className="text-[9px] font-mono opacity-40">
          {String(Math.floor(uptime / 3600)).padStart(2,"0")}:
          {String(Math.floor((uptime % 3600) / 60)).padStart(2,"0")}:
          {String(uptime % 60).padStart(2,"0")}
        </span>
        <div className="h-3 w-px bg-current opacity-10" />
        <Activity size={12} className="text-blue-500 opacity-70" />
        <div className="h-3 w-px bg-current opacity-10" />
        <button
          onClick={() => setBgMode((m) => (m === "standard" ? "premium" : "standard"))}
          className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest transition-all
            ${bgMode === "premium"
              ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
              : isDark ? "bg-white/10 text-white/50" : "bg-black/10 text-black/50"}`}
        >
          {bgMode === "premium" ? "✦ Premium" : "◈ Standard"}
        </button>
      </motion.div>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-2xl shadow-lg transition-all text-sm
          ${isDark ? "bg-white/[0.04] border-white/10 shadow-black/30" : "bg-white/70 border-black/8 shadow-slate-200/80"}`}
      >
        {/* Logo */}
        <div className={`text-base font-black tracking-tighter pr-4 border-r mr-1
          ${isDark ? "border-white/10" : "border-black/10"}`}>
          P<span className="text-blue-600">.</span>
        </div>

        {/* Nav links */}
        <div className="hidden sm:flex gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onMouseEnter={() => setHoveredNav(link.id)}
              onMouseLeave={() => setHoveredNav(null)}
              className={`relative px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${hoveredNav === link.id
                  ? isDark ? "text-white bg-white/8" : "text-slate-900 bg-black/5"
                  : "opacity-40 hover:opacity-100"}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 ml-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-xl transition-all
              ${isDark ? "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25" : "bg-slate-900/8 text-slate-700 hover:bg-slate-900/12"}`}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLang(lang === "en" ? "kh" : "en")}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${isDark ? "bg-blue-600/90 text-white hover:bg-blue-500" : "bg-slate-900 text-white hover:bg-slate-700"}`}
          >
            {lang === "en" ? "KH" : "EN"}
          </motion.button>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════
          ── HERO SECTION ──
      ══════════════════════════════════ */}
      <section className="relative z-10 pt-36 sm:pt-44 pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-8
            ${isDark ? "border-white/10 bg-white/5 text-blue-400" : "border-blue-200 bg-blue-50 text-blue-600"}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          {t[lang].greeting}
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 sm:gap-16">
          <div className="flex-1 z-10 w-full">
            {/* Big name */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className={`text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10rem] font-black tracking-tighter leading-[0.88] mb-6 uppercase italic select-none
                ${isDark ? "text-white" : "text-slate-900"}`}
              >
                <GlitchText text={lang === "kh" ? "ហ៊ុន" : "HUN"} />
                <br />
                <span className="text-blue-600">PHANUTH</span>
                <span className={isDark ? "text-white/20" : "text-slate-200"}>.</span>
              </h1>
            </motion.div>

            {/* Role + subtitle row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold
                ${isDark ? "bg-blue-600/20 text-blue-400 border border-blue-600/30" : "bg-blue-100 text-blue-700 border border-blue-200"}`}>
                {t[lang].role}
              </span>
              <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Computer Science × Air Traffic Management
              </span>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <a
                href="#about"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:gap-3
                  ${isDark ? "bg-white text-slate-900 hover:bg-white/90" : "bg-slate-900 text-white hover:bg-slate-700"}`}
              >
                Explore
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative group z-10 w-64 sm:w-72 md:w-80 lg:w-[340px] shrink-0"
          >
            {/* Glow ring */}
            <div className={`absolute -inset-5 rounded-[3.5rem] blur-3xl opacity-30 transition-opacity group-hover:opacity-50
              ${isDark ? "bg-blue-600" : "bg-blue-300"}`} />

            {/* Card frame */}
            <div className={`relative rounded-[2.5rem] overflow-hidden border-2 transition-colors
              ${isDark ? "border-white/8 bg-slate-900" : "border-slate-200 bg-white shadow-2xl shadow-blue-100"}`}
            >
              <img
                src="images/bl-steven.png"
                className="w-full aspect-[3/4] object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                alt="Profile"
              />
              {/* Card overlay badge */}
              <div className={`absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-xl border
                ${isDark ? "bg-black/60 border-white/10" : "bg-white/80 border-white/60"}`}>
                <p className="text-xs font-black uppercase tracking-wider opacity-60 mb-0.5">System Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold">Available for work</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ── ABOUT SECTION ──
      ══════════════════════════════════ */}
      <section id="about" className="relative z-10 py-24 sm:py-32 px-5 sm:px-8">
        {/* Decorative watermark */}
        <div className={`absolute top-0 right-0 text-[15vw] font-black opacity-[0.018] select-none pointer-events-none leading-none
          ${isDark ? "text-white" : "text-slate-900"}`}>
          ABOUT
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 sm:gap-12 items-start">
          {/* Main bio card — wider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`md:col-span-3 p-8 sm:p-12 rounded-3xl border backdrop-blur-sm
              ${isDark ? "bg-white/[0.03] border-white/8" : "bg-white/80 border-slate-200 shadow-xl shadow-slate-100"}`}
          >
            <div className="flex gap-2.5 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            </div>
            <p className={`text-[10px] font-black uppercase tracking-[0.25em] mb-3 text-blue-500`}>
              // about.md
            </p>
            <h2 className="text-3xl sm:text-4xl font-black italic mb-5">{t[lang].about}</h2>
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              {t[lang].aboutDesc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {["React", "Next.js", "TypeScript", "ATC", "Python"].map(tag => (
                <span key={tag}
                  className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full
                    ${isDark ? "bg-white/5 text-white/50 border border-white/10" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stat cards — narrower */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-4">
            {[
              { icon: <Terminal size={20} className="text-blue-500" />, title: "Logic", desc: "Clean architecture. Systems that breathe.", accent: "blue" },
              { icon: <Code2 size={20} className="text-violet-500" />, title: "Scale", desc: "Built for high traffic. Zero compromises.", accent: "violet" },
              { icon: <Zap size={20} className="text-amber-500" />, title: "Speed", desc: "Fast ships. Faster iterations.", accent: "amber" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
                whileHover={{ x: 4 }}
                className={`p-6 rounded-2xl border backdrop-blur-sm transition-all
                  ${isDark ? "bg-white/[0.03] border-white/8 hover:border-white/15" : "bg-white/80 border-slate-100 hover:shadow-lg"}`}
              >
                <div className="mb-4">{item.icon}</div>
                <h4 className="font-black text-base uppercase italic mb-1">{item.title}</h4>
                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ── TECH STACK ──
      ══════════════════════════════════ */}
      <section id="tech" className={`relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden z-10
        ${isDark ? "bg-white/[0.015]" : "bg-white/50"}`}>
        {/* Section header */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
                {t[lang].skills} Matrix
              </p>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter italic uppercase">
                {lang === "en" ? "Technical" : "សមត្ថភាព"}
                <span className="text-blue-600"> {lang === "en" ? "Capabilities" : "បច្ចេកទេស"}</span>
              </h2>
            </div>
            <span className={`hidden sm:block text-[10px] font-mono opacity-30 pb-2`}>
              {data.skills.length} skills indexed
            </span>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-36 rounded-2xl animate-pulse ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {data.skills.map((skill, idx) => (
                <SkillCard key={skill.id} skill={skill} idx={idx} isDark={isDark} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════
          ── GITHUB CONTRIBUTIONS ──
      ══════════════════════════════════ */}
      <section className="relative z-10 py-24 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className={`p-3 rounded-xl ${isDark ? "bg-white/5 border border-white/8" : "bg-slate-100 border border-slate-200"}`}>
              <Github size={22} className={isDark ? "text-white" : "text-slate-700"} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mb-1">Activity</p>
              <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter">
                Contribution Protocol
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className={`p-8 sm:p-12 rounded-3xl border backdrop-blur-sm overflow-hidden
              ${isDark ? "bg-white/[0.03] border-white/8" : "bg-white/80 border-slate-200 shadow-xl shadow-slate-100"}`}
          >
            <img
              src="https://ghchart.rshah.org/steven-hazad"
              alt="Github Contributions"
              className={`w-full h-auto rounded-xl ${isDark ? "invert brightness-200 hue-rotate-180 opacity-80" : "opacity-90"}`}
            />
            <div className={`mt-8 pt-6 border-t flex justify-between items-center text-[9px] font-black uppercase tracking-[0.25em]
              ${isDark ? "border-white/5 text-white/25" : "border-slate-100 text-slate-300"}`}
            >
              <span>Status: Synchronized</span>
              <div className="flex items-center gap-3">
                <span>Less</span>
                <div className="flex gap-1">
                  {["bg-green-100", "bg-green-300", "bg-green-500", "bg-green-700"].map((c, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ── EDUCATION ──
      ══════════════════════════════════ */}
      <section id="edu" className={`relative z-10 py-24 sm:py-32 px-5 sm:px-8
        ${isDark ? "bg-white/[0.015]" : "bg-white/60"} backdrop-blur-sm`}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
              {t[lang].edu} History
            </p>
            <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter">
              Academic <span className="text-blue-600">Journey</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative space-y-8">
            {/* Timeline line */}
            <div className={`absolute left-[31px] top-8 bottom-0 w-px
              ${isDark ? "bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent" : "bg-gradient-to-b from-blue-200 via-purple-100 to-transparent"}`}
            />

            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 pl-2">
                  <div className={`w-14 h-14 rounded-2xl animate-pulse shrink-0 ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
                  <div className={`flex-1 h-28 rounded-2xl animate-pulse ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
                </div>
              ))
            ) : (
              data.education.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="relative flex items-start gap-5 pl-2 group"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[23px] top-7 z-20">
                    <div className={`w-4 h-4 rounded-full border-2
                      ${isDark ? "bg-blue-600 border-blue-400" : "bg-blue-500 border-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.4)]"}`}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400"
                      animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: idx * 0.5 }}
                    />
                  </div>

                  {/* Uni logo */}
                  <motion.div
                    className={`relative z-10 w-14 h-14 rounded-2xl border-2 p-1.5 shadow-sm shrink-0 transition-all mt-1
                      ${isDark ? "bg-slate-800 border-white/10 group-hover:border-blue-500/50" : "bg-white border-slate-100 group-hover:border-blue-300 group-hover:shadow-md"}`}
                    whileHover={{ rotate: [-2, 2, -1, 0], transition: { duration: 0.4 } }}
                  >
                    <img
                      src={edu.logoUrl || "/default-uni-icon.png"}
                      alt={edu.university}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className={`flex-1 p-6 rounded-2xl border transition-all relative overflow-hidden
                      ${isDark
                        ? "bg-white/[0.03] border-white/8 group-hover:border-blue-500/30 group-hover:bg-white/[0.05]"
                        : "bg-white/90 border-slate-100 group-hover:border-blue-200 group-hover:shadow-lg"}`}
                    whileHover={{ x: 4 }}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className={`text-lg font-black italic ${isDark ? "text-white" : "text-slate-800"}`}>
                          {edu.degree}
                        </h4>
                        <p className="font-bold text-blue-600 text-sm mt-0.5">{edu.university}</p>
                      </div>
                      <span className={`text-[9px] font-black px-3 py-1.5 rounded-full italic whitespace-nowrap self-start
                        ${isDark ? "bg-white/8 text-slate-400 border border-white/8" : "bg-slate-50 text-slate-400 border border-slate-100"}`}>
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>

                    {edu.achievement && (
                      <div className={`mt-3 flex items-start gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        <Trophy size={13} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="italic">{edu.achievement}</p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ── CONTACT ──
      ══════════════════════════════════ */}
      <section className="relative z-10 py-32 sm:py-40 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-[2.5rem] sm:rounded-[3.5rem] p-12 sm:p-20 text-center overflow-hidden
              ${isDark
                ? "bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 shadow-[0_0_80px_-20px_rgba(99,102,241,0.5)]"
                : "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950"}`}
          >
            {/* Carbon texture */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
            />
            {/* Glow orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400/15 rounded-full blur-3xl" />

            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300/80 mb-5">
                Open to opportunities
              </p>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter italic leading-none text-white mb-3">
                {t[lang].contact}
                <span className="text-blue-400">.</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base mb-10 max-w-sm mx-auto">
                Have a project in mind? Let's build something great together.
              </p>

              <motion.a
                href="mailto:phanuth.hun@gmail.com"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all bg-white text-slate-900 hover:bg-blue-50 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <Mail size={16} />
                {t[lang].btn}
                <ArrowUpRight size={14} className="opacity-60" />
              </motion.a>

              <p className="mt-8 text-[10px] font-mono text-white/25 tracking-wider">
                phanuth.hun@gmail.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 py-8 px-8 border-t text-center
        ${isDark ? "border-white/5 text-white/20" : "border-slate-100 text-slate-300"}`}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Hun Phanuth — Crafted with ♥
        </p>
      </footer>
    </div>
  );
}