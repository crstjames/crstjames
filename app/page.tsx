/* eslint-disable @typescript-eslint/no-unused-vars */
// import { loadMarkdown } from "@/utils/loadMarkdown";

const skillGroups = {
  frontend: {
    title: "Frontend Development",
    color: "bg-[#2563eb]/20 text-[#60a5fa] dark:bg-[#2563eb]/20 dark:text-[#60a5fa]",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "UI/UX Design"],
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
  summary: `Technology leader with 19+ years of experience in full-stack development, UI/UX, and technical leadership. Transitioned from managing development teams to gameplay design and software engineering. Specializes in React, Python, and Node.js with a strong record of leading teams and architecting complex data systems.`,
  experience: [
    {
      company: "HI-REZ STUDIOS",
      period: "2022-2025",
      roles: [
        {
          title: "Advanced Software Engineer, RallyHere",
          location: "Remote - Alpharetta, GA",
          period: "2023-2025",
          highlights: [
            "Designed and Developed React Developer Portal for Smite 2, implementing systems for items, loot, vendors, and game configuration",
            "Developed Python API layer using FastAPI, SQLAlchemy, and Pydantic with Liquibase for database migrations",
            "Designed and implemented RESTful APIs for game configuration management and content delivery",
          ],
        },
        {
          title: "Senior / Principal Backend Engineer, Prophecy Games",
          location: "Remote - Alpharetta, GA",
          period: "2022-2023",
          highlights: [
            "Designed and implemented user interface systems for in-game menus, player progression, and match results",
            "Developed core gameplay systems including matchmaking algorithms, player ranking, and real-time statistics tracking",
            "Ran demo of Starsiege: Raiders at TwitchCon 2022 and release of Starsiege: Deadzone in 2023",
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
          period: "2014-2022",
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
          period: "2013-2014",
          highlights: [
            "Developed 3 iOS Applications reaching 150,000+ downloads and #2 in Health & Fitness Category",
            "Implemented IT infrastructure including ITIL systems and VOIP solutions",
            "Built customer-facing mobile application reaching 200,000 Boston Metro users",
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
          period: "2009-2013",
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
          period: "2006-2009",
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
    frontend: [
      "React, React Native, JavaScript/TypeScript",
      "UI/UX Design, Adobe Creative Suite, Sketch, Figma",
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

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 font-mono">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content (2/3) - Remove independent scrolling */}
        <div className="md:w-2/3 space-y-6">
          {/* Header */}
          <div className="relative">
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
          </div>

          {/* Professional Summary */}
          <section className="relative">
            <div className="text-xs text-muted-foreground mb-2">{"// PROFESSIONAL_SUMMARY"}</div>
            <div className="space-y-2 text-sm leading-relaxed">
              <p className="text-muted-foreground">{RESUME_CONTENT.summary}</p>
            </div>
          </section>

          {/* Experience */}
          <section className="relative">
            <div className="text-xs text-muted-foreground mb-2">{"// EXPERIENCE"}</div>
            <div className="space-y-4">
              {/* Hi-Rez */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">$</span>
                  <h3 className="text-base font-medium group-hover:text-emerald-500 transition-colors">
                    HI-REZ STUDIOS
                  </h3>
                  <span className="text-xs text-muted-foreground">2022-2025</span>
                </div>
                <div className="pl-4 border-l border-muted space-y-4">
                  <div>
                    <div className="text-sm text-emerald-500/90">Advanced Software Engineer, RallyHere</div>
                    <div className="text-xs text-muted-foreground mb-2">Remote - Alpharetta, GA | 2023-2025</div>
                    <ul className="list-none space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>
                          Designed and Developed React Developer Portal for Smite 2, implementing systems for items,
                          loot, vendors, and game configuration
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>
                          Developed Python API layer using FastAPI, SQLAlchemy, and Pydantic with Liquibase for database
                          migrations
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>
                          Designed and implemented RESTful APIs for game configuration management and content delivery
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm text-emerald-500/90">
                      Senior / Principal Backend Engineer, Prophecy Games
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">Remote - Alpharetta, GA | 2022-2023</div>
                    <ul className="list-none space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>
                          Designed and implemented user interface systems for in-game menus, player progression, and
                          match results
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>
                          Developed core gameplay systems including matchmaking algorithms, player ranking, and
                          real-time statistics tracking
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>
                          Led demo of Starsiege: Raiders at TwitchCon 2022 and release of Starsiege: Deadzone in 2023
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Keolis */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">$</span>
                  <h3 className="text-base font-medium group-hover:text-emerald-500 transition-colors">
                    KEOLIS COMMUTER SERVICES
                  </h3>
                  <span className="text-xs text-muted-foreground">2014-2022</span>
                </div>
                <div className="pl-4 border-l border-muted">
                  <div className="text-sm text-emerald-500/90">UI/UX Designer, Developer, and IT Manager</div>
                  <div className="text-xs text-muted-foreground mb-2">Boston, MA</div>
                  <ul className="list-none space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Built 20+ Node.JS and React/Native applications serving 2,400 employees</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Led App Development and Business Intelligence teams</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Architected Keolis Data Architecture Platform across Keolis Americas in Azure</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Created working UI/UX prototypes for pre-development validation</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Managed ITIL Systems, VOIP, Corporate Website, and Mobile Device Management</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Eversaint Creative */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">$</span>
                  <h3 className="text-base font-medium group-hover:text-emerald-500 transition-colors">
                    EVERSAINT CREATIVE
                  </h3>
                  <span className="text-xs text-muted-foreground">2013-2014</span>
                </div>
                <div className="pl-4 border-l border-muted">
                  <div className="text-sm text-emerald-500/90">Owner / Developer / Designer</div>
                  <div className="text-xs text-muted-foreground mb-2">Cape Cod, MA</div>
                  <ul className="list-none space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>
                        Developed 3 iOS Applications reaching 150,000+ downloads and #2 in Health & Fitness Category
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Implemented IT infrastructure including ITIL systems and VOIP solutions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Built customer-facing mobile application reaching 200,000 Boston Metro users</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hill Holliday */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">$</span>
                  <h3 className="text-base font-medium group-hover:text-emerald-500 transition-colors">
                    HILL HOLLIDAY
                  </h3>
                  <span className="text-xs text-muted-foreground">2009-2013</span>
                </div>
                <div className="pl-4 border-l border-muted">
                  <div className="text-sm text-emerald-500/90">Business Analyst</div>
                  <div className="text-xs text-muted-foreground mb-2">Boston, MA</div>
                  <ul className="list-none space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Developed finance department applications and business intelligence dashboards</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Managed time and attendance and media buying systems</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* EMC */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">$</span>
                  <h3 className="text-base font-medium group-hover:text-emerald-500 transition-colors">
                    EMC CORPORATION
                  </h3>
                  <span className="text-xs text-muted-foreground">2006-2009</span>
                </div>
                <div className="pl-4 border-l border-muted">
                  <div className="text-sm text-emerald-500/90">Junior Business Systems Analyst</div>
                  <div className="text-xs text-muted-foreground mb-2">Hopkinton, MA</div>
                  <ul className="list-none space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Developed ASP .NET applications for internal financial systems</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Created Oracle PL/SQL packages for master customer database management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="relative">
            <div className="text-xs text-muted-foreground mb-4">{"// EDUCATION"}</div>
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-500">$</span>
                <h3 className="text-base font-medium group-hover:text-emerald-500 transition-colors">
                  BRYANT UNIVERSITY
                </h3>
                <span className="text-xs text-muted-foreground">2006</span>
              </div>
              <div className="pl-4 border-l border-muted text-sm text-muted-foreground">
                Bachelor of Science in Information Technology
              </div>
            </div>
          </section>
        </div>

        {/* Skills Sidebar (1/3) */}
        <div className="md:w-1/3">
          <div className="space-y-6">
            <div className="text-xs text-muted-foreground mb-4">{"// TECHNICAL_SKILLS"}</div>
            <div className="space-y-4">
              {Object.entries(skillGroups).map(([key, group]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">#</span>
                    <h3 className="text-sm font-medium text-muted-foreground">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 
                          transition-colors rounded font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Entrepreneurial Ventures */}
            <div className="mt-6">
              <div className="text-xs text-muted-foreground mb-2">{"// VENTURES"}</div>
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">$</span>
                  <span className="text-sm text-muted-foreground">Coldcoast Collective</span>
                </div>
                <div className="pl-4 border-l border-muted text-xs text-muted-foreground">
                  Founded and developed lifestyle brand (coldcoast.co)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
