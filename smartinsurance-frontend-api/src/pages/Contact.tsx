import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageCircle, HeadphonesIcon } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented with backend integration
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      details: "1-800-INSURE (467873)",
      description: "Monday to Friday, 9 AM - 7 PM"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      details: "support@insurewise.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Head Office",
      details: "Mumbai, Maharashtra",
      description: "Bandra-Kurla Complex, Mumbai 400051"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: "Mon - Fri: 9 AM - 7 PM",
      description: "Sat: 10 AM - 4 PM, Sun: Closed"
    }
  ];

  const faqItems = [
    {
      question: "How does InsureWise make money?",
      answer: "We earn commission from insurance partners when customers purchase policies through our platform. This doesn't affect the policy price or our recommendations."
    },
    {
      question: "Is the policy comparison accurate?",
      answer: "Yes, we get real-time data directly from insurance companies and IRDAI databases to ensure accuracy and up-to-date information."
    },
    {
      question: "Can I buy insurance directly through InsureWise?",
      answer: "Yes, once our backend integration is complete, you'll be able to purchase policies directly through our platform with seamless processing."
    },
    {
      question: "How are recommendations personalized?",
      answer: "Our AI analyzes your profile, financial situation, risk tolerance, and family needs to recommend the most suitable policies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about insurance? Need help comparing policies? 
            Our expert team is here to assist you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Inquiry Type
                      </label>
                      <Select value={formData.inquiryType} onValueChange={(value) => 
                        setFormData({...formData, inquiryType: value})
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="policy">Policy Comparison</SelectItem>
                          <SelectItem value="claim">Claim Assistance</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      required
                      placeholder="Brief subject of your inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      placeholder="Please describe your inquiry in detail..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="hero-button w-full md:w-auto px-8">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="insurance-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-primary p-2 bg-primary/10 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-primary font-medium mb-1">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="insurance-card">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Chat */}
        <div className="insurance-card p-8 mt-12 text-center">
          <HeadphonesIcon className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Need Immediate Help?</h3>
          <p className="text-muted-foreground mb-6">
            Our AI-powered chatbot is available 24/7 to answer your insurance questions 
            and help you find the right policies.
          </p>
          <Button className="hero-button">
            Start Live Chat
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            💡 Live chat functionality will be available once backend integration is complete.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;