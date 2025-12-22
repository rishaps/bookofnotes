
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { MainSection } from '../types';
import { loadContent, getCachedContent } from '../utils/contentLoader';
import ThemeToggle from './ThemeToggle';
import { Menu, X, ChevronRight, BookOpen, Clock, ChevronDown, Home } from 'lucide-react';
import SectionDisplay from './SectionDisplay';
import LessonRail from './LessonRail'; // Static import for instant load

// Map subjects to theme class names defined in index.css
const SUBJECT_THEME_MAP: Record<string, string> = {
    'economia': 'theme-emerald',
    'elementi-informatica': 'theme-teal',
    'fondamenti-informatica': 'theme-teal',
    'calcolatori-elettronici': 'theme-teal',
    'analisi-1': 'theme-math',
    'analisi-matematica-1': 'theme-math',
    'analisi-matematica-2': 'theme-math',
    'algebra-lineare': 'theme-logic',
    'geometria-algebra': 'theme-logic',
    'fisica-generale-1': 'theme-blue',
    'fisica-generale-2': 'theme-blue',
    'algoritmi-strutture-dati': 'theme-crimson',
    'chimica': 'theme-stats',
    'automazione': 'theme-bronze',
    'ingegneria-software': 'theme-silver',
    'statistica': 'theme-stats',
    'sistemi-operativi': 'theme-teal',
    'default': 'theme-math'
};

const SubjectPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLinkClick = useCallback(() => setIsSidebarOpen(false), []);

    // Determine active slug: handle explicit param OR implicit path
    let activeSlug = slug;
    if (!activeSlug && location.pathname === '/economia') {
        activeSlug = 'economia';
    }
    activeSlug = activeSlug || '';

    // Resolve Subject Metadata
    const subject = subjects.find(s => s.slug === activeSlug);

    // Try to get instantly from cache first (for prefetched content)
    const cachedContent = getCachedContent(activeSlug);
    const [content, setContent] = useState<MainSection[] | null>(cachedContent);
    const [isLoading, setIsLoading] = useState(!cachedContent);

    // Progressive Rendering: Render all immediately as per user request
    const [renderedCount, setRenderedCount] = useState(1000); // Start sufficiently high to show all
    const [isScrolled, setIsScrolled] = useState(false); // Header minimization state

    // New Features State
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [fontSizeLevel, setFontSizeLevel] = useState(1); // 0: Small, 1: Medium (Default), 2: Large

    // Scroll Listener for Header & Progress
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setIsScrolled(currentScroll > 50);

            // Calculate Progress
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? Math.round((currentScroll / totalHeight) * 100) : 0;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Clock Interval
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    /* Progressive rendering effect removed to ensure instant full load */

    useEffect(() => {
        if (cachedContent) {
            setContent(cachedContent);
            setIsLoading(false);
            return;
        }

        let isMounted = true;
        const fetchContent = async () => {
            setIsLoading(true);

            // Safety timeout to prevent infinite loading
            const timeoutPromise = new Promise<null>(resolve => setTimeout(() => resolve(null), 5000));

            try {
                const data = await Promise.race([loadContent(activeSlug), timeoutPromise]);
                if (isMounted) {
                    setContent(data); // If timeout wins, data is null
                    setIsLoading(false);
                }
            } catch (e) {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchContent();

        return () => { isMounted = false; };
    }, [activeSlug, cachedContent]);

    // Resolve Theme Class
    const themeClass = SUBJECT_THEME_MAP[activeSlug] || 'theme-math';

    if (!subject) {
        return (
            <div className="min-h-screen bg-[var(--bg-body)] flex items-center justify-center text-content-primary">
                <div className="text-center">
                    <p className="text-xl mb-4">Materia non trovata: {activeSlug}</p>
                    <button onClick={() => navigate('/subjects')} className="text-premium-gold underline">Torna all'indice</button>
                </div>
            </div>
        );
    }

    // Custom Initials Map
    const SUBJECT_INITIALS: Record<string, string> = {
        'economia': 'EOA',
        'elementi-informatica': 'EI',
        'fondamenti-informatica': 'FDI',
        'calcolatori-elettronici': 'CEL',
        'analisi-1': 'AM1',
        'analisi-matematica-1': 'AM1',
        'analisi-matematica-2': 'AM2',
        'algebra-lineare': 'AL',
        'geometria-algebra': 'GAL',
        'fisica-generale-1': 'FG1',
        'fisica-generale-2': 'FG2',
        'algoritmi-strutture-dati': 'ASD',
        'chimica': 'CHI',
        'automazione': 'AUT',
        'ingegneria-software': 'IS',
        'statistica': 'STA',
        'sistemi-operativi': 'SO',
    };

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
                            <span className="text-premium-gold italic mr-2">{subject.title.split(' ')[0]}</span>
                            {subject.title.split(' ').slice(1).join(' ')}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex text-xs font-mono text-premium-gold items-center gap-3">
                            <span>{subject.year}</span>
                            <div className="w-px h-3 bg-premium-gray mx-1" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Side Dock Navigation - Desktop (Visible on Scroll) */}
            <div
                className={`hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6
                           p-3 rounded-2xl bg-[var(--bg-body)]/80 backdrop-blur-md border border-premium-gray/50 shadow-2xl
                           transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                           ${isScrolled ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0 pointer-events-none'}`}
            >
                <div
                    title={subject.title}
                    className="w-10 h-10 rounded-full bg-premium-gold/10 flex items-center justify-center 
                             text-xs font-serif font-bold text-premium-gold border border-premium-gold/20 cursor-default"
                >
                    {SUBJECT_INITIALS[activeSlug] || subject.title.substring(0, 2).toUpperCase()}
                </div>

                <div className="w-8 h-px bg-premium-gray/50" />

                <button
                    onClick={() => navigate('/subjects')}
                    className="p-2 text-content-muted hover:text-premium-gold transition-colors hover:scale-110 active:scale-95 duration-200"
                    title="Torna alla Home"
                >
                    <Home className="w-5 h-5" />
                </button>

                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-content-muted hover:text-premium-gold transition-colors hover:scale-110 active:scale-95 duration-200 lg:hidden"
                    title="Indice"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Main Layout: Flexbox for sticky sidebar */}
            <div className="max-w-7xl mx-auto pt-20 lg:pt-24 px-4 flex flex-col lg:flex-row gap-8 relative">

                {/* Sidebar Overlay (Mobile) */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-[55] bg-black/50 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Component */}
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

                    {/* Lesson Rail (Scrollable) */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-4 lg:px-0 py-4">
                        <LessonRail content={content} onLinkClick={handleLinkClick} />
                    </div>

                    {/* Sidebar Footer Controls */}
                    <div className="p-4 mt-auto border-t border-premium-gray/20 space-y-4 bg-[var(--bg-body)] lg:bg-transparent">

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
                <main className="flex-1 min-w-0 pb-20 optimize-gpu">
                    <div className="flex flex-col gap-10 md:gap-12 max-w-4xl mx-auto">
                        {content ? (
                            content.slice(0, renderedCount).map((section) => (
                                <SectionDisplay
                                    key={section.id}
                                    section={section}
                                    // @ts-ignore - SectionDisplay needs to be updated to accept this prop
                                    fontSizeLevel={fontSizeLevel}
                                />
                            ))
                        ) : isLoading ? (
                            /* Non-intrusive Loading State inside layout */
                            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                <div className="w-8 h-8 border-2 border-content-primary border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-sm font-mono uppercase tracking-widest text-content-muted">Caricamento...</p>
                            </div>
                        ) : (
                            /* Not Found / Empty State inside layout */
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="text-4xl mb-4">🚧</div>
                                <h2 className="font-serif text-xl text-content-primary mb-2">Contenuto in arrivo</h2>
                                <p className="text-sm text-content-muted">Questa sezione non è ancora disponibile.</p>
                            </div>
                        )}
                    </div>
                </main>

            </div>
        </div>
    );
};

export default SubjectPage;
