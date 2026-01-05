import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
    latex: string;
    inline?: boolean;
}

const MULTILINE_MIN_LENGTH = 170;
const TARGET_LINE_LENGTH = 130;

const normalizeLatex = (latex: string) => latex.replace(/\s+/g, ' ').trim();

const estimateVisualLength = (latex: string) => {
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

const extractTrailingTag = (latex: string) => {
    const match = latex.match(/\\tag\{[^}]+\}\s*$/);
    if (!match) return { body: latex, tag: '' };
    return {
        body: latex.slice(0, match.index).trim(),
        tag: match[0].trim(),
    };
};

const splitAtTopLevelOperators = (latex: string, operators: string[]): string[] => {
    const commandOperators = new Set(operators.filter((op) => op.startsWith('\\')));
    const charOperators = new Set(operators.filter((op) => !op.startsWith('\\')));
    const parts: string[] = [];
    let current = '';
    let depth = 0;

    for (let i = 0; i < latex.length; i++) {
        const ch = latex[i];

        if (ch === '\\') {
            let command = '\\';
            if (i + 1 < latex.length) {
                let j = i + 1;
                command += latex[j];
                if (/[A-Za-z]/.test(latex[j])) {
                    while (j + 1 < latex.length && /[A-Za-z]/.test(latex[j + 1])) {
                        j += 1;
                        command += latex[j];
                    }
                }
                i = j;
            }

            if (depth === 0 && commandOperators.has(command)) {
                if (!current.trim()) {
                    current += command;
                    continue;
                }
                current += command;
                parts.push(current.trim());
                current = '';
                continue;
            }

            current += command;
            continue;
        }

        if (ch === '{' || ch === '(' || ch === '[') depth += 1;
        if (ch === '}' || ch === ')' || ch === ']') depth = Math.max(0, depth - 1);

        if (depth === 0 && charOperators.has(ch)) {
            if (!current.trim()) {
                current += ch;
                continue;
            }
            current += ch;
            parts.push(current.trim());
            current = '';
            continue;
        }

        current += ch;
    }

    if (current.trim()) parts.push(current.trim());
    return parts.length ? parts : [latex.trim()];
};

/**
 * Smart formula preprocessor
 * - Breaks long formulas after top-level operators (=, +, -, /, \cdot, \times, \div)
 * - Creates multi-line aligned equations
 */
const preprocessFormula = (latex: string): string => {
    if (latex.includes('\\begin{') || latex.includes('\\end{') || latex.includes('\\\\')) {
        return latex;
    }

    const { body, tag } = extractTrailingTag(latex);
    const normalized = normalizeLatex(body);
    const visualLength = estimateVisualLength(normalized);

    if (visualLength < MULTILINE_MIN_LENGTH) {
        return latex;
    }

    const parts = splitAtTopLevelOperators(normalized, ['=', '+', '-', '/', '\\cdot', '\\times', '\\div']);
    let processed = '';

    if (parts.length >= 2) {
        const lines: string[] = [];
        let currentLine = '';

        parts.forEach((part) => {
            if (!currentLine) {
                currentLine = part;
                return;
            }

            const candidate = `${currentLine} ${part}`.trim();
            if (estimateVisualLength(candidate) > TARGET_LINE_LENGTH) {
                lines.push(currentLine.trim());
                currentLine = part;
            } else {
                currentLine = candidate;
            }
        });

        if (currentLine.trim()) {
            lines.push(currentLine.trim());
        }

        if (lines.length > 1) {
            processed = `\\begin{aligned}\n${lines.map((line) => `& ${line}`).join(' \\\\\n')}\n\\end{aligned}`;
        }
    }

    if (!processed) {
        return latex;
    }

    return tag ? `${processed} ${tag}` : processed;
};

const MathRenderer: React.FC<MathRendererProps> = ({ latex, inline = false }) => {
    const processedLatex = preprocessFormula(latex);

    let html: string;
    try {
        html = katex.renderToString(processedLatex, {
            throwOnError: false,
            displayMode: true,
            strict: false,
            trust: true,
        });
    } catch (e) {
        // Fallback - render original without preprocessing
        html = katex.renderToString(latex, {
            throwOnError: false,
            displayMode: true,
            strict: false,
        });
    }

    const Wrapper: React.ElementType = inline ? 'span' : 'div';
    const containerClass = inline ? 'math-container math-container-inline' : 'math-container';
    const usesMultiline = processedLatex.includes('\\begin{aligned}');
    const containerClassName = usesMultiline ? `${containerClass} math-container-multiline` : containerClass;

    return (
        <Wrapper className={containerClassName}>
            <span
                className="math-scroll-wrapper"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </Wrapper>
    );
};

export default MathRenderer;
