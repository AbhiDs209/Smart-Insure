import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calculator, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuickCompare = () => {
  const [formData, setFormData] = useState({
    insuranceType: "",
    age: "",
    income: "",
    coverage: ""
  });

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Quick Insurance Calculator
          </h2>
          <p className="text-muted-foreground">
            Get instant policy recommendations based on your profile
          </p>
        </div>

        <div className="insurance-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Insurance Type
              </label>
              <Select value={formData.insuranceType} onValueChange={(value) => 
                setFormData({...formData, insuranceType: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="life">Life Insurance</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                  <SelectItem value="car">Car Insurance</SelectItem>
                  <SelectItem value="home">Home Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Age
              </label>
              <Input
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Annual Income (₹)
              </label>
              <Input
                type="number"
                placeholder="e.g., 500000"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Coverage Amount (₹)
              </label>
              <Input
                type="number"
                placeholder="e.g., 1000000"
                value={formData.coverage}
                onChange={(e) => setFormData({...formData, coverage: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="hero-button" size="lg">
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Premium
            </Button>
            <Link to="/compare">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View All Policies
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickCompare;