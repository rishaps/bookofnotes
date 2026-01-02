import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

import { courseContent } from '../data/courseContent';
import { informaticaContent } from '../data/courseContent-informatica';
import { analisi1CourseContent } from '../data/courseContent-analisi1';
import { geometriaCourseContent } from '../data/courseContent-geometria';

// Helper to get lesson count
const getLessonCount = (slug: string): number => {
    switch (slug) {
        case 'economia': return courseContent.length;
        case 'fondamenti-informatica': return informaticaContent.length;
        case 'analisi-1': return analisi1CourseContent.length;
        case 'geometria-algebra': return geometriaCourseContent.length;
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

    return (
        <button
            onClick={isAvailable ? onClick : undefined}
            disabled={!isAvailable}
            className={`toc-item w-full flex items-baseline text-left transition-colors py-0.5 group ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
        >
            {/* Title */}
            <span className={`whitespace-nowrap flex-shrink-0 ${isAvailable ? 'text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400' : 'text-gray-400'}`}>
                <span className="mr-1">•</span>{title}
            </span>

            {/* Dots that fill space */}
            <span className="flex-grow mx-1 overflow-hidden whitespace-nowrap text-gray-300 dark:text-gray-600 text-[8px] select-none leading-none self-end mb-[2px]">
                {'.'.repeat(200)}
            </span>

            {/* Lesson count - fixed width for alignment */}
            <span className={`w-[75px] text-right text-[10px] font-mono whitespace-nowrap uppercase tracking-wide flex-shrink-0 ${isAvailable ? 'text-gray-500' : 'text-transparent'}`}>
                {isAvailable ? `${String(lessonCount).padStart(2, '0')} lezioni` : ''}
            </span>
        </button>
    );
};

const AVAILABLE_SUBJECTS = ['analisi-1', 'fondamenti-informatica', 'geometria-algebra', 'economia'];

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (slug: string) => {
        navigate(slug === 'economia' ? '/economia' : `/${slug}`);
    };

    return (
        <div
            className="min-h-screen bg-[var(--bg-body)] text-black dark:text-white flex flex-col relative"
            style={{ fontFamily: "'Departure Mono', monospace" }}
        >
            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-4 right-4 z-40">
                <ThemeToggle inline={true} />
            </div>



            {/* BOOK OF NOTES - Fixed top left with mobile responsiveness */}
            <h1
                className="fixed top-4 left-4 md:left-6 text-xs md:text-lg font-bold tracking-widest uppercase z-40 bg-[var(--bg-body)] px-2 py-1"
                style={{ fontFamily: "'Departure Mono', monospace", letterSpacing: '0.15em' }}
            >
                BOOK OF NOTES
            </h1>

            {/* Main content wrapper - centered vertically and horizontally */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">

                {/* Header with TOC centered */}
                <header className="w-full max-w-5xl mb-8">
                    {/* TABLE OF CONTENTS - Centered with lines */}
                    <div className="flex items-center justify-center gap-4">
                        <span className="flex-1 border-b border-gray-300 dark:border-gray-600"></span>
                        <h2
                            className="text-sm font-bold tracking-widest uppercase"
                            style={{ fontFamily: "'Departure Mono', monospace", letterSpacing: '0.2em' }}
                        >
                            TABLE OF CONTENTS
                        </h2>
                        <span className="flex-1 border-b border-gray-300 dark:border-gray-600"></span>
                    </div>
                </header>

                {/* Main Content - 3 Column Grid */}
                <main className="w-full max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-8">
                        {Object.entries(tocData).map(([year, items], yearIndex) => (
                            <div key={year} className="flex flex-col">
                                {/* Section Header */}
                                <div className="mb-4">
                                    <h3
                                        className="text-sm font-bold uppercase tracking-wider"
                                        style={{ fontFamily: "'Departure Mono', monospace" }}
                                    >
                                        <span className="mr-2">{yearIndex + 1}.</span>
                                        {year}
                                    </h3>
                                </div>

                                {/* Items */}
                                <div className="space-y-1">
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
