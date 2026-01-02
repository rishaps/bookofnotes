import React, { useState } from 'react';
import { ZoomIn, ImageOff } from 'lucide-react';

interface ImageThumbnailProps {
    src: string;
    alt: string;
    onImageClick: (src: string, alt: string) => void;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ src, alt, onImageClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div
            className="group relative cursor-zoom-in overflow-hidden rounded-lg border border-premium-gray/20 shadow-lg transition-all hover:shadow-xl min-h-[200px]"
            onClick={() => !hasError && onImageClick(src, alt)}
        >
            {/* Removed opacity transition to ensure visibility */}
            <div>
                {!hasError ? (
                    <img
                        src={src}
                        alt={alt}
                        onLoad={() => setIsLoaded(true)}
                        onError={() => {
                            console.error(`Failed to load image: ${src}`);
                            setIsLoaded(true);
                            setHasError(true);
                        }}
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                ) : (
                    <div className="w-full h-[200px] bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-content-muted p-4 text-center">
                        <ImageOff className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs font-mono">Image Not Found</span>
                        <span className="text-[10px] mt-1 opacity-50 truncate max-w-full px-2">{src}</span>
                    </div>
                )}
            </div>

            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <div className="w-6 h-6 border-2 border-premium-gray/30 border-t-premium-gray rounded-full animate-spin"></div>
                </div>
            )}

            {/* Hover Overlay - Only show if loaded and no error */}
            {isLoaded && !hasError && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 dark:bg-black/80 rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ZoomIn className="w-5 h-5 text-premium-gold" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageThumbnail;
