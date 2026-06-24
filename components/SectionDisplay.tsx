import React, { useState, useEffect } from 'react';
import katex from 'katex';
import { ImageData, MainSection, SubSection, TableData } from '../types';
import { Check, Copy, Search, X, ZoomIn, Info } from 'lucide-react';
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

const getCodeBlockMeta = (language: string, code: string) => {
  const normalizedLanguage = language.trim().toLowerCase();
  const normalizedCode = code.trim();

  if (normalizedLanguage === 'text' || normalizedLanguage === 'txt') {
    return null;
  }

  if (!normalizedLanguage) {
    const looksLikeCode = /[#{};]|=>|->|::|\b(return|int|double|class|for|while|if|else|switch|template|const|void|include|std)\b/.test(normalizedCode);
    if (!looksLikeCode) return null;
  }

  const labelMap: Record<string, string> = {
    c: 'C',
    cpp: 'C++',
    cxx: 'C++',
    h: 'C/C++',
    hpp: 'C++',
    js: 'JavaScript',
    jsx: 'React JSX',
    ts: 'TypeScript',
    tsx: 'React TSX',
    python: 'Python',
    py: 'Python',
    bash: 'Shell',
    sh: 'Shell',
    shell: 'Shell',
    prolog: 'Prolog',
    lisp: 'Lisp',
  };

  return {
    label: labelMap[normalizedLanguage] || (normalizedLanguage ? normalizedLanguage.toUpperCase() : 'Codice'),
    isCopyable: normalizedCode.length > 0,
  };
};

const CODE_KEYWORDS = new Set([
  'alignas', 'alignof', 'asm', 'auto', 'break', 'case', 'catch', 'class', 'concept',
  'const', 'constexpr', 'consteval', 'constinit', 'continue', 'decltype', 'default',
  'delete', 'do', 'else', 'enum', 'explicit', 'export', 'extern', 'for', 'friend',
  'goto', 'if', 'inline', 'mutable', 'namespace', 'new', 'noexcept', 'operator',
  'private', 'protected', 'public', 'requires', 'return', 'sizeof', 'static', 'struct',
  'switch', 'template', 'this', 'throw', 'try', 'typedef', 'typename', 'using',
  'virtual', 'volatile', 'while', 'import', 'from', 'def', 'lambda', 'yield', 'await',
  'async', 'function', 'let', 'const', 'var', 'extends', 'implements', 'interface',
]);

const CODE_TYPES = new Set([
  'bool', 'char', 'char16_t', 'char32_t', 'double', 'float', 'int', 'long', 'short',
  'signed', 'unsigned', 'void', 'wchar_t', 'size_t', 'string', 'std', 'ostream',
  'istream', 'ifstream', 'ofstream', 'vector', 'set', 'map', 'list', 'queue', 'stack',
  'true', 'false', 'nullptr', 'None', 'True', 'False', 'null', 'undefined',
]);

const getTokenClass = (word: string, rest: string) => {
  if (CODE_KEYWORDS.has(word)) return 'hl-keyword';
  if (CODE_TYPES.has(word)) return 'hl-type';
  if (/^\s*\(/.test(rest)) return 'hl-function';
  return '';
};

const renderCodeTokens = (code: string) => {
  const nodes: React.ReactNode[] = [];
  const lines = code.split('\n');
  let key = 0;
  let inBlockComment = false;

  const push = (value: string, className = '') => {
    if (!value) return;
    nodes.push(className
      ? <span key={`tok-${key++}`} className={className}>{value}</span>
      : <React.Fragment key={`tok-${key++}`}>{value}</React.Fragment>
    );
  };

  lines.forEach((line, lineIndex) => {
    let index = 0;

    if (!inBlockComment && /^\s*#/.test(line)) {
      push(line, 'hl-preprocessor');
      if (lineIndex < lines.length - 1) push('\n');
      return;
    }

    while (index < line.length) {
      const rest = line.slice(index);

      if (inBlockComment) {
        const end = rest.indexOf('*/');
        if (end === -1) {
          push(rest, 'hl-comment');
          index = line.length;
          continue;
        }
        push(rest.slice(0, end + 2), 'hl-comment');
        index += end + 2;
        inBlockComment = false;
        continue;
      }

      if (rest.startsWith('//')) {
        push(rest, 'hl-comment');
        break;
      }

      if (rest.startsWith('/*')) {
        const end = rest.indexOf('*/', 2);
        if (end === -1) {
          push(rest, 'hl-comment');
          inBlockComment = true;
          break;
        }
        push(rest.slice(0, end + 2), 'hl-comment');
        index += end + 2;
        continue;
      }

      const quote = line[index];
      if (quote === '"' || quote === "'") {
        let end = index + 1;
        while (end < line.length) {
          if (line[end] === '\\') {
            end += 2;
            continue;
          }
          if (line[end] === quote) {
            end += 1;
            break;
          }
          end += 1;
        }
        push(line.slice(index, end), 'hl-string');
        index = end;
        continue;
      }

      const numberMatch = rest.match(/^(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/);
      if (numberMatch) {
        push(numberMatch[0], 'hl-number');
        index += numberMatch[0].length;
        continue;
      }

      const wordMatch = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
      if (wordMatch) {
        const word = wordMatch[0];
        push(word, getTokenClass(word, rest.slice(word.length)));
        index += word.length;
        continue;
      }

      const operatorMatch = rest.match(/^(::|->|=>|==|!=|<=|>=|\+\+|--|&&|\|\||[{}()[\];,.<>+\-*/%=&|!?:~])/);
      if (operatorMatch) {
        push(operatorMatch[0], 'hl-operator');
        index += operatorMatch[0].length;
        continue;
      }

      push(line[index]);
      index += 1;
    }

    if (lineIndex < lines.length - 1) push('\n');
  });

  return nodes;
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = '' }) => {
  const [copied, setCopied] = useState(false);
  const meta = getCodeBlockMeta(language, code);

  if (!meta) {
    return (
      <pre className="content-code-block content-code-block-plain">
        <code>{code}</code>
      </pre>
    );
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="terminal-code-block">
      <div className="terminal-code-bar">
        <span className="terminal-code-label">{meta.label}</span>
        <button
          type="button"
          className="terminal-copy-button"
          onClick={copyCode}
          aria-label="Copia codice"
          title="Copia codice"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="content-code-block terminal-code-pre">
        <code>{renderCodeTokens(code)}</code>
      </pre>
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
  inlineContent?: string;
  items: Array<string | TableData | ImageData | CalloutBlock>;
};

type ContentItem = string | TableData | ImageData | CalloutBlock;

const isCalloutBlock = (item: ContentItem): item is CalloutBlock => {
  return typeof item === 'object' && item !== null && 'kind' in item && (item as CalloutBlock).kind === 'callout';
};

const splitPipeCells = (row: string) => {
  const cells: string[] = [];
  let current = '';
  let inMath = false;

  for (let index = 0; index < row.length; index += 1) {
    const char = row[index];
    const previous = row[index - 1];
    if (char === '$' && previous !== '\\') {
      if (row[index + 1] === '$') {
        inMath = !inMath;
        current += '$$';
        index += 1;
      } else {
        inMath = !inMath;
        current += char;
      }
      continue;
    }
    if (char === '|' && !inMath) {
      cells.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }

  cells.push(current.trim());

  const trimmedRow = row.trim();
  if (!trimmedRow.startsWith('|') && cells[0] === '') {
    cells.shift();
  }
  if (trimmedRow.endsWith('|') && cells[cells.length - 1] === '') {
    cells.pop();
  }
  return cells;
};

const parsePipeTable = (lines: string[]): TableData | null => {
  if (lines.length < 2) return null;
  const cleaned = lines.map((line) => line.trim()).filter(Boolean);
  if (cleaned.length < 2) return null;

  const headerCells = splitPipeCells(cleaned[0]);

  let rowStartIndex = 1;
  if (cleaned[1].includes('---')) {
    rowStartIndex = 2;
  }

  const rows = cleaned.slice(rowStartIndex).map(splitPipeCells);

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
  const hasSeparator = /^.{0,48}:/.test(rest) || /^.{0,48}\s-\s/.test(rest);
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
          inlineContent: callout.inlineContent || undefined,
          items: [],
        };

        pushItem(block);

        const shouldStayOpen = !callout.inlineContent;
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
      const blockParts = text.split(/(\$\$[\s\S]*?\$\$)/g);

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

        const latexEnvironmentPattern = /(\\begin\{(?:align\*?|aligned|equation\*?|gather\*?|multline\*?)\}[\s\S]*?\\end\{(?:align\*?|aligned|equation\*?|gather\*?|multline\*?)\})/g;
        const environmentParts = part.split(latexEnvironmentPattern);
        const renderedInlineParts: React.ReactNode[] = [];

        environmentParts.forEach((environmentPart, environmentIndex) => {
          if (/^\\begin\{(?:align\*?|aligned|equation\*?|gather\*?|multline\*?)\}/.test(environmentPart)) {
            renderedInlineParts.push(
              <React.Suspense
                key={`${keyPrefix}-env-${environmentIndex}`}
                fallback={<span className="inline-math-container inline-block h-6 w-full animate-pulse" />}
              >
                <MathRenderer latex={environmentPart} inline />
              </React.Suspense>
            );
            return;
          }

          // 2. Split by Inline Math $...$ inside text blocks
          const inlineParts = environmentPart.split(/(\$[^$]+\$)/g);
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
                    key={`${keyPrefix}-inline-${environmentIndex}-${iIdx}`}
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
                    key={`${keyPrefix}-inline-${environmentIndex}-${iIdx}`}
                    className="inline-math-container"
                  >
                    <span className="inline-math px-1" dangerouslySetInnerHTML={{ __html: html }} />
                  </span>
                );
              } catch (e) {
                renderedInlineParts.push(
                  <span key={`${environmentIndex}-${iIdx}`} className="text-red-500 font-mono text-xs">{latex}</span>
                );
              }
              continue;
            }
            renderedInlineParts.push(<span key={`${environmentIndex}-${iIdx}`}>{subPart}</span>);
          }
        });
        return (
          <span key={`${keyPrefix}-text-${bIdx}`}>
            {renderedInlineParts}
          </span>
        );
      })}
    </>
  );
};

const renderTextWithLinks = (value: string, keyPrefix: string) => {
  const parts = value.split(/(\[[^\]]+\]\(<[^>]+>\)|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\((?:<([^>]+)>|([^)]+))\)$/);
    if (!match) {
      return (
        <React.Fragment key={`${keyPrefix}-text-${index}`}>
          {renderMathParts(part, `${keyPrefix}-text-${index}`)}
        </React.Fragment>
      );
    }
    const href = match[2] || match[3];
    return (
      <a
        key={`${keyPrefix}-link-${index}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-content-accent underline underline-offset-2 hover:opacity-80"
      >
        {renderMathParts(match[1], `${keyPrefix}-link-${index}`)}
      </a>
    );
  });
};

const renderWithHighlights = (value: string) => {
  if (!value) return null;
  const normalizedValue = value.replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF]/g, '');

  return (
    <>
      {(() => {
        const codeBlockPattern = /```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g;
        const segments: Array<{ type: 'text' | 'code'; value: string; language?: string }> = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = codeBlockPattern.exec(normalizedValue))) {
          if (match.index > lastIndex) {
            segments.push({ type: 'text', value: normalizedValue.slice(lastIndex, match.index) });
          }
          segments.push({ type: 'code', value: match[2], language: match[1] });
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < normalizedValue.length) {
          segments.push({ type: 'text', value: normalizedValue.slice(lastIndex) });
        }

        return segments.map((segment, segmentIndex) => {
          if (segment.type === 'code') {
            const cleaned = segment.value.replace(/^\n/, '').replace(/\n$/, '');
            return <CodeBlock key={`code-${segmentIndex}`} code={cleaned} language={segment.language} />;
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
                    {renderTextWithLinks(part, `plain-${segmentIndex}-${index}`)}
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
                <th key={index} className={`p-3 font-bold text-content-primary border-r border-content-primary/20 last:border-r-0 text-sm uppercase tracking-wider ${isFormulaTable || index === 0 ? 'text-center w-1/3' : 'text-left'}`}>
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
                <td key={cellIndex} className={`p-3 text-content-primary ${isFormulaTable || cellIndex === 0 ? 'text-center w-1/3' : 'text-left'}`}>
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
    const hasInline = Boolean(item.inlineContent);
    const calloutLabelStyle: React.CSSProperties = {
      position: 'static',
      transform: 'none',
    };
    return (
      <div className={`callout-box my-6 ${hasInline ? 'callout-inline' : ''}`}>
        {hasInline ? (
          <div className="callout-inline-row">
            <span className="callout-label" style={calloutLabelStyle}>
              {renderMathParts(item.label, `callout-${item.label}`)}
            </span>
            <div className="callout-inline-content">
              {renderWithHighlights(item.inlineContent || '')}
            </div>
          </div>
        ) : (
          <span className="callout-label" style={calloutLabelStyle}>
            {renderMathParts(item.label, `callout-${item.label}`)}
          </span>
        )}
        {(item.items.length > 0) && (
          <div className={`callout-content ${hasInline ? 'callout-inline-body' : ''}`}>
            {item.items.map((entry, index) => (
              <ContentRenderer key={`${item.label}-${index}`} item={entry} onImageClick={onImageClick} />
            ))}
          </div>
        )}
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

  const codeBlockMatch = text.match(/^```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```$/);
  if (codeBlockMatch) {
    const language = codeBlockMatch[1];
    const cleaned = codeBlockMatch[2].replace(/\n$/, '');
    return <CodeBlock code={cleaned} language={language} />;
  }

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
      <div className="definition-line">
        {renderWithHighlights(text)}
      </div>
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
    const isFloat = hasFloat;

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
          ? "w-full max-w-sm"
          : "w-full max-w-lg"; // Centered images get max-width

    // Float class - only if |left or |right specified
    const floatClass = isLeft
      ? "lg:float-left lg:mr-12 lg:clear-left"
      : isRight
        ? "lg:float-right lg:ml-12 lg:clear-right"
        : "mx-auto"; // Center by default

    return (
      <div className={`image-block w-full ${widthClass} ${floatClass} mb-4 ${isTall ? 'tall-image' : ''} ${isFloat ? 'float-image' : ''}`}>
        <ImageThumbnail
          src={src}
          alt={alt}
          onImageClick={onImageClick}
          align={isRight ? 'right' : isLeft ? 'left' : 'center'}
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
    <div className="text-content-primary mb-4 leading-relaxed text-lg font-light">
      {renderWithHighlights(text)}
    </div>
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
      const looksLikeTableRow = (value: string) => {
        if (value.startsWith('![') || value.startsWith('```') || value.startsWith('$$')) return false;
        const cells = splitPipeCells(value);
        if (cells.length < 2) return false;
        if (value.includes('---|') || value.includes('|---')) return true;
        const hasMarkdownLink = /\[[^\]]+\]\(<[^>]+>\)|\[[^\]]+\]\([^)]+\)/.test(value);
        if (/\\begin\{|\\\[/.test(value) || (/\\\(/.test(value) && !hasMarkdownLink)) return false;
        return /\s\|\s|\s\||\|\s/.test(value);
      };
      if (looksLikeTableRow(trimmed)) {
        const lines: string[] = [];
        while (i < content.length && typeof content[i] === 'string' && looksLikeTableRow((content[i] as string).trim())) {
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
              splitPipeCells(row)
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

const SubSectionDisplay: React.FC<{ subsection: SubSection; anchorId: string; subsectionIndex: number; hideTitle?: boolean; onImageClick: (src: string, alt: string) => void }> = ({ subsection, anchorId, subsectionIndex, hideTitle = false, onImageClick }) => (
  <div id={anchorId} className="mb-8 last:mb-0">
    {!hideTitle && (
      <h3 className="subsection-title mb-6">
        {renderMathParts(formatSubsectionTitle(subsection.title, subsectionIndex))}
      </h3>
    )}
    <div className="text-content-primary">
      {normalizeSubsectionContent(subsection).map((item, index) => (
        <div
          key={index}
          id={`${anchorId}-content-${index}`}
          className="scroll-mt-28 transition-colors duration-500"
        >
          <ContentRenderer item={item} onImageClick={onImageClick} />
        </div>
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
            hideTitle={section.subsections.length === 1 && /^panoramica$/i.test(subsection.title.trim())}
            onImageClick={(src, alt) => setLightboxImage({ src, alt })}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(SectionDisplay);
