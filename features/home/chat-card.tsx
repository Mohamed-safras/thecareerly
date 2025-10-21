import { CheckCircle2, MessageSquareText } from "lucide-react"; // Assuming you have lucide-react for icons
import Image from "next/image";

// --- Helper Component for the Chat UI Card ---
const ChatCard = () => (
  <div className="relative h-[550px] w-full max-w-xs overflow-hidden rounded-[2rem] bg-card p-6 shadow-xl ring-1 ring-border/50 lg:h-[650px] lg:max-w-sm">
    <div className="text-sm">
      <div className="mt-6 flex justify-start">
        <div className="max-w-[75%] rounded-lg rounded-tl-none bg-muted p-3 text-muted-foreground shadow-md">
          <p>Good Morning</p>
          <p className="mt-2 text-[10px] text-right text-muted-foreground">
            08:34 AM
          </p>
        </div>
      </div>

      {/* Incoming Message */}
      <div className="mt-6 flex justify-start">
        <div className="max-w-[75%] rounded-lg rounded-tl-none bg-muted p-3 text-muted-foreground shadow-md">
          <p>
            Hi Ricky, I am Anjal, I&#39;m a UI/UX Designer at Exact Studio. I
            have a feeling we may have some very interesting work that you may
            be interested in full-time opportunities?
          </p>
          <p className="mt-2 text-[10px] text-right text-muted-foreground">
            08:34 AM
          </p>
        </div>
      </div>

      {/* Outgoing Message */}
      <div className="mt-4 flex justify-end">
        <div className="relative max-w-[75%] rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground shadow-md">
          <p>
            Hi Markus. Thank you for offering me the position. I appreciate your
            willingness to discuss the details of the position with me and give
            me to consider your offer.
          </p>
          <div className="relative">
            <p className="mt-2 text-[10px] text-right text-primary-foreground/80">
              11:12 AM
            </p>

            <CheckCircle2 className="absolute -bottom-0 right-11 size-3 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Another Incoming Message */}
      <div className="mt-6 flex justify-start">
        <div className="max-w-[75%] rounded-lg rounded-tl-none bg-muted p-3 text-muted-foreground shadow-md">
          <p className="font-semibold">Your welcome Samuel</p>
          <p className="mt-1">So what&#39;s you answer for my offer?</p>
          <p className="mt-2 text-[10px] text-right text-muted-foreground">
            11:31 AM
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Helper Component for the Image with Overlay Card ---
const ImageWithOverlayCard = () => (
  <div className="relative h-[550px] w-full max-w-sm overflow-hidden rounded-[2rem] bg-card shadow-xl ring-1 ring-border/50 lg:h-[650px] lg:max-w-md">
    {/* Background Image */}
    {/* Replace with Next.js Image component and actual image path */}
    <Image
      src="https://images.unsplash.com/photo-1622151834677-70f982c9adef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1086"
      alt="Man working on laptop"
      className="absolute inset-0 h-full w-full object-cover object-center"
      fill
    />

    {/* Success Notification Overlay */}
    <div className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 rounded-xl bg-card p-4 shadow-lg ring-1 ring-border/50">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="size-6 text-green-500" />{" "}
        {/* Green check icon */}
        <div>
          <p className="text-sm font-semibold text-foreground">
            Successfully applied for a job
          </p>
          <p className="text-xs text-muted-foreground">
            Your application is now being carefully reviewed by our team.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Main "About" Section Component ---
export function AboutSection() {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-stretch lg:gap-20">
        {/* Left Column: Chat UI Card */}
        <div className="flex w-full justify-center lg:w-1/3">
          <ChatCard />
        </div>

        {/* Middle Column: Image with Overlay Card */}
        <div className="flex w-full justify-center lg:w-1/3">
          <ImageWithOverlayCard />
        </div>

        {/* Right Column: Text Content */}
        <div className="flex w-full flex-col justify-center text-center lg:w-1/3 lg:text-left">
          <a
            href="#"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <MessageSquareText className="size-4" /> More about thecareerly
          </a>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            The things you care about job matter to thecareerly
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Unlock your true potential and discover a world of opportunities
            that align with your skills, interests, and aspirations
          </p>
          <button className="mt-8 self-center rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90 lg:self-start">
            Get started now
          </button>
        </div>
      </div>
    </section>
  );
}
