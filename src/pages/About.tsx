import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Heart,
  Shield,
  TrendingUp,
  Globe,
  ArrowRight,
} from "lucide-react";

/* ----------------------------- Values ----------------------------- */

const values = [
  {
    icon: Rocket,
    title: "Built for the Future",
    description:
      "We are designing a modern healthcare platform focused on accessibility, clarity, and long-term medical impact.",
  },
  {
    icon: Heart,
    title: "Patient-First Thinking",
    description:
      "Every feature begins with empathy. We aim to create experiences that feel calm, human, and supportive.",
  },
  {
    icon: Shield,
    title: "Privacy by Design",
    description:
      "Security and confidentiality are core principles built into our systems from the ground up.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "We believe meaningful healthcare products evolve through iteration, learning, and real-world feedback.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* ============================= HERO ============================= */}
      <section className="relative py-28 bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            About KANT Healthcare
          </span>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Building the Future of
            <span className="block text-gold">Accessible Healthcare</span>
          </h1>

          <p className="text-lg text-white/85 leading-relaxed">
            We combine medical expertise and thoughtful technology to create
            a healthcare experience that feels clear, secure, and human.
          </p>
        </div>
      </section>

      {/* ============================= STORY ============================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Story
            </span>
            <h2 className="text-4xl font-bold text-primary mb-6">
              Why KANT Healthcare Exists
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Accessing specialist medical advice can often feel slow,
                complex, and overwhelming. Long waiting times and fragmented
                systems add stress during critical health moments.
              </p>

              <p>
                KANT Healthcare was created to simplify this journey. We aim
                to make high-quality medical guidance accessible, reliable,
                and thoughtfully designed.
              </p>

              <p>
                Our focus is trust, usability, and strong medical foundations —
                ensuring every interaction meets the highest standards of care.
              </p>
            </div>

            <div className="bg-primary/5 p-10 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold text-primary mb-4">
                What Makes Us Different
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>• Clear and transparent consultation process</li>
                <li>• Specialist-focused care</li>
                <li>• Technology designed for simplicity</li>
                <li>• Secure and private digital experience</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= VALUES ============================= */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Values
            </span>

            <h2 className="text-4xl font-bold text-primary mb-4">
              Principles That Guide Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                  <value.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {value.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= MISSION & VISION ============================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white p-12 rounded-3xl shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-2xl" />

            <Rocket className="w-10 h-10 text-gold mb-6 relative z-10" />
            <h3 className="text-3xl font-bold mb-4 relative z-10">
              Our Mission
            </h3>

            <p className="text-white/85 leading-relaxed relative z-10">
              To build a trusted digital healthcare platform that connects
              patients with specialists through secure, accessible, and
              transparent consultations.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-primary/5 p-12 rounded-3xl shadow-lg">
            <Globe className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-3xl font-bold text-primary mb-4">
              Our Vision
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              A world where expert medical guidance is accessible without
              barriers — built on clarity, trust, and patient well-being.
            </p>
          </div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section className="py-28 bg-gradient-to-r from-primary to-primary/80 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Healthcare Journey Today
          </h2>

          <p className="text-white/85 mb-10">
            Experience expert medical consultation with clarity,
            confidence, and care.
          </p>

          <Link to="/book-now">
            <Button variant="hero" size="xl">
              Book a Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;