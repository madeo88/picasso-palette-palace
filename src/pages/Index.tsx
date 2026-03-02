import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BiographySection from "@/components/BiographySection";
import GallerySection from "@/components/GallerySection";
import PeriodsTimeline from "@/components/PeriodsTimeline";
import QuotesSection from "@/components/QuotesSection";
import CommentsSection from "@/components/CommentsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BiographySection />
      <GallerySection />
      <PeriodsTimeline />
      <QuotesSection />
      <CommentsSection />
      <Footer />
    </div>
  );
};

export default Index;
