import { Wifi, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditCardProps {
  brand: "visa" | "mastercard";
  last4: string;
  cardholderName: string;
  expiryMonth: number;
  expiryYear: number;
  className?: string;
}

export function CreditCard({
  brand,
  last4,
  cardholderName,
  expiryMonth,
  expiryYear,
  className,
}: CreditCardProps) {
  const cardNumber = `•••• •••• •••• ${last4}`;
  const expiry = `${expiryMonth.toString().padStart(2, "0")}/${expiryYear
    .toString()
    .slice(-2)}`;

  return (
    <div className={cn("group perspective-1000", className)}>
      <div
        className={cn(
          "relative w-[315px] h-[200px] aspect-[1.575/1] rounded-2xl overflow-hidden transition-all duration-500",
          "transform-gpu group-hover:rotate-y-3 group-hover:rotate-x-6 group-hover:scale-102",
          "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset]"
        )}
      >
        {/* Card Background */}
        <div
          className={cn(
            "absolute inset-0",
            brand === "visa"
              ? "bg-gradient-to-br from-slate-800 via-slate-900 to-black"
              : "bg-gradient-to-br from-gray-900 via-red-950 to-black"
          )}
        />

        {/* Holographic stripe effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

        {/* Metallic texture overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        {/* Card Content */}
        <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
          {/* Top Row */}
          <div className="flex items-start justify-between">
            {/* EMV Chip */}
            <div className="relative">
              <div className="w-11 h-8 rounded-md overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
                <div className="relative h-full grid grid-cols-2 gap-[1px] p-[3px]">
                  <div className="bg-amber-600/40 rounded-sm" />
                  <div className="bg-amber-600/40 rounded-sm" />
                  <div className="col-span-2 bg-amber-600/40 rounded-sm" />
                  <div className="bg-amber-600/40 rounded-sm" />
                  <div className="bg-amber-600/40 rounded-sm" />
                </div>
              </div>
            </div>

            {/* Contactless & Bank */}
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5 rotate-90 opacity-60" />
              <span className="text-[10px] font-medium tracking-widest opacity-50">
                DEBIT
              </span>
            </div>
          </div>

          {/* Card Number */}
          <div className="my-4">
            <p
              className="text-[22px] font-mono tracking-[0.15em] drop-shadow-lg"
              style={{
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {cardNumber}
            </p>
          </div>

          {/* Bottom Row */}
          <div className="flex items-end justify-between">
            {/* Cardholder Info */}
            <div className="flex-1">
              <div className="flex gap-6">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] opacity-50 mb-1">
                    Valid Thru
                  </p>
                  <p className="text-sm font-medium tracking-wider">{expiry}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] opacity-50 mb-1">
                    CVV
                  </p>
                  <p className="text-sm font-medium tracking-wider">•••</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium tracking-[0.1em] uppercase opacity-90">
                  {cardholderName}
                </p>
              </div>
            </div>

            {/* Card Brand Logo */}
            <div className="flex flex-col items-end">
              {brand === "visa" ? (
                <svg viewBox="0 0 780 500" className="w-16 h-10 drop-shadow-lg">
                  <path
                    fill="#fff"
                    d="M293.2 348.7l33.4-195.5h53.3l-33.4 195.5h-53.3zm246.8-190.6c-10.5-4-27-8.3-47.5-8.3-52.4 0-89.3 26.3-89.6 64-0.3 27.9 26.4 43.5 46.5 52.8 20.7 9.5 27.6 15.6 27.5 24.1-0.1 13-16.5 19-31.8 19-21.2 0-32.5-2.9-50-10.1l-6.8-3.1-7.4 43.2c12.4 5.4 35.3 10.1 59.2 10.4 55.7 0 91.9-26 92.3-66.2 0.2-22.1-14-38.9-44.6-52.8-18.6-9-30-15-29.9-24.1 0-8.1 9.6-16.8 30.5-16.8 17.4-0.3 30 3.5 39.8 7.5l4.8 2.3 7.2-42zm137.7-4.8h-41c-12.7 0-22.2 3.5-27.8 16.2l-78.8 177.9h55.7s9.1-23.9 11.1-29.1l67.9 0.1c1.6 6.8 6.4 29 6.4 29h49.2l-42.9-194.1zm-65.2 125.4c4.4-11.2 21.2-54.4 21.2-54.4-0.3 0.5 4.4-11.3 7.1-18.6l3.6 16.8s10.2 46.3 12.3 56.2h-44.2zM241.2 153.2l-51.9 133.3-5.5-26.9c-9.6-30.8-39.6-64.2-73.1-80.9l47.5 169.8 56.1-0.1 83.4-195.2h-56.5z"
                  />
                  <path
                    fill="#F7A600"
                    d="M146.9 153.2H62.4l-0.6 3.6c66.5 16.1 110.5 54.9 128.8 101.6l-18.6-89.2c-3.2-12.2-12.5-15.6-25.1-16z"
                  />
                </svg>
              ) : (
                <div className="flex items-center -space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#EB001B] shadow-lg" />
                  <div className="w-10 h-10 rounded-full bg-[#F79E1B] shadow-lg opacity-90" />
                </div>
              )}
              <div className="flex items-center gap-1 mt-2 opacity-60">
                <Shield className="w-3 h-3" />
                <span className="text-[8px] tracking-wider">SECURE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edge highlight */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
}
