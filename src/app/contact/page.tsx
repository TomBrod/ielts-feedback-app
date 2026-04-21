"use client";

import { useState } from "react";

const BLUE = "#1F3E9C";
const RED = "#E8322A";
const YELLOW = "#F5C000";

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function ContactCard({ icon, label, value, href }: ContactCardProps) {
  const content = (
    <div
      className="flex items-center gap-4 rounded-2xl p-5 text-white"
      style={{ backgroundColor: BLUE }}
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
          {label}
        </p>
        <p className="font-semibold text-sm mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors`;
  const inputStyle = {
    borderColor: "rgba(31,62,156,0.2)",
    color: BLUE,
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section style={{ backgroundColor: BLUE }} className="px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* Contact form */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold" style={{ color: BLUE }}>Send Us a Message</h2>

          {submitted && (
            <div
              className="rounded-2xl p-5 font-semibold text-center text-base"
              style={{ backgroundColor: YELLOW, color: BLUE }}
            >
              Thank you for your message! We&apos;ll be in touch soon.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border p-8 space-y-5"
            style={{ borderColor: "rgba(31,62,156,0.15)" }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: BLUE }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className={inputClass}
                style={{ ...inputStyle, ["--tw-ring-color" as string]: "rgba(232,50,42,0.4)" }}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: BLUE }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: BLUE }}>
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                rows={6}
                required
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 font-semibold rounded-xl text-base transition-colors"
              style={{ backgroundColor: YELLOW, color: BLUE }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dca900")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = YELLOW)}
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Contact details */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: BLUE }}>Contact Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <ContactCard icon={<PhoneIcon />} label="WhatsApp" value="+44 7856 424 966" href="tel:+447856424966" />
            <ContactCard icon={<EmailIcon />} label="Email" value="thebrodieacademy@gmail.com" href="mailto:thebrodieacademy@gmail.com" />
            <ContactCard icon={<GlobeIcon />} label="Website" value="brodieacademy.com" href="https://brodieacademy.com" />
            <ContactCard icon={<FacebookIcon />} label="Facebook" value="Brodie Academy" href="https://www.facebook.com/profile.php?id=61585961774065" />
            <ContactCard icon={<InstagramIcon />} label="Instagram" value="@brodieacademy" href="https://www.instagram.com/brodieacademy" />
            <ContactCard icon={<LinkedInIcon />} label="LinkedIn" value="Brodie Academy" href="https://www.linkedin.com/company/brodie-academy/" />
          </div>
        </section>
      </div>
    </main>
  );
}
