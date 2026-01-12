const quotes = [
  {
    text: "L'arte è una bugia che ci fa capire la verità.",
    context: "Sulla natura dell'arte",
  },
  {
    text: "Dipingo gli oggetti come li penso, non come li vedo.",
    context: "Sul Cubismo",
  },
  {
    text: "I buoni artisti copiano, i grandi artisti rubano.",
    context: "Sull'ispirazione creativa",
  },
];

const QuotesSection = () => {
  return (
    <section id="citazioni" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-picasso-blue/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-picasso-rose/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-picasso-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Parole del Maestro
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Citazioni
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="relative p-8 bg-card border border-border hover:border-picasso-gold/30 transition-all duration-300 group"
            >
              {/* Quote mark */}
              <span className="absolute -top-4 left-8 font-display text-8xl text-picasso-gold/20 leading-none">
                "
              </span>

              <blockquote className="relative z-10 pt-8">
                <p className="font-display text-xl italic text-foreground mb-6 leading-relaxed">
                  {quote.text}
                </p>
                <footer className="text-picasso-gold text-sm tracking-wide uppercase">
                  {quote.context}
                </footer>
              </blockquote>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-picasso-blue to-picasso-rose group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
