import { Button } from "@/components/ui/button";
import { Search, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-insurance.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="z-10">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Find the Perfect
                <span className="block text-primary-light">Insurance Policy</span>
                for Your Family
              </h1>
              
              <p className="text-xl text-primary-foreground/90 max-w-lg">
                Compare life, health, and asset insurance policies from trusted providers. 
                Get personalized recommendations in minutes.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="trust-badge">
                  <Shield className="h-4 w-4 inline mr-2" />
                  IRDAI Registered
                </div>
                <div className="trust-badge">
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  50+ Insurers
                </div>
                <div className="trust-badge">
                  <Search className="h-4 w-4 inline mr-2" />
                  Real-time Updates
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/compare">
                  <Button size="lg" className="hero-button w-full sm:w-auto">
                    Compare Policies Now
                  </Button>
                </Link>
                <Link to="/recommendations">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Get Recommendations
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-glow">
              <img
                src={heroImage}
                alt="Family reviewing insurance policies together"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary-foreground text-primary p-4 rounded-xl shadow-lg animate-bounce">
              <Shield className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground p-3 rounded-lg shadow-lg">
              <span className="text-sm font-semibold">Save up to 40%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;