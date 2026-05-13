'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const UZBEKISTAN_UNIS = [
  'Tashkent State Medical Academy',
  'Samarkand State Medical University',
  'Bukhara State Medical Institute',
];
const KAZAKHSTAN_UNIS = [
  'Al-Farabi Kazakh National University',
  'Kazakh-Russian Medical University',
  'Kazakh National Medical University (Asfendiyarov)',
  'Semey Medical University',
  'Astana Medical University',
];
const KYRGYZSTAN_UNIS = [
  'Osh State University',
  'Kyrgyz National University',
  'Kyrgyz National Agrarian University',
  'Kyrgyz State Medical Academy',
  'Jalal-Abad State University',
  'International University of Kyrgyzstan',
  'Royal Metropolitan Medical University',
  'International Higher School of Medicine',
  'International University of Science and Medicine',
];

function ContactSection() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: '', university: '', qualification: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const uniOptions = form.country === 'Uzbekistan'
    ? UZBEKISTAN_UNIS
    : form.country === 'Kazakhstan'
    ? KAZAKHSTAN_UNIS
    : form.country === 'Kyrgyzstan'
    ? KYRGYZSTAN_UNIS
    : form.country === 'Multiple'
    ? [...UZBEKISTAN_UNIS, ...KAZAKHSTAN_UNIS, ...KYRGYZSTAN_UNIS]
    : [];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required.';
    if (!form.phone.trim()) e.phone = 'WhatsApp / phone number is required.';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value, ...(name === 'country' ? { university: '' } : {}) }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', phone: '', country: '', university: '', qualification: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section section--alt" id="contact">
      <div className="container">
        <div className="contact-layout">

          {/* Left: info panel */}
          <div className="contact-info">
            <span className="eyebrow">Get in touch</span>
            <h2 className="h-section" style={{ marginTop: 16 }}>Start your MBBS journey today.</h2>
            <p style={{ marginTop: 16, fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              Fill in your details and a senior admissions advisor will reach out within 2 working hours.
              You can also message us directly on WhatsApp for a faster response.
            </p>

            <div className="cinfo-block">
              <div className="cinfo-item">
                <div className="cinfo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx={12} cy={10} r={3}/>
                  </svg>
                </div>
                <div>
                  <div className="cinfo-label">Office Address</div>
                  <div className="cinfo-val">HiLITE Business Park, 2, Poovangal<br/>Kozhikode, Pantheeramkavu<br/>Kerala 673014, India</div>
                </div>
              </div>
              <div className="cinfo-item">
                <div className="cinfo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.98 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16v.92z"/>
                  </svg>
                </div>
                <div>
                  <div className="cinfo-label">Call / WhatsApp</div>
                  <div className="cinfo-val">
                    <a href="tel:+919048968415" className="cinfo-link">🇮🇳 +91 90489 68415</a>
                    <a href="tel:+996223571108" className="cinfo-link">🇰🇿 +996 22 357 1108</a>
                  </div>
                </div>
              </div>
              <div className="cinfo-item">
                <div className="cinfo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="cinfo-label">Email</div>
                  <div className="cinfo-val">
                    <a href="mailto:info@oxfordinternationaleducationalgroup.com" className="cinfo-link" style={{ wordBreak: 'break-all' }}>
                      info@oxfordinternationaleducationalgroup.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919048968415"
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 24, alignSelf: 'flex-start' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6c1.7 1 3.7 1.5 5.7 1.5 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.5zM12 22c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.5-1.5-5.4C2.1 6.4 6.5 2 12 2s9.9 4.4 9.9 9.9S17.5 22 12 22z"/>
              </svg>
              WhatsApp Us Now
            </a>
          </div>

          {/* Right: form */}
          <div className="contact-form-wrap">
            {status === 'success' ? (
              <div className="form-success">
                <div className="form-success__icon">✓</div>
                <h3>Enquiry sent!</h3>
                <p>Thank you — we&apos;ll be in touch within 2 working hours. Check your inbox for a confirmation email.</p>
                <button className="btn btn--primary" style={{ marginTop: 20 }} onClick={() => setStatus('idle')}>
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form className="cform" onSubmit={handleSubmit} noValidate>
                <div className="cform__row">
                  <div className="cform__field">
                    <label htmlFor="cf-name" className="cform__label">Full Name <span className="cform__req">*</span></label>
                    <input
                      id="cf-name" name="name" type="text" autoComplete="name"
                      placeholder="e.g. Ahmed Raza"
                      className={`cform__input${errors.name ? ' cform__input--err' : ''}`}
                      value={form.name} onChange={handleChange}
                    />
                    {errors.name && <span className="cform__err">{errors.name}</span>}
                  </div>
                  <div className="cform__field">
                    <label htmlFor="cf-email" className="cform__label">Email Address <span className="cform__req">*</span></label>
                    <input
                      id="cf-email" name="email" type="email" autoComplete="email"
                      placeholder="your@email.com"
                      className={`cform__input${errors.email ? ' cform__input--err' : ''}`}
                      value={form.email} onChange={handleChange}
                    />
                    {errors.email && <span className="cform__err">{errors.email}</span>}
                  </div>
                </div>

                <div className="cform__row">
                  <div className="cform__field">
                    <label htmlFor="cf-phone" className="cform__label">WhatsApp / Phone <span className="cform__req">*</span></label>
                    <input
                      id="cf-phone" name="phone" type="tel" autoComplete="tel"
                      placeholder="+92 300 000 0000"
                      className={`cform__input${errors.phone ? ' cform__input--err' : ''}`}
                      value={form.phone} onChange={handleChange}
                    />
                    {errors.phone && <span className="cform__err">{errors.phone}</span>}
                  </div>
                  <div className="cform__field">
                    <label htmlFor="cf-qualification" className="cform__label">Current Qualification</label>
                    <select id="cf-qualification" name="qualification" className="cform__input" value={form.qualification} onChange={handleChange}>
                      <option value="">— Select —</option>
                      <option>FSc Pre-Medical</option>
                      <option>A-Levels (Biology)</option>
                      <option>Intermediate (equivalent)</option>
                      <option>MBBS (Transfer)</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="cform__row">
                  <div className="cform__field">
                    <label htmlFor="cf-country" className="cform__label">Interested Country</label>
                    <select id="cf-country" name="country" className="cform__input" value={form.country} onChange={handleChange}>
                      <option value="">— Select —</option>
                      <option>Uzbekistan</option>
                      <option>Kazakhstan</option>
                      <option>Kyrgyzstan</option>
                      <option>Multiple</option>
                    </select>
                  </div>
                  <div className="cform__field">
                    <label htmlFor="cf-university" className="cform__label">Preferred University</label>
                    <select
                      id="cf-university" name="university" className="cform__input"
                      value={form.university} onChange={handleChange}
                      disabled={uniOptions.length === 0}
                    >
                      <option value="">{uniOptions.length === 0 ? '— Select country first —' : '— Select —'}</option>
                      {uniOptions.map(u => <option key={u}>{u}</option>)}
                      <option value="Not decided">Not decided yet</option>
                    </select>
                  </div>
                </div>

                <div className="cform__field">
                  <label htmlFor="cf-message" className="cform__label">Your Message / Query</label>
                  <textarea
                    id="cf-message" name="message" rows={4}
                    placeholder="Tell us about your situation, grades, or any specific questions you have…"
                    className="cform__input cform__textarea"
                    value={form.message} onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <div className="cform__error-banner">
                    Something went wrong. Please try again or contact us directly on WhatsApp.
                  </div>
                )}

                <button type="submit" className="btn btn--primary cform__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <><span className="cform__spinner" /> Sending…</>
                  ) : (
                    <>Send Enquiry <span className="arrow">→</span></>
                  )}
                </button>
                <p className="cform__note">
                  We reply within 2 working hours · Your data is never shared with third parties
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const BRAND_SHORT = 'Oxford Int\'l Edu';
const BRAND_FULL = 'Oxford International Education Group';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const g = dotsRef.current;
    if (!g) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const masks = [
      { x1: 140, y1: 32, x2: 175, y2: 65 },
      { x1: 148, y1: 65, x2: 185, y2: 120 },
      { x1: 175, y1: 30, x2: 255, y2: 90 },
    ];
    const inMask = (x: number, y: number) =>
      masks.some((m) => x >= m.x1 && x <= m.x2 && y >= m.y1 && y <= m.y2);
    for (let y = 20; y < 145; y += 5) {
      for (let x = 18; x < 300; x += 5) {
        const jitter = ((x * y) % 7) / 8;
        if (inMask(x, y) && jitter < 0.85) {
          const c = document.createElementNS(svgNS, 'circle');
          c.setAttribute('cx', String(x));
          c.setAttribute('cy', String(y));
          c.setAttribute('r', '1.1');
          g.appendChild(c);
        }
      }
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll('.step, .service, .dest, .t-card, .article, .stat, .final-cta__inner')
      .forEach((el, i) => {
        el.classList.add('reveal');
        (el as HTMLElement).style.transitionDelay = `${(i % 3) * 60}ms`;
        io.observe(el);
      });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ===== NAV ===== */}
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="container nav__inner">
          <a href="#" className="logo" aria-label={BRAND_FULL}>
            <Image src="/logo.png" alt="Oxford International Education Group" width={128} height={128} className="logo__img" />
          </a>
          <nav className="nav__links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#destinations">Destinations</a>
            <a href="#universities">Universities</a>
            <a href="#stories">Success Stories</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav__right">
            <a href="tel:+919048968415" className="btn btn--ghost">Call Us</a>
            <a href="#cta" className="btn btn--primary">Free Counselling</a>
            <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__head">
          <a href="#" className="logo" onClick={() => setMenuOpen(false)}>
            <Image src="/logo.png" alt="Oxford International Education Group" width={128} height={128} className="logo__img" />
          </a>
          <button className="mobile-menu__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="mobile-menu__links">
          {[
            ['Services', '#services'],
            ['Destinations', '#destinations'],
            ['Universities', '#universities'],
            ['Success Stories', '#stories'],
            ['About', '#about'],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__cta">
          <a
            href="#cta"
            className="btn btn--primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            Free Counselling →
          </a>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow">MBBS Admissions 2026 · Now Open</span>
            <h1 className="h-display" style={{ marginTop: 20 }}>
              Your medical career.
              <br />
              <em>Our proven path.</em>
            </h1>
            <p className="lede">
              We guide students into government medical universities in Uzbekistan and Kazakhstan —
              WHO-listed, MCI / NMC recognised, zero donation fees, and taught in English.
            </p>
            <div className="hero__ctas">
              <a href="#cta" className="btn btn--primary">
                Free Counselling Session <span className="arrow">→</span>
              </a>
              <a href="#universities" className="btn btn--ghost">
                View Universities
              </a>
            </div>
            <div className="hero__trust">
              <div className="trust__stat">
                <span className="trust__num">1,500+</span>
                <span className="trust__lbl">Students enrolled</span>
              </div>
              <div className="trust__stat">
                <span className="trust__num">17</span>
                <span className="trust__lbl">Partner universities</span>
              </div>
              <div className="trust__stat">
                <span className="trust__num">98%</span>
                <span className="trust__lbl">Visa success rate</span>
              </div>
              <div className="trust__stat">
                <span className="trust__num">0</span>
                <span className="trust__lbl">Donation / capitation fee</span>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hero__visual" aria-hidden="true">
            <div className="map-card">
              <div className="map-card__head">
                <div className="map-card__title">Ali&apos;s shortlist · MBBS 2026</div>
                <div className="map-card__dot" title="Live" />
              </div>

              <svg className="map-svg" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E8A020" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#E8A020" stopOpacity={0} />
                  </radialGradient>
                </defs>
                <g fill="#D6D2C5" ref={dotsRef} id="dots" />
                {/* Uzbekistan pin */}
                <circle cx={200} cy={68} r={14} fill="url(#pinGlow)" />
                <circle cx={200} cy={68} r={4} fill="#E8A020" stroke="#fff" strokeWidth={1.5} />
                {/* Kazakhstan pin */}
                <circle cx={210} cy={52} r={14} fill="url(#pinGlow)" />
                <circle cx={210} cy={52} r={4} fill="#0F2557" stroke="#fff" strokeWidth={1.5} />
                {/* Labels */}
                <text x={218} y={56} fontSize="7" fill="#0F2557" fontWeight="600">Kazakhstan</text>
                <text x={208} y={72} fontSize="7" fill="#8C5A00" fontWeight="600">Uzbekistan</text>
              </svg>

              <div className="destination-row">
                <div className="flag" style={{ background: 'linear-gradient(135deg,#1a6b3c,#3da55c)', position: 'relative' }}>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🇺🇿</span>
                </div>
                <div className="destination-row__txt">
                  <span className="destination-row__country">Tashkent State Medical Academy</span>
                  <span className="destination-row__count">MBBS · 6 Years · Govt. University</span>
                </div>
                <span className="destination-row__match">Top Pick</span>
              </div>
              <div className="destination-row">
                <div className="flag" style={{ background: 'linear-gradient(135deg,#009fca,#0a6fa8)', position: 'relative' }}>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🇰🇿</span>
                </div>
                <div className="destination-row__txt">
                  <span className="destination-row__country">Kazakh National Medical University</span>
                  <span className="destination-row__count">MBBS · 5 Years · Asfendiyarov</span>
                </div>
                <span className="destination-row__match">WHO Listed</span>
              </div>
              <div className="destination-row">
                <div className="flag" style={{ background: 'linear-gradient(135deg,#1a6b3c,#3da55c)', position: 'relative' }}>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🇺🇿</span>
                </div>
                <div className="destination-row__txt">
                  <span className="destination-row__country">Samarkand State Medical University</span>
                  <span className="destination-row__count">MBBS · 6 Years · No Donation</span>
                </div>
                <span className="destination-row__match">MCI Listed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== UNIVERSITIES ===== */}
      <section className="section section--alt" id="universities">
        <div className="container">
          <div className="heading-block heading-block--center">
            <span className="eyebrow">Our Partner Universities</span>
            <h2 className="h-section">17 Medical Universities.<br/>Three Countries. One Trusted Partner.</h2>
            <p className="lede" style={{ textAlign: 'center' }}>
              Every university below is government-run, WHO-listed, and recognised by NMC (India) &amp; PMC (Pakistan).
              All MBBS programmes are taught in English with zero donation fees.
            </p>
          </div>

          {/* ── Uzbekistan ── */}
          <div className="uni-country-head">
            <span className="uni-flag">🇺🇿</span>
            <div>
              <div className="uni-country-name">Uzbekistan</div>
              <div className="uni-country-sub">3 Government Medical Universities · English Medium · From $3,500/yr</div>
            </div>
          </div>
          <div className="uni-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇺🇿</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Tashkent State Medical Academy</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">2005</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">5 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$3,500</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹26–34 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                Formed by merger of Uzbekistan&apos;s leading medical institutes. One of the most
                prestigious government medical universities in Central Asia, producing top physicians since 2005.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'ECFMG', 'FAIMER', 'UNESCO'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇺🇿</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Samarkand State Medical University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1930</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$3,500</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹27 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                One of the oldest and most respected medical universities in Uzbekistan, founded in 1930
                in the historic city of Samarkand. Hostel fee ~$650/year. Strong international student community.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'ECFMG', 'UNESCO'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇺🇿</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Bukhara State Medical Institute</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1990</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$3,500</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹24.5 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                Located in the ancient Silk Road city of Bukhara. WHO-listed since 1998. One of the most
                affordable government medical institutes in Uzbekistan for international students.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'UNESCO'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

          </div>

          {/* ── Kazakhstan ── */}
          <div className="uni-country-head" style={{ marginTop: 56 }}>
            <span className="uni-flag">🇰🇿</span>
            <div>
              <div className="uni-country-name">Kazakhstan</div>
              <div className="uni-country-sub">5 Government Medical Universities · English Medium · From $4,200/yr</div>
            </div>
          </div>
          <div className="uni-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>

            <article className="uni-card uni-card--featured">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇿</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                  <span className="uni-badge uni-badge--qs">QS Ranked</span>
                </div>
              </div>
              <h3 className="uni-card__name">Kazakh National Medical University <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', marginTop: 2 }}>(Asfendiyarov)</span></h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1930</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$5,000</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹36.8 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                Kazakhstan&apos;s oldest and most prestigious medical university. QS World Ranked
                951–1000 globally, #5 in Kazakhstan. Recognised by NMC, PMDC, ECFMG and UNESCO.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'ECFMG', 'UNESCO', 'PMDC'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇿</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                  <span className="uni-badge uni-badge--qs">QS Ranked</span>
                </div>
              </div>
              <h3 className="uni-card__name">Al-Farabi Kazakh National University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Country Rank</span><span className="uni-stat__val">#1 in KZ</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$4,700</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹35.5 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                Kazakhstan&apos;s flagship national university, globally recognised. Awarded the European
                Quality Mark &ldquo;Euro Label.&rdquo; Accredited by ASIIN, ACQUIN, AQA, and FIBAA alongside WHO and NMC.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'ECFMG', 'ASIIN', 'FIBAA'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇿</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Kazakh-Russian Medical University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1992</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">5 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$4,500</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Hostel + Mess</span><span className="uni-stat__val">~$2,400/yr</span></div>
              </div>
              <p className="uni-card__desc">
                A unique Kazakh-Russian collaborative medical institution. Recognised by GMC (UK) and
                AMC (Australia) — broadest international recognition among Kazakhstan medical universities.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'GMC UK', 'AMC AUS', 'ECFMG'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇿</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Semey Medical University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1953</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">5–6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$4,200</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹29.7 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                The oldest medical institution in Eastern Kazakhstan (est. 1953) with 70+ years of
                producing qualified physicians. Strong ECFMG eligibility and PMDC recognition for
                Pakistani graduates.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'ECFMG', 'PMDC'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇿</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Astana Medical University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1964</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">5–6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$5,600</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹36 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                Located in Astana, Kazakhstan&apos;s thriving modern capital. Gained full university
                status in 2009. Listed in WDOMS and fully recognised by NMC for Indian graduates.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'WDOMS'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

          </div>

          {/* ── Kyrgyzstan ── */}
          <div className="uni-country-head" style={{ marginTop: 56 }}>
            <span className="uni-flag">🇰🇬</span>
            <div>
              <div className="uni-country-name">Kyrgyzstan</div>
              <div className="uni-country-sub">9 Medical Universities · English Medium · From $3,000/yr</div>
            </div>
          </div>
          <div className="uni-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>

            <article className="uni-card uni-card--featured">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Osh State University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1992</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$4,000</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹23.4 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                One of the largest government universities in Kyrgyzstan, located in Osh city. Renowned for its Faculty of Medicine offering a 6-year MBBS programme fully in English with strong NMC recognition.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'WFME', 'ECFMG', 'UNESCO'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Kyrgyz National University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1925</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$4,000</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Location</span><span className="uni-stat__val">Bishkek</span></div>
              </div>
              <p className="uni-card__desc">
                Founded in 1925, Kyrgyzstan&apos;s oldest university. Its Faculty of Medicine hosts over 6,000 medical students including 300+ international students. NMC-approved with a global English-medium curriculum.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'FAIMER', 'ECFMG', 'WFME', 'UNESCO'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Kyrgyz National Agrarian University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1933</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$3,500</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Location</span><span className="uni-stat__val">Bishkek</span></div>
              </div>
              <p className="uni-card__desc">
                Established in 1933 and awarded National status in 2009. WHO-listed and NMC-recognised, offering an affordable English-medium MBBS programme for international students.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'WDOMS', 'Min. of Education'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Kyrgyz State Medical Academy</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1939</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$4,500</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹25.6 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                One of the most respected government medical academies in Central Asia, established in 1939. Fully NMC and PMC approved with a comprehensive English-medium clinical training programme.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'ECFMG', 'WFME'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge uni-badge--govt">Government</span>
                </div>
              </div>
              <h3 className="uni-card__name">Jalal-Abad State University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">1993</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$3,000</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Location</span><span className="uni-stat__val">Jalal-Abad</span></div>
              </div>
              <p className="uni-card__desc">
                Located in Jalal-Abad city, established in 1993. One of the most affordable government medical universities in Kyrgyzstan, holding broad international recognition including GMC (UK) and FAIMER.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'ECFMG', 'FAIMER', 'WFME', 'GMC UK'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge" style={{ background: 'rgba(99,102,241,.12)', color: '#4338ca' }}>Private</span>
                </div>
              </div>
              <h3 className="uni-card__name">International University of Kyrgyzstan</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$4,000</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹16 Lacs</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Location</span><span className="uni-stat__val">Bishkek</span></div>
              </div>
              <p className="uni-card__desc">
                A leading private institution in Bishkek offering NMC-approved English-medium MBBS. Consistently among the top choices for Indian and Pakistani students due to its low total cost and broad accreditation.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'ECFMG', 'WFME'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge" style={{ background: 'rgba(99,102,241,.12)', color: '#4338ca' }}>Private</span>
                </div>
              </div>
              <h3 className="uni-card__name">Royal Metropolitan Medical University</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">2019</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">5 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$4,500</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Location</span><span className="uni-stat__val">Bishkek</span></div>
              </div>
              <p className="uni-card__desc">
                Established in 2019 with support from the Kyrgyz Government. A modern private medical university in Bishkek offering a 5-year English-medium MBBS with separate gender hostels and Indian mess.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'FAIMER', 'ECFMG', 'UNESCO', 'HEC'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge" style={{ background: 'rgba(99,102,241,.12)', color: '#4338ca' }}>Private</span>
                </div>
              </div>
              <h3 className="uni-card__name">International Higher School of Medicine</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Established</span><span className="uni-stat__val">2003</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$5,000</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Total Cost</span><span className="uni-stat__val">~₹29.7 Lacs</span></div>
              </div>
              <p className="uni-card__desc">
                Founded in 2003, ISM is one of the premier private medical institutions in Kyrgyzstan, hosting over 4,000 international students from India, Pakistan, Nepal, UK, and beyond. Transparent fee structure.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'PMC', 'IAAR', 'AAEPO'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

            <article className="uni-card">
              <div className="uni-card__header">
                <div className="uni-card__flag">🇰🇬</div>
                <div className="uni-card__meta-row">
                  <span className="uni-badge" style={{ background: 'rgba(99,102,241,.12)', color: '#4338ca' }}>Private</span>
                </div>
              </div>
              <h3 className="uni-card__name">International University of Science and Medicine</h3>
              <div className="uni-card__stats">
                <div className="uni-stat"><span className="uni-stat__label">Duration</span><span className="uni-stat__val">6 Years</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Annual Tuition</span><span className="uni-stat__val">~$3,500</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Medium</span><span className="uni-stat__val">English</span></div>
                <div className="uni-stat"><span className="uni-stat__label">Location</span><span className="uni-stat__val">Bishkek</span></div>
              </div>
              <p className="uni-card__desc">
                Offers a 6-year English-medium MD programme with one of the broadest international recognitions in Kyrgyzstan, including GMC (UK), ECFMG (US), and FAIMER alongside WHO and NMC.
              </p>
              <div className="uni-card__accreditations">
                {['WHO', 'NMC', 'ECFMG', 'WFME', 'FAIMER', 'GMC UK'].map(a => (
                  <span key={a} className="accr-badge">{a}</span>
                ))}
              </div>
              <a href="#cta" className="service__link" style={{ marginTop: 'auto', paddingTop: 16 }}>
                Apply Now <span className="arrow">→</span>
              </a>
            </article>

          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section">
        <div className="container">
          <div className="heading-block">
            <span className="eyebrow">How it works</span>
            <h2 className="h-section">From application to your first lecture in three steps.</h2>
            <p className="lede">
              We handle every step — eligibility check, document processing, visa filing, and
              pre-departure support — so you can focus on your studies.
            </p>
          </div>
          <div className="steps">
            <article className="step">
              <span className="step__num">01</span>
              <h3 className="step__title">Free counselling</h3>
              <p className="step__desc">
                A 45-minute session to assess your grades, budget, and target university. We
                recommend the right institution honestly — even if you need more preparation first.
              </p>
              <div className="step__meta">
                <strong>45 min</strong> · WhatsApp, Zoom or in-office
              </div>
            </article>
            <article className="step">
              <span className="step__num">02</span>
              <h3 className="step__title">Document processing &amp; admission</h3>
              <p className="step__desc">
                We prepare and submit your complete application — transcripts, medical certificates,
                acceptance letters — and secure your official admission offer from the university.
              </p>
              <div className="step__meta">
                <strong>7–14 days</strong> processing time
              </div>
            </article>
            <article className="step">
              <span className="step__num">03</span>
              <h3 className="step__title">Visa &amp; departure support</h3>
              <p className="step__desc">
                Student visa filing, invitation letters, financial documentation, mock interviews,
                and full pre-departure orientation — including accommodation booking in-country.
              </p>
              <div className="step__meta">
                <strong>End-to-end</strong> until you land
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section section--alt" id="services">
        <div className="container">
          <div className="heading-block">
            <span className="eyebrow">What we do</span>
            <h2 className="h-section">Complete support, start to finish.</h2>
            <p className="lede">
              From your first enquiry to your first day in the lecture hall — we cover every step.
            </p>
          </div>
          <div className="services">
            <article className="service">
              <div className="service__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6" /><path d="M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 2 9 2 12 0v-5" />
                </svg>
              </div>
              <h3 className="service__title">MBBS admissions</h3>
              <p className="service__desc">
                Profile evaluation and shortlisting for government medical universities in
                Uzbekistan and Kazakhstan. We match you to the best fit for your grades and budget.
              </p>
              <a className="service__link" href="#cta">
                Get started <span className="arrow">→</span>
              </a>
            </article>

            <article className="service">
              <div className="service__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={4} y={3} width={14} height={18} rx={2} />
                  <path d="M9 7h6" /><path d="M9 11h6" /><path d="M9 15h3" />
                </svg>
              </div>
              <h3 className="service__title">Document processing</h3>
              <p className="service__desc">
                We prepare your complete application dossier — attestation, translation, notarisation,
                and official submission to the university registrar on your behalf.
              </p>
              <a className="service__link" href="#cta">
                Get started <span className="arrow">→</span>
              </a>
            </article>

            <article className="service">
              <div className="service__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={12} cy={12} r={9} /><path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <path d="M5.5 7c3 2 10 2 13 0" /><path d="M5.5 17c3-2 10-2 13 0" />
                </svg>
              </div>
              <h3 className="service__title">Visa assistance</h3>
              <p className="service__desc">
                Student visa filing for Uzbekistan and Kazakhstan — invitation letters, financial
                proofs, mock interviews, and embassy appointment guidance. 98% success rate.
              </p>
              <a className="service__link" href="#cta">
                Get started <span className="arrow">→</span>
              </a>
            </article>

            <article className="service">
              <div className="service__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="service__title">Accommodation booking</h3>
              <p className="service__desc">
                University hostel or private apartment — we pre-book your accommodation before you
                travel so you arrive to a confirmed address and a welcoming host.
              </p>
              <a className="service__link" href="#cta">
                Get started <span className="arrow">→</span>
              </a>
            </article>

            <article className="service">
              <div className="service__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={12} cy={8} r={6} /><path d="M8.5 13l-1.5 8 5-3 5 3-1.5-8" />
                </svg>
              </div>
              <h3 className="service__title">Scholarship guidance</h3>
              <p className="service__desc">
                We identify merit-based fee waivers and government-sponsored seats available at
                partner universities and help you apply before they are filled.
              </p>
              <a className="service__link" href="#cta">
                Get started <span className="arrow">→</span>
              </a>
            </article>

            <article className="service">
              <div className="service__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="service__title">Pre-departure &amp; alumni network</h3>
              <p className="service__desc">
                Orientation sessions, packing guides, SIM and forex advice, and a private alumni
                network of our students already studying at your destination university.
              </p>
              <a className="service__link" href="#cta">
                Get started <span className="arrow">→</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="section" id="destinations">
        <div className="container">
          <div className="heading-block">
            <span className="eyebrow">Destinations</span>
            <h2 className="h-section">Three countries. 17 world-class medical universities.</h2>
            <p className="lede">
              All partner universities are WHO-listed and recognised by the
              Pakistan Medical Commission (PMC), NMC India, and major licensing bodies.
            </p>
          </div>
          <div className="destinations" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>

            {/* Uzbekistan */}
            <article className="dest dest--uz">
              <div className="dest__hero">
                <div className="dest__flag">
                  <span style={{ fontSize: 16 }}>🇺🇿</span> Uzbekistan
                </div>
                <div className="dest__country">Uzbekistan</div>
              </div>
              <div className="dest__body">
                <div className="dest__unis">
                  <div className="dest__uni">
                    <span>Tashkent State Medical Academy</span>
                    <span>Est. 2005 · 5 Yrs · ~$3,500/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Samarkand State Medical University</span>
                    <span>Est. 1930 · 6 Yrs · ~$3,500/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Bukhara State Medical Institute</span>
                    <span>Est. 1990 · 6 Yrs · ~$3,500/yr</span>
                  </div>
                </div>
                <div className="dest__cta">
                  <span className="dest__meta">6-year MBBS · English medium · Low tuition</span>
                  <a className="dest__link" href="#cta">
                    Apply now <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Kazakhstan */}
            <article className="dest dest--kz">
              <div className="dest__hero">
                <div className="dest__flag">
                  <span style={{ fontSize: 16 }}>🇰🇿</span> Kazakhstan
                </div>
                <div className="dest__country">Kazakhstan</div>
              </div>
              <div className="dest__body">
                <div className="dest__unis">
                  <div className="dest__uni">
                    <span>Al-Farabi Kazakh National University</span>
                    <span>#1 in KZ · 6 Yrs · ~$4,700/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Kazakh-Russian Medical University</span>
                    <span>Est. 1992 · 5 Yrs · ~$4,500/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Kazakh National Medical University (Asfendiyarov)</span>
                    <span>Est. 1930 · QS 951-1000 · ~$5,000/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Semey Medical University</span>
                    <span>Est. 1953 · 5–6 Yrs · ~$4,200/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Astana Medical University</span>
                    <span>Est. 1964 · Capital city · ~$5,600/yr</span>
                  </div>
                </div>
                <div className="dest__cta">
                  <span className="dest__meta">5-year MBBS · English medium · WHO listed</span>
                  <a className="dest__link" href="#cta">
                    Apply now <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Kyrgyzstan */}
            <article className="dest dest--kg" style={{ '--dest-accent': '#e8103a' } as React.CSSProperties}>
              <div className="dest__hero">
                <div className="dest__flag">
                  <span style={{ fontSize: 16 }}>🇰🇬</span> Kyrgyzstan
                </div>
                <div className="dest__country">Kyrgyzstan</div>
              </div>
              <div className="dest__body">
                <div className="dest__unis">
                  <div className="dest__uni">
                    <span>Osh State University</span>
                    <span>Est. 1992 · 6 Yrs · ~$4,000/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Kyrgyz National University</span>
                    <span>Est. 1925 · 6 Yrs · ~$4,000/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Kyrgyz State Medical Academy</span>
                    <span>Est. 1939 · 6 Yrs · ~$4,500/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>Jalal-Abad State University</span>
                    <span>Est. 1993 · 6 Yrs · ~$3,000/yr</span>
                  </div>
                  <div className="dest__uni">
                    <span>+ 5 more universities</span>
                    <span>Private · From $3,500/yr</span>
                  </div>
                </div>
                <div className="dest__cta">
                  <span className="dest__meta">6-year MBBS · English medium · WHO listed</span>
                  <a className="dest__link" href="#cta">
                    Apply now <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </article>

          </div>

          {/* Key advantages strip */}
          <div className="advantages">
            {[
              { icon: '✓', label: 'WHO listed', sub: 'All 8 universities' },
              { icon: '✓', label: 'PMC / NMC recognised', sub: 'Eligible for licensing exams' },
              { icon: '✓', label: 'Zero donation fee', sub: 'Government seats only' },
              { icon: '✓', label: 'English medium', sub: 'Full MBBS in English' },
              { icon: '✓', label: 'Low annual tuition', sub: 'From USD 3,000/year' },
              { icon: '✓', label: 'Safe student cities', sub: 'Large expat communities' },
            ].map((a) => (
              <div key={a.label} className="advantage">
                <span className="advantage__icon">{a.icon}</span>
                <div>
                  <div className="advantage__label">{a.label}</div>
                  <div className="advantage__sub">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="stats">
        <div className="container stats__inner">
          <div className="stats__head">
            <span
              className="eyebrow"
              style={{
                background: 'rgba(255,255,255,.08)',
                borderColor: 'rgba(255,255,255,.15)',
                color: '#fff',
              }}
            >
              By the numbers
            </span>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              A decade of placing
              <br />
              medical students abroad.
            </h2>
            <p>
              We publish our placement numbers every year. No selective truths — real students,
              real universities across Uzbekistan, Kazakhstan &amp; Kyrgyzstan.
            </p>
          </div>
          <div className="stats__grid">
            <div className="stat">
              <div className="stat__num">
                1,500<span className="sup">+</span>
              </div>
              <div className="stat__lbl">Students enrolled since 2014</div>
            </div>
            <div className="stat">
              <div className="stat__num">
                98<span className="sup">%</span>
              </div>
              <div className="stat__lbl">Visa success rate</div>
            </div>
            <div className="stat">
              <div className="stat__num">17</div>
              <div className="stat__lbl">Partner universities across 3 countries</div>
            </div>
            <div className="stat">
              <div className="stat__num">
                10<span className="sup">yrs</span>
              </div>
              <div className="stat__lbl">Of medical admissions experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section section--alt" id="stories">
        <div className="container">
          <div className="heading-block">
            <span className="eyebrow">Success stories</span>
            <h2 className="h-section">Real students. Real admissions. Real doctors.</h2>
            <p className="lede">
              A few of the 1,500+ students we&apos;ve placed at government medical universities
              since 2014.
            </p>
          </div>
          <div className="testimonials">
            <article className="t-card">
              <div className="t-stars" aria-label="5 out of 5">★★★★★</div>
              <p className="t-quote">
                &ldquo;I was rejected by three private medical colleges back home. Oxford Int&apos;l got me into Tashkent State Medical Academy within three weeks. Now I&apos;m in my second year.&rdquo;
              </p>
              <div className="t-foot">
                <div
                  className="t-avatar"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop')` }}
                  aria-label="Ahmed Raza"
                />
                <div className="t-meta">
                  <span className="t-name">Ahmed Raza</span>
                  <span className="t-uni">MBBS Year 2 · Tashkent State Medical Academy</span>
                </div>
              </div>
            </article>

            <article className="t-card">
              <div className="t-stars" aria-label="5 out of 5">★★★★★</div>
              <p className="t-quote">
                &ldquo;My parents were worried about safety and recognition. The team arranged a direct call with a current student at Kazakh National Medical University. That conversation convinced us.&rdquo;
              </p>
              <div className="t-foot">
                <div
                  className="t-avatar"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop')` }}
                  aria-label="Sara Malik"
                />
                <div className="t-meta">
                  <span className="t-name">Sara Malik</span>
                  <span className="t-uni">MBBS Year 1 · Kazakh National Medical University</span>
                </div>
              </div>
            </article>

            <article className="t-card">
              <div className="t-stars" aria-label="5 out of 5">★★★★★</div>
              <p className="t-quote">
                &ldquo;Visa was approved in 12 days. Accommodation was ready when I landed in Samarkand. Everything was exactly as they described. Zero surprises.&rdquo;
              </p>
              <div className="t-foot">
                <div
                  className="t-avatar"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop')` }}
                  aria-label="Fatima Noor"
                />
                <div className="t-meta">
                  <span className="t-name">Fatima Noor</span>
                  <span className="t-uni">MBBS Year 3 · Samarkand State Medical University</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="section">
        <div className="container">
          <div
            className="heading-block"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              maxWidth: 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
              <span className="eyebrow">Resources</span>
              <h2 className="h-section">Free guides, fresh deadlines, no spam.</h2>
            </div>
            <a href="#" className="btn btn--ghost">
              All resources <span className="arrow">→</span>
            </a>
          </div>
          <div className="blog">
            <article className="article article--a">
              <div className="article__img" aria-hidden="true">
                <span className="article__img-mark">Rx</span>
              </div>
              <div className="article__body">
                <span className="tag">Admissions</span>
                <h3 className="article__title">
                  MBBS in Uzbekistan 2026: complete eligibility, fees &amp; admission timeline
                </h3>
                <div className="article__meta">
                  <span>Updated 10 May</span>
                  <span className="dot" />
                  <span>9 min read</span>
                </div>
              </div>
            </article>
            <article className="article article--b">
              <div className="article__img" aria-hidden="true">
                <span className="article__img-mark">✓</span>
              </div>
              <div className="article__body">
                <span className="tag">Visas</span>
                <h3 className="article__title">
                  Uzbekistan student visa checklist: every document you need in 2026
                </h3>
                <div className="article__meta">
                  <span>Updated 02 May</span>
                  <span className="dot" />
                  <span>6 min read</span>
                </div>
              </div>
            </article>
            <article className="article article--c">
              <div className="article__img" aria-hidden="true">
                <span className="article__img-mark">KZ</span>
              </div>
              <div className="article__body">
                <span className="tag">Kazakhstan</span>
                <h3 className="article__title">
                  Top 5 government medical universities in Kazakhstan: a 2026 comparison
                </h3>
                <div className="article__meta">
                  <span>Updated 25 Apr</span>
                  <span className="dot" />
                  <span>11 min read</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <ContactSection />

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta" id="cta">
        <div className="container">
          <div className="final-cta__inner">
            <span className="eyebrow">No fees. No commitment.</span>
            <h2 style={{ marginTop: 18 }}>Ready to start your medical journey?</h2>
            <p>
              A free 45-minute counselling session with a senior admissions advisor. We&apos;ll give
              you an honest eligibility assessment — even if that means you&apos;re not ready yet.
            </p>
            <a
              href="https://wa.me/919048968415"
              className="btn btn--primary"
              style={{ fontSize: 16, padding: '18px 32px' }}
            >
              Book your free session today <span className="arrow">→</span>
            </a>
            <div className="final-cta__small">
              <span><span className="check">✓</span> Reply within 2 working hours</span>
              <span><span className="check">✓</span> Available on WhatsApp</span>
              <span><span className="check">✓</span> Honest eligibility assessment</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="about">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <a href="#" className="logo">
                <Image src="/logo.png" alt="Oxford International Education Group" width={128} height={128} className="logo__img" />
                <span>Oxford International Educational Group</span>
              </a>
              <p className="footer__tag">
                Official admissions partner for medical universities in Uzbekistan, Kazakhstan, and
                Kyrgyzstan. Helping students pursue their MBBS dream since 2014.
              </p>
              <div className="footer__contact">
                <span>Address</span>
                <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, lineHeight: 1.5 }}>
                  HiLITE Business Park, 2, Poovangal,<br />
                  Kozhikode, Pantheeramkavu,<br />
                  Kerala 673014, India
                </span>
                <span style={{ marginTop: 8 }}>Call / WhatsApp</span>
                <a href="tel:+919048968415">🇮🇳 +91 90489 68415</a>
                <a href="tel:+996223571108">🇰🇿 +996 22 357 1108</a>
                <a href="mailto:info@oxfordinternationaleducationalgroup.com">
                  info@oxfordinternationaleducationalgroup.com
                </a>
              </div>
              <div className="footer__social" aria-label="Social">
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <rect x={3} y={3} width={18} height={18} rx={5} />
                    <circle cx={12} cy={12} r={4} />
                    <circle cx={17.5} cy={6.5} r={1} fill="currentColor" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 8.2c-.2-1.3-.9-2.4-2.2-2.6C17.4 5.2 12 5.2 12 5.2s-5.4 0-7.8.4C2.9 5.8 2.2 6.9 2 8.2 1.6 10.6 1.6 12 1.6 12s0 1.4.4 3.8c.2 1.3.9 2.4 2.2 2.6 2.4.4 7.8.4 7.8.4s5.4 0 7.8-.4c1.3-.2 2-1.3 2.2-2.6.4-2.4.4-3.8.4-3.8s0-1.4-.4-3.8zM10 15.4V8.6L15.8 12 10 15.4z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4>Services</h4>
              <ul>
                {['MBBS admissions', 'Document processing', 'Visa assistance', 'Accommodation booking', 'Scholarship guidance', 'Pre-departure support'].map((s) => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Universities</h4>
              <ul>
                {[
                  'Tashkent State Medical Academy',
                  'Samarkand State Medical Univ.',
                  'Kazakh National Medical Univ.',
                  'Astana Medical University',
                  'Osh State University',
                  'Kyrgyz State Medical Academy',
                ].map((u) => (
                  <li key={u}><a href="#">{u}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                {['About us', 'Our advisors', 'Success stories', 'Careers', 'Contact'].map((c) => (
                  <li key={c}><a href="#">{c}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                {['Admission guides', 'Visa checklists', 'Fee structures', 'PMC eligibility', 'Blog'].map((r) => (
                  <li key={r}><a href="#">{r}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <span>© 2026 Oxford International Education Group · Kozhikode, Kerala, India · oxfordinternationaleducationalgroup.com</span>
            <span>
              <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Cookies</a>
            </span>
          </div>
        </div>
      </footer>

      {/* ===== FIXED SOCIAL SIDEBAR ===== */}
      <div className="social-bar">

        {/* WhatsApp */}
        <div className="social-bar__item">
          <button
            className="social-bar__btn social-bar__btn--wa"
            aria-label="WhatsApp"
            onClick={() => setWaOpen(o => !o)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.6c1.7 1 3.7 1.5 5.7 1.5 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.5zM12 22c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.5-1.5-5.4C2.1 6.4 6.5 2 12 2s9.9 4.4 9.9 9.9S17.5 22 12 22z"/>
            </svg>
          </button>
          {waOpen && (
            <>
              <div className="wa-overlay" onClick={() => setWaOpen(false)} />
              <div className="wa-popup">
                <p className="wa-popup__title">Chat on WhatsApp</p>
                <a
                  href="https://wa.me/919048968415"
                  className="wa-popup__num"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWaOpen(false)}
                >
                  <span className="wa-popup__flag">🇮🇳</span>
                  <div>
                    <div className="wa-popup__label">India</div>
                    <div>+91 90489 68415</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/996223571108"
                  className="wa-popup__num"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWaOpen(false)}
                >
                  <span className="wa-popup__flag">🇰🇿</span>
                  <div>
                    <div className="wa-popup__label">Kazakhstan</div>
                    <div>+996 22 357 1108</div>
                  </div>
                </a>
              </div>
            </>
          )}
        </div>

        {/* Facebook */}
        <a
          className="social-bar__btn social-bar__btn--fb"
          href="https://www.facebook.com/share/1CNimFiagN/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a
          className="social-bar__btn social-bar__btn--ig"
          href="https://www.instagram.com/oxford_international_education?utm_source=qr&igsh=MXJsZ3E0bHMxMnpxag=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <rect x={3} y={3} width={18} height={18} rx={5}/>
            <circle cx={12} cy={12} r={4}/>
            <circle cx={17.5} cy={6.5} r={1} fill="currentColor" stroke="none"/>
          </svg>
        </a>

      </div>
    </>
  );
}
