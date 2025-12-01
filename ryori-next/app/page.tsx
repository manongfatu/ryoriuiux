'use client';

import { useEffect } from 'react';

function useClientEffects() {
  useEffect(() => {
    const header = document.querySelector('.site-header') as HTMLElement | null;
    const toggle = document.querySelector('.nav-toggle') as HTMLElement | null;
    const list = document.getElementById('nav-list');

    const cleanups: Array<() => void> = [];
    if (toggle && list) {
      const handler = () => {
        const isOpen = list.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      };
      toggle.addEventListener('click', handler);
      cleanups.push(() => toggle.removeEventListener('click', handler));
    }

    const onScroll = () => {
      if (!header) return;
      const y = window.scrollY || window.pageYOffset;
      header.classList.toggle('is-stuck', y > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(el => io.observe(el));
    cleanups.push(() => io.disconnect());

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, []);
}

export default function Page() {
  useClientEffects();
  const year = new Date().getFullYear();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header" data-elevate>
        <div className="container nav">
          <a href="#" className="brand" aria-label="Ryori home">
            <img className="brand-mark" src="/assets/logo-mark.svg" alt="Ryori logo" />
            <span className="brand-text">Ryori</span>
          </a>
          <nav className="primary-nav" aria-label="Primary">
            <button className="nav-toggle" aria-expanded="false" aria-controls="nav-list">
              <span className="sr-only">Toggle navigation</span>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <ul id="nav-list" className="nav-list">
              <li><a href="#how">How it works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#advocacy">Advocacy</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
              <li><a className="btn btn--ghost" href="#contact">Contact</a></li>
              <li><a className="btn" href="#contact">Request a Demo</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="hero section--tight" aria-labelledby="hero-title">
          <div className="container grid grid--2">
            <div className="stack hero-copy reveal">
              <h1 id="hero-title" className="display">Effortless QR Ordering Revolution</h1>
              <p className="lead">Elevate your restaurant with our intuitive QR code ordering system. <strong>Scan → Order → Enjoy</strong>.</p>
              <div className="actions">
                <a className="btn btn--lg" href="#contact">Get Started</a>
                <a className="btn btn--lg btn--ghost" href="#contact">Request a Demo</a>
              </div>
              <ul className="hero-bullets">
                <li>No downloads for diners</li>
                <li>Faster table turnover</li>
                <li>Real‑time order tracking</li>
              </ul>
            </div>
            <div className="hero-media reveal">
              <div className="device">
                <div className="device-screen">
                  <div className="qr"><div></div><div></div><div></div><div></div></div>
                  <div className="ticket">
                    <div className="ticket-line"></div>
                    <div className="ticket-line"></div>
                    <div className="ticket-line short"></div>
                  </div>
                </div>
              </div>
              <p className="caption">Built for busy restaurants. Loved by diners.</p>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how" className="section" aria-labelledby="how-title">
          <div className="container">
            <h2 id="how-title" className="eyebrow">How it works</h2>
            <div className="steps grid grid--3">
              <article className="card reveal">
                <div className="badge">1</div>
                <h3>Scan the QR code</h3>
                <p>Guests scan a table QR to open your live, up‑to‑date menu.</p>
              </article>
              <article className="card reveal">
                <div className="badge">2</div>
                <h3>Place your order</h3>
                <p>Customize items, combine orders per table, and submit with ease.</p>
              </article>
              <article className="card reveal">
                <div className="badge">3</div>
                <h3>Enjoy the meal</h3>
                <p>Your team gets instant notifications while diners track status in real‑time.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="section section--alt" aria-labelledby="features-title">
          <div className="container">
            <h2 id="features-title" className="eyebrow">Features</h2>
            <div className="grid grid--3 features">
              <article className="feature reveal"><h3>Customer Order Tracking</h3><p>Transparent order states keep diners informed and reduce follow‑ups.</p></article>
              <article className="feature reveal"><h3>Combine Orders Per Table</h3><p>Merge multiple device orders into a single table ticket.</p></article>
              <article className="feature reveal"><h3>Manage Orders Effortlessly</h3><p>Kitchen‑ready views, filters, and prompts for peak service.</p></article>
              <article className="feature reveal"><h3>Unlimited QR Generation</h3><p>Create and assign unique QR codes without limits.</p></article>
              <article className="feature reveal"><h3>Unlimited Menu Management</h3><p>Update items, options, and availability in seconds.</p></article>
              <article className="feature reveal"><h3>Menu Categories</h3><p>Organize menus with flexible, unlimited categories.</p></article>
              <article className="feature reveal"><h3>Employee Management</h3><p>Control access and roles for staff accounts.</p></article>
              <article className="feature reveal"><h3>Multiple Branches</h3><p>Operate several locations from one dashboard.</p></article>
              <article className="feature reveal"><h3>Call Waiter Notification</h3><p>Guests can tap to request assistance from the table.</p></article>
              <article className="feature reveal"><h3>Order Prompt Notification</h3><p>Instant alerts for new and updated orders.</p></article>
              <article className="feature reveal"><h3>Inventory Management</h3><p>Track stock and prevent out‑of‑stock surprises.</p></article>
              <article className="feature reveal"><h3>Customer Survey</h3><p>Capture quick feedback after every visit.</p></article>
            </div>
          </div>
        </section>

        {/* Advocacy */}
        <section id="advocacy" className="section" aria-labelledby="advocacy-title">
          <div className="container">
            <h2 id="advocacy-title" className="eyebrow">Our Advocacy</h2>
            <div className="grid grid--2 advocacy">
              <article className="advocacy-item reveal">
                <div className="num">1</div>
                <div className="content">
                  <h3>Empowering Local Restaurants</h3>
                  <p>Affordable tech built for Filipino entrepreneurs.</p>
                </div>
              </article>
              <article className="advocacy-item reveal">
                <div className="num">2</div>
                <div className="content">
                  <h3>Eat to Earn</h3>
                  <p>Where both customers and restaurants benefit.</p>
                </div>
              </article>
              <article className="advocacy-item reveal">
                <div className="num">3</div>
                <div className="content">
                  <h3>Smart, Sustainable Dining</h3>
                  <p>Paperless, cashless, and AI‑powered experience.</p>
                </div>
              </article>
              <article className="advocacy-item reveal">
                <div className="num">4</div>
                <div className="content">
                  <h3>Zero Waste Kitchen</h3>
                  <p>Helping restaurants cook smart and reduce waste.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="section section--alt" aria-labelledby="roadmap-title">
          <div className="container">
            <div className="roadmap-head">
              <h2 id="roadmap-title" className="eyebrow">Our Journey Roadmap</h2>
              <span className="tag">2030 Public Launch</span>
            </div>
            <ol className="timeline" role="list">
              {[
                {year: '2023', title: 'Foundation and MVP Build', points: ['Founded Alttos Innovations Corp and the Ryori project','Built MVP with web and QR code ordering']},
                {year: '2024', title: 'Validation and Expansion', points: ['Launched mobile app with Eat2Earn rewards','Conducted restaurant trials and won hackathon']},
                {year: '2025', title: 'Redesign and Improvement', points: ['Enhanced features, pricing, and infrastructure','Built inventory system and offline mode']},
                {year: '2026', title: 'Market Reach and Pre‑Seed Stage', points: ['Started market rollout and raised pre‑seed investment']},
                {year: '2027', title: 'Scaling Up', points: ['Target 1K establishments','Series A investment']},
                {year: '2028', title: 'Nationwide Growth', points: ['Target 10K establishments','Series B investment']},
                {year: '2029', title: 'Wider Expansion', points: ['Target 20K establishments','Series C investment']},
                {year: '2030', title: 'Public Launch', points: ['Open to the public with nationwide coverage']}
              ].map(({year, title, points}) => (
                <li className="timeline-item reveal" key={year}>
                  <div className="timeline-year">{year}</div>
                  <div className="timeline-card">
                    <h3>{title}</h3>
                    <ul>
                      {points.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA / Contact */}
        <section id="contact" className="section cta-band" aria-labelledby="cta-title">
          <div className="container grid grid--2">
            <div>
              <h2 id="cta-title">Whether you are a restaurant owner, investor, or developer—let’s talk.</h2>
              <p>Let’s build the future of dining in the Philippines together.</p>
            </div>
            <div className="stack">
              <a className="btn btn--lg" href="mailto:alttosinnovationscorp@gmail.com">Contact Us</a>
              <div className="contact-list">
                <a href="mailto:alttosinnovationscorp@gmail.com" className="contact-item" aria-label="Email"><span>alttosinnovationscorp@gmail.com</span></a>
                <a href="tel:+639852881191" className="contact-item" aria-label="Phone"><span>(+63) 985-288-1191</span></a>
                <a href="https://ryoriapp.com" className="contact-item" target="_blank" rel="noopener">ryoriapp.com</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer">
          <p className="tagline">Ryori. The Future of Dining Starts Here.</p>
          <p className="fineprint">© {year} Ryori Systems by Alttos Innovations. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}


