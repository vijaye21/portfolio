import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import { SectionHeader } from './About';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = 'idle' | 'submitting' | 'sent';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#0ea5e9',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vijay-e-',
    href: personalInfo.linkedin,
    color: '#0a66c2',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/vijay-tech-colab',
    href: personalInfo.github,
    color: '#6e7681',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personalInfo.location,
    href: 'https://maps.google.com/?q=Tiruppur,+Tamil+Nadu,+India',
    color: '#10b981',
  },
];

function validate(form: FormState) {
  const errors: Partial<FormState> = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email address';
  if (!form.subject.trim()) errors.subject = 'Subject is required';
  if (!form.message.trim()) errors.message = 'Message is required';
  else if (form.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  };

  const getMailtoUrl = () => {
    const bodyContent = `From: ${form.name} (${form.email})\n\n${form.message}`;
    return `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(bodyContent)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('submitting');

    setTimeout(() => {
      // Trigger default mail client
      const mailtoUrl = getMailtoUrl();
      window.location.href = mailtoUrl;
      setStatus('sent');
    }, 450);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setStatus('idle');
  };

  const fieldClass = (field: keyof FormState) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none transition-all focus:bg-white/10 focus:border-sky-400/70 ${
      errors[field] ? 'border-red-400/60 bg-red-400/5' : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <section
      id="contact"
      className="section-padding relative"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(14,165,233,0.08) 0%, transparent 60%), #020817',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="// contact"
          title={
            <>
              Let&apos;s Build Better{' '}
              <span className="gradient-text">Software Together</span>
            </>
          }
          subtitle="Have a QA opportunity, test automation project, or inquiry? Reach out directly via the form or email."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-4 hover:border-sky-400/40 transition-all group"
                id={`contact-${label.toLowerCase()}`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: color + '15' }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="text-slate-400 text-xs font-mono mb-0.5">{label}</div>
                  <div className="text-white text-sm font-semibold truncate group-hover:text-sky-300 transition-colors">
                    {value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Availability Status Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-5 mt-1 border-emerald-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Opportunity Status
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Actively interviewing for full-time QA Engineer, SDET, and AI Testing roles. Open to immediate start.
              </p>
              <button
                onClick={handleCopyEmail}
                className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy size={13} />
                <span>{copied ? 'Copied to clipboard!' : `Copy: ${personalInfo.email}`}</span>
              </button>
            </motion.div>
          </div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 glass-card p-6 sm:p-8"
          >
            {status === 'sent' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-outfit font-bold text-white text-2xl mb-2">Message Dispatched!</h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-md mb-6">
                  Your message has been formatted. If your default email application did not launch automatically, you can open it directly or send an email to <strong className="text-sky-400">{personalInfo.email}</strong>.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={getMailtoUrl()}
                    className="h-11 px-6 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 text-white flex items-center gap-2 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all"
                  >
                    <span>Open in Email App</span>
                    <ExternalLink size={14} />
                  </a>
                  <button
                    onClick={handleReset}
                    className="h-11 px-6 rounded-full text-xs font-semibold border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-outfit font-bold text-white text-xl">Send a Message</h3>
                  <span className="text-[11px] font-mono text-slate-500">* Required fields</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="contact-name" className="text-slate-300 text-xs mb-1.5 block font-mono">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Smith"
                      className={fieldClass('name')}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-mono">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-slate-300 text-xs mb-1.5 block font-mono">
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className={fieldClass('email')}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-mono">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="contact-subject" className="text-slate-300 text-xs mb-1.5 block font-mono">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. QA Engineer Opportunity / Project Inquiry"
                    className={fieldClass('subject')}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-mono">
                      <AlertCircle size={12} /> {errors.subject}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="contact-message" className="text-slate-300 text-xs mb-1.5 block font-mono">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Share project details, team requirements, or your query..."
                    className={`${fieldClass('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-mono">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  disabled={status === 'submitting'}
                  className="h-11 px-7 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Formatting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
