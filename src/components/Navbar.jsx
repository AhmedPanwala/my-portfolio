import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import profilePhoto from '../assets/ahmed.JPG'

const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
]

const logoVariants = {
    initial: {},
    animate: {
        transition: { staggerChildren: 0.08 },
    },
}

const letter = {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.36 } },
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [active, setActive] = useState('hero')
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const menuRef = useRef(null)
    const hamburgerRef = useRef(null)
    const profileRef = useRef(null)
    const [showProfileTip, setShowProfileTip] = useState(false)

    const prevY = useRef(0)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > 20) setScrolled(true)
        else setScrolled(false)

        if (latest > prevY.current && latest > 60) setHidden(true)
        else setHidden(false)
        prevY.current = latest
    })

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('main section[id]'))
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
            { root: null, threshold: 0.48 }
        )
        sections.forEach((s) => obs.observe(s))
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        const onDown = (e) => {
            if (!mobileOpen) return
            if (!menuRef.current) return
            if (hamburgerRef.current && hamburgerRef.current.contains(e.target)) return
            if (!menuRef.current.contains(e.target)) setMobileOpen(false)
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [mobileOpen])

    return (
        <>
            {/* Desktop header */}
            <motion.header
                className="desktop-navbar"
                role="banner"
                initial={false}
                animate={{
                    y: hidden ? -84 : 0,
                    backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
                    background: scrolled ? 'rgba(2,8,24,0.88)' : 'transparent',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                style={{ position: 'fixed', left: 0, right: 0, top: 12, zIndex: 60 }}
            >
                <motion.div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: scrolled ? 'linear-gradient(90deg, transparent, #00FFD1, #FFB347, transparent)' : 'transparent', opacity: 0.6, pointerEvents: 'none' }} />

                <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 70 }}>
                    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                            <a href="#hero" className="brand" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                            <div className="brand-monogram" style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, rgba(0,255,209,0.15), rgba(255,179,71,0.08))', border: '1px solid rgba(0,255,209,0.25)', display: 'grid', placeItems: 'center' }}>
                                <motion.span style={{ display: 'flex', gap: 2, fontFamily: 'Syne, var(--font-heading)', fontWeight: 800, fontSize: '1rem' }}>
                                    <span style={{ color: '#00FFD1' }}><motion.span variants={letter}>A</motion.span></span>
                                    <span style={{ color: '#FFB347' }}><motion.span variants={letter}>P</motion.span></span>
                                </motion.span>
                            </div>
                            <div className="nav-brand-text" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', color: '#FFFFFF' }}>Ahmed Panwala</div>
                                <div style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: '#555', letterSpacing: '0.08em' }}>Fullstack Developer</div>
                            </div>
                        </a>

                        <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <ul className="row desktop-nav" style={{ listStyle: 'none', gap: 8, margin: 0, padding: 0 }}>
                                {links.map((l) => (
                                    <li key={l.id}>
                                        <a href={`#${l.id}`} className={active === l.id ? 'nav-link active' : 'nav-link'} style={{ textDecoration: 'none', display: 'inline-block' }}>
                                            <span>{l.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="desktop-nav" style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 8 }}>
                                <div className="profile-wrap" style={{ position: 'relative' }} ref={profileRef}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} style={{ width: 38, height: 38, borderRadius: 999, overflow: 'hidden', cursor: 'pointer', border: '2px solid rgba(0,255,209,0.4)', boxShadow: '0 0 12px rgba(0,255,209,0.2)' }} onMouseEnter={() => setShowProfileTip(true)} onMouseLeave={() => setShowProfileTip(false)}>
                                        <img src={profilePhoto} alt="Ahmed" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    </motion.div>
                                    <AnimatePresence>{showProfileTip && (
                                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} style={{ position: 'absolute', top: 48, right: 0, background: 'rgba(3,13,31,0.9)', border: '1px solid rgba(0,255,209,0.18)', color: '#FFF', fontFamily: 'DM Mono', fontSize: '0.72rem', padding: '6px 12px', borderRadius: 8, whiteSpace: 'nowrap' }}>Ahmed Panwala</motion.div>
                                    )}</AnimatePresence>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </motion.header>

            {/* Hamburger button - visible only on mobile via mobile.css */}
            <button
                className="mobile-hamburger-btn"
                ref={hamburgerRef}
                aria-label="Open menu"
                onClick={() => setMobileOpen((s) => !s)}
                style={{
                    position: 'fixed', top: 14, left: 16, zIndex: 9999,
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(0,255,209,0.07)', border: '1px solid rgba(0,255,209,0.22)',
                    display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', padding: 0
                }}
            >
                <span style={{ width: 18, height: 2, background: '#fff', borderRadius: 2 }} />
                <span style={{ width: 18, height: 2, background: '#fff', borderRadius: 2 }} />
                <span style={{ width: 18, height: 2, background: '#fff', borderRadius: 2 }} />
            </button>

            {/* mobile centered logo removed to prevent duplicate UI artifact under the hamburger */}

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 28px 36px)', opacity: 0 }}
                        animate={{ clipPath: 'circle(150% at 28px 36px)', opacity: 1 }}
                        exit={{ clipPath: 'circle(0% at 28px 36px)', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 9990, background: 'rgba(2,8,24,0.98)', backdropFilter: 'blur(28px)', display: 'flex', flexDirection: 'column', padding: '36px 20px' }}
                    >
                        <div ref={menuRef} style={{ display: 'flex', flexDirection: 'column', gap: 26, alignItems: 'center', flex: 1 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 80, height: 80, borderRadius: 999, overflow: 'hidden', border: '3px solid #00FFD1' }}>
                                    <img src={profilePhoto} alt="Ahmed" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                </div>
                                <div style={{ color: '#fff', fontFamily: 'Syne', fontSize: '1.1rem', fontWeight: 700 }}>Ahmed Panwala</div>
                                <div style={{ color: '#aaa', fontFamily: 'DM Mono', fontSize: '0.85rem' }}>Fullstack Developer</div>
                            </div>

                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 18 }}>
                                    {links.map((l, i) => (
                                        <motion.li key={l.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ delay: i * 0.07 }} style={{ margin: 0 }}>
                                            <a href={`#${l.id}`} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '8px 12px', color: active === l.id ? '#00FFD1' : '#fff', background: active === l.id ? 'rgba(0,255,209,0.06)' : 'transparent', borderRadius: 8, textDecoration: 'none', fontSize: '1.05rem' }}>{l.label}</a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 8px' }}>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <a href="#" style={{ color: '#fff' }}>Github</a>
                                    <a href="#" style={{ color: '#fff' }}>LinkedIN</a>
                                </div>
                                <button onClick={() => setMobileOpen(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', padding: '8px 12px', borderRadius: 8 }}>Close</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .desktop-nav .nav-link { display: inline-block; padding: 7px 14px; border-radius: 8px; font-family: 'DM Mono'; font-size: 0.82rem; letter-spacing: 0.04em; color: #888; transition: all 0.2s ease; }
                .desktop-nav .nav-link:hover { background: rgba(255,255,255,0.04); color: #FFFFFF; }
                .desktop-nav .nav-link.active { background: rgba(0,255,209,0.08); color: #00FFD1; border: 1px solid rgba(0,255,209,0.18); }
                .mobile-hamburger-btn { display: none }
                .mobile-nav-logo { display: none }
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important }
                    .mobile-hamburger-btn { display: flex !important }
                    /* hide the small monogram when on mobile to avoid duplicate UI with hamburger */
                    .brand-monogram { display: none !important }
                }
            `}</style>
        </>
    )
}
