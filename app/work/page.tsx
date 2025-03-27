"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, ArrowLeft } from "lucide-react";
import ImageLightbox from "../components/ImageLightbox";

// Project data - replace with your actual projects
const projects = [
  {
    id: "project-lothirion",
    title: "Lothirion Consulting React Website",
    description:
      "AI consulting, rapid prototyping & product innovation—Lothirion crafts elegant, gamified digital experiences.",
    thumbnail: "/portfolio/lothirion.png",
    category: "Game Development & AI",
    year: "2025",
    tags: ["Game Development", "AI", "Product Design", "UI/UX"],
    details: {
      overview:
        "Founder of Lothirion.com, leading AI consulting engagements, rapid prototyping, and brand/product innovation. Built the entire website using Vite, Next.js, TypeScript, Tailwind CSS, and Supabase. Deployed on Vercel, with full setup of domains, email infrastructure, and a content management system.",
      images: ["/images/lothirion1.png", "/images/lothirion2.png"],
      challenges: "",
      solution: "",
      technologies: ["React", "Vite", "Tailwind", "Supabase"],
    },
  },
  {
    id: "project-1",
    title: "Developer Portal",
    description: "Game Developer Interface",
    thumbnail: "/images/devportal.png",
    category: "UI/UX React Python",
    year: "2024",
    tags: ["UI/UX", "React", "Tailwind", "Python"],
    details: {
      overview:
        "An enterprise application interface for backend live service systems for games such as Smite 2, allowing game developers to configure items, loot, vendors, and matchmaking configurations. Developed the OpenAPI FastAPI Python API layer between the developer portal and the game database.",
      images: ["/images/devportal1.jpg", "/images/devportal2.jpg"],
      challenges: "Creating a design system that works across multiple platforms while maintaining consistency.",
      solution: "Developed a modular component library with extensive documentation and usage examples.",
      technologies: ["React", "Tailwind", "Material UI", "Python"],
    },
  },
  {
    id: "project-6",
    title: "Deadzone",
    description: "Corridor Horror Extraction Shooter",
    thumbnail: "/portfolio/deadzone.jpg",
    category: "Unreal Engine UI & C++",
    year: "2023",
    tags: ["Unreal Engine", "C++", "Sketch"],
    details: {
      overview:
        "Worked on the HUD UI elements and interactions, inventory management, End Of Match live stats, in-game combat stats, achievement system, and progress bar displays.",
      images: ["/images/deadzone1.jpg", "/images/deadzone2.png"],
      challenges: "Seamlessly integrating high-quality video content into the web experience.",
      solution: "Leveraged modern web technologies for smooth playback and interaction.",
      technologies: ["C++", "Unreal Engine", "Sketch"],
      video: "/videos/deadzone_work.mp4",
    },
  },
  {
    id: "project-5",
    title: "Raiders",
    description: "Open World Looter Shooter",
    thumbnail: "/portfolio/raiders.jpg",
    category: "Unreal Engine UI & C++",
    year: "2022",
    tags: ["Unreal Engine", "C++", "Sketch"],
    details: {
      overview: "Focused on the User Interface and Social Systems.",
      images: [],
      challenges: "Integrating high-quality video content seamlessly into the web experience.",
      solution: "Utilized modern web technologies to ensure smooth playback and interaction.",
      technologies: ["C++", "Unreal Engine", "Sketch"],
      video: "/videos/Raiders.mp4",
    },
  },
  {
    id: "project-8",
    title: "Quantum Flux",
    description: "Metaverse NFT Marketplace",
    thumbnail: "/images/QuantumFlux.jpg",
    category: "Product Design, UI/UX",
    year: "2021",
    tags: ["Product Design", "UI/UX"],
    details: {
      overview:
        "Built the UI/UX and Product Design around Quantum Flux NFT Marketplace, a supplement to game systems for buying and selling in-game earned NFTs across the metaverse.",
      images: ["/images/qflux1.jpg", "/images/qflux2.jpg"],
      challenges: "Understanding and harnessing the power of quantum mechanics.",
      solution: "Developed innovative algorithms to leverage quantum computing capabilities.",
      technologies: ["Quantum Algorithms", "Qiskit", "Python"],
    },
  },
  {
    id: "project-9",
    title: "Coldcoast",
    description: "Lifestyle brand",
    thumbnail: "/portfolio/coldcoast.jpg",
    category: "Lifestyle Brand Owner & Product Design, Shopify",
    year: "2020",
    tags: ["Lifestyle", "Shopify", "E-Commerce"],
    details: {
      overview:
        "Created a lifestyle brand over COVID and built a product suite of over 20 products, launching the site in 2020. Made the first $1 in sales 3 months after opening, with friends, family, and local Cape Cod residents and the coast of Michigan still wearing Coldcoast gear and hats.",
      images: [],
      challenges: "Integrating multiple data sources for comprehensive weather analysis.",
      solution: "Utilized advanced algorithms and data visualization techniques for precise forecasting.",
      technologies: ["React", "D3.js", "API Integration"],
      video: "/videos/coldcoast_intro.mp4",
    },
  },
  {
    id: "project-10",
    title: "Enterprise Apps",
    description: "Product Design for Enterprise Solutions",
    thumbnail: "/portfolio/enterprise.jpg",
    category: "Product Design, UI/UX, Developer Manager",
    year: "2017",
    tags: ["Product Design", "Enterprise", "Operations", "Solutions"],
    details: {
      overview:
        "Over 10+ internal enterprise apps ranging from communications, passenger counting, internal authentication system, conductor guides and management apps, Event manager Systems, Snow Removal tracker Apps, Live On Time Performance and All Page alerting systems.",
      images: ["/images/enterprise1.png", "/images/enterprise2.png"],
      challenges: "Integrating diverse enterprise systems into a cohesive platform.",
      solution: "Developed a scalable architecture with seamless integration capabilities.",
      technologies: ["Java", "Spring Boot", "Microservices", "Docker"],
      video: "/videos/opertionalapps.mp4",
    },
  },
  {
    id: "project-7",
    title: "Commuter App",
    description: "A seamless travel experience with real-time updates",
    thumbnail: "/portfolio/commuter.jpg",
    category: "Mobile App",
    year: "2016",
    tags: ["Product Design", "UI/UX"],
    details: {
      overview:
        "Built an app for commuters around Boston with over 100,000 downloads on iOS and Android, providing real-time train updates, passenger counts, and alerts across the commuter rail network.",
      images: [],
      challenges: "Integrating real-time data feeds into a user-friendly interface.",
      solution: "Utilized cutting-edge mobile technologies for smooth and responsive user experience.",
      technologies: ["React Native", "API Integration", "UX Design"],
      video: "/videos/CommuterApp.mp4",
    },
  },
];

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const detailViewRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If detail view is open and the click was outside the detail view container
      if (selectedProject && detailViewRef.current && !detailViewRef.current.contains(event.target as Node)) {
        setSelectedProject(null);
      }
    }

    // Add event listener when a project is selected
    if (selectedProject) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProject]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [selectedProject]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="min-h-screen bg-background max-w-7xl mx-auto px-4 py-4 font-mono">
      {/* Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground/90">Work</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-emerald-500">&gt;</span>
            <span className="text-sm md:text-base">Selected projects and case studies</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative">
        <div className="text-xs text-muted-foreground mb-4">{"// PORTFOLIO_PROJECTS"}</div>

        {/* Portfolio Grid - Always render, but hide when project is selected */}
        <div
          className={`transition-opacity duration-300 ${
            selectedProject ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative bg-background/5 border border-muted rounded-lg overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-colors"
                onClick={() => setSelectedProject(project)}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  {project.details.video ? (
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                      <source src={project.details.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <motion.img
                      src={project.thumbnail}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ y: 0 }}
                      whileHover={{ y: -10 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-purple-500/20" />
                  <div className="flex items-center justify-center h-full text-muted-foreground">{project.title}</div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-foreground group-hover:text-emerald-500 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-500/70">{project.category}</span>
                    <ChevronRight className="h-3 w-3 text-emerald-500/70" />
                    <span className="text-muted-foreground">View Project</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Full screen overlay when project is selected */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Semi-transparent backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/70 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              />

              {/* Project Detail View with ref for click-outside detection */}
              <motion.div
                ref={detailViewRef}
                className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative bg-background/95 border border-transparent rounded-lg overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                  style={{ borderImage: "linear-gradient(to bottom right, #34D399, #1F2937, #8B5CF6) 1" }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b border-muted bg-background/95 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <h2 className="font-medium text-emerald-500">{selectedProject.title}</h2>
                      <span className="text-xs text-muted-foreground">({selectedProject.year})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="group flex items-center gap-2 px-3 py-1.5 rounded hover:bg-emerald-500/10 text-sm transition-colors border border-emerald-500/50"
                        aria-label="Return to gallery"
                      >
                        <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:text-emerald-500" />
                        <span className="text-emerald-400 group-hover:text-emerald-500">Return to Gallery</span>
                      </button>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="rounded-full p-1.5 hover:bg-emerald-500/10 transition-colors"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5 text-emerald-400 hover:text-emerald-500" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">{"// OVERVIEW"}</div>
                        <p className="text-sm text-muted-foreground">{selectedProject.details.overview}</p>
                      </div>

                      <div>
                        <div className="text-xs text-muted-foreground mb-2">{"// TECH_STACK"}</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.details.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-background/20 rounded text-xs text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-muted-foreground mb-2">{"// PROJECT_IMAGES"}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedProject.details.images.map((image, index) => (
                            <div
                              key={index}
                              className="aspect-video relative bg-background/20 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-500/50 transition-all"
                              onClick={() => setLightboxImage(image)}
                            >
                              <img
                                src={image}
                                alt={`Project Image ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-white text-sm">Click to enlarge</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedProject.details.video && (
                        <div className="aspect-video relative bg-background/20 rounded-lg overflow-hidden mb-6">
                          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                            <source src={selectedProject.details.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageSrc={lightboxImage || ""}
        alt="Project image detail"
      />
    </div>
  );
}
