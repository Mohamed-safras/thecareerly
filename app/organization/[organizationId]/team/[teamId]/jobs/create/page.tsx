import React from "react";
import CreateJob from "./create-job";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "thecareerly | create new job",
};

const page = () => {
  return <CreateJob />;
};

export default page;
