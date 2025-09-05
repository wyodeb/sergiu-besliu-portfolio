import './_env.mjs';
import { Resend } from 'resend';
import { z } from 'zod';

function escapeHtml(input) {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(5000),
  company: z.string().optional(),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server not configured: RESEND_API_KEY missing' });
  if (!TO_EMAIL || !FROM_EMAIL) {
    return res.status(500).json({ error: 'Server not configured: CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL missing' });
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : (req.body ?? {});

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      const emailIssue = parsed.error.issues.find(i => i.path?.[0] === 'email');
      if (emailIssue) {
        return res.status(422).json({
          error: 'Invalid email format',
          code: 'invalid_email',
          field: 'email',
          details: emailIssue.message,
        });
      }
      return res.status(400).json({ error: 'Invalid payload', details: parsed.error.flatten() });
    }

    const { name, email, message, company } = parsed.data;

    if (company && company.trim()) {
      return res.status(200).json({ ok: true });
    }

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 12px">New message from wyodeb portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(message)}</pre>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `contact: ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
