'use client';
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, RotateCcw, Shuffle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Card {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CardStackProps {
  cards?: Card[];
  className?: string;
}

export default function CardStack({ 
  cards: initialCardsProp, 
  className 
}: CardStackProps) {
  const defaultCards: Card[] = [
    {
      id: 1,
      src: "/assets/interview/ceremonie.jpg",
      alt: "Cérémonie de remise de prix",
      title: "Hackathon Sfax Smart Medina",
      description: "1ère place au XCoding Challenge 2019"
    },
    {
      id: 2,
      src: "/assets/interview/58657563_333754590614281_5025904235095523328_n.jpg",
      alt: "Équipe gagnante",
      title: "Notre équipe",
      description: "Avec l'équipe de développement"
    },
    {
      id: 3,
      src: "/assets/interview/58732948_619335418533306_6282682704664199168_n.jpg",
      alt: "Présentation du projet",
      title: "Démonstration",
      description: "Présentation de notre solution"
    },
    {
      id: 4,
      src: "/assets/interview/59286180_2276587615940092_8193229980654632960_n.jpg",
      alt: "Cérémonie de clôture",
      title: "Remise des prix",
      description: "Avec les organisateurs et partenaires"
    },
    {
      id: 5,
      src: "/assets/interview/59398472_380476705877277_6243646159227715584_n.jpg",
      alt: "Célébration",
      title: "Célébration",
      description: "Après la victoire"
    }
  ];

  const [cards, setCards] = useState<Card[]>(initialCardsProp || defaultCards);
  const [isDark, setIsDark] = useState(true);
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);
  const opacity = useTransform(dragY, [-200, -100, 0, 100, 200], [0, 0.5, 1, 0.5, 0]);

  // Configuration
  const offset = 10;
  const scaleStep = 0.06;
  const dimStep = 0.15;
  const stiff = 170;
  const damp = 26;
  const borderRadius = 12;
  const swipeThreshold = 50;

  const spring = {
    type: 'spring' as const,
    stiffness: stiff,
    damping: damp
  };

  const moveToEnd = () => {
    setCards(prev => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const moveToStart = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const resetCards = () => {
    setCards(initialCardsProp || defaultCards);
    setCurrentIndex(0);
  };

  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 500) {
      if (offset < 0 || velocity < 0) {
        setDragDirection('up');
        setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection('down');
        setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    }
    dragY.set(0);
  };

  // Theme configuration
  const theme = {
    dark: {
      bg: 'bg-gray-950',
      text: 'text-white',
      textSecondary: 'text-gray-400',
      toggleBg: 'bg-gray-800/80 hover:bg-gray-700/80',
      toggleBorder: 'border-gray-700',
      infoBox: 'bg-gray-900/90 border-gray-700',
      shadowCard: '0 25px 50px rgba(0, 0, 0, 0.7)',
      shadowCardBack: '0 15px 30px rgba(0, 0, 0, 0.4)',
      cardBorder: 'border-2 border-gray-700',
      controlBg: 'bg-gray-800/80 hover:bg-gray-700/80',
      cardInfoBg: 'bg-gradient-to-t from-black/80 to-transparent'
    },
    light: {
      bg: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      toggleBg: 'bg-white/80 hover:bg-gray-100/80',
      toggleBorder: 'border-gray-300',
      infoBox: 'bg-white/90 border-gray-300',
      shadowCard: '0 25px 50px rgba(0, 0, 0, 0.15)',
      shadowCardBack: '0 15px 30px rgba(0, 0, 0, 0.08)',
      cardBorder: 'border-2 border-gray-300',
      controlBg: 'bg-white/80 hover:bg-gray-100/80',
      cardInfoBg: 'bg-gradient-to-t from-white/90 to-transparent'
    }
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  return (
    <div className={cn("w-full h-full flex items-center justify-center relative overflow-hidden", currentTheme.bg, className)}>
      {/* Card Stack Container */}
      <div className="relative w-full max-w-md aspect-video overflow-visible z-10">
        <ul className="relative w-full h-full m-0 p-0">
          <AnimatePresence>
            {cards.map(({ id, src, alt, title, description }, i) => {
              const isFront = i === 0;
              const brightness = Math.max(0.3, 1 - i * dimStep);
              const baseZ = cards.length - i;

              return (
                <motion.li
                  key={id}
                  className={`absolute w-full h-full list-none overflow-hidden ${currentTheme.cardBorder}`}
                  style={{
                    borderRadius: `${borderRadius}px`,
                    cursor: isFront ? 'grab' : 'auto',
                    touchAction: 'none',
                    boxShadow: isFront
                      ? currentTheme.shadowCard
                      : currentTheme.shadowCardBack,
                    rotateX: isFront ? rotateX : 0,
                    transformPerspective: 1000,
                    zIndex: baseZ,
                  }}
                  animate={{
                    top: `${i * -offset}%`,
                    scale: 1 - i * scaleStep,
                    filter: `brightness(${brightness})`,
                    opacity: dragDirection && isFront ? 0 : 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 }
                  }}
                  transition={spring}
                  drag={isFront ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDrag={(_, info) => {
                    if (isFront) {
                      dragY.set(info.offset.y);
                    }
                  }}
                  onDragEnd={handleDragEnd}
                  whileDrag={
                    isFront
                      ? {
                          zIndex: cards.length + 1,
                          cursor: 'grabbing',
                          scale: 1.05,
                        }
                      : {}
                  }
                  onHoverStart={() => isFront && setShowInfo(true)}
                  onHoverEnd={() => setShowInfo(false)}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                  
                  {/* Card Info Overlay */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 p-4 ${currentTheme.cardInfoBg}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isFront && showInfo ? 1 : 0,
                      y: isFront && showInfo ? 0 : 20
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                    <p className="text-white/80 text-sm">{description}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={moveToStart}
        className={cn(
          "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full",
          currentTheme.controlBg,
          "border",
          currentTheme.toggleBorder,
          "backdrop-blur-sm transition-colors duration-200 z-20"
        )}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous card"
      >
        <ChevronLeft className={`w-5 h-5 ${currentTheme.text}`} />
      </motion.button>

      <motion.button
        onClick={moveToEnd}
        className={cn(
          "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full",
          currentTheme.controlBg,
          "border",
          currentTheme.toggleBorder,
          "backdrop-blur-sm transition-colors duration-200 z-20"
        )}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next card"
      >
        <ChevronRight className={`w-5 h-5 ${currentTheme.text}`} />
      </motion.button>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex % cards.length
                ? `${isDark ? 'bg-white' : 'bg-gray-900'} w-6` 
                : `${isDark ? 'bg-gray-700' : 'bg-gray-300'} w-1.5` 
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={() => setIsDark(!isDark)}
        className={cn(
          "absolute top-4 right-4 p-2 rounded-full",
          currentTheme.toggleBg,
          "border",
          currentTheme.toggleBorder,
          "backdrop-blur-sm transition-colors duration-200 z-20"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </motion.button>
    </div>
  );
}
