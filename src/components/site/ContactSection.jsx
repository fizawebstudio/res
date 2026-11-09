const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';

import {
  ArrowUpRight,
  Check,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from 'lucide-react';
import { BRAND } from '@/data/restaurantData';

const SUBJECTS = [
  'General enquiry',
  'Table booking',
  'Large order / catering',
  'Feedback',
  'Careers',
];

const EMPTY = { name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' };

const fieldClass =
  'mt-1.5 w-full rounded-[10px] border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-ember';

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (form.message.trim().length < 10) next.message = 'Add a little more detail (10+ characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await db.entities.ContactMessage.create({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });
      setStatus('sent');
      setForm(EMPTY);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="border-t border-line bg-white py-16 md:py-20">
      <div className="ff-container grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <p className="eyebrow flex items-center gap-3 text-ember">
            <span className="h-px w-7 bg-ember" />
            Contact
          </p>
          <h2 className="type-section mt-3 text-ink">Say hello</h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-soft">
            Walk-ins are always welcome. For tables of six or more, or a large catering order, send a
            message and we will hold the room for you.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={BRAND.phoneHref}
              className="group rounded-xl border border-line bg-mist p-4 transition-colors hover:border-ember/40"
            >
              <Phone className="h-4 w-4 text-ember" strokeWidth={1.9} />
              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Call us
              </p>
              <p className="mt-1 text-[13.5px] font-medium text-ink group-hover:text-ember">
                {BRAND.phone}
              </p>
            </a>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-line bg-mist p-4 transition-colors hover:border-ember/40"
            >
              <MessageCircle className="h-4 w-4 text-ember" strokeWidth={1.9} />
              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                WhatsApp
              </p>
              <p className="mt-1 text-[13.5px] font-medium text-ink group-hover:text-ember">
                Chat with the kitchen
              </p>
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="group rounded-xl border border-line bg-mist p-4 transition-colors hover:border-ember/40"
            >
              <Mail className="h-4 w-4 text-ember" strokeWidth={1.9} />
              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Email
              </p>
              <p className="mt-1 break-all text-[13.5px] font-medium text-ink group-hover:text-ember">
                {BRAND.email}
              </p>
            </a>
            <div className="rounded-xl border border-line bg-mist p-4">
              <Clock className="h-4 w-4 text-ember" strokeWidth={1.9} />
              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Opening hours
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink">
                {BRAND.hours[0].day}: {BRAND.hours[0].time}
                <br />
                {BRAND.hours[1].day}: {BRAND.hours[1].time}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {[
              { href: BRAND.social.instagram, label: 'Instagram', Icon: Instagram },
              { href: BRAND.social.facebook, label: 'Facebook', Icon: Facebook },
              { href: BRAND.social.x, label: 'X', Icon: Twitter },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-line text-ink transition-colors hover:border-ember/50 hover:text-ember"
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </a>
            ))}
            <a
              href={BRAND.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink transition-colors hover:text-ember"
            >
              <MapPin className="h-3.5 w-3.5 text-ember" />
              Get directions
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-mist p-6 shadow-soft sm:p-8">
          {status === 'sent' ? (
            <div className="flex flex-col items-start gap-3 py-10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ember text-white">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="font-display text-[20px] font-semibold text-ink">Message received</h3>
              <p className="text-[13.5px] leading-relaxed text-ink-soft">
                It is in our inbox and the team will reply within one working day. For anything
                urgent, call or WhatsApp us on {BRAND.phone}.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 text-[12.5px] font-semibold text-ember-dark hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="font-display text-[20px] font-semibold text-ink">Send a message</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="c-name" className="text-[12px] font-semibold text-ink">
                    Name
                  </label>
                  <input
                    id="c-name"
                    value={form.name}
                    onChange={update('name')}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <p className="mt-1 text-[11.5px] text-ember-dark">{errors.name}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-email" className="text-[12px] font-semibold text-ink">
                      Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      className={fieldClass}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11.5px] text-ember-dark">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="text-[12px] font-semibold text-ink">
                      Phone (optional)
                    </label>
                    <input
                      id="c-phone"
                      value={form.phone}
                      onChange={update('phone')}
                      className={fieldClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className="text-[12px] font-semibold text-ink">
                    Subject
                  </label>
                  <select
                    id="c-subject"
                    value={form.subject}
                    onChange={update('subject')}
                    className={fieldClass}
                  >
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-message" className="text-[12px] font-semibold text-ink">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    className={`${fieldClass} resize-none`}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11.5px] text-ember-dark">{errors.message}</p>
                  )}
                </div>
              </div>

              {status === 'error' && (
                <p className="mt-4 rounded-[10px] border border-ember/30 bg-blush px-4 py-3 text-[12px] text-ember-dark">
                  We could not send that just now. Please try again, or WhatsApp us on {BRAND.phone}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-ember px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-ember-dark disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}