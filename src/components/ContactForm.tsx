
import React from 'react';
import { Mail } from 'lucide-react';

async function postJSON<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
  return res.json();
}

export default function ContactForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<null | { type: 'ok' | 'error'; msg: string }>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', msg: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    try {
      await postJSON<{ ok: boolean; id?: string }>('/api/contact', {
        name,
        email,
        message,
        company,
      });

      setStatus({ type: 'ok', msg: 'Thanks! Your message has been sent' });
      setName('');
      setEmail('');
      setMessage('');
      setCompany('');
    } catch (err: any) {
      setStatus({
        type: 'error',
        msg: err?.message || 'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid gap-2.5" onSubmit={onSubmit} noValidate>
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        name="company"
        placeholder="Company (leave blank)"
      />

      <input
        className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        rows={4}
        className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium disabled:opacity-70"
        aria-busy={loading}
      >
        {loading ? 'Sending…' : (<>Send <Mail className="inline-block h-4 w-4 align-text-bottom" /></>)}
      </button>

      {status && (
        <p
          className={`text-sm mt-1 ${
            status.type === 'ok'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
