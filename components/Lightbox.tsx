import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface LightboxProps {
    src: string;
    alt: string;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
    // Lock body scroll when open
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

    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsZoomed(!isZoomed);
    };

    return createPortal(
        <div
            className={`
                fixed inset-0 z-[9999] 
                bg-black/95 backdrop-blur-sm 
                overflow-auto 
                ${isZoomed ? 'block cursor-zoom-out' : 'flex items-center justify-center p-4 cursor-zoom-in'}
            `}
            onClick={onClose}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="fixed top-6 right-6 p-3 text-white/50 hover:text-white transition-colors z-[10000] bg-black/40 rounded-full backdrop-blur-md"
            >
                <X className="w-8 h-8" />
            </button>

            <img
                src={src}
                alt={alt}
                onClick={toggleZoom}
                className={`
                    transition-all duration-300 ease-in-out
                    shadow-2xl bg-white
                    ${isZoomed
                        ? 'w-full h-auto max-w-none min-h-screen object-contain'
                        : 'max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-sm'
                    }
                `}
                style={{
                    backgroundColor: 'white',
                    display: 'block',
                    margin: isZoomed ? '0' : 'auto'
                }}
            />

            {alt && !isZoomed && (
                <div
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full pointer-events-none z-[10000]"
                >
                    <p className="text-white font-mono text-xs tracking-widest uppercase">{alt}</p>
                </div>
            )}
        </div>,
        document.body
    );
};

export default Lightbox;
