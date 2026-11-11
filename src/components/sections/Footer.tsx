import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[hsl(271,91%,65%)] to-[hsl(191,91%,55%)] bg-clip-text text-transparent mb-2">
              Alex Jordan
            </h3>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer & Student
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-[hsl(271,91%,65%)] transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-[hsl(191,91%,55%)] transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:alex.jordan@example.com"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-gradient-to-r hover:from-[hsl(271,91%,65%)] hover:to-[hsl(191,91%,55%)] transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} Alex Jordan. Made with <Heart className="w-4 h-4 text-[hsl(0,84%,60%)] fill-current" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
}
