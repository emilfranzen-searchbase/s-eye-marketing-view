
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroImage from "@/components/landing/HeroImage";
import FeatureCard from "@/components/landing/FeatureCard";
import Testimonial from "@/components/landing/Testimonial";
import { ArrowDown, ChartBar, Database, Calendar, Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'sv'>('en');

  // Multi-language content
  const content = {
    en: {
      hero: {
        title: "Marketing Analytics Platform",
        subtitle: "All your marketing data in one place, with AI-powered insights",
        cta: "Start free trial",
        secondary: "No credit card required",
      },
      features: {
        title: "Elevate your marketing strategy with data",
        cards: [
          {
            title: "Unified Dashboard",
            description: "Connect all your marketing channels in one place for a comprehensive view",
            icon: ChartBar,
          },
          {
            title: "AI-Powered Reports",
            description: "Automatically generate insightful reports with actionable recommendations",
            icon: Database,
          },
          {
            title: "Scheduled Analysis",
            description: "Get weekly or monthly reports delivered directly to your inbox",
            icon: Calendar,
          },
          {
            title: "Team Collaboration",
            description: "Invite team members and share insights across your organization",
            icon: Settings,
          }
        ]
      },
      testimonials: {
        title: "Trusted by marketing leaders",
        items: [
          {
            quote: "This platform has transformed how we analyze our marketing performance across channels.",
            author: "Sarah Johnson",
            role: "CMO at TechFirm Inc."
          },
          {
            quote: "The AI-generated reports save us hours of work each week and provide insights we were missing.",
            author: "Michael Chen",
            role: "Digital Marketing Director"
          }
        ]
      },
      cta: {
        title: "Ready to transform your marketing analytics?",
        subtitle: "Connect your platforms and start gaining insights today",
        button: "Start for free"
      }
    },
    sv: {
      hero: {
        title: "Marknadsföringsanalysplattform",
        subtitle: "All din marknadsföringsdata på ett ställe, med AI-drivna insikter",
        cta: "Starta gratis provperiod",
        secondary: "Inget kreditkort krävs",
      },
      features: {
        title: "Förbättra din marknadsföringsstrategi med data",
        cards: [
          {
            title: "Enhetlig Dashboard",
            description: "Koppla ihop alla dina marknadsföringskanaler på ett ställe för en heltäckande översikt",
            icon: ChartBar,
          },
          {
            title: "AI-drivna rapporter",
            description: "Generera automatiskt insiktsfulla rapporter med praktiska rekommendationer",
            icon: Database,
          },
          {
            title: "Schemalagd analys",
            description: "Få vecko- eller månadsrapporter direkt till din inkorg",
            icon: Calendar,
          },
          {
            title: "Teamsamarbete",
            description: "Bjud in teammedlemmar och dela insikter i hela din organisation",
            icon: Settings,
          }
        ]
      },
      testimonials: {
        title: "Betrodd av marknadsledare",
        items: [
          {
            quote: "Denna plattform har förändrat hur vi analyserar vår marknadsföringsprestanda över olika kanaler.",
            author: "Sarah Johnson",
            role: "CMO på TechFirm Inc."
          },
          {
            quote: "De AI-genererade rapporterna sparar oss timmar av arbete varje vecka och ger insikter vi tidigare missade.",
            author: "Michael Chen",
            role: "Digital Marknadsföringsdirektör"
          }
        ]
      },
      cta: {
        title: "Redo att transformera din marknadsföringsanalys?",
        subtitle: "Anslut dina plattformar och börja få insikter idag",
        button: "Börja gratis"
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex space-x-2">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-brand-light text-brand-dark' : 'bg-gray-200 text-gray-600'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('sv')}
            className={`px-3 py-1 rounded-md ${language === 'sv' ? 'bg-brand-light text-brand-dark' : 'bg-gray-200 text-gray-600'}`}
          >
            SV
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-brand-dark text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl text-brand-light">S-EYE</div>
          <div className="flex space-x-4">
            <Button variant="ghost" className="text-white hover:text-brand-light">Features</Button>
            <Button variant="ghost" className="text-white hover:text-brand-light">Pricing</Button>
            <Button variant="ghost" className="text-white hover:text-brand-light">About</Button>
            <Button variant="outline" className="text-brand-light border-brand-light hover:bg-brand-light hover:text-brand-dark" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-light">{currentContent.hero.title}</h1>
            <p className="text-xl mb-8 max-w-lg">{currentContent.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary" onClick={() => navigate('/signup')}>
                {currentContent.hero.cta}
              </Button>
              <div className="text-sm mt-2 sm:mt-3 sm:ml-2 text-brand-light">
                {currentContent.hero.secondary}
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <HeroImage />
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <ArrowDown className="text-brand-light animate-bounce h-8 w-8" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-dark mb-16">{currentContent.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.features.cards.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                Icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-dark mb-16">{currentContent.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentContent.testimonials.items.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-brand-light">{currentContent.cta.title}</h2>
          <p className="mb-8 max-w-2xl mx-auto">{currentContent.cta.subtitle}</p>
          <Button className="btn-primary" onClick={() => navigate('/signup')}>
            {currentContent.cta.button}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-brand-light mb-4">S-EYE</h3>
              <p className="text-gray-400">
                Marketing analytics platform with AI-powered insights
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2025 S-EYE Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
