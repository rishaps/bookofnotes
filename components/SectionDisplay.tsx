
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { MainSection, SubSection } from '../types';
import { MainSection as MainSectionType } from '../types'; // Alias if needed or just use MainSection
import ImageThumbnail from './ImageThumbnail';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Lightbox from './Lightbox';

interface SectionDisplayProps {
  section: MainSection;
  fontSizeLevel?: number; // 0, 1, 2
}

/* 
  FONT SIZING STRATEGY:
  Level 0 (Small): Base 14px, Heading 20px
  Level 1 (Medium - Default): Base 16px, Heading 24px
  Level 2 (Large): Base 18px, Heading 28px
*/
const FONT_SIZES = {
  0: { base: 'text-sm', h2: 'text-xl', h3: 'text-lg', small: 'text-[10px]' },
  1: { base: 'text-base', h2: 'text-2xl', h3: 'text-xl', small: 'text-xs' },
  2: { base: 'text-lg', h2: 'text-3xl', h3: 'text-2xl', small: 'text-sm' },
};

const SectionDisplay: React.FC<SectionDisplayProps> = ({ section, fontSizeLevel = 1 }) => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  /* 
     PERFORMANCE OPTIMIZATION: Lazy Rendering
     We use useInView to detect when the section is near the viewport.
  */
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '200px 0px', // Pre-render 200px before it enters viewport
  });

  const level = Math.max(0, Math.min(2, fontSizeLevel)); // Clamp 0-2
  const typography = FONT_SIZES[level as keyof typeof FONT_SIZES];

  // FORCE RENDER SHORTCUT FOR STABILITY (User reported missing content with lazy load)
  // We keep it true for now until visibility is 100% confirmed stable.
  const shouldRender = true;

  return (
    <section
      id={section.id}
      ref={ref}
      className="scroll-mt-24 min-h-[100px]" // Min-height ensures intersection observer works
    >
      <div className="mb-8 border-b border-premium-gray/20 pb-4">
        <h2 className={`font-serif ${typography.h2} text-content-primary mb-2`}>
          {section.title}
        </h2>
        <div className="w-12 h-1 bg-premium-gold rounded-full opacity-60"></div>
      </div>

      {shouldRender ? (
        <div className="space-y-12 animate-in fade-in duration-500">

          {section.subsections.map((sub, idx) => (
            <SubSectionDisplay
              key={idx}
              sub={sub}
              onImageClick={(src, alt) => setLightboxImage({ src, alt })}
              typography={typography}
            />
          ))}
        </div>
      ) : (
        /* Placeholder to prevent layout collapse and ensure smooth scrolling */
        <div className="h-[200px]" />
      )}

      {lightboxImage && (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
};

// Generic type for content items
type ContentItem = string | { type: 'table'; headers: string[]; rows: string[][] } | { type: 'chart'; data: any[] };

const SubSectionDisplay: React.FC<{
  sub: SubSection;
  onImageClick: (src: string, alt: string) => void;
  typography: { base: string; h2: string; h3: string; small: string };
}> = ({ sub, onImageClick, typography }) => {
  return (
    <div id={sub.title.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-28 group">
      <h3 className={`font-serif ${typography.h3} text-content-primary/90 mb-6 flex items-center group-hover:text-premium-gold transition-colors duration-300`}>
        <span className="w-1.5 h-1.5 rounded-full bg-premium-gold mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        {sub.title}
      </h3>
      <div className={`space-y-6 ${typography.base} leading-relaxed text-content-secondary font-light`}>
        {sub.content.map((item, i) => (
          <ContentRenderer key={i} item={item} onImageClick={onImageClick} typography={typography} />
        ))}
      </div>
    </div>
  );
};

// Reusable Risk/Reward Chart Component (Lazy Loaded potentially)
const RiskRewardChart = ({ data }: { data: any[] }) => (
  <div className="h-[300px] w-full my-8">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
        <XAxis dataKey="x" stroke="#888" tick={{ fontSize: 12 }} />
        <YAxis stroke="#888" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
          itemStyle={{ color: '#fff' }}
        />
        <Line type="monotone" dataKey="y" stroke="#E6D5C3" strokeWidth={2} dot={{ r: 4, fill: '#E6D5C3' }} />
      </LineChart>
    </ResponsiveContainer>
    <p className="text-center text-xs font-mono text-content-muted mt-2">Rischio vs Rendimento</p>
  </div>
);


const ContentRenderer: React.FC<{
  item: ContentItem;
  onImageClick: (src: string, alt: string) => void;
  typography: { base: string; h2: string; h3: string; small: string };
}> = ({ item, onImageClick, typography }) => {

  const smallClass = typography.base; // Inherit base size for paragraphs

  // Helper to render text with highlights and LaTeX
  const renderWithHighlights = (text: string) => {
    const parts = text.split(/(\$[^$]+\$|`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        return <InlineMath key={index} math={math} />;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="mx-1 px-1.5 py-0.5 rounded bg-premium-gold/10 text-premium-gold font-mono text-[0.9em]">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-content-primary">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (typeof item !== 'string') {
    if (item.type === 'chart' && item.data) {
      const chartData = item.data;
      return (
        <div className="my-8 border border-premium-gray/20 rounded-xl overflow-hidden bg-premium-black/20 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-premium-gray/20">
              <h4 className="font-serif text-lg text-content-primary mb-4">Analisi Grafica</h4>
              <p className={`${smallClass} text-content-muted mb-4`}>
                Rappresentazione visuale della relazione tra rischio atteso e rendimento potenziale nel portafoglio analizzato.
              </p>
            </div>
            <div className="w-full lg:w-2/3 p-4">
              <RiskRewardChart data={chartData} />
            </div>
          </div>
        </div>
      );
    }

    if (item.type === 'table') {
      return (
        <div className="my-8 overflow-x-auto p-1">
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
                    <td key={cellIndex} className={`p-4 ${smallClass} text-content-secondary font-light`}>{renderWithHighlights(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  }

  // Ensure text is clean
  let text = (item as string).trim();

  // Clean backticks if they wrap the entire line
  if (text.startsWith('`') && text.endsWith('`') && text.length > 2) {
    text = text.slice(1, -1);
  }

  // Callout: warning (Updated to Dark Red light mode, White/Light dark mode per request)
  if (/^Attenzione\s*[:\-]/i.test(text)) {
    const content = text.replace(/^Attenzione\s*[:\-]\s*/i, '');
    return (
      <div className="my-8 px-6 py-4">
        <p className="text-xs font-mono font-bold tracking-widest uppercase text-red-800 dark:text-red-100 mb-2 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-800 dark:bg-red-100"></span>
          Attenzione
        </p>
        <p className={`${smallClass} leading-relaxed text-content-secondary font-light`}>{renderWithHighlights(content)}</p>
      </div>
    );
  }

  // Callout: info (Updated to Dark Green light mode, White/Light dark mode per request)
  if (/^(Nota|Info)\s*[:\-]/i.test(text)) {
    const content = text.replace(/^(Nota|Info)\s*[:\-]\s*/i, '');
    return (
      <div className="my-8 px-6 py-4 gap-4">
        <p className="text-xs font-mono font-bold tracking-widest uppercase text-green-800 dark:text-green-100 mb-2 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-800 dark:bg-green-100"></span>
          Nota
        </p>
        <p className={`${smallClass} leading-relaxed text-content-secondary font-light`}>{renderWithHighlights(content)}</p>
      </div>
    );
  }

  // Markdown Image syntax
  const imageMatch = text.match(/!\[(.*?)\]\((.*?)\)/);

  if (imageMatch) {
    const [, alt, src] = imageMatch;
    console.log('[ContentRenderer] Detected image:', src);
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

  // Italic Caption
  if (text.startsWith('*') && text.endsWith('*') && !text.startsWith('**') && !text.includes('**')) {
    const caption = text.slice(1, -1);
    return (
      <p className="text-xs font-mono text-content-muted text-center italic mt-2 mb-6">
        {caption}
      </p>
    );
  }

  // Block Math
  if (text.startsWith('$$') && text.endsWith('$$')) {
    const math = text.slice(2, -2);
    return (
      <div className="my-6 overflow-x-auto py-2">
        <BlockMath math={math} />
      </div>
    );
  }

  // Code Block
  if (text.startsWith('```') && text.endsWith('```')) {
    const lines = text.split('\n');
    const language = lines[0].slice(3).trim() || 'text';
    const code = lines.slice(1, -1).join('\n');
    return (
      <div className="my-8 rounded-lg overflow-hidden border border-premium-gray/30 shadow-2xl">
        <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase text-content-muted tracking-widest">{language}</span>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
        </div>
        <SyntaxHighlighter
          language={language}
          style={coldarkDark}
          customStyle={{ margin: 0, padding: '1.5rem', background: 'rgba(0,0,0,0.2)', fontSize: '0.9em' }}
          showLineNumbers={true}
          lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#4b5563', textAlign: 'right' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }

  // List Items
  if (/^(\d+\.|[\-\*●○])\s/.test(text)) {
    const isOrdered = /^\d+\./.test(text);
    const content = text.replace(/^(\d+\.|[\-\*●○])\s/, '');

    return (
      <div className="flex items-start gap-4 my-2 group pl-2 relative">
        <div className={`mt-[0.6em] shrink-0 w-1.5 h-1.5 rounded-full bg-black dark:bg-white shadow-sm group-hover:scale-125 transition-transform duration-300`}></div>
        <div className={`${smallClass} text-content-secondary leading-relaxed`}>
          {renderWithHighlights(content)}
        </div>
      </div>
    );
  }

  // Standard Paragraph
  return (
    <p className={`mb-4 ${smallClass} text-content-secondary leading-relaxed text-balance`}>
      {renderWithHighlights(text)}
    </p>
  );
};

export default SectionDisplay;
