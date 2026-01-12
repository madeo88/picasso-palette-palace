import { useState } from "react";

interface Artwork {
  id: number;
  title: string;
  year: string;
  period: string;
  description: string;
  colors: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Les Demoiselles d'Avignon",
    year: "1907",
    period: "Proto-Cubismo",
    description: "Capolavoro rivoluzionario che segna l'inizio del Cubismo",
    colors: "from-picasso-terracotta to-picasso-rose",
  },
  {
    id: 2,
    title: "Guernica",
    year: "1937",
    period: "Surrealismo",
    description: "Potente denuncia contro gli orrori della guerra",
    colors: "from-gray-600 to-gray-800",
  },
  {
    id: 3,
    title: "Il Vecchio Chitarrista",
    year: "1903",
    period: "Periodo Blu",
    description: "Espressione malinconica del Periodo Blu",
    colors: "from-picasso-blue to-blue-900",
  },
  {
    id: 4,
    title: "I Tre Musicisti",
    year: "1921",
    period: "Cubismo Sintetico",
    description: "Capolavoro del Cubismo sintetico",
    colors: "from-amber-700 to-picasso-terracotta",
  },
  {
    id: 5,
    title: "La Ragazza con la Colomba",
    year: "1901",
    period: "Periodo Blu",
    description: "Tenerezza e innocenza del primo periodo parigino",
    colors: "from-picasso-blue to-slate-700",
  },
  {
    id: 6,
    title: "Ritratto di Dora Maar",
    year: "1937",
    period: "Surrealismo",
    description: "Ritratto iconico della sua musa e amante",
    colors: "from-picasso-rose to-picasso-gold",
  },
];

const GallerySection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="opere" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-picasso-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Capolavori Immortali
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Opere Celebri
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group relative overflow-hidden bg-card border border-border hover:border-picasso-gold/30 transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredId(artwork.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Gradient Background */}
              <div
                className={`h-64 bg-gradient-to-br ${artwork.colors} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-background via-background/50 to-transparent">
                <span className="text-picasso-gold text-xs tracking-widest uppercase mb-2">
                  {artwork.period} • {artwork.year}
                </span>
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-picasso-gold transition-colors duration-300">
                  {artwork.title}
                </h3>
                <p
                  className={`text-muted-foreground text-sm transition-all duration-500 ${
                    hoveredId === artwork.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {artwork.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-picasso-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
