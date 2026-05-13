import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, title, category, excerpt, notes } = req.body;

  if (!name || !email || !title || !category || !excerpt) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }

  const { data, error } = await resend.emails.send({
    from: 'Lovehuble Blog <onboarding@resend.dev>',
    to: ['marco.gullo@devoz.it'],
    replyTo: email,
    subject: `[Proposta Articolo] ${title}`,
    html: `
      <h2>Nuova proposta articolo</h2>
      <p><strong>Autore:</strong> ${name} (${email})</p>
      <p><strong>Titolo:</strong> ${title}</p>
      <p><strong>Categoria:</strong> ${category}</p>
      <p><strong>Anteprima:</strong><br>${excerpt}</p>
      ${notes ? `<p><strong>Note:</strong><br>${notes}</p>` : ''}
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ ok: true, id: data?.id });
}
