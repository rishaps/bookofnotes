import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code !== 'Space' && event.key !== ' ') {
                return;
            }
            const target = event.target as HTMLElement | null;
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
                return;
            }
            event.preventDefault();
            navigate('/subjects');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    return (
        // Landing Page uses its own specific deep black background, independent of global theme
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">

            {/* Content */}
            <div className="text-center px-6">

                {/* Signature Title */}
                {/* Signature Title */}
                <h1 className="font-playfair font-medium text-5xl sm:text-7xl md:text-8xl text-white/90 mb-6 tracking-wide select-none">
                    Book of Notes
                </h1>

                {/* Tagline */}
                <p className="font-playfair italic text-white/60 text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed mb-10">
                    a collection of college notes
                </p>

                {/* Actions */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={() => navigate('/subjects')}
                        className="px-6 py-2 border border-white/40 text-white/80 text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10 hover:text-white"
                    >
                        Enter
                    </button>
                    <span className="hidden md:flex items-center gap-2 text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">
                        Premi
                        <kbd className="px-2 py-1 border border-white/30 text-white/70 rounded-sm text-[10px] tracking-[0.2em]">
                            SPAZIO
                        </kbd>
                        per accedere
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
