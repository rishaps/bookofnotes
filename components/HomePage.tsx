
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjects, Subject } from '../data/subjects';
import { prefetchContent } from '../utils/contentLoader';
import ThemeToggle from './ThemeToggle';

// Subjects with completed notes
const completedSubjects = ['analisi-1', 'fondamenti-informatica', 'economia', 'geometria-algebra'];

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);


    // Check if subject notes are completed
    const isCompleted = (slug: string) => completedSubjects.includes(slug);

    // Group by year
    const groupedSubjects = {
        'Year 1': subjects.filter(s => s.year === 'Year 1'),
        'Year 2': subjects.filter(s => s.year === 'Year 2'),
        'Year 3': subjects.filter(s => s.year === 'Year 3'),
    };

    const handleSubjectClick = (subject: Subject) => {
        prefetchContent(subject.slug); // Start prefetching immediately
        setSelectedSubject(subject);
    };

    const handleEnterSubject = () => {
        if (selectedSubject) {
            navigate(selectedSubject.slug === 'economia' ? '/economia' : `/${selectedSubject.slug}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (selectedSubject && e.key === 'Enter') {
            handleEnterSubject();
        }
        if (e.key === 'Escape' && selectedSubject) {
            setSelectedSubject(null);
            setImageLoaded(false);
        }
    };

    const getYearLabel = (year: string) => {
        const labels = { 'Year 1': 'Primo Anno', 'Year 2': 'Secondo Anno', 'Year 3': 'Terzo Anno' };
        return labels[year as keyof typeof labels] || year;
    };

    return (
        <div
            className="min-h-screen bg-[var(--bg-body)] text-content-primary transition-colors duration-500"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Theme Toggle */}
            <ThemeToggle />

            {selectedSubject ? (
                /* Podium View - When a subject is selected */
                <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
                    {/* Image with loading state */}
                    <div className="relative">
                        {!imageLoaded && (
                            <div className="h-[55vh] aspect-[2/3] rounded-2xl bg-premium-black/5 
                                            flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-premium-gold/10 
                                                border-t-premium-gold/40 rounded-full animate-spin" />
                            </div>
                        )}
                        <img
                            src={selectedSubject.image}
                            alt={selectedSubject.title}
                            onLoad={() => setImageLoaded(true)}
                            className={`h-[55vh] w-auto rounded-2xl shadow-2xl cursor-pointer 
                                       hover:scale-[1.01] transition-all duration-300
                                       ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0'}`}
                            onClick={handleEnterSubject}
                        />
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl text-content-primary mt-6 text-center">
                        {selectedSubject.title}
                    </h2>
                    <span className="text-sm text-content-muted mt-1">
                        {getYearLabel(selectedSubject.year)}
                    </span>

                    {imageLoaded ? (
                        <>
                            <button
                                onClick={handleEnterSubject}
                                className="mt-6 px-8 py-3 bg-content-primary text-[var(--bg-body)] 
                                           font-medium rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
                            >
                                Apri Appunti
                            </button>
                        </>
                    ) : (
                        <div className="mt-6 px-8 py-3 text-black/30 dark:text-white/30 text-sm">
                            Caricamento...
                        </div>
                    )}

                    <button
                        onClick={() => { setSelectedSubject(null); setImageLoaded(false); }}
                        className="mt-4 text-sm text-content-muted hover:text-content-primary"
                    >
                        ← Torna indietro
                    </button>
                </div>
            ) : (
                /* Three Column Layout with Title */
                <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
                    {/* Title */}
                    <h1 className="font-serif text-4xl md:text-5xl text-content-primary mb-8 md:mb-10 tracking-tight">
                        Book of Notes
                    </h1>

                    {/* Three Column Grid */}
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {(['Year 1', 'Year 2', 'Year 3'] as const).map((year) => {
                            const yearSubjects = groupedSubjects[year];

                            return (
                                <div
                                    key={year}
                                    className="bg-premium-dark/80 backdrop-blur-sm rounded-xl 
                                               border border-premium-gold/10 
                                               shadow-lg overflow-hidden"
                                >
                                    {/* Year Header */}
                                    <div className="px-5 py-3 border-b border-premium-black/10 sticky top-0 z-10 bg-inherit backdrop-blur-md">
                                        <h2 className="text-xs font-bold text-content-muted 
                                                       uppercase tracking-[0.15em] text-center">
                                            {getYearLabel(year)}
                                        </h2>
                                    </div>

                                    {/* Subject List */}
                                    <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                                        {yearSubjects.map((subject) => (
                                            <button
                                                key={subject.slug}
                                                onClick={() => { setImageLoaded(false); handleSubjectClick(subject); }}
                                                onMouseEnter={() => prefetchContent(subject.slug)}
                                                className="w-full px-5 py-3 flex items-center justify-between text-left
                                                           hover:bg-premium-gold/5
                                                           transition-colors duration-150 group"
                                            >
                                                {/* Subject Name & Status */}
                                                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                                    <span className="text-[15px] text-content-primary/80 
                                                                     group-hover:text-content-primary
                                                                     transition-colors truncate">
                                                        {subject.title}
                                                    </span>
                                                    {/* Status Badge */}
                                                    {isCompleted(subject.slug) ? (
                                                        <span className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full
                                                                         bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100
                                                                         border border-green-200 dark:border-green-800">
                                                            Completato
                                                        </span>
                                                    ) : subject.slug === 'geometria-algebra' ? (
                                                        <span className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full
                                                                         bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100
                                                                         border border-yellow-200 dark:border-yellow-800">
                                                            In Corso
                                                        </span>
                                                    ) : (
                                                        <span className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full
                                                                         bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100
                                                                         border border-red-200 dark:border-red-800">
                                                            Da Fare
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Arrow */}
                                                <svg
                                                    className="w-4 h-4 text-black/15 dark:text-white/15 shrink-0 ml-2
                                                               group-hover:text-black/40 dark:group-hover:text-white/40
                                                               group-hover:translate-x-0.5 transition-all"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
            `}</style>
        </div>
    );
};

export default HomePage;
