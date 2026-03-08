import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  Users,
  Award,
  Video,
  FileText,
  Stethoscope,
} from "lucide-react";

const services = [
  {
    id: "consultation",
    name: "Teleconsultation",
    price: 1000,
    oldPrice: 1500,
    duration: "Up to 30 minutes",
    description: "Video consultation with experienced doctors",
    icon: Video,
    highlight: false,
    features: [
      "Video consultation with verified doctors",
      "Digital prescription",
      "7-day follow-up support",
      "Medication guidance",
      "Secure & confidential",
    ],
  },
  {
    id: "second-opinion",
    name: "Second Opinion",
    price: 2000,
    oldPrice: 3000,
    duration: "2-3 days",
    description: "Expert medical review of reports & history",
    icon: Stethoscope,
    highlight: true,
    features: [
      "Detailed medical analysis",
      "Alternative treatment options",
      "Expert specialist review",
      "Digital report",
      "Free follow-up consultation",
    ],
  },
  {
    id: "board-review",
    name: "Board Review",
    price: 5000,
    oldPrice: 7500,
    duration: "5-7 days",
    description: "Multi-specialist review for complex cases",
    icon: FileText,
    highlight: false,
    features: [
      "Multiple specialist panel review",
      "Comprehensive board report",
      "Treatment recommendations",
      "Priority handling",
      "Free follow-up consultation",
    ],
  },
];

export default function BookNow() {
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState<string | null>(
    searchParams.get("service") || null
  );

  useEffect(() => {
    if (selectedService) {
      const element = document.getElementById(`service-${selectedService}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedService]);

  const handleSelectService = (serviceId: string) => {
    if (serviceId === "consultation") window.location.href = "/consultation";
    if (serviceId === "second-opinion") window.location.href = "/second-opinion";
    if (serviceId === "board-review") window.location.href = "/document-upload";
  };

  return (
    <Layout>
      <div className="pt-24 bg-gradient-to-b from-primary/5 via-white to-white">

        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto px-4 mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6 leading-tight">
            Choose Your Healthcare Service
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Trusted doctors. Transparent pricing. Fast results.
          </p>

          <div className="flex justify-center gap-10 text-center">
            <div>
              <p className="text-3xl font-bold text-gold">15+</p>
              <p className="text-sm text-muted-foreground">Expert Doctors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">10,000+</p>
              <p className="text-sm text-muted-foreground">Consultations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">98%</p>
              <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="container mx-auto px-4 mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  id={`service-${service.id}`}
                  className={`relative rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                  ${service.highlight ? "border-gold shadow-xl scale-105" : "border-gray-200"}
                  ${selectedService === service.id ? "ring-2 ring-gold" : ""}
                  `}
                >
                  {service.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white text-xs px-4 py-1 rounded-full font-semibold shadow-md">
                      Most Popular
                    </div>
                  )}

                  <CardContent className="p-8 space-y-6">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-primary">
                          ₹{service.price}
                        </span>
                        <span className="text-sm line-through text-muted-foreground">
                          ₹{service.oldPrice}
                        </span>
                      </div>
                      <p className="text-green-600 text-sm font-medium">
                        Save ₹{service.oldPrice - service.price}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleSelectService(service.id)}
                      className={`w-full h-12 font-semibold ${
                        service.highlight
                          ? "bg-gold hover:bg-gold/90 text-white"
                          : "bg-primary hover:bg-primary/90 text-white"
                      }`}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </div>
              );
            })}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-primary/5 py-16 mb-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-12">
              Why Choose KANT Healthcare?
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[Award, CheckCircle2, Clock, Users].map((Icon, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-14 h-14 mx-auto bg-gold/20 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <p className="font-semibold">
                    {[
                      "Licensed Doctors",
                      "Secure & Private",
                      "Quick Results",
                      "24/7 Available",
                    ][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="container mx-auto px-4 mb-20">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 text-white text-center p-12 shadow-xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready to get expert medical advice?
            </h2>
            <p className="mb-6 text-white/90">
              Book your consultation today and connect with top specialists.
            </p>

            <Button className="bg-gold hover:bg-gold/90 text-white px-8 py-3 text-lg font-semibold">
              Book Consultation Now
            </Button>

            <p className="mt-6 text-sm">
              Need help? Call{" "}
              <a href="tel:+917409466222" className="font-semibold underline">
                +91 74094 66222
              </a>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}