import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Database,
  Server,
  Atom,
  Code2,
  Box,
  Share2,
  Smartphone,
  FileCode,
  Cloud,
  Layers,
  Layout,
  GitBranch,
  Code,
} from 'lucide-react'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.44 } },
}

export default function Skills() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const leftInView = useInView(leftRef, { once: true, margin: '-120px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-120px' })

  // New groups per request (added SQL to MERN group)
  const mernSkills = [
    { name: 'MongoDB', icon: 'Database' },
    { name: 'Express.js', icon: 'Server' },
    { name: 'React', icon: 'Atom' },
    { name: 'Node.js', icon: 'Code2' },
    { name: 'Docker', icon: 'Box' },
    { name: 'Kubernetes', icon: 'Share2' },
    { name: 'Flutter', icon: 'Smartphone' },
    { name: 'TypeScript', icon: 'FileCode' },
    { name: 'SQL', icon: 'Database' },
  ]

  const sapSkills = [
    { name: 'SAP BTP', icon: 'Cloud' },
    { name: 'SAP CAPM', icon: 'Layers' },
    { name: 'SAP Fiori', icon: 'Layout' },
    { name: 'OData', icon: 'GitBranch' },
  ]

  const iconMap = {
    Database,
    Server,
    Atom,
    Code2,
    Box,
    Share2,
    Smartphone,
    FileCode,
    Cloud,
    Layers,
    Layout,
    GitBranch,
    Code,
  }

  const SkillCard = ({ name, iconName, accent = 'cyan', index = 0 }) => {
    const Icon = iconMap[iconName] || Code

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.44, delay: index * 0.1 }}
        whileHover={{ y: -6 }}
        className="card skill-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '20px 12px',
          textAlign: 'center',
          minHeight: 110,
          overflow: 'hidden',
          position: 'relative',
          background: '#071428', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16
        }}
      >
        <div style={{ position: 'relative', flexShrink: 0, width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={24} color={'#00FFD1'} />
        </div>
        <span className="skill-name" style={{ fontSize: '0.78rem', textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'normal', lineHeight: 1.3, width: '100%', color: '#fff', fontFamily: 'var(--font-heading)' }}>{name}</span>
      </motion.div>
    )
  }

  return (
    <section id="skills" style={{ padding: '72px 0' }}>
      <div className="container">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ display: 'grid', gap: 60 }}>

          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: 20 }}>MERN & DevOps</div>
      <div style={{ display: 'grid', gap: 12 }} className="skills-grid">
              {mernSkills.map((s, i) => (
        <SkillCard key={s.name} name={s.name} iconName={s.icon} accent={'cyan'} index={i} />
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: 20 }}>SAP & Enterprise</div>
      <div style={{ display: 'grid', gap: 12 }} className="skills-grid">
              {sapSkills.map((s, i) => (
        <SkillCard key={s.name} name={s.name} iconName={s.icon} accent={'amber'} index={i} />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
      <style>{`
        @media (max-width: 900px) { #skills .skills-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 600px) { #skills .skills-grid { grid-template-columns: repeat(2,1fr); } #skills .card { padding: 20px 12px; } #skills svg { width: 36px; height: 36px; } #skills { padding: 60px 20px; } #skills > .container > div { gap: 40px; } }
        @media (max-width: 400px) { #skills .skills-grid { grid-template-columns: repeat(2,1fr); } }
      `}</style>
    </section>
  )
}
