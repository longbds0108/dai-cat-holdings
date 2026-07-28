const nodemailer = require('nodemailer');

function getTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
}

// No-ops quietly when SMTP isn't configured (e.g. local dev) — the inquiry is already saved to the database.
async function sendContactNotification({ name, email, phone, message }) {
  const transport = getTransport();
  if (!transport) {
    console.log(`[mailer] SMTP not configured, skipping email for inquiry from ${email}`);
    return;
  }

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `[Website] Yêu cầu tư vấn mới từ ${name}`,
    text: `Họ tên: ${name}\nEmail: ${email}\nSĐT: ${phone || '-'}\n\nNội dung:\n${message || '-'}`,
  });
}

module.exports = { sendContactNotification };
