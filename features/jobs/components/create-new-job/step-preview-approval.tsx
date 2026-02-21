import { useState } from 'react';
import { Monitor, Tablet, Smartphone, Send, FileText, Heart, Forward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { JobFormData } from '@/interfaces/job';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface StepPreviewApprovalProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
}

type DevicePreview = 'desktop' | 'tablet' | 'mobile';

function SquareCard({ title, value, children }: { title: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="p-3 border rounded-lg flex flex-col items-start gap-1.5 sm:gap-2 min-w-0">
      <span className="text-xs sm:text-sm text-muted-foreground">{title}</span>
      <Badge variant="secondary" className="text-xs sm:text-sm text-wrap break-words max-w-full text-accent-foreground">
        {value || 'N/A'}
      </Badge>
      {children}
    </div>
  );
}

export function StepPreviewApproval({ jobForm, setFormMerge }: StepPreviewApprovalProps) {
  const dispatch = useDispatch();
  const [device, setDevice] = useState<DevicePreview>('desktop');

  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]',
  };

  const devices: { id: DevicePreview; icon: React.ReactNode; label: string }[] = [
    { id: 'desktop', icon: <Monitor className="h-4 w-4" />, label: 'Desktop' },
    { id: 'tablet', icon: <Tablet className="h-4 w-4" />, label: 'Tablet' },
    { id: 'mobile', icon: <Smartphone className="h-4 w-4" />, label: 'Mobile' },
  ];

  const submitForApproval = () => {
    dispatch(setFormMerge({ approvalStatus: 'pending' }));
    toast.success('Submitted for HR approval!');
  };

  const locationText = jobForm.location || 'Location TBD';
  const workArrangement = jobForm.workPreference || 'On-site';

  return (
    <div className="flex flex-col max-h-[600px] overflow-y-auto border p-3 rounded-lg">
      {/* Sticky Header */}
      <div className="shrink-0 space-y-3 pb-3 flex items-center justify-center">

        {/* Device Switcher */}
        <div className="flex items-center gap-1 sm:gap-2 border rounded-lg p-1 w-fit">
          {devices.map((dvs) => (
            <Button
              key={dvs.id}
              aria-label={dvs.label}
              variant={device === dvs.id ? 'default' : 'ghost'}
              size="sm"
              className="gap-1 sm:gap-1.5 text-xs sm:text-sm px-2 sm:px-3"
              onClick={() => setDevice(dvs.id)}
            >
              {dvs.icon}
              <span className="hidden sm:inline">{dvs.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Scrollable Preview Area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1">
        <div className="flex justify-center"> 
          <Card data-testid="preview-card" className={cn('p-3 transition-all border w-full shadow-none', deviceWidths[device])}>
            <div className="space-y-3">
              {/* Header */}
              <div className="flex flex-col gap-3">
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold truncate">
                    {jobForm.title || 'Job Title'}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs sm:text-sm text-muted-foreground">
                    <span className="truncate max-w-[200px] sm:max-w-[300px]">
                      📍 {locationText.length > 40 ? `${locationText.slice(0, 40)}...` : locationText}
                    </span>
                    <span className="hidden sm:inline">-</span>
                    <span>{workArrangement}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>Posted 3 days ago</span>
                    <span>•</span>
                    <span>34 Applicants</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                    <Heart className="h-3.5 w-3.5" /> Save
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                    <Forward className="h-3.5 w-3.5" /> Share
                  </Button>
                  <Button size="sm" className="text-xs h-8 flex-1 sm:flex-none">
                    Apply Now
                  </Button>
                </div>
              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-2 gap-3">
                {jobForm.department && <SquareCard title="Department" value={jobForm.department} />}
                <SquareCard title="Job Type" value={jobForm.jobType} />
                <SquareCard title="Experience" value={jobForm.experienceLevel} />
                {jobForm.salary.showOnPosting && jobForm.salary.min > 0 && (
                  <SquareCard
                    title="Salary"
                    value={`${jobForm.salary.currency} ${jobForm.salary.min.toLocaleString()} - ${jobForm.salary.max.toLocaleString()}`}
                  />
                )}
              </div>

              <Separator />

              {/* Description */}
              {jobForm.description ? (
                <div>
                  <h4 className="font-semibold text-sm mb-1">About the Role</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line break-words overflow-hidden">
                    {jobForm.description}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No description yet.</p>
              )}

              {jobForm.responsibilities && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Responsibilities</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line break-words overflow-hidden">
                    {jobForm.responsibilities}
                  </p>
                </div>
              )}

              {jobForm.requirements && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Requirements</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line break-words overflow-hidden">
                    {jobForm.requirements}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <Separator className="my-4" />

        {/* Approval Section */}
        <div className="space-y-3 sm:space-y-4 pb-4">
          <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
            <FileText className="h-4 w-4" /> HR Approval
          </h4>

          {jobForm.approvalStatus === 'none' && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">Notes for Approvers</Label>
                <Textarea
                  value={jobForm.approvalNotes}
                  onChange={(event) => dispatch(setFormMerge({ approvalNotes: event.target.value }))}
                  placeholder="Add any context for the HR approval team..."
                  rows={3}
                  className="text-sm"
                />
              </div>
              <Button onClick={submitForApproval} className="gap-2 w-full sm:w-auto">
                <Send className="h-4 w-4" /> Submit for Approval
              </Button>
            </div>
          )}

          {jobForm.approvalStatus === 'pending' && (
            <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/5 p-3 sm:p-4 text-sm">
              <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30 mb-2">
                Pending Approval
              </Badge>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Waiting for HR team review. You can proceed to publish as draft.
              </p>
            </div>
          )}

          {jobForm.approvalStatus === 'approved' && (
            <div className="rounded-lg border border-green-500/50 bg-green-500/5 p-3 sm:p-4 text-sm">
              <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Approved</Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}