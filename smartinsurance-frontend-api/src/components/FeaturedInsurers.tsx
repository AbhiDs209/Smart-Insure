const FeaturedInsurers = () => {
  const insurers = [
    { name: "LIC", logo: "🏛️", rating: "4.2", policies: "200+" },
    { name: "HDFC Life", logo: "🏦", rating: "4.5", policies: "150+" },
    { name: "ICICI Prudential", logo: "🏢", rating: "4.3", policies: "180+" },
    { name: "SBI Life", logo: "🏛️", rating: "4.1", policies: "170+" },
    { name: "Max Life", logo: "⭐", rating: "4.4", policies: "120+" },
    { name: "Bajaj Allianz", logo: "🚗", rating: "4.0", policies: "160+" },
  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Leading Insurers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare policies from India's most trusted insurance providers, 
            all in one place with real-time updates and transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {insurers.map((insurer, index) => (
            <div
              key={insurer.name}
              className="insurance-card p-6 text-center group"
            >
              <div className="text-4xl mb-3">{insurer.logo}</div>
              <h3 className="font-semibold text-foreground mb-2">{insurer.name}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>⭐ {insurer.rating}</div>
                <div>{insurer.policies} Policies</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            IRDAI Registered • Real-time Policy Updates • Transparent Comparison
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInsurers;