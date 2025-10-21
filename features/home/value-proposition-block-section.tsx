import React from "react";

// Placeholder logo data (In a real Next.js app, these would be in your /public directory)
const companyLogos = [
  { name: "Spotify", src: "/logos/spotify.svg", alt: "Spotify Logo" },
  { name: "Microsoft", src: "/logos/microsoft.svg", alt: "Microsoft Logo" },
  { name: "McAfee", src: "/logos/mcafee.svg", alt: "McAfee Logo" },
  { name: "Google", src: "/logos/google.svg", alt: "Google Logo" },
];

const statsData = [
  { value: "400K", label: "Job list" },
  { value: "800K", label: "People hired" },
  { value: "20K", label: "Company" },
  { value: "120", label: "Available country" },
];

const ValuePropositionBlock = () => {
  return (
    // Outer container: full width, centered content, padding
    <section className="container mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 max-w-7xl mx-auto">
        {/* === Left Side: Text Content and Logos === */}
        <div className="lg:w-7/12">
          {/* Bookmark/More Info Header */}
          <p className="text-sm font-semibold text-primary mb-4 flex items-center">
            {/* The bookmark icon (using an SVG placeholder) */}
            <svg
              className="w-4 h-4 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
            More about thecareerly
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight mb-10">
            Unlock Your True Potential And Discover A World Of Opportunities
            That Align With Your Skills, Interests, And Aspirations
          </h1>

          {/* Company Logos (Using a simple flex layout) */}
          <div className="flex flex-wrap items-center gap-6">
            {companyLogos.map((logo, index) => (
              // In a real Next.js app, use the Image component for optimization
              // For a simple mock, we'll use colored text/divs if you don't have SVGs handy.
              // Assuming you have SVGs and a working Image setup:
              <div key={index} className="h-8 w-auto">
                {/* NOTE: You would replace this placeholder div with the actual 
                  Next.js <Image /> component pointing to your public path.
                */}
                <div className="text-xl font-bold text-muted-foreground opacity-70">
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Right Side: Statistics Section === */}
        <div className="lg:w-5/12 grid grid-cols-2 gap-x-16 gap-y-10 pt-4 lg:pt-0">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <p className="text-4xl sm:text-5xl font-extrabold text-foreground leading-none">
                {stat.value}
              </p>
              <p className="text-base text-muted-foreground mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionBlock;
