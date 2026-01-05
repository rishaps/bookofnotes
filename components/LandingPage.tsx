import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

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
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
