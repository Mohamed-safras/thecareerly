import CreateNewJobWrapper from "./create-new-job-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "thecareerly | create new job",
};

const CreateJobPage = () => {
  return <CreateNewJobWrapper />;
};

export default CreateJobPage;
