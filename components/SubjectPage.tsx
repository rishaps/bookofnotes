import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { MainSection } from '../types';
import { Menu, X, ChevronLeft, ChevronRight, Home, Sun, Moon } from 'lucide-react';
import SectionDisplay from './SectionDisplay';
import LessonRail from './LessonRail';

// Import all course content directly - no lazy loading, instant access
import { courseContent } from '../data/courseContent-economia';
import { informaticaContent } from '../data/courseContent-informatica';
import { analisi1CourseContent } from '../data/courseContent-analisi1';
import { geometriaCourseContent } from '../data/courseContent-geometria';
import { fisicaCourseContent } from '../data/courseContent-fisica';

// Direct content mapping - instant access, no async loading
const CONTENT_MAP: Record<string, MainSection[]> = {
    'economia': courseContent,
    'fondamenti-informatica': informaticaContent,
    'analisi-1': analisi1CourseContent,
    'geometria-algebra': geometriaCourseContent,
    'fisica': fisicaCourseContent,
};

// Map subjects to theme class names
const SUBJECT_THEME_MAP: Record<string, string> = {
    'economia': 'theme-emerald',
    'fondamenti-informatica': 'theme-teal',
    'analisi-1': 'theme-math',
    'geometria-algebra': 'theme-logic',
    'fisica': 'theme-physics',
    'default': 'theme-math'
};

// Inner component that handles the specific subject logic
// We separate this so we can force a re-mount when the slug changes using the 'key' prop
// This guarantees that state (like currentLessonIndex) is reset/re-initialized correctly
const SubjectPageInner: React.FC<{ activeSlug: string }> = ({ activeSlug }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [fontSizeLevel, setFontSizeLevel] = useState(1);

    // Get content map immediately
    const content = CONTENT_MAP[activeSlug] || null;

    // Get subject metadata
    const subject = subjects.find(s => s.slug === activeSlug);

    // Initialize theme from localStorage - fixed logic
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark') return true;
        if (savedTheme === 'light') return false;
        return systemDark;
    });

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

    // Sync Theme Effect
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        if (isDark) {
            setIsDark(false);
            localStorage.setItem('theme', 'light');
        } else {
            setIsDark(true);
            localStorage.setItem('theme', 'dark');
        }
    };

    // Save lesson index when it changes
    useEffect(() => {
        if (activeSlug) {
            localStorage.setItem(`lessonIndex-${activeSlug}`, String(currentLessonIndex));
        }
    }, [currentLessonIndex, activeSlug]);

    // Scroll to top when lesson changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentLessonIndex]);

    // Save TOC visibility to localStorage
    useEffect(() => {
        localStorage.setItem('tocVisible', String(isTOCVisible));
    }, [isTOCVisible]);

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

    return (
        <div className={`subject-page min-h-screen ${themeClass} bg-[var(--bg-body)]`}>

            {/* Theme Toggle - Fixed top right */}
            <button
                onClick={toggleTheme}
                className="fixed top-4 right-4 z-[110] p-2 text-content-primary hover-glow"
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Navigation Header - Fixed at top */}
            <div className="fixed top-0 left-0 w-full h-16 bg-[var(--bg-body)] z-[50] lg:hidden flex items-center px-4">
                <div className="flex items-center gap-2">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-content-primary hover-glow"
                        aria-label="Apri Indice"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Mobile Home Button */}
                    <button
                        onClick={() => navigate('/subjects')}
                        className="p-2 text-content-primary hover-glow"
                        aria-label="Torna alla Homepage"
                    >
                        <Home className="w-6 h-6" />
                    </button>

                    {/* Active Subject Title on Header */}
                    <span className="ml-2 text-[10px] uppercase tracking-widest font-bold text-content-secondary line-clamp-1">
                        {subject.title}
                    </span>
                </div>
            </div>

            {/* Left Sidebar - Fixed */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen z-[100] bg-[var(--bg-body)] !opacity-100 shadow-xl lg:shadow-none
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${isTOCVisible ? 'w-80' : 'w-10'}
                `}
            >
                {/* Home Button - Fixed position at top, separate from scroll container */}
                <button
                    onClick={() => navigate('/subjects')}
                    className="hidden lg:flex items-center justify-center w-10 h-10 text-content-muted absolute top-4 left-0 z-20 hover:opacity-75 transition-colors hover-glow"
                    title="Torna alla Homepage"
                >
                    <Home className="w-5 h-5" />
                </button>

                {/* TOC Toggle - Fixed position, separate from scroll container */}
                <button
                    onClick={() => setIsTOCVisible(!isTOCVisible)}
                    className={`hidden lg:flex items-center justify-center w-12 h-12 text-content-primary absolute z-20 hover-glow ${isTOCVisible
                        ? 'top-1/2 right-0 -translate-y-1/2'
                        : 'top-1/2 left-0 -translate-y-1/2 w-12'
                        }`}
                    title={isTOCVisible ? "Nascondi Indice" : "Mostra Indice"}
                >
                    {isTOCVisible ? <ChevronLeft className="w-6 h-6" strokeWidth={3} /> : <ChevronRight className="w-6 h-6" strokeWidth={3} />}
                </button>

                {/* Scrollable Content Container */}
                {isTOCVisible && (
                    <div
                        className="h-full overflow-y-auto no-scrollbar"
                        style={{ paddingTop: '56px', paddingLeft: '24px', paddingRight: '48px' }}
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
                className={`min-h-screen ${isTOCVisible ? 'lg:ml-80' : 'lg:ml-10'} flex flex-col items-center`}
                style={{ paddingTop: '40px', paddingBottom: '60px' }}
            >
                <div
                    className="course-content w-full mx-auto box-border px-8 md:px-16"
                >
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
                                            className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 rounded-lg border border-content-primary/20 hover:bg-content-primary/5 transition-colors text-content-primary group text-left"
                                        >
                                            <ChevronLeft className="w-4 h-4 flex-shrink-0 group-hover-glow" />
                                            <div className="flex flex-col">
                                                <span className="text-xs text-content-muted uppercase tracking-wider mb-1">Lezione Precedente</span>
                                                <span className="text-sm font-bold text-wrap text-left whitespace-normal group-hover-glow">{content[currentLessonIndex - 1].title}</span>
                                            </div>
                                        </button>
                                    )}
                                </div>

                                <div className="w-full sm:w-auto flex justify-end">
                                    {content && currentLessonIndex < content.length - 1 && (
                                        <button
                                            onClick={handleNextLesson}
                                            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-6 py-3 rounded-lg bg-content-primary text-[var(--bg-body)] font-medium hover:opacity-90 transition-opacity group text-right"
                                        >
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs opacity-70 uppercase tracking-wider mb-1">Prossima Lezione</span>
                                                <span className="text-sm font-bold text-wrap text-right whitespace-normal group-hover-glow">{content[currentLessonIndex + 1].title}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 flex-shrink-0 group-hover-glow" />
                                        </button>
                                    )}
                                </div>
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
        </div>
    );
};

// Subjects that are blocked from direct URL access (incomplete content)
const BLOCKED_SUBJECTS = [
    'elettrotecnica',
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
