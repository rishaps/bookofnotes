import React, { useState, useEffect } from 'react';
import katex from 'katex';
import { MainSection, SubSection, TableData } from '../types';
import { Search, X, ZoomIn, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

const MathRenderer = React.lazy(() => import('./MathRenderer'));

interface SectionDisplayProps {
  section: MainSection;
  fontSizeLevel?: number;
}

// Ensure path starts with / relative to public
const normalizeImagePath = (src: string) => {
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return `/${src}`;
};

const ImageThumbnail: React.FC<{ src: string; alt: string; onImageClick: (src: string, alt: string) => void }> = ({ src, alt, onImageClick }) => {
  const [imgSrc, setImgSrc] = useState(normalizeImagePath(src));
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Optional: logic to detect orientation could go here
  };

  if (hasError) return null;

  return (
    <div
      className="relative cursor-zoom-in my-6 group flex flex-col items-center"
      onClick={() => onImageClick(imgSrc, alt)}
    >
      <div className="relative overflow-hidden rounded-lg bg-white p-2 border border-content-primary/10 shadow-sm transition-all duration-300 hover:shadow-md">
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={() => setHasError(true)}
          className="max-w-full h-auto max-h-[300px] object-contain mx-auto"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn className="text-content-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md" size={24} />
        </div>
      </div>
      {alt && <p className="caption-highlight mt-2">{alt}</p>}
    </div>
  );
};

const isTableData = (item: string | TableData): item is TableData => {
  return (item as TableData).headers !== undefined;
};

// --- Math Parsing Utilities ---

// Matches: **bold**, $inline$, or $$block$$
// Note: We prioritize detecting block math $$...$$ first
const INLINE_MATH_BLOCK_THRESHOLD = 140;
const estimateInlineMathLength = (latex: string) => {
  let length = 0;
  for (let i = 0; i < latex.length; i++) {
    const ch = latex[i];
    if (ch === '\\') {
      let j = i + 1;
      if (j < latex.length && /[A-Za-z]/.test(latex[j])) {
        while (j < latex.length && /[A-Za-z]/.test(latex[j])) {
          j += 1;
        }
      } else if (j < latex.length) {
        j += 1;
      }
      length += 1;
      i = j - 1;
      continue;
    }
    if (ch === '{' || ch === '}' || ch === '^' || ch === '_') {
      continue;
    }
    length += 1;
  }
  return length;
};
const shouldInlineMathBeBlock = (latex: string) => {
  const normalized = latex.replace(/\s+/g, ' ').trim();
  return estimateInlineMathLength(normalized) >= INLINE_MATH_BLOCK_THRESHOLD ||
    normalized.includes('\\begin{') ||
    normalized.includes('\\end{') ||
    normalized.includes('\\\\');
};

const renderMathParts = (text: string, keyPrefix: string = '') => {
  // 1. Split by Block Math $$...$$
  const blockParts = text.split(/(\$\$[^$]+\$\$)/g);

  return (
    <>
      {blockParts.map((part, bIdx) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const latex = part.slice(2, -2);
          return (
            <React.Suspense key={`${keyPrefix}-block-${bIdx}`} fallback={<div className="h-6 w-full animate-pulse" />}>
              <MathRenderer latex={latex} />
            </React.Suspense>
          );
        }

        // 2. Split by Inline Math $...$ inside text blocks
        const inlineParts = part.split(/(\$[^$]+\$)/g);
        return (
          <span key={`${keyPrefix}-text-${bIdx}`}>
            {inlineParts.map((subPart, iIdx) => {
              if (subPart.startsWith('$') && subPart.endsWith('$')) {
                const latex = subPart.slice(1, -1);
                if (shouldInlineMathBeBlock(latex)) {
                  return (
                    <React.Suspense
                      key={`${keyPrefix}-inline-${iIdx}`}
                      fallback={<span className="inline-math-container inline-block h-6 w-full animate-pulse" />}
                    >
                      <MathRenderer latex={latex} inline />
                    </React.Suspense>
                  );
                }
                try {
                  const html = katex.renderToString(latex, {
                    throwOnError: false,
                    displayMode: false,
                    strict: false,
                  });
                  return (
                    <span
                      key={`${keyPrefix}-inline-${iIdx}`}
                      className="inline-math-container"
                    >
                      <span className="inline-math px-1" dangerouslySetInnerHTML={{ __html: html }} />
                    </span>
                  );
                } catch (e) {
                  return <span key={iIdx} className="text-red-500 font-mono text-xs">{latex}</span>;
                }
              }
              return <span key={iIdx}>{subPart}</span>;
            })}
          </span>
        );
      })}
    </>
  );
};

const renderWithHighlights = (value: string) => {
  if (!value) return null;
  const normalizedValue = value.replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF]/g, '');

  // Handle Markdown Bold (**text**)
  const parts = normalizedValue.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const content = part.slice(2, -2);
          return <strong key={index} className="font-bold text-content-primary">{renderMathParts(content, `bold-${index}`)}</strong>;
        }
        return <React.Fragment key={index}>{renderMathParts(part, `plain-${index}`)}</React.Fragment>;
      })}
    </>
  );
};

const ContentRenderer: React.FC<{ item: string | TableData; onImageClick: (src: string, alt: string) => void }> = ({ item, onImageClick }) => {
  if (isTableData(item)) {
    return (
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-left border border-content-primary/20 bg-bg-glass">
          <thead>
            <tr className="border-b border-content-primary/20 bg-content-primary/5">
              {item.headers.map((header, index) => (
                <th key={index} className="p-3 font-bold text-content-primary border-r border-content-primary/20 last:border-r-0 text-sm uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-content-primary/10 last:border-b-0 hover:bg-content-primary/5 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-3 text-content-primary border-r border-content-primary/10 last:border-r-0">{renderWithHighlights(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const text = (item as string).trim();

  // --- Visual Component: Callouts ---
  if (/^(Attenzione|Nota|Ricorda|Esempio)\s*[:\-]/i.test(text)) {
    const match = text.match(/^(\w+)\s*[:\-]\s*(.+)/s);
    if (match) {
      const [, type, content] = match;
      const colors = {
        'Attenzione': 'border-red-500 bg-red-50/10 text-red-700 dark:text-red-300',
        'Nota': 'border-blue-500 bg-blue-50/10 text-blue-700 dark:text-blue-300',
        'Ricorda': 'border-amber-500 bg-amber-50/10 text-amber-700 dark:text-amber-300',
        'Esempio': 'border-emerald-500 bg-emerald-50/10 text-emerald-700 dark:text-emerald-300'
      };
      const style = colors[type as keyof typeof colors] || colors['Nota'];

      return (
        <div className={`my-6 pl-4 border-l-4 ${style} py-2`}>
          <span className="block font-bold text-xs uppercase tracking-widest mb-1 opacity-75">{type}</span>
          <p className="text-content-primary leading-relaxed">{renderWithHighlights(content)}</p>
        </div>
      );
    }
  }

  // --- Visual Component: Markdown Images ---
  // Syntax: ![alt text](url)
  // --- Visual Component: Markdown Images ---
  // Syntax: ![alt text](url)
  // Also supports flags in alt text: ![Caption|small](url)
  const imageMatch = text.match(/^\!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    let [, rawAlt, src] = imageMatch;

    // Parse flags from alt text: |left, |right, |small, |medium, |large
    const isLeft = rawAlt.includes('|left');
    const isRight = rawAlt.includes('|right');
    const isSmall = rawAlt.includes('|small');
    const isLarge = rawAlt.includes('|large');
    const hasFloat = isLeft || isRight;

    // Clean alt text for display - remove ALL flags
    const alt = rawAlt.replace(/\|(left|right|small|medium|large)/g, '').trim();

    // Width class
    const widthClass = isSmall
      ? "lg:w-3/12"
      : isLarge
        ? "lg:w-8/12"
        : hasFloat ? "lg:w-5/12" : "w-full max-w-lg"; // Centered images get max-width

    // Float class - only if |left or |right specified
    const floatClass = isLeft
      ? "lg:float-left lg:mr-12 lg:clear-left"
      : isRight
        ? "lg:float-right lg:ml-12 lg:clear-right"
        : "mx-auto"; // Center by default

    return (
      <div className={`image-block w-full ${widthClass} ${floatClass} mb-4`}>
        <ImageThumbnail src={src} alt={alt} onImageClick={onImageClick} />
      </div>
    );
  }

  // --- Visual Component: Block Math (Standalone $$) ---
  if (text.startsWith('$$')) {
    const latex = text.replace(/^\$\$|\$\$$/g, '');
    return (
      <React.Suspense fallback={<div className="my-8 h-12 w-full bg-premium-glass animate-pulse"></div>}>
        <MathRenderer latex={latex} />
      </React.Suspense>
    );
  }

  // --- Visual Component: Lists ---
  if (text.match(/^([●○*-])\s/)) {
    return (
      <div className="flex items-start gap-3 my-2 pl-2">
        <span className="text-premium-gold mt-1.5 text-[8px]">●</span>
        <p className="text-content-primary flex-1 leading-relaxed">
          {renderWithHighlights(text.replace(/^([●○*-])\s/, ''))}
        </p>
      </div>
    );
  }

  // --- Default Paragraph ---
  return (
    <p className="text-content-primary mb-4 leading-relaxed text-lg font-light">
      {renderWithHighlights(text)}
    </p>
  );
};

// --- Subsections & Lightbox ---

const SubSectionDisplay: React.FC<{ subsection: SubSection; anchorId: string; onImageClick: (src: string, alt: string) => void }> = ({ subsection, anchorId, onImageClick }) => (
  <div id={anchorId} className="mb-8 last:mb-0">
    <h3 className="subsection-title border-b border-content-primary/10 pb-2 mb-6">
      {renderMathParts(subsection.title)}
    </h3>
    <div className="text-content-primary">
      {subsection.content.map((item, index) => (
        <ContentRenderer key={index} item={item} onImageClick={onImageClick} />
      ))}
    </div>
  </div>
);

const Lightbox: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-body/95 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-content-primary/10 transition-colors">
        <X className="w-8 h-8 text-content-primary" />
      </button>
      <div className="max-w-5xl w-full max-h-screen flex flex-col items-center">
        <img src={src} alt={alt} className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm" onClick={(e) => e.stopPropagation()} />
        <p className="mt-4 text-content-primary/80 font-mono text-sm tracking-widest uppercase">{alt}</p>
      </div>
    </div>,
    document.body
  );
};

const SectionDisplay: React.FC<SectionDisplayProps> = ({ section, fontSizeLevel = 1 }) => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string, alt: string } | null>(null);

  return (
    <section id={section.id} className={`max-w-3xl mx-auto pt-8 mb-12 animate-in slide-in-from-bottom-4 duration-500`}>
      {lightboxImage && <Lightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />}

      <h2 className="section-title text-4xl font-bold mb-8 tracking-tight text-content-primary">
        {section.title}
      </h2>

      <div className="space-y-12">
        {section.subsections.map((subsection, index) => (
          <SubSectionDisplay
            key={`${section.id}-${index}`}
            subsection={subsection}
            anchorId={`${section.id}-${index}`}
            onImageClick={(src, alt) => setLightboxImage({ src, alt })}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(SectionDisplay);
