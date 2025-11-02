"use client";

import { Timeline } from "@/components/ui/timeline";
import { sampleTimelineData } from "@/types/timeline";
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

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

  // Use the sample timeline data from our types file
  const timelineData = sampleTimelineData;

  return (
    <div className={`min-h-screen w-full ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-800" />
        )}
      </button>

      <div className="relative">
       
          
          <Timeline items={timelineData} className="mt-8" />
     
      </div>
    </div>
  );
}