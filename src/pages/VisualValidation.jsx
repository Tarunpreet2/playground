import React from "react";
import BackButton from "../components/BackButton";
import "../styles/visualvalidation.css";

const encodeSvg = (svg) => `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;

const colorMapImage = encodeSvg(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
    <rect width="320" height="180" fill="#102027"/>
    <rect x="12" y="16" width="120" height="70" fill="#ff7043" rx="8"/>
    <rect x="188" y="24" width="120" height="60" fill="#42a5f5" rx="12"/>
    <circle cx="70" cy="140" r="38" fill="#66bb6a"/>
    <rect x="148" y="116" width="150" height="48" fill="#7e57c2" rx="10"/>
    <text x="36" y="56" font-size="22" fill="#ffffff" font-family="Arial">Toast</text>
    <text x="214" y="58" font-size="20" fill="#0a2540" font-family="Arial">Banner</text>
    <text x="52" y="148" font-size="16" fill="#ffffff" font-family="Arial">Hotspot</text>
    <text x="188" y="146" font-size="18" fill="#ede7f6" font-family="Arial">CTA Zone</text>
  </svg>
`);

const toastList = [
  { tone: "success", title: "Success", message: "Profile saved successfully." },
  { tone: "warning", title: "Warning", message: "Password expires in 3 days." },
  { tone: "error", title: "Error", message: "Failed to load analytics feed." },
];

const bannerList = [
  { tone: "info", label: "New Feature", text: "Try our redesigned reporting dashboard." },
  { tone: "neutral", label: "Maintenance", text: "Scheduled downtime on Saturday 02:00–04:00 UTC." },
];

function VisualValidation() {
  return (
    <div className="container visual-validation-container">
      <BackButton />
      <br />
      <br />
      <h1 title="pageTitle">Visual Validation</h1>
      <p className="intro-text">
        Validate rendering differences across typography, notifications, media, and layout primitives.
      </p>

      <section className="visual-section">
        <h2>Toast Notifications</h2>
        <div className="toast-grid">
          {toastList.map(({ tone, title, message }) => (
            <div key={tone} className={`toast toast-${tone}`} role="status" aria-live="polite">
              <strong>{title}</strong>
              <span>{message}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="visual-section">
        <h2>Banner Variants</h2>
        <div className="banner-column">
          {bannerList.map(({ tone, label, text }) => (
            <article key={tone} className={`banner banner-${tone}`} aria-label={`${label} banner`}>
              <span className="banner-label">{label}</span>
              <p>{text}</p>
              <a href="#details" className="banner-link">Learn more</a>
            </article>
          ))}
        </div>
      </section>

      <section className="visual-section">
        <h2>Typography Samples</h2>
        <div className="typography-stack">
          <h1>Heading One</h1>
          <h2>Heading Two</h2>
          <h3>Heading Three</h3>
          <h4>Heading Four</h4>
          <h5>Heading Five</h5>
          <h6>Heading Six</h6>
          <p>
            Paragraph copy with a <span className="highlight-span">colored span</span>, a{" "}
            <b>bold fragment</b>, and an <a href="#anchor" className="accent-link">anchor link</a>.
          </p>
        </div>
      </section>

      <section className="visual-section">
        <h2>Article & Table</h2>
        <article className="feature-article">
          <header>
            <h3>Visual Regression Strategy</h3>
            <p className="meta">Updated 2 hours ago · Author: QA Guild</p>
          </header>
          <p>
            Use high-contrast banners, toast components, and rich text blocks to capture layout shifts.
            Tables, form controls, and mapped hotspots provide coverage for coordinate-sensitive widgets.
          </p>
        </article>

        <table className="metrics-table">
          <caption>Release Readiness Metrics</caption>
          <thead>
            <tr>
              <th scope="col">Suite</th>
              <th scope="col">Checks</th>
              <th scope="col">Status</th>
              <th scope="col">Pass %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Smoke</td>
              <td>48</td>
              <td><span className="status-chip chip-green">Stable</span></td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Accessibility</td>
              <td>32</td>
              <td><span className="status-chip chip-amber">Attention</span></td>
              <td>92%</td>
            </tr>
            <tr>
              <td>Visual</td>
              <td>76</td>
              <td><span className="status-chip chip-red">Blocked</span></td>
              <td>71%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="visual-section">
        <h2>Form Controls & Scrollable Region</h2>
        <textarea
          className="feedback-textarea"
          rows={4}
          placeholder="Describe any rendering differences here..."
          aria-label="Visual validation notes"
        />
        <div className="scroll-box" role="region" aria-label="Scrollable release notes">
          <p className="text-primary">Release Highlights</p>
          <p>
            • Updated toast system with animated entrances.<br />
            • Color palette refined for WCAG AA contrast ratios.<br />
            • Table cells now support inline status chips.<br />
            • Added sticky banner component for marketing campaigns.
          </p>
          <p className="text-secondary">
            Additional Notes: ensure screenshots capture hover, focus, and pressed states for critical CTAs.
            Validate that scroll containers retain custom scrollbars across themes.
          </p>
        </div>
      </section>

      <section className="visual-section">
        <h2>Image Map & Media</h2>
        <img
          src={colorMapImage}
          useMap="#visual-hotspots"
          alt="Colored layout mock with hotspot regions"
          className="mapped-image"
        />
        <map name="visual-hotspots">
          <area
            shape="rect"
            coords="12,16,132,86"
            href="#toast"
            alt="Toast hotspot"
            aria-label="Toast hotspot"
          />
          <area
            shape="rect"
            coords="188,24,308,84"
            href="#banner"
            alt="Banner hotspot"
            aria-label="Banner hotspot"
          />
          <area
            shape="rect"
            coords="148,116,298,164"
            href="#cta"
            alt="CTA hotspot"
            aria-label="CTA hotspot"
          />
        </map>
        <div className="image-strip">
          <img
            src={encodeSvg(`
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
                <rect width='120' height='120' rx='16' fill='#ffeb3b'/>
                <path d='M20 80 L45 35 L70 80 Z' fill='#f57f17'/>
                <circle cx='88' cy='34' r='18' fill='#ff7043'/>
              </svg>
            `)}
            alt="Yellow layout block"
          />
          <img
            src={encodeSvg(`
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
                <rect width='120' height='120' rx='16' fill='#1e88e5'/>
                <circle cx='40' cy='40' r='20' fill='#bbdefb'/>
                <circle cx='80' cy='80' r='24' fill='#0d47a1'/>
              </svg>
            `)}
            alt="Blue layout block"
          />
        </div>
      </section>
    </div>
  );
}

export default VisualValidation;
