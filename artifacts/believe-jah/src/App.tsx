import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Collections from '@/pages/collections';
import HowToMeasure from '@/pages/how-to-measure';
import NotFound from '@/pages/not-found';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check,
  MapPin, Menu, Phone, ShieldCheck, X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const assets = '/brand/';
  const phoneDigits = '2349116025977';
  const phoneDisplay = '09116025977';
  const address = 'Tim Caro Street, opposite Welfare Hospital, along Old Ife Road, Ibadan, Nigeria.';
  const looks = [
    ['The Teal Ceremony', 'Agbada', 'Teal_Green_Agbada_1791518540559.jpg'],
    ['Quiet Structure', 'Senator', 'Believe_Jah_5_1791518540549.jpeg'],
    ['The White Occasion', 'Agbada', 'IMG-20261012-WA0000.jpg'],
    ['The Oxblood Agbada', 'Agbada', "Traditional_Men's_Outfit;_Agbada_1791518540560.jpg"],
    ['Made to Move', 'Custom Tee', 'Believe_Jah_12_1791518540557.jpeg'],
    ['A Softer Line', 'Kaftan', 'Believe_Jah_1_1791518540545.jpeg'],
    ['A Study in White', 'Senator', 'Believe_Jah_7_1791518540552.jpeg'],
    ['White on White', 'Kaftan', 'IMG-20261114-WA0000.jpg'],
    ['The Embroidered Senator', 'Senator', 'Believe_Jah_3_1791518540547.jpeg'],
  ];
  const heroSlides = [
    { image: 'Teal_Green_Agbada_1791518540559.jpg', alt: 'Teal embroidered Agbada from BELIEVE JAH Design' },
    { image: 'Believe_Jah_12_1791518540557.jpeg', alt: 'Contemporary striped tee set from BELIEVE JAH Design' },
    { image: 'Believe_Jah_5_1791518540549.jpeg', alt: 'Tailored Senator two-piece from BELIEVE JAH Design' },
  ];
  const heroLeftSlides = [
    'Believe_Jah_1_1791518540545.jpeg',
    'Believe_Jah_2_1791518540546.jpeg',
    'IMG-20261106-WA0000.jpg',
  ];
  const nav = [['The atelier', '#atelier'], ['Collections', '/collections'], ['Custom fit', '#custom-fit'], ['Visit us', '#visit'], ['How to measure', '/how-to-measure']];
  const selections = [
    [['Agbada', 'A ceremonial silhouette, cut to command.'], ['Kaftan', 'A clean, considered line for any occasion.'], ['Senator', 'Quiet structure, precise finishing.'], ['Custom Graphic Tee', 'Your idea, made distinctly yours.']],
    [['Tailored Slim Fit', 'Close, clean and shaped.'], ['Traditional Regular', 'Room to move. Always composed.'], ['Relaxed', 'An easy drape with intention.']],
    [['Cashmere', 'Soft hand, polished presence.'], ['Wool', 'A refined texture with body.'], ['Polished Cotton', 'Breathable, crisp and versatile.'], ['Aso-Oke trims', 'A traditional detail, made personal.']],
  ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [step, setStep] = useState(0);
  const [fit, setFit] = useState(['', '', '']);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 2000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const sections = document.querySelectorAll<HTMLElement>('.site-shell > section:not(.hero)');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
    sections.forEach((section) => {
      section.classList.add('section-reveal');
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.title = 'BELIEVE JAH Design — Bespoke Nigerian Menswear in Ibadan';
    const description = 'Bespoke Agbada, Kaftans, Senator suits and custom graphic tees from BELIEVE JAH Design, a menswear atelier in Ibadan, Nigeria.';
    const keywords = 'Nigerian tailored native wear, Bespoke Agbada Ibadan, Custom graphic tees, Ibadan menswear atelier';
    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta('description', description);
    setMeta('keywords', keywords);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const getDirections = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const continueToInquiry = () => {
    const garment = fit[0] || 'custom garment';
    const fitText = fit[1] || 'to be discussed';
    const cloth = fit[2] || 'to be discussed';
    setMessage(`I am interested in a ${garment}. Fit preference: ${fitText}. Fabric interest: ${cloth}.`);
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
  };
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatus('');
    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      setError('Please add your name, WhatsApp number and a short message.');
      return;
    }
    const text = [
      'Hello BELIEVE JAH Design, I would like to make an inquiry.', '',
      `Name: ${fullName}`, `WhatsApp / phone: ${phone}`, '',
      `Message: ${message}`,
    ].join('\n');
    window.open(`https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setStatus('Your WhatsApp message is ready. Send it in WhatsApp to complete your inquiry.');
  };

  return (
    <main className="site-shell">
      <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand-lockup" href="#top" aria-label="BELIEVE JAH Design home">
          <img src="/favicon.svg" alt="" />
          <span className="brand-word">BELIEVE JAH<span>Design</span></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="btn-primary nav-cta" href="#consultation">Start an inquiry <ArrowUpRight size={14} /></a>
        <button className="mobile-toggle" type="button" aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)} data-testid="button-open-mobile-menu"><Menu size={20} /></button>
      </header>
      <div id="mobile-navigation" className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-menu-head">
          <a className="brand-lockup" href="#top" onClick={() => setMenuOpen(false)}><img src="/favicon.svg" alt="" /><span className="brand-word">BELIEVE JAH<span>Design</span></span></a>
          <button className="mobile-toggle" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} type="button"><X size={20} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="mobile-nav-cta" href="#consultation" onClick={() => setMenuOpen(false)}>Start an inquiry <ArrowUpRight size={14} /></a>
        </nav>
      </div>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-embroidery" aria-hidden="true">
          <div className="hero-left-track" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
            {heroLeftSlides.map((image, index) => (
              <div className="hero-left-slide" key={image}>
                <img src={`${assets}${image}`} alt="" fetchPriority={index === 0 ? 'high' : undefined} />
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual" role="region" aria-label="Featured garments" aria-roledescription="carousel">
          <div className="hero-track" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
            {heroSlides.map((slide, index) => (
              <div className="hero-slide" key={slide.image} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}`} aria-hidden={heroSlide !== index}>
                <img src={`${assets}${slide.image}`} alt={slide.alt} fetchPriority={index === 0 ? 'high' : undefined} />
              </div>
            ))}
          </div>
          <div className="hero-dots" aria-label="Choose a featured garment">
            {heroSlides.map((slide, index) => (
              <button key={slide.image} type="button" aria-label={`Show ${slide.alt}`} aria-current={heroSlide === index ? 'true' : undefined} onClick={() => setHeroSlide(index)} />
            ))}
          </div>
        </div>
        <div className="hero-copy">
          <div className="hero-topline eyebrow">Bespoke menswear · Ibadan, Nigeria</div>
          <h1 id="hero-title">Nigerian<br className="hero-title-break" /><span className="hero-title-second">menswear.</span><br /><em>Tailored well.</em></h1>
          <p className="hero-sub">Agbada, kaftans, senator wear and custom tees for weddings, ceremonies and everyday luxury.</p>
          <div className="hero-actions"><a className="btn-primary" href="/collections">Explore collections <ArrowRight size={15} /></a><a className="btn-outline" href="#custom-fit">How to order <ArrowDown size={14} /></a></div>
        </div>
        <div className="hero-seal" aria-hidden="true"><div><b>BJ</b>Cut with purpose<br />Since 2018</div></div>
        <div className="hero-index eyebrow">01 / A new expression</div><div className="hero-caption"><span>Tradition, tailored forward</span></div>
      </section>

      <section className="trust-strip" aria-label="About the atelier">
        <div><span className="eyebrow">01 / Since 2018</span><strong>Bespoke tailoring</strong></div>
        <div><span className="eyebrow">02 / Made to measure</span><strong>Weddings · ceremonies · everyday luxury</strong></div>
        <div><span className="eyebrow">03 / Custom fittings</span><strong>Available at our atelier</strong></div>
        <div><span className="eyebrow">04 / Local atelier</span><strong>Ibadan, Nigeria</strong></div>
      </section>

      <section id="atelier" className="section-pad">
        <div className="story-grid">
          <div className="story-photo"><img src={`${assets}Believe_Jah_13_1791518540558.jpeg`} alt="The BELIEVE JAH Design team and garments inside the Ibadan atelier" loading="lazy" /><div className="photo-label">At work · The atelier, Ibadan</div></div>
          <div className="story-content">
            <div className="eyebrow kicker-line">Meet the maker</div>
            <h2 className="display">A steady hand.<br /><em>A clear point of view.</em></h2>
            <p>At BELIEVE JAH Design, the master tailor brings a personal eye to every stage: listening, cutting, fitting and finishing. The studio is a place where traditional Nigerian dress is respected, not frozen in time.</p>
            <blockquote className="pullquote">“Every cut is measured to project stature, confidence, and identity.”</blockquote>
            <div className="story-signoff">Believe Jah</div>
          </div>
        </div>
      </section>

      <section id="lookbook" className="lookbook section-pad">
        <div className="lookbook-head"><div><div className="eyebrow kicker-line">Selected work · 01—09</div><h2 className="display">The lookbook</h2></div><p>Silhouettes, textures and details from the atelier. Select a look to start an inquiry.</p></div>
        <div className="lookbook-grid">{looks.map(([name, category, image], index) => (
          <article className="look-card" key={name} data-testid={`card-look-${index + 1}`}>
            <img src={`${assets}${image}`} alt={`${name}, ${category} by BELIEVE JAH Design`} loading="lazy" />
            <div className="look-overlay"><span className="look-cat">{category}</span><h3>{name}</h3></div>
          </article>
        ))}</div>
      </section>

      <section id="custom-fit" className="fit-section section-pad">
        <div className="fit-wrap">
          <div className="fit-intro"><div className="eyebrow kicker-line">How to order</div><h2 className="display">From first choice<br /><em>to final fitting.</em></h2><p>Choose your garment, fit and fabric, then continue to WhatsApp. The atelier will confirm the details and arrange your custom fitting.</p><ol className="order-steps"><li><span>01</span>Choose a garment</li><li><span>02</span>Select fit and fabric</li><li><span>03</span>Send your inquiry and confirm a fitting</li></ol></div>
          <div className="fit-panel" aria-live="polite">
            <div className="fit-progress" aria-label={`Step ${step + 1} of 2`}>{['Garment', 'Fit & fabric'].map((label, index) => <div className={`fit-step-mark ${step === index ? 'active' : ''} ${step > index ? 'done' : ''}`} key={label}><b>{step > index ? <Check size={11} /> : `0${index + 1}`}</b><span>{label}</span></div>)}</div>
            <div className="fit-question">
              <div className="eyebrow">Step 0{step + 1} / 02</div>
              {step === 0 ? <><h3>What are we making?</h3><p>Start with the silhouette you have in mind.</p><div className="choice-grid">{selections[0].map(([label, desc]) => <button key={label} type="button" className={`choice ${fit[0] === label ? 'selected' : ''}`} onClick={() => setFit((current) => [label, current[1], current[2]])} aria-pressed={fit[0] === label}><span>{label}</span><small>{desc}</small></button>)}</div></> :
                <><h3>Choose your fit and fabric</h3><p>These preferences help us prepare for your inquiry.</p><div className="fit-choice-group"><div className="eyebrow">Fit</div><div className="choice-grid">{selections[1].map(([label, desc]) => <button key={label} type="button" className={`choice ${fit[1] === label ? 'selected' : ''}`} onClick={() => setFit((current) => [current[0], label, current[2]])} aria-pressed={fit[1] === label}><span>{label}</span><small>{desc}</small></button>)}</div></div><div className="fit-choice-group"><div className="eyebrow">Fabric interest</div><div className="choice-grid">{selections[2].map(([label, desc]) => <button key={label} type="button" className={`choice ${fit[2] === label ? 'selected' : ''}`} onClick={() => setFit((current) => [current[0], current[1], label])} aria-pressed={fit[2] === label}><span>{label}</span><small>{desc}</small></button>)}</div></div><div className="fit-choice-group fit-inquiry-group"><div className="eyebrow">Inquiry</div><button type="button" className="btn-dark" onClick={continueToInquiry}>Continue to inquiry <ArrowRight size={14} /></button></div><a className="fit-guide-link" href="/how-to-measure">How to measure <ArrowUpRight size={14} /></a></>}
            </div>
            <div className="fit-navigation"><button type="button" className="text-link" onClick={() => setStep(0)} disabled={!step} style={{ opacity: step ? 1 : .35 }}><ArrowLeft size={13} /> Back</button>{step === 0 && <button type="button" className="btn-dark" onClick={() => setStep(1)} disabled={!fit[0]}>Continue <ArrowRight size={14} /></button>}</div>
          </div>
        </div>
      </section>

      <section id="craft" className="craft-section section-pad">
        <div className="craft-heading"><div className="eyebrow kicker-line" style={{ justifyContent: 'center' }}>Anatomy of excellence</div><h2 className="display">The details hold<br /><em>the whole story.</em></h2><p>Good craft does not need to announce itself. You feel it in the way a line sits, a fabric falls, a mark is made.</p></div>
        <div className="craft-grid">
          <article className="craft-item"><span className="craft-number">01 / THE STITCH</span><h3>Precision, by hand.</h3><p>High-tensile precision embroidery brings definition to a neckline and character to the smallest detail.</p><div className="craft-rule" /></article>
          <article className="craft-item"><span className="craft-number">02 / THE FABRIC</span><h3>Feel before form.</h3><p>Luxury textiles are selected for their texture, drape and the way they live with you over time.</p><div className="craft-rule" /></article>
          <article className="craft-item"><span className="craft-number">03 / THE MONOGRAM</span><h3>A mark of your own.</h3><p>Custom hand-embroidery gives each piece a considered signature, made to belong to one person.</p><div className="craft-rule" /></article>
        </div>
        <div className="craft-image-strip"><img src={`${assets}Believe_Jah_11_1791518540556.jpeg`} alt="A wearer in a finished white BELIEVE JAH Design outfit with embroidered details" loading="lazy" /><div className="craft-image-caption"><span>In the details</span><h3>Every stitch has a reason.</h3></div></div>
      </section>

      <section id="testimonials" className="testimonials section-pad" aria-labelledby="testimonials-title">
        <div className="testimonials-heading">
          <div className="eyebrow kicker-line">Client notes</div>
          <h2 id="testimonials-title" className="display">Made personal.<br /><em>Remembered.</em></h2>
          <p>Illustrative sample reviews only—not verified client feedback. Replace them with customer-approved quotes before publishing.</p>
        </div>
        <div className="testimonial-grid">
          {[
            {
              topic: 'Fit & comfort',
              quote: 'The fit was spot-on. I stayed comfortable all day.',
              garment: 'Bespoke Agbada',
            },
            {
              topic: 'The experience',
              quote: 'They listened to what I wanted and made the whole process easy.',
              garment: 'Custom fitting',
            },
            {
              topic: 'Craft & finish',
              quote: 'The embroidery was beautiful. You can tell real care went into it.',
              garment: 'Senator set',
            },
          ].map(({ topic, quote, garment }) => (
            <article className="testimonial-card" key={topic}>
              <span className="eyebrow">Illustrative sample · {topic}</span>
              <blockquote>“{quote}”</blockquote>
              <span className="testimonial-attribution">Sample · {garment}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="visit" className="contact-zone section-pad">
        <div className="visit-grid">
          <div className="visit-copy"><div className="eyebrow kicker-line">Come by the atelier</div><h2 className="display">Good work<br />begins <em>in person.</em></h2><p>Visit us in Ibadan to talk through your idea, see the work up close and plan a fitting with the atelier.</p><div className="visit-address"><MapPin size={19} /><address>{address}</address></div><a className="text-link visit-directions" href={getDirections} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a></div>
          <div className="visit-map"><iframe title="Map showing Tim Caro Street, opposite Welfare Hospital, Old Ife Road, Ibadan" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${encodeURIComponent('Tim Caro Street, opposite Welfare Hospital, Old Ife Road, Ibadan, Nigeria')}&t=&z=14&ie=UTF8&iwloc=&output=embed`} /><div className="map-label"><strong>BELIEVE JAH Design</strong><span>Tim Caro Street · Ibadan</span></div></div>
        </div>
      </section>

      <section id="consultation" className="consult section-pad">
        <div className="consult-head"><div className="eyebrow kicker-line">Start a consultation</div><h2 className="display">Let us make<br /><em>something yours.</em></h2><p>Share your name, WhatsApp number and a short description. We will take the conversation from there.</p>
          <div className="consult-aside"><a href={`tel:${phoneDisplay}`}><Phone size={15} />{phoneDisplay}</a><a href="https://www.tiktok.com/@believejah08" target="_blank" rel="noreferrer"><ArrowUpRight size={15} />TikTok · @believejah08</a><a href={getDirections} target="_blank" rel="noreferrer"><MapPin size={15} />Ibadan atelier directions</a></div>
        </div>
        <form className="consult-form" onSubmit={submitForm}>
          <div className="form-intro">Three details to begin</div>
          <div className="form-grid">
            <div className="form-field"><label htmlFor="full-name">Full name *</label><input id="full-name" required autoComplete="name" placeholder="Your name" value={fullName} onChange={(event) => setFullName(event.target.value)} data-testid="input-full-name" /></div>
            <div className="form-field"><label htmlFor="whatsapp-phone">WhatsApp phone number *</label><input id="whatsapp-phone" required type="tel" autoComplete="tel" placeholder="+234 ..." value={phone} onChange={(event) => setPhone(event.target.value)} data-testid="input-phone" /></div>
            <div className="form-field full"><label htmlFor="message">What would you like to discuss? *</label><textarea id="message" required placeholder="A garment, occasion, fitting or question…" value={message} onChange={(event) => setMessage(event.target.value)} data-testid="input-message" /></div>
          </div>
          <p className="form-note"><ShieldCheck size={14} />This opens a prepared WhatsApp message. Review and send it there to complete your inquiry.</p>
          <div className="form-submit-row"><button className="btn-primary" type="submit" data-testid="button-submit-inquiry">Send inquiry via WhatsApp <ArrowUpRight size={15} /></button></div>
          {status && <div className="form-message" role="status">{status}</div>}{error && <div className="form-error" role="alert">{error}</div>}
        </form>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="footer-brand-lockup" href="#top" aria-label="BELIEVE JAH Design home">
              <img src="/favicon.svg" alt="" loading="lazy" />
              <span className="brand-word">BELIEVE JAH<span>Design</span></span>
            </a>
            <p>Bespoke Nigerian menswear, made with care in our Ibadan atelier.</p>
            <a className="footer-cta" href="#consultation">Start an inquiry <ArrowUpRight size={14} /></a>
          </div>
          <div className="footer-column"><h3>Explore</h3><a href="/collections">Collections</a><a href="#lookbook">Lookbook</a><a href="#custom-fit">Custom fit</a><a href="/how-to-measure">How to measure</a></div>
          <div className="footer-column"><h3>Visit the atelier</h3><a href={`tel:${phoneDisplay}`}>{phoneDisplay}</a><a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.tiktok.com/@believejah08" target="_blank" rel="noreferrer">@believejah08 · TikTok</a><a href={getDirections} target="_blank" rel="noreferrer">Ibadan directions ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© BELIEVE JAH Design · Ibadan, Nigeria</span><span>Made to carry your name.</span></div>
      </footer>
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'BELIEVE JAH Design', description: 'Menswear atelier specializing in traditional Nigerian attire and modern custom pieces in Ibadan.', telephone: '+2349116025977', address: { '@type': 'PostalAddress', streetAddress: 'Tim Caro Street, opposite Welfare Hospital, along Old Ife Road', addressLocality: 'Ibadan', addressCountry: 'NG' }, sameAs: ['https://www.tiktok.com/@believejah08'], knowsAbout: ['Bespoke Agbada', 'Kaftans', 'Senator suits', 'Custom graphic tees'] })}</script>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/collections" component={Collections} />
        <Route path="/how-to-measure" component={HowToMeasure} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
