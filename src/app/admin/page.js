"use client";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("project"); // project | education | skill
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Data from MySQL
  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${tab}s`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    setEditingItem(null); // Reset form when switching tabs
  }, [tab]);

  // 2. Handle Create & Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Data Type Casting
    if (data.gpa) data.gpa = parseFloat(data.gpa);
    if (data.level) data.level = parseInt(data.level);

    const method = editingItem ? "PUT" : "POST";
    const payload = editingItem 
      ? { type: tab, id: editingItem.id, data } 
      : { type: tab, data };

    const res = await fetch("/api/admin", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditingItem(null);
      e.target.reset();
      refreshData();
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Confirm Delete from MySQL?")) return;
    const res = await fetch(`/api/admin?type=${tab}&id=${id}`, { method: "DELETE" });
    if (res.ok) refreshData();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-slate-900 text-white p-8 flex flex-col fixed h-full">
        <div className="mb-10">
          <h1 className="text-2xl font-black tracking-tighter">PHANUTH<span className="text-blue-500">.DB</span></h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Management System</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {["project", "education", "skill"].map((t) => (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              className={`w-full text-left px-5 py-4 rounded-2xl font-bold capitalize transition-all ${tab === t ? 'bg-blue-600 shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              Manage {t}s
            </button>
          ))}
        </nav>

        <button onClick={() => signOut()} className="mt-auto py-4 text-slate-500 font-bold hover:text-red-400 border-t border-slate-800">
          Logout Session
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-72 p-12">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black capitalize">{tab}s</h2>
            <p className="text-slate-500 mt-1 font-medium italic">Database: phanuth_db &gt; {tab} table</p>
          </div>
        </header>

        <div className="grid xl:grid-cols-5 gap-10">
          {/* --- FORM PANEL (CREATE/EDIT) --- */}
          <div className="xl:col-span-2">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 sticky top-12">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                {editingItem ? <span className="text-orange-500">Editing Mode</span> : <span className="text-blue-600">Create New</span>}
              </h3>
              
              <form onSubmit={handleSubmit} key={editingItem?.id || 'new'} className="space-y-4">
                {tab === "project" && (
                  <>
                    <input name="title" defaultValue={editingItem?.title} placeholder="Project Title" required className="form-input" />
                    <input name="category" defaultValue={editingItem?.category} placeholder="Category (e.g. Web App)" className="form-input" />
                    <textarea name="description" defaultValue={editingItem?.description} placeholder="Short Description" className="form-input h-32 py-3" />
                    <input name="techStack" defaultValue={editingItem?.techStack} placeholder="Tech: Next.js, MySQL, etc." className="form-input" />
                  </>
                )}
                {tab === "education" && (
                  <>
                    <input name="degree" defaultValue={editingItem?.degree} placeholder="Degree" className="form-input" />
                    <input name="university" defaultValue={editingItem?.university} placeholder="University" className="form-input" />
                    <div className="flex gap-3">
                      <input name="startDate" defaultValue={editingItem?.startDate} placeholder="Start Year" className="form-input" />
                      <input name="endDate" defaultValue={editingItem?.endDate} placeholder="End Year" className="form-input" />
                    </div>
                    <input name="gpa" defaultValue={editingItem?.gpa} placeholder="GPA" type="number" step="0.01" className="form-input" />
                  </>
                )}
                {tab === "skill" && (
                  <>
                    <input name="name" defaultValue={editingItem?.name} placeholder="Skill Name" className="form-input" />
                    <input name="category" defaultValue={editingItem?.category} placeholder="Frontend/Backend" className="form-input" />
                    <input name="level" defaultValue={editingItem?.level} placeholder="Level (1-100)" type="number" className="form-input" />
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <button type="submit" className={`flex-1 py-4 rounded-2xl font-black text-white transition-all ${editingItem ? 'bg-orange-500' : 'bg-slate-900'}`}>
                    {editingItem ? "Update MySQL" : "Save to MySQL"}
                  </button>
                  {editingItem && (
                    <button type="button" onClick={() => setEditingItem(null)} className="px-6 bg-slate-100 rounded-2xl font-bold">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* --- TABLE PANEL (READ/DELETE) --- */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entry Details</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {items.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="p-6">
                        <p className="font-bold text-slate-800">{item.title || item.degree || item.name}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{item.category || item.university || `${item.level}% Proficiency`}</p>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-4">
                          <button onClick={() => setEditingItem(item)} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="text-sm font-bold text-red-400 hover:text-red-600 transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading && <div className="p-20 text-center text-slate-400 font-medium animate-pulse">Syncing Database...</div>}
              {!loading && items.length === 0 && <div className="p-20 text-center text-slate-400">No {tab}s found in MySQL.</div>}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          outline: none;
          transition: 0.2s;
          font-weight: 500;
        }
        .form-input:focus {
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.05);
        }
      `}</style>
    </div>
  );
}