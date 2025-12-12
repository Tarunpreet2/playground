import React, { useState } from "react";
import BackButton from "../components/BackButton";
import "../styles/imageelements.css";
import headerArt from "../assets/images/image-elements/header-art.svg";
import sunsetRange from "../assets/images/image-elements/sunset-range.svg";
import indigoPattern from "../assets/images/image-elements/indigo-pattern.svg";
import radiantEmblem from "../assets/images/image-elements/radiant-emblem.svg";
import auroraHorizon from "../assets/images/image-elements/aurora-horizon.svg";
import oceanLayers from "../assets/images/image-elements/ocean-layers.svg";
import forestTrails from "../assets/images/image-elements/forest-trails.svg";

const encodeSvg = (svg) => `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;

const headerBackground = headerArt;
const divBackground = sunsetRange;
const spanBackground = indigoPattern;
const imageSrc = radiantEmblem;

const dropdownIcon = encodeSvg(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path fill="#333333" d="M4 6l4 4 4-4z"/>
  </svg>
`);

const imageOptions = {
  sunset: {
    label: "Sunset Peaks",
    src: sunsetRange,
  },
  aurora: {
    label: "Aurora Lights",
    src: auroraHorizon,
  },
  ocean: {
    label: "Ocean Waves",
    src: oceanLayers,
  },
  forest: {
    label: "Forest Peaks",
    src: forestTrails,
  },
};

function ImageElements() {
  const [selection, setSelection] = useState("sunset");

  return (
    <div className="container image-elements-container">
      <BackButton />
      <br />
      <br />
      <h1 title="pageTitle">Image Elements</h1>
      <p>Images embedded into multiple HTML elements for automation practice.</p>

      <section className="image-section">
        <h2>Dropdown-Controlled Image</h2>
        <select
          className="image-select"
          value={selection}
          onChange={(event) => setSelection(event.target.value)}
          style={{
            backgroundImage: `url(${dropdownIcon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 16px center",
            backgroundSize: "12px 12px",
          }}
          aria-label="Choose a scene to preview"
        >
          {Object.entries(imageOptions).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="dropdown-preview">
          <div
            className="image-box"
            style={{ backgroundImage: `url(${imageOptions[selection].src})` }}
            role="img"
            aria-label={imageOptions[selection].label}
          />
        </div>
      </section>

      <section className="image-section">
        <h2>Header Background Image</h2>
        <header
          className="image-header"
          style={{ backgroundImage: `url(${headerBackground})` }}
          role="img"
          aria-label="Abstract blue gradient with soft circles"
        />
      </section>

      <section className="image-section">
        <h2>Div with Background Image</h2>
        <div
          className="image-box"
          style={{ backgroundImage: `url(${divBackground})` }}
          role="img"
          aria-label="Sunset mountain illustration"
        />
      </section>

      <section className="image-section">
        <h2>Span with Background Image</h2>
        <span
          className="image-span"
          style={{ backgroundImage: `url(${spanBackground})` }}
          role="img"
          aria-label="Geometric lavender tiles"
        />
      </section>

      <section className="image-section">
        <h2>Standard Image Tag</h2>
        <figure className="image-figure">
          <img className="image-thumb" src={imageSrc} alt="Radiant geometric emblem" />
          <figcaption>SVG served through the standard &lt;img&gt; element.</figcaption>
        </figure>
      </section>

      <section className="image-section">
        <h2>Inline SVG Illustration</h2>
        <svg
          className="inline-svg"
          viewBox="0 0 160 160"
          role="img"
          aria-labelledby="inlineSvgTitle inlineSvgDesc"
        >
          <title id="inlineSvgTitle">Aurora skyline illustration</title>
          <desc id="inlineSvgDesc">Gradient sky, glowing disc, and silhouetted hills.</desc>
          <defs>
            <linearGradient id="svgGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8e24aa" />
              <stop offset="100%" stopColor="#42a5f5" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" rx="12" fill="url(#svgGradient)" />
          <path
            d="M0 110 Q40 80 80 108 T160 110 V160 H0 Z"
            fill="#1b5e20"
            fillOpacity="0.85"
          />
          <circle cx="120" cy="42" r="22" fill="#fff176" />
        </svg>
      </section>

    
    </div>
  );
}

export default ImageElements;
