"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TimerTool } from '@/components/modules/timer/timer-tool';
import { Clock, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoachToolsHubProps {
  onExit?: () => void;
  initial?: 'none' | 'timer';
}

export const CoachToolsHub: React.FC<CoachToolsHubProps> = ({ onExit, initial = 'none' }) => {
  const [selected, setSelected] = useState<'none' | 'timer'>(initial);

  React.useEffect(() => {
    setSelected(initial);
  }, [initial]);

  if (selected === 'timer') {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelected('none')} className="text-sm">
            ← Back to Tools
          </Button>
        </div>
        <TimerTool />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold">Coach Tools</h2>
        <p className="text-sm text-text-muted">
          Essential tools for planning classes, managing training sessions, and tracking progress.
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card 
          className="rounded-xl overflow-hidden border-border-subtle hover:border-accent-primary/50 transition-colors cursor-pointer"
          onClick={() => setSelected('timer')}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent-primary/10">
                <Clock className="w-5 h-5 text-accent-primary" />
              </div>
              <CardTitle className="text-lg font-semibold">Round Timer</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Simple round timer with rest periods and auditory beeps. Perfect for structuring grappling sessions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary"></span>
                <span>Customizable round duration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary"></span>
                <span>Rest period management</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary"></span>
                <span>Audio beeps for transitions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for future tools */}
        <Card className="rounded-xl overflow-hidden border-border-subtle opacity-60">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-bg-raised">
                <ClipboardList className="w-5 h-5 text-text-muted" />
              </div>
              <CardTitle className="text-lg font-semibold text-text-muted">Class Planner</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Plan and structure your training sessions with technique sequences and progress tracking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-text-subtle">Coming Soon</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

