import React, { useState, useEffect } from 'react';
import katex from 'katex';
import { ImageData, MainSection, SubSection, TableData } from '../types';
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

const ImageThumbnail: React.FC<{
  src: string;
  alt: string;
  onImageClick: (src: string, alt: string) => void;
  align?: 'left' | 'right' | 'center';
  size?: 'small' | 'large' | 'default';
  onImageLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}> = ({ src, alt, onImageClick, align = 'center', size = 'default', onImageLoad }) => {
  const [imgSrc, setImgSrc] = useState(normalizeImagePath(src));
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  const alignClass = 'items-center';
  const imgAlignClass = 'mx-auto';
  const maxHeightClass =
    size === 'large' ? 'max-h-[640px]' : size === 'small' ? 'max-h-[360px]' : 'max-h-[520px]';

  return (
    <div
      className={`relative cursor-zoom-in my-6 group flex flex-col ${alignClass}`}
      onClick={() => onImageClick(imgSrc, alt)}
    >
      <div className="image-frame relative w-full overflow-hidden rounded-lg transition-all duration-300">
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          onLoad={onImageLoad}
          onError={() => setHasError(true)}
          className={`w-full h-auto ${maxHeightClass} object-contain ${imgAlignClass}`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn className="text-content-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md" size={24} />
        </div>
      </div>
      {alt && (
        <p className="caption-highlight mt-2">
          {renderMathParts(alt, `caption-${alt}`)}
        </p>
      )}
    </div>
  );
};

const isTableData = (item: ContentItem): item is TableData => {
  return (item as TableData).headers !== undefined;
};

const isImageData = (item: ContentItem): item is ImageData => {
  return typeof item === 'object' && item !== null && 'url' in item;
};

type CalloutBlock = {
  kind: 'callout';
  label: string;
  level: 1 | 2;
  items: Array<string | TableData | ImageData | CalloutBlock>;
};

type ContentItem = string | TableData | ImageData | CalloutBlock;

const isCalloutBlock = (item: ContentItem): item is CalloutBlock => {
  return typeof item === 'object' && item !== null && 'kind' in item && (item as CalloutBlock).kind === 'callout';
};

const parsePipeTable = (lines: string[]): TableData | null => {
  if (lines.length < 2) return null;
  const cleaned = lines.map((line) => line.trim()).filter(Boolean);
  if (cleaned.length < 2) return null;

  const headerCells = cleaned[0]
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean);

  let rowStartIndex = 1;
  if (cleaned[1].includes('---')) {
    rowStartIndex = 2;
  }

  const rows = cleaned.slice(rowStartIndex).map((row) =>
    row
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean)
  );

  if (headerCells.length === 0 || rows.length === 0) return null;
  return { headers: headerCells, rows };
};

const parseLatexArrayToTable = (latex: string): TableData | null => {
  if (!latex.includes('\\begin{array}')) return null;
  const body = latex
    .replace(/\\begin\{array\}\{[^}]*\}/, '')
    .replace(/\\end\{array\}/, '');

  const rows = body
    .split('\\\\')
    .map((row) => row.replace(/\\hline/g, '').trim())
    .filter(Boolean);

  if (rows.length < 2) return null;

  const parsedRows = rows.map((row) =>
    row
      .split('&')
      .map((cell) => cell.trim())
      .filter(Boolean)
  );

  const headers = parsedRows.shift();
  if (!headers) return null;

  const wrapMath = (value: string) => (value ? `$${value}$` : value);

  return {
    headers: headers.map(wrapMath),
    rows: parsedRows.map((row) => row.map(wrapMath)),
  };
};

const CALLOUT_TYPE_LEVELS: Record<string, 1 | 2> = {
  esempio: 1,
  definizione: 1,
  nota: 2,
  note: 2,
  attenzione: 2,
  ricorda: 2,
  importante: 2,
  osservazione: 2,
};

const unwrapLeadingBold = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed.startsWith('**')) return trimmed;
  const end = trimmed.indexOf('**', 2);
  if (end === -1) return trimmed;
  return `${trimmed.slice(2, end)}${trimmed.slice(end + 2)}`;
};

const parseCalloutStart = (value: string) => {
  const trimmed = value.trim();
  const unwrapped = unwrapLeadingBold(trimmed);
  const match = unwrapped.match(/^(?:([0-9]+(?:\.[0-9]+)*)\s*)?(Attenzione|Nota|Note|Ricorda|Esempio|Definizione|Importante|Osservazione)\b(.*)$/i);
  if (!match) return null;

  const hasLeadingBold = trimmed.startsWith('**');
  const rest = (match[3] || '').trim();
  const hasSeparator = /[:]/.test(rest) || /\s-\s/.test(rest);
  if (!hasLeadingBold && !hasSeparator) return null;

  const leadingNumber = match[1];
  const typeRaw = match[2];
  const typeKey = typeRaw.toLowerCase();
  const level = CALLOUT_TYPE_LEVELS[typeKey];
  if (!level) return null;

  let labelSuffix = '';
  let inlineContent = '';
  let separatorIndex = rest.indexOf(':');
  if (separatorIndex === -1) {
    const dashMatch = rest.match(/\s-\s/);
    separatorIndex = dashMatch?.index ?? -1;
  }

  if (separatorIndex >= 0) {
    labelSuffix = rest.slice(0, separatorIndex).trim();
    inlineContent = rest.slice(separatorIndex + 1).trim();
  } else {
    labelSuffix = rest;
  }

  const numberPrefix = leadingNumber ? `${leadingNumber.trim()} ` : '';
  const label = `${numberPrefix}${typeRaw}${labelSuffix ? ` ${labelSuffix}` : ''}`.trim();
  return { label, inlineContent, level };
};

const looksLikeNumberedHeading = (value: string) => {
  const cleaned = unwrapLeadingBold(value).trim();
  return /^\d+(?:\.\d+)+\s+\S/.test(cleaned);
};

const groupCallouts = (items: Array<string | TableData | ImageData>): ContentItem[] => {
  const output: ContentItem[] = [];
  const stack: CalloutBlock[] = [];

  const pushItem = (item: ContentItem) => {
    if (stack.length > 0) {
      stack[stack.length - 1].items.push(item);
      return;
    }
    output.push(item);
  };

  items.forEach((item) => {
    if (typeof item === 'string') {
      const callout = parseCalloutStart(item);
      if (callout) {
        while (stack.length > 0 && callout.level <= stack[stack.length - 1].level) {
          stack.pop();
        }

        const block: CalloutBlock = {
          kind: 'callout',
          label: callout.label,
          level: callout.level,
          items: [],
        };

        if (callout.inlineContent) {
          block.items.push(callout.inlineContent);
        }

        pushItem(block);

        const shouldStayOpen = callout.level === 1 || !callout.inlineContent;
        if (shouldStayOpen) {
          stack.push(block);
        }
        return;
      }

      if (looksLikeNumberedHeading(item)) {
        stack.length = 0;
      }
    }

    pushItem(item as ContentItem);
  });

  return output;
};

// --- Math Parsing Utilities ---

// Matches: **bold**, $inline$, or $$block$$
// Note: We prioritize detecting block math $$...$$ first
const INLINE_MATH_BLOCK_THRESHOLD = 70;
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
  const equalityCount = (normalized.match(/=/g) || []).length;
  return estimateInlineMathLength(normalized) >= INLINE_MATH_BLOCK_THRESHOLD ||
    equalityCount >= 2 ||
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
        const renderedInlineParts: React.ReactNode[] = [];
        for (let iIdx = 0; iIdx < inlineParts.length; iIdx += 1) {
          const subPart = inlineParts[iIdx];
          if (subPart.startsWith('$') && subPart.endsWith('$')) {
            let latex = subPart.slice(1, -1);
            if (shouldInlineMathBeBlock(latex)) {
              const next = inlineParts[iIdx + 1];
              if (typeof next === 'string') {
                const match = next.match(/^\s*([.,;:])/);
                if (match) {
                  const punct = match[1];
                  latex = `${latex} \\text{${punct}}`;
                  inlineParts[iIdx + 1] = next.slice(match[0].length);
                }
              }
              renderedInlineParts.push(
                <React.Suspense
                  key={`${keyPrefix}-inline-${iIdx}`}
                  fallback={<span className="inline-math-container inline-block h-6 w-full animate-pulse" />}
                >
                  <MathRenderer latex={latex} inline />
                </React.Suspense>
              );
              continue;
            }
            try {
              const html = katex.renderToString(latex, {
                throwOnError: false,
                displayMode: false,
                strict: false,
              });
              renderedInlineParts.push(
                <span
                  key={`${keyPrefix}-inline-${iIdx}`}
                  className="inline-math-container"
                >
                  <span className="inline-math px-1" dangerouslySetInnerHTML={{ __html: html }} />
                </span>
              );
            } catch (e) {
              renderedInlineParts.push(
                <span key={iIdx} className="text-red-500 font-mono text-xs">{latex}</span>
              );
            }
            continue;
          }
          renderedInlineParts.push(<span key={iIdx}>{subPart}</span>);
        }
        return (
          <span key={`${keyPrefix}-text-${bIdx}`}>
            {renderedInlineParts}
          </span>
        );
      })}
    </>
  );
};

const renderWithHighlights = (value: string) => {
  if (!value) return null;
  const normalizedValue = value.replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF]/g, '');

  return (
    <>
      {(() => {
        const codeBlockPattern = /```([\s\S]*?)```/g;
        const segments: Array<{ type: 'text' | 'code'; value: string }> = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = codeBlockPattern.exec(normalizedValue))) {
          if (match.index > lastIndex) {
            segments.push({ type: 'text', value: normalizedValue.slice(lastIndex, match.index) });
          }
          segments.push({ type: 'code', value: match[1] });
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < normalizedValue.length) {
          segments.push({ type: 'text', value: normalizedValue.slice(lastIndex) });
        }

        return segments.map((segment, segmentIndex) => {
          if (segment.type === 'code') {
            const cleaned = segment.value.replace(/^\n/, '').replace(/\n$/, '');
            return (
              <pre key={`code-${segmentIndex}`} className="content-code-block">
                <code>{cleaned}</code>
              </pre>
            );
          }

          const parts = segment.value.split(/(\*\*[^*]+\*\*)/g);
          return (
            <React.Fragment key={`text-${segmentIndex}`}>
              {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  const content = part.slice(2, -2);
                  return (
                    <strong key={`bold-${segmentIndex}-${index}`} className="font-bold text-content-primary">
                      {renderMathParts(content, `bold-${segmentIndex}-${index}`)}
                    </strong>
                  );
                }
                return (
                  <React.Fragment key={`plain-${segmentIndex}-${index}`}>
                    {renderMathParts(part, `plain-${segmentIndex}-${index}`)}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        });
      })()}
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

const renderTable = (table: TableData) => {
  const hasHeader = table.headers.some((header) => header.trim().length > 0);
  const isFormulaTable = !hasHeader && table.rows.some((row) => row.some((cell) => cell.trim().startsWith('$')));
  const renderFormulaCell = (cell: string) => {
    const trimmed = cell.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('$') && trimmed.endsWith('$')) {
      const latex = trimmed.slice(1, -1).trim();
      return (
        <span className="formula-cell">
          <React.Suspense fallback={<span className="inline-math-container inline-block h-6 w-full animate-pulse" />}>
            <MathRenderer latex={latex} inline />
          </React.Suspense>
        </span>
      );
    }
    return renderWithHighlights(cell);
  };
  return (
    <div className={`table-wrap my-6 ${isFormulaTable ? 'table-wrap-formula' : ''}`}>
      <table className={`w-full text-center border border-content-primary/20 bg-bg-glass ${isFormulaTable ? 'formula-table' : ''}`}>
        {hasHeader && (
          <thead>
            <tr className="border-b border-content-primary/20 bg-content-primary/5">
              {table.headers.map((header, index) => (
                <th key={index} className="p-3 font-bold text-content-primary border-r border-content-primary/20 last:border-r-0 text-sm uppercase tracking-wider text-center">
                  {renderWithHighlights(header)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-content-primary/10 last:border-b-0 hover:bg-content-primary/5 transition-colors">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 text-content-primary text-center">
                  {isFormulaTable ? renderFormulaCell(cell) : renderWithHighlights(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ContentRenderer: React.FC<{ item: ContentItem; onImageClick: (src: string, alt: string) => void }> = ({ item, onImageClick }) => {
  const [isTall, setIsTall] = useState(false);
  if (isCalloutBlock(item)) {
    return (
      <div className="callout-box my-6">
        <span className="callout-label">
          {renderMathParts(item.label, `callout-${item.label}`)}
        </span>
        <div className="callout-content">
          {item.items.map((entry, index) => (
            <ContentRenderer key={`${item.label}-${index}`} item={entry} onImageClick={onImageClick} />
          ))}
        </div>
      </div>
    );
  }
  if (isImageData(item)) {
    const caption = item.caption || item.alt || '';
    return (
      <div className="image-block w-full max-w-lg mx-auto mb-4">
        <ImageThumbnail
          src={item.url}
          alt={caption}
          onImageClick={onImageClick}
          size="default"
        />
      </div>
    );
  }
  if (isTableData(item)) {
    return renderTable(item);
  }

  const text = (item as string).trim();

  const boldOnlyMatch = text.match(/^\*\*([^*]+)\*\*$/s);
  if (boldOnlyMatch) {
    const rawContent = boldOnlyMatch[1].trim();
    const content = stripNumericPrefix(rawContent);
    const isNumbered = rawContent !== content;
    const headingClass = isNumbered ? 'subtopic-heading' : 'topic-heading';
    return (
      <p className={headingClass}>{renderMathParts(content, `heading-${content}`)}</p>
    );
  }

  if (/^\*\*[^*]+\*\*:\s*\S/.test(text)) {
    return (
      <p className="definition-line">
        {renderWithHighlights(text)}
      </p>
    );
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
    const isFloat = hasFloat || isTall;

    // Clean alt text for display - remove ALL flags
    const alt = rawAlt.replace(/\|(left|right|small|medium|large)/g, '').trim();

    // Width class
    const widthClass = isSmall
      ? "lg:w-3/12"
      : isLarge
        ? "lg:w-8/12"
        : hasFloat
          ? "lg:w-5/12"
          : isTall
            ? "lg:w-4/12 w-full max-w-sm"
            : "w-full max-w-lg"; // Centered images get max-width

    // Float class - only if |left or |right specified
    const floatClass = isLeft
      ? "lg:float-left lg:mr-12 lg:clear-left"
      : isRight
        ? "lg:float-right lg:ml-12 lg:clear-right"
        : isTall
          ? "lg:float-right lg:ml-12 lg:clear-right"
          : "mx-auto"; // Center by default

    return (
      <div className={`image-block w-full ${widthClass} ${floatClass} mb-4 ${isTall ? 'tall-image' : ''} ${isFloat ? 'float-image' : ''}`}>
        <ImageThumbnail
          src={src}
          alt={alt}
          onImageClick={onImageClick}
          align={isRight || (!isLeft && isTall) ? 'right' : isLeft ? 'left' : 'center'}
          size={isLarge ? 'large' : isSmall ? 'small' : 'default'}
          onImageLoad={(e) => {
            const { naturalWidth, naturalHeight } = e.currentTarget;
            if (naturalWidth > 0 && naturalHeight > 0) {
              setIsTall(naturalHeight / naturalWidth > 1.15);
            }
          }}
        />
      </div>
    );
  }

  // --- Visual Component: Block Math (Standalone $$) ---
  if (text.startsWith('$$')) {
    const match = text.match(/^\$\$(.*)\$\$(.*)$/s);
    const latex = match ? match[1].trim() : text.replace(/^\$\$|\$\$$/g, '');
    const tail = match ? match[2].trim() : '';
    let latexWithTail = latex;
    if (tail && /^[\.,;:]+$/.test(tail)) {
      latexWithTail = `${latex} \\text{${tail}}`;
    }
    const tableFromLatex = parseLatexArrayToTable(latex);
    if (tableFromLatex) {
      return renderTable(tableFromLatex);
    }
    return (
      <React.Suspense fallback={<div className="my-8 h-12 w-full bg-premium-glass animate-pulse"></div>}>
        <MathRenderer latex={latexWithTail} />
      </React.Suspense>
    );
  }

  // --- Visual Component: Lists ---
  if (text.match(/^([●○*-])\s/)) {
    return (
      <div className="bullet-line flex items-start gap-3 my-2 pl-2">
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

const normalizeSubsectionContent = (subsection: SubSection): ContentItem[] => {
  const result: Array<string | TableData | ImageData> = [];
  const { content, title } = subsection;
  const isFormulaTableSection = /derivate notevoli|integrali notevoli/i.test(title);
  const isFormulaBullet = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed.startsWith('*')) return false;
    const bulletBody = trimmed.replace(/^\*\s+/, '').trim();
    const plainBody = bulletBody.replace(/\*\*[^*]+\*\*/g, '').trim();
    return plainBody.startsWith('$') || plainBody.startsWith('\\');
  };

  const getFormulaColumns = (formulas: string[]) => {
    const lengths = formulas.map((formula) => {
      const raw = formula.replace(/^\$|\$$/g, '').trim();
      return estimateInlineMathLength(raw);
    });
    const longest = lengths.length ? Math.max(...lengths) : 0;
    const maxColumns = isFormulaTableSection ? 2 : 3;
    if (longest > 24) return 1;
    if (longest > 18) return Math.min(2, maxColumns);
    if (formulas.length >= 12) return Math.min(3, maxColumns);
    return Math.min(maxColumns, formulas.length);
  };

  if (isFormulaTableSection) {
    const formulas: string[] = [];
    content.forEach((item) => {
      if (typeof item !== 'string') return;
      const trimmed = item.trim();
      if (!trimmed) return;
      if (trimmed.startsWith('*')) {
        formulas.push(trimmed.replace(/^\*\s+/, '').trim());
        return;
      }
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        const latex = trimmed.slice(2, -2).trim();
        formulas.push(latex ? `$${latex}$` : trimmed);
        return;
      }
      if (trimmed.startsWith('$') && trimmed.endsWith('$')) {
        formulas.push(trimmed);
      }
    });

    if (formulas.length > 0) {
      const columns = getFormulaColumns(formulas);
      const rows: string[][] = [];
      for (let i = 0; i < formulas.length; i += columns) {
        const row = formulas.slice(i, i + columns);
        while (row.length < columns) row.push('');
        rows.push(row);
      }
      return groupCallouts([{ headers: new Array(columns).fill(''), rows }]);
    }
  }

  const formulaBulletItems = content
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
  const allBullets = formulaBulletItems.length > 0 && formulaBulletItems.every((item) => item.startsWith('*'));
  const formulaBullets = formulaBulletItems.filter(isFormulaBullet);

  if (allBullets && formulaBullets.length === formulaBulletItems.length && formulaBullets.length >= 4) {
    const formulas = formulaBullets.map((item) => item.replace(/^\*\s+/, '').trim());
    const columns = getFormulaColumns(formulas);
    const rows: string[][] = [];
    for (let i = 0; i < formulas.length; i += columns) {
      const row = formulas.slice(i, i + columns);
      while (row.length < columns) row.push('');
      rows.push(row);
    }
    return [{ headers: new Array(columns).fill(''), rows }];
  }

  let i = 0;
  while (i < content.length) {
    const item = content[i];
    if (typeof item === 'string') {
      const trimmed = item.trim();
      if (trimmed.startsWith('|')) {
        const lines: string[] = [];
        while (i < content.length && typeof content[i] === 'string' && (content[i] as string).trim().startsWith('|')) {
          lines.push((content[i] as string));
          i += 1;
        }
        const table = parsePipeTable(lines);
        if (table) {
          result.push(table);
        } else {
          const previous = result[result.length - 1];
          if (previous && isTableData(previous)) {
            const extraRows = lines.map((row) =>
              row
                .split('|')
                .map((cell) => cell.trim())
                .filter(Boolean)
            );
            const expectedColumns = previous.headers.length;
            const canAppend = extraRows.every((row) => row.length === expectedColumns);
            if (canAppend) {
              previous.rows.push(...extraRows);
            } else {
              result.push(...lines);
            }
          } else {
            result.push(...lines);
          }
        }
        continue;
      }

    }

    result.push(item);
    i += 1;
  }

  return groupCallouts(result);
};

// --- Subsections & Lightbox ---

const SubSectionDisplay: React.FC<{ subsection: SubSection; anchorId: string; subsectionIndex: number; onImageClick: (src: string, alt: string) => void }> = ({ subsection, anchorId, subsectionIndex, onImageClick }) => (
  <div id={anchorId} className="mb-8 last:mb-0">
    <h3 className="subsection-title mb-6">
      {renderMathParts(formatSubsectionTitle(subsection.title, subsectionIndex))}
    </h3>
    <div className="text-content-primary">
      {normalizeSubsectionContent(subsection).map((item, index) => (
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

  useEffect(() => {
    document.body.classList.add('lightbox-open');
    return () => document.body.classList.remove('lightbox-open');
  }, []);

  return createPortal(
    <div className="lightbox-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-bg-body/70 backdrop-blur-lg p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="max-w-5xl w-full max-h-screen flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full flex justify-center">
          <img src={src} alt={alt} className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm" />
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 p-2 rounded-full bg-bg-body/90 border border-content-primary/20 hover:bg-bg-body transition-colors"
            aria-label="Chiudi"
          >
            <X className="w-6 h-6 text-content-primary" />
          </button>
        </div>
        <p className="mt-4 text-content-primary/80 font-mono text-sm tracking-widest uppercase">
          {renderMathParts(alt, `lightbox-${alt}`)}
        </p>
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
        {renderMathParts(section.title, `section-${section.title}`)}
      </h2>

      <div className="space-y-12">
        {section.subsections.map((subsection, index) => (
          <SubSectionDisplay
            key={`${section.id}-${index}`}
            subsection={subsection}
            anchorId={`${section.id}-${index}`}
            subsectionIndex={index}
            onImageClick={(src, alt) => setLightboxImage({ src, alt })}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(SectionDisplay);
