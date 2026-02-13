"use client";

import { useState, useEffect, useMemo } from "react";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {

  /* ================= STATES ================= */
  const [tab, setTab] = useState("project");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");


  /* ================= FETCH ================= */
  const refreshData = async () => {

    setLoading(true);

    try {

      const res = await fetch(`/api/admin?type=${tab}`);
      const data = await res.json();

      setItems(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error("Fetch error:", err);
      setItems([]);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    refreshData();
    setEditingItem(null);
  }, [tab]);


  /* ================= SEARCH ================= */
  const filteredItems = useMemo(() => {

    return items.filter((item) =>
      (
        item.title ||
        item.degree ||
        item.name ||
        item.subject ||
        ""
      ).toLowerCase().includes(search.toLowerCase())
    );

  }, [items, search]);


  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.gpa) data.gpa = parseFloat(data.gpa);
    if (data.level) data.level = parseInt(data.level);

    const method = editingItem ? "PUT" : "POST";

    const res = await fetch("/api/admin", {

      method,
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        type: tab,
        id: editingItem?.id,
        data,
      }),

    });

    if (res.ok) {

      setEditingItem(null);
      e.target.reset();
      refreshData();

    }
  };


  /* ================= DELETE ================= */
  const handleDelete = async (id) => {

    if (!confirm("Delete permanently?")) return;

    await fetch(`/api/admin?type=${tab}&id=${id}`, {
      method: "DELETE",
    });

    refreshData();
  };


  /* ================= MARK READ ================= */
  const markAsRead = async (id) => {

    await fetch("/api/admin", {

      method: "PUT",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        type: "message",
        id,
        data: { isRead: true },
      }),

    });

    refreshData();
  };


  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-900">


      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-slate-900 text-white p-8 fixed h-full flex flex-col shadow-2xl">

        <div className="mb-10">
          <h1 className="text-2xl font-black italic text-blue-500">
            PHANUTH.SYSTEM
          </h1>

          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Admin v3.0
          </p>
        </div>


        <nav className="flex-1 space-y-3">

          {["project", "education", "skill", "message"].map((t) => (

            <button
              key={t}

              onClick={() => setTab(t)}

              className={`w-full px-6 py-4 rounded-2xl font-bold capitalize text-left transition-all
                ${
                  tab === t
                    ? "bg-blue-600 text-white shadow-lg translate-x-2"
                    : "text-slate-400 hover:bg-slate-800"
                }`}
            >
              Manage {t}s
            </button>

          ))}

        </nav>


        <button
          onClick={() => signOut()}
          className="mt-auto py-4 text-slate-500 hover:text-red-400 font-bold border-t border-slate-800"
        >
          Logout
        </button>

      </aside>



      {/* ================= MAIN ================= */}
      <main className="flex-1 ml-72 p-12">


        {/* ================= STATS ================= */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <h4 className="text-[10px] uppercase text-slate-400 font-black mb-2">
              Database
            </h4>

            <div className="text-green-500 text-3xl font-black flex gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              Synced
            </div>
          </div>


          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <h4 className="text-[10px] uppercase text-slate-400 font-black mb-2">
              Total {tab}s
            </h4>

            <div className="text-4xl font-black">
              {items.length}
            </div>
          </div>


          <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-lg text-white">
            <h4 className="text-[10px] uppercase text-blue-200 font-black mb-2">
              Language
            </h4>

            <div className="text-3xl font-black">
              Khmer / English
            </div>
          </div>

        </section>



        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-black capitalize">
            {tab}s
          </h2>

          <input
            type="text"
            placeholder={`Search ${tab}s...`}
            className="px-6 py-3 border rounded-2xl w-64 bg-white"
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>



        <div className="grid xl:grid-cols-5 gap-10">


          {/* ================= FORM ================= */}
          {tab !== "message" && (

            <div className="xl:col-span-2">

              <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm sticky top-12">

                <h3 className="text-xl font-black mb-6">
                  {editingItem ? "Edit Entry" : "Add Entry"}
                </h3>


                <form
                  onSubmit={handleSubmit}
                  key={editingItem?.id || "new"}
                  className="space-y-4"
                >

                  {/* PROJECT */}
                  {tab === "project" && (
                    <>
                      <input name="title" defaultValue={editingItem?.title} placeholder="Title" required className="form-input" />

                      <input name="category" defaultValue={editingItem?.category} placeholder="Category" className="form-input" />

                      <textarea name="description" defaultValue={editingItem?.description} placeholder="Description" className="form-input h-28" />

                      <input name="techStack" defaultValue={editingItem?.techStack} placeholder="Tech Stack" className="form-input" />

                      <input name="imageUrl" defaultValue={editingItem?.imageUrl} placeholder="Image URL" className="form-input" />

                      <input name="liveLink" defaultValue={editingItem?.liveLink} placeholder="Live Website URL" className="form-input" />

                      <input name="githubLink" defaultValue={editingItem?.githubLink} placeholder="GitHub Repo URL" className="form-input" />
                    </>
                  )}


                  {/* EDUCATION */}
                  {tab === "education" && (
                    <>
                      <input name="degree" defaultValue={editingItem?.degree} placeholder="Degree" required className="form-input" />

                      <input name="university" defaultValue={editingItem?.university} placeholder="University" className="form-input" />

                      <div className="flex gap-3">
                        <input name="startDate" defaultValue={editingItem?.startDate} placeholder="Start" className="form-input" />
                        <input name="endDate" defaultValue={editingItem?.endDate} placeholder="End" className="form-input" />
                      </div>

                      <input name="gpa" defaultValue={editingItem?.gpa} type="number" step="0.01" placeholder="GPA" className="form-input" />
                    </>
                  )}


                  {/* SKILL */}
                  {tab === "skill" && (
                    <>
                      <input name="name" defaultValue={editingItem?.name} placeholder="Skill Name" required className="form-input" />

                      <input name="category" defaultValue={editingItem?.category} placeholder="Category" className="form-input" />

                      <input name="level" defaultValue={editingItem?.level} type="number" placeholder="Level %" className="form-input" />
                    </>
                  )}


                  <button
                    type="submit"
                    className={`w-full py-4 rounded-2xl font-black text-white
                      ${editingItem ? "bg-orange-500" : "bg-slate-900"}`}
                  >
                    {editingItem ? "Update" : "Save"}
                  </button>

                </form>

              </div>

            </div>

          )}



          {/* ================= DATA ================= */}
          <div className="xl:col-span-3">


            {/* ================= MESSAGES ================= */}
           {/* ================= MESSAGES ================= */}
{tab === "message" && (

  <div className="space-y-6">

    {/* Empty State */}
    {items.length === 0 && (
      <div className="bg-white p-20 rounded-3xl border text-center text-slate-400 font-bold italic">
        No messages yet 📭
      </div>
    )}


    {/* Message Cards */}
    {items.map((m) => (

      <div
        key={m.id}
        className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all"
      >

        {/* Header */}
        <div className="flex justify-between items-start mb-4">

          <div>
            <h4 className="text-xl font-black text-slate-800">
              {m.subject || "No Subject"}
            </h4>

            <p className="text-sm font-bold text-blue-600 uppercase tracking-tighter">
              From: {m.name} ({m.email})
            </p>
          </div>


          <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full border italic">
            {new Date(m.createdAt).toLocaleDateString()}
          </span>

        </div>


        {/* Content */}
        <div className="bg-slate-50 p-5 rounded-2xl text-slate-600 font-medium leading-relaxed italic">
          “{m.content}”
        </div>


        {/* Actions */}
        <div className="mt-4 flex gap-4 justify-end">

          {/* Mark Read */}
          {!m.isRead && (
            <button
              onClick={() => markAsRead(m.id)}
              className="text-[10px] font-black text-blue-500 hover:text-blue-700 uppercase tracking-widest"
            >
              Mark Read
            </button>
          )}


          {/* Delete */}
          <button
            onClick={() => handleDelete(m.id)}
            className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest"
          >
            Delete Message
          </button>

        </div>

      </div>

    ))}

  </div>

)}



            {/* ================= TABLE ================= */}
            {tab !== "message" && (

              <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">


                <table className="w-full text-left">


                  <thead className="bg-slate-50 border-b">

                    <tr>
                      <th className="p-6 text-[10px] uppercase font-bold text-slate-400">
                        Details
                      </th>

                      <th className="p-6 text-[10px] uppercase font-bold text-slate-400 text-right">
                        Actions
                      </th>
                    </tr>

                  </thead>



                  <tbody className="divide-y">


                    {filteredItems.map((item) => (

                      <tr key={item.id} className="hover:bg-slate-50">


                        {/* PROJECT */}
                        {tab === "project" ? (

                          <td className="p-6 flex items-center gap-4">


                            <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden border shadow-inner">

                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300 font-bold">
                                  NO IMG
                                </div>
                              )}

                            </div>


                            <div>

                              <p className="font-bold text-slate-800">
                                {item.title}
                              </p>

                              <p className="text-xs text-slate-400 uppercase">
                                {item.category}
                              </p>


                              <div className="flex gap-2 mt-1">

                                {item.liveLink && (
                                  <a
                                    href={item.liveLink}
                                    target="_blank"
                                    className="text-[8px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded font-black uppercase"
                                  >
                                    Live
                                  </a>
                                )}

                                {item.githubLink && (
                                  <a
                                    href={item.githubLink}
                                    target="_blank"
                                    className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black uppercase"
                                  >
                                    GitHub
                                  </a>
                                )}

                              </div>

                            </div>

                          </td>

                        ) : (

                          <td className="p-6">

                            <p className="font-bold text-lg">
                              {item.degree || item.name}
                            </p>

                            <p className="text-xs text-slate-400 uppercase">
                              {item.university || item.category}
                            </p>

                          </td>

                        )}



                        {/* ACTIONS */}
                        <td className="p-6 text-right">

                          <button
                            onClick={() => {
                              setEditingItem(item);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-blue-600 font-black text-xs mr-4"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-400 font-black text-xs"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>



                {loading && (
                  <div className="p-10 text-center animate-pulse text-slate-300 font-bold">
                    Syncing MySQL...
                  </div>
                )}

              </div>

            )}

          </div>

        </div>
      </main>



      {/* ================= STYLES ================= */}
      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1rem;
          background: #f8fafc;
          border: 2px solid #f1f5f9;
          border-radius: 1.25rem;
          outline: none;
          font-weight: 600;
        }

        .form-input:focus {
          border-color: #3b82f6;
          background: white;
        }
      `}</style>

    </div>
  );
}
