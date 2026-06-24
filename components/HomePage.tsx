import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

import { courseContent } from '../data/courseContent-economia';
import { informaticaContent } from '../data/courseContent-informatica';
import { analisi1CourseContent } from '../data/courseContent-analisi1';
import { geometriaCourseContent } from '../data/courseContent-geometria';
import { fisicaCourseContent } from '../data/courseContent-fisica';
import { elettrotecnicaCourseContent } from '../data/courseContent-elettrotecnica';

// Helper to get section count
const getLessonCount = (slug: string): number => {
    switch (slug) {
        case 'economia': return courseContent.length;
        case 'fondamenti-informatica': return informaticaContent.length;
        case 'analisi-1': return analisi1CourseContent.length;
        case 'geometria-algebra': return geometriaCourseContent.length;
        case 'fisica': return fisicaCourseContent.length;
        case 'elettrotecnica': return elettrotecnicaCourseContent.length;
        default: return 0;
    }
};

// Table of Contents data organized by sections
const tocData = {
    'PRIMO ANNO': [
        { title: 'Analisi Matematica 1', slug: 'analisi-1' },
        { title: 'Fondamenti di Informatica', slug: 'fondamenti-informatica' },
        { title: 'Geometria e Algebra Lineare', slug: 'geometria-algebra' },
        { title: 'Economia e Org. Aziendale', slug: 'economia' },
        { title: 'Fisica', slug: 'fisica' },
        { title: 'Elettrotecnica', slug: 'elettrotecnica' },
    ],
    'SECONDO ANNO': [
        { title: 'Analisi Matematica 2', slug: 'analisi-2' },
        { title: 'Architettura di Calcolatori e SO', slug: 'architettura-os' },
        { title: 'Logica e Algebra', slug: 'logica-algebra' },
        { title: 'Elettromagnetismo e Campi', slug: 'elettromagnetismo' },
        { title: 'Probabilità e Statistica', slug: 'probabilita-statistica' },
        { title: 'Segnali per le Comunicazioni', slug: 'segnali-comunicazioni' },
        { title: 'Algoritmi e Principi dell\'Informatica', slug: 'algoritmi' },
    ],
    'TERZO ANNO': [
        { title: 'Fondamenti di Elettronica', slug: 'elettronica' },
        { title: 'Sistemi Informativi', slug: 'sistemi-informativi' },
        { title: 'Basi di Dati 1', slug: 'basi-dati-1' },
        { title: 'Reti Logiche', slug: 'reti-logiche' },
        { title: 'Ingegneria del Software', slug: 'ingegneria-software' },
        { title: 'Fond. Comunicazioni e Internet', slug: 'internet' },
    ],
};

// Count total sections and chapters
const sectionCount = Object.keys(tocData).length;
const chapterCount = Object.values(tocData).reduce((acc, items) => acc + items.length, 0);

interface TocItemProps {
    title: string;
    slug: string;
    lessonCount: number;
    onClick: () => void;
}

const TocItem: React.FC<TocItemProps> = ({ title, slug, lessonCount, onClick }) => {
    const isAvailable = lessonCount > 0;
    const leaderDots = '.'.repeat(80);
    const countLabel = 'sezioni';

    return (
        <button
            onClick={isAvailable ? onClick : undefined}
            disabled={!isAvailable}
            className={`toc-item w-full flex flex-nowrap items-center justify-start gap-2 transition-colors py-1.5 group min-w-0 text-left ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
        >
            {isAvailable ? (
                <>
                    <span className={`toc-title flex-shrink-0 ${isAvailable ? 'text-black dark:text-white group-hover:opacity-80' : 'text-gray-400'}`}>
                        • {title}
                    </span>
                    <span className="toc-leader" aria-hidden="true">
                        {leaderDots}
                    </span>
                    <span className={`text-[10px] font-mono whitespace-nowrap uppercase tracking-wide flex-shrink-0 ${isAvailable ? 'text-gray-500 dark:text-white/70' : 'text-transparent'}`}>
                        {`${String(lessonCount).padStart(2, '0')} ${countLabel}`}
                    </span>
                </>
            ) : (
                <>
                    <span className={`toc-title flex-shrink-0 ${isAvailable ? 'text-black dark:text-white group-hover:opacity-80' : 'text-gray-400'}`}>
                        • {title}
                    </span>
                    <span className="toc-leader" aria-hidden="true">
                        {leaderDots}
                    </span>
                    <span className="toc-soon flex-shrink-0 uppercase">in arrivo</span>
                </>
            )}
        </button>
    );
};

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (slug: string) => {
        navigate(slug === 'economia' ? '/economia' : `/${slug}`);
    };

    return (
        <div
            className="subjects-homepage min-h-screen bg-[var(--bg-body)] text-black dark:text-white flex flex-col relative"
        >
            {/* Header - Fixed top on all devices */}
            <div className="fixed top-0 left-0 w-full h-16 md:h-20 z-40 flex items-center px-4 md:px-6">
                <h1
                    className="text-xs md:text-lg font-bold tracking-widest uppercase font-mono"
                >
                    BOOK OF NOTES
                </h1>

                <div className="ml-auto">
                    <ThemeToggle inline={true} />
                </div>
            </div>

            {/* Main content wrapper - centered vertically and horizontally */}
            <div className="subjects-content flex-1 flex flex-col items-center justify-start md:justify-center px-8 pt-24 pb-12 md:py-12">

                {/* Header with TOC centered */}
                <header className="w-full max-w-7xl mb-8">
                    {/* TABLE OF CONTENTS - Centered with lines */}
                    <div className="py-4">
                        <h2
                            className="text-sm font-bold tracking-widest uppercase font-mono text-center"
                        >
                            TABLE OF CONTENTS
                        </h2>
                    </div>
                </header>

                {/* Main Content - 3 Column Grid */}
                <main className="w-full max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
                        {Object.entries(tocData).map(([year, items]) => (
                            <div key={year} className="flex flex-col items-start text-left">
                                {/* Section Header */}
                                <div className="mb-4">
                                    <h3
                                        className="text-sm font-bold uppercase tracking-wider font-mono text-left"
                                    >
                                        {year}
                                    </h3>
                                </div>

                                {/* Items */}
                                <div className="flex flex-col items-start space-y-2 w-full max-w-[380px]">
                                    {items.map((item) => (
                                        <TocItem
                                            key={item.slug}
                                            title={item.title}
                                            slug={item.slug}
                                            lessonCount={getLessonCount(item.slug)}
                                            onClick={() => handleNavigate(item.slug)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HomePage;
