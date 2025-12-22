import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface LightboxProps {
    src: string;
    alt: string;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
            >
                <X className="w-8 h-8" />
            </button>

            <div className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                />
                {alt && (
                    <p className="mt-4 text-white/80 font-mono text-sm tracking-widest uppercase">{alt}</p>
                )}
            </div>
        </div>
    );
};

export default Lightbox;
