"use client";

import CountUp from "react-countup";
const stats = [

  {
    num: 8, 
    text: "Projects delivered",
  },
  {
    num: +10, 
    text: "Technologies worked with",
  },
  {
    num: 10000, 
    text: "Production-ready code written",
  },
  {
    num: 50, 
    text: "Data pipelines automated",
  },
  {
    num: 200, 
    text: "Git contributions made",
  },
  {
    num: 17, 
    text: "Databases optimized",
  },
];

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[88vw] mx-auto xl:max-w-none">
        {stats.map((item, index) => {
            return (
              <div className="flex items-center justify-center flex-1 gap-4 xl:justify-start" key={index}>
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  className="text-4xl font-extrabold xl:text-6xl"
                />
                <p className={`${item.text.length <15 ? "max-w-[100px] " : "max-w-[150px]"
                    
                } leading-snug text-white/80`}>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
