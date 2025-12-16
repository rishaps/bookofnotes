import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { subjects } from '../data/subjects';
// Content loaded dynamically via utils/contentLoader
import { MainSection } from '../types';
import { loadContent, getCachedContent } from '../utils/contentLoader';
import ThemeToggle from './ThemeToggle';
import { Menu, X, ChevronRight, BookOpen, Clock, ChevronDown } from 'lucide-react';
import SectionDisplay from './SectionDisplay';

// Lazy-load the sidebar to prevent blocking initial paint
const LessonRail = React.lazy(() => import('./LessonRail'));

// Map subjects to theme class names defined in index.css
const SUBJECT_THEME_MAP: Record<string, string> = {
    'economia': 'theme-emerald',               // Emerald & Finance
    'elementi-informatica': 'theme-teal',      // Teal & Copper
    'fondamenti-informatica': 'theme-teal',    // Teal & Copper
    'calcolatori-elettronici': 'theme-teal',   // Teal & Copper
    'analisi-1': 'theme-math',                 // Classic Math (B&W)
    'analisi-matematica-1': 'theme-math',      // Classic Math (B&W)
    'analisi-matematica-2': 'theme-math',      // Classic Math (B&W)
    'algebra-lineare': 'theme-logic',          // Deep Indigo
    'geometria-algebra': 'theme-logic', // Deep Indigo
    'fisica-generale-1': 'theme-blue',         // Royal Blue
    'fisica-generale-2': 'theme-blue',         // Royal Blue
    'algoritmi-strutture-dati': 'theme-crimson',// Crimson Red
    'chimica': 'theme-stats',                  // Yellow/Graphite (reused stats for contrast)
    'automazione': 'theme-bronze',             // Sepia/Bronze
    'ingegneria-software': 'theme-silver',     // Monochrome/Silver
    'statistica': 'theme-stats',               // Yellow/Graphite
    'sistemi-operativi': 'theme-teal',         // Teal/Terminal

    // Fallback defaults
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
    const [visibleSections, setVisibleSections] = useState(2); // Start with just 2 sections for instant render
    const [showSidebar, setShowSidebar] = useState(false); // Defer sidebar render

    useEffect(() => {
        // Reset visible sections when subject changes
        setVisibleSections(2);
    }, [activeSlug]);

    // Infinite Scroll / Lazy Loading
    // Instead of auto-loading everything, we load more as the user scrolls down
    useEffect(() => {
        if (!content || visibleSections >= content.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    // Load just 1 more section at a time to keep frame rate high
                    setVisibleSections((prev) => Math.min(prev + 1, content.length));
                }
            },
            { threshold: 0.1, rootMargin: '200px' } // Load slightly before reaching bottom
        );

        const sentinel = document.getElementById('scroll-sentinel');
        if (sentinel) {
            observer.observe(sentinel);
        }

        return () => observer.disconnect();
    }, [content, visibleSections]);

    useEffect(() => {
        // If we already have cached content, skip fetching
        if (cachedContent) {
            setContent(cachedContent);
            setIsLoading(false);
            // Defer sidebar after content is painted
            requestAnimationFrame(() => setShowSidebar(true));
            return;
        }

        const fetchContent = async () => {
            setIsLoading(true);
            const data = await loadContent(activeSlug);
            setContent(data);
            setIsLoading(false);
            // Defer sidebar after content is painted
            requestAnimationFrame(() => setShowSidebar(true));
        };

        fetchContent();
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[var(--bg-body)] text-content-primary p-8 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-premium-gold/30 border-t-premium-gold rounded-full animate-spin mb-6"></div>
                <h1 className="text-2xl font-serif text-premium-gold mb-2">{subject.title}</h1>
                <p className="text-content-muted">Caricamento appunti...</p>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen bg-[var(--bg-body)] text-content-primary p-8 flex flex-col items-center justify-center">
                <button onClick={() => navigate('/subjects')} className="absolute top-8 left-8 text-content-muted hover:text-content-primary flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Torna
                </button>
                <div className="text-6xl mb-6">🚧</div>
                <h1 className="text-3xl font-serif text-premium-gold mb-4">{subject.title}</h1>
                <p className="text-content-muted">Contenuto in arrivo...</p>
            </div>
        );
    }

    return (
        // Apply the theme class to the wrapper.
        // This will redefine the CSS variables (--bg-body, --premium-gold, etc.) for all children.
        <div className={`min-h-screen transition-colors duration-300 ${themeClass} bg-[var(--bg-body)]`}>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-body)]/90 backdrop-blur-md h-16 transition-colors duration-300 border-b border-premium-gray">
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
                        <div className="hidden sm:flex text-xs font-mono text-premium-gold px-2 py-1 items-center gap-4">
                            <span>{subject.year}</span>
                            <ThemeToggle inline={true} />
                        </div>
                    </div>
                </div>
            </header>



            <div className="max-w-7xl mx-auto pt-20 px-4 relative z-10">
                {/* Sidebar (TOC) - Deferred for performance */}
                {showSidebar && (
                    <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 bg-premium-dark lg:bg-transparent lg:fixed lg:left-8 lg:top-32 lg:bottom-10 lg:w-64 lg:z-40 pt-20 lg:pt-0 pb-8 h-screen lg:h-auto`}>
                        <div className="px-6 lg:px-0 h-full overflow-y-auto custom-scrollbar">
                            <Suspense fallback={<div className="text-sm text-content-muted p-4">Caricamento indice...</div>}>
                                <LessonRail content={content} onLinkClick={handleLinkClick} className="" />
                            </Suspense>
                        </div>
                    </aside>
                )}

                {/* Sidebar Overlay (Mobile) */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 min-w-0 pb-20 lg:ml-80">
                    <div className="flex flex-col gap-10 md:gap-12 max-w-4xl">
                        {content.slice(0, visibleSections).map((section) => (
                            <SectionDisplay key={section.id} section={section} />
                        ))}
                        {/* Placeholder for remaining content to reserve scroll space (optional, but keeps scrollbar stable-ish) */}
                        {/* Sentinel for Infinite Scroll */}
                        {visibleSections < content.length && (
                            <div id="scroll-sentinel" className="h-20 w-full flex items-center justify-center p-4">
                                <div className="w-6 h-6 border-2 border-premium-gold/30 border-t-premium-gold rounded-full animate-spin" />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SubjectPage;
