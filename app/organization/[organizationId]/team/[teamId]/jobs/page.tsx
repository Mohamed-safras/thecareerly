import React from "react";
import Jobs from "./jobs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "thecareerly | jobs",
};

const page = () => {
  return <Jobs />;
};

export default page;
