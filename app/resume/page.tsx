"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
// import { loadMarkdown } from "@/utils/loadMarkdown";

import React from "react";
import { motion } from "framer-motion";

const skillGroups = {
  product: {
    title: "Product Design",
    color: "bg-[#8b5cf6]/20 text-[#a78bfa] dark:bg-[#8b5cf6]/20 dark:text-[#a78bfa]",
    skills: ["UI/UX Design", "User Research", "Prototyping", "Product Strategy"],
  },
  frontend: {
    title: "Frontend Development",
    color: "bg-[#2563eb]/20 text-[#60a5fa] dark:bg-[#2563eb]/20 dark:text-[#60a5fa]",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "PHP"],
  },
  backend: {
    title: "Backend Development",
    color: "bg-[#4f46e5]/20 text-[#818cf8] dark:bg-[#4f46e5]/20 dark:text-[#818cf8]",
    skills: ["Python", "FastAPI", "Node.js", "SQLAlchemy", "RESTful APIs"],
  },
  gamedev: {
    title: "Game Development",
    color: "bg-[#7c3aed]/20 text-[#a78bfa] dark:bg-[#7c3aed]/20 dark:text-[#a78bfa]",
    skills: ["Unreal Engine", "C++", "Game Systems", "Multiplayer"],
  },
  cloud: {
    title: "Cloud & Infrastructure",
    color: "bg-[#9333ea]/20 text-[#c084fc] dark:bg-[#9333ea]/20 dark:text-[#c084fc]",
    skills: ["Azure", "AWS", "Docker", "CI/CD", "Microservices"],
  },
  leadership: {
    title: "Leadership",
    color: "bg-[#c026d3]/20 text-[#e879f9] dark:bg-[#c026d3]/20 dark:text-[#e879f9]",
    skills: ["Team Management", "Technical Leadership", "Architecture", "Mentoring"],
  },
};

// Add the resume content as a constant
const RESUME_CONTENT = {
  summary: `Technology leader with 19+ years of experience in full-stack development, UI/UX design, and technical leadership. Successfully transitioned from managing development teams to engineering software solutions in game development and enterprise architecture. Specializes in React, Python, and Node.js solutions across gaming and enterprise systems. Proven track record of leading teams and architecting complex data solutions.`,
  intro: `Tech veteran with 19+ years looking to bring my thoughtful design approach to product-focused roles. I've built just about everything—from game UI and enterprise apps to web portals and cloud systems—always obsessing over both technical excellence and user experience.

I've shipped products at Hi-Rez Studios (RallyHere, Smite 2), Prophecy Games (Starsiege: Deadzone), Keolis and learned what actually works versus what just sounds good in meetings. I code in React, Python, C++, and Node.js, but my real superpower is making complex tech accessible through intentional design.

I'm passionate about gaming, great UX, and building things people genuinely want to use. While I can talk API frameworks and cloud architecture all day, what really drives me is creating experiences that make users think 'finally, someone actually gets what I need.' That sweet spot between technical excellence and human-centered design is where I thrive.`,
  experience: [
    {
      company: "HI-REZ STUDIOS",
      period: "2022-2025",
      roles: [
        {
          title: "Advanced Software Engineer, RallyHere",
          location: "Remote - Alpharetta, GA",
          period: "Sep 2023 - Feb 2025 (1 year 6 months)",
          highlights: [
            "Designed and Developed React Developer Portal for Smite 2, implementing systems for items, loot, vendors, and game configuration",
            "Developed Python API layer using FastAPI, SQLAlchemy, and Pydantic with Liquibase for database migrations",
          ],
        },
        {
          title: "Senior / Principal Backend Engineer, Prophecy Games",
          location: "Remote - Alpharetta, GA",
          period: "Jan 2022 - Sep 2023 (1 year 9 months)",
          highlights: [
            "Designed and implemented user interface systems for in-game menus, player progression, and match results",
            "Developed core gameplay systems including matchmaking algorithms, player ranking, and real-time statistics tracking",
          ],
        },
      ],
    },
    {
      company: "KEOLIS COMMUTER SERVICES, LLC",
      period: "2014-2022",
      roles: [
        {
          title: "UI/UX Designer, Developer, and IT Manager",
          location: "Boston, MA",
          period: "Jul 2014 - Jan 2022 (7 years 7 months)",
          highlights: [
            "Built 20+ Node.JS and React/Native applications serving 2,400 employees",
            "Led App Development and Business Intelligence teams",
            "Architected Keolis Data Architecture Platform across Keolis Americas in Azure",
            "Created working UI/UX prototypes for pre-development validation",
            "Managed ITIL Systems, VOIP, Corporate Website, and Mobile Device Management",
          ],
        },
      ],
    },
    {
      company: "EVERSAINT CREATIVE",
      period: "2013-2014",
      roles: [
        {
          title: "Owner / Developer / Designer",
          location: "Cape Cod, MA",
          period: "May 2013 - Jul 2014 (1 year 3 months)",
          highlights: [
            "Developed 3 iOS Applications reaching 150,000+ downloads and #2 in Health & Fitness Category",
            "Implemented IT infrastructure including ITIL systems and VOIP solutions",
            "Managed customer-facing mobile application reaching 200,000 Boston Metro users",
          ],
        },
      ],
    },
    {
      company: "HILL HOLLIDAY (INTERPUBLIC GROUP)",
      period: "2009-2013",
      roles: [
        {
          title: "Business Analyst",
          location: "Boston, MA",
          period: "Nov 2009 - May 2013 (3 years 7 months)",
          highlights: [
            "Developed finance department applications and business intelligence dashboards",
            "Managed time and attendance and media buying systems",
          ],
        },
      ],
    },
    {
      company: "EMC CORPORATION (DELL)",
      period: "2006-2009",
      roles: [
        {
          title: "Junior Business Systems Analyst",
          location: "Hopkinton, MA",
          period: "May 2006 - Nov 2009 (3 years 7 months)",
          highlights: [
            "Developed ASP .NET applications for internal financial systems",
            "Created Oracle PL/SQL packages for master customer database management",
          ],
        },
      ],
    },
  ],
  education: {
    school: "BRYANT UNIVERSITY",
    location: "North Smithfield, RI",
    degree: "Bachelor of Science in Information Technology",
    graduationDate: "May 2006",
  },
  skills: {
    product: [
      "UI/UX Design, Interface Architecture",
      "User Research & Prototyping",
      "Product Strategy & Implementation",
      "Adobe Creative Suite, Sketch, Figma",
    ],
    frontend: [
      "React, React Native, JavaScript/TypeScript, PHP",
      "Modern Web Technologies (HTML5, CSS3, Tailwind, REST/GraphQL)",
    ],
    backend: [
      "Node.js Ecosystem",
      "Python (FastAPI, Django, SQLAlchemy, Pydantic)",
      "Database Systems (SQL, NoSQL, Liquibase)",
      "Legacy Systems (.NET, Objective-C)",
    ],
    cloud: ["Azure, AWS, Google Cloud", "CI/CD, Docker, Microservices", "API Design & Architecture"],
    gaming: ["Unreal Engine, C++"],
  },
};

export default function ResumePage() {
  React.useEffect(() => {
    const preventDefault = (e: Event) => {
      e.stopPropagation();
    };

    document.addEventListener("mouseup", preventDefault, true);
    document.addEventListener("click", preventDefault, true);

    return () => {
      document.removeEventListener("mouseup", preventDefault, true);
      document.removeEventListener("click", preventDefault, true);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-4 font-mono"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content (2/3) - Remove independent scrolling */}
        <div className="md:w-2/3 space-y-6">
          {/* Header */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground/90">
                Christopher St James
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-emerald-500">&gt;</span>
                <span className="text-sm md:text-base">Technology Leader & Software Engineer</span>
              </div>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.section className="relative" variants={itemVariants}>
            <div className="text-xs text-muted-foreground mb-2">{"// INTRODUCTION"}</div>
            <div className="space-y-4 text-sm leading-relaxed select-text">
              {RESUME_CONTENT.intro.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground select-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section className="relative" variants={itemVariants}>
            <div className="text-xs text-muted-foreground mb-2">{"// EXPERIENCE"}</div>
            <div className="space-y-4">
              {/* Experience items */}
              {RESUME_CONTENT.experience.map((exp, expIndex) => (
                <motion.div key={expIndex} className="group" variants={itemVariants} custom={expIndex}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center">
                      <span className="text-emerald-400 mr-0.5">~</span>
                      <span className="text-violet-400">$</span>
                    </span>
                    <h3 className="text-base font-medium group-hover:text-emerald-500 transition-colors">
                      {exp.company}
                    </h3>
                    <span className="text-xs text-muted-foreground">{exp.period}</span>
                  </div>
                  <div className="pl-4 border-l border-muted space-y-4">
                    {exp.roles.map((role, roleIndex) => (
                      <motion.div key={roleIndex} variants={itemVariants} custom={roleIndex}>
                        <div className="text-sm text-emerald-500/90">{role.title}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {role.location} | {role.period}
                        </div>
                        <ul className="list-none space-y-2 text-sm text-muted-foreground">
                          {role.highlights.map((highlight, highlightIndex) => (
                            <li key={highlightIndex} className="flex gap-2">
                              <span className="text-emerald-500">-&gt;</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section className="relative" variants={itemVariants}>
            <div className="text-xs text-muted-foreground mb-2">{"// EDUCATION"}</div>
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center">
                  <span className="text-emerald-400 mr-0.5">~</span>
                  <span className="text-violet-400">$</span>
                </span>
                <h3 className="text-base font-medium group-hover:text-emerald-500 transition-colors">
                  {RESUME_CONTENT.education.school}
                </h3>
                <span className="text-xs text-muted-foreground">{RESUME_CONTENT.education.graduationDate}</span>
              </div>
              <div className="pl-4 border-l border-muted">
                <div className="text-sm text-emerald-500/90">{RESUME_CONTENT.education.degree}</div>
                <div className="text-xs text-muted-foreground">{RESUME_CONTENT.education.location}</div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Sidebar (1/3) */}
        <motion.div className="md:w-1/3 space-y-6" variants={itemVariants}>
          {/* Skill Groups */}
          <section>
            <div className="text-xs text-muted-foreground mb-4">{"// CORE_TECHNOLOGIES"}</div>
            <div className="space-y-4">
              {Object.keys(skillGroups).map((key) => {
                const group = skillGroups[key as keyof typeof skillGroups];
                return (
                  <motion.div key={key} variants={itemVariants}>
                    <div className="text-xs text-muted-foreground mb-2">{group.title}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, index) => (
                        <span key={index} className={`px-2 py-1 rounded-md text-xs ${group.color}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
