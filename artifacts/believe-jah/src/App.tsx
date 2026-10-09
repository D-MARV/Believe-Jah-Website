import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Download,
  MapPin, Menu, MessageCircle, Phone, Scissors, ShieldCheck, X,
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
    ['The Teal Ceremony', 'Bespoke Native', 'Agbada', 'Teal_Green_Agbada_1791518540559.jpg'],
    ['Quiet Structure', 'Modern Senator', 'Senator', 'Believe_Jah_5_1791518540549.jpeg'],
    ['A Study in White', 'Bespoke Native', 'Kaftan', 'Believe_Jah_11_1791518540556.jpeg'],
    ['The Oxblood Agbada', 'Bespoke Native', 'Agbada', "Traditional_Men's_Outfit;_Agbada_1791518540560.jpg"],
    ['Made to Move', 'Custom Tee', 'Custom Graphic Tee', 'Believe_Jah_13_1791518540558.jpeg'],
    ['A Softer Line', 'Bespoke Native', 'Senator', 'Believe_Jah_12_1791518540557.jpeg'],
    ['The First Impression', 'Bespoke Native', 'Kaftan', 'Believe_Jah_4_1791518540548.jpeg'],
    ['White on White', 'Custom Tee', 'Custom Graphic Tee', 'Believe_Jah_3_1791518540547.jpeg'],
    ['A Mark of Your Own', 'Bespoke Native', 'Agbada', 'Believe_Jah_1_1791518540545.jpeg'],
  ];
  const nav = [['The atelier', '#atelier'], ['Lookbook', '#lookbook'], ['Custom fit', '#custom-fit'], ['Our craft', '#craft'], ['Visit us', '#visit']];
  const selections = [
    [['Agbada', 'A ceremonial silhouette, cut to command.'], ['Kaftan', 'A clean, considered line for any occasion.'], ['Senator', 'Quiet structure, precise finishing.'], ['Custom Graphic Tee', 'Your idea, made distinctly yours.']],
    [['Tailored Slim Fit', 'Close, clean and shaped.'], ['Traditional Regular', 'Room to move. Always composed.'], ['Relaxed', 'An easy drape with intention.']],
    [['Cashmere', 'Soft hand, polished presence.'], ['Wool', 'A refined texture with body.'], ['Polished Cotton', 'Breathable, crisp and versatile.'], ['Aso-Oke trims', 'A traditional detail, made personal.']],
  ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [fit, setFit] = useState(['', '', '']);
  const [inquiry, setInquiry] = useState('Bespoke Native Wear');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
  const beginInquiry = (garment?: string, lookName?: string) => {
    if (garment) {
      setFit((current) => [garment, current[1], current[2]]);
      setInquiry(garment === 'Custom Graphic Tee' ? 'Custom Tee Order' : 'Bespoke Native Wear');
      setMessage(`I am interested in ${lookName ? `“${lookName}”` : `a ${garment}`} and would like to discuss a custom fit.`);
    }
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
  };
  const guideDownload = () => {
    const copy = [
      'BELIEVE JAH DESIGN', 'YOUR FITTING GUIDE', '',
      'A good fit begins with a good measure. Use a flexible tape and keep it level. Measure over light clothing.', '',
      '1. NECK - around the base of the neck.',
      '2. CHEST - the fullest part, tape comfortably snug.',
      '3. WAIST - around your natural waist.',
      '4. HIP - around the fullest part of the seat.',
      '5. SLEEVE - shoulder point to wrist.',
      '6. LENGTH - shoulder point to desired hem.',
      '7. INSEAM - crotch to desired trouser hem.', '',
      'Record each measurement in centimetres or inches.',
      'Share your measurements and garment preference with our atelier.',
      '', 'Tim Caro Street, opposite Welfare Hospital, along Old Ife Road, Ibadan.',
      'WhatsApp / Phone: 09116025977',
    ];
    const escape = (line: string) => line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    const stream = ['BT', '/F1 15 Tf', '52 748 Td', `(${escape(copy[0])}) Tj`, '/F1 11 Tf', '0 -28 Td', `(${escape(copy[1])}) Tj`, '/F1 10 Tf', ...copy.slice(2).flatMap((line) => ['0 -22 Td', `(${escape(line)}) Tj`]), 'ET'].join('\n');
    const objects = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
    const xref = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, '0')} 00000 n \n`; });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'believe-jah-fitting-guide.pdf';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
  };
  const chooseNext = (kind: string) => {
    const garment = fit[0] || 'custom garment';
    const fitText = fit[1] || 'to be discussed';
    const cloth = fit[2] || 'to be discussed';
    if (kind === 'Download Fitting Guide PDF') { guideDownload(); return; }
    if (kind === 'Book In-Person Session') {
      setInquiry('Wedding Fitting');
      setMessage(`I would like to book an in-person fitting for a ${garment}. Fit preference: ${fitText}. Fabric interest: ${cloth}.`);
    } else {
      setInquiry(garment === 'Custom Graphic Tee' ? 'Custom Tee Order' : 'Bespoke Native Wear');
      setMessage(`I would like to submit my measurements for a ${garment}. Fit preference: ${fitText}. Fabric interest: ${cloth}. Please let me know how to share them.`);
    }
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
      `Name: ${fullName}`, `Email: ${email || 'Not provided'}`, `WhatsApp / phone: ${phone}`,
      `Inquiry: ${inquiry}`, `Target date: ${date || 'Not specified'}`,
      `Budget: ${budget || 'To be discussed'}`, `Inspiration file: ${fileName || 'None attached'}`, '',
      `Message: ${message}`,
    ].join('\n');
    window.open(`https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setStatus('Your WhatsApp message is ready. Send it in WhatsApp to complete your inquiry.');
  };

  return (
    <main className="site-shell">
      <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand-lockup" href="#top" aria-label="BELIEVE JAH Design home">
          <img src={`${assets}${scrolled ? 'logo.svg' : 'logo-dark.svg'}`} alt="BELIEVE JAH Design logo" />
          <span className="brand-word">BELIEVE JAH<span>Design</span></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a className="nav-inquire" href="#consultation">Inquire now</a>
        </nav>
        <button className="mobile-toggle" type="button" aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)} data-testid="button-open-mobile-menu"><Menu size={20} /></button>
      </header>
      <div id="mobile-navigation" className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-menu-head">
          <a className="brand-lockup" href="#top" onClick={() => setMenuOpen(false)}><img src={`${assets}logo-dark.svg`} alt="BELIEVE JAH Design logo" /><span className="brand-word">BELIEVE JAH<span>Design</span></span></a>
          <button className="mobile-toggle" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} type="button"><X size={20} /></button>
        </div>
        <nav aria-label="Mobile navigation">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#consultation" onClick={() => setMenuOpen(false)}>Inquire now</a></nav>
        <div className="mobile-social"><a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.tiktok.com/@believejah08" target="_blank" rel="noreferrer">TikTok</a><a href={`tel:${phoneDisplay}`}>Call atelier</a></div>
      </div>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-embroidery" aria-hidden="true"><img src={`${assets}agbada-embroidery.jpg`} alt="" fetchPriority="high" /></div>
        <div className="hero-visual"><img src={`${assets}Believe_Jah_3_1791518540547.jpeg`} alt="Custom embroidered shirts by BELIEVE JAH Design" fetchPriority="high" /></div>
        <div className="hero-copy">
          <div className="hero-topline eyebrow">Ibadan, Nigeria · Made with conviction</div>
          <h1 id="hero-title">Heritage<br />craftsmanship.<br /><em>Modern expression.</em></h1>
          <p className="hero-sub">Traditional Nigerian elegance, cut for the way you move now. Bespoke native wear and custom pieces, made with care in Ibadan.</p>
          <div className="hero-actions"><a className="btn-primary" href="#custom-fit">Request custom fit <ArrowRight size={15} /></a><a className="btn-outline" href="#lookbook">Explore lookbook <ArrowDown size={14} /></a></div>
        </div>
        <div className="hero-seal" aria-hidden="true"><div><b>BJ</b>Cut with purpose<br />Since 2018</div></div>
        <div className="hero-index eyebrow">01 / A new expression</div><div className="hero-caption"><span>Tradition, tailored forward</span></div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0, 1].map((i) => <div key={i}><span>Made in Ibadan</span><span>Heritage in every stitch</span><span>Cut to carry your name</span><span>Bespoke, never borrowed</span></div>)}</div></div>
      <section className="manifesto" aria-labelledby="manifesto-title">
        <div className="eyebrow kicker-line">A point of view</div>
        <h2 id="manifesto-title" className="display">Rooted in <em>tradition.</em><br />Made for what comes next.</h2>
        <p>BELIEVE JAH Design is a menswear atelier in Ibadan, bridging the stature of traditional Nigerian dress with the self-expression of contemporary streetwear. Every garment begins with a conversation, then takes shape around the person who will wear it.</p>
        <div className="manifesto-foot"><span className="eyebrow">Bespoke native</span><span className="eyebrow">Modern form</span><span className="eyebrow">Made personal</span></div>
      </section>

      <section id="atelier" className="section-pad">
        <div className="story-grid">
          <div className="story-photo"><img src={`${assets}Believe_Jah_13_1791518540558.jpeg`} alt="The BELIEVE JAH Design team and garments inside the Ibadan atelier" loading="lazy" /><div className="photo-label">At work · The atelier, Ibadan</div></div>
          <div className="story-content">
            <div className="eyebrow kicker-line">Meet the maker</div>
            <h2 className="display">A steady hand.<br /><em>A clear point of view.</em></h2>
            <p>At BELIEVE JAH Design, the master tailor brings a personal eye to every stage: listening, cutting, fitting and finishing. The studio is a place where traditional Nigerian dress is respected, not frozen in time.</p>
            <p>From the first sketch to the last stitch, the work is guided by a simple belief: what you wear should feel unmistakably yours.</p>
            <blockquote className="pullquote">“Every cut is measured to project stature, confidence, and identity.”</blockquote>
            <div className="story-signoff">Believe Jah</div>
            <div className="story-meta"><div><strong>01—01</strong><span>Made around you</span></div><div><strong>Ibadan</strong><span>Our home atelier</span></div></div>
          </div>
        </div>
      </section>

      <section id="lookbook" className="lookbook section-pad">
        <div className="lookbook-head"><div><div className="eyebrow kicker-line">Selected work · 01—09</div><h2 className="display">The lookbook</h2></div><p>Silhouettes, textures and details from the atelier. Find a starting point; then make it your own.</p></div>
        <div className="lookbook-grid">{looks.map(([name, category, garment, image], index) => (
          <article className="look-card" key={name} data-testid={`card-look-${index + 1}`}>
            <img src={`${assets}${image}`} alt={`${name}, ${category} by BELIEVE JAH Design`} loading="lazy" />
            <div className="look-overlay"><span className="look-cat">{category}</span><h3>{name}</h3><button className="look-action" type="button" onClick={() => beginInquiry(garment, name)} data-testid={`button-inquire-look-${index + 1}`}>Inquire about this look <ArrowUpRight size={13} /></button></div>
          </article>
        ))}</div>
      </section>

      <section id="custom-fit" className="fit-section section-pad">
        <div className="fit-wrap">
          <div className="fit-intro"><div className="eyebrow kicker-line">Made for you</div><h2 className="display">Find your<br /><em>starting point.</em></h2><p>Tell us what you have in mind. This is a guide to your first atelier conversation, not a checkout. Your final cloth and details are confirmed with the tailor.</p><div className="fit-note"><span><Scissors size={17} /></span>A piece that fits. A feeling that stays.</div></div>
          <div className="fit-panel" aria-live="polite">
            <div className="fit-progress" aria-label={`Step ${step + 1} of 4`}>{['Garment', 'Fit', 'Fabric', 'Next step'].map((label, index) => <div className={`fit-step-mark ${step === index ? 'active' : ''} ${step > index ? 'done' : ''}`} key={label}><b>{step > index ? <Check size={11} /> : `0${index + 1}`}</b><span>{label}</span></div>)}</div>
            <div className="fit-question">
              <div className="eyebrow">Step 0{step + 1} / 04</div>
              {step < 3 ? <><h3>{['What are we making?', 'How should it feel?', 'What draws you in?'][step]}</h3><p>{['Start with the silhouette you have in mind.', 'Choose the shape that feels most like you.', 'We will discuss cloth availability together.'][step]}</p><div className="choice-grid">{selections[step].map(([label, desc]) => <button key={label} type="button" className={`choice ${fit[step] === label ? 'selected' : ''}`} onClick={() => setFit((current) => current.map((value, index) => index === step ? label : value))} aria-pressed={fit[step] === label}><span>{label}</span><small>{desc}</small></button>)}</div></> :
                <><h3>How would you like to begin?</h3><p>Choose the next step that works for you.</p><div className="fit-final-options">{[['Submit Measurements Now', 'Share them with the atelier in WhatsApp.'], ['Book In-Person Session', 'Plan a fitting conversation in Ibadan.'], ['Download Fitting Guide PDF', 'Take our measurement notes with you.']].map(([label, desc]) => <button key={label} className="choice" type="button" onClick={() => chooseNext(label)}><span>{label}</span><small>{desc}</small>{label.startsWith('Download') ? <Download size={16} /> : <ArrowRight size={16} />}</button>)}</div></>}
            </div>
            <div className="fit-navigation"><button type="button" className="text-link" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={!step} style={{ opacity: step ? 1 : .35 }}><ArrowLeft size={13} /> Back</button>{step < 3 ? <button type="button" className="btn-dark" onClick={() => setStep((current) => Math.min(3, current + 1))} disabled={!fit[step]}>Continue <ArrowRight size={14} /></button> : <span className="eyebrow">A good fit starts with a conversation.</span>}</div>
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
        <div className="craft-image-strip"><img src={`${assets}agbada-embroidery.jpg`} alt="Close detail of thread embroidery on a garment panel" loading="lazy" /><div className="craft-image-caption"><span>In the details</span><h3>Every stitch has a reason.</h3></div></div>
      </section>

      <section className="journey section-pad">
        <div><div className="eyebrow kicker-line">The making of it</div><h2 className="display">From first<br />conversation to<br /><em>final fitting.</em></h2><p>We make room for the details that matter to you. Begin with a reference, a garment in mind or simply the occasion. Together, we will shape the fit, the cloth and the finishing.</p><p>For wedding fittings, special occasions and everyday pieces, the process stays personal from the first measure to the final press.</p><a href="#consultation" className="text-link">Begin a conversation <ArrowRight size={14} /></a></div>
        <div className="journey-photo"><img src={`${assets}Believe_Jah_2_1791518540546.jpeg`} alt="Senator outfits displayed at the BELIEVE JAH Design atelier" loading="lazy" /><span className="journey-seal">Made in<br />Ibadan<br />with care</span></div>
      </section>

      <section className="moments section-pad" aria-labelledby="moments-title">
        <div className="moments-copy">
          <div className="eyebrow kicker-line">For the moments that stay</div>
          <h2 id="moments-title" className="display">The garment<br />is only the beginning.</h2>
          <p>Wedding fittings, family celebrations, a new season in your life, or the simple pleasure of getting dressed with intention. We make each piece around the wearer and the moment they have in mind.</p>
          <div className="moment-tags"><span>Wedding native</span><span>Personal milestones</span><span>Everyday expression</span></div>
          <a href="#consultation" className="text-link">Tell us about your occasion <ArrowRight size={14} /></a>
        </div>
        <div className="moments-image">
          <img src={`${assets}Believe_Jah_11_1791518540556.jpeg`} alt="BELIEVE JAH client wearing an embroidered white traditional outfit" loading="lazy" />
          <span className="moment-caption eyebrow">Made for the day, remembered for years.</span>
        </div>
      </section>

      <section id="visit" className="contact-zone section-pad">
        <div className="visit-grid">
          <div className="visit-copy"><div className="eyebrow kicker-line">Come by the atelier</div><h2 className="display">Good work<br />begins <em>in person.</em></h2><p>Visit us in Ibadan to talk through your idea, see the work up close and plan a fitting with the atelier.</p><div className="visit-address"><MapPin size={19} /><address>{address}</address></div><a className="btn-primary" href={getDirections} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a></div>
          <div className="visit-map"><iframe title="Map showing Tim Caro Street, opposite Welfare Hospital, Old Ife Road, Ibadan" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${encodeURIComponent('Tim Caro Street, opposite Welfare Hospital, Old Ife Road, Ibadan, Nigeria')}&t=&z=14&ie=UTF8&iwloc=&output=embed`} /><div className="map-label"><strong>BELIEVE JAH Design</strong><span>Tim Caro Street · Ibadan</span></div></div>
        </div>
      </section>

      <section id="consultation" className="consult section-pad">
        <div className="consult-head"><div className="eyebrow kicker-line">Your idea, our attention</div><h2 className="display">Let us make<br /><em>something yours.</em></h2><p>Tell us a little about what you are looking for. Your details will be composed into a WhatsApp message to the atelier so we can take the conversation from there.</p>
          <div className="consult-aside"><a href={`tel:${phoneDisplay}`}><Phone size={15} />{phoneDisplay}</a><a href="https://www.tiktok.com/@believejah08" target="_blank" rel="noreferrer"><ArrowUpRight size={15} />TikTok · @believejah08</a><a href={getDirections} target="_blank" rel="noreferrer"><MapPin size={15} />Ibadan atelier directions</a></div>
        </div>
        <form className="consult-form" onSubmit={submitForm}>
          <div className="form-intro">Consultation details · Shared directly with the atelier via WhatsApp</div>
          <div className="form-grid">
            <div className="form-field"><label htmlFor="full-name">Full name *</label><input id="full-name" required autoComplete="name" placeholder="Your name" value={fullName} onChange={(event) => setFullName(event.target.value)} data-testid="input-full-name" /></div>
            <div className="form-field"><label htmlFor="whatsapp-phone">WhatsApp phone number *</label><input id="whatsapp-phone" required type="tel" autoComplete="tel" placeholder="+234 ..." value={phone} onChange={(event) => setPhone(event.target.value)} data-testid="input-phone" /></div>
            <div className="form-field"><label htmlFor="email-address">Email address</label><input id="email-address" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} data-testid="input-email" /></div>
            <div className="form-field"><label htmlFor="inquiry-type">Inquiry type *</label><select id="inquiry-type" value={inquiry} onChange={(event) => setInquiry(event.target.value)} data-testid="select-inquiry-type"><option>Bespoke Native Wear</option><option>Custom Tee Order</option><option>Wedding Fitting</option><option>General Inquiry</option></select></div>
            <div className="form-field"><label htmlFor="event-date">Target wear / event date</label><input id="event-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} data-testid="input-event-date" /></div>
            <div className="form-field"><label htmlFor="budget">Budget</label><select id="budget" value={budget} onChange={(event) => setBudget(event.target.value)} data-testid="select-budget"><option value="">Choose a range</option><option>Under ₦100,000</option><option>₦100,000 – ₦250,000</option><option>₦250,000 – ₦500,000</option><option>₦500,000 and above</option><option>To be discussed</option></select></div>
            <div className="form-field full"><label htmlFor="inspiration-file">Inspiration image or measurement document</label><input id="inspiration-file" type="file" accept="image/*,.pdf,.doc,.docx" onChange={(event) => setFileName(event.target.files?.[0]?.name || '')} data-testid="input-attachment" /></div>
            <div className="form-field full"><label htmlFor="message">Tell us what you have in mind *</label><textarea id="message" required placeholder="A garment, an occasion, a reference, or simply the feeling you are after…" value={message} onChange={(event) => setMessage(event.target.value)} data-testid="input-message" /></div>
          </div>
          <p className="form-note"><ShieldCheck size={14} />Submitting opens a prepared WhatsApp message to {phoneDisplay}. Your selected file name is included, but the file itself is not attached to WhatsApp; add it in the chat before sending.</p>
          <div className="form-submit-row"><button className="btn-primary" type="submit" data-testid="button-submit-inquiry">Continue in WhatsApp <ArrowUpRight size={15} /></button><span className="eyebrow">No checkout. Just a conversation.</span></div>
          {status && <div className="form-message" role="status">{status}</div>}{error && <div className="form-error" role="alert">{error}</div>}
        </form>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand"><img src={`${assets}logo-dark.svg`} alt="BELIEVE JAH Design logo" loading="lazy" /><p>Traditional Nigerian elegance, translated for modern expression. Made with care in Ibadan.</p></div>
          <div className="footer-column"><h3>Explore</h3><a href="#lookbook">Lookbook</a><a href="#custom-fit">Custom fit</a><a href="#atelier">Atelier story</a><button type="button" onClick={guideDownload} style={{ border: 0, padding: 0, background: 'none', color: 'inherit', cursor: 'pointer', font: '400 16px var(--serif)', margin: '12px 0', textAlign: 'left' }}>Download measurement PDF</button></div>
          <div className="footer-column"><h3>Find us</h3><a href={`tel:${phoneDisplay}`}>{phoneDisplay}</a><a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noreferrer">WhatsApp atelier</a><a href="https://www.tiktok.com/@believejah08" target="_blank" rel="noreferrer">@believejah08 · TikTok</a><a href={getDirections} target="_blank" rel="noreferrer">Ibadan, Nigeria ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© BELIEVE JAH Design · Ibadan, Nigeria</span><span>Made to carry your name.</span></div>
      </footer>
      <a className="whatsapp-float" href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noreferrer" aria-label="Chat with BELIEVE JAH Design on WhatsApp" data-testid="link-floating-whatsapp"><MessageCircle /></a>
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
