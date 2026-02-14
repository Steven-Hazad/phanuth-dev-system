"use client"
import { useState, useEffect, useMemo } from "react";
import { signOut } from "next-auth/react";
import { FolderKanban, GraduationCap, Cpu, MessageSquare, LogOut, Plus, Search, Trophy, Globe } from "lucide-react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("project");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");

  const refreshData = async () => {
    const res = await fetch(`/api/admin?type=${tab}`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => { refreshData(); setEditingItem(null); }, [tab]);

  const filteredItems = useMemo(() => items.filter(i => 
    (i.title || i.degree || i.name || "").toLowerCase().includes(search.toLowerCase())
  ), [items, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await fetch("/api/admin", {
      method: editingItem ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: tab, id: editingItem?.id, data }),
    });
    if (res.ok) { e.target.reset(); setEditingItem(null); refreshData(); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
      <aside className="w-72 bg-slate-900 text-white p-8 fixed h-full flex flex-col shadow-2xl">
        <h1 className="text-2xl font-black italic text-blue-500 mb-10">PHANUTH.SYS</h1>
        <nav className="flex-1 space-y-2">
          <NavBtn active={tab==="project"} onClick={()=>setTab("project")} icon={<FolderKanban size={20}/>} label="Projects"/>
          <NavBtn active={tab==="education"} onClick={()=>setTab("education")} icon={<GraduationCap size={20}/>} label="Education"/>
          <NavBtn active={tab==="skill"} onClick={()=>setTab("skill")} icon={<Cpu size={20}/>} label="Skills"/>
          <NavBtn active={tab==="message"} onClick={()=>setTab("message")} icon={<MessageSquare size={20}/>} label="Inbox"/>
        </nav>
        <button onClick={()=>signOut()} className="mt-auto flex items-center gap-2 text-slate-500 hover:text-red-400 font-bold p-4 border-t border-slate-800 transition-colors">
          <LogOut size={18}/> Logout
        </button>
      </aside>

      <main className="ml-72 flex-1 p-12">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-black capitalize italic tracking-tight">{tab}s</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
            <input onChange={(e)=>setSearch(e.target.value)} placeholder="Quick search..." className="pl-12 pr-6 py-3 rounded-2xl border-none shadow-sm w-64 focus:ring-2 ring-blue-500"/>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          {tab !== "message" && (
            <div className="lg:col-span-4">
              <form onSubmit={handleSubmit} key={editingItem?.id || "new"} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-10 space-y-4">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                   {editingItem ? <Trophy className="text-orange-500"/> : <Plus className="text-blue-500"/>}
                   {editingItem ? "Update Item" : "New Entry"}
                </h3>
                
                {tab === "education" && (
                  <>
                    <input name="degree" defaultValue={editingItem?.degree} placeholder="Degree Name" required className="form-input" />
                    <input name="university" defaultValue={editingItem?.university} placeholder="University Name" className="form-input" />
                    <input name="logoUrl" defaultValue={editingItem?.logoUrl} placeholder="Logo URL (Clearbit etc.)" className="form-input" />
                    <div className="grid grid-cols-2 gap-2">
                      <input name="startDate" defaultValue={editingItem?.startDate} placeholder="Start Year" className="form-input" />
                      <input name="endDate" defaultValue={editingItem?.endDate} placeholder="End Year" className="form-input" />
                    </div>
                    <input name="gpa" defaultValue={editingItem?.gpa} step="0.01" type="number" placeholder="GPA" className="form-input" />
                    <textarea name="achievement" defaultValue={editingItem?.achievement} placeholder="Key Achievements..." className="form-input h-24" />
                  </>
                )}

                {tab === "project" && (
                  <>
                    <input name="title" defaultValue={editingItem?.title} placeholder="Project Title" required className="form-input" />
                    <input name="category" defaultValue={editingItem?.category} placeholder="Category" className="form-input" />
                    <input name="imageUrl" defaultValue={editingItem?.imageUrl} placeholder="Image URL" className="form-input" />
                    <textarea name="description" defaultValue={editingItem?.description} placeholder="Description" className="form-input h-24" />
                    <input name="techStack" defaultValue={editingItem?.techStack} placeholder="Tech Stack (React, MySQL...)" className="form-input" />
                    <input name="liveLink" defaultValue={editingItem?.liveLink} placeholder="Live Link" className="form-input" />
                  </>
                )}

                {tab === "skill" && (
  <>
    <input name="name" defaultValue={editingItem?.name} placeholder="Skill Name (e.g., React)" required className="form-input" />
    <input name="category" defaultValue={editingItem?.category} placeholder="Category (e.g., Frontend)" className="form-input" />
    
    {/* NEW ICON FIELD */}
    <input 
      name="iconUrl" 
      defaultValue={editingItem?.iconUrl} 
      placeholder="Icon URL (e.g., https://skillicons.dev/icons?i=react)" 
      className="form-input" 
    />

    <input name="level" type="number" defaultValue={editingItem?.level} placeholder="Level %" className="form-input" />
  </>
)}
                <button type="submit" className={`w-full py-4 rounded-2xl font-black text-white shadow-lg transition-all active:scale-95 ${editingItem ? 'bg-orange-500 shadow-orange-200' : 'bg-blue-600 shadow-blue-200'}`}>
                  {editingItem ? "SAVE CHANGES" : "CREATE ENTRY"}
                </button>
              </form>
            </div>
          )}

          <div className={`${tab === "message" ? "lg:col-span-12" : "lg:col-span-8"} space-y-4`}>
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2 border">
                    {(item.logoUrl || item.imageUrl) ? (
                      <img src={item.logoUrl || item.imageUrl} className="w-full h-full object-contain" />
                    ) : <Globe className="text-slate-300"/>}
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-slate-800">{item.title || item.degree || item.name}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.university || item.category}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => setEditingItem(item)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white font-bold text-xs uppercase transition-colors">Edit</button>
                  <button onClick={async () => { if(confirm("Delete?")) { await fetch(`/api/admin?type=${tab}&id=${item.id}`, {method: 'DELETE'}); refreshData(); } }} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white font-bold text-xs uppercase transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        .form-input { width: 100%; padding: 1rem; background: #f8fafc; border: 2px solid #f1f5f9; border-radius: 1.25rem; font-weight: 700; outline: none; transition: 0.2s; font-size: 0.85rem; }
        .form-input:focus { border-color: #3b82f6; background: white; }
      `}</style>
    </div>
  );
}

function NavBtn({active, onClick, icon, label}) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${active ? "bg-blue-600 text-white shadow-xl translate-x-2" : "text-slate-400 hover:bg-slate-800"}`}>
      {icon} {label}
    </button>
  );
}