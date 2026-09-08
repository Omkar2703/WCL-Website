import nodemailer from 'nodemailer'

function getTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
}

// No-ops quietly if SMTP isn't configured -- the message is always saved to
// MongoDB regardless, this only covers the "notify the admin by email" part.
export async function notifyAdmin({ name, email, message }) {
  const transport = getTransport()
  if (!transport || !process.env.NOTIFY_EMAIL) return

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: `New enquiry from ${name} -- Water & Climate Lab site`,
    text: `From: ${name} <${email}>\n\n${message}`
  })
}
