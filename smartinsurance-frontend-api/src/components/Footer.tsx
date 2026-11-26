import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <span className="text-xl font-bold">InsureWise</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Your trusted partner for comparing and finding the best insurance policies. 
              We help you make informed decisions for your family's security.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/compare" className="hover:text-primary-light transition-colors">Compare Policies</Link></li>
              <li><Link to="/recommendations" className="hover:text-primary-light transition-colors">Get Recommendations</Link></li>
              <li><Link to="/blog" className="hover:text-primary-light transition-colors">Insurance Blog</Link></li>
              <li><Link to="/about" className="hover:text-primary-light transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Insurance Types */}
          <div>
            <h3 className="font-semibold mb-4">Insurance Types</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-light transition-colors">Life Insurance</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Health Insurance</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Car Insurance</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Home Insurance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@insurewise.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-INSURE</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 InsureWise. All rights reserved. | IRDAI Registered</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;