import { Code, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(271,91%,65%)]/10 via-background to-[hsl(191,91%,55%)]/10 animate-gradient" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Code Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-[hsl(271,91%,65%)] to-[hsl(191,91%,55%)] rounded-2xl shadow-2xl animate-float">
          <Code className="w-10 h-10 text-white" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-[hsl(271,91%,65%)] to-[hsl(191,91%,55%)] bg-clip-text text-transparent">
            Full-Stack Developer
          </span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-foreground/90 mb-4 font-semibold animate-fade-in-delay-1">
          Alex Jordan
        </p>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-delay-2">
          Computer Science student passionate about building elegant solutions to complex problems.
          Specializing in React, Node.js, and cloud technologies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-delay-3">
          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-gradient-to-r from-[hsl(271,91%,65%)] to-[hsl(191,91%,55%)] text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </button>
          <a
            href="#projects"
            className="px-8 py-4 bg-background border-2 border-border hover:border-[hsl(271,91%,65%)] rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
          >
            View My Work
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 animate-fade-in-delay-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-[hsl(271,91%,65%)] transition-all duration-300 hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-[hsl(191,91%,55%)] transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:alex@example.com"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-gradient-to-r hover:from-[hsl(271,91%,65%)] hover:to-[hsl(191,91%,55%)] transition-all duration-300 hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
