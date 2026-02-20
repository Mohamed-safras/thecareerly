import { useState } from 'react';
import { Globe, Calendar, Clock, ExternalLink, Rocket, Copy, Building2, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { JobFormData } from '@/interfaces/job';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


interface StepPublicationProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
}

const StepPublication:React.FC<StepPublicationProps>= ({ jobForm, setFormMerge }) =>{
  const dispatch = useDispatch()


  const toggleChannel = (key: keyof typeof jobForm.publishChannels) => {
    dispatch(setFormMerge({publishChannels: { ...jobForm.publishChannels, [key]: !jobForm.publishChannels[key] }}));
  };

  const channels = [
    { key: 'companyWebsite' as const, label: 'Company Website', icon: Globe, desc: 'Your company careers page' },
    { key: 'internalJobBoard' as const, label: 'Internal Job Board', icon: Building2, desc: 'Visible to current employees' },
    { key: 'employeePortal' as const, label: 'Employee Portal', icon: Users, desc: 'Employee referral program' },
  ];

  return (
    <div className="space-y-3">

      {/* Publish Mode */}
      <div className="space-y-3">
        <Label className="text-base">When to Publish</Label>
        <RadioGroup
          value={jobForm.publishMode}
          onValueChange={(value: "immediate"| "scheduled") => dispatch(setFormMerge({publishMode: value}))}
        >
          <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="immediate" id="immediate" />
            <Label htmlFor="immediate" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="font-medium">Publish Immediately</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Job will go live as soon as you click Create</p>
            </Label>
          </div>

          <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="scheduled" id="scheduled" />
            <Label htmlFor="scheduled" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">Schedule for Later</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Set a specific date and time to publish</p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {jobForm.publishMode === 'scheduled' && (
        <div className="space-y-3">
          <Label className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Scheduled Date & Time</Label>
          <Input
            type="datetime-local"
            value={jobForm.scheduledDate || ''}
            onChange={(event) => dispatch(setFormMerge({scheduledDate: event.target.value}))}
          />
        </div>
      )}

      <Separator />

      {/* Publishing Channels */}
      <div className="space-y-3">
        <Label className="text-base">Publishing Channels</Label>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {channels.map(({ key, label, icon: Icon, desc }) => (
            <Card key={key} className={cn('p-3 flex flex-row items-center justify-between', jobForm.publishChannels[key] && 'ring-1 ring-primary')}>
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
              <Switch checked={jobForm.publishChannels[key]} onCheckedChange={() => toggleChannel(key)} />
            </Card>
          ))}
        </div> 
      </div>

      <Separator />

      {/* Application Portal */}
      <Card className={cn('p-3 flex flex-row items-center justify-between', jobForm.enableApplicationPortal && 'ring-1 ring-primary')}>
        <div className="flex items-center gap-3">
          <ExternalLink className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-sm">Enable Application Portal</p>
            <p className="text-xs text-muted-foreground">Candidates can apply directly through a dedicated form</p>
          </div>
        </div>
        <Switch checked={jobForm.enableApplicationPortal} onCheckedChange={(checked) => dispatch(setFormMerge({enableApplicationPortal:checked}))} />
      </Card>

      {/* Summary */}
      <Card className="p-3 space-y-3">
        <h4 className="font-medium text-sm">Publication Summary</h4>
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary">{jobForm.publishMode === 'immediate' ? '🚀 Immediate' : '📅 Scheduled'}</Badge>
          {jobForm.publishChannels.companyWebsite && <Badge variant="outline">Company Website</Badge>}
          {jobForm.publishChannels.internalJobBoard && <Badge variant="outline">Internal Board</Badge>}
          {jobForm.publishChannels.employeePortal && <Badge variant="outline">Employee Portal</Badge>}
          {jobForm.enableApplicationPortal && <Badge variant="outline">Application Portal</Badge>}
        </div>
      </Card>
    </div>
  );
}

export default StepPublication

{/* <Platforms
        platforms={jobForm.platforms}
        togglePlatform={togglePlatform}
      /> */}