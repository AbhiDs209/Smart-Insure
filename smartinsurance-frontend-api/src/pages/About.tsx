import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, TrendingUp, Award, Target, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Insurance Partners", value: "50+", icon: <Shield className="h-6 w-6" /> },
    { label: "Happy Customers", value: "10,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Policies Compared", value: "1M+", icon: <TrendingUp className="h-6 w-6" /> },
    { label: "Claims Assisted", value: "5,000+", icon: <Award className="h-6 w-6" /> }
  ];

  const teamMembers = [
    {
      name: "aniket",
      role: "Founder & CEO",
      experience: "15+ years in Insurance",
      description: "Former insurance executive with expertise in policy analysis and regulatory compliance.",
      image: "👨‍💼"
    },
    {
      name: "Ankit Yadav",
      role: "Head of Product",
      experience: "12+ years in FinTech",
      description: "Product strategist focused on creating user-friendly insurance comparison tools.",
      image: "👩‍💻"
    },
    {
      name: "chakshu",
      role: "Chief Technology Officer",
      experience: "10+ years in Tech",
      description: "Technology leader building scalable platforms for insurance comparison and analysis.",
      image: "👨‍🔧"
    },
    {
      name: "abhishek",
      role: "Insurance Advisor",
      experience: "20+ years in Finance",
      description: "Certified financial planner and insurance expert helping customers make informed decisions.",
      image: "👩‍⚕️"
    },
    {
      name: "anshu",
      role: "Senior Developer",
      experience: "8+ years in Tech",
      description: "Full-stack developer specializing in building robust insurance comparison platforms.",
      image: "👨‍💻"
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Transparency",
      description: "We believe in complete transparency in insurance comparisons with no hidden costs or biased recommendations."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust",
      description: "Building trust through IRDAI compliance, verified data, and partnerships with reputable insurers."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer First",
      description: "Every feature and service is designed with our customers' best interests and financial security in mind."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Innovation",
      description: "Leveraging technology to simplify insurance comparison and make financial planning accessible to all."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            About InsureWise
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to democratize insurance in India by making policy comparison 
            transparent, accessible, and user-friendly for every family.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="insurance-card p-6 text-center">
              <div className="text-primary mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="insurance-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower every Indian family with the knowledge and tools needed to make 
                informed insurance decisions. We strive to eliminate confusion from insurance 
                buying by providing transparent comparisons, personalized recommendations, 
                and expert guidance.
              </p>
            </CardContent>
          </Card>

          <Card className="insurance-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become India's most trusted insurance comparison platform, where 
                transparency meets technology. We envision a future where every insurance 
                decision is backed by comprehensive data, expert insights, and complete 
                peace of mind.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="insurance-card text-center">
                <CardHeader>
                  <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="insurance-card text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary font-semibold mb-2">{member.experience}</p>
                  <p className="text-xs text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <Card className="insurance-card p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">Why Choose InsureWise?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">IRDAI Registered</h3>
                <p className="text-sm text-muted-foreground">
                  Fully compliant with insurance regulations and registered with IRDAI for your security.
                </p>
              </div>
              <div>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Our team of certified insurance advisors provides personalized recommendations.
                </p>
              </div>
              <div>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Real-time Data</h3>
                <p className="text-sm text-muted-foreground">
                  Always up-to-date policy information with real-time premium calculations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;