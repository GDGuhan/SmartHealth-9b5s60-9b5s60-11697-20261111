import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack online shopping platform with user authentication, product management, shopping cart, and payment integration using Stripe.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://example.com',
    gradient: 'from-[hsl(271,91%,65%)] to-[hsl(251,91%,75%)]',
  },
  {
    title: 'Task Management App',
    description: 'Real-time collaborative task manager with drag-and-drop functionality, team workspaces, and progress tracking dashboards.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSockets'],
    github: 'https://github.com',
    demo: 'https://example.com',
    gradient: 'from-[hsl(191,91%,55%)] to-[hsl(171,91%,65%)]',
  },
  {
    title: 'Weather Forecast Dashboard',
    description: 'Interactive weather application with 7-day forecasts, location search, and real-time weather alerts using OpenWeather API.',
    tags: ['React', 'REST API', 'Chart.js', 'Tailwind'],
    github: 'https://github.com',
    demo: 'https://example.com',
    gradient: 'from-[hsl(271,91%,65%)] to-[hsl(191,91%,55%)]',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-[hsl(271,91%,65%)] to-[hsl(191,91%,55%)] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing different technologies and problem-solving approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group bg-background/50 backdrop-blur-sm border-2 border-border hover:border-[hsl(271,91%,65%)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              
              <CardHeader>
                <CardTitle className="text-xl font-bold group-hover:text-[hsl(271,91%,65%)] transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-secondary/80 hover:bg-secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(271,91%,65%)] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
