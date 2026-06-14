import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Admin Dashboard',
    desc: 'A full-featured admin panel built with React and TypeScript. Includes data tables, charts, role-based access control, and real-time updates via REST APIs.',
    tech: ['React', 'TypeScript', 'REST APIs', 'Vite'],
    url: 'https://dash-stack-sigma.vercel.app',
    hasLink: true,
  },
  {
    id: 2,
    title: 'SAP CAPM Service',
    desc: 'Cloud-native backend service built on SAP BTP using the Cloud Application Programming Model. Includes CDS data models, OData V4 APIs, and service handlers in Node.js.',
    tech: ['SAP BTP', 'CAPM', 'CDS', 'OData', 'Node.js'],
    hasLink: false,
  },
  {
    id: 3,
    title: 'SAP Fiori Application',
    desc: 'Enterprise SAP Fiori application built with SAPUI5 for workflow and approval management. Integrated with SAP backend services via OData.',
    tech: ['SAP Fiori', 'SAPUI5', 'OData', 'JavaScript'],
    hasLink: false,
  },
]

function useTiltEffect(cardRef, options = { max: 12, perspective: 900 }) {
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
  // disable tilt on touch devices
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return
    let rect = null

    const onMove = (e) => {
      rect = el.getBoundingClientRect() 
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy
      const rx = (-dy * options.max).toFixed(2)
      const ry = (dx * options.max).toFixed(2)
      el.style.transform = `perspective(${options.perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
      el.style.transition = 'transform 0.08s ease'
    }

    const onLeave = () => { el.style.transform = ''; el.style.transition = 'transform 0.28s ease' }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [cardRef, options])
}

function BorderAnim({ hover }) {
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 12, pointerEvents: 'none', background: hover ? 'conic-gradient(from 90deg, rgba(0,255,209,0.12), rgba(255,179,71,0.12), rgba(0,255,209,0.12))' : 'transparent', filter: hover ? 'blur(6px)' : 'none', transition: 'all .36s ease' }} />
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [hover, setHover] = React.useState(false)
  useTiltEffect(ref)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="card"
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 12 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: 'absolute', inset: -2, padding: 2, borderRadius: 12, pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 10, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }} />
        <BorderAnim hover={hover} />
      </div>

  <div style={{ position: 'relative', zIndex: 2, padding: 18 }}>
  <h3 style={{ margin: 0, marginBottom: 8, color: '#FFFFFF' }}>{project.title}</h3>
  <p style={{ margin: 0, color: '#A0A0A0', marginBottom: 12 }}>{project.desc}</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {project.tech.map((t) => (
            <span key={t} className="badge" style={{ color: '#00FFD1', border: '1px solid rgba(0,255,209,0.3)', background: 'rgba(0,255,209,0.05)' }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {project.hasLink ? (
            <a href={project.url} target="_blank" rel="noreferrer" className="btn" style={{ color: '#00FFD1', border: '1px solid #00FFD1', background: 'transparent', padding: '10px 14px', fontWeight: 700, borderRadius: 10, textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#020818'; e.currentTarget.style.background = '#00FFD1' }} onMouseLeave={(e) => { e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.background = 'transparent' }}>View Project</a>
          ) : (
            <div style={{ background: 'rgba(255,179,71,0.08)', border: '1px solid rgba(255,179,71,0.3)', color: '#FFB347', padding: '6px 14px', borderRadius: 20, fontSize: '0.75rem', fontFamily: 'DM Mono' }}>🔒 </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '72px 0' }}>
      <div className="container">
        <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: 18 }}>Projects</h2>

        <div style={{ display: 'grid', gap: 20 }}>
          {projects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} index={idx} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { #projects { padding: 60px 20px !important; } #projects .card { padding: 16px !important; } #projects .badge { font-size: 0.7rem !important; } #projects { display: block; } #projects .container > div { display: block; }
          /* make project list single-column */
          #projects .container > div > * { width: 100%; }
        }
      `}</style>
    </section>
  )
}
