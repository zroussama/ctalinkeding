'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/10 to-primary/20 backdrop-blur-md border-t border-white/5 mt-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* About Section */}
          <motion.div 
            className="col-span-1 lg:col-span-2"
            variants={item}
          >
            <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              OhZed  Oussama Zribi   
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Software Engineer & Data Architect with a passion for building scalable web applications 
              and data-driven solutions. Let s create something amazing together!
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: <FaGithub />, url: 'https://github.com/zroussama', label: 'GitHub' },
                { icon: <FaLinkedin />, url: 'https://linkedin.com/in/zroussama', label: 'LinkedIn' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 border border-white/10 backdrop-blur-sm text-white/80 hover:text-accent text-lg transition-all duration-300 hover:-translate-y-0.5"
                  aria-label={social.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold mb-5 text-white">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Contact', path: '/contact' },
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    href={link.path} 
                    className="text-white/70 hover:text-accent transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold mb-5 text-white">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaEnvelope className="text-accent" />
                </div>
                <a 
                  href="mailto:oussama2101@gmail.com" 
                  className="ml-3 text-white/80 hover:text-accent transition-colors"
                >
                  Contact Me
                </a>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaMapMarkerAlt className="text-accent" />
                </div>
                <span className="ml-3 text-white/80">Tunis, Tunisia</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-white/50 text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} Oussama Zribi. Made with Love.
          </p>
        
        </motion.div>
        
      </div>
    </footer>
  );
}
