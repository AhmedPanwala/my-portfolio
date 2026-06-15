import React from 'react'
import { motion } from 'framer-motion'

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
    <section id="experience" style={{ padding: '100px 0' }}>
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '0 40px',
      }}>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: 60,
            textAlign: 'center',
          }}
        >
          Experience
        </motion.h2>

        <div style={{ position: 'relative', paddingLeft: 32 }}>

          <div style={{
            position: 'absolute',
            left: 10,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, #00FFD1, rgba(0,255,209,0.1))',
            borderRadius: 2,
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{ position: 'relative', marginBottom: 40 }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                style={{
                  position: 'absolute',
                  left: -36,
                  top: 20,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#00FFD1',
                  boxShadow: '0 0 10px rgba(0,255,209,0.5)',
                  border: '2px solid #020818',
                }}
              />

              <div style={{
                background: 'rgba(7,20,40,0.8)',
                border: '1px solid rgba(0,255,209,0.1)',
                borderRadius: 16,
                padding: '24px 20px',
                transition: 'border-color 0.3s ease',
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0,255,209,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,255,209,0.1)'}
              >
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: 10,
                }}>
                  {exp.role}
                </h3>

                <p style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 'clamp(0.78rem, 2.5vw, 0.9rem)',
                  color: '#A0A0A0',
                  lineHeight: 1.8,
                  marginBottom: 16,
                }}>
                  {exp.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 'clamp(0.65rem, 2vw, 0.72rem)',
                      color: '#00FFD1',
                      border: '1px solid rgba(0,255,209,0.2)',
                      background: 'rgba(0,255,209,0.05)',
                      padding: '4px 10px',
                      borderRadius: 20,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
