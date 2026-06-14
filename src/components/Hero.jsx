import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLES = ['React Developer', 'SAP BTP Engineer', 'TypeScript Expert', 'Fiori Specialist']

function useTypingCycle(list, speed = 80, pause = 1200) {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let mounted = true
    let i = 0
    let deleting = false
    let timeout

    const tick = () => {
      const full = list[index]
      if (!deleting) {
        setDisplay(full.slice(0, i + 1))
        i++
        if (i === full.length) {
          deleting = true
          timeout = setTimeout(tick, pause)
          return
        }
      } else {
        setDisplay(full.slice(0, i - 1))
        i--
        if (i === 0) {
          deleting = false
          setIndex((s) => (s + 1) % list.length)
        }
      }
      timeout = setTimeout(tick, deleting ? speed / 2 : speed)
    }

    timeout = setTimeout(tick, 400)
    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [index])

  return display
}

export default function Hero() {
  const canvasRef = useRef(null)
  const rootRef = useRef(null)
  const cursorRef = useRef({ x: -9999, y: -9999 })
  // typing effect moved to the name (cycles the full name); role will be static
  // slow down typing: larger speed (ms per char) and longer pause at end
  const typedName = useTypingCycle(['Ahmed Panwala'], 160, 4000)

  // looping word-by-word animation variants
  const words = ['Hi,', "I'm",  'Ahmed Panwala']

  const wordVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (i) => ({
      opacity: [0, 1, 1, 1, 0],
      y: [50, 0, 0, 0, -50],
      transition: {
        duration: 3,
        delay: i * 0.25,
        repeat: Infinity,
        repeatDelay: words.length * 0.25 + 1.5,
        ease: 'easeInOut',
        times: [0, 0.15, 0.6, 0.8, 1],
      }
    })
  }

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const DPR = Math.max(1, window.devicePixelRatio || 1)
    canvas.width = w * DPR
    canvas.height = h * DPR
    ctx.scale(DPR, DPR)

  const N = window.innerWidth < 768 ? 20 : 60
    const particles = []

    function rand(min, max) { return Math.random() * (max - min) + min }

    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: rand(-0.35, 0.35),
        vy: rand(-0.35, 0.35),
        r: rand(1.0, 2.4),
      })
    }

    let raf = null

    function step() {
      ctx.clearRect(0, 0, w, h)
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        // move
        a.x += a.vx
        a.y += a.vy

        if (a.x < -10) a.x = w + 10
        if (a.x > w + 10) a.x = -10
        if (a.y < -10) a.y = h + 10
        if (a.y > h + 10) a.y = -10

        // mouse repulsion
        const dx = a.x - cursorRef.current.x
        const dy = a.y - cursorRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          a.vx += (dx / (dist || 1)) * force * 0.6
          a.vy += (dy / (dist || 1)) * force * 0.6
        }

        // draw particle
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0,255,209,0.9)'
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fill()

        // connect to nearby
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx2 = a.x - b.x
          const dy2 = a.y - b.y
          const d2 = dx2 * dx2 + dy2 * dy2
          const maxD = 120 * 120
          if (d2 < maxD) {
            const alpha = 1 - d2 / maxD
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,255,209,${0.12 * alpha})`
            ctx.lineWidth = 1
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(step)
    }

    step()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      ctx.scale(DPR, DPR)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // mouse tracking for repulsion and magnetic buttons
  useEffect(() => {
    const onMove = (e) => {
      cursorRef.current.x = e.clientX
      cursorRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // GSAP ScrollTrigger: fade out hero on scroll
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    gsap.to(el, {
      opacity: 1,
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top+=100',
        scrub: true,
      },
      onUpdate: () => {},
    })
  }, [])

  // magnetic button behavior
  // magnetic button behavior (motion-driven)
  const [pos1, setPos1] = useState({ x: 0, y: 0 })
  const [pos2, setPos2] = useState({ x: 0, y: 0 })
  const magnet = (e, ref, setter) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    const max = 12
    const tx = Math.max(-max, Math.min(max, (dx / rect.width) * dist))
    const ty = Math.max(-max, Math.min(max, (dy / rect.height) * dist))
    setter({ x: tx, y: ty })
  }

  const resetMagnetState = (setter) => setter({ x: 0, y: 0 })

  const cta1 = useRef(null)
  const cta2 = useRef(null)

  // ripple and shockwave states
  const [ripple, setRipple] = useState(null)
  const [rings, setRings] = useState([])
  const [hover1, setHover1] = useState(false)
  const [hover2, setHover2] = useState(false)

  const handleWorkClick = (e) => {
    const rect = cta1.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRipple({ x, y, id: Date.now() })
    setTimeout(() => setRipple(null), 700)
    // scroll after ripple
    setTimeout(() => {
      const t = document.getElementById('contact')
      if (t) t.scrollIntoView({ behavior: 'smooth' })
    }, 700)
  }

  const handleSeeClick = () => {
    const id = Date.now()
    setRings([id, id + 1, id + 2])
    // clear after animation
    setTimeout(() => setRings([]), 1100)
    // scroll after animation
    setTimeout(() => {
      const t = document.getElementById('projects')
      if (t) t.scrollIntoView({ behavior: 'smooth' })
    }, 900)
  }

  return (
    <section id="hero" ref={rootRef} style={{ minHeight: '100svh', position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        
        <div style={{ perspective: 1000 }} jsxstyle={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <motion.h1
            jsxstyle={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              lineHeight: 1.15,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.25em',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              margin: '0 auto',
              padding: '0 16px',
            }}
          >
            {words.map((word, i) => (
              <div key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
        <motion.span
                  custom={i}
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    display: 'inline-block',
                    color: word === 'Ahmed Panwala' ? '#00FFD1' : '#FFFFFF',
                    marginRight: i < words.length - 1 ? '0.25em' : undefined,
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.h1>
        </div>

        {/* Static role (typing removed) */}
        <motion.div style={{ marginTop: 12, fontSize: 'clamp(0.9rem, 3.5vw, 1.4rem)', color: 'var(--muted)' }}>
          <span>Fullstack Developer</span>
        </motion.div>

  <div className="cta-container" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 26 }}>
          {/* Work With Me - solid cyan */}
          <motion.button
            ref={cta1}
            className="btn"
            onMouseMove={(e) => magnet(e, cta1, setPos1)}
            onMouseLeave={() => { resetMagnetState(setPos1); setHover1(false) }}
            onMouseEnter={() => setHover1(true)}
            onClick={(e) => { handleWorkClick(e) }}
            animate={{ x: pos1.x, y: pos1.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(0,255,209,0.6), 0 0 60px rgba(0,255,209,0.3)' }}
            whileTap={{ scale: 0.94 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '14px 36px',
              borderRadius: 50,
              background: '#00FFD1',
              color: '#020818',
              fontFamily: "Syne, var(--font-heading)",
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span style={{ position: 'relative', zIndex: 3 }}>Work With Me</span>
            {/* shimmer */}
            <motion.span
              aria-hidden
              initial={{ x: '-100%' }}
              animate={hover1 ? { x: ['-100%', '100%'] } : { x: '-100%' }}
              transition={{ duration: 0.6 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: 'linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04), rgba(255,255,255,0.02))', transform: 'skewX(-20deg)', zIndex: 2, pointerEvents: 'none' }}
            />

            {/* ripple */}
            {ripple && (
              <motion.span
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'absolute',
                  left: ripple.x,
                  top: ripple.y,
                  width: 24,
                  height: 24,
                  background: '#00FFD1',
                  borderRadius: 999,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
                key={ripple.id}
              />
            )}
          </motion.button>

          {/* See My Work - outlined amber */}
          <motion.button
            ref={cta2}
            className="btn"
            onMouseMove={(e) => magnet(e, cta2, setPos2)}
            onMouseLeave={() => { resetMagnetState(setPos2); setHover2(false) }}
            onMouseEnter={() => setHover2(true)}
            onClick={() => handleSeeClick()}
            animate={{ x: pos2.x, y: pos2.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(255,179,71,0.5), 0 0 60px rgba(255,179,71,0.2)', borderColor: '#FFD700' }}
            whileTap={{ scale: 0.94 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '14px 36px',
              borderRadius: 50,
              background: 'transparent',
              color: '#FFB347',
              fontFamily: "Syne, var(--font-heading)",
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              border: '2px solid #FFB347',
              cursor: 'pointer'
            }}
          >
            <span style={{ position: 'relative', zIndex: 3 }}>See My Work</span>

            {/* shimmer */}
            <motion.span
              aria-hidden
              initial={{ x: '-100%' }}
              animate={hover2 ? { x: ['-100%', '100%'] } : { x: '-100%' }}
              transition={{ duration: 0.6 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: 'linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04), rgba(255,255,255,0.02))', transform: 'skewX(-20deg)', zIndex: 2, pointerEvents: 'none' }}
            />

            {/* shockwave rings */}
            {rings.length > 0 && rings.map((r, i) => (
              <motion.div
                key={r}
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '2px solid #FFB347',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            ))}
          </motion.button>
        </div>
        {/* social links under CTAs */}
        <div style={{ marginTop: 24, display: 'flex', gap: 20, justifyContent: 'center' }}>
          <a href="https://github.com/AhmedPanwala" target="_blank" rel="noreferrer" style={{ color: '#555', transition: 'color 0.18s' }}> 
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12a10 10 0 0 0 6.84 9.54c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.54 2.36 1.09 2.94.83.09-.65.36-1.09.65-1.34-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.67-4.57 4.92.37.32.7.95.7 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.49A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" fill="currentColor"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/ahmedpanwala" target="_blank" rel="noreferrer" style={{ color: '#555', transition: 'color 0.18s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-14h4v2a4 4 0 0 1 4-2zM2 9h4v14H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="currentColor"/></svg>
          </a>
        </div>
      </div>

      {/* bouncing arrow */}
  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 6 }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </motion.div>
    </section>
  )
}
