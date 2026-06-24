import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { MainSection } from '../types';
import { Menu, X, ChevronLeft, ChevronRight, Home, Download, Search } from 'lucide-react';
import SectionDisplay from './SectionDisplay';
import LessonRail from './LessonRail';
import ThemeToggle from './ThemeToggle';
import ScrollToTopButton from './ScrollToTopButton';

// Import all course content directly - no lazy loading, instant access
import { courseContent } from '../data/courseContent-economia';
import { informaticaContent } from '../data/courseContent-informatica';
import { analisi1CourseContent } from '../data/courseContent-analisi1';
import { geometriaCourseContent } from '../data/courseContent-geometria';
import { fisicaCourseContent } from '../data/courseContent-fisica';
import { elettrotecnicaCourseContent } from '../data/courseContent-elettrotecnica';

// Direct content mapping - instant access, no async loading
const CONTENT_MAP: Record<string, MainSection[]> = {
    'economia': courseContent,
    'fondamenti-informatica': informaticaContent,
    'analisi-1': analisi1CourseContent,
    'geometria-algebra': geometriaCourseContent,
    'fisica': fisicaCourseContent,
    'elettrotecnica': elettrotecnicaCourseContent,
};

// Map subjects to theme class names
const SUBJECT_THEME_MAP: Record<string, string> = {
    'economia': 'theme-emerald',
    'fondamenti-informatica': 'theme-teal',
    'analisi-1': 'theme-math',
    'geometria-algebra': 'theme-logic',
    'fisica': 'theme-physics',
    'elettrotecnica': 'theme-silver',
    'default': 'theme-math'
};

const getPdfUrl = (slug: string) => `/pdfs/${slug}.pdf`;

const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
};

type SpotlightResult = {
    anchorId: string;
    context: string;
    lessonIndex: number;
    lessonTitle: string;
    score: number;
    subtitle: string;
    title: string;
    type: 'content' | 'subsection' | 'lesson';
};

type CourseContentItem = MainSection['subsections'][number]['content'][number];

const normalizeSearchText = (value: string) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[$*_`#>\[\](){}\\|:;,.!?+-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const stripMarkup = (value: string) => value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\$\$?([\s\S]*?)\$\$?/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const contentItemToText = (item: CourseContentItem) => {
    if (typeof item === 'string') return stripMarkup(item);
    if ('url' in item) return [item.alt, item.caption].filter(Boolean).join(' ');
    return [
        ...item.headers,
        ...item.rows.flat(),
    ].map(stripMarkup).join(' ');
};

const getContextSnippet = (text: string, query: string) => {
    const cleaned = stripMarkup(text);
    const normalizedText = normalizeSearchText(cleaned);
    const variants = getQueryVariants(query);
    const matchIndex = variants
        .map((variant) => normalizedText.indexOf(variant))
        .find((index) => index !== -1) ?? normalizedText.indexOf(normalizeSearchText(query).split(' ')[0] || '');

    if (matchIndex < 0) return cleaned.slice(0, 170);

    const start = Math.max(0, matchIndex - 70);
    const end = Math.min(cleaned.length, matchIndex + 150);
    return `${start > 0 ? '...' : ''}${cleaned.slice(start, end)}${end < cleaned.length ? '...' : ''}`;
};

const getQueryVariants = (query: string) => {
    const normalized = normalizeSearchText(query);
    const variants = new Set([normalized]);
    const numberedExercise = normalized.match(/\b(?:esercizio|exercise|domanda)\s*(\d+)\b/);

    if (numberedExercise) {
        variants.add(`esercizio ${numberedExercise[1]}`);
        variants.add(`domanda ${numberedExercise[1]}`);
        variants.add(`exercise ${numberedExercise[1]}`);
    }

    variants.add(normalized.replace(/\b(?:esercizio|exercise)\b/g, 'domanda'));
    variants.add(normalized.replace(/\bdomanda\b/g, 'esercizio'));

    return Array.from(variants).filter(Boolean);
};

const scoreTextMatch = (text: string, query: string) => {
    const normalizedText = normalizeSearchText(text);
    const variants = getQueryVariants(query);
    const bestPhraseScore = variants.reduce((best, variant) => {
        if (!variant) return best;
        const index = normalizedText.indexOf(variant);
        if (index === -1) return best;
        return Math.max(best, 100 - Math.min(index, 60));
    }, 0);

    if (bestPhraseScore > 0) return bestPhraseScore;

    const terms = normalizeSearchText(query).split(' ').filter((term) => term.length > 1);
    if (terms.length === 0) return 0;

    const matchedTerms = terms.filter((term) => {
        if (/^(esercizio|exercise)$/.test(term)) {
            return /\b(esercizio|exercise|domanda)\b/.test(normalizedText);
        }
        return normalizedText.includes(term);
    });

    return matchedTerms.length === terms.length ? 45 + matchedTerms.length * 5 : 0;
};

const getResultTitle = (text: string, fallback: string) => {
    const boldMatch = text.match(/\*\*([^*]+)\*\*/);
    if (boldMatch) return stripMarkup(boldMatch[1]).slice(0, 100);
    const cleaned = stripMarkup(text);
    return cleaned.length > 100 ? `${cleaned.slice(0, 100)}...` : cleaned || fallback;
};

const buildSpotlightResults = (content: MainSection[] | null, query: string): SpotlightResult[] => {
    if (!content || normalizeSearchText(query).length < 2) return [];

    const contentMatches: SpotlightResult[] = [];
    const titleMatches: SpotlightResult[] = [];

    content.forEach((section, lessonIndex) => {
        const lessonScore = scoreTextMatch(section.title, query);
        if (lessonScore > 0) {
            titleMatches.push({
                anchorId: section.id,
                context: section.title,
                lessonIndex,
                lessonTitle: section.title,
                score: lessonScore,
                subtitle: 'Titolo',
                title: section.title,
                type: 'lesson',
            });
        }

        section.subsections.forEach((subsection, subsectionIndex) => {
            const subsectionScore = scoreTextMatch(subsection.title, query);
            if (subsectionScore > 0) {
                titleMatches.push({
                    anchorId: `${section.id}-${subsectionIndex}`,
                    context: subsection.title,
                    lessonIndex,
                    lessonTitle: section.title,
                    score: subsectionScore,
                    subtitle: section.title,
                    title: subsection.title,
                    type: 'subsection',
                });
            }

            subsection.content.forEach((item, contentIndex) => {
                const text = contentItemToText(item);
                const score = scoreTextMatch(text, query);
                if (score <= 0) return;

                contentMatches.push({
                    anchorId: `${section.id}-${subsectionIndex}-content-${contentIndex}`,
                    context: getContextSnippet(text, query),
                    lessonIndex,
                    lessonTitle: section.title,
                    score,
                    subtitle: `${section.title} / ${subsection.title}`,
                    title: getResultTitle(typeof item === 'string' ? item : text, subsection.title),
                    type: 'content',
                });
            });
        });
    });

    const rankedContent = contentMatches
        .sort((a, b) => b.score - a.score)
        .slice(0, 18);
    const rankedTitles = titleMatches
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.max(0, 20 - rankedContent.length));

    return [...rankedContent, ...rankedTitles].slice(0, 20);
};

// Inner component that handles the specific subject logic
// We separate this so we can force a re-mount when the slug changes using the 'key' prop
// This guarantees that state (like currentLessonIndex) is reset/re-initialized correctly
const SubjectPageInner: React.FC<{ activeSlug: string }> = ({ activeSlug }) => {
    const navigate = useNavigate();
    const isPdfRenderMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('pdf');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [fontSizeLevel, setFontSizeLevel] = useState(1);
    const [isPdfPreparing, setIsPdfPreparing] = useState(false);
    const [isPrintMode, setIsPrintMode] = useState(false);
    const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
    const [spotlightQuery, setSpotlightQuery] = useState('');
    const spotlightInputRef = useRef<HTMLInputElement>(null);
    const pendingAnchorRef = useRef<string | null>(null);

    // Get content map immediately
    const content = CONTENT_MAP[activeSlug] || null;

    // Get subject metadata
    const subject = subjects.find(s => s.slug === activeSlug);

    // Initialize lesson index with lazy loader to fix reload race condition
    // Because of the key={activeSlug} in parent, this runs afresh for every subject change
    const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
        if (!activeSlug) return 0;
        const savedIndex = localStorage.getItem(`lessonIndex-${activeSlug}`);
        if (savedIndex !== null) {
            const idx = parseInt(savedIndex, 10);
            // Trust the saved index even without content check to ensure persistence works
            return !isNaN(idx) ? idx : 0;
        }
        return 0;
    });

    // Initialize TOC visibility from localStorage
    const [isTOCVisible, setIsTOCVisible] = useState(() => {
        const saved = localStorage.getItem('tocVisible');
        return saved !== null ? saved === 'true' : true;
    });

    const scrollToAnchor = useCallback((anchorId: string) => {
        window.requestAnimationFrame(() => {
            const element = document.getElementById(anchorId);
            if (!element) return;

            const headerOffset = 104;
            const targetTop = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
            element.classList.add('spotlight-target-pulse');
            window.setTimeout(() => element.classList.remove('spotlight-target-pulse'), 1800);
        });
    }, []);

    const spotlightResults = useMemo(
        () => buildSpotlightResults(content, spotlightQuery),
        [content, spotlightQuery]
    );

    // Save lesson index when it changes
    useEffect(() => {
        if (activeSlug) {
            localStorage.setItem(`lessonIndex-${activeSlug}`, String(currentLessonIndex));
        }
    }, [currentLessonIndex, activeSlug]);

    // Persist last opened subject
    useEffect(() => {
        if (activeSlug) {
            localStorage.setItem('lastSubject', activeSlug);
        }
    }, [activeSlug]);

    // Scroll to top when lesson changes, unless Spotlight is targeting a specific block.
    useEffect(() => {
        if (pendingAnchorRef.current) {
            const anchorId = pendingAnchorRef.current;
            pendingAnchorRef.current = null;
            window.setTimeout(() => scrollToAnchor(anchorId), 80);
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentLessonIndex, scrollToAnchor]);

    // Save TOC visibility to localStorage
    useEffect(() => {
        localStorage.setItem('tocVisible', String(isTOCVisible));
    }, [isTOCVisible]);

    useEffect(() => {
        if (!isSpotlightOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.setTimeout(() => spotlightInputRef.current?.focus(), 40);
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isSpotlightOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsSpotlightOpen(false);
                return;
            }

            if (event.ctrlKey && event.code === 'Space') {
                const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
                if (!isDesktop) return;
                event.preventDefault();
                setIsSpotlightOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Theme class
    const themeClass = SUBJECT_THEME_MAP[activeSlug] || 'theme-math';

    const handleNextLesson = () => {
        if (content && currentLessonIndex < content.length - 1) {
            setCurrentLessonIndex(prev => prev + 1);
        }
    };

    const handlePrevLesson = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(prev => prev - 1);
        }
    };

    const handleLessonSelect = useCallback((index: number) => {
        setCurrentLessonIndex(index);
        setIsSidebarOpen(false); // Close mobile sidebar on select
    }, []);

    const handleSpotlightSelect = useCallback((result: SpotlightResult) => {
        setIsSpotlightOpen(false);
        setSpotlightQuery('');

        if (result.lessonIndex !== currentLessonIndex) {
            pendingAnchorRef.current = result.anchorId;
            setCurrentLessonIndex(result.lessonIndex);
            return;
        }

        scrollToAnchor(result.anchorId);
    }, [currentLessonIndex, scrollToAnchor]);

    const handleDownloadPdf = useCallback(async () => {
        if (!content || isPdfPreparing) return;

        setIsPdfPreparing(true);

        const pdfUrl = getPdfUrl(activeSlug);
        try {
            const response = await fetch(pdfUrl, { method: 'HEAD', cache: 'no-store' });
            if (response.ok) {
                downloadFile(pdfUrl, `${activeSlug}.pdf`);
                setIsPdfPreparing(false);
                return;
            }
        } catch {
            // Fall back to browser print when no static PDF is deployed.
        }

        setIsPrintMode(true);

        await new Promise(requestAnimationFrame);
        window.print();
        window.setTimeout(() => {
            setIsPrintMode(false);
            setIsPdfPreparing(false);
        }, 1000);
    }, [activeSlug, content, isPdfPreparing]);

    // Subject not found
    if (!subject) {
        return (
            <div className="min-h-screen bg-[var(--bg-body)] flex items-center justify-center text-content-primary">
                <div className="text-center">
                    <p className="text-xl mb-4">Materia non trovata: {activeSlug}</p>
                    <button onClick={() => navigate('/subjects')} className="underline">Torna all'indice</button>
                </div>
            </div>
        );
    }

    const currentLesson = content ? content[currentLessonIndex] : null;

    if (isPdfRenderMode && content) {
        return (
            <div className={`subject-page ${themeClass} bg-white text-black`}>
                <div className="print-subject">
                    <h1>{subject.title}</h1>
                    {content.map((section) => (
                        <SectionDisplay
                            key={`print-${section.id}`}
                            section={section}
                            fontSizeLevel={fontSizeLevel}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`subject-page min-h-screen ${themeClass} bg-[var(--bg-body)]`}>
            {/* Desktop Header - Fixed (offset when TOC is open) */}
            <header className={`hidden lg:block fixed top-4 right-4 z-[120] pointer-events-auto ${isTOCVisible ? 'left-[calc(20rem+1rem)]' : 'left-[calc(2.5rem+1rem)]'}`}>
                <div className="flex items-center justify-between gap-4 px-2 py-1">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-1 text-content-primary hover-glow lg:hidden"
                            aria-label="Apri Indice"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Home Button */}
                        <button
                            onClick={() => navigate('/subjects')}
                            className="flex items-center gap-2 text-content-primary hover-glow"
                            aria-label="Torna alla Homepage"
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden lg:inline text-[10px] uppercase tracking-widest">
                                Home
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSpotlightOpen(true)}
                            className="hidden lg:flex items-center gap-1.5 px-2 py-1.5 border border-content-primary/10 bg-[var(--bg-body)]/50 text-content-muted hover:text-content-primary hover:border-content-primary/25 transition-colors"
                            aria-label="Cerca nei contenuti"
                            title="Ctrl + Space"
                        >
                            <Search className="w-3.5 h-3.5" />
                            <span className="spotlight-trigger-key">Ctrl</span>
                            <span className="spotlight-trigger-plus">+</span>
                            <span className="spotlight-spacebar-symbol" aria-label="Space" />
                        </button>
                        <button
                            onClick={handleDownloadPdf}
                            disabled={isPdfPreparing}
                            className="flex flex-col items-center gap-0.5 p-1 text-content-primary hover-glow disabled:opacity-50"
                            aria-label="Scarica PDF della materia"
                            title="Scarica PDF"
                        >
                            <Download className="w-4 h-4" />
                            <span className="text-[8px] font-mono uppercase tracking-widest">Scarica PDF</span>
                        </button>
                        <ThemeToggle inline />
                    </div>
                </div>
            </header>

            {isSpotlightOpen && (
                <div className="hidden lg:block fixed inset-0 z-[300] spotlight-backdrop" onClick={() => setIsSpotlightOpen(false)}>
                    <div className="spotlight-shell mx-auto mt-[15vh] w-[min(760px,calc(100vw-4rem))]" onClick={(event) => event.stopPropagation()}>
                        <div className="spotlight-command">
                            <div className="flex items-center gap-3 px-5 py-4">
                                <Search className="spotlight-icon w-5 h-5 flex-shrink-0" />
                                <input
                                    ref={spotlightInputRef}
                                    value={spotlightQuery}
                                    onChange={(event) => setSpotlightQuery(event.target.value)}
                                    placeholder="Type a command or search"
                                    className="spotlight-input w-full bg-transparent border-0 outline-none text-lg"
                                />
                                <button
                                    onClick={() => setIsSpotlightOpen(false)}
                                    className="spotlight-close p-1 transition-colors"
                                    aria-label="Chiudi ricerca"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="spotlight-panel mt-5 overflow-hidden">
                            <div className="spotlight-results-scroll max-h-[52vh] overflow-y-auto">
                                {spotlightQuery.trim().length < 2 ? (
                                    <div className="spotlight-muted px-5 py-8 text-sm">
                                        Minimo 2 caratteri.
                                    </div>
                                ) : spotlightResults.length > 0 ? (
                                    <div className="spotlight-divider divide-y">
                                        {spotlightResults.map((result, index) => (
                                            <button
                                                key={`${result.anchorId}-${index}`}
                                                onClick={() => handleSpotlightSelect(result)}
                                                className="spotlight-result w-full px-5 py-3.5 text-left transition-colors"
                                            >
                                                <div className="min-w-0">
                                                    <div className="spotlight-title text-sm font-medium line-clamp-1">
                                                        {result.title}
                                                    </div>
                                                    <div className="spotlight-meta mt-1 text-[10px] font-mono uppercase tracking-widest line-clamp-1">
                                                        {result.subtitle}
                                                    </div>
                                                    <div className="spotlight-context mt-1.5 text-xs leading-relaxed line-clamp-2">
                                                        {result.context}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="spotlight-muted px-5 py-12 text-center text-sm">
                                        Nessun contenuto trovato.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-md lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Left Sidebar - Fixed */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen z-[100] bg-white dark:bg-black lg:bg-transparent !opacity-100 shadow-xl lg:shadow-none pointer-events-auto
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${(isTOCVisible || isSidebarOpen) ? 'w-[92vw] max-w-sm lg:w-80' : 'w-0 lg:w-10'}
                `}
            >
                {/* TOC Toggle - Fixed position, separate from scroll container */}
                <button
                    onClick={() => setIsTOCVisible(!isTOCVisible)}
                    className={`hidden lg:flex items-center justify-center text-content-primary absolute z-20 hover-glow ${isTOCVisible
                        ? 'top-1/2 right-0 -translate-y-1/2 w-12 h-12'
                        : 'top-1/2 left-0 -translate-y-1/2 w-10 h-10'
                        }`}
                    title={isTOCVisible ? "Nascondi Indice" : "Mostra Indice"}
                    aria-pressed={isTOCVisible}
                    aria-label={isTOCVisible ? "Nascondi Indice" : "Mostra Indice"}
                >
                    {isTOCVisible ? (
                        <ChevronLeft className="w-5 h-5" strokeWidth={3} />
                    ) : (
                        <ChevronRight className="w-5 h-5" strokeWidth={3} />
                    )}
                </button>

                {/* Scrollable Content Container */}
                {(isTOCVisible || isSidebarOpen) && (
                    <div
                        className="h-full overflow-y-auto no-scrollbar overscroll-contain pt-14 sm:pt-20 pl-4 pr-10 sm:pl-6 sm:pr-12 pointer-events-auto relative z-10 bg-white dark:bg-black lg:bg-transparent"
                    >
                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden absolute top-4 right-4 z-20"
                        >
                            <X className="w-5 h-5 text-content-muted" />
                        </button>

                        <LessonRail
                            content={content}
                            activeLessonIndex={currentLessonIndex}
                            onLessonSelect={handleLessonSelect}
                            subjectTitle={subject.title}
                        />
                    </div>
                )}
            </aside>

            {/* Main Content Area */}
            <main
                className={`min-h-screen ${isTOCVisible ? 'lg:ml-80' : 'lg:ml-10'} flex flex-col items-center pt-0 sm:pt-2 lg:pt-28 pb-16 ${isSidebarOpen ? 'blur-sm pointer-events-none lg:blur-none lg:pointer-events-auto' : ''}`}
            >
                <div
                    className="course-content w-full mx-auto box-border px-4 sm:px-6 md:px-16"
                >
                    {/* Mobile Sticky Header - Inside course content */}
                    <div className="lg:hidden sticky top-0 z-[80] py-2">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-1 text-content-primary hover-glow"
                                    aria-label="Apri Indice"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={() => navigate('/subjects')}
                                    className="flex items-center gap-2 text-content-primary hover-glow"
                                    aria-label="Torna alla Homepage"
                                >
                                    <Home className="w-4 h-4" />
                                    <span className="hidden lg:inline text-[10px] uppercase tracking-widest">
                                        Home
                                    </span>
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isPdfPreparing}
                                    className="flex flex-col items-center gap-0.5 p-1 text-content-primary hover-glow disabled:opacity-50"
                                    aria-label="Scarica PDF della materia"
                                    title="Scarica PDF"
                                >
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline text-[8px] font-mono uppercase tracking-widest">Scarica PDF</span>
                                </button>
                                <ThemeToggle inline />
                            </div>
                        </div>
                    </div>
                    {currentLesson ? (
                        <>
                            <SectionDisplay
                                key={currentLesson.id}
                                section={currentLesson}
                                fontSizeLevel={fontSizeLevel}
                            />

                            {/* Navigation Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-12 pt-8 border-t border-content-primary/10 gap-12">
                                <div className="w-full sm:w-auto">
                                    {currentLessonIndex > 0 && content && (
                                        <button
                                            onClick={handlePrevLesson}
                                            className="w-full sm:w-auto flex items-center gap-2 px-2 py-2 transition-opacity text-content-primary group text-left hover:opacity-70"
                                        >
                                            <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="text-xs text-content-muted uppercase tracking-wider mb-1">Precedente</span>
                                                <span className="text-sm font-bold text-wrap text-left whitespace-normal group-hover-glow">{content[currentLessonIndex - 1].title}</span>
                                            </div>
                                        </button>
                                    )}
                                </div>

                                <div className="w-full sm:w-auto flex justify-end">
                                    {content && currentLessonIndex < content.length - 1 && (
                                        <button
                                            onClick={handleNextLesson}
                                            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-2 py-2 transition-opacity text-content-primary group text-right hover:opacity-70"
                                        >
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs opacity-70 uppercase tracking-wider mb-1">Prossimo</span>
                                                <span className="text-sm font-bold text-wrap text-right whitespace-normal group-hover-glow">{content[currentLessonIndex + 1].title}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="lg:hidden">
                                <ScrollToTopButton />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="text-4xl mb-4">🚧</div>
                            <h2 className="text-xl text-content-primary mb-2">Contenuto in arrivo</h2>
                            <p className="text-sm text-content-muted">Questa sezione non è ancora disponibile.</p>
                        </div>
                    )}
                </div>
            </main>

            {isPrintMode && content && (
                <div className="print-subject">
                    <h1>{subject.title}</h1>
                    {content.map((section) => (
                        <SectionDisplay
                            key={`print-${section.id}`}
                            section={section}
                            fontSizeLevel={fontSizeLevel}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Subjects that are blocked from direct URL access (incomplete content)
const BLOCKED_SUBJECTS = [
    'analisi-2',
    'architettura-os',
    'logica-algebra',
    'elettromagnetismo',
    'probabilita-statistica',
    'segnali-comunicazioni',
    'algoritmi',
    'elettronica',
    'sistemi-informativi',
    'basi-dati-1',
    'reti-logiche',
    'ingegneria-software',
    'internet',
];

const SubjectPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    // Determine active slug
    let activeSlug = slug;
    if (!activeSlug && location.pathname === '/economia') {
        activeSlug = 'economia';
    }
    activeSlug = activeSlug || '';

    // Block access to incomplete subjects - redirect to homepage
    useEffect(() => {
        if (BLOCKED_SUBJECTS.includes(activeSlug)) {
            navigate('/subjects', { replace: true });
        }
    }, [activeSlug, navigate]);

    // Don't render if blocked (will redirect)
    if (BLOCKED_SUBJECTS.includes(activeSlug)) {
        return null;
    }

    // Use Key to force remount on slug change
    return <SubjectPageInner key={activeSlug} activeSlug={activeSlug} />;
};

export default SubjectPage;
