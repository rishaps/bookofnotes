import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
    inline?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ inline = false }) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check initial state based on class presence
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.remove('dark');
            setIsDark(false);
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            setIsDark(true);
            localStorage.setItem('theme', 'dark');
        }
    };

    // Optional: Sync with localStorage on mount to persist across reloads
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const html = document.documentElement;
        if (savedTheme === 'light') {
            html.classList.remove('dark');
            setIsDark(false);
        } else if (savedTheme === 'dark') {
            html.classList.add('dark');
            setIsDark(true);
        }
        // If no saved theme, we stick to default (which is dark in index.html)
    }, []);

    const buttonContent = (
        <button
            onClick={toggleTheme}
            className={`${inline
                ? 'p-2 text-content-primary hover:text-premium-gold transition-colors'
                : 'fixed right-6 top-6 z-[9999] p-2 text-premium-gold hover:text-content-primary transition-all duration-300 bg-[var(--bg-body)]/50 backdrop-blur-sm rounded-full'
                }`}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDark ? <Sun size={inline ? 20 : 24} /> : <Moon size={inline ? 20 : 24} />}
        </button>
    );

    if (inline) {
        return buttonContent;
    }

    return createPortal(buttonContent, document.body);
};

export default ThemeToggle;
