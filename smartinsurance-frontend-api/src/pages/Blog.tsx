import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Life Insurance: A Complete Guide for 2024",
      excerpt: "Learn everything about life insurance types, benefits, and how to choose the right policy for your family's financial security.",
      category: "Life Insurance",
      author: "Priya Sharma",
      date: "March 15, 2024",
      readTime: "8 min read",
      image: "📋",
      featured: true
    },
    {
      id: 2,
      title: "New IRDAI Guidelines: What They Mean for Your Health Insurance",
      excerpt: "Recent regulatory changes affecting health insurance policies and how they impact your coverage and claims.",
      category: "Health Insurance",
      author: "Rajesh Kumar",
      date: "March 12, 2024",
      readTime: "6 min read",
      image: "⚖️",
      featured: true
    },
    {
      id: 3,
      title: "Tax Benefits on Insurance Premiums: Maximize Your Savings",
      excerpt: "A comprehensive guide to tax deductions available on insurance premiums under various sections of the Income Tax Act.",
      category: "Tax Planning",
      author: "Anjali Singh",
      date: "March 10, 2024",
      readTime: "10 min read",
      image: "💰",
      featured: false
    },
    {
      id: 4,
      title: "Claim Settlement Ratio: Why It Matters When Choosing Insurance",
      excerpt: "Understanding claim settlement ratios and how to use this metric to select the most reliable insurance providers.",
      category: "Insurance Tips",
      author: "Vikram Mehta",
      date: "March 8, 2024",
      readTime: "5 min read",
      image: "📊",
      featured: false
    },
    {
      id: 5,
      title: "Digital Health Cards: The Future of Health Insurance",
      excerpt: "How digital health cards are revolutionizing cashless treatment and making healthcare more accessible.",
      category: "Health Insurance",
      author: "Dr. Sneha Patel",
      date: "March 5, 2024",
      readTime: "7 min read",
      image: "📱",
      featured: false
    },
    {
      id: 6,
      title: "Top 10 Insurance Myths Debunked",
      excerpt: "Common misconceptions about insurance that could be costing you money and peace of mind.",
      category: "Insurance Tips",
      author: "Arjun Gupta",
      date: "March 1, 2024",
      readTime: "12 min read",
      image: "❓",
      featured: false
    }
  ];

  const categories = ["All", "Life Insurance", "Health Insurance", "Tax Planning", "Insurance Tips"];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Insurance Insights Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insurance trends, regulatory changes, 
            and expert advice to make informed financial decisions.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className={category === "All" ? "hero-button" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="blog-card group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="text-4xl">{post.image}</div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" className="p-0 h-auto font-semibold text-primary group-hover:text-primary-dark">
                    Read Full Article
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="blog-card group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="text-3xl">{post.image}</div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
                      Read More <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="insurance-card p-8 mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest insurance insights and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="hero-button">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;