import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import { SectionHeader } from './About';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = 'idle' | 'submitting' | 'info';

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
    href: '#',
    color: '#10b981',
  },
];

function validate(form: FormState) {
  const errors: Partial<FormState> = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('submitting');
    // Simulate network delay — then show info that no backend is configured
    setTimeout(() => {
      setStatus('info');
    }, 800);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setStatus('idle');
  };

  const fieldClass = (field: keyof FormState) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none transition-all focus:bg-white/8 focus:border-sky-400/60 ${
      errors[field] ? 'border-red-400/60 bg-red-400/5' : 'border-white/10'
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
          subtitle="Have a QA challenge, internship opportunity, or just want to connect? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
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
                className="glass-card p-4 flex items-center gap-4 hover:border-sky-400/30 transition-all group"
                id={`contact-${label.toLowerCase()}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: color + '15' }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-slate-400 text-xs mb-0.5">{label}</div>
                  <div className="text-white text-sm font-medium truncate">{value}</div>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="glass-card p-4 mt-2"
            >
              <p className="text-slate-400 text-xs font-mono mb-1">// availability</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-slate-300 text-sm">Open to QA / testing roles &amp; internships</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass-card p-6 sm:p-8"
          >
            {status === 'info' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-amber-500/15 flex items-center justify-center mb-4">
                  <AlertCircle size={32} className="text-amber-400" />
                </div>
                <h3 className="font-outfit font-bold text-white text-xl mb-2">No Backend Connected</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-2">
                  Your message was validated but <strong className="text-white">was not sent</strong> — this
                  portfolio does not yet have a backend or email integration.
                </p>
                <p className="text-slate-500 text-xs mb-6 font-mono">
                  To enable email: connect Formspree, EmailJS, or a serverless function.
                </p>
                <p className="text-slate-400 text-sm mb-6">
                  In the meantime, reach me directly at{' '}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sky-400 hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </p>
                <button onClick={handleReset} className="btn-outline text-sm py-2 px-6">
                  Compose Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-outfit font-bold text-white text-xl mb-6">Send a Message</h3>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="contact-name" className="text-slate-400 text-xs mb-1.5 block font-mono">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={fieldClass('name')}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-slate-400 text-xs mb-1.5 block font-mono">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={fieldClass('email')}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="contact-subject" className="text-slate-400 text-xs mb-1.5 block font-mono">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className={fieldClass('subject')}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.subject}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="contact-message" className="text-slate-400 text-xs mb-1.5 block font-mono">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className={`${fieldClass('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  disabled={status === 'submitting'}
                  className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
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
