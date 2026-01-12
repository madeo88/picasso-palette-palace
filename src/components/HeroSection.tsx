import heroCubist from "@/assets/hero-cubist.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen hero-gradient flex items-center overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-picasso-gold/20 rotate-12 animate-float" />
      <div className="absolute bottom-40 right-20 w-24 h-24 border border-picasso-blue/20 -rotate-6 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-picasso-rose/10 geometric-shape animate-float" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-6 pt-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="z-10 animate-fade-up">
          <p className="text-picasso-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            1881 — 1973
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            Pablo
            <br />
            <span className="text-gradient">Picasso</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8 font-body leading-relaxed">
            Il genio rivoluzionario che ha ridefinito l'arte del XX secolo,
            padre del Cubismo e maestro di innumerevoli stili artistici.
          </p>
          <div className="flex gap-4">
            <a
              href="#opere"
              className="px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
            >
              Esplora le Opere
            </a>
            <a
              href="#biografia"
              className="px-8 py-4 border border-foreground/20 text-foreground font-body text-sm tracking-wide uppercase hover:bg-foreground/5 transition-all duration-300"
            >
              Biografia
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-picasso-blue/20 to-picasso-rose/20 blur-2xl" />
            <img
              src={heroCubist}
              alt="Arte Cubista ispirata a Picasso"
              className="relative w-full h-auto cubist-border shadow-elegant"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-card p-6 shadow-card">
            <p className="text-picasso-gold font-display text-4xl font-bold">50K+</p>
            <p className="text-muted-foreground text-sm">Opere Create</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">Scorri</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
