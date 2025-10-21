import { Search, Heart, Briefcase, TrendingUp } from "lucide-react";
// Note: Assuming you have access to lucide-react or similar icon library

// --- Helper Components for Floating Cards ---

type FloatingCardProps = {
  children: React.ReactNode;
  className?: string;
};

const FloatingCard = ({ children, className }: FloatingCardProps) => (
  // The 'bg-card/90' and 'shadow-lg' mimic the floating, slightly translucent look.
  // The 'w-fit' keeps the card size minimal.
  <div
    className={`absolute w-fit rounded-xl bg-card/90 p-4 shadow-xl backdrop-blur-sm ring-1 ring-border/50 ${className} animate-in fade-in-0 duration-1000`}
  >
    {children}
  </div>
);

const ProductDesignerCard = () => (
  <div className="flex items-start gap-3">
    {/* Spotify Logo Placeholder */}
    <div className="flex size-10 items-center justify-center rounded-lg bg-[#1DB954] p-1 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.111 17.514c-.218.36-.67.485-1.03.267-2.618-1.577-5.815-1.92-9.694-1.026-.402.09-.775-.205-.865-.607-.09-.402.205-.775.607-.865 4.296-1.01 7.822-.612 10.741 1.155.36.218.485.67.267 1.03zM16.9 14.733c-.266.44-.817.585-1.258.318-2.956-1.785-7.487-2.29-10.743-1.39-.516.142-.767-.38-.625-.896.142-.516.66-.767 1.176-.625 3.633-.997 8.52-.457 11.854 1.558.44.266.585.817.318 1.258zM16.89 11.838c-.328.542-1.01.722-1.55.395-3.32-2.006-8.918-2.62-12.783-1.583-.615.167-1.16-.27-1.327-.885-.167-.615.27-1.16.885-1.327 4.34-1.18 10.59-.496 14.305 1.76.542.328.722 1.01.395 1.55z" />
      </svg>
    </div>
    <div className="text-sm">
      <p className="font-semibold text-primary">Product Designer</p>
      <p className="text-xs text-muted-foreground">Spotify</p>
      <div className="mt-2 flex gap-2 text-xs">
        <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
          Full Time
        </span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
          Remote
        </span>
      </div>
      <p className="mt-2 text-sm font-bold text-foreground">
        New York, America Serikat{" "}
        <span className="ml-1 text-primary">| $152K / month</span>
      </p>
    </div>
  </div>
);

const TopJobCategoriesCard = () => (
  <div className="text-xs">
    <p className="mb-3 font-semibold text-foreground">Top Job Categories</p>
    <div className="grid grid-cols-4 gap-1">
      {/* Bars (Simplified) */}
      {[
        { h: "h-24", color: "bg-chart-3", label: "Product", pct: "65%" },
        { h: "h-28", color: "bg-chart-2", label: "Content", pct: "79%" },
        { h: "h-20", color: "bg-chart-1", label: "Finance", pct: "48%" },
        { h: "h-24", color: "bg-chart-4", label: "Design", pct: "91%" },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex h-32 w-full items-end justify-center">
            <div
              className={`${item.h} w-4 rounded-t-lg ${item.color} shadow-sm`}
            ></div>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  </div>
);

type SimpleStatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  colorClass: string;
  positionClass: string;
};

const SimpleStatCard = ({
  icon: Icon,
  value,
  label,
  colorClass,
  positionClass,
}: SimpleStatCardProps) => (
  <FloatingCard className={positionClass}>
    <div className="flex items-center gap-2">
      <div
        className={`flex size-6 items-center justify-center rounded-full ${colorClass} text-white`}
      >
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-base font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  </FloatingCard>
);

// --- Main Component ---

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center py-20">
      {/* The main container with the large, rounded pink/purple gradient */}
      <div className="relative mx-auto w-11/12 max-w-7xl overflow-hidden rounded-[2rem] p-4 py-24 md:p-16 lg:p-32">
        {/* Background Gradient & Wave Effect */}
        <div
          className="absolute inset-0 z-0 rounded-[2rem]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.97 0 0) 0%, oklch(0.1763 0.014 258.3572) 100%)",
            opacity: 0.9,
          }}
        ></div>
        {/* The subtle wave pattern from the image - using a pseudo-element or separate div */}
        <div className="absolute inset-0 z-[1] opacity-30">
          {/* Placeholder for the wave SVG/image, set to cover the area */}
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23fce7f3' fill-opacity='0.5' d='M0,192L48,160C96,128,192,64,288,64C384,64,480,128,576,133.3C672,139,768,85,864,80C960,75,1056,117,1152,149.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            }}
          />
        </div>

        {/* --- Floating Cards (z-index 2) --- */}
        <div className="relative z-10">
          {/* Card 1: Customer Success */}
          <SimpleStatCard
            icon={TrendingUp}
            value="7.89%"
            label="Customer Success"
            colorClass="bg-chart-3"
            positionClass="-top-10 left-1/4 -translate-x-1/2 hidden lg:flex"
          />

          {/* Card 2: Product Designer (Spotify) */}
          <FloatingCard className="-top-16 left-10 hidden xl:flex">
            <ProductDesignerCard />
          </FloatingCard>

          {/* Card 3: Designer Engineer */}
          <SimpleStatCard
            icon={Briefcase}
            value="Designer Engineer"
            label="Role Available"
            colorClass="bg-chart-5"
            positionClass="-top-10 right-28 translate-x-1/2 hidden lg:flex"
          />

          {/* Card 4: Product Designer Manager */}
          <FloatingCard className="bottom-10 left-16 hidden xl:flex">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-secondary p-1 text-secondary-foreground">
                <Heart className="size-6" />
              </div>
              <div>
                <p className="font-semibold text-primary">
                  Product Designer Manager
                </p>
                <p className="text-xs text-muted-foreground">
                  Highest Paid Role
                </p>
              </div>
            </div>
          </FloatingCard>

          {/* Card 5: Top Job Categories */}
          <FloatingCard className="right-10 top-16 hidden lg:flex">
            <TopJobCategoriesCard />
          </FloatingCard>

          {/* Card 6: 80% More Efficient */}
          <SimpleStatCard
            icon={TrendingUp}
            value="80%"
            label="More Efficient"
            colorClass="bg-destructive"
            positionClass="bottom-10 right-20 translate-x-1/4 hidden md:flex"
          />

          {/* --- Main Text and Search (z-index 3) --- */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center">
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              AI powered Job Matching Made Simple
            </h1>
            <p className="mt-4 max-w-xl text-lg text-foreground">
              Search and find your dream job now easier than ever, you can
              simply browse and find a job if you need it
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex w-full max-w-lg items-center rounded-full bg-card p-2 shadow-lg ring-1 ring-border/50">
              <input
                type="text"
                placeholder="Search for a Job"
                className="w-full border-none bg-transparent px-4 py-2 text-foreground focus:ring-0"
              />
              <Search className="size-5 text-muted-foreground" />
              <button className="ml-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
