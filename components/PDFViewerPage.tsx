import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import ThemeToggle from './ThemeToggle';
import { Menu, X, ChevronRight, ChevronLeft, Home, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

// Set up PDF.js worker - use unpkg which has proper CORS headers
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

// Import CSS for react-pdf annotations
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFViewerPageProps {
    pdfUrl: string;
    title: string;
    subtitle?: string;
    year: string;
    themeClass?: string;
    chapters?: Array<{
        title: string;
        startPage: number;
    }>;
}

const PDFViewerPage: React.FC<PDFViewerPageProps> = ({
    pdfUrl,
    title,
    subtitle,
    year,
    themeClass = 'theme-physics',
    chapters = []
}) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleLinkClick = useCallback(() => setIsSidebarOpen(false), []);

    // PDF Document loaded
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setIsLoading(false);
    };

    // Page navigation
    const goToPage = (page: number) => {
        if (page >= 1 && page <= (numPages || 1)) {
            setPageNumber(page);
            setIsSidebarOpen(false);
        }
    };

    const goToPreviousPage = () => goToPage(pageNumber - 1);
    const goToNextPage = () => goToPage(pageNumber + 1);

    // Zoom controls
    const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setIsScrolled(currentScroll > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update progress based on page
    useEffect(() => {
        if (numPages) {
            setScrollProgress(Math.round((pageNumber / numPages) * 100));
        }
    }, [pageNumber, numPages]);

    // Clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPreviousPage();
            if (e.key === 'ArrowRight') goToNextPage();
            if (e.key === '+' || e.key === '=') zoomIn();
            if (e.key === '-') zoomOut();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pageNumber, numPages]);

    // Generate chapter index if not provided
    const displayChapters = chapters.length > 0 ? chapters : [
        { title: 'Capitolo 1: Vettori', startPage: 1 },
        { title: 'Capitolo 2: Cinematica', startPage: 7 },
        { title: 'Capitolo 3: Dinamica', startPage: 31 },
        { title: 'Capitolo 4: Lavoro ed Energia', startPage: 56 },
        { title: 'Capitolo 5: Quantità di Moto', startPage: 78 },
        { title: 'Capitolo 6: Momento Angolare', startPage: 95 },
        { title: 'Capitolo 7: Meccanica dei Fluidi', startPage: 115 },
        { title: 'Capitolo 8: Onde', startPage: 140 },
        { title: 'Capitolo 9: Termodinamica', startPage: 170 },
        { title: 'Capitolo 10: Elettrostatica', startPage: 200 },
    ];

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
                            <span>Pagina {pageNumber} / {numPages || '...'}</span>
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

                    {/* Chapter Index */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-4 lg:px-0 py-4">
                        <nav className="space-y-1">
                            <div className="font-serif text-sm text-premium-gold mb-4 uppercase tracking-widest">
                                Indice Capitoli
                            </div>
                            {displayChapters.map((chapter, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToPage(chapter.startPage)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200
                                        ${pageNumber >= chapter.startPage && (idx === displayChapters.length - 1 || pageNumber < displayChapters[idx + 1].startPage)
                                            ? 'bg-premium-gold/20 text-premium-gold font-medium'
                                            : 'text-content-secondary hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-content-primary'
                                        }`}
                                >
                                    <span className="font-mono text-xs opacity-60 mr-2">p.{chapter.startPage}</span>
                                    {chapter.title}
                                </button>
                            ))}

                            {/* Page Jump */}
                            <div className="mt-6 pt-4 border-t border-premium-gray/20">
                                <div className="text-xs font-mono uppercase text-content-muted tracking-widest mb-2">
                                    Vai a Pagina
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min={1}
                                        max={numPages || 1}
                                        value={pageNumber}
                                        onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                                        className="w-16 px-2 py-1 text-sm bg-premium-gray/10 border border-premium-gray/30 rounded text-content-primary text-center"
                                    />
                                    <span className="text-content-muted text-sm">/ {numPages || '...'}</span>
                                </div>
                            </div>
                        </nav>
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

                        {/* Zoom Control */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase text-content-muted tracking-widest">Zoom</span>
                            <div className="flex items-center gap-1 bg-premium-gray/10 rounded-lg p-1">
                                <button
                                    onClick={zoomOut}
                                    className="p-1 hover:text-premium-gold transition-colors text-content-secondary"
                                    title="Riduci zoom"
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-mono text-content-muted px-2">{Math.round(scale * 100)}%</span>
                                <button
                                    onClick={zoomIn}
                                    className="p-1 hover:text-premium-gold transition-colors text-content-secondary"
                                    title="Aumenta zoom"
                                >
                                    <ZoomIn className="w-4 h-4" />
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

                {/* Main Content Area - PDF Viewer */}
                <main className="flex-1 min-w-0 pb-20">
                    <div className="flex flex-col items-center max-w-4xl mx-auto">

                        {/* Navigation Controls */}
                        <div className="sticky top-16 z-40 w-full bg-[var(--bg-body)]/95 backdrop-blur-sm py-3 px-4 mb-4 flex items-center justify-between gap-4 border-b border-premium-gray/20">
                            <button
                                onClick={goToPreviousPage}
                                disabled={pageNumber <= 1}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all
                                    ${pageNumber <= 1
                                        ? 'text-content-muted/50 cursor-not-allowed'
                                        : 'text-content-primary hover:bg-premium-gold/20 hover:text-premium-gold'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Precedente</span>
                            </button>

                            <div className="flex items-center gap-3">
                                <span className="font-mono text-sm text-content-secondary">
                                    Pagina <span className="text-premium-gold font-bold">{pageNumber}</span> di {numPages || '...'}
                                </span>
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 text-content-muted hover:text-premium-gold transition-colors"
                                    title="Schermo intero"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={pageNumber >= (numPages || 1)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all
                                    ${pageNumber >= (numPages || 1)
                                        ? 'text-content-muted/50 cursor-not-allowed'
                                        : 'text-content-primary hover:bg-premium-gold/20 hover:text-premium-gold'
                                    }`}
                            >
                                <span className="hidden sm:inline">Successiva</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* PDF Document */}
                        <div className="w-full flex justify-center bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="w-12 h-12 border-4 border-premium-gold/30 border-t-premium-gold rounded-full animate-spin mb-4"></div>
                                    <p className="text-content-muted font-mono text-sm">Caricamento PDF...</p>
                                </div>
                            )}
                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading=""
                                error={
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="text-4xl mb-4">📄</div>
                                        <h2 className="font-serif text-xl text-content-primary mb-2">Errore caricamento PDF</h2>
                                        <p className="text-sm text-content-muted">Impossibile caricare il documento.</p>
                                    </div>
                                }
                                className="pdf-document"
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    className="pdf-page"
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                    loading=""
                                />
                            </Document>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="w-full mt-6 flex items-center justify-between gap-4">
                            <button
                                onClick={goToPreviousPage}
                                disabled={pageNumber <= 1}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono text-sm transition-all border
                                    ${pageNumber <= 1
                                        ? 'border-premium-gray/20 text-content-muted/50 cursor-not-allowed'
                                        : 'border-premium-gold/30 text-content-primary hover:bg-premium-gold/10 hover:border-premium-gold'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Pagina Precedente
                            </button>

                            <button
                                onClick={goToNextPage}
                                disabled={pageNumber >= (numPages || 1)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono text-sm transition-all border
                                    ${pageNumber >= (numPages || 1)
                                        ? 'border-premium-gray/20 text-content-muted/50 cursor-not-allowed'
                                        : 'border-premium-gold/30 text-content-primary hover:bg-premium-gold/10 hover:border-premium-gold'
                                    }`}
                            >
                                Pagina Successiva
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
};

export default PDFViewerPage;
