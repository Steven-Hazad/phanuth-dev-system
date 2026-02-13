"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("/api/profile").then(res => res.json()).then(data => setProfile(data));
    fetch("/api/education").then(res => res.json()).then(data => setEducation(data));
    fetch("/api/projects").then(res => res.json()).then(data => setProjects(data));
  }, []);

  if (!profile) return <div className="p-10 text-center font-mono">Loading Academic System...</div>;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* HEADER & HERO (From Step 3) */}
      <section className="max-w-4xl mx-auto pt-20 px-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
          <h1 className="text-5xl font-black tracking-tight">{profile.fullName}</h1>
          <p className="text-xl text-blue-600 font-semibold mt-2">{profile.title}</p>
          <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-slate-100">
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Current GPA</p>
                <p className="text-2xl font-black">{profile.gpa}</p>
             </div>
          </div>
        </div>
      </section>

      {/* 🎓 STEP 4: EDUCATION TIMELINE */}
      <section className="max-w-4xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-black mb-10 flex items-center gap-3">
          <span className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-lg text-sm">🎓</span>
          Academic Timeline
        </h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {education.map((edu) => (
            <div key={edu.id} className="relative pl-12">
              {/* The Timeline Dot */}
              <div className="absolute left-0 mt-1.5 w-10 h-10 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full ring-4 ring-white"></div>
              </div>
              
              {/* The Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-blue-200">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                      {edu.startDate} — {edu.endDate}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{edu.degree}</h3>
                    <p className="text-slate-500 font-medium">{edu.university}</p>
                  </div>
                  <div className="bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                    <span className="text-sm font-bold text-slate-700">GPA: {edu.gpa}</span>
                  </div>
                </div>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed border-t pt-4 border-slate-50 italic">
                  "{edu.achievements}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto mt-24 px-6">
  <h2 className="text-2xl font-black mb-10 flex items-center gap-3">
    <span className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg text-sm">💻</span>
    Featured Systems
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    {projects.map((project) => (
      <div key={project.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-xl transition-all group">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-widest">
            {project.category}
          </span>
          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${project.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
            {project.status}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-500 text-sm mt-3 leading-relaxed flex-grow">
          {project.description}
        </p>
        
        <div className="mt-6 pt-6 border-t border-slate-50">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Technologies Used</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.split(',').map((tech, index) => (
              <span key={index} className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100 px-2 py-1 rounded">
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
    </main>
  );
}