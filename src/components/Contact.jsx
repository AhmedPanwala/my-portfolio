import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

// EMAILJS SETUP INSTRUCTIONS:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add Email Service → connect your Gmail → copy SERVICE_ID
// 3. Create Email Template → copy TEMPLATE_ID
//    Template variables to use: {{from_name}}, {{from_email}}, {{message}}
// 4. Go to Account → API Keys → copy PUBLIC_KEY
// 5. Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY above

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending
  const [serverMsg, setServerMsg] = useState('')
  const [toast, setToast] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')
    setServerMsg('')
    try {
      await emailjs.sendForm(
        'service_6q911sj',
        'template_mq8gg1v',
        formRef.current,
        'L7OuHcx8xHnqlLo_R'
      )
  setStatus('idle')
  setForm({ name: '', email: '', message: '' })
  formRef.current.reset()
  setToast({ type: 'success', message: "Thanks for reaching out! I'll get back to you within 24 hours." })
    } catch (err) {
      console.error(err)
  setStatus('idle')
  setServerMsg(err.message || 'Something went wrong. Please try again.')
  setToast({ type: 'error', message: 'Something went wrong. Please email me directly.' })
    }
  }

  // auto-dismiss toast after 5s
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <section id="contact" style={{ padding: '72px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        <div className="contact-panel">
          <h2 style={{ fontFamily: 'var(--font-heading)' }}>Contact</h2>
          <p className="muted" style={{ marginTop: 8 }}>Interested in working together or have a question? Reach out via the form or connect on social.</p>

          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} style={{ marginTop: 18 }}>
            <div className="small contact-label-cyan">Email</div>
            <div className=" contact-label-cyan" style={{ marginTop: 6 }}>ahmedpanwala60@gmail.com</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} style={{ marginTop: 12 }}>
            <div className="small contact-label-amber">Location</div>
            <div className="muted" style={{ marginTop: 6 }}>Bengaluru,India</div>
          </motion.div>

          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <motion.a href="https://github.com/AhmedPanwala" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="icon-btn" style={{ display: 'inline-grid', alignItems: 'center', gap: 10 }} aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12a10 10 0 0 0 6.84 9.54c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.54 2.36 1.09 2.94.83.09-.65.36-1.09.65-1.34-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.67-4.57 4.92.37.32.7.95.7 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.49A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" fill="currentColor"/></svg>
            </motion.a>

            <motion.a href="https://www.linkedin.com/in/ahmedpanwala" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} className="icon-btn" style={{ display: 'inline-grid', alignItems: 'center', gap: 10 }} aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-14h4v2a4 4 0 0 1 4-2zM2 9h4v14H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="currentColor"/></svg>
            </motion.a>
          </div>
        </div>

        <div>
          <form ref={formRef} onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
            <div className="field">
              <input name="from_name" className="input custom" placeholder=" " value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <label className="label">Name</label>
              {errors.name && <div className="small" style={{ color: 'rgba(255,90,90,0.9)' }}>{errors.name}</div>}
            </div>

            <div className="field">
              <input name="from_email" className="input custom" placeholder=" " value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <label className="label">Email</label>
              {errors.email && <div className="small" style={{ color: 'rgba(255,90,90,0.9)' }}>{errors.email}</div>}
            </div>

            <div className="field">
              <textarea name="message" className="textarea custom" placeholder=" " rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <label className="label">Message</label>
              {errors.message && <div className="small" style={{ color: 'rgba(255,90,90,0.9)' }}>{errors.message}</div>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <motion.button type="submit" className="btn" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #00FFD1, #00B894)', color: '#020818', fontWeight: 700, fontFamily: 'var(--font-heading)', borderRadius: 50, padding: '14px 40px', border: 'none', minWidth: 140 }} whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,255,209,0.4)' }} whileTap={{ scale: 0.96 }} disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <motion.div style={{ width: 22, height: 22, border: '3px solid rgba(255,255,255,0.18)', borderTopColor: 'var(--cyan)', borderRadius: 999 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                ) : (
                  <span>Send Message</span>
                )}
                <motion.span className="shimmer" style={{ position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} whileHover={{ x: ['-100%', '100%'] }} transition={{ duration: 0.9, ease: 'linear' }} />
              </motion.button>

              {/* Toasts handled separately via AnimatePresence below */}
            </div>
          </form>
        </div>
      </div>

      {/* Toast area */}
      <AnimatePresence>
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      <style>{`@media (max-width: 768px) { #contact .container { grid-template-columns: 1fr !important; } .container { padding: 0 12px; } .field .input, .field .textarea { font-size: 15px; } .contact-panel { padding: 24px !important; } #contact .icon-btn { gap: 10px; } #contact form button { width: 100%; max-width: none; } @media (max-width: 480px) { #contact form button { width: 100%; } } }`}</style>
    </section>
  )
}

  function Toast({ type, message, onClose }) {
    return (
  <>
  <motion.div
          className="toast"
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 99999,
            minWidth: 300,
            maxWidth: 380,
            padding: '16px 20px',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            background: type === 'success'
              ? 'linear-gradient(135deg, rgba(0,255,209,0.12), rgba(0,184,148,0.08))'
              : 'linear-gradient(135deg, rgba(255,99,99,0.12), rgba(255,60,60,0.08))',
            border: type === 'success' ? '1px solid rgba(0,255,209,0.3)' : '1px solid rgba(255,99,99,0.3)',
            backdropFilter: 'blur(20px)',
            boxShadow: type === 'success' ? '0 8px 32px rgba(0,255,209,0.15)' : '0 8px 32px rgba(255,99,99,0.15)'
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: type === 'success' ? 'rgba(0,255,209,0.15)' : 'rgba(255,99,99,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {type === 'success' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFD1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M20 6L9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6363" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: 4 }}>
              {type === 'success' ? 'Message Sent!' : 'Failed to Send'}
            </div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.78rem', color: '#A0A0A0', lineHeight: 1.5 }}>
              {message}
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: 4, flexShrink: 0, lineHeight: 1 }}>✕</button>

          {/* progress bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
              borderRadius: '0 0 16px 16px', transformOrigin: 'left',
              background: type === 'success' ? '#00FFD1' : '#FF6363'
            }}
          />
        </motion.div>
        <style>{`@media (max-width: 480px) { .toast { right: 16px !important; left: 16px !important; bottom: 16px !important; min-width: unset !important; } }`}</style>
      </>
      )
  }
