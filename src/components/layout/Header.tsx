import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  FileText,
  Stethoscope,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import iconImg from "@/assets/icon.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/doctors", label: "Our Doctors" },
    { href: "/contact", label: "Contact" },
  ];

  const services = [
    {
      name: "Board Review",
      href: "/document-upload",
      icon: FileText,
      desc: "Expert case evaluation",
    },
    {
      name: "Second Opinion",
      href: "/second-opinion",
      icon: Stethoscope,
      desc: "Specialist medical advice",
    },
    {
      name: "Teleconsultation",
      href: "/consultation",
      icon: Video,
      desc: "Online doctor consultation",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-14 h-14">
              <img
                src={iconImg}
                alt="KANT Healthcare"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-primary">
                KANT Healthcare
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Your Health, Our Priority
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-primary border-b-2 border-gold pb-1"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Premium Services Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                Services
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="absolute left-0 top-full mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100
                              opacity-0 invisible translate-y-3
                              group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                              transition-all duration-300 ease-out z-50">

                <div className="py-3">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="group/item relative flex items-start gap-4 px-6 py-4 transition-all duration-200"
                      >
                        {/* Hover Background */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 rounded-xl"></div>

                        {/* Gold Accent Bar */}
                        <div className="absolute left-0 top-0 h-full w-1 bg-gold scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-top rounded-l-xl"></div>

                        <Icon className="w-5 h-5 text-primary mt-1 relative z-10" />

                        <div className="relative z-10">
                          <div className="font-semibold text-gray-800 group-hover/item:text-primary transition-colors">
                            {service.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {service.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Section */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+917409466222"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 74094 66222</span>
            </a>

            <Link to="/book-now">
              <Button className="bg-gold hover:bg-gold/90 text-white font-semibold">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Services */}
              <div className="border-t pt-3">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full flex justify-between items-center text-sm font-medium text-muted-foreground py-2"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isServicesOpen && (
                  <div className="pl-4 mt-2 space-y-3">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-sm text-muted-foreground hover:text-primary"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/book-now"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full mt-4 bg-gold hover:bg-gold/90 text-white font-semibold">
                  Book Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;