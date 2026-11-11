import { Card } from '@/components/ui/card';
import { Code2, Database, Cloud, Smartphone } from 'lucide-react';

const skills = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'React, TypeScript, Tailwind CSS, Next.js',
  },
  {
    icon: Database,
    title: 'Backend Development',
    description: 'Node.js, Express, PostgreSQL, MongoDB',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'AWS, Docker, CI/CD, Git',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'React Native, Progressive Web Apps',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-[hsl(271,91%,65%)] to-[hsl(191,91%,55%)] bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a third-year Computer Science student with a passion for creating innovative web applications
            and solving real-world problems through technology.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="p-6 bg-background/50 backdrop-blur-sm border-2 border-border hover:border-[hsl(271,91%,65%)] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[hsl(271,91%,65%)] to-[hsl(191,91%,55%)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <skill.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </Card>
          ))}
        </div>

        {/* Bio Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-8 bg-background/50 backdrop-blur-sm border-2 border-border">
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I started my coding journey in high school, building simple websites and gradually fell in love
                with the endless possibilities of software development. Today, I'm pursuing my Computer Science
                degree while working on various personal and academic projects.
              </p>
              <p>
                I believe in writing clean, maintainable code and staying up-to-date with the latest technologies.
                When I'm not coding, you'll find me contributing to open-source projects, learning new frameworks,
                or exploring emerging tech trends.
              </p>
              <p>
                I'm actively seeking internship opportunities and freelance projects where I can apply my skills
                and continue growing as a developer.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
