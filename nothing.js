 {/* 🖼️ PROJECT SHOWCASE */}
      <section id="work" className="py-32 px-6 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-xs font-black uppercase tracking-[0.8em] text-blue-600 mb-4">{t[lang].work}</h2>
            <p className="text-5xl md:text-6xl font-black tracking-tight italic uppercase">Featured Work</p>
          </motion.div>

          {/* Projects Grid */}
        

          {/* Show More Button */}
          {data.projects.length > 5 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <motion.button
                onClick={() => setShowAllProjects(!showAllProjects)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${
                  isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                } shadow-lg hover:shadow-2xl`}
              >
                <motion.span
                  animate={{ 
                    opacity: showAllProjects ? [1, 0.5, 1] : 1 
                  }}
                  transition={{ duration: 2, repeat: showAllProjects ? Infinity : 0 }}
                >
                  {showAllProjects ? 'Show Less' : `Show More (${data.projects.length - 5})`}
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
<div className="space-y-32">
            {(showAllProjects ? data.projects : data.projects.slice(0, 5)).map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <motion.div
                  className={`relative group ${idx % 2 === 1 ? 'md:order-2' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Project Number */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`absolute -top-8 -left-8 w-[60px] h-[60px] rounded-full flex items-center justify-center font-black text-2xl z-10 ${
                      isDark ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                    }`}
                  >
                    0{idx + 1}
                  </motion.div>

                  {/* Image Container */}
                  <div className={`relative h-[300px] w-[500px] rounded-2xl overflow-hidden border ${
                    isDark ? 'border-white/10 bg-slate-900' : 'border-slate-200 bg-white shadow-2xl'
                  }`}>
                    <div className="aspect-[4/3] relative">
                      <motion.img
                        src={p.imageUrl}
                        alt={p.title}
                        className="h-[300px] w-[500px] object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      {/* Overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-tr from-blue-600/90 via-purple-600/80 to-pink-600/70 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileHover={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
                        >
                          <ArrowUpRight className="text-blue-600" size={32} />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isDark 
                        ? 'bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20' 
                        : 'bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10'
                    }`} />
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-30 ${
                      isDark ? 'bg-blue-500' : 'bg-blue-400'
                    }`}
                  />
                </motion.div>

                {/* Content Side */}
                <motion.div
                  className={`space-y-6 ${idx % 2 === 1 ? 'md:order-1' : ''}`}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                      isDark 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-blue-100 text-blue-600 border border-blue-200'
                    }`}>
                      {p.category}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
                  >
                    {p.title}
                  </motion.h3>

                  {/* Description (if available) */}
                  {p.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className={`text-lg leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {p.description}
                    </motion.p>
                  )}

                  {/* Tech Stack */}
                  {p.techStack && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-3"
                    >
                      {p.techStack.split(',').map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          className={`px-4 py-2 rounded-xl text-sm font-bold ${
                            isDark 
                              ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {tech.trim()}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  {/* View Project Link */}
                  <motion.a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ x: 10 }}
                    className={`inline-flex items-center gap-3 text-lg font-black uppercase tracking-wider group ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    View Project
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowUpRight size={24} />
                    </motion.div>
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </div>


















