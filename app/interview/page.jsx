"use client";

import { Timeline } from "@/components/ui/timeline";
import { timelineData } from "@/data/timeline";
import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function InterviewPage() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply the theme to the HTML element
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      {/* Navigation & Actions */}
      <div className="fixed top-0 left-0 w-full p-4 z-50 flex justify-between items-start pointer-events-none">
        
        {/* Back Button */}
        <Link 
          href="/"
          className="pointer-events-auto p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 group"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white group-hover:-translate-x-1 transition-transform" />
        </Link>

        <div className="flex gap-3 pointer-events-auto">
          {/* Download CV Button */}
          <a
            href="/assets/CV/Inénieur Logiciel - CV Oussama Zribi.pdf"
            download
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-accent text-white shadow-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">CV</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      <div className="relative">
          <Timeline items={timelineData} className="mt-8" />
      </div>
    </div>
  );
}