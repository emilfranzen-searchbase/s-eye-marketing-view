
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Google } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState<'en' | 'sv'>('en');
  const [isLoading, setIsLoading] = useState(false);

  // Multi-language content
  const content = {
    en: {
      title: "Create an account",
      description: "Enter your information to get started",
      nameLabel: "Full Name",
      emailLabel: "Email",
      passwordLabel: "Password",
      terms: "I agree to the Terms of Service and Privacy Policy",
      signupButton: "Create account",
      googleSignup: "Sign up with Google",
      hasAccount: "Already have an account?",
      login: "Login",
      backToHome: "Back to home"
    },
    sv: {
      title: "Skapa ett konto",
      description: "Ange din information för att komma igång",
      nameLabel: "Fullständigt namn",
      emailLabel: "E-post",
      passwordLabel: "Lösenord",
      terms: "Jag godkänner användarvillkoren och integritetspolicyn",
      signupButton: "Skapa konto",
      googleSignup: "Registrera dig med Google",
      hasAccount: "Har du redan ett konto?",
      login: "Logga in",
      backToHome: "Tillbaka till start"
    }
  };

  const currentContent = content[language];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Account created successfully!");
      navigate("/onboarding");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    
    // Simulate Google signup process
    try {
      // In a real app, this would integrate with Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Google signup successful!");
      navigate("/onboarding");
    } catch (error) {
      toast.error("Google signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold text-brand-dark">
              {currentContent.title}
            </CardTitle>
            <CardDescription className="text-center">
              {currentContent.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{currentContent.nameLabel}</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{currentContent.emailLabel}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{currentContent.passwordLabel}</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {currentContent.terms}
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-brand-dark hover:bg-brand-darkHover text-white"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : currentContent.signupButton}
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <Google className="mr-2 h-4 w-4" /> {currentContent.googleSignup}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              {currentContent.hasAccount}{" "}
              <Button variant="link" className="p-0 text-brand-dark" onClick={() => navigate('/login')}>
                {currentContent.login}
              </Button>
            </div>
            <Button variant="ghost" className="w-full text-brand-dark" onClick={() => navigate('/')}>
              {currentContent.backToHome}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
