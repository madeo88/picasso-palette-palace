const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <a href="#" className="font-display text-2xl font-semibold">
              <span className="text-gradient">Picasso</span>
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Un tributo al genio dell'arte moderna
            </p>
          </div>

          <div className="flex gap-8">
            {["Biografia", "Opere", "Periodi", "Citazioni"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} — Sito dedicato alla memoria di Pablo Picasso
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
