// components/user-profile/AvatarSection.tsx
"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Camera, X } from "lucide-react";
import { useState } from "react";

interface AvatarSectionProps {
  avatar: { url?: string | null; name?: string | null };
}

export const AvatarSection = ({ avatar }: AvatarSectionProps) => {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(avatar.url || null);
  console.log(avatarSrc);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setAvatarSrc(null); // Or set to default placeholder
  };

  return (
    <div
      className="relative h-40 md:h-40 bg-cover bg-center rounded-xl overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1706166483854-67182e829575?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470')",
      }}
    >
      {/* Avatar - Centered at bottom */}
      <div className="absolute bottom-20  left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="relative group">
          <Avatar className="h-28 w-28 md:h-32 md:w-32 ring-4 ring-background shadow-xl">
            <AvatarImage
              src={avatarSrc || ""}
              alt="Profile"
              className="object-cover"
            />
            <AvatarFallback className="text-3xl font-semibold bg-muted">
              {avatar?.name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <label
              htmlFor="avatar-upload"
              className="rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg hover:bg-primary/90"
            >
              <Camera className="h-8 w-8 text-white" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Edit Button (Pencil) - Bottom Right */}

          {/* Optional: Long press or right-click to remove */}
          {avatarSrc && (
            <Button
              onClick={handleRemove}
              className="absolute  top-0 right-2 w-6 h-6 p-2  text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs"
              title="Remove photo"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Optional: Subtle file info below */}
      <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
        JPG, PNG, GIF • Max 2MB
      </p>
    </div>
  );
};
