import React, { useEffect, useState } from 'react';
import Icon from './Icons.jsx';
import { homePage, healthCheck } from './leadCreation.js';


const LEAD_PAGE = "/createClient.html";

function Brand() {
  return (
    <a className="brand brand-light" href="/" aria-label="Automex home">
      <span className="brand-symbol" aria-hidden="true" />
      <span>automex<span className="brand-period">.</span></span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="site-header-inner container">
        <Brand />
        <nav id="mobile-nav" className={`primary-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#automation" onClick={closeMenu}>What we automate</a>
          <a href="#faq" onClick={closeMenu}>FAQs</a>
          <a href={LEAD_PAGE} className="mobile-nav-cta" onClick={closeMenu}>Build my revenue loop <Icon name="arrow-up-right" size={16} /></a>
        </nav>
        <a href={LEAD_PAGE} className="header-cta">Get started
          <span className="header-cta-icon"><Icon name="arrow-up-right" size={17} /></span>
        </a>
        <button className="menu-button" type="button" aria-controls="mobile-nav"
          aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(value => !value)}
        ><Icon name={menuOpen ? "close" : "menu"} size={25} /></button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div><Brand /><p>Less chasing. Better conversations.<br />A pipeline that keeps moving.</p></div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#how-it-works">The process</a>
            <a href="#automation">Our approach</a>
            <a href="#faq">FAQs</a>
            <a href={LEAD_PAGE}>Create a lead <Icon name="arrow-up-right" size={15} /></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Automex. Built for the follow-through.</span>
          <span>HUMAN INTENT <span className="footer-cross">×</span> INTELLIGENT SYSTEMS</span>
        </div>
      </div>
    </footer>
  );
}

const journey = [
  {
    label: 'Capture', eyebrow: '01 / INQUIRY RECEIVED', title: 'Interest gets a real starting point.',
    body: 'A prospect reaches out. Their details become a lead with an owner, a source, and a next action—not another unread notification.',
    bubble: 'Hi! I wanted to learn more about automating follow-ups for our team.',
    sender: 'Incoming inquiry', status: 'Lead captured', icon: 'message',
  },
  {
    label: 'Qualify', eyebrow: '02 / CONTEXT UNDERSTOOD', title: 'The right questions. Right away.',
    body: 'The system uses context like service, budget, and urgency to route conversations and make each follow-up feel relevant.',
    bubble: 'Got it. Are you looking to automate your existing CRM flow, or build the process from scratch?',
    sender: 'Suggested reply', status: 'Context collected', icon: 'target',
  },
  {
    label: 'Follow up', eyebrow: '03 / MOMENTUM MAINTAINED', title: 'No more “just checking in” emails.',
    body: 'Thoughtful, timed follow-ups keep the conversation moving without burying people in repetitive messages.',
    bubble: 'Hey Aanya, sharing a simple outline of the workflow we discussed. Want me to walk you through it?',
    sender: 'Personalized follow-up', status: 'Next action queued', icon: 'loop',
  },
  {
    label: 'Book', eyebrow: '04 / HANDOFF MADE', title: 'Warm conversations become next steps.',
    body: 'When a lead is ready, the flow makes it easy to arrange a real conversation and hand over useful context to your team.',
    bubble: 'Thursday works great. Looking forward to speaking with the team!',
    sender: 'Prospect response', status: 'Meeting requested', icon: 'calendar',
  },
];

function ButtonLink({ to, children, secondary = false, dark = false }) {
  return (
    <a href={to} className={`button-link ${secondary ? 'button-secondary' : 'button-primary'} ${dark ? 'button-dark' : ''}`}>
      <span>{children}</span><span className="button-link-icon"><Icon name="arrow-up-right" size={19} /></span>
    </a>
  );
}

function RevenueFlow({ serviceStatus }) {
  const flow = [
    { num: '01', icon: 'message', title: 'New inquiry', detail: 'Aanya Sharma · Website form', time: 'Just now', state: 'done' },
    { num: '02', icon: 'target', title: 'Lead qualified', detail: 'Service, intent & urgency captured', time: 'Automated', state: 'done' },
    { num: '03', icon: 'sparkles', title: 'Personal follow-up', detail: 'Relevant next message prepared', time: 'On schedule', state: 'active' },
    { num: '04', icon: 'calendar', title: 'Meeting request', detail: 'Ready for a human conversation', time: 'Next step', state: '' },
  ];

  return (
    <div className="hero-visual" aria-label="Illustration of an example lead follow-up workflow">
      <div className="hero-visual-halo" />
      <div className="visual-stamp"><Icon name="sparkles" size={15} /> INTENT IN. MOMENTUM OUT.</div>
      <div className="flow-screen">
        <div className="flow-screen-header">
          <div className="screen-dots"><i /><i /><i /></div>
          <span>REVENUE ENGINE / DEMO</span>
          <div className="screen-live"><span /> {serviceStatus === "online" ? "API ONLINE" : serviceStatus === "checking" ? "CHECKING" : "DEMO VIEW"}</div>
        </div>
        <div className="flow-screen-content">
          <div className="flow-panel-heading">
            <div>
              <p className="mono-label">AUTOMATION OVERVIEW</p>
              <h3>Every lead has<br /><em>a next step.</em></h3>
            </div>
            <div className="flow-corner-mark"><Icon name="loop" size={25} /></div>
          </div>
          <div className="flow-row-list">
            {flow.map((item) => (
              <div className={`flow-row ${item.state}`} key={item.num}>
                <div className="flow-row-line" />
                <div className="flow-row-node"><Icon name={item.icon} size={17} /></div>
                <div className="flow-row-copy">
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
                <span className="flow-row-time">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="flow-bottom-note">
            <div className="flow-bottom-avatar">A</div>
            <div><strong>Conversations, not spreadsheets.</strong><span>Stay in the loop from first touch to handoff.</span></div>
            <Icon name="arrow-up-right" size={19} />
          </div>
        </div>
      </div>
      <div className="floating-message">
        <span className="floating-message-icon"><Icon name="check" size={17} /></span>
        <div><strong>Follow-up ready</strong><small>Personal, timely, on brand</small></div>
      </div>
      <div className="floating-orbit" aria-hidden="true">↗</div>
    </div>
  );
}

function JourneyDemo() {
  const [index, setIndex] = useState(2);
  const active = journey[index];
  return (
    <div className="journey-experience">
      <div className="journey-tabs" role="tablist" aria-label="How the loop works">
        {journey.map((stage, i) => (
          <button key={stage.label} type="button" role="tab" id={`stage-tab-${i}`}
            aria-selected={index === i} aria-controls="stage-panel" className={`journey-tab ${index === i ? 'selected' : ''}`}
            onClick={() => setIndex(i)}>
            <span className="journey-tab-num">0{i + 1}</span>
            <span>{stage.label}</span>
            <Icon name={index === i ? 'arrow-up-right' : 'arrow'} size={17} />
          </button>
        ))}
      </div>
      <div className="journey-detail" role="tabpanel" id="stage-panel" aria-labelledby={`stage-tab-${index}`}>
        <div className="journey-detail-copy" key={index}>
          <p className="mono-label">{active.eyebrow}</p>
          <h3>{active.title}</h3>
          <p>{active.body}</p>
          <a href="/createClient.html" className="text-cta">Build a loop like this <Icon name="arrow-up-right" size={17} /></a>
        </div>
        <div className="journey-sample" key={`sample-${index}`}>
          <div className="sample-top"><span><i /> WORKFLOW PREVIEW</span><Icon name="layers" size={17} /></div>
          <div className="sample-chat">
            <div className="sample-chat-avatar"><Icon name={active.icon} size={22} /></div>
            <div className="sample-chat-content"><span>{active.sender}</span><p>{active.bubble}</p></div>
          </div>
          <div className="sample-status"><Icon name="check-circle" size={17} /> {active.status}<span>EXAMPLE</span></div>
        </div>
      </div>
    </div>
  );
}

const capabilities = [
  { id: '01', icon: 'target', title: 'Lead qualification', desc: 'Understand intent, budget, timing, and fit before your team steps in.', className: 'cap-feature' },
  { id: '02', icon: 'message', title: 'Relevant follow-ups', desc: 'Keep promising conversations warm with context-aware follow-through.', className: 'cap-blue' },
  { id: '03', icon: 'calendar', title: 'Booking & handoff', desc: 'Turn interest into clear next steps and hand over conversations with context.', className: 'cap-yellow' },
  { id: '04', icon: 'layers', title: 'Pipeline visibility', desc: 'Know what happened, what is next, and which leads need a human touch.', className: 'cap-white' },
];

const faqs = [
  { q: 'Is this just another chatbot?', a: 'No. A chatbot is usually one touchpoint. Automex is designed around the entire follow-through process: capture, qualification, thoughtful follow-up, and handoff to your team.' },
  { q: 'Will it replace my sales team?', a: 'The goal is to remove repetitive chasing, not replace human relationships. Your team can focus on high-value conversations while routine steps run through the system.' },
  { q: 'Can this work with our existing tools?', a: 'We design the workflow around the tools and processes you already use, where integrations are supported. We map the exact setup during discovery rather than promising a one-size-fits-all integration.' },
  { q: 'Where do we begin?', a: 'Start with the lead form. Tell us your company, budget, service needs, and urgency so we can understand the kind of revenue workflow you are looking to build.' },
];

export default function App() {
  const [serviceStatus, setServiceStatus] = useState("checking");

  useEffect(() => {
    const controller = new AbortController();
    // Load the backend home endpoint without blocking the marketing page.
    homePage({ signal: controller.signal }).catch((error) => {
      if (error.name !== "AbortError") console.warn("Homepage API unavailable:", error);
    });
    healthCheck({ signal: controller.signal })
      .then(() => setServiceStatus("online"))
      .catch((error) => { if (error.name !== "AbortError") setServiceStatus("offline"); });
    return () => controller.abort();
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-eyebrow"><span className="eyebrow-led" /><span>THE FOLLOW-THROUGH COMPANY</span><span className="eyebrow-line" /></div>
            <h1>More leads.<br />Less chasing.<br /><span>More closing<span className="big-dot">.</span></span></h1>
            <p className="hero-description">You worked hard to earn their interest. Don't lose it in the follow-up. We build AI-powered revenue systems that turn incoming leads into real conversations—and real customers.</p>
            <div className="hero-actions">
              <ButtonLink to="/createClient.html">Build my revenue loop</ButtonLink>
              <a href="#how-it-works" className="ghost-link">See how it works <Icon name="arrow" size={17} /></a>
            </div>
            <div className="hero-bottom-caption"><div className="hero-mini-mark">✳</div><span>SMART FOLLOW-UP.<br />REAL HUMAN MOMENTUM.</span></div>
          </div>
          <RevenueFlow serviceStatus={serviceStatus} />
        </div>
        <div className="hero-bottom-rule container"><span>MADE FOR BUSINESSES THAT ARE READY TO GROW</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
      </section>

      <div className="ticker-band" aria-label="Our process: capture, understand, follow up, book">
        <div className="ticker-inner" aria-hidden="true">
          {Array.from({ length: 3 }, (_, i) => <span className="ticker-unit" key={i}>CAPTURE <b>✳</b> UNDERSTAND <b>✳</b> FOLLOW UP <b>✳</b> BOOK <b>✳</b></span>)}
        </div>
      </div>

      <section className="problem-section section-pad">
        <div className="container problem-grid">
          <div className="problem-intro">
            <div className="section-label"><span className="section-label-num">01 /</span> THE REVENUE LEAK</div>
            <h2>The lead isn't<br />the problem.<br /><em>The silence is.</em></h2>
            <p>Most businesses don't need another inbox full of leads. They need a better system for what happens after someone raises their hand.</p>
            <ButtonLink to="/createClient.html" secondary dark>Let's fix the follow-up</ButtonLink>
          </div>
          <div className="problem-visual">
            <div className="problem-flow-heading"><span>THE OLD WAY</span><Icon name="arrow-up-right" size={18} /></div>
            <div className="problem-step"><span>01</span><strong>A lead comes in.</strong><p>They're interested. Timing matters.</p><span className="problem-icon"><Icon name="check" size={18} /></span></div>
            <div className="problem-step"><span>02</span><strong>The reply takes too long.</strong><p>Someone is busy. The inbox gets crowded.</p><span className="problem-icon problem-icon-warn">!</span></div>
            <div className="problem-step problem-step-lost"><span>03</span><strong>The moment is gone.</strong><p>A great opportunity turns into a cold thread.</p><span className="problem-icon">×</span></div>
            <div className="problem-switch"><span className="switch-symbol"><Icon name="loop" size={19} /></span><span>We build the system that closes this gap.</span><Icon name="arrow-up-right" size={18} /></div>
          </div>
        </div>
      </section>

      <section className="journey-section section-pad" id="how-it-works">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-label"><span className="section-label-num">02 /</span> HOW THE LOOP WORKS</div>
              <h2>From “I'm interested”<br />to <em>“let's talk.”</em></h2>
            </div>
            <p>Four connected moves. One consistent experience. Explore what happens at every step.</p>
          </div>
          <JourneyDemo />
        </div>
      </section>

      <section className="automation-section section-pad" id="automation">
        <div className="container">
          <div className="automation-header">
            <div>
              <div className="section-label section-label-light"><span className="section-label-num">03 /</span> WHAT WE AUTOMATE</div>
              <h2>Less admin.<br /><em>More momentum.</em></h2>
            </div>
            <p>Designed for the messy middle between a new inquiry and a serious sales conversation.</p>
          </div>
          <div className="capabilities-grid">
            {capabilities.map((card) => (
              <article className={`capability-card ${card.className}`} key={card.id}>
                <div className="capability-top"><span>{card.id} / 04</span><span className="cap-icon"><Icon name={card.icon} size={24} /></span></div>
                <div><h3>{card.title}</h3><p>{card.desc}</p></div>
                <div className="capability-bottom"><span>BUILT INTO THE LOOP</span><Icon name="arrow-up-right" size={20} /></div>
              </article>
            ))}
          </div>
          <div className="automation-footnote"><Icon name="sparkles" size={18} /><span>Automation should sound like your business, not like a robot.</span></div>
        </div>
      </section>

      <section className="audience-section section-pad">
        <div className="container audience-layout">
          <div>
            <div className="section-label"><span className="section-label-num">04 /</span> WHO IT'S FOR</div>
            <h2>Built around<br /><em>your business.</em></h2>
          </div>
          <div className="audience-right">
            <p>Whether you sell a service, a consultation, or a complex solution, the challenge is the same: a promising lead needs the right next touch.</p>
            <div className="audience-chips">
              {['Agencies', 'Consultancies', 'Education', 'Real estate', 'SaaS', 'Service businesses'].map((label) => <span key={label}>{label} <Icon name="arrow-up-right" size={15} /></span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content">
          <div className="section-label section-label-light"><span className="section-label-num">05 /</span> YOUR MOVE</div>
          <h2>Good leads<br />deserve <em>better endings.</em></h2>
          <div className="cta-bottom"><p>Let's build the follow-through your business has been missing.</p><ButtonLink to="/createClient.html">Let's make it happen</ButtonLink></div>
          <span className="cta-asterisk" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="container faq-layout">
          <div><div className="section-label"><span className="section-label-num">06 /</span> GOOD QUESTIONS</div><h2>Before we<br /><em>get started.</em></h2></div>
          <div className="faq-list">
            {faqs.map(({ q, a }, i) => <details key={q} className="faq-item"><summary><span><small>0{i + 1}</small>{q}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
