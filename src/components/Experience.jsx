import React from 'react'

export default function Experience() {
  const experiences = [
    {
      id: 1,
      role: 'MERN Stack Developer',
      desc: 'Built a full-featured Admin Dashboard using React and TypeScript with data tables, charts, role-based access control, and REST API integration. Deployed on Vercel.',
      tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'REST APIs'],
    },
    {
      id: 2,
      role: 'SAP BTP Developer',
      desc: 'Developed cloud-native backend services on SAP BTP using CAPM with CDS data models and OData V4 APIs. Also built enterprise SAP Fiori applications using SAPUI5 for workflow and approval management, integrated with SAP backend systems via OData services.',
      tags: ['SAP BTP', 'CAPM', 'SAP Fiori', 'SAPUI5', 'OData V4', 'CDS', 'Node.js'],
    },
  ]

  return (
    <section id="experience" style={{ padding: '72px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FFFFFF', marginBottom: 18, position: 'relative' }}>
          Experience
        </h2>

        <div style={{ maxWidth: 900, margin: '0 auto' }} className="timeline">
          {experiences.map((it) => (
            <div key={it.id} className="timeline__item">
              <div style={{ fontWeight: 700 }}>{it.role}</div>
              <div style={{ color: 'var(--muted)', marginTop: 6 }}>{it.period}</div>
              <div style={{ marginTop: 8 }}>{it.desc}</div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                {it.tags.map((t) => (
                  <span key={t} style={{ color: '#00FFD1', border: '1px solid rgba(0,255,209,0.2)', background: 'rgba(0,255,209,0.05)', padding: '4px 10px', borderRadius: 20, fontSize: '0.72rem', fontFamily: 'DM Mono' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience { padding: 60px 20px !important; }
          .timeline { padding-left: 12px !important; }
          .timeline::before { left: 0; }
          .timeline__item { padding-left: 18px; width: 100%; box-sizing: border-box; padding: 16px; }
          .timeline__item { animation: slideInLeft .5s var(--ease-smooth) both; transform-origin: left; }
          .timeline__dot { left: -6px; }
        }
        @media (min-width: 769px) {
          .timeline { margin: 0 auto; max-width: 900px; }
        }
      `}</style>
    </section>
  )
}
