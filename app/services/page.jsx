"use client";

import { BsArrowDownRight, BsCodeSlash, BsDatabaseGear, BsLayers } from "react-icons/bs";
import { FaChartLine, FaServer } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const services = [
  {
    num: "01",
    title: "Web Development",
    description: "Custom, responsive websites and web applications using modern technologies like Next.js, React, and Node.js. Focus on performance, accessibility, and SEO.",
    icon: <BsCodeSlash className="text-4xl text-accent" />,
    href: "/contact",
  },
  {
    num: "02",
    title: "Data Architecture",
    description: "Design and implement scalable data solutions, data pipelines, and database schemas. Specialized in SQL, NoSQL, and big data technologies.",
    icon: <BsDatabaseGear className="text-4xl text-accent" />,
    href: "/contact",
  },
  {
    num: "03",
    title: "Software Engineering",
    description: "End-to-end software development with clean code principles, design patterns, and best practices. From concept to deployment and maintenance.",
    icon: <BsLayers className="text-4xl text-accent" />,
    href: "/contact",
  },
  {
    num: "04",
    title: "Business Intelligence",
    description: "Transform raw data into actionable insights. Create dashboards, reports, and data visualizations to drive business decisions.",
    icon: <FaChartLine className="text-4xl text-accent" />,
    href: "/contact",
  },
  {
    num: "05",
    title: "DevOps & Cloud",
    description: "CI/CD pipelines, containerization with Docker, and cloud infrastructure management on AWS, GCP, or Azure.",
    icon: <FaServer className="text-4xl text-accent" />,
    href: "/contact",
  },
];

const Services = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 bg-gradient-to-b from-primary to-primary/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center xl:text-left mb-12"
        >
          <h3 className="text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            My Services
          </h3>
          <p className="text-lg text-white/80 max-w-[600px] mx-auto xl:mx-0 leading-relaxed">
            Comprehensive solutions tailored to your business needs, from initial concept to final deployment and beyond.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 overflow-hidden"
            >
              <div className="absolute inset-0 -z-10">
                <GlowingEffect 
                  disabled={false}
                  blur={30}
                  spread={40}
                  borderWidth={1}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  {service.icon}
                </div>
                <span className="text-accent text-sm font-medium bg-accent/10 px-3 py-1 rounded-full">
                  {service.num}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              
              <p className="text-white/70 mb-6">
                {service.description}
              </p>
              
              <div className="relative inline-block">
                <Link 
                  href={service.href} 
                  className="relative z-10 inline-flex items-center gap-2 text-accent font-medium group-hover:translate-x-1 transition-transform group/button"
                >
                  <span className="relative z-10">Learn more</span>
                  <BsArrowDownRight className="group-hover/button:rotate-[-45deg] transition-transform" />
                </Link>
                <GlowingEffect 
                  disabled={false}
                  variant="white"
                  blur={5}
                  spread={15}
                  borderWidth={0.5}
                  className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 rounded-full"
                />
              </div>
              
              <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/20 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



export default Services;
