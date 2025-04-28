
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="bg-brand-light/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-brand-dark" />
      </div>
      <h3 className="text-xl font-semibold text-brand-dark mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
