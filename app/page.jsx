"use client"
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import Photo from "@/components/Photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload, FiMessageSquare } from "react-icons/fi";

const Home = () => {
  // Create a ref to attach Typed.js
  const typedRef = useRef(null);

  useEffect(() => {
    // Initialize Typed.js on the selected element
    const typed = new Typed(typedRef.current, {
      strings: [
        "Oussama Zribi",
        "Software Engineer",
        "Data Architect",
        "WEB Developer",
        "Flowgrammer",
      ],
      typeSpeed: 90, // Speed at which each character is typed
      backSpeed: 100, // Speed at which each character is deleted
      backDelay: 1000, // Delay before starting to delete the word
      startDelay: 500, // Delay before starting the typing animation
      loop: true, // Loop the animation indefinitely
      showCursor: true, // Show the blinking cursor
      cursorChar: "|", // Customize the cursor character
    });

    return () => {
      // Destroy Typed.js instance to clean up resources when component unmounts
      typed.destroy();
    };
  }, []);

  return (
    <section className="h-full">
      <div className="container h-full mx-auto">
        {/* Enhanced Professional Banner */}
        <div className="relative group overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 border border-white/5 backdrop-blur-sm text-white p-4 sm:p-5 mb-8 rounded-xl shadow-xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-0.5">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/30 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/30 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          </div>
          
          {/* Content */}
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 z-10">
            {/* Icon with subtle animation */}
            <div className="flex-shrink-0 flex items-center">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:rotate-6 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Text content */}
            <div className="flex-1">
              <div className="flex flex-col space-y-1">
                <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Available for New Challenges
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Open to discussing Software Engineering roles in Tunisia where I can contribute in modern web development and data architecture.
                </p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-2 sm:mt-0">
              <a 
                href="/contact" 
                className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:border-accent/30 transition-all duration-300 group/button"
              >
                Let s Connect
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5 group-hover/button:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
        <div className="flex flex-col items-center justify-between xl:flex-row xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="order-2 text-center xl:text-left xl:order-none">
            <h1 className="mb-6 h1">
              Hello I am <br />
              <span className="text-accent">
                <span ref={typedRef}></span>
              </span>
              {/* thg */}
            </h1>
            <p className="max-w-[500px] mb-9  text-white/80 ">
        Welcome to my portfolio, I am thrilled to have you here! Explore my work, skills, and experiences, and feel free to reach out if you are interested in collaboration or learning more about what I do.
            </p>
            <h1 className="mb-6 h3">Let s Collaborate</h1>
            <p className="max-w-[500px] mb-9 text-white/80 ">Whether you need a data-driven approach to your next project or a refined digital solution, I am open to opportunities to collaborate and create impactful experiences.</p>
            {/* btn & socials */}
            <div className="flex flex-col items-center gap-4 xl:flex-row">
              {/* Download CV Button */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex items-center gap-2 uppercase"
              >
                <a 
                  href="/assets/CV/Oussama Zribi Resume.pdf" 
                  download="Oussama_Zribi_Resume.pdf"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
              
              {/* Chat CTA Button */}
              <Button 
                onClick={() => {
                  const chatButton = document.querySelector('[aria-label="Open chat"]');
                  if (chatButton) chatButton.click();
                }}
                className="flex items-center gap-2 uppercase bg-accent text-primary hover:bg-accent/90"
                size="lg"
              >
                <FiMessageSquare className="text-xl" />
                <span>Chat with me</span>
              </Button>
              
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* photo */}
          <div className="order-1 mb-8 xl:order-none xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
      {/* //Todo: Stats 1:13:26 */}
    </section>
  );
};

export default Home;
