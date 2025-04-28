
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, ChartBar, Calendar, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Onboarding = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'sv'>('en');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Multi-language content
  const content = {
    en: {
      step1: {
        title: "Welcome to S-EYE!",
        description: "Let's set up your account to get the most out of your marketing data.",
        button: "Get Started",
      },
      step2: {
        title: "Connect your data sources",
        description: "Connect your marketing platforms to start analyzing your data.",
        googleLabel: "Google Ads",
        googleDescription: "Connect your Google Ads account",
        metaLabel: "Meta Ads",
        metaDescription: "Connect your Facebook and Instagram ads",
        button: "Connect Sources",
        skip: "Skip for now",
      },
      step3: {
        title: "Choose your preferences",
        description: "Customize your dashboard experience.",
        reportFrequency: "Report Frequency",
        weekly: "Weekly",
        monthly: "Monthly",
        quarterly: "Quarterly",
        defaultView: "Default Dashboard View",
        overview: "Overview",
        performance: "Performance",
        campaigns: "Campaigns",
        button: "Complete Setup",
      },
      completed: {
        title: "Setup Complete!",
        description: "You're all set to start exploring your marketing data.",
        button: "Go to Dashboard",
      }
    },
    sv: {
      step1: {
        title: "Välkommen till S-EYE!",
        description: "Låt oss konfigurera ditt konto för att få ut det mesta av din marknadsföringsdata.",
        button: "Kom igång",
      },
      step2: {
        title: "Anslut dina datakällor",
        description: "Anslut dina marknadsföringsplattformar för att börja analysera din data.",
        googleLabel: "Google Ads",
        googleDescription: "Anslut ditt Google Ads-konto",
        metaLabel: "Meta Ads",
        metaDescription: "Anslut dina Facebook- och Instagram-annonser",
        button: "Anslut källor",
        skip: "Hoppa över",
      },
      step3: {
        title: "Välj dina preferenser",
        description: "Anpassa din dashboardupplevelse.",
        reportFrequency: "Rapportfrekvens",
        weekly: "Veckovis",
        monthly: "Månadsvis",
        quarterly: "Kvartalsvis",
        defaultView: "Standardvy för dashboard",
        overview: "Översikt",
        performance: "Prestanda",
        campaigns: "Kampanjer",
        button: "Slutför konfiguration",
      },
      completed: {
        title: "Konfiguration klar!",
        description: "Du är nu redo att börja utforska din marknadsföringsdata.",
        button: "Gå till Dashboard",
      }
    }
  };

  const currentContent = content[language];

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setStep(step + 1);
      setLoading(false);
    }, 1000);
  };

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      setStep(4);
      setLoading(false);
    }, 1000);
  };

  const handleGoogleConnect = () => {
    toast.success("Redirecting to Google Ads authentication...");
  };

  const handleMetaConnect = () => {
    toast.success("Redirecting to Meta Ads authentication...");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

      {/* Header */}
      <header className="bg-brand-dark text-white py-4 px-6">
        <div className="container mx-auto">
          <div className="font-bold text-xl text-brand-light">S-EYE</div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-brand-light text-brand-dark' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className="text-xs mt-1">Welcome</div>
          </div>
          <div className="flex-1 flex items-center">
            <div className={`h-1 w-full ${step >= 2 ? 'bg-brand-light' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-brand-light text-brand-dark' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className="text-xs mt-1">Sources</div>
          </div>
          <div className="flex-1 flex items-center">
            <div className={`h-1 w-full ${step >= 3 ? 'bg-brand-light' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-brand-light text-brand-dark' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
            <div className="text-xs mt-1">Preferences</div>
          </div>
          <div className="flex-1 flex items-center">
            <div className={`h-1 w-full ${step >= 4 ? 'bg-brand-light' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-brand-light text-brand-dark' : 'bg-gray-200 text-gray-600'}`}>
              4
            </div>
            <div className="text-xs mt-1">Complete</div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-dark">
                  {currentContent.step1.title}
                </CardTitle>
                <CardDescription>
                  {currentContent.step1.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-brand-light/30 p-3 rounded-full mb-3">
                      <Database className="h-6 w-6 text-brand-dark" />
                    </div>
                    <h3 className="font-medium mb-2">Connect Data</h3>
                    <p className="text-sm text-gray-600">Link your marketing platforms to see all your data in one place</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-brand-light/30 p-3 rounded-full mb-3">
                      <ChartBar className="h-6 w-6 text-brand-dark" />
                    </div>
                    <h3 className="font-medium mb-2">Analyze Performance</h3>
                    <p className="text-sm text-gray-600">Get insights into your marketing performance across all channels</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-brand-light/30 p-3 rounded-full mb-3">
                      <Calendar className="h-6 w-6 text-brand-dark" />
                    </div>
                    <h3 className="font-medium mb-2">AI Reports</h3>
                    <p className="text-sm text-gray-600">Receive automated insights and recommendations</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-brand-dark text-white hover:bg-brand-darkHover"
                  onClick={handleNext}
                  disabled={loading}
                >
                  {loading ? "Loading..." : currentContent.step1.button}
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-dark">
                  {currentContent.step2.title}
                </CardTitle>
                <CardDescription>
                  {currentContent.step2.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-brand-dark p-3 rounded-full mr-4">
                      <Database className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{currentContent.step2.googleLabel}</p>
                      <p className="text-sm text-gray-500">{currentContent.step2.googleDescription}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-brand-dark text-brand-dark"
                    onClick={handleGoogleConnect}
                  >
                    Connect
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-brand-dark p-3 rounded-full mr-4">
                      <Database className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{currentContent.step2.metaLabel}</p>
                      <p className="text-sm text-gray-500">{currentContent.step2.metaDescription}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-brand-dark text-brand-dark"
                    onClick={handleMetaConnect}
                  >
                    Connect
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  className="w-full bg-brand-dark text-white hover:bg-brand-darkHover"
                  onClick={handleNext}
                  disabled={loading}
                >
                  {loading ? "Loading..." : currentContent.step2.button}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-500"
                  onClick={handleNext}
                  disabled={loading}
                >
                  {currentContent.step2.skip}
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-dark">
                  {currentContent.step3.title}
                </CardTitle>
                <CardDescription>
                  {currentContent.step3.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">{currentContent.step3.reportFrequency}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border rounded-md p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50 bg-brand-light/10 border-brand-light">
                      <Calendar className="h-5 w-5 mb-1 text-brand-dark" />
                      <span className="text-sm">{currentContent.step3.weekly}</span>
                    </div>
                    <div className="border rounded-md p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50">
                      <Calendar className="h-5 w-5 mb-1 text-gray-500" />
                      <span className="text-sm">{currentContent.step3.monthly}</span>
                    </div>
                    <div className="border rounded-md p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50">
                      <Calendar className="h-5 w-5 mb-1 text-gray-500" />
                      <span className="text-sm">{currentContent.step3.quarterly}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">{currentContent.step3.defaultView}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border rounded-md p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50 bg-brand-light/10 border-brand-light">
                      <ChartBar className="h-5 w-5 mb-1 text-brand-dark" />
                      <span className="text-sm">{currentContent.step3.overview}</span>
                    </div>
                    <div className="border rounded-md p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50">
                      <ChartBar className="h-5 w-5 mb-1 text-gray-500" />
                      <span className="text-sm">{currentContent.step3.performance}</span>
                    </div>
                    <div className="border rounded-md p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50">
                      <ChartBar className="h-5 w-5 mb-1 text-gray-500" />
                      <span className="text-sm">{currentContent.step3.campaigns}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-brand-dark text-white hover:bg-brand-darkHover"
                  onClick={handleComplete}
                  disabled={loading}
                >
                  {loading ? "Loading..." : currentContent.step3.button}
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card className="border-none shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto bg-brand-light/30 p-4 rounded-full mb-4">
                  <svg
                    className="h-12 w-12 text-brand-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <CardTitle className="text-2xl text-brand-dark">
                  {currentContent.completed.title}
                </CardTitle>
                <CardDescription>
                  {currentContent.completed.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-xl font-bold">2</div>
                      <div className="text-sm text-gray-500">Data Sources Connected</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">Weekly</div>
                      <div className="text-sm text-gray-500">Report Frequency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">Overview</div>
                      <div className="text-sm text-gray-500">Default Dashboard</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-brand-dark text-white hover:bg-brand-darkHover flex items-center justify-center"
                  onClick={handleGoToDashboard}
                >
                  {currentContent.completed.button}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
