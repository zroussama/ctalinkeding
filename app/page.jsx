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
        "Data Architect",
        "WEB Developer",
        "Software Engineer",
        "Data Scientist",
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
                variant="outline"
                size="lg"
                className="flex items-center gap-2 uppercase"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
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
