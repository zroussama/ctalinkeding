"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TimelineItem } from "@/types/timeline";
import { ArrowUpRight, ExternalLink, FileText, ImageIcon } from "lucide-react";
import CardStack from "./card-stack";
import SupademoInitializer from './supademo';

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col md:flex-row gap-6 md:gap-10 py-8 md:py-10"
    >
      {/* Year / Timeline Dot */}
      <div className="md:sticky md:top-1/2 md:-translate-y-1/2 z-10">
        <div className="flex items-center md:flex-col md:items-start gap-4">
          <div className="relative">
            <motion.div 
              className="h-5 w-5 rounded-full bg-accent border-2 border-white dark:border-gray-900 shadow-lg z-10 relative flex items-center justify-center"
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.5, 1.5, 1],
                  opacity: [0, 0.6, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
              />
            </motion.div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-accent/10 animate-pulse" />
          </div>
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-black dark:text-white transition-all duration-500 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            {item.year}
          </motion.h3>
        </div>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden group-hover:border-accent/50 text-black dark:text-black"
        whileHover={{ 
          scale: 1.01,
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
        }}
        initial={false}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative space-y-6">
          <div>
            <motion.h4 
              className="text-2xl font-bold text-black dark:text-black mb-3 inline-block"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {item.title}
            </motion.h4>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          {/* Media Display */}
          <div className="w-full space-y-6">
            {item.embeds?.map((embed, embedIndex) => (
              <div key={embedIndex} className="w-full">
                {embed.title && (
                  <h5 className="text-lg font-semibold mb-2 text-black dark:text-white">
                    {embed.title}
                  </h5>
                )}
                {embed.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {embed.description}
                  </p>
                )}
                <div className="w-full rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
                  {embed.content.type === 'iframe' ? (
                    <iframe
                      src={embed.content.src}
                      width="100%"
                      height={embed.content.height || "600"}
                      className="w-full border-0"
                      allowFullScreen
                      allow="clipboard-write; autoplay; fullscreen"
                      loading="lazy"
                    />
                  ) : embed.content.type === 'html' && embed.content.html ? (
                    <div 
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: embed.content.html }}
                    />
                  ) : null}
                </div>
              </div>
            ))}
            {item.images && item.images.length > 0 ? (
              <div className="space-y-4">
                {item.images.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    className="relative w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.1 * idx,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="relative w-full">
                      <Image
                        src={img}
                        alt={`${item.title} - Image ${idx + 1}`}
                        width={1200}
                        height={800}
                        className="w-full h-auto"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          display: 'block'
                        }}
                        sizes="(max-width: 768px) 100vw, 70vw"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : item.imageUrl ? (
              <motion.div 
                className="relative h-64 w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
                whileHover={{ scale: 1.01 }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ) : null}
          </div>

          {(item.tags || item.links || item.stacks) && (
            <div className="space-y-4 pt-3">
              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {item.tags.map((tag, i) => (
                    <motion.span 
                      key={`tag-${i}`}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-accent/10 text-black dark:text-black border border-accent/20 dark:border-accent/30 shadow-sm"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              {item.stacks && item.stacks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Stack technique :</h4>
                  <div className="flex flex-wrap gap-3">
                    {item.stacks.map((stack, i) => (
                      <motion.div
                        key={`stack-${i}`}
                        className="group relative flex flex-col items-center"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        title={stack.name}
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-2 shadow-sm border border-gray-200 dark:border-gray-700 group-hover:shadow-md transition-all duration-200">
                          {stack.icon.startsWith('http') ? (
                            <img 
                              src={stack.icon} 
                              alt={stack.name}
                              className="w-6 h-6 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-2xl">{stack.icon}</span>
                          )}
                        </div>
                        <span className="absolute -bottom-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {stack.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {item.links.map((link, i) => {
                    const linkProps = {
                      key: `link-${i}`,
                      href: link.url,
                      className: cn(
                        "text-sm font-medium text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent flex items-center gap-1.5 group/link",
                        link.className
                      ),
                      ...(link.dataSupademo ? { 'data-supademo': link.dataSupademo } : {}),
                      ...(link.url !== '#' ? {
                        target: "_blank",
                        rel: "noopener noreferrer"
                      } : {})
                    };

                    return (
                      <motion.a
                        key={`link-${i}`}
                        {...linkProps}
                        whileHover={{ x: 3 }}
                      >
                        {link.label}
                        {link.url !== '#' && (
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Timeline = ({ items, className }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (ref.current) {
      const updateHeight = () => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) setHeight(rect.height);
      };
      
      updateHeight();
      window.addEventListener('resize', updateHeight);
      
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [ref, items]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  if (!isMounted) return null;

  return (
    <div className={cn("w-full font-sans relative overflow-hidden bg-[#f8f5f0] dark:bg-gray-950", className)} ref={containerRef}>
      <div className="absolute bg-primary inset-0 bg-grid-[#e8e4dd] dark:bg-grid-gray-800/30 [mask-image:linear-gradient(0deg,white,transparent_30%)]" />
      
      <div ref={ref} className="relative bg-primary max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Mon <span className="text-accent">Parcours</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            L&apos;évolution de mon parcours professionnel, mes projets et réalisations au fil des années.
          </p>
        </div>

        <AnimatePresence>
          {items.map((item, index) => (
            <TimelineCard key={`${item.year}-${index}`} item={item} index={index} />
          ))}
        </AnimatePresence>

        {/* Animated timeline track */}
        <div 
          style={{ height: height + "px" }}
          className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        >
          <motion.div
            style={{
              height: heightTransform,
            }}
            className="w-full bg-gradient-to-b from-accent to-accent/80 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="w-full h-full bg-white/30 dark:bg-accent/30 backdrop-blur-sm"
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </div>
      </div>
      <SupademoInitializer />
    </div>
  );
};
