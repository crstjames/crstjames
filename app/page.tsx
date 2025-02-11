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
  summary: `Technology leader with 19+ years of experience in full-stack development, UI/UX design, and technical
  leadership. Successfully transitioned from managing development teams to engineering software solutions
  in game development and enterprise architecture. Specializes in React, Python, and Node.js solutions
  across gaming and enterprise systems.`,
  experience: [
    {
      company: "HI-REZ STUDIOS",
      period: "2022-2025",
      roles: [
        {
          title: "Advanced Software Engineer, RallyHere Division",
          location: "Remote - Alpharetta, GA",
          period: "2023-2025",
          highlights: [
            "Engineered React-based Developer Portal solutions for Smite 2",
            "Developed Python-based API layer for game databases",
          ],
        },
        {
          title: "Senior Backend Engineer, Prophecy Games Division",
          location: "Alpharetta, GA",
          period: "2022-2023",
          highlights: ["Led gameplay systems development for Starsiege: Raiders"],
        },
      ],
    },
    // ... other experience entries
  ],
};

export default function Home() {
  // Remove the loadMarkdown call
  // const _resumeContent = loadMarkdown("stjames-resume.md");

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 font-mono">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content (2/3) */}
        <div className="md:w-2/3 space-y-16">
          {/* Header */}
          <div className="relative mb-16">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="relative">
              <div className="text-xs text-muted-foreground mb-2">{"// IDENTITY"}</div>
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
            <div className="text-xs text-muted-foreground mb-4">{"// PROFESSIONAL_SUMMARY"}</div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p className="text-muted-foreground">{RESUME_CONTENT.summary}</p>
            </div>
          </section>

          {/* Experience */}
          <section className="relative">
            <div className="text-xs text-muted-foreground mb-4">{"// EXPERIENCE[]"}</div>
            <div className="space-y-8">
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
                    <div className="text-sm text-emerald-500/90">Advanced Software Engineer, RallyHere Division</div>
                    <div className="text-xs text-muted-foreground mb-2">Remote - Alpharetta, GA | 2023-2025</div>
                    <ul className="list-none space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>Engineered React-based Developer Portal solutions for Smite 2</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>Developed Python-based API layer for game databases</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm text-emerald-500/90">Senior Backend Engineer, Prophecy Games Division</div>
                    <div className="text-xs text-muted-foreground mb-2">Alpharetta, GA | 2022-2023</div>
                    <ul className="list-none space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-emerald-500">-&gt;</span>
                        <span>Led gameplay systems development for Starsiege: Raiders</span>
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
                      <span>Developed 20+ internal applications using Node.JS and React/Native</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Led Development and Business Intelligence Teams</span>
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
                      <span>Developed successful iOS Applications reaching 150,000+ downloads</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-500">-&gt;</span>
                      <span>Implemented comprehensive IT infrastructure and VOIP solutions</span>
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
                      <span>Developed custom applications and business intelligence dashboards</span>
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
                      <span>Developed ASP .NET applications and Oracle PL/SQL solutions</span>
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
        <div className="md:w-1/3 space-y-8">
          <div className="sticky top-4">
            <div className="text-xs text-muted-foreground mb-4">{"// TECHNICAL_SKILLS"}</div>
            <div className="space-y-6">
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
            <div className="mt-8">
              <div className="text-xs text-muted-foreground mb-4">{"// VENTURES"}</div>
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
