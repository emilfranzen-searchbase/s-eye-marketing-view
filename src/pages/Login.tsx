
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Google } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState<'en' | 'sv'>('en');
  const [isLoading, setIsLoading] = useState(false);

  // Multi-language content
  const content = {
    en: {
      title: "Welcome back",
      description: "Enter your credentials to access your account",
      emailLabel: "Email",
      passwordLabel: "Password",
      forgotPassword: "Forgot password?",
      loginButton: "Login",
      googleLogin: "Login with Google",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      backToHome: "Back to home"
    },
    sv: {
      title: "Välkommen tillbaka",
      description: "Ange dina uppgifter för att komma åt ditt konto",
      emailLabel: "E-post",
      passwordLabel: "Lösenord",
      forgotPassword: "Glömt lösenord?",
      loginButton: "Logga in",
      googleLogin: "Logga in med Google",
      noAccount: "Har du inget konto?",
      signUp: "Registrera dig",
      backToHome: "Tillbaka till start"
    }
  };

  const currentContent = content[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any email and password will work
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google login process
    try {
      // In a real app, this would integrate with Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{currentContent.emailLabel}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{currentContent.passwordLabel}</Label>
                  <Button type="button" variant="link" className="px-0 text-brand-dark">
                    {currentContent.forgotPassword}
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-brand-dark hover:bg-brand-darkHover text-white"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : currentContent.loginButton}
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
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Google className="mr-2 h-4 w-4" /> {currentContent.googleLogin}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              {currentContent.noAccount}{" "}
              <Button variant="link" className="p-0 text-brand-dark" onClick={() => navigate('/signup')}>
                {currentContent.signUp}
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

export default Login;
