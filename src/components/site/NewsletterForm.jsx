const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';

import { Check, Loader2, Send } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      await db.entities.Subscriber.create({
        email: email.trim().toLowerCase(),
        source: 'website-footer',
      });
      setStatus('done');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <p className="flex items-center gap-2 text-[13px] font-medium text-ember-dark">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ember text-white">
          <Check className="h-3.5 w-3.5" />
        </span>
        You&apos;re on the list — offers land in your inbox first.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError('');
            }}
            placeholder="Your email address"
            className="h-12 w-full rounded-[10px] border border-line bg-white px-4 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-ember"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-ember px-5 text-[13px] font-semibold text-white transition-colors hover:bg-ember-dark disabled:opacity-60"
        >
          {status === 'sending' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          Subscribe
        </button>
      </div>
      {error && <p className="mt-2 text-[12px] text-ember-dark">{error}</p>}
      {status === 'error' && (
        <p className="mt-2 text-[12px] text-ember-dark">Could not subscribe just now. Please try again.</p>
      )}
    </form>
  );
}