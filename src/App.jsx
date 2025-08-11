import React, { useState, useMemo } from 'react';

// Example Data
const DATA = {
  hero: {
    title: "CPU Encyclopedia — From Vacuum Tubes to RISC-V",
    subtitle: "Everything about CPUs for beginners and experts.",
    cta: "Explore the Encyclopedia",
  },
  highlights: [
    { id: "isa", title: "Instruction Set Architectures", desc: "x86, ARM, and RISC-V: rules for software-hardware communication.", tag: "Core" },
    { id: "microarch", title: "Microarchitecture", desc: "Pipeline designs, caches, superscalar execution.", tag: "Deep" },
    { id: "evolution", title: "Evolution Timeline", desc: "From early CPUs to cutting-edge chips.", tag: "History" },
  ],
  topics: [
    {
      id: "cpu-def",
      title: "What is a CPU?",
      short: "Central processing unit executes program instructions.",
      long: "A CPU runs computer instructions by performing arithmetic, logic, control, and I/O operations. Modern CPUs include multiple cores, complex caches, and advanced processing features."
    },
    {
      id: "riscv",
      title: "RISC-V — The Open ISA",
      short: "A free & open instruction set architecture.",
      long: "RISC-V provides extensibility and removes proprietary licensing constraints. It's gaining adoption in academia, industry, and embedded systems."
    }
  ],
  timeline: [
    { year: 1971, title: "Intel 4004", note: "First commercial microprocessor." },
    { year: 1980, title: "RISC Research", note: "Academic push for simplified but faster ISAs." },
    { year: 2008, title: "ARMv8", note: "64-bit ARM architecture introduced." },
    { year: 2022, title: "RISC-V Momentum", note: "Open ISA adoption grows worldwide." }
  ]
};

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const topics = useMemo(() => {
    if (!query) return DATA.topics;
    return DATA.topics.filter(t =>
      (t.title + t.short + (t.long || "")).toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="app">
      <header>
        <h1>{DATA.hero.title}</h1>
        <p>{DATA.hero.subtitle}</p>
        <button onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
          {DATA.hero.cta}
        </button>
      </header>

      <div className="container">
        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search topics..."
          />
        </div>

        {/* Highlights */}
        <div className="highlights">
          {DATA.highlights.map(h => (
            <div className="highlight-card" key={h.id}>
              <span className="highlight-tag">{h.tag}</span>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Topics */}
        <section className="topics">
          {topics.map(t => (
            <div key={t.id} className="topic-card">
              <div className="topic-content">
                <h4 className="topic-title">{t.title}</h4>
                <p className="topic-short">{t.short}</p>
                <button className="topic-button" onClick={() => setSelected(t)}>
                  Read more →
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Detail panel */}
        {selected && (
          <div className="detail-panel">
            <div className="detail-content">
              <h3 className="detail-title">{selected.title}</h3>
              <p className="detail-text">{selected.long}</p>
              <div className="detail-refs">References: Example Source</div>
              <button onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        )}

        {/* Timeline */}
        <section className="timeline">
          <h3>CPU Timeline</h3>
          {DATA.timeline.map(ev => (
            <div key={ev.year} className="timeline-item">
              <div className="timeline-item-year">{ev.year}</div>
              <div className="timeline-item-content">
                <div className="timeline-item-title">{ev.title}</div>
                <div className="timeline-item-note">{ev.note}</div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <footer>© 2025 CPU Encyclopedia</footer>
    </div>
  );
}
