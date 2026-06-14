import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(bodyParser.json())

// simple health
app.get('/api/health', (req, res) => res.json({ ok: true }))

// contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

  // configure transporter via environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mail = {
    from: `${name} <${email}>`,
    to: process.env.CONTACT_TO || process.env.SMTP_USER,
    subject: `Portfolio contact from ${name}`,
    text: message,
    html: `<p><strong>${name} &lt;${email}&gt;</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
  }

  try {
    await transporter.sendMail(mail)
    return res.json({ ok: true })
  } catch (err) {
    console.error('sendMail error', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
})

// serve static build if exists
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server listening on ${port}`))
