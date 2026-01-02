
import React, { useState, useEffect } from 'react';
import katex from 'katex';
import { MainSection, SubSection, TableData } from '../types';

// Images are in public folder, use direct paths (only Fig 1 and Fig 2)
const image1 = '/image1.jpg';
const image2 = '/image2.jpg';
import { Search, X, ZoomIn, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

const RiskRewardChart = React.lazy(() => import('./RiskRewardChart'));
const MathRenderer = React.lazy(() => import('./MathRenderer'));

interface SectionDisplayProps {
  section: MainSection;
  fontSizeLevel?: number; // 0 = small, 1 = normal, 2 = large
}

const highlightPattern = /(\*\*)/g;

// Helper to ensure path starts with / relative to public
const normalizeImagePath = (src: string) => {
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return `/${src}`;
};

const ImageThumbnail: React.FC<{ src: string; alt: string; onImageClick: (src: string, alt: string) => void }> = ({ src, alt, onImageClick }) => {
  const [imgSrc, setImgSrc] = useState(normalizeImagePath(src));
  const [hasError, setHasError] = useState(false);

  // If initial src changes, reset
  useEffect(() => {
    setImgSrc(normalizeImagePath(src));
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div className="p-4 border border-red-200 rounded text-red-500 text-xs text-center">
        Image not found: {alt}
      </div>
    );
  }

  return (
    <div
      className="relative cursor-zoom-in my-4"
      onClick={() => onImageClick(imgSrc, alt)}
    >
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          console.error(`Failed to load image: ${imgSrc}`);
          setHasError(true);
        }}
        className="w-full h-auto max-w-[250px] mx-auto object-contain rounded-lg border border-content-primary/10 shadow-sm transition-transform duration-300 hover:scale-[1.01]"
      />
    </div>
  );
};

const isTableData = (item: string | TableData): item is TableData => {
  return (item as TableData).headers !== undefined;
};

// Regex matches:
// 1. **bold** (group 1)
// 2. $inline math$ (group 2), handling escaped dollars if we wanted, but simple $...$ for now
const contentPattern = /(\*\*[^*]+\*\*)|(\$[^$]+\$)/g;

// Helper to render just the math parts of a string
const renderMathParts = (text: string, keyPrefix: string = '') => {
  const mathPattern = /(\$[^$]+\$)/g;
  const parts = text.split(mathPattern);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith('$') && part.endsWith('$')) {
          const latex = part.substring(1, part.length - 1);
          try {
            const html = katex.renderToString(latex, {
              throwOnError: false,
              displayMode: false,
            });
            return (
              <span
                key={`${keyPrefix}${index}`}
                className="inline-math"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch (e) {
            return <span key={`${keyPrefix}${index}`} className="text-red-400">{part}</span>;
          }
        }

        return <span key={`${keyPrefix}${index}`}>{part}</span>;
      })}
    </>
  );
};

const renderWithHighlights = (value: string, boldClass = "font-bold text-content-primary") => {
  if (!value) return null;

  // Normalize invisible chars once here too, just in case
  const normalizedValue = value.replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF]/g, '');

  // Simple split by double asterisks
  // Even indices are regular text, odd indices are bold
  // This is much more robust than regex for simple Markdown bold
  const parts = normalizedValue.split('**');

  return (
    <>
      {parts.map((part, index) => {
        // Odd indices = content between ** **
        if (index % 2 === 1) {
          // Recursively process math inside bold content
          return <strong key={index} className={boldClass}>{renderMathParts(part, `bold-${index}-`)}</strong>;
        }

        // Even indices = regular text (outside **)
        return <span key={index}>{renderMathParts(part, `text-${index}-`)}</span>;
      })}
    </>
  );
};

const ContentRenderer: React.FC<{ item: string | TableData; onImageClick: (src: string, alt: string) => void }> = ({ item, onImageClick }) => {
  if (isTableData(item)) {
    // Check if this is the "Sintesi" table to render a chart
    const isSintesiTable = item.headers.includes("Soggetto") && item.headers.includes("Cosa apporta");

    if (isSintesiTable) {
      // Transform data for chart
      // We'll create a dummy "Risk/Reward" visualization based on the table data
      const chartData = [
        { name: 'Proprietari', risk: 90, reward: 90, type: 'Variabile' },
        { name: 'Manager', risk: 60, reward: 80, type: 'Mista' },
        { name: 'Lavoratori', risk: 20, reward: 40, type: 'Fissa' },
        { name: 'Fornitori', risk: 30, reward: 30, type: 'Fissa' },
        { name: 'Finanziatori', risk: 40, reward: 20, type: 'Fissa' },
      ];

      return (
        <div className="my-12 space-y-8">
          <div className="overflow-x-auto p-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {item.headers.map((header, index) => (
                    <th key={index} className="p-4 text-xs font-mono font-medium text-premium-gold uppercase tracking-widest">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="transition-colors">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="p-4 text-sm text-content-secondary font-light">{renderWithHighlights(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="risk-reward-chart-container p-6">
            <React.Suspense fallback={<div className="h-[300px] w-full animate-pulse"></div>}>
              <RiskRewardChart data={chartData} />
            </React.Suspense>
          </div>
        </div>
      );
    }

    return (
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-left border border-content-primary/20">
          <thead>
            <tr className="border-b border-content-primary/20">
              {item.headers.map((header, index) => (
                <th key={index} className="p-3 text-sm font-bold text-content-primary border-r border-content-primary/20 last:border-r-0">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-content-primary/10 last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-3 text-sm text-content-primary border-r border-content-primary/10 last:border-r-0">{renderWithHighlights(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const text = (item as string).trim();
  const cleanText = text.replace(/\*\*/g, '');

  // Callout: warning / attenzione
  if (/^Attenzione\s*[:\-]/i.test(text)) {
    const content = text.replace(/^Attenzione\s*[:\-]\s*/i, '');

    return (
      <div className="my-4 px-4 py-3 border-l-2 border-content-primary/30">
        <p className="text-sm font-bold text-content-primary mb-1">Attenzione</p>
        <p className="text-sm text-content-primary">{renderWithHighlights(content)}</p>
      </div>
    );
  }

  // Callout: info / nota
  if (/^(Nota|Info)\s*[:\-]/i.test(text)) {
    const content = text.replace(/^(Nota|Info)\s*[:\-]\s*/i, '');

    return (
      <div className="my-8 px-6 py-4 gap-4">
        <p className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 mb-2 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          Nota
        </p>
        <p className="text-sm leading-relaxed text-content-secondary font-light">{renderWithHighlights(content)}</p>
      </div>
    );
  }

  // Check for math pattern
  const normalizedText = text.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]+/, '');

  // Check for markdown image syntax: ![alt](url)
  const imageMatch = normalizedText.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const [, alt, src] = imageMatch;
    return (
      <div className="w-full my-6 lg:w-5/12 lg:float-right lg:ml-8 lg:mb-6 lg:mt-1 lg:clear-right">
        <ImageThumbnail src={src} alt={alt} onImageClick={onImageClick} />
        {alt && (
          <p className="text-[10px] font-mono text-content-muted text-center mt-2 uppercase tracking-widest">
            {alt}
          </p>
        )}
      </div>
    );
  }

  // Check for italic caption (starts with *)
  if (normalizedText.startsWith('*') && normalizedText.endsWith('*') && !normalizedText.startsWith('**')) {
    const caption = normalizedText.slice(1, -1);
    return (
      <p className="text-xs font-mono text-content-muted text-center italic mt-2 mb-6">
        {caption}
      </p>
    );
  }

  if (normalizedText.startsWith('$$')) {
    const latex = normalizedText.replace(/^\$\$|\$\$$/g, '');
    return (
      <React.Suspense fallback={<div className="my-8 h-12 animate-pulse bg-premium-glass rounded-sm"></div>}>
        <MathRenderer latex={latex} />
      </React.Suspense>
    );
  }

  // Check for code blocks
  // Simple check: starts with ```
  if (normalizedText.startsWith('```')) {
    const match = normalizedText.match(/```(\w+)?\n([\s\S]*?)```/);
    // Fallback if regex fails (e.g. valid markdown but slight variation) or just standard split
    const codeContent = match ? match[2] : normalizedText.replace(/```(\w+)?/, '').replace(/```$/, '');
    const lang = match ? match[1] : '';

    return (
      <div className="my-6">
        {lang && (
          <div className="px-4 py-2 text-xs font-mono font-bold uppercase text-premium-gold">
            {lang}
          </div>
        )}
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-content-secondary">
          <code>{codeContent}</code>
        </pre>
      </div>
    );
  }

  if (text.startsWith('●') || text.startsWith('○') || text.startsWith('* ') || text.startsWith('- ')) {
    const content = text.replace(/^[●○*-]\s*/, '').trim();

    // Check for "Term: Definition" pattern
    const colonIndex = content.indexOf(':');
    if (colonIndex !== -1 && colonIndex < 60) {
      const term = content.substring(0, colonIndex + 1);
      const definition = content.substring(colonIndex + 1);

      return (
        <p className="pl-6 relative text-content-primary before:content-['•'] before:absolute before:left-0">
          <strong className="font-bold">{renderWithHighlights(term)}</strong>{renderWithHighlights(definition)}
        </p>
      );
    }

    return (
      <p className="pl-6 relative text-content-primary before:content-['•'] before:absolute before:left-0">
        {renderWithHighlights(content)}
      </p>
    );
  }

  if (cleanText.startsWith("L’impresa è un istituto economico")) {
    return (
      <div className="flex flex-col lg:flex-row items-start gap-8 group">
        <div className="flex-1">
          <p className="text-content-secondary leading-relaxed font-light text-lg group-hover:text-content-primary transition-colors duration-300">
            {renderWithHighlights(item as string)}
          </p>
        </div>
        <div className="w-full lg:w-1/3 flex-shrink-0 mt-4 lg:mt-0">
          <ImageThumbnail src={image1} alt="Schema della definizione economica di impresa" onImageClick={onImageClick} />
          <p className="text-[10px] font-mono text-content-muted text-center mt-2 uppercase tracking-widest">Fig. 1: Il sistema impresa</p>
        </div>
      </div>
    );
  }

  if (cleanText.startsWith("I soggetti economici in relazione con l’impresa")) {
    return (
      <div className="flex flex-col lg:flex-row items-start gap-8 group mt-8">
        <div className="flex-1">
          <p className="font-serif text-xl text-premium-gold mb-4">{renderWithHighlights(item as string, "font-bold")}</p>
          <p className="text-content-secondary leading-relaxed font-light">
            Questa figura illustra le relazioni tra l'impresa e i vari soggetti economici che interagiscono con essa, evidenziando i flussi di beni, servizi e denaro.
          </p>
        </div>
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <ImageThumbnail src={image2} alt="Schema dei soggetti economici in relazione con l’impresa" onImageClick={onImageClick} />
          <p className="text-[10px] font-mono text-content-muted text-center mt-2 uppercase tracking-widest">Fig. 2: Soggetti economici</p>
        </div>
      </div>
    );
  }


  // Bold titles that are not part of the main structure
  const boldableKeywords = [
    'Obiettivi dell’impresa', 'Tipologie di impresa', 'Definizioni giuridiche', 'Forme giuridiche',
    'Proprietà e controllo', 'Startup e spin‐off', 'I soggetti economici', 'Stakeholder e relazioni',
    'Prestatori di lavoro', 'Fornitori', 'Finanziatori', 'Comunità di riferimento', 'Stato e Pubblica Amministrazione',
    'Sintesi:', 'Classificazione delle imprese', 'Impresa individuale e impresa familiare', 'Imprese collettive e società',
    'Società di persone', 'Società di capitali', 'Società cooperative', 'Riepilogo a confronto', 'Come scegliere la forma giuridica',
    'Proprietari, manager e problema del controllo', 'Strumenti per allineare proprietà e management',
    'Ambiti regolati dalla corporate governance', 'Organi nel sistema tradizionale', 'Sistemi di governance',
    'Parole chiave per descrivere l’impresa', 'Valore economico dell’impresa', 'Attività d’impresa e processi aziendali', 'Processi aziendali',
    'Organigramma e unità organizzative', 'Cos’è il bilancio d’esercizio', 'Chi è interessato al bilancio',
    'Bilancio annuale e bilanci infrannuali', 'Bilancio dell’impresa vs bilancio consolidato',
    '1.1 Definizione economica di impresa'
  ];

  const isBoldTitle = boldableKeywords.some(keyword => cleanText.startsWith(keyword));

  if (isBoldTitle) {
    return <p className="font-bold text-lg text-content-primary mt-4 mb-1">{renderWithHighlights(item as string, "font-bold")}</p>;
  }

  // Check for numbered sub-headings (e.g. 1.1.1, 2.1.3) OR single numbered lists (e.g. 1. Title)
  // The regex matches:
  // ^\d+(\.\d+)+\s  -> 1.1, 1.1.1 (multi-level)
  // OR
  // ^\d+\.\s        -> 1., 2. (single level)
  // We check cleanText to ignore potential ** at start
  if (/^(\d+(\.\d+)+|\d+\.)\s/.test(cleanText)) {
    return (
      <p className="font-bold text-lg text-content-primary mt-6 mb-2">
        {renderWithHighlights(item as string)}
      </p>
    );
  }

  return (
    <p className="text-content-primary">
      {renderWithHighlights(item as string)}
    </p>
  );
};

interface SubSectionDisplayProps {
  subsection: SubSection;
  anchorId: string;
  onImageClick: (src: string, alt: string) => void;
}

const SubSectionDisplay: React.FC<SubSectionDisplayProps> = ({ subsection, anchorId, onImageClick }) => (
  <div id={anchorId} className="mb-4 last:mb-0 flow-root">
    {/* Subsection Title - 18px semibold */}
    <h3 className="text-lg font-semibold text-content-primary mb-2">
      {renderMathParts(subsection.title, 'title-')}
    </h3>
    {/* Minimal paragraph spacing */}
    <div className="space-y-1 text-content-primary text-base leading-normal">
      {subsection.content.map((item, index) => (
        <ContentRenderer key={index} item={item} onImageClick={onImageClick} />
      ))}
    </div>
  </div>
);

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] lightbox-image rounded-lg shadow-2xl shadow-black/50 scale-95 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-6 left-0 right-0 text-center text-gray-400 font-mono text-sm tracking-widest uppercase pointer-events-none">
        {alt}
      </p>
    </div>,
    document.body
  );
};

const SectionDisplay: React.FC<SectionDisplayProps> = ({ section, fontSizeLevel = 1 }) => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string, alt: string } | null>(null);

  // Font size classes based on level
  const fontSizeClass = fontSizeLevel === 0 ? 'text-sm' : fontSizeLevel === 2 ? 'text-lg' : 'text-base';

  return (
    <section id={section.id} className="pt-8 -mt-8 mb-6">
      {lightboxImage && (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
      {/* Section Title - 24px bold */}
      <h2 className="text-2xl font-bold text-content-primary tracking-tight mb-4">
        {section.title}
      </h2>
      <div className={`space-y-2 ${fontSizeClass}`}>
        {section.subsections.map((subsection, index) => {
          const anchorId = `${section.id}-${index}`;
          return (
            <SubSectionDisplay
              key={anchorId}
              subsection={subsection}
              anchorId={anchorId}
              onImageClick={(src, alt) => setLightboxImage({ src, alt })}
            />
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(SectionDisplay);
