import HorizontalStepper from "@/components/stepper";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createUserSteps } from "@/constents/stepper-item";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import OnboardingInviteStep from "./onboarding-invite";
import BasicUserInfo from "./basic-user-info";
import RolePermissionManager from "./role-permission-manager";
import ReviewConfirm from "./review-confirm";
import { goNext, goPrev, goTo } from "@/lib/form-validation/job-form";
import { useDispatch } from "react-redux";
import { resetOnboardingForm } from "@/store/slice/user-onboarding-slice";

const AddUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <PlusCircle /> Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-6">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-semibold">
            Add a new user
          </DialogTitle>
        </DialogHeader>
        <HorizontalStepper
          steps={createUserSteps}
          currentStep={currentStep}
          validateStep={() => []}
          setCurrentStep={setCurrentStep}
          goTo={goTo}
          className="py-2"
          orientation="horizontal"
        />
        {currentStep === 1 && <BasicUserInfo />}
        {currentStep === 2 && <RolePermissionManager />}
        {currentStep === 3 && <OnboardingInviteStep />}
        {currentStep === 4 && <ReviewConfirm />}
        {/* Footer Section */}
        <DialogFooter className="flex flex-col sm:flex-row justify-between sm:items-center w-full gap-2">
          <Button
            onClick={() => dispatch(resetOnboardingForm())}
            variant="secondary"
            className="text-sm font-medium sm:mr-auto"
          >
            Reset to default
          </Button>

          <div className="flex sm:flex-row flex-col sm:items-center gap-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                className="text-sm font-medium"
                onClick={
                  currentStep === 1 ? () => {} : () => goPrev(setCurrentStep)
                }
              >
                {currentStep === 1
                  ? "Cancel"
                  : createUserSteps[currentStep - 2].title}
              </Button>
            )}

            <Button
              type="submit"
              className="bg-primary"
              onClick={
                currentStep >= createUserSteps.length
                  ? () => {}
                  : () =>
                      goNext(
                        currentStep,
                        createUserSteps.length,
                        () => [],
                        setCurrentStep
                      )
              }
            >
              {currentStep >= createUserSteps.length
                ? "Add Employee"
                : createUserSteps[currentStep].title}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// src/types/roles.ts

export default AddUser;
