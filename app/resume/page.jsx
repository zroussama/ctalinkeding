"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion, px } from "framer-motion";

import {
  FaHtml5,
  FaReact,
  FaJs,
  FaJava,
  FaPhp,
  FaLaravel,
  FaPython,
  FaDatabase,
  FaCss3,
  FaNodeJs,
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

const about = {
  title: "About me",
  Description:
    "Lorem ipsum dolor sit amet consectetur adipisicing eutunt explicabo inventore,",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Oussama Zribi",
    },
    {
      fieldName: "Email",
      fieldValue: "oussama2101@gmail.com",
    },
    {
      fieldName: "Phone",
      fieldValue: "+216 44 377 533",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, French, German, Arabic",
    },
    {
      fieldName: "Nationalities",
      fieldValue: "Tunisian, Moroccan",
    },
    {
      fieldName: "Interests",
      fieldValue: "F1, Tech, Aviation, Chess, Ping Pong, Football, Action Movies, Marvel, Arcade",
    },
  ],
};
// Experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description: "Lorem Ipsum is Lorem Ipsum  is Lorem Ipsum",
  items: [
    {
      company: "Stagic",
      position: "Software architect",
      duration: "July 2024 - Present",
      website: "https://www.stagic.dk/",
      description: "Lorem Ipsum is Lorem Ipsum is Lorem Ips",
    },
    {
      company: "E-commerce Startup",
      position: "Freelance web developer",
      duration: "November 2023 - July 2024",
      website: "https://www.stagic.dk/",
      description: "Lorem Ipsum is Lorem Ipsum is Lorem Ips",
    },
    {
      company: "Comunik CRM",
      position: "Full Stack intern",
      duration: "February 2023 - May 2023",
      website: "https://www.comunikcrm.com/",
      description: "Lorem Ipsum is Lorem Ipsum is Lorem Ips",
    },
    {
      company: "Scientific research for INAT",
      position: "Data scientist intern",
      duration: "July 2022 - September 2022",
      website: "http://www.inat.tn/",
      description: "Lorem Ipsum is Lorem Ipsum is Lorem Ips",
    },
    {
      company: "Discovery Informatique",
      position: "Business Analyst intern",
      duration: "April 2019 - September 2019",
      website: "https://www.discoveryinformatique.com/fr",
      description: "Lorem Ipsum is Lorem Ipsum is Lorem Ips",
    },
  ],
};

//Academic data
const education = {
  icon: "/assets/resume/cap.svg",
  titre: "Acadamic",
  description: "Lorem Ipsum is Lorem Ipsum  is Lorem Ipsum",
  items: [
    {
      institution: "ESPRIT - Engineering school",
      degree: "Software Architect Engineer",
      duration: "2020 - 2024",
      website: "https://esprit.tn/",
    },
    {
      institution: "Claude Bernard Lyon 1 University",
      degree: "Bachelor, Business Intelligence",
      duration: "2016 - 2019",
      website: "https://www.univ-lyon1.fr/",
      // logo: ""
    },
    {
      institution: "ESPRIT School of Business",
      degree: "Bachelor, Business Computing",
      duration: "2016 - 2019",
      website: "https://www.esb.tn/en/",
    },
  ],
};

// Skills data
const skills = {
  title: "My Skills",
  description:
    "Lorem Ipsum is Lore of the Lorem Ipsum and Lorem Ipsum is Lore of the Lorem Ipsum",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "HTML 5",
    },
    {
      icon: <FaPhp />,
      name: "PHP",
    },
    {
      icon: <FaDatabase />,
      name: "SQL - PL/SQL - NoSQL",
    },
    {
      icon: <FaJava />,
      name: "Java",
    },
    {
      icon: <FaJs />,
      name: "javaScript",
    },
    {
      icon: <FaLaravel />,
      name: "Laravel",
    },
    {
      icon: <FaReact />,
      name: "React",
    },
    {
      icon: <FaCss3 />,
      name: "CSS",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind.css",
    },
  ],
};

const resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1.2, duration: 0.2, ease: "easeIn" },
      }}
      className="moin-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6 ">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>
          {/* content */}
          <div className="min-h-[70vh] w-full">

            
            {/* experience */}
            <TabsContent value="experience" className="w-full ">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold ">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:ms-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            
            {/* education */}
            <TabsContent value="education" className="w-full ">
            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold ">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:ms-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-1 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            {/* <img src="https://esprit.tn/static/media/logo-esprit-2.b8fedba0.png" alt="" width="130" height="80" /> */}

                            <p className="text-white/60">{item.institution}</p>
                            {/* <a className="text-white/60">{item.website}</a> */}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            
            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => {
                    return <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                            <div className="text-6xl transition-all duration-300 group-hover:text-accent">{skill.icon}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  })}
                </ul>
              </div>
            </TabsContent>



            
            {/* about me */}
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item,index) => {
                    return <li key={index} className="flex items-center justify-center gap-4 xl:justify-start">
                      <span className="text-white/60">{item.fieldName}</span>
                      <span className="text-xl">{item.fieldValue}</span>
                    </li>
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default resume;
