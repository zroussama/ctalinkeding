"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Web Development",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    href: "",
  },
  {
    num: "02",
    title: "Data Architect",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    href: "",
  },
  {
    num: "03",
    title: "Software Engineer",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    href: "",
  },
  {
    num: "04",
    title: "Business intelligence",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    href: "",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.8, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((services, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center flex-1 gap-6 group"
              >
                {/* top */}
                <div className="flex items-center justify-between w-full">
                  <div className="text-5xl font-extrabold text-transparent duration-500 text-outline group-hover:text-outline-hover trasition-all">
                    {services.num}
                  </div>
                    <Link href={services.href} className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                      <BsArrowDownRight className="text-3xl text-primary " />
                    </Link>
                </div>
                  {/* title */}
                  <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500"> {services.title}</h2>
                  {/* descriiption */}
                  <p className="text-white/60"> {services.Description}</p>
                  {/* borde */}
                  <div className="w-full border-b border-white/20"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
