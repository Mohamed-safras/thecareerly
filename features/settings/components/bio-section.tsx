import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SkillsBatch from "@/components/skills-batch";

const bioSchema = z.object({
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  jobTitle: z.string().optional(),
});

type BioFormValues = z.infer<typeof bioSchema>;

interface BioSectionProps {
  preferences: {
    bio?: string;
    jobTitle?: string;
    skills: string[];
  };
}

export const BioSection = ({ preferences }: BioSectionProps) => {
  const [skills, setSkills] = useState<string[]>(preferences.skills);
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<BioFormValues>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: preferences?.bio,
      jobTitle: preferences?.jobTitle,
    },
  });

  const onSubmit = (data: BioFormValues) => {
    toast.success("Bio updated");
    console.log(data, skills);
  };

  const addInterest = () => {
    if (newSkill && !skills?.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeInterest = (skill: string) => {
    setSkills(skills?.filter((i) => i !== skill));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Your current role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About You</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself..."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Brief description for your profile (max 500 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel>Interests & Skills</FormLabel>
          <div className="flex flex-wrap gap-2">
            <SkillsBatch
              skills={skills}
              onClick={removeInterest}
              className="gap-1 pr-1 cursor-pointer"
            >
              <button
                type="button"
                className="ml-1 rounded-full p-0.5 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </SkillsBatch>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add an interest..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addInterest())
              }
            />
            <Button type="button" variant="outline" onClick={addInterest}>
              Add
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};
