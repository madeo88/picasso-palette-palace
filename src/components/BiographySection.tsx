const BiographySection = () => {
  return (
    <section id="biografia" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Stats */}
          <div className="space-y-8">
            <div className="animate-slide-in">
              <p className="text-picasso-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
                La Vita del Maestro
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Biografia
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "92", label: "Anni di Vita" },
                { number: "1907", label: "Les Demoiselles d'Avignon" },
                { number: "7", label: "Periodi Artistici" },
                { number: "13", label: "Anni a Parigi" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="p-6 bg-muted/30 border border-border hover:border-picasso-gold/30 transition-colors duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="font-display text-3xl text-picasso-gold font-bold mb-2">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="space-y-6">
            <p className="text-foreground/90 text-lg leading-relaxed">
              <span className="font-display text-5xl text-picasso-gold float-left mr-4 leading-none">P</span>
              ablo Ruiz Picasso nacque il 25 ottobre 1881 a Málaga, in Spagna.
              Figlio di un professore di disegno, mostrò un talento straordinario
              fin dalla più tenera età, realizzando opere che stupivano per la
              loro maturità tecnica.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Trasferitosi a Parigi nel 1904, divenne il centro della scena
              artistica d'avanguardia. Insieme a Georges Braque, sviluppò il
              Cubismo, un movimento che avrebbe cambiato per sempre il corso
              dell'arte moderna. La sua carriera attraversò numerosi periodi
              stilistici: dal Periodo Blu al Periodo Rosa, dal Cubismo al
              Surrealismo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Morì l'8 aprile 1973 a Mougins, in Francia, lasciando un'eredità
              artistica senza pari che continua a influenzare artisti di tutto
              il mondo.
            </p>
            <div className="pt-6 border-t border-border">
              <blockquote className="font-display text-xl italic text-foreground/80">
                "Ogni bambino è un artista. Il problema è come rimanere un
                artista una volta cresciuti."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographySection;
