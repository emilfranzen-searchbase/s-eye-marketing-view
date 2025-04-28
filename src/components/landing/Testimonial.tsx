
import React from "react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

const Testimonial = ({ quote, author, role }: TestimonialProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="text-brand-light text-4xl font-serif leading-none mb-4">"</div>
      <p className="text-gray-700 mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="bg-brand-dark/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
          <span className="text-brand-dark font-semibold">{author.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold text-brand-dark">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
