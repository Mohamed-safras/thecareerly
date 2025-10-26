import { RegisterOrganization } from "@/components/register-org";
import React from "react";

const page = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterOrganization />
      </div>
    </div>
  );
};

export default page;
