import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import './App.css'
import './index.css'

export default function App() {
  const [loading, setLoading] = useState(false)

  // enable smooth scroll globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  // loading overlay disabled

  // no custom cursor

  return (
  <div>
  {/* removed custom cursor elements */}

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
               background: 'linear-gradient(180deg, rgba(2,8,24,0.85), rgba(2,8,24,0.95))',
              zIndex: 9998,
            }}
          >
            <div style={{ textAlign: 'center', color: 'var(--text)' }}>
              <motion.img
                src="/src/assets/react.svg"
                alt="logo"
                style={{ width: 84, height: 84, marginBottom: 18 }}
                initial={{ rotate: 0, scale: 0.9 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              />

              <div style={{ width: 260, margin: '12px auto 0' }}>
                <motion.div
                  style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}
                >
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, #00FFD1, #FFB347)' }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  )
}
