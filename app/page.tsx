import { loadMarkdown } from "@/utils/loadMarkdown";

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

export default function Home() {
  const resumeContent = loadMarkdown("stjames-resume.md");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-6xl font-bold mb-4">Christopher St James</h1>
        <h2 className="text-3xl text-muted-foreground mb-8">Technology Leader & Software Engineer</h2>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section>
          <h2 className="text-4xl font-bold mb-6">Latest Projects</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-lg border border-muted bg-background/50">
              <h3 className="text-2xl font-bold mb-2">Smite 2 Developer Portal</h3>
              <p className="text-muted-foreground">
                React-based configuration management system for game items, loot, and vendors
              </p>
            </div>
            <div className="p-6 rounded-lg border border-muted bg-background/50">
              <h3 className="text-2xl font-bold mb-2">Starsiege: Raiders</h3>
              <p className="text-muted-foreground">Backend systems for matchmaking and player progression</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-6">Skills & Expertise</h2>
          <div className="space-y-4">
            {Object.entries(skillGroups).map(([key, group]) => (
              <div key={key} className="space-y-2">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className={`px-3 py-1 rounded-full text-sm ${group.color}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
