"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDashed } from "lucide-react";

interface QuickActionsProps {
  onCreateLocation?: () => void;
  onCreateManager?: () => void;
  onCreateRegion?: () => void;
}

export function QuickActions({
  onCreateLocation,
  onCreateManager,
  onCreateRegion,
}: QuickActionsProps) {
  return (
    <Card className="bg-white rounded-md border border-gray-200 gap-2 h-full">
      <CardHeader>
        <CardTitle className="text-[16px] font-medium text-[#242440]">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 mb-2 my-auto">
        <Button
          variant="outline"
          className="w-full justify-start border-[#454745] text-[#242440] h-10 bg-transparent"
          onClick={onCreateLocation}
        >
          <CircleDashed className="mr-2 h-4 w-4" />
          Create a new location
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start border-[#454745] text-[#242440] h-10 bg-transparent"
          onClick={onCreateManager}
        >
          <CircleDashed className="mr-2 h-4 w-4" />
          Create a new Manager
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start border-[#454745] text-[#242440] h-10 bg-transparent"
          onClick={onCreateRegion}
        >
          <CircleDashed className="mr-2 h-4 w-4" />
          Create a new Region
        </Button>
      </CardContent>
    </Card>
  );
}
