"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiJest, SiGithubactions, SiAws } from "react-icons/si";
import { GlowingEffect } from "@/components/ui/glowing-effect";

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
  FaDocker,
  FaGit,
  FaLaravel,
  FaPython,
  FaCss3,
  FaDatabase,
  FaNodeJs,
  FaUser,
  FaEnvelope as FaMail,
  FaPhone,
  FaBriefcase,
  FaGlobe,
  FaGlobeAmericas,
  FaHeart
} from "react-icons/fa";

const about = {
  title: "About me",
  description: "Passionate software engineer with expertise in full-stack development and a strong focus on creating efficient, scalable applications.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Oussama Zribi",
      icon: FaUser
    },
    {
      fieldName: "Email",
      fieldValue: "oussama2101@gmail.com",
      icon: FaMail
    },
    {
      fieldName: "Phone",
      fieldValue: "+216 44 377 533",
      icon: FaPhone
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
      icon: FaBriefcase
    },
    {
      fieldName: "Languages",
      fieldValue: "English, French, German, Arabic",
      icon: FaGlobe
    },
    {
      fieldName: "Nationalities",
      fieldValue: "Tunisian, Moroccan",
      icon: FaGlobeAmericas
    },
    // {
    //   fieldName: "Interests",
    //   fieldValue: "F1, Tech, Aviation, Chess, Ping Pong, Football, Action Movies, Marvel, Arcade",
    //   icon: FaHeart
    // },
  ],
};
// Experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description: "Designed, developed, and deployed scalable web applications using modern technologies. Collaborated with cross-functional teams to deliver efficient, maintainable, and secure software solutions. Applied best practices in clean code, performance optimization, and agile development.",
  items: [
    {
      company: "Comunik CRM",
      position: "Full Stack intern",
      duration: "January 2025 - July 2025",
      website: "https://www.comunikcrm.com/",
      description: "Developed a web application for client portfolio management using Laravel, React, ReactFlow, Meilisearch, and WaveTerm.",
      logo:"https://docs.comunikcrm.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FcmkDark.84694dce.png&w=1080&q=75"
    },
    {
      company: "Stagic",
      position: "Software architect",
      duration: "July 2024 - December 2024",
      website: "https://www.stagic.dk/",
      description: "Designed, developed, and maintained custom web applications using Next.js, React, and Node.js. Created microservices tailored to specific projects (WebSocket, REST API).",
      logo:"https://media.licdn.com/dms/image/v2/D4E0BAQF6yA9U81neBg/company-logo_200_200/company-logo_200_200/0/1701778140027?e=1762387200&v=beta&t=l6WXD8EbfuRx3vZjApcNInuvNtu0cWRGZqK4IzTs5iY"
    },
    {
      company: "E-commerce Startup",
      position: "E-commerce Manager & Digital Seller",
      duration: "November 2023 - July 2024",
      website: "#",
      description: "Managed a small e-commerce business focused on local cash-on-delivery sales. Handled product sourcing, customer communication, and logistics. Promoted products through Facebook ads and affiliate partnerships, achieving steady growth in monthly orders. Gained hands-on experience in online sales strategies, content creation, and conversion optimization.",
      logo:"https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-1/449347417_906125831527255_8326411117955646482_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=xy2KdXVkZowQ7kNvwGs2UAh&_nc_oc=AdnoM01mrLBGJxubsFLpf18Ggb0GuUA_6sgF7vyfTVktxqCTZAjEVXc5f6BL-iaGwfE&_nc_zt=24&_nc_ht=scontent.ftun10-1.fna&_nc_gid=mbvQlfsMHT7XKL7RzM62sg&oh=00_AfeKBFYcm-OaSxhAZSqr8PnvwLP5kmtXzv6alStYc9xCig&oe=68FB1085"

    },
    {
      company: "Comunik CRM",
      position: "Full Stack intern",
      duration: "February 2023 - May 2023",
      website: "https://www.comunikcrm.com/",
      description: "Development and integration of a user management module (CRUD, search, pagination) Laravel, MySQL",
      logo:"https://docs.comunikcrm.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FcmkDark.84694dce.png&w=1080&q=75"
    },
    {
      company: "Scientific research for INAT",
      position: "Data scientist intern",
      duration: "July 2022 - September 2022",
      website: "http://www.inat.tn/",
      description: "Research on the impact of climate change on the Bir M'cherga dam in Zaghouan. Utilized Python and XGBoost to model and predict the behavior under various climate scenarios.",
      logo:"https://scontent.ftun10-2.fna.fbcdn.net/v/t39.30808-6/306159004_452538953521709_1277074382226302163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ST9K04RT9gQQ7kNvwGrxFsq&_nc_oc=AdlPbxEATSVCPMlXQm57AwlljFeZRYV_kmptYJPPmGsG9FyyNBtDxy-sA8EzGxfFbbg&_nc_zt=23&_nc_ht=scontent.ftun10-2.fna&_nc_gid=HX8zu7X5pitlEGNqR9hzGg&oh=00_AfehuloJH7UVo2yGzVgIz4rkhfgCUVOfufZ79JNGHolFuQ&oe=68FB01AA"
    },
    {
      company: "Discovery Informatique",
      position: "Business Analyst intern",
      duration: "April 2019 - September 2019",
      website: "https://www.discoveryinformatique.com/fr",
      description: "Implementation of a decision-making solution and creation of a data warehouse based on Kimball modeling. Designed Power BI dashboards, improving managerial decision-making efficiency by 25%.",
      logo:"https://www.discoveryintech.com/sites/default/files/logo-descovery.png"
    },
    {
      company: "Orange Tunisie",
      position: "NOC Technician Intern",
      duration: "July 2018 - August 2018",
      website: "https://www.orange.tn/",
      description: "Monitored network infrastructure and equipment at the Network Operations Center (NOC).",
      logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/426px-Orange_logo.svg.png?20220928152222"
    },
  ],
};

//Academic data
const education = {
  icon: "/assets/resume/cap.svg",
  titre: "Acadamic",
  description: "Acquired solid foundations in software design, system scalability, and modern development practices through project-based learning. Combined theoretical knowledge with practical implementation in areas such as data structures, algorithms, database systems, DevOps, and software lifecycle management.",
  items: [
    {
      institution: "ESPRIT - Engineering school",
      degree: "Software Architect Engineer",
      duration: "2021 - 2025",
      website: "https://esprit.tn/",
      logoSchool:"https://media.licdn.com/dms/image/v2/C4D0BAQE5RXDgS-RpXA/company-logo_200_200/company-logo_200_200/0/1630491756929/esprit_2_logo?e=1762387200&v=beta&t=WzHnutEMxzf48tRkNNFpt-YCccOD6aNiPU341Tvuuj8"
    },
    {
      institution: "Claude Bernard Lyon 1 University",
      degree: "Bachelor, Business Intelligence",
      duration: "2016 - 2019",
      website: "https://www.univ-lyon1.fr/",
      logoSchool:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Claude_Bernard_University_Lyon_1_%28logo%29.svg/1280px-Claude_Bernard_University_Lyon_1_%28logo%29.svg.png"
    },
    {
      institution: "ESPRIT School of Business",
      degree: "Bachelor, Business Computing",
      duration: "2016 - 2019",
      website: "https://www.esb.tn/en/",
      logoSchool:"https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/310045479_480533277440200_4886065824406849393_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KcUoH98rKwUQ7kNvwETnN6T&_nc_oc=AdkF2LSq6_3y7-EWcNRKYI3k_26GEeJhCcxMVlTrMWtS1pHbRRSJBHwlgNr5l9bBYu0&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=sjld89Bz1zsLn2YdMGqkOA&oh=00_AffIDPiK8s_nagcdiBohPvBQtlB9OSvak0mNTpD0zOqwWg&oe=68FB1D63"
    },
  ],
};

// // Skills data
// const skills = {
//   title: "My Skills",
//   description:
//     "Lorem Ipsum is Lore of the Lorem Ipsum and Lorem Ipsum is Lore of the Lorem Ipsum",
//   skillList: [
//     { 
//       icon: <FaHtml5 />,
//       name: "HTML 5",
//     },
//     {
//       icon: <FaPhp />,
//       name: "PHP",
//     },
//     {
//       icon: <FaDatabase />,
//       name: "SQL - PL/SQL - NoSQL",
//     },
//     {
//       icon: <FaJava />,
//       name: "Java",
//     },
//     {
//       icon: <FaJs />,
//       name: "javaScript",
//     },
//     {
//       icon: <FaLaravel />,
//       name: "Laravel",
//     },
//     {
//       icon: <FaReact />,
//       name: "React",
//     },
//     {
//       icon: <FaCss3 />,
//       name: "CSS",
//     },
//     {
//       icon: <FaNodeJs />,
//       name: "Node.js",
//     },
//     {
//       icon: <SiNextdotjs />,
//       name: "Next.js",
//     },
//     {
//       icon: <SiTailwindcss />,
//       name: "Tailwind.css",
//     },
//   ],
// };
// const skills = {
//   title: "My Skills",
//   description:
//     "Proficient in designing and developing full-stack web applications with a strong focus on performance, scalability, and clean architecture. Experienced across frontend, backend, and database systems, combining software engineering principles with modern frameworks.",
//   skillList: [
//     // 🌐 Frontend
//     {
//       icon: <FaHtml5 />,
//       name: "HTML5",
//     },
//     {
//       icon: <FaCss3 />,
//       name: "CSS3 / Responsive Design",
//     },
//     {
//       icon: <FaJs />,
//       name: "JavaScript (ES6+)",
//     },
//     {
//       icon: <FaReact />,
//       name: "React",
//     },
//     {
//       icon: <SiNextdotjs />,
//       name: "Next.js",
//     },
//     {
//       icon: <SiTailwindcss />,
//       name: "Tailwind CSS",
//     },

//     // ⚙️ Backend
//     {
//       icon: <FaNodeJs />,
//       name: "Node.js",
//     },
//     {
//       icon: <FaPhp />,
//       name: "PHP",
//     },
//     {
//       icon: <FaLaravel />,
//       name: "Laravel",
//     },
//     {
//       icon: <FaJava />,
//       name: "Java / Spring Boot",
//     },

//     // 🗄️ Database & Architecture
//     {
//       icon: <FaDatabase />,
//       name: "SQL / PL-SQL / NoSQL",
//     },
//   ],
// };
const skills = {
  title: "My Skills",
  description:
    "Proficient in designing and developing full-stack web applications with a strong focus on performance, scalability, and clean architecture. Experienced across frontend, backend, databases, DevOps, and testing.",
  skillList: [
    // 🌐 Frontend
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3 />, name: "CSS3 / Responsive Design" },
    { icon: <FaJs />, name: "JavaScript (ES6+)" },
    { icon: <FaReact />, name: "React / Redux / Zustand" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS / Material UI" },

    // ⚙️ Backend
    { icon: <FaNodeJs />, name: "Node.js / Express" },
    { icon: <FaPhp />, name: "PHP / Laravel / Symfony" },
    { icon: <FaJava />, name: "Java / Spring Boot" },
    { icon: <SiGithubactions />, name: "CI/CD / GitHub Actions / GitLab CI" },

    // 🗄️ Databases
    { icon: <FaDatabase />, name: "SQL / PL-SQL / PostgreSQL" },
    { icon: <SiPostgresql />, name: "PostgreSQL / Query Optimization" },
    { icon: <SiMongodb />, name: "NoSQL: MongoDB / Redis" },

    // 🐳 DevOps & Tools
    { icon: <FaDocker />, name: "Docker / Containerization" },
    { icon: <FaGit />, name: "Git / GitHub / GitLab" },

    // ✅ Testing & Quality
    { icon: <SiJest />, name: "Unit & Integration Testing / TDD" },
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
            <TabsContent value="experience" className="w-full">
              <div className="relative">
                <div className="text-center xl:text-left mb-12">
                  <h3 className="text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    {experience.title}
                  </h3>
                  <p className="text-lg text-white/80 max-w-[600px] mx-auto xl:mx-0 leading-relaxed">
                    {experience.description}
                  </p>
                </div>

                <ScrollArea className="h-[500px] pr-4">
                  <div className="grid grid-cols-1 gap-6 max-w-[1200px] mx-auto">
                    {experience.items.map((item, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent/50 hover:shadow-[0_0_30px_var(--accent-500/20)]"
                      >
                        <div className="absolute inset-0 -z-10">
                          <GlowingEffect 
                            disabled={false}
                            blur={20}
                            spread={30}
                            borderWidth={1}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        </div>
                        <div className="relative flex flex-col md:flex-row gap-6">
                          <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2 group-hover:bg-white/10 transition-colors duration-300">
                            {item.logo ? (
                              <img 
                                src={item.logo} 
                                alt={`${item.company} logo`} 
                                className={`w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 scale-110 ${
                                  item.logo.toLowerCase().endsWith('.png') 
                                    ? 'filter brightness-0 invert' 
                                    : ''
                                }`}
                              />
                            ) : (
                              <span className="text-2xl text-white/60">{index + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-white">{item.position}</h3>
                              <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                                {item.duration}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 rounded-full bg-accent"></div>
                              <p className="text-white/80">{item.company}</p>
                            </div>
                            
                            <p className="text-white/60 text-sm">{item.description}</p>
                            
                            {item.website && (
                              <a 
                                href={item.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="relative inline-block mt-3 text-sm text-accent hover:underline group/button"
                              >
                                <span className="relative z-10">Visit Website</span>
                                <GlowingEffect 
                                  disabled={false}
                                  variant="white"
                                  blur={5}
                                  spread={10}
                                  borderWidth={0.5}
                                  className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 rounded-full"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Decorative elements */}
                <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
              </div>
            </TabsContent>

            
            {/* education */}
            <TabsContent value="education" className="w-full ">
            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold ">{education.title}</h3>
                <p className="max-w-[600px] text-white mx-auto xl:ms-0 text-justify">
                  {education.description}
                </p>
                <ScrollArea className="h-[500px] pr-4">
                  <ul className="grid grid-cols-1 gap-6">
                    {education.items.map((item, index) => (
                      <li
                        key={index}
                        className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent/50 hover:shadow-[0_0_30px_var(--accent-500/20)]"
                      >
                        <div className="relative flex flex-col md:flex-row gap-6">
                          {item.logoSchool && (
                            <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2 group-hover:bg-white/10 transition-colors duration-300">
                              <img 
                                src={item.logoSchool} 
                                alt={`${item.institution} logo`}
                                className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                              <span className="text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
                                {item.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                              <p className="text-white/80">{item.institution}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            
            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white mx-auto xl:mx-0">{skills.description}</p>
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
            <TabsContent value="about" className="w-full">
              <div className="relative">
                <div className="text-center xl:text-left mb-12">
                  <h3 className="text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    {about.title}
                  </h3>
                  <p className="text-lg text-white/80 max-w-[600px] mx-auto xl:mx-0 leading-relaxed">
                    {about.description}
                  </p>
                </div>

                {/* Info Grid with Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
                  {about.info.map((item, index) => {
                    const Icon = item.icon;
                    const isInterests = item.fieldName === "Interests";
                    return (
                      <div
                        key={index}
                        className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent/50 hover:shadow-[0_0_30px_var(--accent-500/20)] ${isInterests ? 'bg-primary/5 border-primary/20' : ''}`}
                      >
                        {/* Icon with glow effect */}
                        <div className="relative flex items-start gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${isInterests ? 'bg-primary/20 text-primary' : 'bg-accent/10 text-accent'}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-medium text-white/60 uppercase tracking-wider mb-2">
                              {item.fieldName}
                            </span>
                            <span className={`block text-lg font-semibold break-words ${isInterests ? 'text-primary' : 'text-white'}`}>
                              {item.fieldValue}
                            </span>
                          </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    );
                  })}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default resume;
