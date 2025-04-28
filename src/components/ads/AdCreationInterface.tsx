
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";

// Schema for basic ad fields that are common across platforms
const baseAdSchema = z.object({
  name: z.string().min(2, { message: "Ad name must be at least 2 characters." }),
  headline: z.string().min(5, { message: "Headline must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  targetUrl: z.string().url({ message: "Please enter a valid URL." }),
  budget: z.string().min(1, { message: "Budget is required." }),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().optional(),
});

// Platform-specific schema extensions
const googleAdSchema = baseAdSchema.extend({
  keywords: z.string().min(1, { message: "Keywords are required for Google Ads." }),
  adType: z.enum(["search", "display", "video", "shopping"]),
});

const metaAdSchema = baseAdSchema.extend({
  platform: z.enum(["facebook", "instagram", "both"]),
  objective: z.enum(["awareness", "consideration", "conversion"]),
  placement: z.string().optional(),
});

// Default values
const defaultValues = {
  name: "",
  headline: "",
  description: "",
  targetUrl: "",
  budget: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  // Google specific
  keywords: "",
  adType: "search" as const,
  // Meta specific
  platform: "both" as const,
  objective: "conversion" as const,
  placement: "",
};

export default function AdCreationInterface() {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [isPremium, setIsPremium] = useState(false);

  // Determine which schema to use based on the platform
  const formSchema = platform === "google-ads" ? googleAdSchema : metaAdSchema;
  
  // Set up the form with the appropriate schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Check if current platform is premium
  useState(() => {
    // This would normally check against actual user subscription data
    setIsPremium(["linkedin", "tiktok", "snapchat"].includes(platform || ""));
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.success("Ad created successfully!");
    console.log("Ad data:", values);
    // In a real app, this would send the data to your backend
    navigate(`/dashboard/${platform}`);
  };

  // Show premium upgrade message if the platform requires premium
  if (isPremium) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-center">Premium Feature</CardTitle>
            <CardDescription className="text-center">
              Creating ads on this platform requires a premium subscription.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <AlertCircle className="text-brand-dark h-16 w-16" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Create New {platform === "google-ads" ? "Google Ad" : platform === "meta-ads" ? "Meta Ad" : "Ad"}
        </h1>
        <p className="text-muted-foreground">
          Fill in the details below to create your ad campaign.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ad Details</CardTitle>
          <CardDescription>
            Provide the necessary information to create your ad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="creative">Creative</TabsTrigger>
              {platform === "google-ads" && (
                <TabsTrigger value="keywords">Keywords & Targeting</TabsTrigger>
              )}
              {platform === "meta-ads" && (
                <TabsTrigger value="targeting">Audience & Placement</TabsTrigger>
              )}
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Summer Sale Campaign" {...field} />
                        </FormControl>
                        <FormDescription>
                          A name to identify your campaign internally.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1000" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your total budget for this campaign.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {platform === "google-ads" && (
                      <FormField
                        control={form.control}
                        name="adType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ad Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select ad type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="search">Search</SelectItem>
                                <SelectItem value="display">Display</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {platform === "meta-ads" && (
                      <FormField
                        control={form.control}
                        name="objective"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Campaign Objective</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select objective" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="awareness">Awareness</SelectItem>
                                <SelectItem value="consideration">Consideration</SelectItem>
                                <SelectItem value="conversion">Conversion</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date (Optional)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="creative" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headline</FormLabel>
                        <FormControl>
                          <Input placeholder="Amazing Offer Inside!" {...field} />
                        </FormControl>
                        <FormDescription>
                          The main headline of your ad.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your product or service" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          A compelling description for your ad.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/landing-page" {...field} />
                        </FormControl>
                        <FormDescription>
                          The landing page URL for this ad.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {platform === "google-ads" && (
                  <TabsContent value="keywords" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Keywords</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="marketing, advertising, digital ads" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter keywords separated by commas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                )}

                {platform === "meta-ads" && (
                  <TabsContent value="targeting" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="facebook">Facebook only</SelectItem>
                              <SelectItem value="instagram">Instagram only</SelectItem>
                              <SelectItem value="both">Both platforms</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="placement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Placement (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Feed, Stories, etc." {...field} />
                          </FormControl>
                          <FormDescription>
                            Specific placements for your ad.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                )}

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => navigate(`/dashboard/${platform}`)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Ad
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
