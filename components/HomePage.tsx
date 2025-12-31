import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

// Completed subjects
const completedSubjects = ['analisi-1', 'fondamenti-informatica', 'economia', 'geometria-algebra'];

// Table of Contents data
const tocData = {
    'PRIMO ANNO': [
        { title: 'Analisi Matematica 1', slug: 'analisi-1' },
        { title: 'Fondamenti di Informatica', slug: 'fondamenti-informatica' },
        { title: 'Geometria e Algebra Lineare', slug: 'geometria-algebra' },
        { title: 'Fisica', slug: 'fisica' },
        { title: 'Elettrotecnica', slug: 'elettrotecnica' },
        { title: 'Economia e Org. Aziendale', slug: 'economia' },
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

// Editorial sections - Conversational, curious style
const editorialSections = [
    {
        image: '/images/homepage/bug.png',
        title: 'Il Primo "Bug"',
        body: 'Ti sei mai chiesto perché chiamiamo "bug" gli errori nel codice? Nel 1947 Grace Hopper trovò una vera falena incastrata in un relè del computer Mark II. Da allora, trovare e correggere errori si chiama "debugging".',
    },
    {
        image: '/images/homepage/cat.png',
        title: 'Il Paradosso del Gatto',
        body: 'Hai mai sentito parlare del gatto di Schrödinger? È un esperimento mentale dove un gatto in una scatola è contemporaneamente vivo e morto, finché non la apri. Sembra assurdo, ma la fisica quantistica funziona proprio così.',
    },
    {
        image: '/images/homepage/dragon.png',
        title: 'Il Custode del Valore',
        body: 'Perché i draghi nelle leggende accumulano oro senza mai usarlo? Perché non conoscono l\'economia. Questa disciplina insegna come allocare risorse monetarie (anche scarse) per generare valore, non per tenerle ammassate in qualche grotta.',
    },
    {
        image: '/images/homepage/monkey.png',
        title: 'Il Caso non Esiste',
        body: 'Ti sei mai chiesto se il lancio di un dado è davvero casuale? La statistica dimostra che anche eventi apparentemente casuali seguono leggi precise. Sapendo interpretarle, puoi prevedere l\'imprevedibile.',
    },
];

// TOC Item Component
const TocItem: React.FC<{ title: string; slug: string; onClick: () => void }> = ({ title, slug, onClick }) => {
    const isCompleted = completedSubjects.includes(slug);
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors py-0.5 group"
        >
            <span className="font-serif text-[15px] text-black dark:text-white group-hover:underline leading-tight">
                {title}
            </span>
            <span className={`text-[9px] font-mono uppercase tracking-wide ml-2 flex-shrink-0 ${isCompleted
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-400 dark:text-gray-500'
                }`}>
                {isCompleted ? 'Completato' : 'Da completare'}
            </span>
        </button>
    );
};

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (slug: string) => {
        navigate(slug === 'economia' ? '/economia' : `/${slug}`);
    };

    return (
        <div className="h-screen overflow-hidden bg-[var(--bg-body)] text-black dark:text-white flex">

            {/* LEFT COLUMN - Editorial (55%) */}
            <div className="w-[55%] h-full border-r border-black/10 dark:border-white/10 flex flex-col">

                {/* Header - Compact */}
                <header className="flex-shrink-0 px-5 pt-3 pb-2 border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-mono text-xl font-bold tracking-wide uppercase leading-none">
                                BOOK OF NOTES
                            </h1>
                            <p className="font-serif italic text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                by Rishapveer Singh
                            </p>
                        </div>
                        <ThemeToggle inline={true} />
                    </div>
                </header>

                {/* Editorial Content - Compact layout */}
                <div className="flex-1 p-4 overflow-hidden flex flex-col">
                    {/* 2x2 Grid - Tight */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {editorialSections.map((section, index) => (
                            <div key={index} className="flex flex-col">
                                {/* Title */}
                                <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1 leading-none">
                                    {section.title}
                                </h3>

                                {/* Content: Image + Text side by side */}
                                <div className="flex gap-2">
                                    {/* Image */}
                                    <div className="w-16 flex-shrink-0">
                                        <img
                                            src={section.image}
                                            alt={section.title}
                                            className="w-full h-auto object-contain max-h-[80px]"
                                        />
                                    </div>

                                    {/* Text */}
                                    <p className="font-serif text-[12px] leading-[1.35] text-gray-700 dark:text-gray-300">
                                        {section.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Problem Section */}
                    <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 flex-1 flex flex-col">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                            Un esercizietto di riscaldamento per accenderti i neuroni prima di studiare.
                        </p>

                        {/* Problem Text */}
                        <p className="font-serif text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
                            Eveline e James giocano su una scacchiera formata da una singola fila di 2022 caselle consecutive.
                            A turno, posizionano tessere che coprono due caselle adiacenti, con Eveline che fa la prima mossa.
                            Una tessera non può coprire una casella già occupata.
                        </p>
                        <p className="font-serif text-[11px] leading-relaxed text-gray-700 dark:text-gray-300 mt-1">
                            Eveline vuole massimizzare le caselle vuote rimaste; James vuole minimizzarle.
                            <em> Qual è il numero massimo di caselle vuote che Eveline può assicurarsi?</em>
                        </p>

                        {/* Problem Image - Below text */}
                        <div className="mt-3">
                            <img
                                src="/images/homepage/problema.jpg"
                                alt="Eveline vs James"
                                className="w-full h-auto rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN - Table of Contents (45%) */}
            <div className="w-[45%] h-full flex flex-col overflow-hidden">

                {/* TOC Header - Compact */}
                <header className="flex-shrink-0 px-5 pt-3 pb-2 border-b border-black/10 dark:border-white/10">
                    <h2 className="font-mono text-lg font-bold tracking-wide uppercase leading-none">
                        TABLE OF CONTENTS
                    </h2>
                </header>

                {/* TOC Content - No padding waste */}
                <div className="flex-1 overflow-hidden px-5 py-3">
                    <div className="h-full flex flex-col justify-between">
                        {Object.entries(tocData).map(([year, items], yearIndex) => (
                            <div key={year} className="flex-1">
                                {/* Year Header */}
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="font-mono text-sm font-bold leading-none">
                                        {yearIndex + 1}.
                                    </span>
                                    <span className="font-mono text-sm font-bold uppercase tracking-wider leading-none">
                                        {year}
                                    </span>
                                </div>

                                {/* Items - Tight */}
                                <div className="pl-4">
                                    {items.map((item) => (
                                        <TocItem
                                            key={item.slug}
                                            title={item.title}
                                            slug={item.slug}
                                            onClick={() => handleNavigate(item.slug)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
