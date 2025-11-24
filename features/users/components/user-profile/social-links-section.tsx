// components/user-profile/SocialLinksSection.tsx
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Instagram, Plus } from "lucide-react";
import { InputWithLabel } from "./ui/input-with-label";

export const SocialLinksSection = () => {
  return (
    <div className="space-y-4">
      <InputWithLabel
        label="Twitter"
        defaultValue="https://twitter.com/shaltoni"
        prefix={<Twitter className="w-4 h-4 text-muted-foreground" />}
      />
      <InputWithLabel
        label="LinkedIn"
        defaultValue="https://www.linkedin.com/in/aymanshaltoni"
        prefix={<Linkedin className="w-4 h-4 text-muted-foreground" />}
      />
      <InputWithLabel
        label="Instagram"
        defaultValue="https://instagram.com/shaltoni"
        prefix={<Instagram className="w-4 h-4 text-muted-foreground" />}
      />
      <Button variant="outline" size="sm" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add another link
      </Button>
    </div>
  );
};
