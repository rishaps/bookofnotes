import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import SubjectPage from './components/SubjectPage';
import PDFAsTextPage from './components/PDFAsTextPage';
import './index.css';

// Fisica page - extracts PDF text and renders as native HTML with app styling
const FisicaPage: React.FC = () => (
  <PDFAsTextPage
    pdfUrl="/fisica-appunti.pdf"
    title="Fisica"
    year="Year 1"
    themeClass="theme-physics"
    chapters={[
      { title: 'Capitolo 1: Vettori', startPage: 1, endPage: 6 },
      { title: 'Capitolo 2: Cinematica', startPage: 7, endPage: 30 },
      { title: 'Capitolo 3: Dinamica', startPage: 31, endPage: 55 },
      { title: 'Capitolo 4: Lavoro ed Energia', startPage: 56, endPage: 77 },
      { title: 'Capitolo 5: Quantità di Moto', startPage: 78, endPage: 94 },
      { title: 'Capitolo 6: Momento Angolare', startPage: 95, endPage: 114 },
      { title: 'Capitolo 7: Meccanica dei Fluidi', startPage: 115, endPage: 139 },
      { title: 'Capitolo 8: Onde', startPage: 140, endPage: 169 },
      { title: 'Capitolo 9: Termodinamica', startPage: 170, endPage: 199 },
      { title: 'Capitolo 10: Elettrostatica', startPage: 200, endPage: 243 },
    ]}
  />
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const GlobalFilters = () => (
  <svg style={{ display: 'none' }}>
    <defs>
      {/* subtle vignette */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
      </radialGradient>

      {/* paper grain overlay */}
      <filter id="paperGrain" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="2" result="n" />
        {/* turn noise into alpha */}
        <feColorMatrix in="n" type="matrix" values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0.18 0.18 0.18 0 0" result="a" />
        <feFlood floodColor="#000" result="c" />
        <feComposite in="c" in2="a" operator="in" result="grain" />
        <feGaussianBlur in="grain" stdDeviation="0.18" />
      </filter>

      {/* main ink sketch filter (edge -> threshold -> black ink) */}
      <filter id="inkSketch" x="-18%" y="-18%" width="136%" height="136%" colorInterpolationFilters="sRGB">
        {/* 1) tiny hand-drawn wobble */}
        <feTurbulence id="warpNoise" type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="warp" />
        <feDisplacementMap id="warpMap" in="SourceGraphic" in2="warp" scale="3"
          xChannelSelector="R" yChannelSelector="G" result="warped" />

        {/* 2) grayscale */}
        <feColorMatrix in="warped" type="matrix" values="
            0.2126 0.7152 0.0722 0 0
            0.2126 0.7152 0.0722 0 0
            0.2126 0.7152 0.0722 0 0
            0      0      0      1 0" result="gray" />

        {/* 3) soften */}
        <feGaussianBlur in="gray" stdDeviation="0.6" result="blur" />

        {/* 4) Sobel-ish edge magnitude */}
        <feConvolveMatrix in="blur" order="3" kernelMatrix="-1 0 1 -2 0 2 -1 0 1" result="gx" />
        <feConvolveMatrix in="blur" order="3" kernelMatrix="-1 -2 -1 0 0 0 1 2 1" result="gy" />
        <feComposite in="gx" in2="gy" operator="arithmetic" k2="1" k3="1" result="g" />

        {/* 5) use edges as ALPHA mask */}
        <feColorMatrix in="g" type="matrix" values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0.333 0.333 0.333 0 0" result="mask0" />

        {/* 6) threshold/contrast (tune these to match your reference tighter) */}
        <feComponentTransfer in="mask0" result="mask">
          <feFuncA id="inkAlpha"
            type="gamma"
            amplitude="1.90"
            exponent="0.55"
            offset="-0.12" />
        </feComponentTransfer>

        {/* 7) paint pure black ink with that mask */}
        <feFlood floodColor="#141414" result="ink" />
        <feComposite in="ink" in2="mask" operator="in" result="inked" />

        {/* 8) slight thickening + tiny blur to feel like pen */}
        <feMorphology in="inked" operator="dilate" radius="0.35" result="thick" />
        <feGaussianBlur in="thick" stdDeviation="0.12" result="softInk" />

        <feMerge>
          <feMergeNode in="softInk" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GlobalFilters />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/subjects" element={<HomePage />} />
        <Route path="/economia" element={<SubjectPage />} />
        <Route path="/fisica" element={<FisicaPage />} />
        <Route path="/:slug" element={<SubjectPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
