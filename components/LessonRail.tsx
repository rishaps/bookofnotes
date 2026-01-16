import React from 'react';
import katex from 'katex';
import { MainSection } from '../types';

interface LessonRailProps {
  content: MainSection[] | null;
  className?: string;
  activeLessonIndex: number;
  onLessonSelect: (index: number) => void;
  subjectTitle?: string;
}

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

const stripNumericPrefix = (value: string) => {
  return value.replace(/^\s*\d+(?:\.\d+)*\s*[-:.)]?\s*/i, '').trim();
};

const getAlphaIndex = (index: number) => {
  let value = index + 1;
  let label = '';
  while (value > 0) {
    const mod = (value - 1) % 26;
    label = String.fromCharCode(65 + mod) + label;
    value = Math.floor((value - 1) / 26);
  }
  return label;
};

const formatSubsectionTitle = (title: string, index: number) => {
  const cleanedTitle = stripNumericPrefix(title);
  const prefix = getAlphaIndex(index);
  return `${prefix}) ${cleanedTitle}`;
};

const LessonRail: React.FC<LessonRailProps> = ({ content, className = '', activeLessonIndex, onLessonSelect, subjectTitle }) => {
  if (!content || content.length === 0) {
    return <div className="p-4 text-xs text-content-muted">Caricamento...</div>;
  }

  const handleLinkClick = (e: React.MouseEvent, lessonIndex: number, elementId?: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (lessonIndex === activeLessonIndex && elementId) {
      // If we are already on this lesson, try to scroll to the subsection
      const el = document.getElementById(elementId);
      if (el) {
        // Offset for header
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Otherwise switch lesson
      onLessonSelect(lessonIndex);
    }
  };

  return (
    <nav className={`lesson-rail ${className} relative z-50 bg-white dark:bg-black lg:bg-transparent`}>
      {subjectTitle && (
        <div className="lesson-rail-title">
          {subjectTitle.toUpperCase()}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {content.map((section, index) => {
          const isActive = index === activeLessonIndex;
          // Format Title: remove "Lezione X:" prefix if present for cleaner look
          const displayTitle = section.title.replace(/^Lezione \d+:\s*/i, '');

          return (
            <div key={section.id} className="flex flex-col gap-2">
              {/* Lesson Header */}
              <button
                className={`rail-item-glow text-left font-mono text-sm uppercase tracking-widest leading-relaxed transition-colors ${isActive ? 'active text-content-primary font-bold' : 'text-content-muted'}`}
                onClick={(e) => handleLinkClick(e, index)}
              >
                <div className="flex gap-2">
                  <span className="opacity-50">{index + 1}.</span>
                  <span>{displayTitle}</span>
                </div>
              </button>

              {/* Chapters / Subsections */}
              <div className="flex flex-col gap-2 pl-4 border-l border-content-primary/10 ml-1.5">
                {section.subsections.map((sub, subIndex) => {
                  const subId = `${section.id}-${subIndex}`;
                  return (
                    <button
                      key={subIndex}
                      className={`rail-item-glow text-left font-mono text-[11px] leading-tight transition-colors ${isActive ? 'text-content-secondary' : 'text-content-muted/60'}`}
                      onClick={(e) => handleLinkClick(e, index, subId)}
                    >
                      {renderTitleWithMath(formatSubsectionTitle(sub.title, subIndex))}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .lesson-rail-title {
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--content-primary);
          margin-bottom: 24px;
          padding-top: 8px;
          padding-bottom: 8px;
        }
      `}</style>
    </nav>
  );
};

export default React.memo(LessonRail);
