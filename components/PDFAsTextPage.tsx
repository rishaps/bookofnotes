import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import ThemeToggle from './ThemeToggle';
import { Menu, X, ChevronRight, Home } from 'lucide-react';
import LessonRail from './LessonRail';
import SectionDisplay from './SectionDisplay';
import { MainSection } from '../types';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PDFAsTextPageProps {
    pdfUrl: string;
    title: string;
    year: string;
    themeClass?: string;
    chapters?: Array<{
        title: string;
        startPage: number;
        endPage?: number;
    }>;
}

interface ExtractedPage {
    pageNumber: number;
    text: string;
    items: Array<{
        str: string;
        transform: number[];
        width: number;
        height: number;
        fontName: string;
    }>;
}

const PDFAsTextPage: React.FC<PDFAsTextPageProps> = ({
    pdfUrl,
    title,
    year,
    themeClass = 'theme-physics',
    chapters = []
}) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [extractedPages, setExtractedPages] = useState<ExtractedPage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [fontSizeLevel, setFontSizeLevel] = useState(1);

    const handleLinkClick = useCallback(() => setIsSidebarOpen(false), []);

    // Extract text from PDF
    useEffect(() => {
        const extractTextFromPDF = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const loadingTask = pdfjs.getDocument(pdfUrl);
                const pdf = await loadingTask.promise;
                const totalPages = pdf.numPages;
                const pages: ExtractedPage[] = [];

                for (let i = 1; i <= totalPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();

                    const items = textContent.items
                        .filter((item): item is any => 'str' in item)
                        .map((item: any) => ({
                            str: item.str,
                            transform: item.transform,
                            width: item.width,
                            height: item.height,
                            fontName: item.fontName || ''
                        }));

                    // Combine text items into lines based on Y position
                    const text = items.map((item: any) => item.str).join(' ');

                    pages.push({
                        pageNumber: i,
                        text,
                        items
                    });

                    setLoadingProgress(Math.round((i / totalPages) * 100));
                }

                setExtractedPages(pages);
                setIsLoading(false);
            } catch (err) {
                console.error('Error extracting PDF text:', err);
                setError('Errore nel caricamento del PDF');
                setIsLoading(false);
            }
        };

        extractTextFromPDF();
    }, [pdfUrl]);

    // Convert extracted pages to MainSection format for LessonRail and SectionDisplay
    const content: MainSection[] = useMemo(() => {
        if (extractedPages.length === 0) return [];

        // Group pages into chapters
        const defaultChapters = chapters.length > 0 ? chapters : [
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
        ];

        return defaultChapters.map((chapter, idx) => {
            const endPage = chapter.endPage || (defaultChapters[idx + 1]?.startPage - 1) || extractedPages.length;
            const chapterPages = extractedPages.filter(
                p => p.pageNumber >= chapter.startPage && p.pageNumber <= endPage
            );

            // Process text to create proper content blocks
            const processText = (pages: ExtractedPage[]): string[] => {
                const contentBlocks: string[] = [];

                pages.forEach(page => {
                    // Group items by Y position to form lines
                    const lineMap = new Map<number, string[]>();

                    page.items.forEach(item => {
                        // Round Y position to group items on same line
                        const y = Math.round(item.transform[5]);
                        if (!lineMap.has(y)) {
                            lineMap.set(y, []);
                        }
                        lineMap.get(y)!.push(item.str);
                    });

                    // Sort by Y position (descending - PDF coordinates start from bottom)
                    const sortedLines = Array.from(lineMap.entries())
                        .sort((a, b) => b[0] - a[0])
                        .map(([, words]) => words.join(' ').trim())
                        .filter(line => line.length > 0);

                    // Join lines into paragraphs
                    let currentParagraph: string[] = [];
                    sortedLines.forEach((line, i) => {
                        currentParagraph.push(line);

                        // Check if this might be end of paragraph (empty line, or big gap would be detected differently)
                        if (line.endsWith('.') || line.endsWith(':') || i === sortedLines.length - 1) {
                            const paragraph = currentParagraph.join(' ').trim();
                            if (paragraph.length > 0) {
                                contentBlocks.push(paragraph);
                            }
                            currentParagraph = [];
                        }
                    });

                    if (currentParagraph.length > 0) {
                        contentBlocks.push(currentParagraph.join(' ').trim());
                    }
                });

                return contentBlocks;
            };

            const contentStrings = processText(chapterPages);

            return {
                id: `chapter-${idx + 1}`,
                title: chapter.title,
                subsections: [{
                    title: `Pagine ${chapter.startPage}-${endPage}`,
                    content: contentStrings.length > 0 ? contentStrings : ['Contenuto in caricamento...']
                }]
            };
        });
    }, [extractedPages, chapters]);

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setIsScrolled(currentScroll > 50);
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? Math.round((currentScroll / totalHeight) * 100) : 0;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) {
        return (
            <div className={`min-h-screen ${themeClass} bg-[var(--bg-body)] flex flex-col items-center justify-center`}>
                <div className="w-16 h-16 border-4 border-premium-gold/30 border-t-premium-gold rounded-full animate-spin mb-6"></div>
                <h2 className="font-serif text-xl text-content-primary mb-2">Caricamento Appunti...</h2>
                <p className="text-content-muted font-mono text-sm">{loadingProgress}% completato</p>
                <div className="w-64 h-2 bg-premium-gray/20 rounded-full mt-4 overflow-hidden">
                    <div
                        className="h-full bg-premium-gold transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                    />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen ${themeClass} bg-[var(--bg-body)] flex flex-col items-center justify-center`}>
                <div className="text-4xl mb-4">❌</div>
                <h2 className="font-serif text-xl text-content-primary mb-2">{error}</h2>
                <button
                    onClick={() => navigate('/subjects')}
                    className="text-premium-gold underline mt-4"
                >
                    Torna all'indice
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClass} bg-[var(--bg-body)]`}>

            {/* Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
                           ${isScrolled
                        ? '-translate-y-full opacity-0 pointer-events-none'
                        : 'h-16 bg-[var(--bg-body)]/90 backdrop-blur-md border-b border-premium-gray translate-y-0 opacity-100'}`}
            >
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-content-primary">
                            <Menu className="w-6 h-6" />
                        </button>
                        <button onClick={() => navigate('/subjects')} className="flex items-center gap-2 text-content-primary font-serif font-bold tracking-tight hover:opacity-80 transition-opacity">
                            <ChevronRight className="w-5 h-5 rotate-180" />
                            <span className="hidden sm:inline">Indice</span>
                        </button>
                        <h1 className="text-lg font-serif font-bold text-content-primary line-clamp-1">
                            <span className="text-premium-gold italic mr-2">{title.split(' ')[0]}</span>
                            {title.split(' ').slice(1).join(' ')}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex text-xs font-mono text-premium-gold items-center gap-3">
                            <span>{year}</span>
                            <div className="w-px h-3 bg-premium-gray mx-1" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto pt-20 lg:pt-24 px-4 flex flex-col lg:flex-row gap-8 relative">

                {/* Sidebar Overlay (Mobile) */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-[55] bg-black/50 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
                        fixed inset-y-0 left-0 z-[60] w-72 bg-white dark:bg-black border-r border-premium-gray/30 transform transition-transform duration-300 ease-in-out
                        lg:translate-x-0 lg:static lg:w-72 lg:h-[calc(100vh-8rem)] lg:sticky lg:top-24 lg:border-r-0 lg:bg-transparent lg:z-auto
                        flex flex-col
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    {/* Sidebar Header (Mobile Only) */}
                    <div className="lg:hidden p-4 border-b border-premium-gray/20 flex justify-between items-center">
                        <span className="font-serif text-premium-gold">Indice</span>
                        <button onClick={() => setIsSidebarOpen(false)}><X className="text-content-muted" /></button>
                    </div>

                    {/* Lesson Rail */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-4 lg:px-0 py-4">
                        <LessonRail content={content} onLinkClick={handleLinkClick} />
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 mt-auto border-t border-premium-gray/20 space-y-4 bg-[var(--bg-body)] lg:bg-transparent">

                        {/* Home Button */}
                        <button
                            onClick={() => navigate('/subjects')}
                            className="flex items-center gap-2 text-content-muted hover:text-premium-gold transition-colors w-full"
                        >
                            <Home className="w-4 h-4" />
                            <span className="text-xs font-mono uppercase tracking-widest">Torna a Homepage</span>
                        </button>

                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase text-content-muted tracking-widest">Tema</span>
                            <ThemeToggle inline={true} />
                        </div>

                        {/* Font Size Control */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase text-content-muted tracking-widest">Dimensione Testo</span>
                            <div className="flex items-center gap-1 bg-premium-gray/10 rounded-lg p-1">
                                <button
                                    onClick={() => setFontSizeLevel(Math.max(0, fontSizeLevel - 1))}
                                    className={`p-1 hover:text-premium-gold transition-colors ${fontSizeLevel === 0 ? 'text-content-muted/50 cursor-not-allowed' : 'text-content-secondary'}`}
                                    disabled={fontSizeLevel === 0}
                                    title="Riduci carattere"
                                >
                                    <span className="text-xs font-bold">A</span>
                                </button>
                                <div className="w-px h-3 bg-premium-gray/30"></div>
                                <button
                                    onClick={() => setFontSizeLevel(Math.min(2, fontSizeLevel + 1))}
                                    className={`p-1 hover:text-premium-gold transition-colors ${fontSizeLevel === 2 ? 'text-content-muted/50 cursor-not-allowed' : 'text-content-secondary'}`}
                                    disabled={fontSizeLevel === 2}
                                    title="Aumenta carattere"
                                >
                                    <span className="text-lg font-bold">A</span>
                                </button>
                            </div>
                        </div>

                        {/* Progress & Clock */}
                        <div className="flex items-center justify-between pt-2 border-t border-premium-gray/10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono uppercase text-content-muted tracking-widest">Lettura</span>
                                <span className="text-sm font-mono font-bold text-premium-gold">{scrollProgress}%</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-mono uppercase text-content-muted tracking-widest text-right">Ora Locale</span>
                                <div className="flex items-center gap-2 text-content-secondary font-mono text-sm">
                                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </div>
                            </div>
                        </div>

                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 pb-20">
                    <div className="flex flex-col gap-10 md:gap-12 max-w-4xl mx-auto">
                        {content.map((section) => (
                            <SectionDisplay
                                key={section.id}
                                section={section}
                                fontSizeLevel={fontSizeLevel}
                            />
                        ))}
                    </div>
                </main>

            </div>
        </div>
    );
};

export default PDFAsTextPage;
