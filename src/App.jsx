import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Moon, Eye, Smile, Megaphone,
  Palette, FolderOpen, ArrowRight, Mail, Send, Heart,
  Zap, Shield, ChevronUp, TrendingUp, PoundSterling
} from 'lucide-react'
import './App.css'

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }
  })
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
}

function AnimateOnScroll({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#packages' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNav = () => setMenuOpen(false)

  return (
    <header role="banner">
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <a href="#hero" className="navbar-brand" aria-label="DawnVA — Home">
          <span className="brand-name">Dawn<span>VA</span></span>
          <small>Virtual Services</small>
        </a>
        <div className="navbar-links" role="menubar">
          {links.map(l => (
            <a key={l.href} href={l.href} role="menuitem">{l.label}</a>
          ))}
        </div>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="menu" aria-label="Mobile navigation">
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={handleNav} role="menuitem">{l.label}</a>
        ))}
      </div>
    </header>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="hero-bg-shape hero-bg-shape-1" aria-hidden="true" />
      <div className="hero-bg-shape hero-bg-shape-2" aria-hidden="true" />
      <div className="hero-bg-shape hero-bg-shape-3" aria-hidden="true" />

      <div className="hero-inner">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p className="section-label" variants={fadeUp} custom={0}>
            Flexible Virtual Marketing Support Exactly When You Need It.
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1}>
            Wake Up to <span className="highlight">It Done.</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2}>
            UK-based Virtual Assistant specialising in marketing &amp; communications
            — working evenings &amp; weekends so you don't have to.
          </motion.p>
          <motion.p variants={fadeUp} custom={2} style={{ fontSize: '1rem', opacity: 0.8 }}>
            Whether you're running a business or managing a busy marketing team, there's
            always more to do than hours in the day. Campaigns, content, communications,
            admin — it all takes time. And hiring a full-time employee isn't always the
            right solution.
          </motion.p>
          <motion.p variants={fadeUp} custom={2} style={{ fontSize: '1rem', opacity: 0.8 }}>
            I provide flexible, reliable virtual marketing support for organisations of all
            sizes — from small business owners or start-ups who need hands-on help, to
            larger marketing departments that need additional capacity without the cost or
            commitment of bringing in another member of staff.
          </motion.p>
          <motion.div variants={fadeUp} custom={3}>
            <a href="#contact" className="btn-primary" aria-label="Get in touch with Dawn VA">
              Let's Chat <ArrowRight size={18} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="headshot-placeholder">
            <img
              src="/img/dawn-new.png"
              alt="Dawn, UK-based Virtual Assistant specialising in internal comms, marketing and admin support"
              width="220"
              height="220"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── About ─── */
function About() {
  const trustItems = [
    { icon: <Moon size={20} aria-hidden="true" />, label: 'Evenings & Weekends' },
    { icon: <Zap size={20} aria-hidden="true" />, label: 'Quick Turnaround' },
    { icon: <Eye size={20} aria-hidden="true" />, label: 'High Attention to Detail' },
    { icon: <Smile size={20} aria-hidden="true" />, label: 'Friendly & Reliable' },
  ]

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="section-container">
        <AnimateOnScroll>
          <p className="section-label">About Me</p>
          <h2 className="section-title" id="about-title">Hello, I'm Dawn – Your Virtual Marketing Partner</h2>
        </AnimateOnScroll>

        <div className="about-content">
          <AnimateOnScroll delay={1}>
            <div className="about-text">
              <p>
                With over 25 years of marketing and communications experience, I help
                businesses and teams keep their projects moving, strengthen their marketing,
                and stay organised.
              </p>
              <p>You might need:</p>
              <ul className="about-needs-list">
                <li>An extra pair of hands to support an overloaded marketing department</li>
                <li>Someone to manage content, campaigns, or internal communications</li>
                <li>Help covering busy periods, holiday gaps, or peaks in workload</li>
                <li>Consistent marketing support for day-to-day tasks</li>
                <li>Someone who can work evenings or weekends, so things are ready by morning</li>
              </ul>
              <p>That's where I come in.</p>
              <p>
                I also offer a broad range of general administrative services, giving you
                the freedom to hand over the tasks that slow you down.
              </p>
              <p>
                Calm, organised, experienced, and committed to getting things done well — you
                get the support of a dependable marketing professional who slots seamlessly
                into your workflow.
              </p>
            </div>
          </AnimateOnScroll>

          <motion.div
            className="trust-signals"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            role="list"
            aria-label="Key benefits of working with Dawn VA"
          >
            {trustItems.map((item, i) => (
              <motion.div key={i} className="trust-item" variants={fadeUp} custom={i} role="listitem">
                <div className="trust-icon">{item.icon}</div>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
function Services() {
  const services = [
    {
      icon: <Megaphone size={22} aria-hidden="true" />,
      title: 'Marketing Support',
      description: 'Strategic and hands-on support across the areas you need most.',
      items: ['Content planning & coordination', 'Social media support', 'Email marketing', 'Internal communications', 'Brand message development', 'Campaign support & delivery', 'Website updates'],
    },
    {
      icon: <Palette size={22} aria-hidden="true" />,
      title: 'Design Support',
      description: 'Professional design for digital and print materials — polished, consistent, and on-brand.',
      items: ['Social media graphics', 'Marketing collateral', 'Presentations', 'Print & digital assets'],
    },
    {
      icon: <FolderOpen size={22} aria-hidden="true" />,
      title: 'Admin & Operational Support',
      description: 'Dependable help with the operational tasks that keep your business running smoothly.',
      items: ['Document creation', 'Proof reading and editing', 'Research & reporting', 'Essential admin'],
    },
  ]

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="section-container">
        <AnimateOnScroll>
          <p className="section-label">What I Do</p>
          <h2 className="section-title" id="services-title">Services</h2>
          <p className="section-subtitle">
            I provide reliable, out-of-office hours strategic and hands-on support
            across the areas you need most.
          </p>
        </AnimateOnScroll>

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {services.map((s, i) => (
            <motion.article key={i} className="service-card" variants={fadeUp} custom={i}>
              <div className="service-card-header">
                <div className="service-icon-wrapper">{s.icon}</div>
                <h3>{s.title}</h3>
              </div>
              {s.description && <p className="service-description">{s.description}</p>}
              <ul>
                {s.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Packages ─── */
function Packages() {
  const retainers = [
    {
      name: 'Starter Package',
      price: '£200',
      hours: '5 hours per month',
      bestFor: 'Busy professionals or small businesses needing minimal but reliable support.',
      featured: false,
    },
    {
      name: 'Momentum Package',
      price: '£320 – £400',
      hours: '8–10 hours per month',
      bestFor: 'Small businesses wanting regular help without a full retainer.',
      featured: false,
    },
    {
      name: 'Team Booster',
      price: '£640 – £800',
      hours: '16–20 hours per month',
      bestFor: 'Businesses needing consistent marketing support.',
      featured: false,
    },
  ]

  return (
    <section className="packages" id="packages" aria-labelledby="packages-title">
      <div className="section-container">
        <AnimateOnScroll>
          <p className="section-label">Flexible Pricing</p>
          <h2 className="section-title" id="packages-title">Pricing That Fits Your Workload</h2>
          <p className="section-subtitle">
            Whether you need a little help, a lot of help, or support during peak periods,
            I offer options designed to fit your workload and budget.
          </p>
        </AnimateOnScroll>

        {/* Hourly Rate */}
        <motion.div
          className="pricing-top pricing-top-single"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.article className="pricing-card" variants={fadeUp} custom={0}>
            <h3>Hourly Support</h3>
            <div className="package-price">£45<span>/hr</span></div>
            <p className="pricing-card-desc">
              Perfect for ad-hoc tasks, small projects or occasional assistance.
            </p>
          </motion.article>
        </motion.div>

        {/* Monthly Packages */}
        <AnimateOnScroll delay={1}>
          <h3 className="retainers-heading">Monthly Support Packages</h3>
          <p className="retainers-subtitle">
            For businesses and marketing teams who want consistent, ongoing support and steady momentum.
          </p>
        </AnimateOnScroll>

        <motion.div
          className="retainers-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {retainers.map((pkg, i) => (
            <motion.article
              key={i}
              className={`retainer-card${pkg.featured ? ' featured' : ''}`}
              variants={fadeUp}
              custom={i}
              aria-label={`${pkg.name} — ${pkg.price} per month`}
            >
              {pkg.featured && <div className="popular-badge" aria-label="Most popular package">Most Popular</div>}
              <h4>{pkg.name}</h4>
              <div className="package-price">{pkg.price}<span>/month</span></div>
              <div className="package-hours">{pkg.hours}</div>
              <p className="retainer-best-for"><strong>Best for:</strong> {pkg.bestFor}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Why Work With Me ─── */
function WhyMe() {
  const reasons = [
    { icon: <Moon size={24} aria-hidden="true" />, label: 'Evening & Weekend\nAvailability' },
    { icon: <Shield size={24} aria-hidden="true" />, label: '25+ Years\'\nExperience' },
    { icon: <Zap size={24} aria-hidden="true" />, label: 'Strategic +\nPractical Support' },
    { icon: <Heart size={24} aria-hidden="true" />, label: 'No Long-Term\nContracts' },
    { icon: <TrendingUp size={24} aria-hidden="true" />, label: 'Scale Support\nUp or Down' },
    { icon: <PoundSterling size={24} aria-hidden="true" />, label: 'Transparent Pricing\nNo Surprises' },
  ]

  return (
    <section className="why-me" id="why-me" aria-labelledby="why-title">
      <div className="section-container">
        <AnimateOnScroll>
          <p className="section-label" style={{ textAlign: 'center' }}>The Difference</p>
          <h2 className="section-title" id="why-title" style={{ textAlign: 'center' }}>Why Choose Dawn VA</h2>
        </AnimateOnScroll>

        <motion.div
          className="why-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          role="list"
          aria-label="Reasons to work with Dawn VA"
        >
          {reasons.map((r, i) => (
            <motion.div key={i} className="why-item" variants={fadeUp} custom={i} role="listitem">
              <div className="why-icon">{r.icon}</div>
              <h4 style={{ whiteSpace: 'pre-line' }}>{r.label}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Contact ─── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:info@dawnva.co.uk?subject=Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.name)} (${encodeURIComponent(form.email)})`
    window.location.href = mailtoLink
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="section-container">
        <div className="contact-inner">
          <AnimateOnScroll>
            <div className="contact-text">
              <p className="section-label">Get In Touch</p>
              <h2 className="section-title" id="contact-title">Let's Make Your Workload Lighter</h2>
              <p>
                If you're looking for flexible, reliable virtual marketing assistant support,
                I'd love to hear from you. Tell me what you need, and I'll create a tailored
                plan that fits your goals and your schedule.
              </p>
              <a href="mailto:info@dawnva.co.uk" className="contact-email" aria-label="Email Dawn VA at info@dawnva.co.uk">
                <Mail size={18} aria-hidden="true" />
                info@dawnva.co.uk
              </a>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={1}>
            <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact Dawn VA">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me a bit about what you need..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <div className="form-submit">
                <button type="submit" className="btn-primary">
                  Send Message <Send size={16} aria-hidden="true" />
                </button>
              </div>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <p className="footer-copy">&copy; 2026 Dawn VA. All rights reserved.</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#packages">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  )
}

/* ─── Back to Top ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.a
      href="#hero"
      aria-label="Back to top"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'var(--coral-rose)',
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(230, 122, 109, 0.35)',
        zIndex: 900,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <ChevronUp size={22} aria-hidden="true" />
    </motion.a>
  )
}

/* ─── App ─── */
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Packages />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
