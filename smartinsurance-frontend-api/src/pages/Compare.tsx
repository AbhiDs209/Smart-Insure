import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check, X, Filter, Star } from "lucide-react";

const Compare = () => {
  const [selectedType, setSelectedType] = useState("life");
  const [selectedFilters, setSelectedFilters] = useState({
    premium: "all",
    coverage: "all",
    company: "all"
  });

  const policies = [
    {
      id: 1,
      name: "LIC Jeevan Anand",
      company: "LIC",
      type: "life",
      premium: "₹15,000/year",
      coverage: "₹10,00,000",
      features: ["Tax Benefits", "Maturity Benefits", "Death Benefits"],
      rating: 4.2,
      claimRatio: "98.5%"
    },
    {
      id: 2,
      name: "HDFC Click 2 Protect",
      company: "HDFC Life",
      type: "life",
      premium: "₹12,500/year",
      coverage: "₹10,00,000",
      features: ["Online Purchase", "Fast Claims", "Flexible Premiums"],
      rating: 4.5,
      claimRatio: "99.1%"
    },
    {
      id: 3,
      name: "Max Life Smart Secure",
      company: "Max Life",
      type: "life",
      premium: "₹18,000/year",
      coverage: "₹15,00,000",
      features: ["High Coverage", "Rider Options", "Premium Waiver"],
      rating: 4.4,
      claimRatio: "97.8%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Compare Insurance Policies
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find and compare the best insurance policies from trusted providers. 
            Make informed decisions with transparent pricing and detailed comparisons.
          </p>
        </div>

        {/* Filters */}
        <div className="insurance-card p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Filter Policies</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Insurance Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="life">Life Insurance</SelectItem>
                <SelectItem value="health">Health Insurance</SelectItem>
                <SelectItem value="car">Car Insurance</SelectItem>
                <SelectItem value="home">Home Insurance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFilters.premium} 
                   onValueChange={(value) => setSelectedFilters({...selectedFilters, premium: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Premium Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Premiums</SelectItem>
                <SelectItem value="low">Under ₹10,000</SelectItem>
                <SelectItem value="medium">₹10,000 - ₹25,000</SelectItem>
                <SelectItem value="high">Above ₹25,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFilters.coverage} 
                   onValueChange={(value) => setSelectedFilters({...selectedFilters, coverage: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Coverage Amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Coverage</SelectItem>
                <SelectItem value="low">Under ₹5 Lakh</SelectItem>
                <SelectItem value="medium">₹5 Lakh - ₹20 Lakh</SelectItem>
                <SelectItem value="high">Above ₹20 Lakh</SelectItem>
              </SelectContent>
            </Select>

            <Button className="hero-button">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="comparison-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left p-4 font-semibold">Policy Details</th>
                  <th className="text-center p-4 font-semibold">Premium</th>
                  <th className="text-center p-4 font-semibold">Coverage</th>
                  <th className="text-center p-4 font-semibold">Rating</th>
                  <th className="text-center p-4 font-semibold">Claim Ratio</th>
                  <th className="text-center p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy, index) => (
                  <tr key={policy.id} className={index % 2 === 0 ? "bg-background" : "bg-accent/30"}>
                    <td className="p-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{policy.name}</h4>
                        <p className="text-sm text-muted-foreground">{policy.company}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {policy.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="font-semibold text-primary">{policy.premium}</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="font-semibold">{policy.coverage}</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{policy.rating}</span>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="font-semibold text-green-600">{policy.claimRatio}</div>
                    </td>
                    <td className="text-center p-4">
                      <Button size="sm" className="hero-button">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note about backend integration */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            💡 Real-time policy data and comparisons will be available once backend integration is complete.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compare;