import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import profilePhoto from '../assets/ahmed.JPG'

function useCountUp(ref, to, duration = 1200) {
    useEffect(() => {
        const el = ref.current
        if (!el) return
        let start = null
        const from = 0

        function step(ts) {
            if (!start) start = ts
            const progress = Math.min((ts - start) / duration, 1)
            const val = Math.floor(from + (to - from) * progress)
            el.textContent = val + (to >= 10 ? '+' : '')
            if (progress < 1) requestAnimationFrame(step)
        }

        requestAnimationFrame(step)
        return () => { }
    }, [ref, to, duration])
}

export default function About() {
    const statsRef = useRef([])
    const sectionRef = useRef(null)

    useEffect(() => {
        const node = sectionRef.current
        if (!node) return
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // trigger count up
                    useCountUp(statsRef.current[0], 3, 1200)
                    useCountUp(statsRef.current[1], 10, 1400)
                    useCountUp(statsRef.current[2], 2, 1000)
                    obs.disconnect()
                }
            })
        }, { threshold: 0.18 })

        obs.observe(node)
        return () => obs.disconnect()
    }, [])

        return (
                <section id="about" ref={sectionRef} style={{ padding: '100px 0' }}>
                    <div style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '0 40px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 60,
                    }}>

                        {/* Top row: photo + bio */}
                        <div className="about-top-row" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 48,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>

                            {/* Photo */}
                            <div className="about-photo" style={{ flexShrink: 0 }}>
                                <motion.div className="profile-photo"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,255,209,0.5)' }}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{
                                        width: 'clamp(140px, 25vw, 260px)',
                                        height: 'clamp(140px, 25vw, 260px)',
                                        borderRadius: '50%',
                                        border: '3px solid #00FFD1',
                                        boxShadow: '0 0 30px rgba(0,255,209,0.3)',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                    }}>
                                    <img
                                        src={profilePhoto}
                                        loading="lazy"
                                        alt="Ahmed Panwala"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null
                                            e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 260 260"><rect width="100%" height="100%" fill="#020818"/><circle cx="130" cy="130" r="120" fill="#001210" stroke="#00FFD1" stroke-width="5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Syne, Arial, sans-serif" font-size="60" fill="#00FFD1">AP</text></svg>')
                                        }}
                                    />
                                </motion.div>
                            </div>

                            {/* Bio text */}
                            <div className="about-bio" style={{ flex: 1, minWidth: 260 }}>
                                <h2 style={{ marginBottom: 12, fontFamily: 'var(--font-heading)' }}>About</h2>
                                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                                    I'm Ahmed Panwala, a Fullstack Developer with hands-on experience across both the MERN stack and the SAP ecosystem. On the frontend, I build dynamic, data-rich web applications using React and TypeScript — including a production Admin Dashboard with role-based access, real-time data tables, and interactive charts. On the enterprise side, I work with SAP BTP, CAPM, and Fiori — designing cloud-native backend services with CDS models and OData V4 APIs, and crafting intuitive SAP Fiori applications with SAPUI5 for real business workflows. I enjoy working at the intersection of performance, clean architecture, and great user experience — whether that's a pixel-perfect React interface or a robust SAP service running on BTP.
                                </p>
                            </div>
                        </div>

                        {/* Bottom row: stat cards */}
                        <div className="about-stats" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 16,
                            justifyContent: 'center',
                        }}>
                            <div className="card card--glass" style={{ flex: '1 1 140px', maxWidth: 180, minWidth: 120, padding: '20px 16px', textAlign: 'center', background: 'rgba(7,20,40,0.8)', border: '1px solid rgba(0,255,209,0.1)', borderRadius: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div className="caps">Experience</div>
                                        <div className="small muted">Years in development</div>
                                    </div>
                                    <div style={{ fontSize: '1.6rem', fontWeight: 700 }} ref={(el) => statsRef.current[0] = el}>1</div>
                                </div>
                            </div>

                            <div className="card card--glass" style={{ flex: '1 1 140px', maxWidth: 180, minWidth: 120, padding: '20px 16px', textAlign: 'center', background: 'rgba(7,20,40,0.8)', border: '1px solid rgba(0,255,209,0.1)', borderRadius: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div className="caps">Projects</div>
                                        <div className="small muted">Delivered</div>
                                    </div>
                                    <div style={{ fontSize: '1.6rem', fontWeight: 700 }} ref={(el) => statsRef.current[1] = el}>10  +</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
        )
}

