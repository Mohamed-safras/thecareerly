import React from "react";
import EditJob from "./edit-job";

interface EditJobPageProps {
  searchParams: {
    id?: string;
  };
}

export default async function EditJobPage({ searchParams }: EditJobPageProps) {
  const { id } = await searchParams;

  if (!id) {
    return <div>No job ID provided</div>;
  }

  return <EditJob id={id} />;
}
