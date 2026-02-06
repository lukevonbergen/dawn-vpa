import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Moon, Clock, Eye, Smile, MessageSquare, Users, Megaphone,
  Palette, FolderOpen, ArrowRight, Mail, Send, Heart,
  Zap, Shield, ChevronUp
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
    { label: 'Packages', href: '#packages' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNav = () => setMenuOpen(false)

  return (
    <header role="banner">
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <a href="#hero" className="navbar-brand" aria-label="Dawn VA — Home">
          Dawn <span>VA</span>
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
            UK-Based Virtual Assistant
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1}>
            Wake Up to <span className="highlight">It Done.</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2}>
            UK-based Virtual Assistant specialising in internal comms,
            marketing support, and admin — working evenings &amp; weekends
            so you don't have to.
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
              src="/img/dawn.jpg"
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
          <h2 className="section-title" id="about-title">Hello, I'm Dawn — Your UK Virtual Assistant</h2>
        </AnimateOnScroll>

        <div className="about-content">
          <AnimateOnScroll delay={1}>
            <div className="about-text">
              <p>
                I'm a UK-based Virtual Assistant with a calm, organised approach
                and a genuine love for getting things done well. Whether it's
                crafting clear internal communications, supporting your
                marketing efforts, or keeping your admin running smoothly — I'm here to help.
              </p>
              <p>
                I work evenings and weekends, which means you can hand things
                off at the end of your day and wake up to find them done.
                Professional communication, meticulous attention to detail, and
                a friendly approach — that's what you can always expect from
                your virtual assistant.
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
      icon: <MessageSquare size={22} aria-hidden="true" />,
      title: 'Internal Communications',
      items: ['Staff updates & announcements', 'Newsletters & bulletins', 'Employee engagement content', 'Clear, professional messaging'],
    },
    {
      icon: <Megaphone size={22} aria-hidden="true" />,
      title: 'Marketing Support',
      items: ['Social media management', 'Email marketing campaigns', 'Blog posts & content calendars', 'Research & website builds/updates'],
    },
    {
      icon: <Palette size={22} aria-hidden="true" />,
      title: 'Design & Collateral',
      items: ['Flyers, posters & brochures', 'PDF guides & branded templates', 'Presentations & event materials', 'Canva & InDesign expertise'],
    },
    {
      icon: <FolderOpen size={22} aria-hidden="true" />,
      title: 'Admin & Organisation',
      items: ['Document creation & formatting', 'Proofreading & editing', 'File organisation & management', 'Research & reporting'],
    },
  ]

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="section-container">
        <AnimateOnScroll>
          <p className="section-label">What I Do</p>
          <h2 className="section-title" id="services-title">Virtual Assistant Services</h2>
          <p className="section-subtitle">
            From internal comms to creative design — I offer flexible virtual assistant
            support tailored to what you actually need.
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
  const packages = [
    {
      name: 'Starter',
      price: '£120',
      hours: '5 hours / month',
      features: ['Light admin support', 'Occasional comms tasks', 'Small marketing tasks', 'Email support'],
      featured: false,
    },
    {
      name: 'Standard',
      price: '£240',
      hours: '10 hours / month',
      features: ['Regular weekly support', 'Admin, comms or marketing', 'Content creation & scheduling', 'Priority email support'],
      featured: true,
    },
    {
      name: 'Pro',
      price: '£480',
      hours: '20 hours / month',
      features: ['Consistent weekly support', 'Full-service across all areas', 'Strategy & planning included', 'Priority turnaround'],
      featured: false,
    },
  ]

  return (
    <section className="packages" id="packages" aria-labelledby="packages-title">
      <div className="section-container">
        <AnimateOnScroll>
          <p className="section-label">Pricing</p>
          <h2 className="section-title" id="packages-title">Virtual Assistant Packages &amp; Pricing</h2>
          <p className="section-subtitle">
            Simple, transparent pricing. Pick the level of support that suits you,
            or get in touch for something bespoke.
          </p>
        </AnimateOnScroll>

        <motion.div
          className="packages-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {packages.map((pkg, i) => (
            <motion.article
              key={i}
              className={`package-card${pkg.featured ? ' featured' : ''}`}
              variants={fadeUp}
              custom={i}
              aria-label={`${pkg.name} package — ${pkg.price} per month`}
            >
              {pkg.featured && <div className="popular-badge" aria-label="Most popular package">Most Popular</div>}
              <h3>{pkg.name}</h3>
              <div className="package-price">
                {pkg.price}<span>/month</span>
              </div>
              <div className="package-hours">{pkg.hours}</div>
              <ul>
                {pkg.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <AnimateOnScroll delay={2}>
          <p className="packages-note">
            <strong>Hourly rate:</strong> £25 (admin, comms, marketing) &nbsp;|&nbsp;{' '}
            <strong>Design rate:</strong> £30–£35 (Canva &amp; InDesign) &nbsp;|&nbsp;{' '}
            Fixed price projects available on request.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── Why Work With Me ─── */
function WhyMe() {
  const reasons = [
    { icon: <Shield size={24} aria-hidden="true" />, label: 'Calm &\nOrganised' },
    { icon: <MessageSquare size={24} aria-hidden="true" />, label: 'Professional\nCommunication' },
    { icon: <Users size={24} aria-hidden="true" />, label: 'Flexible &\nTailored' },
    { icon: <Zap size={24} aria-hidden="true" />, label: 'Quick\nTurnaround' },
    { icon: <Heart size={24} aria-hidden="true" />, label: 'Friendly &\nReliable' },
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
    const mailtoLink = `mailto:hello@dawnva.co.uk?subject=Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.name)} (${encodeURIComponent(form.email)})`
    window.location.href = mailtoLink
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="section-container">
        <div className="contact-inner">
          <AnimateOnScroll>
            <div className="contact-text">
              <p className="section-label">Get In Touch</p>
              <h2 className="section-title" id="contact-title">Let's Chat About Your VA Support</h2>
              <p>
                Need reliable virtual assistant support outside the usual 9–5? I'd love to hear
                from you. Whether you have a clear idea of what you need, or just
                want to explore how a UK-based VA can help — drop me a message.
              </p>
              <a href="mailto:hello@dawnva.co.uk" className="contact-email" aria-label="Email Dawn VA at hello@dawnva.co.uk">
                <Mail size={18} aria-hidden="true" />
                hello@dawnva.co.uk
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
        <p className="footer-copy">&copy; 2025 Dawn VA. All rights reserved.</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#packages">Packages</a>
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
