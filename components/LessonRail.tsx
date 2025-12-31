
import React from 'react';
import { useNavigate } from 'react-router-dom';
import katex from 'katex';
import { MainSection } from '../types';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Home } from 'lucide-react';

// Helper to render math in titles
const renderTitleWithMath = (title: string) => {
  const mathPattern = /(\$[^$]+\$)/g;
  const parts = title.split(mathPattern);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const latex = part.substring(1, part.length - 1);
          try {
            const html = katex.renderToString(latex, {
              throwOnError: false,
              displayMode: false,
            });
            return (
              <span
                key={index}
                className="inline-math"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch (e) {
            return <span key={index}>{part}</span>;
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

interface LessonRailProps {
  content: MainSection[] | null;
  className?: string;
  onLinkClick?: () => void;
}

const LessonRail: React.FC<LessonRailProps> = ({ content, className = '', onLinkClick }) => {
  const navigate = useNavigate();

  // Handle null content - show loading state
  if (!content || content.length === 0) {
    return (
      <div className="text-sm text-content-muted font-mono py-4">
        Caricamento indice...
      </div>
    );
  }

  const subsectionAnchors = content.flatMap((section) =>
    section.subsections.map((_, index) => `${section.id}-${index}`)
  );

  const activeId = useScrollSpy(subsectionAnchors, {
    rootMargin: '0% 0% -70% 0%',
  });

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100; // Account for fixed header
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      if (onLinkClick) onLinkClick();
    }
  };

  return (
    <nav className={`overflow-y-auto pr-2 custom-scrollbar ${className}`}>
      <div className="flex flex-col gap-8">

        <div className="text-xs font-mono text-premium-gold/70 uppercase tracking-widest pb-2">
          Indice dei contenuti
        </div>

        {content.map((section, sectionIndex) => {
          const shortTitle = section.title.split(':')[0];

          return (
            <div key={section.id} className="group">
              <div
                className="flex items-center gap-3 mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleClick(`${section.id}-0`)}
              >
                {!['glossario', 'formulario-esempi'].includes(section.id) ? (
                  <span className="flex h-6 w-6 items-center justify-center text-[10px] font-mono text-content-muted group-hover:text-premium-gold transition-colors">
                    {sectionIndex + 1}
                  </span>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center text-content-muted">
                    •
                  </span>
                )}
                <span className="text-xs font-medium uppercase tracking-wide text-content-muted group-hover:text-content-primary transition-colors">
                  {shortTitle}
                </span>
              </div>

              <div className="ml-3 pl-4 flex flex-col gap-2">
                {section.subsections.map((subsection, subsectionIndex) => {
                  const anchorId = `${section.id}-${subsectionIndex}`;
                  const isActive = activeId === anchorId;

                  return (
                    <button
                      key={anchorId}
                      type="button"
                      onClick={() => handleClick(anchorId)}
                      className={`text-left text-sm transition-all duration-300 line-clamp-2 ${isActive
                        ? 'text-premium-gold font-bold translate-x-1'
                        : 'text-content-muted hover:text-content-secondary'
                        }`}
                    >
                      {renderTitleWithMath(subsection.title.replace(/-->/g, '').trim())}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-primary);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--content-muted);
        }
      `}</style>
    </nav>
  );
};

export default React.memo(LessonRail);
