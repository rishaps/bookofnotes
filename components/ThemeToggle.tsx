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

    // Sync with localStorage on mount - dark mode is the default
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const html = document.documentElement;
        if (savedTheme === 'light') {
            html.classList.remove('dark');
            setIsDark(false);
        } else {
            // Default to dark mode (including when no theme saved)
            html.classList.add('dark');
            setIsDark(true);
        }
    }, []);

    const buttonContent = (
        <button
            onClick={toggleTheme}
            className={`${inline
                ? 'p-2 text-black dark:text-white hover:opacity-75 transition-colors'
                : 'fixed right-6 top-6 z-[9999] p-2 text-black dark:text-white hover:scale-110 transition-transform duration-300'
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
