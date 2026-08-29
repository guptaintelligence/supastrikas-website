/**
 * Design reminder — Reference-led Supastrikas Clothing storefront:
 * Street-football fanzine design uses black/red/yellow/off-white strips, condensed uppercase type,
 * hard offset shadows, diagonal hatch bands, and editorial asymmetric layouts.
 */
import { useState } from "react";
import InterestGate from "@/components/InterestGate";
import {
  ArrowDownRight,
  ArrowRight,
  Box,
  Check,
  ChevronRight,
  Heart,
  Instagram,
  Menu,
  Truck,
  X,
} from "lucide-react";

const ASSETS = {
  logo: "/images/supastrikas-red-logo_adfc1adf.jpg",
  headerLogo: "/images/supastrikas-red-logo_adfc1adf.jpg",
  jerseyFront: "/images/reference-jersey-front_8e0057b9.jpeg",
  jerseyBack: "/images/reference-jersey-back_ec9f71d6.jpeg",
  suppliedFront: "/images/supastrikas-gallery-front_958a49ac.jpg",
  suppliedBack: "/images/reference-jersey-back_ec9f71d6.jpeg",
  heroVisual: "/images/reference-jersey-front_8e0057b9.jpeg",
  tributePitch: "/images/tribute-pitch_b18dcde6.jpeg",
  limitedTag: "/images/limited-drop-tag_1d0599b0.jpeg",
};

const featureItems = [
  "100% polyester performance mesh",
  "High-density sublimation print",
  "True-to-size streetwear fit",
  "Officially licensed design",
  "Reinforced stitching, ready for the pitch",
  "Ships worldwide from Dubai",
];

const steps = [
  { number: "01", title: "Preorder now", description: "Reserve your size — no payment yet.", icon: Check },
  { number: "02", title: "Ships in 2-3 weeks", description: "We produce the drop and prep your order.", icon: Box },
  { number: "03", title: "Delivered to your door", description: "Track it. Rock it. Tag us.", icon: Truck },
];

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);

  return (
    <main id="top" className="site-shell">
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="Supa Strikas Clothing home">
          <img src={ASSETS.headerLogo} alt="Supa Strikas Clothing" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#jersey">THE JERSEY</a>
          <a href="#story">THE STORY</a>
          <button className="nav-preorder" onClick={() => setInterestOpen(true)}>PREORDER <ArrowRight size={15} /></button>
        </nav>
        <button className="mobile-menu-button" onClick={() => setShowMenu((open) => !open)} aria-label="Toggle menu">
          {showMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
        {showMenu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a onClick={() => setShowMenu(false)} href="#jersey">THE JERSEY</a>
            <a onClick={() => setShowMenu(false)} href="#story">THE STORY</a>
            <button onClick={() => { setShowMenu(false); setInterestOpen(true); }}>PREORDER NOW <ArrowRight size={16} /></button>
          </nav>
        )}
      </header>

      <div className="signal-rule" aria-hidden="true" />

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-grain" />
        <div className="hero-copy page-padding">
          <p className="eyebrow dark-on-red">FIRST RELEASE</p>
          <h1 id="hero-title">THE FIRST<br /><span>DROP.</span></h1>
          <p className="hero-description">Supa Strika Home Jersey — Streetwear cut, built for the pitch and the block.</p>
          <button className="cta-button cta-yellow" onClick={() => setInterestOpen(true)}>PREORDER NOW <ArrowRight size={19} /></button>
        </div>
        <div className="hero-price-callout">
          <span>$85</span>
          <em>FREE SHIPPING</em>
        </div>
        <div className="hero-product" aria-label="Red Supa Strikas home jersey">
          <img className="hero-product-photo" src={ASSETS.jerseyFront} alt="Supa Strikas home jersey front" />
          <img className="hero-product-glow" src={ASSETS.heroVisual} alt="" aria-hidden="true" />
          <p>BOOK YOUR PLACE NOW</p>
        </div>
      </section>

      <section className="announcement-strip page-padding" aria-label="Drop announcement">
        <p>BOOK YOUR SPOT NOW. ORDERS OPEN ON <span>AUGUST 21ST.</span></p>
        <p className="announcement-detail">Keep checking our Instagram and TikTok for the drop details.</p>
        <div className="social-row" aria-label="Social media links">
          <a href="https://www.instagram.com/supastrika.clothing" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon /></a>
        </div>
      </section>
      <div className="hazard-divider" aria-hidden="true" />

      <section id="jersey" className="jersey-section page-padding" aria-labelledby="jersey-title">
        <div className="section-heading-row">
          <h2 id="jersey-title">THE <span>JERSEY.</span></h2>
          <p>FRONT <i>/</i> BACK</p>
        </div>
        <div className="jersey-grid">
          <ProductPanel label="FRONT" image={ASSETS.suppliedFront} alt="Supa Strikas jersey front" />
          <ProductPanel label="BACK" image={ASSETS.suppliedBack} alt="Supa Strikas jersey back" back />
        </div>
      </section>

      <section className="details-section page-padding" aria-labelledby="details-title">
        <div className="details-header">
          <h2 id="details-title">BUILT <span>DIFFERENT.</span></h2>
          <p>Made to live through matchday, Monday, and every last-minute run home.</p>
        </div>
        <div className="features-grid">
          {featureItems.map((item, index) => (
            <article className="feature-item" key={item}>
              <span className="feature-index">0{index + 1}</span>
              <Check size={18} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section page-padding" aria-labelledby="how-title">
        <p className="eyebrow yellow-label">NO MATCHDAY MYSTERIES</p>
        <h2 id="how-title">HOW IT WORKS</h2>
        <div className="steps-grid">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <article className="step-card" key={number}>
              <p className="step-number">{number}</p>
              <Icon className="step-icon" size={23} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="hazard-divider" aria-hidden="true" />
      <section id="story" className="tribute-section page-padding" aria-labelledby="tribute-title">
        <div className="tribute-copy">
          <p className="eyebrow black-label">OUR TRIBUTE</p>
          <h2 id="tribute-title">FOR THE KIDS WHO<br />RAN HOME AFTER SCHOOL<br />TO WATCH <span>SUPA STRIKAS.</span></h2>
          <p>Supa Strikas wasn&apos;t just a cartoon. It was our first taste of football as a story — a team of misfits, one dream, and a jersey that meant something.</p>
          <p>We grew up quoting Shakes, drawing Big Bo on our schoolbooks, and lacing our boots like El Matador. This brand is our thank-you letter — stitched into every seam.</p>
          <strong>Officially licensed. Forever inspired.</strong>
        </div>
        <div className="tribute-side">
          <div className="tribute-image"><img src={ASSETS.tributePitch} alt="Empty after-school football pitch" /></div>
          <div className="value-list">
            <ValueCard icon={<Heart size={22} />} title="Heart" text="We fell for a team that played for each other, not the trophy cabinet." />
            <ValueCard icon={<ArrowDownRight size={22} />} title="Style" text="Boots off the pitch, jerseys on the street — the show made football feel like culture." />
            <ValueCard icon={<ChevronRight size={22} />} title="Hustle" text="Underdogs, every episode. That energy stitched into every piece we make." />
          </div>
        </div>
        <div className="tribute-endcap">
          <div className="tag-detail"><img src={ASSETS.limitedTag} alt="Limited drop jersey tag detail" /></div>
          <div>
            <p>Every jersey ships with a hand-numbered tag. Founding drop, one team.</p>
            <button className="cta-button cta-red" onClick={() => setInterestOpen(true)}>WEAR THE STORY <ArrowRight size={19} /></button>
          </div>
        </div>
      </section>

      <footer className="site-footer page-padding">
        <div className="footer-main">
          <img src={ASSETS.logo} alt="Supa Strikas Clothing" className="footer-mark" />
          <p>Streetwear for the pitch.</p>
        </div>
        <div className="footer-links">
          <a href="https://www.instagram.com/supastrika.clothing" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon /></a>
        </div>
        <p className="footer-small">Preorders ship 2-3 weeks after the drop closes. Prices in USD. All designs officially licensed. © 2026 Supa Strikas Clothing.</p>
      </footer>
      {interestOpen && <InterestGate onDismiss={() => setInterestOpen(false)} />}
    </main>
  );
}

function ProductPanel({ label, image, alt, back = false }: { label: string; image: string; alt: string; back?: boolean }) {
  return (
    <article className={`product-panel ${back ? "product-panel-back" : ""}`}>
      <span>{label}</span>
      <div className="product-image-frame"><img src={image} alt={alt} /></div>
    </article>
  );
}

function ValueCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="value-card"><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>;
}

function TikTokIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4c.5 2.5 2 4 5 4v3c-2 0-3.5-.5-5-1.5V16a5 5 0 1 1-5-5" /></svg>;
}
