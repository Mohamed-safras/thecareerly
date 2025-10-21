import React from "react";

// Job card data
const jobCards = [
  {
    role: "UI/UX Designer",
    company: "Pinterest",
    logo: "p.svg", // Placeholder for actual logo path
    tags: ["Design", "Full time", "WFH"],
    logoColor: "bg-red-600", // Tailored for Pinterest
    positioning: "top-4 -right-4 scale-100",
  },
  {
    role: "Product Designer",
    company: "Spotify",
    logo: "s.svg", // Placeholder for actual logo path
    tags: ["UI Designer", "Part time", "WFO"],
    logoColor: "bg-green-600", // Tailored for Spotify
    positioning: "top-1/2 -right-12 -translate-y-1/2 scale-100",
  },
  {
    role: "Senior UI Designer",
    company: "Mailchimp",
    logo: "m.svg", // Placeholder for actual logo path
    tags: ["Design", "Full time", "WFH"],
    logoColor: "bg-yellow-500",
    positioning: "bottom-4 right-8 scale-100",
  },
];

// Helper component for the individual job cards
type JobCardProps = {
  role: string;
  company: string;
  tags: string[];
  logoColor: string;
  positioning: string;
};

const JobCard: React.FC<JobCardProps> = ({
  role,
  company,
  tags,
  logoColor,
  positioning,
}) => (
  <div
    className={`w-[200px] p-4 bg-card shadow-lg rounded-xl flex flex-col space-y-2 ${positioning} transition-transform duration-300 hover:scale-[1.02]`}
  >
    {/* Role and Company Header */}
    <div className="flex items-center space-x-2">
      {/* Logo Placeholder */}
      <div
        className={`w-8 h-8 ${logoColor} rounded flex items-center justify-center text-primary-foreground font-bold text-sm`}
      >
        {/* Replace with <Image src={logo} alt={company} width={32} height={32} /> */}
        {company.charAt(0)}
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-foreground">{role}</p>
        <p className="text-xs text-muted-foreground">{company}</p>
      </div>
      <svg
        className="w-4 h-4 text-primary ml-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 pt-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-2 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded-md"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const CTABanner = () => {
  return (
    // Component wrapper, centered and padded
    <section className="container mx-auto max-w-7xl px-4 py-20">
      {/* Main container with relative positioning for absolute cards */}
      <div className="relative bg-background  overflow-hidden">
        {/* --- Left Side: CTA Content --- */}
        <div className="max-w-xl z-10 relative">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4 leading-tight">
            Join our community of ambitious professionals today and unlock the
            doors to your dream career.
          </h2>

          {/* Subtext */}
          <p className="text-base text-primary-foreground/90 mb-8">
            Unlock your true potential and discover a world of opportunities
            that align with your skills, interests, and aspirations
          </p>

          {/* CTA Button */}
          <button className="px-6 py-3 bg-foreground text-background font-semibold rounded-lg shadow-xl hover:bg-foreground/90 transition-colors">
            Get started now
          </button>
        </div>

        {jobCards.map((card, i) => (
          <div
            key={i}
            className={`hidden lg:block absolute pointer-events-none ${card.positioning}`}
          >
            <JobCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CTABanner;
