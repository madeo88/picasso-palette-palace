const periods = [
  {
    name: "Periodo Blu",
    years: "1901-1904",
    description: "Opere dominate da tonalità blu e temi malinconici",
    color: "bg-picasso-blue",
  },
  {
    name: "Periodo Rosa",
    years: "1904-1906",
    description: "Toni caldi rosa e arancio, soggetti circensi",
    color: "bg-picasso-rose",
  },
  {
    name: "Periodo Africano",
    years: "1907-1909",
    description: "Influenze dell'arte africana e iberica",
    color: "bg-picasso-terracotta",
  },
  {
    name: "Cubismo Analitico",
    years: "1909-1912",
    description: "Scomposizione geometrica delle forme",
    color: "bg-gray-600",
  },
  {
    name: "Cubismo Sintetico",
    years: "1912-1919",
    description: "Collage e forme più semplici e colorate",
    color: "bg-picasso-gold",
  },
  {
    name: "Neoclassicismo",
    years: "1919-1929",
    description: "Ritorno a forme classiche monumentali",
    color: "bg-stone-500",
  },
  {
    name: "Surrealismo",
    years: "1925-1937",
    description: "Forme distorte e oniriche, Guernica",
    color: "bg-slate-700",
  },
];

const PeriodsTimeline = () => {
  return (
    <section id="periodi" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-picasso-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Evoluzione Artistica
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            I Periodi
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {periods.map((period, index) => (
              <div
                key={period.name}
                className={`relative lg:flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`lg:w-1/2 ${
                    index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                  }`}
                >
                  <div className="bg-muted/30 p-6 border border-border hover:border-picasso-gold/30 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 ${period.color}`} />
                      <span className="text-picasso-gold text-sm">
                        {period.years}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      {period.name}
                    </h3>
                    <p className="text-muted-foreground">{period.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-picasso-gold rounded-full" />

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeriodsTimeline;
