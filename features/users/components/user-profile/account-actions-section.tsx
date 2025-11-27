"use client";
import { Button } from "@/components/ui/button";
import { Download, Lock, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const AccountActionsSection = () => {
  const handleExportData = () => {
    toast.success("Data export initiated");
  };

  const handleDeactivate = () => {
    toast.error("Account deactivated");
  };

  const handleDeleteAccount = () => {
    toast.warning("Account deletion requested");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Your Data
            </h3>
            <p className="text-sm text-muted-foreground">
              Download a copy of all your account data and activity
            </p>
          </div>
          <Button variant="outline" onClick={handleExportData}>
            Export
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Deactivate Account
            </h3>
            <p className="text-sm text-muted-foreground">
              Temporarily disable your account. You can reactivate anytime
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Deactivate</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deactivate your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your profile will be hidden and you won&apos;t be able to
                  access your account until you reactivate it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeactivate}>
                  Deactivate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            {" "}
            <div className="space-y-1">
              <h3 className="font-medium flex items-center gap-2 text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
